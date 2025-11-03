import { UserContext } from "@/src/context/userContext";
import { useState, useContext } from "react";

export default function Pricings() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const { state }: any = useContext(UserContext);

   const planId = state?.plan?.data?.planId ?? 1
  // Plan details mapped
  const plans = [
    {
      id: 1,
      name: "Free",
      description: "Basic plan for individuals starting out.",
      price: 0,
      features: [
        "✓ Access to basic tools",
        "✓ Limited usage",
        "✓ Community support",
      ],
    },
    {
      id: 2,
      name: "Pro",
      description: "Best for professionals who need advanced tools.",
      price: billingCycle === "monthly" ? 1999 : 19999,
      features: [
        "✓ WebSocket infrastructure",
        "✓ Pre-built components",
        "✓ Email support",
      ],
      tag: "Most popular",
    },
    {
      id: 3,
      name: "Teams",
      description: "For companies collaborating in production.",
      price: billingCycle === "monthly" ? 3499 : 34999,
      features: [
        "✓ WebSocket infrastructure",
        "✓ Pre-built components",
        "✓ Premium support",
        "✓ 99.9% Uptime SLA",
      ],
    },
  ];

  return (
    <div className="text-white py-4 px-0 mt-[0px]">
      <div className="text-center">
        <div className="h-[200px] rounded-xl flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-4 mt-[0px]">Choose your plan</h1>
          <p className="text-[#8F8F8F] mb-8">
            Simple pricing. No hidden fees. Advanced features for your{" "}
            <span className="underline underline-offset-4">business</span>
          </p>
          <div className="inline-flex bg-zinc-700 rounded-lg p-1 mb-10 w-[300px]">
            <button
              className={`px-6 py-2 w-[150px] rounded-md transition-all duration-200 text-[14px] ${
                billingCycle === "monthly" ? "bg-white text-black" : "text-white"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 w-[150px] rounded-md transition-all duration-200 text-[14px] ${
                billingCycle === "yearly" ? "bg-white text-black" : "text-white"
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-x-6 gap-y-8 text-left mt-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 rounded-2xl relative ${
                plan.id === 2
                  ? "bg-gradient-to-br from-[#8654E1] to-[#1A1A1A]"
                  : "bg-[#282828]"
              }`}
            >
              {plan.tag && (
                <span className="absolute top-6 right-4 bg-violet-600 text-xs font-semibold px-2 py-1 rounded text-white">
                  {plan.tag}
                </span>
              )}

              <h2 className="text-xl font-semibold mb-1">{plan.name}</h2>
              <p className="text-[#8E8D91] h-16">{plan.description}</p>

              {plan.price === 0 ? (
                <p className="text-3xl font-bold mb-1">Free</p>
              ) : (
                <p className="text-3xl font-bold mb-1">
                  ₹{plan.price}
                  <span className="text-sm text-[#8E8D91] px-2 ">/month</span>
                </p>
              )}

              {/* Button or Current Plan Indicator */}
              {plan.id === planId ? (
                <button
                  disabled
                  className="w-full bg-green-700 text-white py-2 rounded-md font-semibold mt-[10px] cursor-not-allowed"
                >
                  ✓ Current Plan
                </button>
              ) : plan.price === 0 ? null : (
                <button className="w-full bg-white text-black py-2 rounded-md font-semibold hover:bg-zinc-200 mt-[10px]">
                   Upgrade Now
                </button>
              )}

              <ul className="mt-6 space-y-3 text-[#B4B4B7] text-sm">
                {plan.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
