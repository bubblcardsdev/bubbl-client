"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  CallProfileIcon,
  MailProfileIcon,
  Paytm_icon,
  Phonepay_icon,
  Googlepay_icon,
  WebIcon,
  LocationFill_icon,
  QuartzWhatsappIcon,
  QuartzInstagramIcon,
  QuartzFacebookIcon,
  QuartzTwitterIcon,
  QuartzLinkedinIcon,
  QuartzYoutubeIcon,
  DownArrowIcon,
} from "../../common/icons";
import { theme } from "../../../utils/profileThemecolor";
import { copyText, openInNewTab } from "../../../utils/commonLogics";
import QrGenerator from "./QrGenerator";
import { createTap } from "@/src/services/profileApi";
import {
  ActionKeys,
  actions,
  DIGITAL_MEDIA_IDS,
  SOCIAL_MEDIA_IDS,
} from "@/src/lib/constant";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

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
    "1": QuartzInstagramIcon, // Instagram
    "2": QuartzFacebookIcon, // Facebook
    "3": QuartzTwitterIcon, // Twitter
    "4": QuartzYoutubeIcon, // Youtube
    "5": QuartzLinkedinIcon, // LinkedIn
    "6": QuartzWhatsappIcon, // WhatsApp
  };
  const DigitalIconsObj: any = {
    "1": Googlepay_icon,
    "2": Phonepay_icon,
    "3": Paytm_icon,
  };
  const router = useRouter();

  return (
    <div className="xs:w-full max-w-[380px] mx-auto overflow-hidden">
      <ToastContainer />
      {/* Profile Image */}
      <div className="bg-[#D9D9D9] h-[400px]">
        <Image
          src={formData?.profileImageUrl || "/profile.png"}
          alt=""
          width={500}
          height={500}
          className="object-fill w-full h-full"
        />
      </div>

      <div className="px-4 py-8 w-full space-y-6 bg-[#E9BCFF] relative">
        {/* Save Contact + QR */}
        {router.asPath.slice(1) !== "createNewProfile" && (
          <div className="flex items-center justify-between gap-6 ml-2 mt-10">
            <button
              className="flex-1 px-6 py-3 rounded-lg"
              onClick={handleSave}
              style={{ backgroundColor: color }}
            >
              <span className="text-md text-white whitespace-nowrap">
                Save Contact
              </span>
            </button>
            <button
              className="rounded-lg "
              style={{ backgroundColor: color }}
            >
              <QrGenerator
                color={'#ffffff'}
                deviceIdQR={formData?.profileUid}
                qrBubbl=""
                qrImageUrl=""
              />
            </button>
          </div>
        )}

        {/* Company Logo */}
        <div className="absolute w-24 h-24 xs:w-[80px] xs:h-[80px] bg-white rounded-2xl lg:-top-14 lg:right-5 md:right-0 sm:-top-14 sm:right-8 xs:-top-14 xs:right-3">
          <Image
            src={formData?.companyLogoUrl || "/logo.png"}
            alt=""
            className="object-cover w-full h-full rounded-2xl"
            width={100}
            height={100}
          />
        </div>

        {/* Profile Info */}
        <div className="w-full">
          <div className="relative w-[80%] p-2 text-left">
            <p className="text-lg font-bold text-black mb-2">
              {formData?.firstName + " " + formData?.lastName || "Name"}
            </p>
            <p className="text-base text-black font-semibold">
              {formData?.position || "Designation"}
            </p>
            <p className="text-sm text-gray-600">
              {formData?.companyName || "Company name"}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mt-2">
              {formData?.shortDescription}
            </p>
          </div>
        </div>

        {/* Contact Information */}
        {(formData?.phoneNumbers?.[0]?.phoneNumber ||
          formData?.emailIds?.[0]?.emailId?.length > 0 ||
          formData?.websites?.[0]?.website?.length > 0 ||
          (formData?.state && formData?.country)) && (
            <h2 className="text-lg font-bold mb-2 text-black text-left">
              Contact Information
            </h2>
          )}

        <div className="flex flex-col gap-4">
          {/* Phone */}
          {formData?.phoneNumbers?.[0]?.phoneNumber && (
            <a
              href={`tel:${formData?.phoneNumbers?.[0]?.countryCode || ""}${formData?.phoneNumbers?.[0]?.phoneNumber || ""
                }`}
              onClick={async (e) => {
                e.preventDefault(); // stop immediate dial
                if (formData?.deviceUid) {
                  await createTap(4, formData.deviceUid); // log phone tap
                }
                // trigger call after logging
                window.location.href = `tel:${formData?.phoneNumbers?.[0]?.countryCode || ""
                  }${formData?.phoneNumbers?.[0]?.phoneNumber || ""}`;
              }}
            >
              <button
                className="group flex items-center w-full px-4 py-3 text-white rounded-xl shadow-lg relative"
                style={{ backgroundColor: color }}
              >
                <div className="flex items-center gap-3">
                  <CallProfileIcon color="#FFFFFF" />
                  <span>
                    {formData?.phoneNumbers?.[0]?.countryCode}{" "}
                    {formData?.phoneNumbers?.[0]?.phoneNumber}
                  </span>
                </div>
                <div className="absolute -right-3 flex items-center justify-center w-10 h-10 bg-[#D47DFF] rounded-full shadow-md">
                  <DownArrowIcon />
                </div>
              </button>
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
                // open email client after logging
                window.location.href = `mailto:${formData?.emailIds?.[0]?.emailId || ""
                  }`;
              }}
            >
              <button
                className="group flex items-center w-full px-4 py-3 text-white rounded-xl shadow-lg relative"
                style={{ backgroundColor: color }}
              >
                <div className="flex items-center gap-3">
                  <MailProfileIcon color="#FFFFFF" />
                  <span className="text-sm">
                    {formData?.emailIds?.[0]?.emailId}
                  </span>
                </div>
                <div className="absolute -right-3 flex items-center justify-center w-10 h-10 bg-[#D47DFF] rounded-full shadow-md">
                  <DownArrowIcon />
                </div>
              </button>
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
                  await createTap(6, formData.deviceUid); // log website tap
                }
                // open website after logging
                window.open(
                  formData?.websites?.[0]?.website || "",
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
            >
              <button
                className="group flex items-center w-full px-4 py-3 text-white rounded-xl shadow-lg relative"
                style={{ backgroundColor: color }}
              >
                <div className="flex items-center gap-3">
                  <WebIcon color="#FFFFFF" />
                  <span className="text-sm">
                    {formData?.websites?.[0]?.website}
                  </span>
                </div>
                <div className="absolute -right-3 flex items-center justify-center w-10 h-10 bg-[#D47DFF] rounded-full shadow-md">
                  <DownArrowIcon />
                </div>
              </button>
            </a>
          )}

          {/* Location */}
          {formData?.state && formData?.country && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${formData?.address || ""}, ${formData?.city || ""}, ${formData?.state || ""
                }, ${formData?.country || ""}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={async (e) => {
                e.preventDefault(); // stop immediate redirect
                if (formData?.deviceUid) {
                  await createTap(7, formData.deviceUid); // log location tap
                }
                // open Google Maps after logging
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${formData?.address || ""}, ${formData?.city || ""}, ${formData?.state || ""
                    }, ${formData?.country || ""}`
                  )}`,
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
            >
              <button
                className="group flex items-center w-full px-4 py-3 text-white rounded-xl shadow-lg relative"
                style={{ backgroundColor: color }}
              >
                <div className="flex items-center gap-3">
                  <LocationFill_icon color="#FFFFFF" />
                  <span className="text-sm">
                    {formData?.state}, {formData?.country}
                  </span>
                </div>
                <div className="absolute flex-shrink-0 -right-3 flex items-center justify-center w-10 h-10 bg-[#D47DFF] rounded-full shadow-md">
                  <DownArrowIcon />
                </div>
              </button>
            </a>
          )}
        </div>

        {/* Social Media */}
        {formData?.socialMediaNames?.some(
          (v: any) => v?.socialMediaName?.length > 0
        ) && (
            <>
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Social Media
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {[...formData.socialMediaNames]
                  .sort(
                    (a: any, b: any) =>
                      (a?.profileSocialMediaId || 0) -
                      (b?.profileSocialMediaId || 0)
                  )
                  .map((value: any, index: number) => {
                    const Icon = SocialIconsObj?.[value?.profileSocialMediaId];
                    if (value?.socialMediaName?.length > 0) {
                      return (
                        <div
                          key={index}
                          role="button"
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
                            openInNewTab(value?.socialMediaName);
                          }}
                          className="flex items-center justify-center w-12 h-12 rounded-lg shadow"
                          style={{ backgroundColor: color }}
                        >
                          <Icon color={color} />
                        </div>
                      );
                    }
                  })}
              </div>
            </>
          )}

        {/* Digital Payments */}
        {formData?.digitalPaymentLinks?.some(
          (v: any) => v?.digitalPaymentLink?.length > 0
        ) && (
            <h2 className="text-lg font-bold mb-4 mt-4 text-left text-black">
              Digital Payments
            </h2>
          )}

        <div className="grid grid-cols-3 gap-4 mb-4 mt-4">
          {formData?.digitalPaymentLinks?.map((value: any, index: number) => {
            const Icon = DigitalIconsObj?.[value?.profileDigitalPaymentsId];
            if (value?.digitalPaymentLink?.length > 0) {
              return (
                <div
                  key={index}
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
                  className="flex items-center justify-center w-10 h-10 rounded-md shadow-md cursor-pointer"
                  style={{ backgroundColor: color }}
                >
                  <Icon color="#FFFFFF" />
                </div>
              );
            }
          })}
        </div>

        {/* Footer */}
        <hr className="border-gray-300 my-4" />
        <div className="flex flex-col justify-center items-center space-y-3">
          <p className="text-sm font-semibold text-black">
            Go Digital - Save Paper, Trees & Our Earth.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-[#9000FF] text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-[#9000FF]"
          >
            Join Now
          </button>
          <p className="text-xs text-gray-500">Powered by bubbl.cards ®</p>
        </div>
      </div>
    </div>
  );
};
export default ProTemplateQuartz;
