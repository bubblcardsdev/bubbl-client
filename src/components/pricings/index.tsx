import { UserContext } from "@/src/context/userContext";
import { useState, useContext, useEffect, useRef } from "react";
import { PlansApi } from "../../services/supportApi";
import MonoColorLoader from "../common/monoColorLoader";
import {
createPlanOrderService,
planFailurePaymentService,
verifyPlanPaymentService,
} from "@/src/services/plan";
import { toast } from "react-toastify";
import { PLAN } from "@/src/context/action";
import { Loader2 } from "lucide-react";

export default function Pricings() {
const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
"monthly"
);
const [planOrder, setPlanOrder] = useState<any>(null);
const { state, dispatch }: any = useContext(UserContext);
const [isVerifying, setIsVerifying] = useState<boolean>(false);
const failureHandledRef = useRef(false);
const [isProcessing, setIsProcessing] = useState(false);

const planId = state?.planId?.data?.planId ?? 1;
console.log(state, "?");

const [plans, setPlans] = useState([]);

// ------------------------------
// Load Plans
// ------------------------------
useEffect(() => {
const fetchPlans = async () => {
  const response = await PlansApi();
  if (response) setPlans(response);
};
fetchPlans();
}, []);

// ------------------------------
// Razorpay Script Loader
// ------------------------------
const loadRazorpayScript = () => {
return new Promise((resolve) => {
if (typeof window === "undefined") return resolve(false); // SSR safe

// script already added AND Razorpay is ready
if (document.getElementById("razorpay-script")) {
  if ((window as any).Razorpay) return resolve(true);
}

const script = document.createElement("script");
script.id = "razorpay-script";
script.src = "https://checkout.razorpay.com/v1/checkout.js";
script.onload = () => resolve(true);
script.onerror = () => resolve(false);
document.body.appendChild(script);
});
};

const openRazorpayCheckout = async (order: any) => {
const scriptLoaded = await loadRazorpayScript();

// If script failed OR Razorpay is not available
if (!scriptLoaded || !(window as any).Razorpay) {
toast.error("Failed to load Razorpay. Please try again.");
return;
}

// Reset failure flag
failureHandledRef.current = false;

const options = {
key: order.key,
amount: order.amount,
currency: order.currency,
order_id: order.razorpayOrderId,
name: "Bubbl",
description: "Plan Upgrade",

prefill: {
  name: "",
  email: "",
  contact: "",
},

handler: handleSuccessResponse,

modal: {
  ondismiss: () =>setIsProcessing(false),
},

theme: {
  color: "#8b5cf6",
},
};

const RazorpayInstance = (window as any).Razorpay;
const rzp = new RazorpayInstance(options);

rzp.on("payment.failed", (err: any) => {
if (failureHandledRef.current) return;
failureHandledRef.current = true;

handleFailureResponse({
  error: {
    metadata: {
      payment_id: err.error?.metadata?.payment_id,
      order_id: err.error?.metadata?.order_id,
    },
    reason: err.error?.reason,
    description: err.error?.description,
  },
});
});

rzp.open();
};


async function handleSuccessResponse(resp: any) {
try {
  setIsVerifying(true);
  const verifyResult = await verifyPlanPaymentService(
    resp.razorpay_payment_id,
    resp.razorpay_order_id,
    resp.razorpay_signature
  );
  if (!verifyResult.success) {
    toast.error(verifyResult.message);
    return;
  }
  console.log(verifyResult, "??/");

  dispatch({
    type: PLAN,
    payload: {
      data: verifyResult.data,
      etag: verifyResult.etag,
    },
  });
  toast.success("Plan activated successfully!");
  setPlanOrder(null);
} catch (err) {
  console.error(err);
  toast.error("Error verifying payment");
} finally {
  setIsVerifying(false);
}
}

async function handleFailureResponse(res: any) {
try {
  const paymentId = res?.error?.metadata?.payment_id || null;
  const orderId = res?.error?.metadata?.order_id || null;

  const reason =
    res?.error?.description ||
    res?.error?.reason ||
    "Payment cancelled by user";

  // Log to backend
  await planFailurePaymentService(paymentId, orderId, reason);

  toast.error(reason);
} catch (err) {
  console.error("Error handling payment failure:", err);
} finally {
  setPlanOrder(null);
}
}

async function handlePlanUpgrade(planId: number) {
if (isProcessing) return; //  block multiple triggers

try {
  setIsProcessing(true);

if(planOrder){
openRazorpayCheckout(planOrder);
return
}

  const result = await createPlanOrderService(planId, billingCycle);

  if (!result.success) {
    toast.error(result.message);
    return;
  }

  setPlanOrder(result.order);

  // Immediately open Razorpay modal
  openRazorpayCheckout(result.order);
} catch (err: any) {
  console.error("Error in handlePlanUpgrade:", err);
  toast.error("Something went wrong. Please try again.");
}
}

const isLoader = plans?.length <= 0;

