"use client";

import React, { useState } from "react";
import {
  Qr_icon,
  CallProfileIcon,
  TwitterIcon,
  LinledinFill_icon,
  MailProfileIcon,
  WebProfileIcon,
  InstagramFill_icon,
  WhatsappFill_icon,
  FacebookFill_icon,
  Arrow_icon,
  Paytm_icon,
  Phonepay_icon,
  Googlepay_icon,
} from "../../common/icons";

const ProTemplateQuartz = () => {
  const [openSection, setOpenSection] = useState("");
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? "" : section);
  };
  return (
    <div className="w-full max-w-[400px] mx-auto overflow-hidden ">
      <div className=" bg-[#D9D9D9] h-[350px]">
        {/* <Image src='/metalCards/patten1.png' alt='' width={100} height={100} className='object-cover' /> */}
      </div>
      <div className="px-8 py-8 w-full space-y-3 bg-[#E9BCFF] relative">
        <div className="flex items-center gap-3 ">
          {/* Save Contact Button with Share Icon */}
          <div className="flex items-center justify-between gap-8 ml-2">
            <button className="flex-1 px-6 py-2 rounded-lg bg-[#8D00D2]">
              <span className="text-sm text-white">Save Contact</span>
            </button>
            <button className="p-2 bg-[#8D00D2] rounded-lg">
            <Qr_icon/>
            </button>
          </div>
          <div className="absolute w-24 h-24 bg-white rounded-2xl -top-10 right-8">
            {/* <Image
              width={200}
              height={200}
              src={LogoImage}
              alt=""
              className="object-contain"
            /> */}
          </div>
        </div>
        <div className=" w-full">
          {/* Text Content */}
          <div className="relative w-[80%] h-34 p-2">
            <p className="text-lg font-bold text-black">Your Name</p>
            <p className="text-md text-black font-semibold">Designation</p>
            <p className="text-sm text-gray-600 mt-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eius roundemod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis.
            </p>
          </div>
        </div>
        <div className="p-2">
          {/* Contact Information */}
          <h2 className="text-lg font-bold mb-2">Contact Information</h2>
          <div className="flex flex-col gap-4 p-0">
            {/* Phone Number Button */}
            <button
              onClick={() => toggleSection("phone")}
              className="group flex items-center w-full px-[14px] py-[10px] bg-[#8D00D2] text-white rounded-xl shadow-lg  transition-all relative"
            >
              <div className="flex items-center gap-3">
                <CallProfileIcon color={"#FFFFFF"} />
                <span className="text-sm">Phone Number</span>
              </div>
              <div className="absolute bg-[#D47DFF] py-[12px] px-[12px] rounded-[100%] backdrop-blur-sm shadow-md -right-2 ">
                <Arrow_icon
                  className={`transition-transform duration-300 ${
                    openSection === "phone" ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>
            {/* Email Button */}
            <button
              onClick={() => toggleSection("email")}
              className="group flex items-center w-full px-[14px] py-[10px] bg-[#8D00D2] text-white rounded-xl shadow-lg  transition-all relative"
            >
              <div className="flex items-center gap-3">
                <MailProfileIcon color={"#FFFFFF"} />
                <span className="text-sm">Email ID</span>
              </div>
              <div className="absolute bg-[#D47DFF] py-[12px] px-[12px] rounded-[100%] backdrop-blur-sm shadow-md -right-2 ">
                <Arrow_icon
                  className={`transition-transform duration-300 ${
                    openSection === "email" ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>
            {/* Website Button */}
            <button
              onClick={() => toggleSection("website")}
              className="group flex items-center w-full px-[14px] py-[10px] bg-[#8D00D2] text-white rounded-xl shadow-lg  transition-all relative"
            >
              <div className="flex items-center gap-3">
                <WebProfileIcon color={"#FFFFFF"} />
                <span className="text-sm">Website</span>
              </div>
              <div className="absolute bg-[#D47DFF] py-[12px] px-[12px] rounded-[100%] backdrop-blur-sm shadow-md -right-2  ">
                <Arrow_icon
                  className={`transition-transform duration-300 ${
                    openSection === "website" ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>
          </div>
          {/* Social Media */}
          <h2 className="text-lg font-bold mb-4 mt-4">Social Media</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center justify-center w-14 h-14 bg-[#8D00D2] rounded-md shadow-md">
              <InstagramFill_icon />
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#8D00D2] rounded-md shadow-md">
              <TwitterIcon color='white' />
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#8D00D2] rounded-md shadow-md">
              <LinledinFill_icon/>
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#8D00D2] rounded-md shadow-md">
              <FacebookFill_icon />
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#8D00D2] rounded-md shadow-md">
              <WhatsappFill_icon />
            </div>  
          </div>
          <h2 className="text-lg font-bold mb-4 mt-4">Social Media</h2>
          <div className="grid grid-cols-4 gap-4 mb-4 mt-4">
            <div className="flex items-center justify-center w-14 h-14 bg-[#8D00D2] rounded-md shadow-md">
              <Googlepay_icon />
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#8D00D2] rounded-md shadow-md">
              <Phonepay_icon color={"#FFFFFF"} />
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#8D00D2] rounded-md shadow-md">
              <Paytm_icon />
            </div>
          </div>
          <hr className="border-gray-300 mb-1 mt-4 border-1 " />
          <div className="flex flex-col justify-center items-center">
            <p className="text-sm font-semibold mb-4 mt-3">
              Go Digital - Save Paper, Trees & Our Earth.
            </p>
            <button className="bg-[#9000FF] text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-[#9000FF]">
              Join Now
            </button>
            <p className="text-xs text-gray-500 mt-4">
              Powered by bubbl.cards ®
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProTemplateQuartz;
