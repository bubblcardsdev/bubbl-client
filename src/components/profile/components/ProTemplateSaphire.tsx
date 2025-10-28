"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Share_icon,
  CallProfileIcon,
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

import QrGenerator from "./QrGenerator";
import { DigitalIconsObj } from "../../../lib/constant";
import {
  onAddressClick,
  onCallClick,
  onEmailClick,
  onPaymentClick,
  onSocialMediaClick,
  onWebsiteClick,
} from "@/src/helpers/profile";
import { useShowHideWithRecord } from "@/src/hooks/useShowHideWithRecord";
import MultiPopup from "./multiPopup";

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
    
    setColor(selectedTheme);
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

  const SocialIconsObj: any = {
    "1": saphireInstagramIcon,
    "2": saphireFacebookIcon,
    "3": saphireTwitterIcon,
    "4": saphireYoutubeIcon,
    "5": saphireLinkedinIcon,
    "6": saphireWhatsappIcon,
  };

  const { object, onShow, onHide } = useShowHideWithRecord({
    visible: false,
    title: "",
    data: "",
  });
  return (
    <div className="w-full mx-auto overflow-hidden shadow-[1px_1px_4px_0px_rgb(163_162_162_/_60%)] sm:max-w-[380px]">
      <Image
        src={formData?.profileImageUrl || "/profile.png"}
        alt=""
        width={100}
        height={100}
        className="object-fit w-full"
      />
      <MultiPopup
        visible={object.visible}
        list={object.data}
        onClose={onHide}
        title={object.title}
      />
      <div className="lg:px-4 md:px-4 sm:px-6 xs:px-6 py-8 w-full bg-white flex flex-col gap-6">
        {/* Profile header */}
        <div className="relative rounded-lg w-full h-34 bg-[#ECECEC] flex items-center flex-row border">
          <div className="relative w-[320px] h-34 p-2 text-left">
            <p
              className="text-black text-xl font-bold "
              style={{ color: color }}
            >
              {formData?.firstName + " " + formData?.lastName || "Name"}
            </p>
            <p className="text-black text-md">
              {formData?.designation || "Designation"}
            </p>
            <p className="text-black text-md">
              {formData?.companyName || "Company Name"}
            </p>
            <p className="text-black text-sm mt-6 pl-0 w-full text-left">
              {formData?.shortDescription}
            </p>
          </div>
          <div className=" bg-black h-[80px] w-[80px] absolute -right-2 flex items-center rounded-md">
            <Image
              src={formData?.companyLogoUrl || "/logo.png"}
              alt=""
              height={100}
              width={100}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Save contact + QR */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-between rounded-lg border-2 border-purple-600 flex-1 h-[50px]"
            style={{ border: "2px solid " + color }}
          >
            <button className="flex-1 h-fit w-[10px]" onClick={handleSave}>
              <span className="text-md font-semibold" style={{ color: color }}>
                Save Contact
              </span>
            </button>
            <div
              className="border-l-2 h-full flex items-center px-4"
              style={{ borderLeft: "2px solid " + color }}
            >
              <Share_icon color={color} />
            </div>
          </div>

          <button
            className=" rounded-lg"
            style={{ border: "2px solid " + color }}
          >
            <QrGenerator
              color={color}
              deviceIdQR={formData?.profileUid}
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
          <h2 className="text-lg font-bold mb-4 text-left text-black">
            Contact Information
          </h2>
        )}

        <div className="grid grid-cols-4 gap-4">
          {formData?.phoneNumbers?.[0]?.phoneNumber && (
            <button
              onClick={async (e) => {
                e.preventDefault();
                onCallClick(formData, onShow);
              }}
            >
              <div className="relative">
                <div className="relative flex items-center justify-center mx-auto h-[55px] w-[55px] rounded-[10px] bg-[linear-gradient(300deg,#D0D0D0,#F8F8F8)]">
                  <CallProfileIcon color={color} />
                </div>
                {phoneNumbersCount > 0 && (
                  <div
                    style={{ background: color || "red" }}
                    className="w-5 h-5 rounded-full absolute -top-2 right-1 z-10 text-xs text-white text-center flex items-center justify-center "
                  >
                    <span>{phoneNumbersCount}</span>
                  </div>
                )}
              </div>
            </button>
          )}

          {formData?.emailIds?.[0]?.emailId?.length > 0 && (
            <button
              onClick={async (e) => {
                e.preventDefault();
                onEmailClick(formData, onShow);
              }}
            >
              <div className="relative">
                <div className="relative flex items-center justify-center mx-auto  h-[55px] w-[55px] rounded-[10px] bg-[linear-gradient(300deg,#D0D0D0,#F8F8F8)]">
                  <MailProfileIcon color={color} />
                </div>
                {emailIdsCount > 0 && (
                  <div
                    style={{ background: color || "red" }}
                    className="w-5 h-5 rounded-full absolute -top-2 right-1 z-10 text-xs text-white text-center flex items-center justify-center"
                  >
                    <span>{emailIdsCount}</span>
                  </div>
                )}
              </div>
            </button>
          )}

          {formData?.state && formData?.country && (
            <button
              onClick={async (e) => {
                e.preventDefault();
                onAddressClick(formData);
              }}
            >
              <div className="flex items-center justify-center mx-auto h-[55px] w-[55px] rounded-[10px] bg-[linear-gradient(300deg,#D0D0D0,#F8F8F8)]">
                <LocationFill_icon color={color} />
              </div>
            </button>
          )}

          {formData?.websites?.[0]?.website?.length > 0 && (
            <button
              onClick={async (e) => {
                e.preventDefault();
                onWebsiteClick(formData, onShow);
              }}
            >
              <div className="relative">
                <div className="flex items-center justify-center mx-auto h-[55px] w-[55px] rounded-[10px] bg-[linear-gradient(300deg,#D0D0D0,#F8F8F8)]">
                  <WebIcon_thin color={color} />
                </div>
                {websitesCount > 0 && (
                  <div
                    style={{ background: color || "red" }}
                    className="w-5 h-5 rounded-full absolute -top-2 right-1 z-10 text-xs text-white text-center flex items-center justify-center"
                  >
                    <span>{websitesCount}</span>
                  </div>
                )}
              </div>
            </button>
          )}
        </div>

        {/* Social Media */}
        {formData?.socialMediaNames?.some(
          (v: any) => v?.socialMediaName?.length > 0
        ) && (
          <h2 className="text-lg font-bold mb-4 text-left text-black">
            Social Media
          </h2>
        )}

        <div className="grid grid-cols-4 gap-4">
          {formData?.socialMediaNames &&
            [...formData.socialMediaNames] // clone array so original isn't mutated
              .sort(
                (a: any, b: any) =>
                  (a?.profileSocialMediaId || 0) -
                  (b?.profileSocialMediaId || 0)
              ) // sort by ID
              .map((value: any, index: number) => {
                const Icon = SocialIconsObj?.[value?.profileSocialMediaId];
                if (value?.socialMediaName?.length > 0) {
                  return (
                    <div
                      key={index}
                      role="button"
                      onClick={() => {
                        onSocialMediaClick(value, formData);
                      }}
                      className="flex items-center justify-center mx-auto h-[55px] w-[55px] rounded-[10px] bg-[linear-gradient(300deg,#D0D0D0,#F8F8F8)]"
                    >
                      <Icon color={color} />
                    </div>
                  );
                }
              })}
        </div>

        {/* Digital Payments */}
        {/* {formData?.digitalPaymentLinks?.some(
            (v: any) => v?.digitalPaymentLink?.length > 0
          ) && (
            <h2 className="text-lg font-bold mt-4 text-black text-left">
              Digital Payments
            </h2>
          )}

          <div className="grid grid-cols-4 gap-4">
            {formData?.digitalPaymentLinks &&
              formData?.digitalPaymentLinks?.map(
                (value: any, index: number) => {
                  const Icon = PaymentIconsObj?.[value?.digitalPaymentName];
                  if (!Icon || !value?.digitalPaymentLink?.length) return null;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-center  h-[55px] w-[55px] rounded-[10px] bg-[linear-gradient(300deg,#D0D0D0,#F8F8F8)]"
                    >
                      <Icon color={"#8D00D2"} />
                    </div>
                  );
                }
              )}
          </div> */}
        {formData?.digitalPaymentLinks?.map &&
          formData?.digitalPaymentLinks
            ?.map((value: any) => value?.digitalPaymentLink?.length > 0)
            ?.includes(true) && (
            <h2 className="text-base xs:text-lg sm:text-xl font-bold text-left text-black">
              Digital Payments
            </h2>
          )}
        <div className="grid grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-6">
          {formData?.digitalPaymentLinks &&
            formData?.digitalPaymentLinks?.map((value: any, index: number) => {
              const Icon = DigitalIconsObj?.[value?.profileDigitalPaymentsId];

              console.log(value, "?");

              if (value?.digitalPaymentLink?.length > 0 && Icon) {
                // Added Icon check
                return (
                  <div
                    onClick={async () => {
                      onPaymentClick(value, formData);
                    }}
                    key={index}
                    className=" cursor-pointer bg-[#F4F4F4]  flex items-center justify-center mx-auto h-[55px] w-[55px] rounded-[10px] bg-[linear-gradient(300deg,#D0D0D0,#F8F8F8)]"
                  >
                    <Icon color={"#8D00D2"} />
                  </div>
                );
              }
              return null; // Explicitly return null for items that don't meet conditions
            })}
        </div>
        {/* Footer */}
        <hr className="border-gray-300 mb-1 mt-4 border-1 " />
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="text-sm font-semibold  text-black">
            Go Digital - Save Paper, Trees & Our Earth.
          </p>
          <button className="bg-[#9000FF] text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-[#9000FF]">
            Join Now
          </button>
          <p className="text-xs text-gray-500">Powered by bubbl.cards ®</p>
        </div>
      </div>
    </div>
  );
};

export default ProTemplateSpahire;
