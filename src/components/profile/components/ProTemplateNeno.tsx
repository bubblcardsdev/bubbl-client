import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Share_icon,
  CallProfileIcon,
  MailProfileIcon,
  LocationFill_icon,
  WebIcon_thin,
  Googlepay_icon,
  Phonepay_icon,
  Paytm_icon,
  NenoFacebookIcon,
  NenoTwitterIcon,
  NenoLinkedinIcon,
  NenoYouTubeIcon,
  NenoInstagramIcon,
  NenoWhatsappIcon,
} from "../../common/icons";

import { theme } from "../../../utils/profileThemecolor";
import QrGenerator from "./QrGenerator";
import {
  navigatorShare,
} from "@/src/utils/commonLogics";
import { useRouter } from "next/router";

import { ToastContainer } from "react-toastify";
import { onAddressClick, onCallClick, onEmailClick, onPaymentClick, onSocialMediaClick, onWebsiteClick } from "@/src/helpers/profile";
import { useShowHideWithRecord } from "@/src/hooks/useShowHideWithRecord";
import MultiPopup from "./multiPopup";

const ProTemplateNeno = ({
  formData,
  selectedTheme,
  handleSave,
}: {
  formData: any;
  selectedTheme: any;
  handleSave: () => void;
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
    "1": NenoInstagramIcon, // Instagram
    "2": NenoFacebookIcon, // Facebook
    "3": NenoTwitterIcon, // Twitter
    "4": NenoYouTubeIcon, // Youtube
    "5": NenoLinkedinIcon, // LinkedIn
    "6": NenoWhatsappIcon, // WhatsApp
  };
  const DigitalIconsObj: any = {
    "1": Googlepay_icon,
    "2": Phonepay_icon,
    "3": Paytm_icon,
  };
  const router = useRouter();
  const { object, onShow, onHide } = useShowHideWithRecord({
    visible: false,
    title: "",
    data: "",
  });
  return (
    <div className="flex flex-col items-center w-full sm:max-w-[380px] mx-auto ">
      <ToastContainer />
      <MultiPopup
        visible={object.visible}
        list={object.data}
        onClose={onHide}
        title={object.title}
      />
      <div className="w-full">
        {/* Profile Image */}
        <div className="w-full h-60 sm:h-72 md:h-80 lg:h-96 bg-gray-500">
          <Image
            src={formData?.profileImageUrl || "/profile.png"}
            alt=""
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Section */}
        <div className="relative overflow-hidden w-full bg-black box-border p-4 sm:p-5 space-y-5">
          {/* Profile Card */}
          <div className="relative z-10 rounded-xl p-4 sm:p-5 text-white backdrop-blur-md border border-gray-500">
            <div className="absolute top-5 right-5 rounded-[0px_10px_0px_0px] h-[80px] w-[80px] flex items-center justify-center overflow-hidden">
              <Image
                src={formData?.companyLogoUrl || "/logo.png"}
                alt="Company Logo"
                width={500}
                height={500}
                className="object-cover h-full w-full"
              />
            </div>

            <div className="flex flex-col gap-y-1 text-left">
              <h2 className="text-lg font-semibold">
                {(
                  (formData?.firstName || "") +
                  " " +
                  (formData?.lastName || "")
                ).trim() || "Name"}
              </h2>
              <p className="text-sm font-medium text-white/70">
                {" "}
                {formData?.position || "Designation"}
              </p>
              <p className="text-sm font-medium text-white/70">
                {formData?.companyName || "Company Name"}
              </p>
              <p className="text-sm text-white leading-relaxed mt-3">
                {formData?.shortDescription || "Description"}
              </p>

              {/* Buttons */}
              {router.asPath.slice(1) !== "createNewProfile" && (
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold py-2 rounded-md"
                  >
                    Save Contact
                  </button>
                  <button
                    onClick={() => navigatorShare(window.location.href)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 rounded-md"
                  >
                    <Share_icon />
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-md">
                    {/* <Qr_icon /> */}
                    <QrGenerator
                      color={color}
                      deviceIdQR={formData?.profileUid}
                      qrBubbl=""
                      qrImageUrl=""
                    />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          {(formData?.phoneNumbers?.[0]?.phoneNumber ||
            formData?.emailIds?.[0]?.emailId ||
            formData?.websites?.[0]?.website ||
            (formData?.state && formData?.country)) && (
              <div className="rounded-lg p-4 sm:p-5 text-white relative z-10 backdrop-blur-md border border-gray-500">
                <p className="text-lg font-semibold text-left">
                  Contact Information
                </p>

                <div className="flex justify-around mt-6">
                  {/* Phone */}
                  {formData?.phoneNumbers?.[0]?.phoneNumber && (
                    <div className="relative">
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          onCallClick(formData, onShow);
                        }}
                      >
                        <CallProfileIcon />
                      </button>
                      {phoneNumbersCount > 0 && (
                        <span
                          style={{ background: color }}
                          className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-xs text-white flex items-center justify-center"
                        >
                          {phoneNumbersCount}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Email */}
                  {formData?.emailIds?.[0]?.emailId && (
                    <div className="relative">
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          onEmailClick(formData, onShow);
                        }}
                      >
                        <MailProfileIcon />
                      </button>
                      {emailIdsCount > 0 && (
                        <span
                          style={{ background: color }}
                          className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-[10px] text-white flex items-center justify-center"
                        >
                          {emailIdsCount}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Location */}
                  {formData?.state && formData?.country && (
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        onAddressClick(formData);
                      }}
                    >
                      <LocationFill_icon />
                    </button>
                  )}

                  {/* Website */}
                  {formData?.websites?.[0]?.website && (
                    <div className="relative">
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          onWebsiteClick(formData, onShow);
                        }}
                      >
                        <WebIcon_thin />
                      </button>
                      {websitesCount > 0 && (
                        <span
                          style={{ background: color }}
                          className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs text-white flex items-center justify-center"
                        >
                          {websitesCount}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

          {/* Social Media */}
          {formData?.socialMediaNames?.some(
            (v: any) => v?.socialMediaName?.length > 0
          ) && (
              <div className="rounded-lg p-4 sm:p-5 text-white relative z-10 backdrop-blur-md border border-gray-500">
                <p className="text-lg font-semibold text-left">Social Media</p>
                <div className="grid grid-cols-4 gap-6 sm:gap-8 mt-6">
                  {formData?.socialMediaNames
                    ?.sort(
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
                            className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full cursor-pointer"
                            role="button"
                            onClick={() => {
                              onSocialMediaClick(value, formData);
                            }}
                          >
                            {Icon && <Icon color="#FFFFFF" />}
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
            )}

          {/* Digital Payments */}
          {formData?.digitalPaymentLinks?.some(
            (v: any) => v?.digitalPaymentLink?.length > 0
          ) && (
              <div className="rounded-lg p-4 sm:p-5 text-white relative z-10 backdrop-blur-md border border-gray-500">
                <p className="text-lg font-semibold text-left">
                  Digital Payments
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 mt-6">
                  {formData?.digitalPaymentLinks?.map(
                    (value: any, index: number) => {
                      const Icon =
                        DigitalIconsObj?.[value?.profileDigitalPaymentsId];
                      if (value?.digitalPaymentLink?.length > 0) {
                        return (
                          <div
                            onClick={async () => {
                              onPaymentClick(value, formData);
                            }}
                            key={index}
                            className="flex items-center justify-center w-14 h-14 rounded-full cursor-pointer"
                          >
                            {Icon && <Icon color="#8D00D2" />}
                          </div>
                        );
                      }
                    }
                  )}
                </div>
              </div>
            )}

          {/* Footer */}
          <div className="flex flex-col justify-center items-center relative z-10 backdrop-blur-md border border-gray-500 p-4 rounded-lg">
            <p className="text-sm font-semibold mb-4 text-center text-white">
              Go Digital - Save Paper, Trees & Our Earth.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-[#9000FF] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#7a00d0]"
            >
              Join Now
            </button>
            <p className="text-xs text-gray-500 mt-4">
              Powered by bubbl.cards ®
            </p>
          </div>

          {/* Floating gradient shapes */}
          <div className="absolute -top-10 -right-20 w-40 h-40 bg-gradient-to-r from-[#67b26f] to-[#4ca2cd] rounded-full blur-3xl opacity-30"></div>
          <div className="absolute top-1/2 -left-24 w-52 h-52 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full blur-3xl opacity-30"></div>
        </div>
      </div>
    </div>
  );
};

export default ProTemplateNeno;
