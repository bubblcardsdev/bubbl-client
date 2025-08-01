"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Share_icon,
  Qr_icon,
  CallProfileIcon,
  TwitterIcon,
  Paytm_icon,
  Phonepay_icon,
  Googlepay_icon,
  LinledinFill_icon,
  MailProfileIcon,
  WebProfileIcon,
  InstagramFill_icon,
  WhatsappFill_icon,
  LocationFill_icon,
  FacebookFill_icon,
} from "../../common/icons";
import { theme } from "../../../utils/profileThemecolor";

export const ProTemplateSpahire = ({
  formData,
  selectedTheme,
}: {
  formData: any;
  selectedTheme: any;
}) => {
  // const toggleSection = (section: any) => {
  //   setOpenSection(openSection === section ? "" : section);
  // };
  const [color, setColor] = useState<string>("");
  useEffect(() => {
    const selected =
      theme.find((theme) => theme.name === selectedTheme)?.color || "#1f1f1f";
    setColor(selected);
    console.log(selected, "theme");
  }, [selectedTheme]);
  return (
    <div className="w-full max-w-[400px] mx-auto overflow-hidden">
      <div className=" bg-gray-200 h-[400px] ">
        <Image
          src={formData?.profileImageUrl || "/profile.png"}
          alt=""
          width={100}
          height={100}
          className="object-fill w-full"
        />
      </div>

      <div className="px-6 py-8 w-full space-y-3 bg-white">
        <div className="relative rounded-lg w-fit h-34 bg-[#ccc] flex items-center flex-row border">
          {/* Text Content */}
          <div className="relative w-[320px] h-34 p-2">
            <p className="text-lg font-bold" style={{ color: color }}>
              Your Name
            </p>
            <p className="text-black text-xl font-bold">
              {formData?.name || "Name"}{" "}
            </p>
            <p className="text-black text-md">
              {formData?.position || "Designation"}
            </p>
            <p className="text-black text-md">
              {formData?.companyName || "company name"}
            </p>
          </div>
          {/* Logo Div (Overlapping) */}
          <div className=" bg-black h-[100px] w-[100px] absolute  -right-8 flex items-center">
            <p className="text-white font-semibold rounded-sm">
              <Image
                src={formData?.companyLogoUrl || "/profile.png"}
                alt=""
                height={500}
                width={500}
              />
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-0">
          {/* Save Contact Button with Share Icon */}
          <div
            className="flex items-center justify-between rounded-lg border-2 border-purple-600  flex-1 h-[45px]"
            style={{ border: "2px solid " + color }}
          >
            <button className="flex-1  h-fit w-[10px]">
              <span
                className="text-md  font-semibold"
                style={{ color: color }}
              >
                Save Contact
              </span>
            </button>
            <div
              className="border-l-2  h-full flex items-center  px-2"
              style={{ borderLeft: "2px solid " + color }}
            >
              <Share_icon color={color} />
            </div>
          </div>
          {/* QR Code Button */}
          <button className="p-[10px]  rounded-lg"
           style={{ backgroundColor: color }}
          >
            <Qr_icon />
          </button>
        </div>
        <div className="p-2">
          {/* Contact Information */}
          <h2 className="text-lg font-bold mb-4">Contact Information</h2>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="relative flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <CallProfileIcon color={color} />
              <span className="ml-1 flex-grow">
                {/* {formData?.mobileNumbers?.[0]?.countryCode}{" "} */}
                {formData?.mobileNumbers?.[0]?.number}
              </span>
            </div>
            <div className="relative flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <MailProfileIcon color={color} />
              <span className="ml-1 flex-grow">{formData?.emails?.[0]}</span>
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <LocationFill_icon color={color}/>
              <span className="ml-1 flex-grow">
                {formData?.websiteLinks?.[0]}
              </span>
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <WebProfileIcon color={color} />
              <span className="ml-1 flex-grow">
                {formData?.websiteLinks?.[0]}
              </span>
            </div>
          </div>
          {/* Social Media */}
          <h2 className="text-lg font-bold mb-4">Social Media</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <InstagramFill_icon color={color} />
              <p className="text-[12px]">{formData?.socialLinks?.[0]}</p>
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <WhatsappFill_icon color={color} />
              <p className="text-[12px]">{formData?.socialLinks?.[4]}</p>
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <FacebookFill_icon color={color} />
              <p className="text-[12px]">{formData?.socialLinks?.[5]}</p>
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <LinledinFill_icon color={color} />
              <p className="text-[12px]">{formData?.socialLinks?.[5]}</p>
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <TwitterIcon color={color} />
            </div>
          </div>
          <h2 className="text-lg font-bold mb-6">Digital payments</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center justify-center w-14 h-14  rounded-md shadow-md ">
              <Googlepay_icon />
              <p className="text-[12px]">{formData?.digitalLinks?.[0]}</p>
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <Phonepay_icon color="#5F259F" />
              <p className="text-[12px]">{formData?.digitalLinks?.[1]}</p>
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <Paytm_icon />
              <p className="text-[12px]">{formData?.digitalLinks?.[2]}</p>
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
