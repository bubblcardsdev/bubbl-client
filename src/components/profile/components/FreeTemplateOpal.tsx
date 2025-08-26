"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Share_icon,
  Qr_icon,
  Phone_icon,
  Mail_icon,
  WebIcon_thin,
  Location_icon,
  Arrow_icon,
} from "../../common/icons";
import {SocialIconsObj,DigitalIconsObj} from '../../../lib/constant'
import { theme } from "../../../utils/profileThemecolor";
const FreeTemplateOpal = ({
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
  console.log(selectedTheme,'opal')
  return (
    <div className="w-full flex justify-center items-center align-middle bg-[#ccc]">
      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-sm bg-[#EDEDED]  relative overflow-hidden ">
          <div
            className="absolute top-0 left-0 w-[100%]  h-[165px] rounded-br-[550px] mb-[100px] "
            style={{ backgroundColor: color }}
          ></div>
          <div className="relative  flex flex-col items-center  mt-[80px] bg-black rounded-[100px] h-[170px] w-[170px] ml-[100px] outline-none">
            <Image
              src={formData?.profileImageUrl || "/profile.png"}
              alt="profile_Img"
              width={170}
              height={170}
              className=""
            />
          </div>
          <div className="p-5 space-y-4">
            <div className="flex  justify-between  ">
              <div className="flex flex-col space-y-4">
                <button
                  className=" px-8 py-[10px] text-white rounded-[6px]"
                  style={{ backgroundColor: color }}
                >
                  save Contact
                </button>
                <div className="space-x-4">
                  <button
                    className="p-3 rounded-md"
                    style={{ backgroundColor: color }}
                  >
                    <Share_icon />
                  </button>
                  <button
                    className=" p-3 rounded-md"
                    style={{ backgroundColor: color }}
                  >
                    <Qr_icon />
                  </button>
                </div>
              </div>
              <Image
                src={formData?.companyLogoUrl || "/profile.png"}
                width={110}
                height={110}
                alt="profile_img"
              />
            </div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1 text-left text-black">
                {formData?.firstName + " " + formData?.lastName || "Name"}{" "}
              </h1>
              <p className="text-[16px] text-gray-700 mb-2 text-left">
                {formData?.designation || "Designation"}{" "}
              </p>
              <p className="text-gray-600 text-sm text-left">
                {formData?.companyName || "company name"}
              </p>
              <p className="text-gray-600 text-sm text-left">
                {formData?.shortDescription || "Description"}
              </p>
            </div>
            <div className="">
              {(formData?.phoneNumbers?.[0]?.phoneNumber ||
                formData?.emailIds?.[0]?.emailId?.length > 0 ||
                formData?.websites?.[0]?.website?.length > 0 ||
                (formData?.state && formData?.country)) && (
                <h2 className="text-xl font-bold mb-3 text-black text-left">
                  Contact Information
                </h2>
              )}
              {/* Contact Items */}
              <div className="space-y-4 text-black text-left ">
                {/* Phone */}
                {formData?.phoneNumbers?.[0]?.phoneNumber && (
                  <div className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden ">
                    <div className="flex-1 flex items-center gap-3 p-4">
                      <Phone_icon color={color} />
                      <span className="ml-1 flex-grow ">
                        {formData?.phoneNumbers?.[0]?.countryCode}{" "}
                        {formData?.phoneNumbers?.[0]?.phoneNumber}
                      </span>
                    </div>
                    <div
                      className=" flex items-center px-3 "
                      style={{ backgroundColor: color }}
                    >
                      <Arrow_icon />
                    </div>
                  </div>
                )}
                {/* mail*/}
                {formData?.emailIds?.[0]?.emailId?.length > 0 && (
                  <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden">
                    <div className="flex-1 flex items-center gap-3 p-4">
                      <Mail_icon color={color} />
                      <span className="ml-1 flex-grow truncate w-full max-w-[120px] text-black">
                        {formData?.emailIds?.[0]?.emailId}
                      </span>
                    </div>
                    <div
                      className="flex items-center px-3 "
                      style={{ backgroundColor: color }}
                    >
                      <Arrow_icon />
                    </div>
                  </div>
                )}
                {/* website */}
                {formData?.websites?.[0]?.website?.length > 0 && (
                  <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden mt-4">
                    <div className="flex-1 flex items-center gap-3 p-4">
                      <WebIcon_thin color={color} />
                      <span className="ml-1 flex-grow truncate w-full max-w-[120px] text-black">
                        {formData?.websites?.[0]?.website}
                      </span>
                    </div>
                    <div
                      className="flex items-center px-3 "
                      style={{ backgroundColor: color }}
                    >
                      <Arrow_icon />
                    </div>
                  </div>
                )}
                {/* location */}
                {formData?.state && formData?.country && (
                  <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden mt-4">
                    <div className="flex-1 flex items-center gap-3 p-4">
                      <Location_icon color={color} />
                      <span className="ml-1 flex-grow">
                        {formData?.state && formData?.country
                          ? formData?.state + ", " + formData?.country
                          : ""}
                      </span>
                    </div>
                    <div
                      className=" flex items-center px-3 "
                      style={{ backgroundColor: color }}
                    >
                      <Arrow_icon />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="">
              {formData?.socialMediaNames
                ?.map((value: any) => value?.socialMediaName?.length > 0)
                ?.includes(true) && (
                <h2 className="text-xl font-bold mb-3 text-left text-black">
                  social media{" "}
                </h2>
              )}
              <div className="space-y-4">
                {formData?.socialMediaNames &&
                  [...formData.socialMediaNames] // clone array so original isn't mutated
                    .sort(
                      (a: any, b: any) =>
                        (a?.profileSocialMediaId || 0) -
                        (b?.profileSocialMediaId || 0)
                    ) // sort by ID
                    .map((value: any, index: number) => {
                      const Icon =
                        SocialIconsObj?.[value?.profileSocialMediaId];
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
                          >
                            <div className="flex-1 flex items-center gap-3 px-4 py-2">
                              {Icon && <Icon color={color} />}
                              <div className="px-0">
                                <h1 className="flex-grow text-black font-semibold text-[16px]">
                                  {name?.[value?.profileSocialMediaId]}
                                </h1>
                                <p className="text-[12px] truncate w-full max-w-[120px]">
                                  {formData?.socialLinks?.[0]}
                                </p>
                              </div>
                            </div>
                            <div
                              className="flex items-center px-3"
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

            <div className="w-full">
              {formData?.digitalPaymentLinks?.map &&
                formData?.digitalPaymentLinks
                  ?.map((value: any) => value?.digitalPaymentLink?.length > 0)
                  ?.includes(true) && (
                  <h2 className="text-xl font-bold mb-4 text-left text-black ">
                    Digital Payments
                  </h2>
                )}
              <div className="grid grid-cols-3 gap-6 ">
                {formData?.digitalPaymentLinks &&
                  formData?.digitalPaymentLinks?.map(
                    (value: any, index: number) => {
                      const Icon = DigitalIconsObj?.[value?.profileDigitalPaymentsId];
                      if (value?.digitalPaymentLink?.length > 0) {
                        return (
                          <div key={index} className="bg-[#F4F4F4] p-3 rounded-lg flex items-center justify-center w-full">
                            <Icon color={"#8D00D2"} />
                          </div>
                        );
                      }
                    }
                  )}
              </div>
            </div>

            <div className="rounded-lg w-full">
              <hr className="border-gray-300 mb-4" />
              <div className="flex flex-col justify-center items-center text-black">
                <p className="text-sm font-semibold mb-4">
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
      </div>
    </div>
  );
};
export default FreeTemplateOpal;