if (isVerifying) {
return (
  <div className="h-[calc(100vh-60px)] flex items-center justify-center bg-black">
    <div className="bg-[#1a1a1a] shadow-xl rounded-2xl px-10 py-8 text-center w-[340px] border border-[#2c2c2c]">
      <h1 className="text-xl font-semibold text-white mb-3">
        You&apos;re Almost Done!
      </h1>

      <p className="text-gray-400 text-sm mb-1">
        We&apos;re processing your payment.
      </p>
      <p className="text-gray-500 text-xs mb-5">
        This may take up to 1 minute. Please don’t close the window.
      </p>

      <div className="flex justify-center mt-4">
        <Loader2
          className="animate-spin w-7 h-7"
          style={{ color: "#8b5cf6" }}
        />
      </div>
    </div>
  </div>
);
}

return (
<div>
  {isLoader && (
    <MonoColorLoader message="Loading ..." size={100} color="#b97cff" />
  )}

  {!isLoader && (
    <div className="text-white py-4 px-0 mt-[0px]">
      <div className="text-center">
        {/* HEADER */}
        <div className="h-[200px] rounded-xl flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-4 mt-[0px]">
            Choose your plan
          </h1>
          <p className="text-[#8F8F8F] mb-8">
            Simple pricing. No hidden fees. Advanced features for your{" "}
            <span className="underline underline-offset-4">business</span>
          </p>

          {/* BILLING SELECTOR */}
          <div className="inline-flex bg-zinc-700 rounded-lg p-1 mb-10 w-[300px]">
            <button
              className={`px-6 py-2 w-[150px] rounded-md transition-all duration-200 text-[14px] ${
                billingCycle === "monthly"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>

            <button
              className={`px-6 py-2 w-[150px] rounded-md transition-all duration-200 text-[14px] ${
                billingCycle === "yearly"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* PLANS */}
        <div className="grid md:grid-cols-3 gap-x-6 gap-y-8 text-left mt-4">
          {plans.map((plan: any) => {
            const isPro =
              String(plan?.planName || "").toLowerCase() === "pro";
            const price =
              billingCycle === "monthly"
                ? Number(plan?.monthlyPrice || 0)
                : Number(plan?.annualPrice || 0);

            const isZeroPrice = price === 0;
            const isFreePlan =
              String(plan?.planName || "").toLowerCase() === "free";

            return (
              <div
                key={plan?.planId}
                className={`p-6 rounded-2xl relative ${
                  plan?.planId === 2
                    ? "bg-gradient-to-br from-[#8654E1] to-[#1A1A1A]"
                    : "bg-[#282828]"
                }`}
              >
                {isPro && (
                  <span className="absolute top-6 right-4 bg-violet-600 text-xs font-semibold px-2 py-1 rounded text-white">
                    Most popular
                  </span>
                )}

                {/* Details */}
                <h2 className="text-xl font-semibold mb-1">
                  {plan?.planName}
                </h2>
                <p className="text-[#8E8D91] h-16">
                  {plan?.shortDescription}
                </p>

                {isZeroPrice ? (
                  <p className="text-3xl font-bold mb-1">
                    {isFreePlan ? "Free" : "Custom"}
                  </p>
                ) : (
                  <p className="text-3xl font-bold mb-1">
                    ₹{price}
                    <span className="text-sm text-[#8E8D91] px-2">
                      /{billingCycle === "monthly" ? "month" : "year"}
                    </span>
                  </p>
                )}

                {/* BUTTONS */}
                {plan?.planId === planId ? (
                  <button
                    disabled
                    className="w-full bg-green-700 text-white py-2 rounded-md font-semibold mt-[10px] cursor-not-allowed"
                  >
                    ✓ Current Plan
                  </button>
                ) : isFreePlan ? null : isZeroPrice ? (
                  <button
                    onClick={() => {
                      const subject = encodeURIComponent("Plan Inquiry");
                      const body = encodeURIComponent(
                        "Hi,\n\nI'm interested in upgrading my plan to teams.\n\nPlease share more details.\n\nThanks!"
                      );
                      window.open(
                        `https://mail.google.com/mail/?view=cm&fs=1&to=support@bubbl.cards&su=${subject}&body=${body}`,
                        "_blank"
                      );
                    }}
                    className="w-full bg-white text-black py-2 rounded-md font-semibold hover:bg-zinc-200 mt-[10px]"
                  >
                    Contact us
                  </button>
                ) : (
                  <button
                    disabled={isProcessing}
                    onClick={() => handlePlanUpgrade(plan?.planId)}
                    className={`w-full bg-white text-black py-2 rounded-md font-semibold hover:bg-zinc-200 mt-[10px]
                  ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isProcessing ? "Processing..." : "Upgrade Now"}
                  </button>
                )}

                {/* Features */}
                <ul className="mt-6 space-y-3 text-[#B4B4B7] text-sm">
                  {plan?.PlanDescriptions?.map((f: any) => (
                    <li key={f?.id}>✓ {f?.description}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )}
</div>
);
}
