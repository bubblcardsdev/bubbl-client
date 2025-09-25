"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Share_icon,
  CallProfileIcon,
  Paytm_icon,
  Phonepay_icon,
  Googlepay_icon,
  MailProfileIcon,
  LocationFill_icon,
  WebIcon_thin,
  saphireFacebookIcon,
  saphireTwitterIcon,
  saphireLinkedinIcon,
  saphireInstagramIcon,
  saphireWhatsappIcon,
  saphireYoutubeIcon,
} from "../../common/icons";

import { theme } from "../../../utils/profileThemecolor";
import { openInNewTab } from "../../../utils/commonLogics";
import QrGenerator from "./QrGenerator";
import { createTap } from "@/src/services/profileApi";
import { ActionKeys, actions, SOCIAL_MEDIA_IDS } from "@/src/lib/constant";

const ProTemplateSpahire = ({
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
  }, [selectedTheme]);

  // Counts
  const phoneNumbersCount = formData?.phoneNumbers?.filter(
    (value: any) => value?.phoneNumber?.length > 0
  )?.length;

  const websitesCount = formData?.websites?.filter(
    (value: any) => value?.website?.length > 0
  )?.length;

  const emailIdsCount = formData?.emailIds?.filter(
    (value: any) => value?.emailId?.length > 0
  )?.length;

  // ✅ Social icons mapped by ID
  const SocialIconsObj: any = {
    "1": saphireInstagramIcon,
    "2": saphireFacebookIcon,
    "3": saphireYoutubeIcon,
    "4": saphireTwitterIcon,
    "5": saphireWhatsappIcon,
    "6": saphireLinkedinIcon,
  };

  // ✅ Payment icons mapped by name
  const PaymentIconsObj: any = {
    "1": Googlepay_icon,
    "2": Phonepay_icon,
    "3": Paytm_icon,
  };

  return (
    // <div className="w-full max-w-[400px] mx-auto overflow-hidden  bg-gray-400">
    //   <div className=" bg-gray-200">
    //     <Image
    //       src={formData?.profileImageUrl || "/profile.png"}
    //       alt=""
    //       width={100}
    //       height={100}
    //       className="object-fit w-full"
    //     />
    //   </div>

    //   <div className="lg:px-4 md:px-4 sm:px-6 xs:px-6 py-8 w-full space-y-3 bg-white ">
    //     {/* Profile header */}
    //     <div className="relative rounded-lg w-full h-34 bg-[#ccc] flex items-center flex-row border">
    //       <div className="relative w-[320px] h-34 p-2 text-left">
    //         <p
    //           className="text-black text-xl font-bold "
    //           style={{ color: color }}
    //         >
    //           {formData?.firstName + " " + formData?.lastName || "Name"}
    //         </p>
    //         <p className="text-black text-md">
    //           {formData?.designation || "Designation"}
    //         </p>
    //         <p className="text-black text-md">
    //           {formData?.companyName || "Company Name"}
    //         </p>
    //         <p className="text-black text-sm mt-6 pl-0 w-full text-left">
    //           {formData?.shortDescription}
    //         </p>
    //       </div>
    //       <div className=" bg-black h-[60px] w-[60px] absolute -right-5 flex items-center">
    //         <Image
    //           src={formData?.companyLogoUrl || "/logo.png"}
    //           alt=""
    //           height={100}
    //           width={100}
    //         />
    //       </div>
    //     </div>

    //     {/* Save contact + QR */}
    //     <div className="flex items-center gap-3 px-0">
    //       <div
    //         className="flex items-center justify-between rounded-lg border-2 border-purple-600 flex-1 h-[45px]"
    //         style={{ border: "2px solid " + color }}
    //       >
    //         <button className="flex-1 h-fit w-[10px]" onClick={handleSave}>
    //           <span className="text-md font-semibold" style={{ color: color }}>
    //             Save Contact
    //           </span>
    //         </button>
    //         <div
    //           className="border-l-2 h-full flex items-center px-2"
    //           style={{ borderLeft: "2px solid " + color }}
    //         >
    //           <Share_icon color={color} />
    //         </div>
    //       </div>
    //       <button
    //         className="p-[10px] rounded-lg"
    //         style={{ backgroundColor: color }}
    //       >
    //         <Qr_icon />
    //       </button>
    //     </div>

    //     {/* Contact Info */}
    //     <div className="p-0">
    //       {(formData?.phoneNumbers?.[0]?.phoneNumber ||
    //         formData?.emailIds?.[0]?.emailId?.length > 0 ||
    //         formData?.websites?.[0]?.website?.length > 0 ||
    //         (formData?.state && formData?.country)) && (
    //         <h2 className="text-lg font-bold mb-4 text-left text-black">
    //           Contact Information
    //         </h2>
    //       )}

    //       <div className="grid grid-cols-4 gap-4 mb-6">
    //         {formData?.phoneNumbers?.[0]?.phoneNumber && (
    //           <div className="relative">
    //             <div className="relative flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
    //               <CallProfileIcon color={color} />
    //             </div>
    //             {phoneNumbersCount > 0 && (
    //               <div
    //                 style={{ background: color || "red" }}
    //                 className="w-5 h-5 rounded-full absolute -top-2 right-1 z-10 text-xs text-white text-center flex items-center justify-center"
    //               >
    //                 <span>{phoneNumbersCount}</span>
    //               </div>
    //             )}
    //           </div>
    //         )}

    //         {formData?.emailIds?.[0]?.emailId?.length > 0 && (
    //           <div className="relative">
    //             <div className="relative flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
    //               <MailProfileIcon color={color} />
    //             </div>
    //             {emailIdsCount > 0 && (
    //               <div
    //                 style={{ background: color || "red" }}
    //                 className="w-5 h-5 rounded-full absolute -top-2 right-1 z-10 text-xs text-white text-center flex items-center justify-center"
    //               >
    //                 <span>{emailIdsCount}</span>
    //               </div>
    //             )}
    //           </div>
    //         )}

    //         {formData?.state && formData?.country && (
    //           <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
    //             <LocationFill_icon color={color} />
    //           </div>
    //         )}

    //         {formData?.websites?.[0]?.website?.length > 0 && (
    //           <div className="relative">
    //             <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
    //               <WebIcon_thin color={color} />
    //             </div>
    //             {websitesCount > 0 && (
    //               <div
    //                 style={{ background: color || "red" }}
    //                 className="w-5 h-5 rounded-full absolute -top-2 right-1 z-10 text-xs text-white text-center flex items-center justify-center"
    //               >
    //                 <span>{websitesCount}</span>
    //               </div>
    //             )}
    //           </div>
    //         )}
    //       </div>

    //       {/* Social Media */}
    //       {formData?.socialMediaNames?.some(
    //         (v: any) => v?.socialMediaName?.length > 0
    //       ) && (
    //         <h2 className="text-lg font-bold mb-4 text-left text-black">
    //           Social Media
    //         </h2>
    //       )}

    //       <div className="grid grid-cols-4 gap-4">
    //         {formData?.socialMediaNames &&
    //           [...formData.socialMediaNames] // clone array so original isn't mutated
    //             .sort(
    //               (a: any, b: any) =>
    //                 (a?.profileSocialMediaId || 0) -
    //                 (b?.profileSocialMediaId || 0)
    //             ) // sort by ID
    //             .map((value: any, index: number) => {
    //               const Icon = SocialIconsObj?.[value?.profileSocialMediaId];
    //               if (value?.socialMediaName?.length > 0) {
    //                 return (
    //                   <div
    //                     key={index}
    //                     role="button"
    //                     onClick={() => openInNewTab(value?.socialMediaName)}
    //                     className="flex items-center justify-center w-12 h-12 bg-[#ccc] rounded-md shadow-md"
    //                   >
    //                     <Icon color={color} />
    //                   </div>
    //                 );
    //               }
    //             })}
    //       </div>

    //       {/* Digital Payments */}
    //       {formData?.digitalPaymentLinks?.some(
    //         (v: any) => v?.digitalPaymentLink?.length > 0
    //       ) && (
    //         <h2 className="text-lg font-bold mt-4 text-black text-left">
    //           Digital Payments
    //         </h2>
    //       )}

    //       <div className="grid grid-cols-4 gap-4">
    //         {formData?.digitalPaymentLinks &&
    //           formData?.digitalPaymentLinks?.map(
    //             (value: any, index: number) => {
    //               const Icon = PaymentIconsObj?.[value?.digitalPaymentName];
    //               if (!Icon || !value?.digitalPaymentLink?.length) return null;
    //               return (
    //                 <div
    //                   key={index}
    //                   className="flex items-center justify-center w-12 h-12 rounded-md shadow-md"
    //                 >
    //                   <Icon color={"#8D00D2"} />
    //                 </div>
    //               );
    //             }
    //           )}
    //       </div>

    //       {/* Footer */}
    //       <hr className="border-gray-300 mb-1 mt-4 border-1 " />
    //       <div className="flex flex-col justify-center items-center">
    //         <p className="text-sm font-semibold mb-4 mt-3 text-black">
    //           Go Digital - Save Paper, Trees & Our Earth.
    //         </p>
    //         <button className="bg-[#9000FF] text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-[#9000FF]">
    //           Join Now
    //         </button>
    //         <p className="text-xs text-gray-500 mt-4">
    //           Powered by bubbl.cards ®
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full max-w-[420px] mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {/* Profile Image */}
      <div className="w-full h-52 relative">
        <Image
          src={formData?.profileImageUrl || "/profile.png"}
          alt="Profile"
          fill
          className="object-cover"
        />
      </div>

      {/* Profile Card */}
      <div className="px-5 py-6 space-y-5">
        {/* Profile Header */}
        <div className="relative rounded-xl w-full bg-gray-100 flex items-center justify-between p-4 shadow">
          <div className="flex-1 pr-3">
            <p className="text-lg font-bold truncate" style={{ color: color }}>
              {formData?.firstName + " " + formData?.lastName || "Name"}
            </p>
            <p className="text-sm text-gray-700">
              {formData?.designation || "Designation"}
            </p>
            <p className="text-sm text-gray-500">
              {formData?.companyName || "Company Name"}
            </p>
            <p className="text-xs mt-2 text-gray-600 line-clamp-2">
              {formData?.shortDescription}
            </p>
          </div>
          <div className="w-14 h-14 flex items-center justify-center bg-black rounded-lg">
            <Image
              src={formData?.companyLogoUrl || "/logo.png"}
              alt="Company Logo"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
        </div>

        {/* Save Contact + QR */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-between flex-1 rounded-lg border h-[45px] overflow-hidden"
            style={{ border: `2px solid ${color}` }}
          >
            <button
              className="flex-1 text-sm font-semibold"
              onClick={handleSave}
              style={{ color: color }}
            >
              Save Contact
            </button>
            <div
              className="border-l flex items-center justify-center px-3 h-full"
              style={{ borderColor: color }}
            >
              <Share_icon color={color} />
            </div>
          </div>
          <button className="p-3 rounded-lg" style={{ backgroundColor: color }}>
            {/* <Qr_icon /> */}
            <QrGenerator
              color={color}
              deviceIdQR={formData?.deviceUid}
              qrBubbl=""
              qrImageUrl=""
            />
          </button>
        </div>

        {/* Contact Info */}
        {(formData?.phoneNumbers?.[0]?.phoneNumber ||
          formData?.emailIds?.[0]?.emailId?.length > 0 ||
          formData?.websites?.[0]?.website?.length > 0 ||
          (formData?.state && formData?.country)) && (
          <>
            <h2 className="text-lg font-bold text-gray-800">
              Contact Information
            </h2>
           <div className="grid grid-cols-4 gap-4">
  {/* Phone */}
  {formData?.phoneNumbers?.[0]?.phoneNumber && (
    <a
      href={`tel:${formData.phoneNumbers[0].countryCode}${formData.phoneNumbers[0].phoneNumber}`}
      className="relative flex items-center justify-center w-14 h-14"
    >
      <div className="flex items-center justify-center w-14 h-14 bg-gray-100 rounded-lg shadow">
        <CallProfileIcon color={color} />
        {phoneNumbersCount > 0 && (
          <span
            className="absolute -top-2 right-1 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full"
            style={{ background: color }}
          >
            {phoneNumbersCount}
          </span>
        )}
      </div>
    </a>
  )}

  {/* Email */}
  {formData?.emailIds?.[0]?.emailId?.length > 0 && (
    <a href={`mailto:${formData.emailIds[0].emailId}`} className="relative flex items-center justify-center w-14 h-14">
      <div className="flex items-center justify-center w-14 h-14 bg-gray-100 rounded-lg shadow">
        <MailProfileIcon color={color} />
        {emailIdsCount > 0 && (
          <span
            className="absolute -top-2 right-1 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full"
            style={{ background: color }}
          >
            {emailIdsCount}
          </span>
        )}
      </div>
    </a>
  )}

  {/* Location */}
  {formData?.state && formData?.country && (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${formData.address},${formData.city},${formData.state},${formData.country}`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-14 h-14"
    >
      <div className="flex items-center justify-center w-14 h-14 bg-gray-100 rounded-lg shadow">
        <LocationFill_icon color={color} />
      </div>
    </a>
  )}

  {/* Website */}
  {formData?.websites?.[0]?.website?.length > 0 && (
    <a
      href={formData.websites[0].website}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center justify-center w-14 h-14"
    >
      <div className="flex items-center justify-center w-14 h-14 bg-gray-100 rounded-lg shadow">
        <WebIcon_thin color={color} />
        {websitesCount > 0 && (
          <span
            className="absolute -top-2 right-1 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full"
            style={{ background: color }}
          >
            {websitesCount}
          </span>
        )}
      </div>
    </a>
  )}
</div>

          </>
        )}

        {/* Social Media */}
        {formData?.socialMediaNames?.some(
          (v: any) => v?.socialMediaName?.length > 0
        ) && (
          <>
            <h2 className="text-lg font-bold text-gray-800">Social Media</h2>
            <div className="grid grid-cols-4 gap-4">
              {formData?.socialMediaNames &&
                [...formData.socialMediaNames]
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
                            // createTap(actions[SOCIAL_MEDIA_IDS[value.profileSocialMediaId]], value)
                            openInNewTab(value?.socialMediaName);
                          }}
                          className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg shadow"
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
          <>
            <h2 className="text-lg font-bold text-gray-800">
              Digital Payments
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {formData?.digitalPaymentLinks?.map(
                (value: any, index: number) => {
                  const Icon = PaymentIconsObj?.[value?.digitalPaymentName];
                  if (!Icon || !value?.digitalPaymentLink?.length) return null;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg shadow"
                    >
                      <Icon color={"#8D00D2"} />
                    </div>
                  );
                }
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="border-t pt-4 text-center space-y-3">
          <p className="text-sm font-semibold text-gray-700">
            Go Digital - Save Paper, Trees & Our Earth.
          </p>
          <button className="bg-[#9000FF] text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-[#7a00cc]">
            Join Now
          </button>
          <p className="text-xs text-gray-500">Powered by bubbl.cards ®</p>
        </div>
      </div>
    </div>
  );
};

export default ProTemplateSpahire;
