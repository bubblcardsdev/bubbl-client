"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Qr_icon,
  CallProfileIcon,
  TwitterIcon,
  LinledinFill_icon,
  MailProfileIcon,
  InstagramFill_icon,
  WhatsappFill_icon,
  FacebookFill_icon,
  Arrow_icon,
  Paytm_icon,
  Phonepay_icon,
  Googlepay_icon,
  WebIcon
} from "../../common/icons";
import { theme } from "../../../utils/profileThemecolor";


export const ProTemplateQuartz = ({
  formData,
  selectedTheme,
}: {
  formData: any;
  selectedTheme: any;
}) => {
  const [openSection, setOpenSection] = useState("");
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? "" : section);
  };
  const [color, setColor] = useState<string>("");
  useEffect(() => {
    const selected =
      theme.find((theme) => theme.name === selectedTheme)?.color || "#1f1f1f";
    setColor(selected);
    console.log(selected, "theme");
  }, [selectedTheme]);
  return (
    <div className="w-full max-w-[400px] mx-auto overflow-hidden">
      <div className=" bg-[#D9D9D9] h-[300px]">
        <Image
          src={formData?.profileImageUrl || "/profile.png"}
          alt=""
          width={100}
          height={100}
          className="object-cover w-full"
        />
      </div>
      <div className="px-4 py-8 w-full space-y-3 bg-[#E9BCFF] relative">
        <div className="flex items-center gap-3 ">
          {/* Save Contact Button with Share Icon */}
          <div className="flex items-center justify-between gap-8 ml-2 mt-10">
            <button
              className="flex-1 px-6 py-2 rounded-lg"
              style={{ backgroundColor: color }}
            >
              <span className="text-sm text-white whitespace-nowrap">Save Contact</span>
            </button>
            <button
              className="p-2  rounded-lg"
              style={{ backgroundColor: color }}
            >
              <Qr_icon />
            </button>
          </div>
          <div className="absolute w-24 h-24 xs:w-[80px] xs:h-[80px] bg-white rounded-2xl lg:-top-10 lg:right-5 md:right-0 sm:-top-10 sm:right-8 xs:-top-10 xs:right-3">
            <Image
              src={formData?.companyLogoUrl || "/profile.png"}
              alt=""
              className="object-contain w-full h-full rounded-2xl"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className=" w-full">
          {/* Text Content */}
          <div className="relative w-[80%] h-34 p-2 text-left">
            <p className="text-lg font-bold text-black">Your Name</p>
            <p className="text-md text-black font-semibold">Designation</p>
            <p className="text-sm text-gray-600 mt-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eius roundemod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis.
            </p>
          </div>
        </div>
        <div className="p-0">
          {/* Contact Information */}
          <h2 className="text-lg font-bold mb-2 text-black text-left">Contact Information</h2>
          <div className="flex flex-col gap-4 p-0">
            {/* Phone Number Button */}
            <button
              onClick={() => toggleSection("phone")}
              className="group flex items-center w-full px-[14px] py-[10px]  text-white rounded-xl shadow-lg  transition-all relative"
              style={{ backgroundColor: color }}
            >
              <div className="flex items-center gap-3">
                <CallProfileIcon color={"#FFFFFF"} />
                {formData?.mobileNumbers?.[0]?.number&&formData?.mobileNumbers?.[0]?.number?.length<=0&&<span className="text-sm">Phone Number</span>}
                <span className="ml-1 flex-grow">
                  {formData?.mobileNumbers?.[0]?.countryCode}{" "}
                  {formData?.mobileNumbers?.[0]?.number}
                </span>
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
              className="group flex items-center w-full px-[14px] py-[10px]  text-white rounded-xl shadow-lg  transition-all relative"
              style={{ backgroundColor: color }}
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
              className="group flex items-center w-full px-[14px] py-[10px]  text-white rounded-xl shadow-lg  transition-all relative"
              style={{ backgroundColor: color }}
            >
              <div className="flex items-center gap-3">
                <WebIcon color={"#FFFFFF"} />
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
          <h2 className="text-lg font-bold mb-4 mt-4 text-black text-left">Social Media</h2>
          <div className="grid grid-cols-4 gap-x-4 gap-y-4 ">
            <div
              className="flex items-center justify-center w-14 h-14  rounded-md shadow-md"
              style={{ backgroundColor: color }}
            >
              <InstagramFill_icon />
            </div>
            <div
              className="flex items-center justify-center w-14 h-14 rounded-md shadow-md"
              style={{ backgroundColor: color }}
            >
              <TwitterIcon color="white" />
            </div>
            <div
              className="flex items-center justify-center w-14 h-14  rounded-md shadow-md"
              style={{ backgroundColor: color }}
            >
              <LinledinFill_icon />
            </div>
            <div
              className="flex items-center justify-center w-14 h-14  rounded-md shadow-md"
              style={{ backgroundColor: color }}
            >
              <FacebookFill_icon />
            </div>
            <div
              className="flex items-center justify-center w-14 h-14  rounded-md shadow-md"
              style={{ backgroundColor: color }}
            >
              <WhatsappFill_icon />
            </div>
          </div>
          <h2 className="text-lg font-bold mb-4 mt-4">Social Media</h2>
          <div className="grid grid-cols-3 gap-4 mb-4 mt-4">
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
