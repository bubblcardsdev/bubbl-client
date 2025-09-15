// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import {
//   Share_icon,
//   Qr_icon,
//   CallProfileIcon,
//   MailProfileIcon,
//   LocationFill_icon,
//   WebIcon_thin,
//   InstagramBackgroundFill,
//   TwitterIconbackgroundFill,
//   FacebookIconbackgroundFill,
//   WhatsappIconbackgroundFill,
//   YoutubeIconbackgroundFill,
//   LinkedinIconbackgroundFill,
//   Googlepay_icon,
//   Phonepay_icon,
//   Paytm_icon,
// } from "../../common/icons";
// import { theme } from "../../../utils/profileThemecolor";
// const ProTemplateNeno = ({
//   formData,
//   selectedTheme,
// }: {
//   formData: any;
//   selectedTheme: any;
// }) => {
//   const phoneNumbersCount = formData?.phoneNumbers?.filter(
//     (value: any) => value?.phoneNumber?.length > 0 && value?.activeStatus
//   )?.length;

//   const websitesCount = formData?.websites?.filter(
//     (value: any) => value?.website?.length > 0 && value?.activeStatus
//   )?.length;

//   const emailIdsCount = formData?.emailIds?.filter(
//     (value: any) => value?.emailId?.length > 0 && value?.activeStatus
//   )?.length;
//   const [color, setColor] = useState<string>("");
//   useEffect(() => {
//     const selected =
//       theme.find((theme) => theme.name === selectedTheme)?.color || "#1f1f1f";
//     setColor(selected);
//   }, [selectedTheme]);
//   const SocialIconsObj: any = {
//     "1": InstagramBackgroundFill,
//     "2": FacebookIconbackgroundFill,
//     "3": YoutubeIconbackgroundFill,
//     "4": TwitterIconbackgroundFill,
//     "5": WhatsappIconbackgroundFill,
//     "6": LinkedinIconbackgroundFill,
//   };
//   const DigitalIconsObj: any = {
//     "1": Googlepay_icon,
//     "2": Phonepay_icon,
//     "3": Paytm_icon,
//   };
//   return (
//     <div className="flex  flex-col items-center align-middle justify-between bg-gray-400  border border-red-500 w-full max-w-[400px]">
//       <div className="w-full max-w-[400px]">
//         <div className="bg-gray-500  w-[400px] h-[350px] object-cover rounded-[0_0_0px_0px]">
//           <Image
//             src={formData?.profileImageUrl || "/profile.png"}
//             alt=""
//             height={500}
//             width={500}
//             className="object-cover"
//           />
//         </div>
//         <div className="relative overflow-hidden min-h-screen w-[400px] bg-black box-border p-5 space-y-4 ">
//           <div className=" rounded-xl p-4 md:p-5 w-full text-white relative z-10  backdrop-blur-[5px] bg-opacity border border-gray-400  ">
//             <div className="absolute top-0 right-0 bg-gray-500 text-black p-7 rounded-[0_10px_0px_0]">
//               <Image
//                 src={formData?.companyLogoUrl || "/logo.png"}
//                 alt=""
//                 width={100}
//                 height={100}
//                 className="object-fill h-12 w-12"
//               />
//             </div>
//             <div className="mt-0 flex flex-col gap-y-1 text-left ">
//               <h2 className="text-lg font-semibold">
//                 {formData?.firstName + "" + formData.lastName || "Name"}{" "}
//               </h2>
//               <p className="text-sm font-semibold tracking-wide text-white/70 ">
//                 {formData?.position || "Designation"}{" "}
//               </p>
//               <p className="text-sm font-semibold tracking-wide text-white/70 ">
//                 {formData?.companyName || "company name"}
//               </p>
//               <p className="text-sm text-white leading-relaxed mt-3">
//                 {formData?.shortDescription || "Description"}
//               </p>
//               <div className="flex gap-4 mt-6">
//                 <button className="flex-1 bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-md">
//                   Save Contact
//                 </button>
//                 <button className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-md">
//                   <Share_icon />
//                 </button>
//                 <button className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-md">
//                   <Qr_icon />
//                 </button>
//               </div>
//             </div>
//           </div>
//           {(formData?.phoneNumbers?.[0]?.phoneNumber ||
//             formData?.emails?.[0] ||
//             formData?.websiteLinks?.[0] ||
//             (formData?.state && formData?.country)) && (
//             <div className=" text-left rounded-lg p-4 md:p-5 w-full text-white relative z-10  backdrop-blur bg-opacity border border-gray-400   ">
//               {(formData?.phoneNumbers?.[0]?.phoneNumber ||
//                 formData?.emails?.[0] ||
//                 formData?.websiteLinks?.[0] ||
//                 (formData?.state && formData?.country)) && (
//                 <p className="text-xl text-white">Contact Information</p>
//               )}
//               <div className="flex flex-row justify-evenly gap-x-16 mt-6">
//                 {formData?.phoneNumbers?.[0]?.phoneNumber && (
//                   <div>
//                     <CallProfileIcon />
//                     {phoneNumbersCount > 0 && (
//                       <div
//                         style={{ background: color || "red" }}
//                         className={`w-5 h-5 rounded-full absolute top-14 right-[290px] z-10 text-xs text-white text-center flex items-center justify-center`}
//                       >
//                         <span>{phoneNumbersCount}</span>
//                       </div>
//                     )}
//                   </div>
//                 )}
//                 {formData?.emailIds?.[0]?.emailId?.length > 0 && (
//                   <div>
//                     <MailProfileIcon />
//                     {emailIdsCount > 0 && (
//                       <div
//                         style={{ background: color || "red" }}
//                         className={`w-5 h-5 rounded-full absolute top-14 right-[200px] z-10 text-xs text-white text-center flex items-center justify-center`}
//                       >
//                         <span>{emailIdsCount}</span>
//                       </div>
//                     )}
//                   </div>
//                 )}
//                 {formData?.state && formData?.country && (
//                   <div>
//                     <LocationFill_icon />
//                   </div>
//                 )}
//                 {formData?.websites?.[0]?.website?.length > 0 && (
//                   <div>
//                     <WebIcon_thin />
//                     {websitesCount > 0 && (
//                       <div
//                         style={{ background: color || "red" }}
//                         className={`w-5 h-5 rounded-full absolute top-14 right-[10px]  z-10 text-xs text-white text-center flex items-center justify-center`}
//                       >
//                         <span>{websitesCount}</span>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//           {formData?.socialMediaName
//             ?.map((value: any) => value?.socialMediaName?.length > 0)
//             ?.includes(true) && (
//             <div className=" rounded-lg p-4 md:p-5 w-full text-white relative z-10  backdrop-blur bg-opacity border border-gray-400  ">
//               {formData?.socialMediaName
//                 ?.map((value: any) => value?.socialMediaName?.length > 0)
//                 ?.includes(true) && (
//                 <p className="text-xl text-white text-left">Social Media</p>
//               )}
//               <div className="grid grid-cols-4 justify-evenly gap-x-16 mt-6 gap-y-12">
//                 {formData?.socialMediaNames &&
//                   [...formData.socialMediaNames] // clone array so original isn't mutated
//                     .sort(
//                       (a: any, b: any) =>
//                         (a?.profileSocialMediaId || 0) -
//                         (b?.profileSocialMediaId || 0)
//                     ) // sort by ID
//                     .map((value: any, index: number) => {
//                       const Icon =
//                         SocialIconsObj?.[value?.profileSocialMediaId];
//                       if (value?.socialMediaName?.length > 0) {
//                         return (
//                           <div
//                             key={index}
//                             className="flex items-center justify-center  rounded-md shadow-md"
//                           >
//                             {Icon && <Icon color={color} />}
//                           </div>
//                         );
//                       }
//                     })}
//               </div>
//             </div>
//           )}
//           {formData?.digitalPaymentLinks?.map &&
//             formData?.digitalPaymentLinks
//               ?.map((value: any) => value?.digitalPaymentLink?.length > 0)
//               ?.includes(true) && (
//               <div className=" rounded-lg p-4 md:p-5 w-full text-white relative z-10  backdrop-blur bg-opacity border border-gray-400">
//                 {formData?.digitalLinks?.Digitalpay?.[0] && (
//                   <p className="text-xl text-white text-left">
//                     Digital Payments
//                   </p>
//                 )}
//                 <div className="grid grid-cols-4 justify-evenly gap-x-16 mt-6">
//                   {formData?.digitalPaymentLinks &&
//                     formData?.digitalPaymentLinks?.map(
//                       (value: any, index: number) => {
//                         const Icon =
//                           DigitalIconsObj?.[value?.profileDigitalPaymentsId];
//                         if (value?.digitalPaymentLink?.length > 0) {
//                           return (
//                             <div
//                               key={index}
//                               className="flex items-center justify-center w-14 h-14 rounded-md shadow-md "
//                             >
//                               <Icon color={"#8D00D2"} />
//                             </div>
//                           );
//                         }
//                       }
//                     )}
//                 </div>
//               </div>
//             )}
//           {/* <hr className="border-gray-300 mb-4 relative z-10  backdrop-blur bg-opacity border" /> */}
//           <div className="flex flex-col justify-center items-center relative z-10  backdrop-blur bg-opacity border border-gray-400 p-4 rounded-lg">
//             <p className="text-sm font-semibold mb-4 text-white">
//               Go Digital - Save Paper, Trees & Our Earth.
//             </p>
//             <button className="bg-[#9000FF] text-white px-6 py-2 rounded-lg font-semibold  hover:bg-[#9000FF]">
//               Join Now
//             </button>
//             <p className="text-xs text-gray-500 mt-4">
//               Powered by bubbl.cards ®
//             </p>
//           </div>
//           <div className="absolute top-[30px] right-[-100px] h-[200px] w-[200px] bg-gradient-to-r from-[#67b26f] to-[#4ca2cd] rounded-[100%_90%_60%_100%]">
//             <div className="absolute top-[200px] left-[-400px] h-[250px] w-[300px] bg-gradient-to-r from-[#67b26f] to-[#4ca2cd] rounded-[100%_100%_90%_100%]">
//               <div className="absolute top-[400px] right-[-280px] h-[230px] w-[400px] bg-gradient-to-r from-[#67b26f] to-[#4ca2cd] rounded-[100%_100%_90%_100%]"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ProTemplateNeno;
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
    <div className="flex flex-col items-center w-full max-w-md mx-auto ">
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
            <div className="absolute top-0 right-0 bg-gray-600 p-3 sm:p-5 rounded-bl-xl">
              <Image
                src={formData?.companyLogoUrl || "/logo.png"}
                alt=""
                width={48}
                height={48}
                className="object-contain h-12 w-12"
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
              <div className="flex gap-3 mt-6">
                <button
                onClick={  handleSave}
                 className="flex-1 bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold py-2 rounded-md">
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
                {formData?.phoneNumbers?.[0]?.phoneNumber && (
                  <div className="relative">
                    <CallProfileIcon />
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
                {formData?.emailIds?.[0]?.emailId && (
                  <div className="relative">
                    <MailProfileIcon />
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
                {formData?.state && formData?.country && (
                  <span>
                    {" "}
                    <LocationFill_icon />
                  </span>
                )}
                {formData?.websites?.[0]?.website && (
                  <div className="relative">
                    <WebIcon_thin />
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
                          className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full"
                        >
                          {Icon && <Icon color={color} />}
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
                          key={index}
                          className="flex items-center justify-center w-14 h-14 rounded-full"
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
            <button className="bg-[#9000FF] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#7a00d0]">
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
