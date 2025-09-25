"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  CallProfileIcon,
  MailProfileIcon,
  Arrow_icon,
  Paytm_icon,
  Phonepay_icon,
  Googlepay_icon,
  WebIcon,
  LocationFill_icon,
  QuartzFacebookIcon,
  QuartzWhatsappIcon,
  QuartzTwitterIcon,
  QuartzLinkedinIcon,
  QuartzYoutubeIcon,
  QuartzInstagramIcon,
} from "../../common/icons";
import { theme } from "../../../utils/profileThemecolor";
import { openInNewTab } from "../../../utils/commonLogics";
import QrGenerator from "./QrGenerator";
import { createTap } from "@/src/services/profileApi";
import { ActionKeys, actions, SOCIAL_MEDIA_IDS } from "@/src/lib/constant";
import { useRouter } from "next/router";

const ProTemplateQuartz = ({
  formData,
  selectedTheme,
  handleSave,
}: {
  formData: any;
  selectedTheme: any;
  handleSave: () => void;
}) => {
  // const [openSection, setOpenSection] = useState("");
  // const toggleSection = (section: string) => {
  //   setOpenSection(openSection === section ? "" : section);
  // };
  const [color, setColor] = useState<string>("");
  useEffect(() => {
    const selected =
      theme.find((theme) => theme.name === selectedTheme)?.color || "#1f1f1f";
    setColor(selected);
    console.log(selected, "theme");
  }, [selectedTheme]);
  const SocialIconsObj: any = {
    "1": QuartzInstagramIcon,
    "2": QuartzFacebookIcon,
    "3": QuartzTwitterIcon,
    "4": QuartzYoutubeIcon,
    "5": QuartzLinkedinIcon,
    "6": QuartzWhatsappIcon,
  };
  const DigitalIconsObj: any = {
    "1": Googlepay_icon,
    "2": Phonepay_icon,
    "3": Paytm_icon,
  };
    const router = useRouter();
  
  return (
    <div className="w-full max-w-[400px] mx-auto overflow-hidden  ">
      <div className=" bg-[#D9D9D9] border border-red-500 h-[400px] ">
        <Image
          src={formData?.profileImageUrl || "/profile.png"}
          alt=""
          width={500}
          height={500}
          className="object-fill w-full h-full "
        />
      </div>
      <div className="px-4 py-8 w-full space-y-3 bg-[#E9BCFF] relative">
        <div className="flex items-center gap-3 ">
          {/* Save Contact Button with Share Icon */}
          <div className="flex items-center justify-between gap-8 ml-2 mt-10">
            <button
              className="flex-1 px-6 py-2 rounded-lg"
              onClick={handleSave}
              style={{ backgroundColor: color }}
            >
              <span className="text-sm text-white whitespace-nowrap">
                Save Contact
              </span>
            </button>
            <button
              className="p-2  rounded-lg"
              style={{ backgroundColor: color }}
            >
              <QrGenerator
                color={color}
                  deviceIdQR={formData?.profileUid}
                qrBubbl=""
                qrImageUrl=""
              />
            </button>
          </div>
          <div className="absolute w-24 h-24 xs:w-[80px] xs:h-[80px] bg-white rounded-2xl lg:-top-10 lg:right-5 md:right-0 sm:-top-10 sm:right-8 xs:-top-10 xs:right-3">
            <Image
              src={formData?.companyLogoUrl || "/logo.png"}
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
            <p className="text-lg font-bold text-black">
              {formData?.firstName + "" + formData.lastName || "Name"}{" "}
            </p>
            <p className="text-md text-black font-semibold">
              {" "}
              {formData?.position || "Designation"}{" "}
            </p>
            <p className="text-sm text-gray-600 mt-0">
              {formData?.companyName || "company name"}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mt-3">
              {formData?.shortDescription}
            </p>
          </div>
        </div>
        <div className="p-0">
          {/* Contact Information */}
          {(formData?.phoneNumbers?.[0]?.phoneNumber ||
            formData?.emailIds?.[0]?.emailId?.length > 0 ||
            formData?.websites?.[0]?.website?.length > 0 ||
            (formData?.state && formData?.country)) && (
            <h2 className="text-lg font-bold mb-2 text-black text-left">
              Contact Information
            </h2>
          )}
          <div className="flex flex-col gap-4 p-0">
            {/* Phone Number Button */}
            {formData?.phoneNumbers?.[0]?.phoneNumber && (
              <button
                // onClick={() => toggleSection("phone")}
                className="group flex items-center w-full px-[14px] py-[10px]  text-white rounded-xl shadow-lg  transition-all relative"
                style={{ backgroundColor: color }}
              >
                <div className="flex items-center gap-3">
                  <CallProfileIcon color={"#FFFFFF"} />
                  <span className="ml-1 flex-grow">
                    {formData?.phoneNumbers?.[0]?.countryCode}{" "}
                    {formData?.phoneNumbers?.[0]?.phoneNumber}
                  </span>
                </div>
                <div className="absolute bg-[#D47DFF] py-[12px] px-[12px] rounded-[100%] backdrop-blur-sm shadow-md -right-2 ">
                  <Arrow_icon
                  // className={`transition-transform duration-300 ${
                  //   openSection === "phone" ? "rotate-180" : ""
                  // }`}
                  />
                </div>
              </button>
            )}
            {/* Email Button */}
            {formData?.emailIds?.[0]?.emailId?.length > 0 && (
              <button
                // onClick={() => toggleSection("email")}
                className="group flex items-center w-full px-[14px] py-[10px]  text-white rounded-xl shadow-lg  transition-all relative"
                style={{ backgroundColor: color }}
              >
                <div className="flex items-center gap-3">
                  <MailProfileIcon color={"#FFFFFF"} />
                  <span className="text-sm">
                    {formData?.emailIds?.[0]?.emailId}
                  </span>
                </div>
                <div className="absolute bg-[#D47DFF] py-[12px] px-[12px] rounded-[100%] backdrop-blur-sm shadow-md -right-2 ">
                  <Arrow_icon
                  // className={`transition-transform duration-300 ${
                  //   openSection === "email" ? "rotate-180" : ""
                  // }`}
                  />
                </div>
              </button>
            )}
            {/* Website Button */}
            {formData?.websites?.[0]?.website?.length > 0 && (
              <button
                // onClick={() => toggleSection("website")}
                className="group flex items-center w-full px-[14px] py-[10px]  text-white rounded-xl shadow-lg  transition-all relative"
                style={{ backgroundColor: color }}
              >
                <div className="flex items-center gap-3">
                  <WebIcon color={"#FFFFFF"} />
                  <span className="text-sm">
                    {" "}
                    {formData?.websites?.[0]?.website}
                  </span>
                </div>
                <div className="absolute bg-[#D47DFF] py-[12px] px-[12px] rounded-[100%] backdrop-blur-sm shadow-md -right-2  ">
                  <Arrow_icon
                  // className={`transition-transform duration-300 ${
                  //   openSection === "website" ? "rotate-180" : ""
                  // }`}
                  />
                </div>
              </button>
            )}
            {formData?.state && formData?.country && (
              <button
                // onClick={() => toggleSection("website")}
                className="group flex items-center w-full px-[14px] py-[10px]  text-white rounded-xl shadow-lg  transition-all relative"
                style={{ backgroundColor: color }}
              >
                <div className="flex items-center gap-3">
                  <LocationFill_icon color={"#FFFFFF"} />
                  <span className="text-sm">
                    {formData?.state && formData?.country
                      ? formData?.state + ", " + formData?.country
                      : ""}
                  </span>
                </div>
                <div className="absolute bg-[#D47DFF] py-[12px] px-[12px] rounded-[100%] backdrop-blur-sm shadow-md -right-2  ">
                  <Arrow_icon
                  // className={`transition-transform duration-300 ${
                  //   openSection === "website" ? "rotate-180" : ""
                  // }`}
                  />
                </div>
              </button>
            )}
          </div>
          {/* Social Media */}
          {formData?.socialMediaNames
            ?.map((value: any) => value?.socialMediaName?.length > 0)
            ?.includes(true) && (
            <h2 className="text-lg font-bold mb-4 mt-4 text-black text-left">
              Social Media
            </h2>
          )}
          <div className="grid grid-cols-4 gap-x-4 gap-y-4 ">
            {formData?.socialMediaNames &&
              [...formData.socialMediaNames] // clone array so original isn't mutated
                .sort(
                  (a: any, b: any) =>
                    (a?.profileSocialMediaId || 0) -
                    (b?.profileSocialMediaId || 0)
                ) // sort by ID
                .map((value: any) => {
                  const Icon = SocialIconsObj?.[value?.profileSocialMediaId];
                  if (value?.socialMediaName?.length > 0) {
                    return (
                      <div
                        key={value}
                        role="button"
                        onClick={() => {
                           console.log(value,"/",formData);
                           if(formData.deviceUid){
                           createTap(actions[SOCIAL_MEDIA_IDS[value.profileSocialMediaId] as ActionKeys], formData.deviceUid)
                           }
                          openInNewTab(value?.socialMediaName)
                        }}
                        className="flex items-center justify-center w-10 h-10  rounded-md "
                        style={{ backgroundColor: color }}
                      >
                        <Icon color={"#ffffff"} size={24} />
                      </div>
                    );
                  }
                })}
          </div>
          {formData?.digitalPaymentLinks?.map &&
            formData?.digitalPaymentLinks
              ?.map((value: any) => value?.digitalPaymentLink?.length > 0)
              ?.includes(true) && (
              <h2 className="text-lg font-bold mb-4 mt-4 text-left text-black">
                Digital Payments
              </h2>
            )}
          <div className="grid grid-cols-3  mb-4 mt-4">
            {formData?.digitalPaymentLinks &&
              formData?.digitalPaymentLinks?.map(
                (value: any, index: number) => {
                  const Icon =
                    DigitalIconsObj?.[value?.profileDigitalPaymentsId];
                  if (value?.digitalPaymentLink?.length > 0) {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-center w-10 h-10  rounded-md shadow-md"
                        style={{ backgroundColor: color }}
                      >
                        <Icon color={"#FFFFFF"} />
                      </div>
                    );
                  }
                }
              )}
          </div>
          <hr className="border-gray-300 mb-1 mt-4 border-1 " />
          <div className="flex flex-col justify-center items-center">
            <p className="text-sm font-semibold mb-4 mt-3 text-black">
              Go Digital - Save Paper, Trees & Our Earth.
            </p>
            <button onClick={()=>router.push("/")} className="bg-[#9000FF] text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-[#9000FF]">
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
