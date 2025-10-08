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
import {
 
  actions,
  SOCIAL_MEDIA_IDS,
  ActionKeys,
  DIGITAL_MEDIA_IDS,
} from "../../../lib/constant";
import { theme } from "../../../utils/profileThemecolor";
import QrGenerator from "./QrGenerator";
import {
  copyText,
  navigatorShare,
  openInNewTab,
} from "@/src/utils/commonLogics";
import { createTap } from "@/src/services/profileApi";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

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
  useEffect(() => {
    const selected =
      theme.find((theme) => theme.name === selectedTheme)?.color || "#1f1f1f";
    setColor(selected);
    console.log(selected, "theme");
  }, [selectedTheme]);

  const router = useRouter();
  console.log(router.asPath.slice(1));

 const DigitalIconsObj: any = {
  "1": Googlepay_icon,
  "2": Phonepay_icon,
  "3": Paytm_icon,
};

 const SocialIconsObj: any = {
  "1": Instagram_icon,      // Instagram
  "2": Facebook_icon_thin,  // Facebook
  "3": OpalYoutubeIcon,     // Youtube
  "4": Twitter_icon_thin,   // Twitter
  "5": OpalWhatsappIcon,    // WhatsApp
  "6": Linkedin_icon_thin,  // LinkedIn
};
  return (
    <div className="w-full flex justify-center items-center">
      <ToastContainer />
      <div className="w-full max-w-[400px] bg-[#EDEDED]  relative overflow-hidden shadow-lg">
        {/* Header curved background */}
        <div
          className="absolute top-0 left-0 w-full h-[100px] xs:h-[120px] sm:h-[140px] md:h-[165px] rounded-br-[250px] xs:rounded-br-[300px] sm:rounded-br-[400px] md:rounded-br-[550px]"
          style={{ backgroundColor: color }}
        ></div>
        {/* Profile Image - Centered and responsive */}
        <div className="relative flex justify-center pt-[50px] xs:pt-[60px] sm:pt-[70px] md:pt-[80px] pb-3 sm:pb-4">
          <div className=" rounded-full p-0.5 sm:p-1 ">
            <Image
              src={formData?.profileImageUrl || "/profile.png"}
              alt="profile_Img"
              width={120}
              height={120}
              className="w-[100px] h-[100px] xs:w-[120px] xs:h-[120px] sm:w-[140px] sm:h-[140px] md:w-[170px] md:h-[170px] rounded-full object-cover"
            />
          </div>
        </div>

        <div className="p-3 xs:p-4 sm:p-5 space-y-3 xs:space-y-4 sm:space-y-6">
          {/* Action buttons and company logo section */}
          <div className="flex justify-between items-start gap-2 xs:gap-3 sm:gap-4">
            <div className="flex flex-col space-y-2 xs:space-y-3 sm:space-y-4 flex-1">
              <button
                onClick={handleSave}
                className="px-3 xs:px-4 sm:px-6 md:px-8 py-1.5 xs:py-2 sm:py-[10px] text-white rounded-[6px] text-xs xs:text-sm sm:text-base font-medium whitespace-nowrap"
                style={{ backgroundColor: color }}
              >
                Save Contact
              </button>
              {router.asPath.slice(1) !== "createNewProfile" && (
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
              <div className="w-[60px] h-[60px] xs:w-[70px] xs:h-[70px] sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px]  rounded-full flex items-center justify-center overflow-hidden bg-black ">
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
          <div className="space-y-1 xs:space-y-2">
            <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-left text-black leading-tight">
              {formData?.firstName + " " + formData?.lastName || "Your Name"}
            </h1>
            <p className="text-xs xs:text-sm sm:text-[16px] text-gray-700 text-left">
              {formData?.designation || "Designation"}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 text-left">
              {formData?.companyName || "Company Name"}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 text-left leading-relaxed">
              {formData?.shortDescription ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."}
            </p>
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
                <a
                  href={`tel:${formData?.phoneNumbers?.[0]?.countryCode || ""}${
                    formData?.phoneNumbers?.[0]?.phoneNumber || ""
                  }`}
                  onClick={async (e) => {
                    e.preventDefault(); // stop immediate dial
                    if (formData?.deviceUid) {
                      await createTap(4, formData.deviceUid);
                    }
                    // manually trigger call after logging
                    window.location.href = `tel:${
                      formData?.phoneNumbers?.[0]?.countryCode || ""
                    }${formData?.phoneNumbers?.[0]?.phoneNumber || ""}`;
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
                </a>
              )}

              {/* Email */}
              {formData?.emailIds?.[0]?.emailId?.length > 0 && (
                <a
                  href={`mailto:${formData?.emailIds?.[0]?.emailId || ""}`}
                  onClick={async (e) => {
                    e.preventDefault(); // stop immediate navigation
                    if (formData?.deviceUid) {
                      await createTap(5, formData.deviceUid); // log email tap
                    }
                    // manually trigger email client after logging
                    window.location.href = `mailto:${
                      formData?.emailIds?.[0]?.emailId || ""
                    }`;
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
                </a>
              )}

              {/* Website */}
              {formData?.websites?.[0]?.website?.length > 0 && (
                <a
                  href={formData?.websites?.[0]?.website || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={async (e) => {
                    e.preventDefault(); // stop immediate navigation
                    if (formData?.deviceUid) {
                      await createTap(6, formData.deviceUid);
                    }
                    // open website after logging
                    window.open(
                      formData?.websites?.[0]?.website || "",
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  <div className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden text-black">
                    <div className="flex-1 flex items-center gap-2 xs:gap-3 p-2.5 xs:p-3 sm:p-4 min-w-0">
                      <WebIcon_thin color={color} />
                      <span className="flex-grow text-xs xs:text-sm sm:text-base truncate">
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
                </a>
              )}

              {/* Location */}
              {formData?.state && formData?.country && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${formData?.address || ""}, ${formData?.city || ""}, ${
                      formData?.state || ""
                    }, ${formData?.country || ""}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={async (e) => {
                    e.preventDefault(); // prevent immediate redirect
                    if (formData?.deviceUid) {
                      await createTap(7, formData.deviceUid); // log tap for location
                    }
                    // open Google Maps after logging
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${formData?.address || ""}, ${formData?.city || ""}, ${
                          formData?.state || ""
                        }, ${formData?.country || ""}`
                      )}`,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  <div className="w-full bg-[#F4F4F4] rou   nded-md flex items-stretch overflow-hidden text-black text-left">
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
                </a>
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
                      3: "Youtube",
                      4: "Twitter",
                      5: "WhatsApp",
                      6: "LinkedIn",
                    };

                    if (value?.socialMediaName?.length > 0) {
                      return (
                        <div
                          className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden cursor-pointer"
                          key={index}
                          onClick={() => {
                            if (formData.deviceUid) {
                              createTap(
                                actions[
                                  SOCIAL_MEDIA_IDS[
                                    value.profileSocialMediaId
                                  ] as ActionKeys
                                ],
                                formData.deviceUid
                              );
                            }
                            // createTap(actions[SOCIAL_MEDIA_IDS[value.profileSocialMediaId]], value)
                            openInNewTab(value?.socialMediaName);
                          }}
                        >
                          <div className="flex-1 flex items-center gap-2 xs:gap-3 px-2.5 xs:px-3 sm:px-4 py-2.5 xs:py-3 min-w-0">
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
                            if (formData.deviceUid) {
                              await createTap(
                                actions[
                                  DIGITAL_MEDIA_IDS[
                                    value.profileDigitalPaymentsId
                                  ] as ActionKeys
                                ],
                                formData.deviceUid
                              );
                            }
                            copyText(value?.digitalPaymentLink);
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
