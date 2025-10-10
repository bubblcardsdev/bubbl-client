"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  PhoneColorIcon,
  Arrow_icon,
  MapIconBackgroundFill,
  MailIconbackgroundFill,
  WebIconBackgroundFill,
  Googlepay_icon,
  Paytm_icon,
  Phonepay_icon,
  InstagramBackgroundFill,
  FacebookIconbackgroundFill,
  LinkedinIconbackgroundFill,
  YoutubeIconbackgroundFill,
  TwitterIconbackgroundFill,
  WhatsappIconbackgroundFill,
  ShareIcon,
} from "../../common/icons";
import { theme } from "../../../utils/profileThemecolor";
import QrGenerator from "./QrGenerator";
import {
  copyText,
  navigatorShare,
  openInNewTab,
} from "@/src/utils/commonLogics";
import {
  ActionKeys,
  actions,
  DIGITAL_MEDIA_IDS,
  SOCIAL_MEDIA_IDS,
} from "@/src/lib/constant";
import { createTap } from "@/src/services/profileApi";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
const FreeTemplateRuby = ({
  formData,
  selectedTheme,
  handleSave,
}: {
  formData: any;
  selectedTheme: any;
  handleSave: () => void;
}) => {
  const [color, setColor] = useState<string>("");
  useEffect(() => {
    const selected =
      theme.find((theme) => theme.name === selectedTheme)?.color || "#1f1f1f";
    setColor(selected);
    console.log(selected, "theme");
  }, [selectedTheme]);

  const SocialIconsObj: any = {
    "1": InstagramBackgroundFill, // Instagram
    "2": FacebookIconbackgroundFill, // Facebook
    "3": TwitterIconbackgroundFill, // Twitter
    "4": YoutubeIconbackgroundFill, // Youtube
    "5": LinkedinIconbackgroundFill, // LinkedIn
    "6": WhatsappIconbackgroundFill, // WhatsApp

  }
  const DigitalIconsObj: any = {
    "1": Googlepay_icon,
    "2": Phonepay_icon,
    "3": Paytm_icon,
  };
  const router = useRouter();
  return (
    <div className="flex items-center align-middle justify-center  overflow-hidden ">
      <ToastContainer />

      <div className="relative w-full shadow-[1px_1px_4px_0px_rgb(163_162_162_/_60%)] sm:max-w-[380px]">
        <div className=" bg-yellow-500  rounded-t-2xl max-h-[250px]">
          <Image
            src={formData?.profileImageUrl || "/profile.png"}
            alt="profile"
            width={400}
            height={400}
            className="object-cover w-full h-full overflow-hidden"
          />
        </div>
        <div className="bg-white rounded-2xl  pt-20 pb-6 px-6 -mt-20 relative z-10  flex flex-col gap-4">
          <div className="absolute -top-[70px] left-1/2 transform -translate-x-1/2 z-20">
            <div className="w-[140px] h-[140px] rounded-[20px] bg-gray-200 flex items-center justify-center">
              <Image
                src={formData?.profileImageUrl || "/profile.png"}
                alt="profile"
                width={500}
                height={500}
                className="rounded-[20px] object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="flex justify-between items-start mt-6 ">
            <div className="text-left flex flex-col gap-1">
              <p className="text-black text-lg font-bold">
                {formData?.firstName + " " + formData.lastName || "Name"}
              </p>
              <div className="flex flex-col ">
                <h3 className="text-black text-md">
                  {formData?.designation || "Designation"}
                </h3>
                <h3 className="text-black text-sm">
                  {formData?.companyName || "company name"}
                </h3>

              </div>

            </div>
            {/* <div className="  text-sm font-semibold border border-red-500 w-24 h-24">
              <Image
                src={formData?.companyLogoUrl || "/logo.png"}
                alt="logo"
                width={100}
                height={100}
                className="object-contain rounded-lg"
              />
            </div> */}
            <div className=" p-1 rounded-xl text-sm font-semibold w-[80px] h-[80px] flex items-center justify-center">
              <Image
                src={formData?.companyLogoUrl || "/logo.png"}
                alt="logo"
                width={80}
                height={80}
                className="object-fill rounded-lg w-[80px] h-[80px]"
              />
            </div>
          </div>
          {router.asPath.slice(1) !== "createNewProfile" && (
            <div className="mt-6 flex gap-3 ">
              <button
                onClick={handleSave}
                className="bg-gray-100 text-lg  font-semibold p-[3px]  rounded-[10px] w-[70%]"
                style={{ color: color }}
              >
                Save Contact
              </button>
              <button
                onClick={() => navigatorShare(window.location.href)}
                className="bg-gray-100  p-[3px] rounded-[10px] w-[15%] "
              >
                <span className="flex items-center align-middle justify-center">
                  <ShareIcon color={color} />
                </span>
              </button>
              <button
                className="bg-gray-100  p-[3px] rounded-[10px] w-[15%]"
                style={{ color: color }}
              >
                <span className="flex items-center align-middle justify-center">
                  <QrGenerator
                    color={color}
                    deviceIdQR={formData?.profileUid}
                    qrBubbl={""}
                    qrImageUrl={""}
                  />
                </span>
              </button>
            </div>
          )}
          <p className="text-black text-sm mt-6 border-l-2 border-purple-500 pl-3 w-full text-left">
            {formData?.shortDescription || "Description"}
          </p>
          <p className="text-black text-sm mt-6 border-l-2 border-purple-500 pl-3 w-full text-left">
            {formData?.bio}
          </p>

          {(formData?.phoneNumbers?.[0]?.phoneNumber ||
            formData?.emailIds?.[0]?.emailId?.length > 0 ||
            formData?.websites?.[0]?.website?.length > 0 ||
            (formData?.state && formData?.country)) && (
              <h2 className="text-xl font-bold text-left text-black">
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
                  e.preventDefault();
                  if (formData?.deviceUid)
                    await createTap(4, formData.deviceUid);
                  window.location.href = `tel:${formData?.phoneNumbers?.[0]?.countryCode || ""
                    }${formData?.phoneNumbers?.[0]?.phoneNumber || ""}`;
                }}
              >
                <div className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden text-black text-left">
                  <div className="flex-1 flex items-center gap-3 p-3 min-w-0">
                    <div className="flex-shrink-0">
                      <PhoneColorIcon />
                    </div>
                    <span className="ml-1 flex-grow truncate" title={formData.phoneNumbers[0].phoneNumber}>
                      {formData.phoneNumbers[0].countryCode}{" "}
                      {formData.phoneNumbers[0].phoneNumber}
                    </span>
                  </div>
                  <div className="bg-[#E5E5E5] flex items-center px-3 flex-shrink-0">
                    <Arrow_icon color={color} />
                  </div>
                </div>
              </a>
            )}

            {/* Email */}
            {formData?.emailIds?.[0]?.emailId?.length > 0 && (
              <a
                href={`mailto:${formData?.emailIds?.[0]?.emailId || ""}`}
                onClick={async (e) => {
                  e.preventDefault();
                  if (formData?.deviceUid)
                    await createTap(5, formData.deviceUid);
                  window.location.href = `mailto:${formData?.emailIds?.[0]?.emailId || ""
                    }`;
                }}
              >

                <div className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden text-black text-left">
                  <div className="flex-1 flex items-center gap-3 p-3 min-w-0">
                    <div className="flex-shrink-0">
                      <MailIconbackgroundFill />
                    </div>
                    <span className="ml-1 flex-grow truncate" title={formData.emailIds[0].emailId}>
                      {formData.emailIds[0].emailId}
                    </span>
                  </div>
                  <div className="bg-[#E5E5E5] flex items-center px-3 flex-shrink-0">
                    <Arrow_icon color={color} />
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
                  e.preventDefault();
                  if (formData?.deviceUid)
                    await createTap(6, formData.deviceUid);
                  window.open(
                    formData?.websites?.[0]?.website || "",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                <div className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden text-black text-left">
                  <div className="flex-1 flex items-center gap-3 p-3 min-w-0">
                    <div className="flex-shrink-0">
                      <WebIconBackgroundFill />
                    </div>
                    <span className="ml-1 flex-grow truncate" title={formData.websites[0].website}>
                      {formData.websites[0].website}
                    </span>
                  </div>
                  <div className="bg-[#E5E5E5] flex items-center px-3 flex-shrink-0">
                    <Arrow_icon color={color} />
                  </div>
                </div>
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
                  e.preventDefault();
                  if (formData?.deviceUid)
                    await createTap(7, formData.deviceUid);
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
                <div className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden text-black text-left">
                  <div className="flex-1 flex items-center gap-3 p-3 min-w-0">
                    <div className="flex-shrink-0">
                      <MapIconBackgroundFill />
                    </div>
                    <span className="ml-1 flex-grow truncate" title={`${formData.state}, ${formData.country}`}>
                      {formData.state}, {formData.country}
                    </span>
                  </div>
                  <div className="bg-[#E5E5E5] flex items-center px-3 flex-shrink-0">
                    <Arrow_icon color={color} />
                  </div>
                </div>
              </a>
            )}
          </div>


          {formData?.socialMediaNames
            ?.map((value: any) => value?.socialMediaName?.length > 0)
            ?.includes(true) && (
              <h2 className="text-xl font-bold text-left text-black">
                Social Media
              </h2>
            )}

          <div className="space-y-4  text-left">
            {formData?.socialMediaNames &&
              [...formData.socialMediaNames] // clone array so original isn't mutated
                .sort(
                  (a: any, b: any) =>
                    (a?.profileSocialMediaId || 0) -
                    (b?.profileSocialMediaId || 0)
                ) // sort by ID
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
                          // createTap(actions[SOCIAL_MEDIA_IDS[value.profileSocialMediaId]], value)
                          openInNewTab(value?.socialMediaName);
                        }}
                        className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden"
                      >
                        <div className="flex-1 flex items-center gap-3 px-4 py-2">
                          {Icon && <Icon color={color} />}
                          <div className="px-0">
                            <h1 className=" flex-grow text-black font-semibold text-[16px]">
                              {name?.[value?.profileSocialMediaId]}
                            </h1>
                            <p className="text-[12px]">
                              {formData?.socialLinks?.[0]}
                            </p>
                          </div>
                        </div>
                        <div className="bg-[#E5E5E5] flex items-center px-3 ">
                          <Arrow_icon color={color} />
                        </div>
                      </div>
                    );
                  }
                })}
          </div>


          {formData?.digitalPaymentLinks?.map &&
            formData?.digitalPaymentLinks
              ?.map((value: any) => value?.digitalPaymentLink?.length > 0)
              ?.includes(true) && (
              <h2 className="text-xl font-bold  text-left text-black">
                Digital Payments
              </h2>
            )}
          <div className="space-y-4 ">
            {formData?.digitalPaymentLinks &&
              formData?.digitalPaymentLinks?.map(
                (value: any, index: number) => {
                  const Icon =
                    DigitalIconsObj?.[value?.profileDigitalPaymentsId];
                  if (value?.digitalPaymentLink?.length > 0) {
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
                        className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden"
                      >
                        <div className="flex-1 flex items-center gap-3 px-4 py-2">
                          <Icon color={"#8D00D2"} />
                        </div>
                        <div className="bg-[#E5E5E5] flex items-center px-3 ">
                          <Arrow_icon color={color} />
                        </div>
                      </div>
                    );
                  }
                }
              )}
          </div>

          <hr className="border-gray-300 mb-4" />
          <div className="flex flex-col justify-center items-center">
            <p className="text-sm font-semibold mb-4 text-black">
              Go Digital - Save Paper, Trees & Our Earth.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-[#9000FF] text-white px-6 py-2 rounded-lg font-semibold  hover:bg-[#9000FF]"
            >
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
export default FreeTemplateRuby;
