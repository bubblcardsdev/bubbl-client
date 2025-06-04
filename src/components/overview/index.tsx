import React from "react";
import OverviewCards from "./components/overviewCards";
import Leads from "../leads/index";
const Overview = () => {
  return (
    <div>
      <div className=" w-full grid grid-cols-3 gap-7 ">
        <OverviewCards />
        <OverviewCards />
        <OverviewCards />
      </div>
      <div className="flex w-full text-white border border-red-500 h-[350px] mt-[40px]">
        <div className="w-[65%] text-center bg-blue-200">map</div>
        <div className="w-[35%] text-center bg-red-200">rounded</div>
      </div>
      <div className="">
        <Leads />
      </div>
    </div>
  );
};

export default Overview;
