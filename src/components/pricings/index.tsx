import React, { useState } from "react";

function Pricings() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  return (
    <div className="">
      <div className="text-white py-4 px-0 mt-[0px] ">
        <div className=" text-center  ">
          <div
            className="  h-[200px] rounded-xl flex flex-col justify-center items-center"
            // style={{ backgroundImage: "url('/pricings_Bg.png')" }}
          >
            <h1 className="text-4xl font-bold mb-4 mt-[0px]">
              Choose your plan
            </h1>
            <p className="text-[#8F8F8F] mb-8">
              Simple pricing . No hidden fees . Advanced feature for your
              <span className="underline underline-offset-4">Business</span>
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
                className={`px-6 py-2 w-[150px] rounded-md transition-all duration-200  text-[14px] ${
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
          <div className="grid md:grid-cols-3 gap-x-6 gap-y-8 text-left mt-4 ">
            <div className="bg-[#282828] p-6 rounded-2xl  relative ">
              <span className="absolute top-6 right-4 bg-violet-600 text-xs font-semibold px-2 py-1 rounded text-white">
                Most popular
              </span>
              <h2 className="text-xl font-semibold mb-1">Pro</h2>
              <p className="text-[#8E8D91] h-16">Best for Professionals</p>
              <p className="text-3xl font-bold mb-1 ">
                ₹{billingCycle === "monthly" ? "1999" : "19999"}
                <span className="text-sm text-[#8E8D91] px-2 ">/month</span>
              </p>
              <button className="w-full bg-white text-black py-2 rounded-md font-semibold hover:bg-zinc-200 mt-[10px]">
                Choose plan
              </button>
              <ul className="mt-6 space-y-3 text-[#B4B4B7] text-sm">
                <li>✓ WebSocket infrastructure</li>
                <li>✓ Pre-built components</li>
                <li>✓ Email support</li>
              </ul>
            </div>
            <div className="bg-[#282828] p-6 rounded-2xl border  bg-gradient-to-br from-[#8654E1] to-[#1A1A1A]">
              <h2 className="text-xl font-semibold mb-1">Pro +</h2>
              <p className="text-[#8E8D91]  h-16">
                For companies adding collaboration in production.
              </p>
              <p className="text-3xl font-bold  ">
                ₹{billingCycle === "monthly" ? "3499" : "34999"}
              </p>
              <button className="w-full bg-white text-black py-2 rounded-md font-semibold hover:bg-zinc-200 mt-[10px]">
                Choose plan
              </button>
              <ul className="mt-6 space-y-3 text-[#B4B4B7] text-sm">
                <li>✓ WebSocket infrastructure</li>
                <li>✓ Pre-built components</li>
                <li>✓ Email support</li>
              </ul>
            </div>
            <div className="bg-[#282828] p-6 rounded-2xl ">
              <h2 className="text-xl font-semibold ">Enterprise</h2>
              <p className="text-[#8E8D91]  h-16">
                For organizations that need more support and compliance
                features.
              </p>
              <p className="text-3xl font-bold  ">Custom</p>
              <button className="w-full bg-white text-black py-2 rounded-md font-semibold hover:bg-zinc-200 mt-[12px]">
                Choose plan
              </button>
              <ul className="mt-6 space-y-3 text-[#B4B4B7] text-sm">
                <li>✓ WebSocket infrastructure</li>
                <li>✓ Pre-built components</li>
                <li>✓ Premium support</li>
                <li>✓ 99.9% Uptime SLA</li>
                <li>✓ Private dedicated servers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricings;
