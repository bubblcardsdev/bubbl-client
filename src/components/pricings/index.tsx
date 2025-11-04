import { UserContext } from "@/src/context/userContext";
import { useState, useContext, useEffect } from "react";
import { PlansApi } from "../../services/supportApi";
import MonoColorLoader from "../common/monoColorLoader";

export default function Pricings() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const { state }: any = useContext(UserContext);
  const { planId } = state;
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    const fetchPlans = async () => {
      const response = await PlansApi();

      if (!response) {
        return null;
      } else {
        setPlans(response);
      }
    };
    fetchPlans();
  }, []);
  const isLoader = plans?.length <= 0;
  return (
    <div>
      {isLoader && (
        <MonoColorLoader message="Loading ..." size={100} color="#b97cff" />
      )}

      {!isLoader && (
        <div className="text-white py-4 px-0 mt-[0px]">
          <div className="text-center">
            <div className="h-[200px] rounded-xl flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold mb-4 mt-[0px]">
                Choose your plan
              </h1>
              <p className="text-[#8F8F8F] mb-8">
                Simple pricing. No hidden fees. Advanced features for your{" "}
                <span className="underline underline-offset-4">business</span>
              </p>
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

                    <h2 className="text-xl font-semibold mb-1">
                      {plan?.planName}
                    </h2>
                    <p className="text-[#8E8D91] h-16">
                      {plan?.shortDescription}
                    </p>

                    {isZeroPrice ? (
                      <p className="text-3xl font-bold mb-1">
                        {isFreePlan ? "Free" : "custom"}
                      </p>
                    ) : (
                      <p className="text-3xl font-bold mb-1">
                        ₹{price}
                        <span className="text-sm text-[#8E8D91] px-2 ">
                          /{billingCycle === "monthly" ? "month" : "year"}
                        </span>
                      </p>
                    )}

                    {/* Button or Current Plan Indicator */}
                    {plan?.planId === planId ? (
                      <button
                        disabled
                        className="w-full bg-green-700 text-white py-2 rounded-md font-semibold mt-[10px] cursor-not-allowed"
                      >
                        ✓ Current Plan
                      </button>
                    ) : isFreePlan ? null : isZeroPrice ? (
                      <button
                        onClick={() =>
                          (window.location.href =
                            "mailto:support@bubbl.cards?subject=Plan%20Inquiry&body=Hi%2C%20I%27m%20interested%20in%20upgrading%20my%20plan.")
                        }
                        className=" w-full bg-white text-black py-2 rounded-md font-semibold hover:bg-zinc-200 mt-[10px]"
                      >
                        Contact us
                      </button>
                    ) : (
                      <button className="w-full bg-white text-black py-2 rounded-md font-semibold hover:bg-zinc-200 mt-[10px] ">
                        Upgrade Now
                      </button>
                    )}

                    <ul className="mt-6 space-y-3 text-[#B4B4B7] text-sm">
                      {plan?.PlanDescriptions?.map((f: any) => (
                        <li key={f?.id}> &#10003; {f?.description}</li>
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
