import { useEffect, useState } from "react";
import { PlansApi } from "../../../services/supportApi";
import MonoColorLoader from "../../common/monoColorLoader";

const PricingTable = () => {
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
  console.log(plans, "plans");
  const isLoader = plans?.length <= 0;

  return (
    <div>
      {isLoader && (
        <MonoColorLoader message="Loading ..." size={100} color="#b97cff" />
      )}
      {!isLoader && (
        <div className=" flex items-center justify-center bg-black px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
            {plans.map((plan: any) => {
              const isPro =
                String(plan?.planName || "").toLowerCase() === "pro";
              const showPerMonth = Number(plan?.monthlyPrice) > 0;
              const priceLabel = showPerMonth
                ? `₹${plan.monthlyPrice} `
                : String(plan?.planName || "").toLowerCase() === "free"
                ? "Free"
                : "custom";
              return (
                <div
                  key={plan?.planId}
                  className={`${
                    isPro
                      ? "relative bg-[url('/BackgroundShadow.png')] bg-cover bg-center bg-no-repeat"
                      : "bg-black  border border-[#282828] shadow-lg"
                  } text-white p-6 rounded-[6px] `}
                >
                  {isPro && (
                    <span className="absolute top-4 right-4 bg-purple-600 text-xs text-white px-2 py-1 rounded-[10px]">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-xl font-semibold ">{plan?.planName}</h3>
                  <p className="text-gray-400 mt-2 ">
                    {plan?.shortDescription}
                  </p>
                  <p className="text-3xl font-bold mt-4 ">
                    {priceLabel}
                    {showPerMonth && (
                      <span className="text-lg font-normal ">/month</span>
                    )}
                  </p>
                  <button
                    onClick={() =>
                      (window.location.href =
                        "mailto:support@bubbl.cards?subject=Plan%20Inquiry&body=Hi%2C%20I%27m%20interested%20in%20upgrading%20my%20plan.")
                    }
                    className={`w-full mt-6 py-2 px-4 rounded ${
                      isPro
                        ? "bg-white text-black text-lg font-semibold"
                        : "bg-[#0F0F10] hover:bg-gray-600 text-white font-semibold text-lg"
                    }`}
                  >
                    {String(plan?.planName || "").toLowerCase() === "free"
                      ? "Start for free"
                      : showPerMonth
                      ? "Upgrade Now"
                      : "Contact us"}
                  </button>
                  <ul className="mt-6 space-y-2 text-gray-300 ">
                    {plan?.PlanDescriptions?.map((item: any) => (
                      <li key={item?.id}>&#10003; {item?.description}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingTable;
