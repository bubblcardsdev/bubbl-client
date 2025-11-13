import { PlansApi } from "@/src/services/supportApi";
import { useEffect, useState } from "react";
import MonoColorLoader from "../../common/monoColorLoader";


const PricingTable = () => {
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await PlansApi();
        if (response) setPlans(response);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      }
    };
    fetchPlans();
  }, []);

  const isLoader = plans?.length <= 0;

  // 📧 Opens Gmail compose window directly
  // const handleContactUs = () => {
  //   const subject = encodeURIComponent("Plan Inquiry");
  //   const body = encodeURIComponent(
  //     "Hi,\n\nI'm interested in upgrading my plan.\n\nPlease share more details.\n\nThanks!"
  //   );
  //   window.open(
  //     `https://mail.google.com/mail/?view=cm&fs=1&to=support@bubbl.cards&su=${subject}&body=${body}`,
  //     "_blank"
  //   );
  // };

  // const handleUpgrade = (planName: string) => {
  //   console.log(`Upgrade clicked for ${planName}`);
  //   // Later: router.push('/upgrade')
  // };

  return (
 <div>
  {isLoader ? (
    <MonoColorLoader message="Loading ..." size={100} color="#b97cff" />
  ) : (
    <div className="flex items-center justify-center bg-black px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {plans.map((plan: any) => {
          const planName = String(plan?.planName || "").toLowerCase();
          const isPro = planName === "pro";
          const showPerMonth = Number(plan?.monthlyPrice) > 0;
          const priceLabel = showPerMonth
            ? `₹${plan.monthlyPrice}`
            : planName === "free"
            ? "Free"
            : "Custom";

          return (
            <div
              key={plan?.planId}
              className={`${
                isPro
                  ? "relative bg-[url('/BackgroundShadow.png')] bg-cover bg-center bg-no-repeat"
                  : "bg-black border border-[#282828] shadow-lg"
              } text-white p-6 rounded-[6px]`}
            >
              {isPro && (
                <span className="absolute top-4 right-4 bg-purple-600 text-xs text-white px-2 py-1 rounded-[10px]">
                  Most popular
                </span>
              )}

              <h3 className="text-xl font-semibold">{plan?.planName}</h3>
              <p className="text-gray-400 mt-2">{plan?.shortDescription}</p>

              <p className="text-3xl font-bold mt-4">
                {priceLabel}
                {showPerMonth && (
                  <span className="text-lg font-normal">/month</span>
                )}
              </p>

              <ul className="mt-6 space-y-2 text-gray-300">
                {plan?.PlanDescriptions?.map((item: any) => (
                  <li key={item?.id}>✔ {item?.description}</li>
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
