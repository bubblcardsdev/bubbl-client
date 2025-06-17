import React from "react";

const BubblCommunity = () => {
  return (
    <div className=" bg-[#1D1D1D] rounded-xl flex flex-row w-full box-border lg:gap-24 md:gap-10 sm:gap-10 xs:gap-10 items-center  lg:flex-row md:flex-col sm:flex-col xs:flex-col px-10 py-14 bg-[url('/communityShadow.png')] bg-cover bg-center bg-no-repeat ">
      <div className="w-full">
        <h2 className="text-2xl text-white lg:text-left md:text-center sm:text-center xs:text-center lg:whitespace-nowrap">
          Join 2,000+ Bubbl Community
        </h2>
        <p className="text-gray-400 pt-2 w-full tracking-[1px] lg:text-left md:text-center sm:text-center xs:text-center text-sm">
          Stay in the loop with everything you need to know.
        </p>
      </div>
      <div className="flex flex-col gap-[1px] w-full  ">
        <div className="w-full flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-[20px] ">
          <input
            type="email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="placeholder:text-[14px] w-full px-3 py-2 bg-[#111111] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="px-7 py-2 bg-[#9747FF] text-white font-medium rounded-lg hover:bg-[#a66bf4] transition-colors lg:w-fit md:w-full sm:w-full xs:w-full"
          >
            Subscribe
          </button>
        </div>
        <p className="mt-2 pl-1 text-sm  text-gray-400 lg:text-left md:text-center sm:text-center xs:text-center w-full">
          We care about your data in our
          <a href="/privacyPolicy" className="underline hover:text-[#a66bf4] px-1 ">
            privacy policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default BubblCommunity;
