import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Share_icon,
  Qr_icon,
  CallProfileIcon,
  MailProfileIcon,
  LocationFill_icon,
  WebIcon_thin,
  InstagramBackgroundFill,
  TwitterIconbackgroundFill,
  FacebookIconbackgroundFill,
  WhatsappIconbackgroundFill,
  YoutubeIconbackgroundFill,
  LinkedinIconbackgroundFill,
  Googlepay_icon,
  Phonepay_icon,
  Paytm_icon,
} from "../../common/icons";
import { theme } from "../../../utils/profileThemecolor";
const ProTemplateNeno = ({
  formData,
  selectedTheme,
}: {
  formData: any;
  selectedTheme: any;
}) => {
  const phoneNumbersCount = formData?.phoneNumbers?.filter(
    (value: any) => value?.phoneNumber?.length > 0 && value?.activeStatus
  )?.length;

  const websitesCount = formData?.websites?.filter(
    (value: any) => value?.website?.length > 0 && value?.activeStatus
  )?.length;

  const emailIdsCount = formData?.emailIds?.filter(
    (value: any) => value?.emailId?.length > 0 && value?.activeStatus
  )?.length;
  const [color, setColor] = useState<string>("");
  useEffect(() => {
    const selected =
      theme.find((theme) => theme.name === selectedTheme)?.color || "#1f1f1f";
    setColor(selected);
  }, [selectedTheme]);
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
    <div className="flex  flex-col items-center align-middle justify-between bg-gray-400 ">
      <div className="">
        <div className="bg-gray-500  w-[400px] h-[350px] object-cover rounded-[0_0_0px_0px]">
          <Image
            src={formData?.profileImageUrl || "/profile.png"}
            alt=""
            height={500}
            width={500}
            className="object-cover"
          />
        </div>
        <div className="relative overflow-hidden min-h-screen w-[400px] bg-black box-border p-5 space-y-4 ">
          <div className=" rounded-xl p-4 md:p-5 w-full text-white relative z-10  backdrop-blur-[5px] bg-opacity border border-gray-400  ">
            <div className="absolute top-0 right-0 bg-gray-500 text-black p-7 rounded-[0_10px_0px_0]">
              <Image
                src={formData?.companyLogoUrl || "/profile.png"}
                alt=""
                width={100}
                height={100}
                className="object-fill h-12 w-12"
              />
            </div>
            <div className="mt-0 flex flex-col gap-y-1 text-left ">
              <h2 className="text-lg font-semibold">
                {formData?.firstName + "" + formData.lastName || "Name"}{" "}
              </h2>
              <p className="text-sm font-semibold tracking-wide text-white/70 ">
                {formData?.position || "Designation"}{" "}
              </p>
              <p className="text-sm font-semibold tracking-wide text-white/70 ">
                {formData?.companyName || "company name"}
              </p>
              <p className="text-sm text-white leading-relaxed mt-3">
                {formData?.shortDescription || "Description"}
              </p>
              <div className="flex gap-4 mt-6">
                <button className="flex-1 bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-md">
                  Save Contact
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-md">
                  <Share_icon />
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-md">
                  <Qr_icon />
                </button>
              </div>
            </div>
          </div>
          {(formData?.phoneNumbers?.[0]?.phoneNumber ||
            formData?.emails?.[0] ||
            formData?.websiteLinks?.[0] ||
            (formData?.state && formData?.country)) && (
            <div className=" text-left rounded-lg p-4 md:p-5 w-full text-white relative z-10  backdrop-blur bg-opacity border border-gray-400   ">
              {(formData?.phoneNumbers?.[0]?.phoneNumber ||
                formData?.emails?.[0] ||
                formData?.websiteLinks?.[0] ||
                (formData?.state && formData?.country)) && (
                <p className="text-xl text-white">Contact Information</p>
              )}
              <div className="flex flex-row justify-evenly gap-x-16 mt-6">
                {formData?.phoneNumbers?.[0]?.phoneNumber && (
                  <div>
                    <CallProfileIcon />
                    {phoneNumbersCount > 0 && (
                      <div
                        style={{ background: color || "red" }}
                        className={`w-5 h-5 rounded-full absolute top-14 right-[290px] z-10 text-xs text-white text-center flex items-center justify-center`}
                      >
                        <span>{phoneNumbersCount}</span>
                      </div>
                    )}
                  </div>
                )}
                {formData?.emailIds?.[0]?.emailId?.length > 0 && (
                  <div>
                    <MailProfileIcon />
                    {emailIdsCount > 0 && (
                      <div
                        style={{ background: color || "red" }}
                        className={`w-5 h-5 rounded-full absolute top-14 right-[200px] z-10 text-xs text-white text-center flex items-center justify-center`}
                      >
                        <span>{emailIdsCount}</span>
                      </div>
                    )}
                  </div>
                )}
                {formData?.state && formData?.country && (
                  <div>
                    <LocationFill_icon />
                  </div>
                )}
                {formData?.websites?.[0]?.website?.length > 0 && (
                  <div>
                    <WebIcon_thin />
                    {websitesCount > 0 && (
                      <div
                        style={{ background: color || "red" }}
                        className={`w-5 h-5 rounded-full absolute top-14 right-[10px]  z-10 text-xs text-white text-center flex items-center justify-center`}
                      >
                        <span>{websitesCount}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          {formData?.socialMediaName
            ?.map((value: any) => value?.socialMediaName?.length > 0)
            ?.includes(true) && (
            <div className=" rounded-lg p-4 md:p-5 w-full text-white relative z-10  backdrop-blur bg-opacity border border-gray-400  ">
              {formData?.socialMediaName
                ?.map((value: any) => value?.socialMediaName?.length > 0)
                ?.includes(true) && (
                <p className="text-xl text-white text-left">Social Media</p>
              )}
              <div className="grid grid-cols-4 justify-evenly gap-x-16 mt-6 gap-y-12">
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
                      if (value?.socialMediaName?.length > 0) {
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-center  rounded-md shadow-md"
                          >
                            {Icon && <Icon color={color} />}
                          </div>
                        );
                      }
                    })}
              </div>
            </div>
          )}
          {formData?.digitalPaymentLinks?.map &&
            formData?.digitalPaymentLinks
              ?.map((value: any) => value?.digitalPaymentLink?.length > 0)
              ?.includes(true) && (
              <div className=" rounded-lg p-4 md:p-5 w-full text-white relative z-10  backdrop-blur bg-opacity border border-gray-400">
                {formData?.digitalLinks?.Digitalpay?.[0] && (
                  <p className="text-xl text-white text-left">
                    Digital Payments
                  </p>
                )}
                <div className="grid grid-cols-4 justify-evenly gap-x-16 mt-6">
                  {formData?.digitalPaymentLinks &&
                    formData?.digitalPaymentLinks?.map(
                      (value: any, index: number) => {
                        const Icon =
                          DigitalIconsObj?.[value?.profileDigitalPaymentsId];
                        if (value?.digitalPaymentLink?.length > 0) {
                          return (
                            <div
                              key={index}
                              className="flex items-center justify-center w-14 h-14 rounded-md shadow-md "
                            >
                              <Icon color={"#8D00D2"} />
                            </div>
                          );
                        }
                      }
                    )}
                </div>
              </div>
            )}
          {/* <hr className="border-gray-300 mb-4 relative z-10  backdrop-blur bg-opacity border" /> */}
          <div className="flex flex-col justify-center items-center relative z-10  backdrop-blur bg-opacity border border-gray-400 p-4 rounded-lg">
            <p className="text-sm font-semibold mb-4 text-white">
              Go Digital - Save Paper, Trees & Our Earth.
            </p>
            <button className="bg-[#9000FF] text-white px-6 py-2 rounded-lg font-semibold  hover:bg-[#9000FF]">
              Join Now
            </button>
            <p className="text-xs text-gray-500 mt-4">
              Powered by bubbl.cards ®
            </p>
          </div>
          <div className="absolute top-[30px] right-[-100px] h-[200px] w-[200px] bg-gradient-to-r from-[#67b26f] to-[#4ca2cd] rounded-[100%_90%_60%_100%]">
            <div className="absolute top-[200px] left-[-400px] h-[250px] w-[300px] bg-gradient-to-r from-[#67b26f] to-[#4ca2cd] rounded-[100%_100%_90%_100%]">
              <div className="absolute top-[400px] right-[-280px] h-[230px] w-[400px] bg-gradient-to-r from-[#67b26f] to-[#4ca2cd] rounded-[100%_100%_90%_100%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProTemplateNeno;
