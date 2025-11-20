"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Share_icon,
  Phone_icon,
  Mail_icon,
  WebIcon_thin,
  Location_icon,
  Arrow_icon,
  Googlepay_icon,
  Paytm_icon,
  Phonepay_icon,
  Instagram_icon,
  Facebook_icon_thin,
  OpalYoutubeIcon,
  Twitter_icon_thin,
  OpalWhatsappIcon,
  Linkedin_icon_thin,
} from "../../common/icons";

import QrGenerator from "./QrGenerator";
import {
  navigatorShare,
} from "@/src/utils/commonLogics";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { onAddressClick, onCallClick, onEmailClick, onPaymentClick, onSocialMediaClick, onWebsiteClick } from "@/src/helpers/profile";
import { useShowHideWithRecord } from "@/src/hooks/useShowHideWithRecord";
import MultiPopup from "./multiPopup";

const FreeTemplateOpal = ({
  formData,
  selectedTheme,
  handleSave,
}: {
  formData: any;
  selectedTheme: any;
  handleSave: () => void;
}) => {
  console.log(formData, "?");

  const [color, setColor] = useState<string>("");
  const { object, onShow, onHide } = useShowHideWithRecord({
    visible: false,
    title: "",
    data: "",
  });
  useEffect(() => {

    setColor(selectedTheme);
  }, [selectedTheme]);

  const router = useRouter();
  console.log(router.asPath.slice(1));

  const DigitalIconsObj: any = {
    "1": Googlepay_icon,
    "2": Phonepay_icon,
    "3": Paytm_icon,
  };

  const SocialIconsObj: any = {
    "1": Instagram_icon,
    "2": Facebook_icon_thin,
    "3": Twitter_icon_thin,
    "4": OpalYoutubeIcon,
    "5": Linkedin_icon_thin,
    "6": OpalWhatsappIcon,
  };
  const newProfile = router.pathname !== "/createNewProfile";
  return (
    <div className="w-full flex justify-center items-center">
      <ToastContainer />
      <MultiPopup
        visible={object.visible}
        list={object.data}
        onClose={onHide}
        title={object.title}
      />
      <div className="w-full bg-[#EDEDED]  relative overflow-hidden shadow-[1px_1px_4px_0px_rgb(163_162_162_/_60%)] sm:max-w-[380px]">
        {/* Header curved background */}
        <div
          className="w-full h-[165px] rounded-br-[550px] relative"
          style={{ backgroundColor: color }}
        >
          <Image
            src={formData?.profileImageUrl || "/profile.png"}
            alt="profile_Img"
            width={120}
            height={120}
            className="w-[150px] h-[150px] absolute bottom-0 translate-y-[50%] translate-x-[-50%] left-1/2  rounded-full object-cover"
          />
        </div>

        <div className="p-3 xs:p-4 sm:p-5 space-y-3 xs:space-y-4 sm:space-y-6 mt-[80px]">
          {/* Action buttons and company logo section */}
          <div className="flex justify-between items-center gap-10">
            <div className="flex flex-col space-y-2 xs:space-y-3 sm:space-y-4 flex-1">
              <button
                onClick={handleSave}
                className="px-6 py-3 text-white rounded-[6px] text-xs xs:text-sm sm:text-base font-medium whitespace-nowrap"
                style={{ backgroundColor: color }}
              >
                Save Contact
              </button>
              {newProfile && (
                <div className="flex space-x-2 xs:space-x-3 sm:space-x-4">
                  <button
                    onClick={() => navigatorShare(window.location.href)}
                    className=" rounded-md flex-shrink-0  p-3"
                    style={{ backgroundColor: color }}
                  >
                    <Share_icon />
                  </button>

                  <button
                    className=" rounded-md flex-shrink-0 "
                    style={{ backgroundColor: color }}
                  >
                    <QrGenerator
                      color={"#ffffff"}
                      deviceIdQR={formData?.profileUid}
                      qrBubbl=""
                      qrImageUrl=""
                    />
                  </button>
                </div>
              )}
            </div>
            {/* Company Logo - Responsive sizing */}
            <div className="flex-shrink-0">
              <div className="w-[110px] h-[110px]  rounded-full flex items-center justify-center overflow-hidden bg-black ">
                <Image
                  src={formData?.companyLogoUrl || "/logo.png"}
                  width={110}
                  height={110}
                  alt="company_logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="">
            <h1 className="text-lg  font-bold text-left text-black leading-tight mb-2">
              {formData?.firstName + " " + formData?.lastName || "Your Name"}
            </h1>
            <p className="text-base text-gray-700 text-left ">
              {formData?.designation || "Designation"}
            </p>
            <p className="text-base text-gray-600 text-left mb-2">
              {formData?.companyName || "Company Name"}
            </p>
            <p className="text-sm text-gray-600 text-left leading-relaxed ">
              {formData?.shortDescription || ""}</p>
          </div>

          {/* Contact Information */}
          <div className="space-y-3 xs:space-y-4">
            {(formData?.phoneNumbers?.[0]?.phoneNumber ||
              formData?.emailIds?.[0]?.emailId?.length > 0 ||
              formData?.websites?.[0]?.website?.length > 0 ||
              (formData?.state && formData?.country)) && (
                <h2 className="text-base xs:text-lg sm:text-xl font-bold text-black text-left">
                  Contact Information
                </h2>
              )}

            <div className="space-y-2 xs:space-y-3 sm:space-y-4 flex flex-col ">
              {/* Phone */}
              {formData?.phoneNumbers?.[0]?.phoneNumber && (
                <button
                  onClick={async (e) => {
                    e.preventDefault(); // stop immediate dial
                    onCallClick(formData, onShow);
                  }}
                >
                  <div className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden text-black text-left">
                    <div className="flex-1 flex items-center gap-2 xs:gap-3 p-2.5 xs:p-3 sm:p-4 min-w-0">
                      <Phone_icon color={color} />
                      <span className="flex-grow text-xs xs:text-sm sm:text-base truncate">
                        {formData?.phoneNumbers?.[0]?.countryCode}{" "}
                        {formData?.phoneNumbers?.[0]?.phoneNumber}
                      </span>
                    </div>
                    <div
                      className="flex items-center px-2 xs:px-3 flex-shrink-0"
                      style={{ backgroundColor: color }}
                    >
                      <Arrow_icon />
                    </div>
                  </div>
                </button>
              )}

              {/* Email */}
              {formData?.emailIds?.[0]?.emailId?.length > 0 && (
                <button
                  onClick={async (e) => {
                    e.preventDefault(); // stop immediate navigation
                    onEmailClick(formData, onShow);
                  }}
                >
                  <div className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden text-black text-left">
                    <div className="flex-1 flex items-center gap-2 xs:gap-3 p-2.5 xs:p-3 sm:p-4 min-w-0">
                      <Mail_icon color={color} />
                      <span className="flex-grow text-xs xs:text-sm sm:text-base truncate">
                        {formData?.emailIds?.[0]?.emailId}
                      </span>
                    </div>
                    <div
                      className="flex items-center px-2 xs:px-3 flex-shrink-0"
                      style={{ backgroundColor: color }}
                    >
                      <Arrow_icon />
                    </div>
                  </div>
                </button>
              )}

              {/* Website */}
              {formData?.websites?.[0]?.website?.length > 0 && (
                <button
                  onClick={async (e) => {
                    e.preventDefault(); // stop immediate navigation
                    onWebsiteClick(formData, onShow);
                  }}
                >
                  <div className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden text-black">
                    <div className="flex-1 flex items-center gap-2 xs:gap-3 p-2.5 xs:p-3 sm:p-4 min-w-0">
                      <WebIcon_thin color={color} />
                      <span className="text-xs xs:text-sm sm:text-base truncate">
                        {formData?.websites?.[0]?.website}
                      </span>
                    </div>
                    <div
                      className="flex items-center px-2 xs:px-3 flex-shrink-0"
                      style={{ backgroundColor: color }}
                    >
                      <Arrow_icon />
                    </div>
                  </div>
                </button>
              )}

              {/* Location */}
              {formData?.state && formData?.country && (
                <button
                  onClick={async (e) => {
                    e.preventDefault(); // prevent immediate redirect
                    onAddressClick(formData);
                  }}
                >
                  <div className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden text-black text-left">
                    <div className="flex-1 flex items-center gap-2 xs:gap-3 p-2.5 xs:p-3 sm:p-4 min-w-0">
                      <Location_icon color={color} />
                      <span className="flex-grow text-xs xs:text-sm sm:text-base truncate">
                        {formData?.state}, {formData?.country}
                      </span>
                    </div>
                    <div
                      className="flex items-center px-2 xs:px-3 flex-shrink-0"
                      style={{ backgroundColor: color }}
                    >
                      <Arrow_icon />
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-3 xs:space-y-4">
            {formData?.socialMediaNames
              ?.map((value: any) => value?.socialMediaName?.length > 0)
              ?.includes(true) && (
                <h2 className="text-base xs:text-lg sm:text-xl font-bold text-left text-black">
                  Social Media
                </h2>
              )}
            <div className="space-y-2 xs:space-y-3 sm:space-y-4 text-left">
              {formData?.socialMediaNames &&
                [...formData.socialMediaNames]
                  .sort(
                    (a: any, b: any) =>
                      (a?.profileSocialMediaId || 0) -
                      (b?.profileSocialMediaId || 0)
                  )
                  .map((value: any, index: number) => {
                    const Icon = SocialIconsObj?.[value?.profileSocialMediaId];
                    const name: any = {
                      1: "Instagram",
                      2: "Facebook",
                      3: "Twitter",
                      4: "Youtube",
                      5: "LinkedIn",
                      6: "WhatsApp",
                    };

                    if (value?.socialMediaName?.length > 0) {
                      return (
                        <div
                          className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden cursor-pointer"
                          key={index}
                          onClick={() => {
                            onSocialMediaClick(value, formData);
                          }}
                        >
                          <div className="flex-1 flex items-center gap-2  xs:gap-3 p-2.5 xs:p-3 sm:p-4  min-w-0">
                            {Icon && <Icon color={color} />}
                            <div className="flex-grow min-w-0">
                              <h1 className="text-black font-semibold text-xs xs:text-sm sm:text-[16px] truncate">
                                {name?.[value?.profileSocialMediaId]}
                              </h1>
                              <p className="text-xs sm:text-[12px] text-gray-600 truncate">
                                {formData?.socialLinks?.[0]}
                              </p>
                              <p>{formData?.socialMediaName}</p>
                            </div>
                          </div>
                          <div
                            className="flex items-center px-2 xs:px-3 flex-shrink-0"
                            style={{ backgroundColor: color }}
                          >
                            <Arrow_icon />
                          </div>
                        </div>
                      );
                    }
                  })}
            </div>
          </div>

          {/* Digital Payments */}
          <div className="space-y-3 xs:space-y-4">
            {formData?.digitalPaymentLinks?.map &&
              formData?.digitalPaymentLinks
                ?.map((value: any) => value?.digitalPaymentLink?.length > 0)
                ?.includes(true) && (
                <h2 className="text-base xs:text-lg sm:text-xl font-bold text-left text-black">
                  Digital Payments
                </h2>
              )}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 md:gap-6">
              {formData?.digitalPaymentLinks &&
                formData?.digitalPaymentLinks?.map(
                  (value: any, index: number) => {
                    const Icon =
                      DigitalIconsObj?.[value?.profileDigitalPaymentsId];

                    console.log(value, "?");

                    if (value?.digitalPaymentLink?.length > 0 && Icon) {
                      // Added Icon check
                      return (
                        <div
                          onClick={async () => {
                            onPaymentClick(value, formData);
                          }}
                          key={index}
                          className=" cursor-pointer bg-[#F4F4F4]  w-[40px] h-[40px] rounded-lg flex items-center justify-center"
                        >
                          <Icon color={"#8D00D2"} />
                        </div>
                      );
                    }
                    return null; // Explicitly return null for items that don't meet conditions
                  }
                )}
            </div>
          </div>

          {/* Footer */}
          <div className="rounded-lg w-full pt-3 xs:pt-4">
            <hr className="border-gray-300 mb-3 xs:mb-4" />
            <div className="flex flex-col justify-center items-center text-black space-y-2 xs:space-y-3 sm:space-y-4">
              <p className="text-xs sm:text-sm font-semibold text-center px-2">
                Go Digital - Save Paper, Trees & Our Earth.
              </p>
              <button
                onClick={() => router.push("/")}
                className="bg-[#9000FF] text-white px-3 xs:px-4 sm:px-6 py-1.5 xs:py-2 rounded-lg font-semibold shadow-md hover:bg-[#7a00d9] transition-colors text-xs xs:text-sm sm:text-base"
              >
                Join Now
              </button>
              <p className="text-xs text-gray-500 text-center">
                Powered by bubbl.cards ®
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FreeTemplateOpal;
