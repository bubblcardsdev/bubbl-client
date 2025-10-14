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
  navigatorShare,
} from "@/src/utils/commonLogics";

import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { isEmpty } from "lodash";
import MultiPopup from "./multiPopup";
import { useShowHideWithRecord } from "@/src/hooks/useShowHideWithRecord";
import {
  onAddressClick,
  onCallClick,
  onEmailClick,
  onPaymentClick,
  onSocialMediaClick,
  onWebsiteClick,
} from "@/src/helpers/profile";
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
  const { object, onShow, onHide } = useShowHideWithRecord({
    visible: false,
    title: "",
    data: "",
  });
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
  };
  const DigitalIconsObj: any = {
    "1": Googlepay_icon,
    "2": Phonepay_icon,
    "3": Paytm_icon,
  };
  const router = useRouter();
  const newProfile = router.asPath.slice(1) === "createNewProfile";

  return (
    <div className="flex items-center align-middle justify-center  overflow-hidden">
      <ToastContainer />
      <MultiPopup
        visible={object.visible}
        list={object.data}
        onClose={onHide}
        title={object.title}
      />
      <div className="relative w-full shadow-[1px_1px_4px_0px_rgb(163_162_162_/_60%)] sm:max-w-[380px]">
        <div className=" bg-grey-500  rounded-t-2xl max-h-[250px]">
          <Image
            src={formData?.profileImageUrl || "/profile.png"}
            alt="profile"
            width={400}
            height={400}
            className="object-cover w-full h-full overflow-hidden"
          />
        </div>
        <div className="bg-white rounded-2xl  pt-20 pb-6 px-6 -mt-20 relative z-10  flex flex-col gap-6">
          <div className="absolute -top-[70px] left-1/2 transform -translate-x-1/2 z-20">
            <div className="w-[140px] h-[140px] rounded-[20px] bg-gray-200 flex items-center justify-center">
              <Image
                src={formData?.profileImageUrl || "/logo.png"}
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
            <div className="rounded-xl  text-sm font-semibold flex items-center justify-center">
              <Image
                src={formData?.companyLogoUrl || "/logo.png"}
                alt="logo"
                width={200}
                height={200}
                className="object-cover rounded-lg w-[80px] h-[80px]"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-gray-100 text-lg  font-semibold p-[3px]  rounded-[10px] w-[70%]"
              style={{ color: color }}
              disabled={newProfile}
            >
              Save Contact
            </button>
            <button
              onClick={() => navigatorShare(window.location.href)}
              className="bg-gray-100 flex items-center justify-center p-[3px] rounded-[10px] w-[15%] "
              disabled={newProfile}
            >
              <ShareIcon color={color} />
            </button>
            <button
              className="bg-gray-100  p-[3px] rounded-[10px] w-[15%]"
              style={{ color: color }}
            >
              <span className="flex items-center justify-center">
                <QrGenerator
                  color={color}
                  deviceIdQR={formData?.profileUid}
                  qrBubbl={""}
                  qrImageUrl={""}
                />
              </span>
            </button>
          </div>

          {formData?.shortDescription && (
            <p
              className="text-black text-sm border-l-2 border-purple-500 pl-3 w-full text-left"
              style={{ borderColor: color }}
            >
              {formData?.shortDescription || "Description"}
            </p>
          )}
          {formData?.bio && (
            <p
              className="text-black text-sm border-l-2 border-purple-500 pl-3 w-full text-left"
              style={{ borderColor: color }}
            >
              {formData?.bio}
            </p>
          )}

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
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  onCallClick(formData, onShow);
                }}
              >
                <div className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden text-black text-left">
                  <div className="flex-1 flex items-center gap-3 p-3 min-w-0">
                    <div className="flex-shrink-0">
                      <PhoneColorIcon />
                    </div>
                    <span
                      className="ml-1 flex-grow truncate"
                      title={formData.phoneNumbers[0].phoneNumber}
                    >
                      {formData.phoneNumbers[0].countryCode}{" "}
                      {formData.phoneNumbers[0].phoneNumber}
                    </span>
                  </div>
                  <div className="bg-[#E5E5E5] flex items-center px-3 flex-shrink-0">
                    <Arrow_icon color={color} />
                  </div>
                </div>
              </button>
            )}

            {/* Email */}
            {formData?.emailIds?.[0]?.emailId?.length > 0 && (
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  onEmailClick(formData, onShow);
                }}
              >
                <div className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden text-black text-left">
                  <div className="flex-1 flex items-center gap-3 p-3 min-w-0">
                    <div className="flex-shrink-0">
                      <MailIconbackgroundFill />
                    </div>
                    <span
                      className="ml-1 flex-grow truncate"
                      title={formData.emailIds[0].emailId}
                    >
                      {formData.emailIds[0].emailId}
                    </span>
                  </div>
                  <div className="bg-[#E5E5E5] flex items-center px-3 flex-shrink-0">
                    <Arrow_icon color={color} />
                  </div>
                </div>
              </button>
            )}

            {/* Website */}
            {formData?.websites?.[0]?.website?.length > 0 && (
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  onWebsiteClick(formData, onShow);
                }}
              >
                <div className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden text-black text-left">
                  <div className="flex-1 flex items-center gap-3 p-3 min-w-0">
                    <div className="flex-shrink-0">
                      <WebIconBackgroundFill />
                    </div>
                    <span
                      className="ml-1 flex-grow truncate"
                      title={formData.websites[0].website}
                    >
                      {formData.websites[0].website}
                    </span>
                  </div>
                  <div className="bg-[#E5E5E5] flex items-center px-3 flex-shrink-0">
                    <Arrow_icon color={color} />
                  </div>
                </div>
              </button>
            )}

            {/* Location */}
            {formData?.state && formData?.country && (
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  onAddressClick(formData);
                }}
              >
                <div className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden text-black text-left">
                  <div className="flex-1 flex items-center gap-3 p-3 min-w-0">
                    <div className="flex-shrink-0">
                      <MapIconBackgroundFill />
                    </div>
                    <span
                      className="ml-1 flex-grow truncate"
                      title={`${formData.state}, ${formData.country}`}
                    >
                      {formData.state}, {formData.country}
                    </span>
                  </div>
                  <div className="bg-[#E5E5E5] flex items-center px-3 flex-shrink-0">
                    <Arrow_icon color={color} />
                  </div>
                </div>
              </button>
            )}
          </div>

          {!isEmpty(formData?.socialMediaNames) &&
            formData?.socialMediaNames
              ?.map((value: any) => value?.socialMediaName?.length > 0)
              ?.includes(true) && (
              <h2 className="text-xl font-bold text-left text-black">
                Social Media
              </h2>
            )}

          {!isEmpty(formData?.socialMediaNames) && (
            <div className="text-left flex flex-col gap-4">
              {[...formData.socialMediaNames] // clone array so original isn't mutated
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
                    3: "Twitter",
                    4: "Youtube",
                    5: "LinkedIn",
                    6: "Whatsapp",
                  };



                  if (value?.socialMediaName?.length > 0) {
                    return (
                      <div
                        key={index}
                        role="button"
                        onClick={() => {
                          onSocialMediaClick(value, formData);
                        }}
                        className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden"
                      >
                        <div className="flex-1 flex items-center gap-3 px-4 py-2">
                          {Icon && <Icon color={color} />}
                          <div className="px-0">
                            <h1 className=" flex-grow text-black font-semibold text-[16px]">
                              {name?.[value?.profileSocialMediaId]}
                            </h1>
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
          )}

          {!isEmpty(formData?.digitalPaymentLinks) &&
            formData?.digitalPaymentLinks
              ?.map((value: any) => value?.digitalPaymentLink?.length > 0)
              ?.includes(true) && (
              <h2 className="text-xl font-bold  text-left text-black">
                Digital Payments
              </h2>
            )}
          {!isEmpty(formData?.digitalPaymentLinks) && (
            <div className="flex flex-col gap-4">
              {formData?.digitalPaymentLinks?.map(
                (value: any, index: number) => {
                  const Icon =
                    DigitalIconsObj?.[value?.profileDigitalPaymentsId];
                  const name: any = {
                    1: "Gpay",
                    2: "Phonepe",
                    3: "Paytm",
                  };
                  if (value?.digitalPaymentLink?.length > 0) {
                    return (
                      <div
                        onClick={async () => {
                          onPaymentClick(value, formData);
                        }}
                        key={index}
                        className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden cursor-pointer"
                      >
                        <div className="flex-1 flex items-center gap-3 px-4 py-2">
                          {Icon && <Icon color={"#8D00D2"} />}
                          <div className="px-0">
                            <h1 className=" flex-grow text-black font-semibold text-[16px]">
                              {name?.[value?.profileDigitalPaymentsId]}
                            </h1>
                          </div>
                        </div>
                        <div className="bg-[#E5E5E5] flex items-center px-3">
                          <Arrow_icon color={color} />
                        </div>
                      </div>
                    );
                  }
                }
              )}
            </div>
          )}

          <hr className="border-gray-300" />
          <div className="flex flex-col justify-center items-center gap-3">
            <p className="text-sm font-semibold text-black">
              Go Digital - Save Paper, Trees & Our Earth.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-[#9000FF] text-white px-6 py-2 rounded-lg font-semibold  hover:bg-[#9000FF]"
            >
              Join Now
            </button>
            <p className="text-xs text-gray-500">
              Powered by bubbl.cards ®
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FreeTemplateRuby;
