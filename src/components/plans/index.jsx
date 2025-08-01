"use client";
import React, { useState } from "react";
import PricingPlan from "./components/pricingPlans";
import Footer from "../footerPage/index";
import BubblCommunity from "../common/BubblCommunity";
import { FullArrowIcon, RightTickIcon, MessageIcon } from "../common/icons";
import Link from "next/link";

function Plans() {
  const [planIndex, setPlanIndex] = useState(0);
  const data = [
    {
      name: "Base price",
      free: "Free",
      pro: "₹720/month",
      custom: "Custom",
    },
    {
      name: "Monthly active users included",
      free: "50",
      pro: "6,000",
      custom: "Custom",
    },
    {
      name: "Monthly active users overage rate",
      free: "-",
      pro: "₹0.12 per user",
      custom: "Custom",
    },
    {
      name: "Monthly active users cap",
      free: "50",
      pro: "25,000",
      custom: "Unlimited",
    },
    {
      name: "Simultaneous connections per room",
      free: "10",
      pro: "50",
      custom: "Custom",
    },
    {
      name: "Simultaneous connections per project",
      free: "1,000",
      pro: "100,000",
      custom: "Unlimited",
    },
    {
      name: "Projects",
      free: "2",
      pro: "100",
      custom: "100",
    },
    {
      name: "Mentions",
      free: "✓",
      pro: "✓",
      custom: "✓",
    },
    {
      name: "Resolve threads",
      free: "✓",
      pro: "✓",
      custom: "✓",
    },
    {
      name: "Emoji reactions",
      free: "✓",
      pro: "✓",
      custom: "✓",
    },
    {
      name: "Custom metadata",
      free: "✓",
      pro: "✓",
      custom: "✓",
    },
  ];
  const selectedIndex = (index) => {
    setPlanIndex(index);
  };
  return (
      <div className="py-20 lg:px-16 md:px-14 sm:px-10 xs:px-3  flex flex-col gap-y-16 max-w-[1300px] mx-auto">
        <section id="plansBlackBg" className="flex flex-col justify-center">
          <div className=" text-center">
            <p className="text-[#9747FF] p-4 text-2xl">Pricings</p>
            <p className="text-white text-5xl font-bold ">
              Level up with Bubbl pro
            </p>
            <p className="text-gray-400  mt-8">
              Use the core product for free, forever.
            </p>
          </div>
        </section>
        <PricingPlan />
        <section className=" bg-[#121212] rounded-lg text-gray-300 lg:block md:block sm:hidden xs:hidden">
          <div className="max-w-6xl mx-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 ">
                  <th className="p-4 text-left"></th>
                  <th className="p-4 text-left w-[250px]">
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold text-white ">
                        Starter
                      </h2>
                      <a className="text-sm text-gray-400 hover:text-white inline-flex items-center underline">
                        Start building for free
                        <span className="px-2">
                          <FullArrowIcon />
                        </span>
                      </a>
                    </div>
                  </th>
                  <th className="p-4 text-left bg-[#242424] rounded-t-lg border-t-[#313131] w-[250px] ">
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold text-white">Pro</h2>
                      <Link
                        href="/signup"
                        className="text-sm text-gray-400 hover:text-white inline-flex items-center underline  "
                      >
                        Sign up
                        <span className="px-2">
                          <FullArrowIcon />
                        </span>
                      </Link>
                    </div>
                  </th>
                  <th className="p-4 text-left w-[250px]">
                    <div className="space-y-2 ">
                      <h2 className="text-xl font-semibold text-white ">
                        Enterprise
                      </h2>
                      <Link
                        href="/contact"
                        className="text-sm text-gray-400 hover:text-white inline-flex items-center underline"
                      >
                        Contact us
                        <span className="px-2">
                          <FullArrowIcon />
                        </span>
                      </Link>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#313131] border-t ">
                  <td className="p-4">Base price</td>
                  <td className="p-4">Free</td>
                  <td className="p-4 bg-[#242424]">₹720/month</td>
                  <td className="p-4">Custom</td>
                </tr>
                <tr className="border-b border-[#313131]">
                  <td className="p-4">Monthly active users included</td>
                  <td className="p-4 ">50</td>
                  <td className="p-4 bg-[#242424] ">6,000</td>
                  <td className="p-4">Custom</td>
                </tr>
                <tr className="border-b  border-[#313131] ">
                  <td className="p-4 ">Monthly active users overage rate</td>
                  <td className="p-4">-</td>
                  <td className="p-4  bg-[#242424]">₹0.12 per user</td>
                  <td className="p-4 ">Custom</td>
                </tr>
                <tr className="border-b border-[#313131]">
                  <td className="p-4">Monthly active users cap</td>
                  <td className="p-4">50</td>
                  <td className="p-4  bg-[#242424]">25,000</td>
                  <td className="p-4 ">Unlimited</td>
                </tr>
                <tr className="border-b border-[#313131] ">
                  <td className="p-4 ">Simultaneous connections per room</td>
                  <td className="p-4 ">10</td>
                  <td className="p-4  bg-[#242424]">50</td>
                  <td className="p-4 ">Custom</td>
                </tr>
                <tr className="border-b  border-[#313131]">
                  <td className="p-4 ">Simultaneous connections per project</td>
                  <td className="p-4 ">1,000</td>
                  <td className="p-4  bg-[#242424]">100,000</td>
                  <td className="p-4 ">Unlimited</td>
                </tr>
                <tr className="border-b border-[#313131] ">
                  <td className="p-4 ">Projects</td>
                  <td className="p-4 ">2</td>
                  <td className="p-4  bg-[#242424]">100</td>
                  <td className="p-4">100</td>
                </tr>
                <tr className="border-b border-[#313131]">
                  <td className="p-4 i">Mentions</td>
                  <td className="p-4">&#10003;</td>
                  <td className="p-4 bg-[#242424]">&#10003;</td>
                  <td className="p-4">&#10003;</td>
                </tr>
                <tr className="border-b border-[#313131]">
                  <td className="p-4 ">Resolve threads</td>
                  <td className="p-4">&#10003;</td>
                  <td className="p-4 bg-[#242424]">&#10003;</td>
                  <td className="p-4">&#10003;</td>
                </tr>
                <tr className="border-b border-[#313131]">
                  <td className="p-4 ">Emoji reactions</td>
                  <td className="p-4">&#10003;</td>
                  <td className="p-4 bg-[#242424]">&#10003;</td>
                  <td className="p-4">&#10003;</td>
                </tr>
                <tr className="border-b border-[#313131] ">
                  <td className="p-4 ">Custom metadata</td>
                  <td className="p-4">&#10003;</td>
                  <td className="p-4 bg-[#242424]">&#10003;</td>
                  <td className="p-4">&#10003;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="min-h-[80vh] bg-black text-gray-300 lg:hidden md:hidden sm:block xs:block overflow-x-auto max-h-[300px] overflow-y-auto scrollbar-hide ">
          <div className="lg:hidden md:hidden sm:flex xs:flex justify-between items-center sm:px-4 xs:px-[5px] xs:gap-x-2 sticky top-0 z-10 bg-black py-2">
            <button
              onClick={() => selectedIndex(0)}
              style={{
                background: planIndex == 0 ? "rgba(130,130,130,0.3)" : "",
              }}
              className="border border-[rgba(130,130,130,0.3)] py-1 xs:w-full sm:px-14 rounded-md text-white"
            >
              Free
            </button>
            <button
              onClick={() => selectedIndex(1)}
              style={{
                background: planIndex == 1 ? "rgba(130,130,130,0.3)" : "",
              }}
              className="border border-[rgba(130,130,130,0.3)] py-1 xs:w-full sm:px-14 rounded-md text-white "
            >
              Pro
            </button>
            <button
              onClick={() => selectedIndex(2)}
              style={{
                background: planIndex == 2 ? "rgba(130,130,130,0.3)" : "",
              }}
              className="border border-[rgba(130,130,130,0.3)] py-1 xs:w-full sm:px-14 rounded-md text-white"
            >
              Pro+
            </button>
          </div>

          <div className="overflow-x-auto sm:overflow-x-hidden  overflow-y-auto ">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left"></th>
                  {planIndex == 0 && (
                    <th className="p-4 text-center">
                      <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-white">
                          Starter
                        </h2>
                        <a className="text-sm text-gray-400 hover:text-white inline-flex items-center ">
                          Start building for free
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </div>
                    </th>
                  )}
                  {planIndex == 1 && (
                    <th className="p-4 text-center rounded-t-lg">
                      <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-white">
                          Pro
                        </h2>
                        <Link
                          href="#"
                          className="text-sm text-gray-400 hover:text-white inline-flex items-cente "
                        >
                          Sign up
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Link>
                      </div>
                    </th>
                  )}
                  {planIndex == 2 && (
                    <th className="p-4 text-center">
                      <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-white ">
                          Enterprise
                        </h2>
                        <Link
                          href="#"
                          className="text-sm text-gray-400 hover:text-white inline-flex items-center "
                        >
                          Contact us
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Link>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data &&
                  data?.length > 0 &&
                  data?.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td className="p-4 ">{value?.name}</td>
                        {planIndex == 0 && (
                          <td className="p-4  text-center">{value?.free}</td>
                        )}
                        {planIndex == 1 && (
                          <td className="p-4  text-center">{value?.pro}</td>
                        )}
                        {planIndex == 2 && (
                          <td className="p-4 text-center">{value?.custom}</td>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
        <BubblCommunity />
      </div>
  );
}
export default Plans;
