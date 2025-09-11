"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Share_icon,
  Qr_icon,
  PhoneColorIcon,
  Arrow_icon,
  MapIconBackgroundFill,
  MailIconbackgroundFill,
  WebIconBackgroundFill,
  InstagramBackgroundFill,
  TwitterIconbackgroundFill,
  LinkedinIconbackgroundFill,
  YoutubeIconbackgroundFill,
  FacebookIconbackgroundFill,
  WhatsappIconbackgroundFill,
  Googlepay_icon,
  Paytm_icon,
  Phonepay_icon,
} from "../../common/icons";
import { theme } from "../../../utils/profileThemecolor";
const FreeTemplateRuby = ({
  formData,
  selectedTheme,
}: {
  formData: any;
  selectedTheme: any;
}) => {
  const [color, setColor] = useState<string>("");
  useEffect(() => {
    const selected =
      theme.find((theme) => theme.name === selectedTheme)?.color || "#1f1f1f";
    setColor(selected);
    console.log(selected, "theme");
  }, [selectedTheme]);

  const openInNewTab = (url: string) => {
    if (!url.startsWith("http")) {
      url = `https://${url}`;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const SocialIconsObj: any = {
    "1": InstagramBackgroundFill,
    "2": FacebookIconbackgroundFill,
    "3": YoutubeIconbackgroundFill,
    "4": TwitterIconbackgroundFill,
    "5": WhatsappIconbackgroundFill,
    "6": LinkedinIconbackgroundFill,
  };
  const DigitalIconsObj: any = {
    "1": Googlepay_icon,
    "2": Phonepay_icon,
    "3": Paytm_icon,
  };
  return (
    <div className="flex items-center align-middle justify-center ">
      <div className="relative w-full ">
        <div className="h-[230px] bg-yellow-500  rounded-t-2xl ">
          <Image
            src={formData?.profileImageUrl || "/profile.png"}
            alt="profile"
            width={400}
            height={400}
            className="blur-sm object-cover w-full h-full overflow-hidden"
          />
        </div>
        <div className="bg-white rounded-2xl  pt-20 pb-6 px-6 -mt-20 relative z-10  ">
          <div className="absolute -top-[70px] left-1/2 transform -translate-x-1/2 z-20">
            <div className="w-[140px] h-[140px] rounded-[20px] bg-gray-200 flex items-center justify-center">
              <Image
                src={formData?.profileImageUrl || "/profile.png"}
                alt="profile"
                width={150}
                height={150}
                className="rounded-[20px] object-cover"
              />
            </div>
          </div>
          <div className="flex justify-between items-start mt-6 ">
            <div className="text-left flex flex-col gap-1">
              <p className="text-black text-xl font-bold">
                {formData?.firstName + "" + formData.lastName || "Name"}{" "}
              </p>
              <p className="text-black text-md">
                {formData?.position || "Designation"}
              </p>
              <p className="text-black text-md">
                {formData?.companyName || "company name"}
              </p>
              <p className="text-black text-sm mt-6 border-l-2 border-purple-500 pl-3 w-full text-left">
                {formData?.shortDescription || "Description"}
              </p>
            </div>
            <div className="bg-gray-100 p-1 rounded-xl  text-sm font-semibold text-gray-800">
              <Image
                src={formData?.companyLogoUrl || "/logo.png"}
                alt="logo"
                width={80}
                height={80}
                className="object-contain rounded-lg"
              />
            </div>
          </div>
          <div className="mt-6 flex gap-3 ">
            <button
              className="bg-gray-100 text-lg  font-semibold p-[10px]  rounded-[10px] w-[70%]"
              style={{ color: color }}
            >
              Save Contact
            </button>
            <button className="bg-gray-100  p-[10px] rounded-[10px] w-[15%] ">
              <span className="flex items-center align-middle justify-center">
                <Share_icon color={color} />
              </span>
            </button>
            <button className="bg-gray-100  p-[10px] rounded-[10px] w-[15%]">
              <span className="flex items-center align-middle justify-center">
                <Qr_icon color={color} />
              </span>
            </button>
          </div>
          <p className="text-black text-sm mt-6 border-l-2 border-purple-500 pl-3 w-full text-left">
            {formData?.bio}
          </p>
          <div className="py-4">
            {(formData?.phoneNumbers?.[0]?.phoneNumber ||
              formData?.emailIds?.[0]?.emailId?.length > 0 ||
              formData?.websites?.[0]?.website?.length > 0 ||
              (formData?.state && formData?.country)) && (
              <h2 className="text-xl font-bold mb-3 text-left text-black">
                Contact Information
              </h2>
            )}
            <div className="space-y-4">
              {/* Phone */}
              {formData?.phoneNumbers?.[0]?.phoneNumber && (
                <div className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden text-black text-left">
                  <div className="flex-1 flex items-center gap-3 p-4">
                    <PhoneColorIcon />
                    <span className="ml-1 flex-grow text-left">
                      {formData?.phoneNumbers?.[0]?.countryCode}{" "}
                      {formData?.phoneNumbers?.[0]?.phoneNumber}
                    </span>
                  </div>
                  <div className="bg-[#E5E5E5] flex items-center px-3 ">
                    <Arrow_icon color={color} />
                  </div>
                </div>
              )}
              {/* mail*/}
              {formData?.emailIds?.[0]?.emailId?.length > 0 && (
                <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden text-black text-left">
                  <div className="flex-1 flex items-center gap-3 p-4">
                    <MailIconbackgroundFill />
                    <span className="ml-1 flex-grow">
                      {formData?.emailIds?.[0]?.emailId}
                    </span>
                  </div>
                  <div className="bg-[#E5E5E5] flex items-center px-3 ">
                    <Arrow_icon color={color} />
                  </div>
                </div>
              )}
              {/* website */}
              {formData?.websites?.[0]?.website?.length > 0 && (
                <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden mt-4 text-black text-left">
                  <div className="flex-1 flex items-center gap-3 p-4">
                    <WebIconBackgroundFill />
                    <span className="ml-1 flex-grow text-black">
                      {formData?.websites?.[0]?.website}
                    </span>
                  </div>
                  <div className="bg-[#E5E5E5] flex items-center px-3 ">
                    <Arrow_icon color={color} />
                  </div>
                </div>
              )}
              {/* location */}
              {formData?.state && formData?.country && (
                <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden mt-4 text-black text-left">
                  <div className="flex-1 flex items-center gap-3 p-4">
                    <MapIconBackgroundFill />
                    <span className="ml-1 flex-grow text-black">
                      {formData?.state && formData?.country
                        ? formData?.state + ", " + formData?.country
                        : ""}
                    </span>
                  </div>
                  <div className="bg-[#E5E5E5] flex items-center px-3 ">
                    <Arrow_icon color={color} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="py-4">
            {formData?.socialMediaNames
              ?.map((value: any) => value?.socialMediaName?.length > 0)
              ?.includes(true) && (
              <h2 className="text-xl font-bold mb-4 text-left text-black">
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
                          onClick={() =>
                            openInNewTab(formData?.socialLinks?.[0])
                          }
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
          </div>
          <div className="py-4">
            {formData?.digitalPaymentLinks?.map &&
              formData?.digitalPaymentLinks
                ?.map((value: any) => value?.digitalPaymentLink?.length > 0)
                ?.includes(true) && (
                <h2 className="text-xl font-bold mb-4 text-left text-black">
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
          </div>
          <hr className="border-gray-300 mb-4" />
          <div className="flex flex-col justify-center items-center">
            <p className="text-sm font-semibold mb-4 text-black">
              Go Digital - Save Paper, Trees & Our Earth.
            </p>
            <button className="bg-[#9000FF] text-white px-6 py-2 rounded-lg font-semibold  hover:bg-[#9000FF]">
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
