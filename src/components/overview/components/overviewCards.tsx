"use client";
import React from "react";
import Image from "next/image";
// const overviewCardsData = [
//   {
//     title: "No of Profile",
//     count: 5,
//     bgColor: "#C9B6FC",
//     backImage: "/chartBack.png",
//     frontImage: "/chartFront.png",
//   },
// ];
const OverviewCards = () => {
  return (
    <div className="relative flex items-center justify-between p-4 bg-[#C9B6FC] text-black rounded-[20px] w-full h-32 overflow-hidden">
      <div className="z-10">
        <p className="text-md font-semibold">No of Profile</p>
        <p className="text-3xl font-bold">5</p>
      </div>
      <div className="absolute bottom-2 right-0  top-0">
        <Image
          src="/chartBack.png"
          alt="Card 2"
          width={100}
          height={100}
          className="rounded-xl"
        />
      </div>
      <div className="absolute right-[35px] bottom-0 z-10">
        <Image
          src="/chartFront.png"
          alt="Card 1"
          width={130}
          height={100}
          className="rounded-xl "
        />
      </div>
    </div>
  );
};

export default OverviewCards;
