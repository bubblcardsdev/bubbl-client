"use client";
import { useEffect, useState } from "react";
import {
  GetDeviceByUuid,
  GetProfileByUuid,
  GetProfileByUniqueName,
} from "../../services/profileApi";
import FreeTemplateOpal from "./components/FreeTemplateOpal";
import FreeTemplateRuby from "./components/FreeTemplateRuby";
import ProTemplateQuartz from "./components/ProTemplateQuartz";
import ProTemplateNeno from "./components/ProTemplateNeno";
import ProTemplateSaphire from "./components/ProTemplateSaphire";
import { downloadVCard } from "../../utils/downloadVcard";
import { generateVCard } from "../../utils/generateVCard";
import { useRouter } from "next/router";
import MonoColorLoader from "../common/monoColorLoader";
interface Props {
  deviceUid?: string;
  profileId?: string;
  uniqueName?: string;
}
function Profile(props: Props) {
  const { profileId = "", deviceUid = "", uniqueName = "" } = props;
  const [profileData, setProfileData] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();
  const formDataBuilder = (data: any) => {
    console.log(data,'d')
    return {
      profileId: data?.id,
      profileUid: data?.profileUid,
      deviceUid: data?.deviceUid,
      userId: data?.userId,
      profileName: data?.profileName || "",
      templateId: data?.templateId,
      darkMode: false,
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      designation: data?.designation || "",
      companyName: data?.companyName || "",
      companyAddress: data?.companyAddress || "",
      shortDescription: data?.shortDescription || "",
      address: data?.address || "",
      city: data?.city || "",
      zipCode: data?.zipCode || "",
      state: data?.state || "",
      country: data?.country || "",
      brandingFontColor: data?.brandingFontColor || "",
      brandingBackGroundColor:
        data?.brandingBackGroundColor || "",
      brandingAccentColor: data?.brandingAccentColor || "#60449a",
      brandingFont: data?.brandingFont || "",
      phoneNumberEnable: data?.phoneNumberEnable || "",
      emailEnable: data?.emailEnable || "",
      websiteEnable: data?.websiteEnable || "",
      socialMediaEnable: data?.socialMediaEnable || "",
      digitalMediaEnable: data?.digitalMediaEnable || "",
      phoneNumbers: (data?.profilePhoneNumbers || []).slice(0, 2),
      emailIds: (data?.profileEmails || []).slice(0, 2),
      websites: (data?.profileWebsites || []).slice(0, 2),
      socialMediaNames: [...(data?.profileSocialMediaLinks || [])],
      digitalPaymentLinks: data?.profileDigitalPaymentLinks || [],
      profileImageUrl: data?.profileImg || "",
      companyLogoUrl: data?.companyLogoUrl || "",
    };
  };
  const getProfileData = async () => {
    try {
      let res = null;

      if (deviceUid) {

        res = await GetDeviceByUuid(deviceUid);
      } else if (profileId) {

        res = await GetProfileByUuid(profileId);
      } else if (uniqueName) {
        res = await GetProfileByUniqueName(uniqueName);
      }

      if (res) {


        const obj = {
          ...res?.data?.profile,
          profileImg: res?.data?.profileImgs?.[0]?.image,
          companyLogoUrl: res?.data?.profile?.brandingLogoUrl,
          deviceUid: deviceUid,
        };

        
        
        const response = formDataBuilder(obj);
        setProfileData(response);
      } else setNotFound(true);
    } catch (error) {
      console.error("Error calling Profile", error);
    }
  };

  useEffect(() => {
    if(typeof window !== "undefined"){
      if (notFound) router.replace("/404",`${router.asPath}`, {shallow:true});
    getProfileData();
    }
  }, [notFound]);

  // map templateId numbers (1–5) directly to components
  const templates: Record<number, any> = {
    1: FreeTemplateOpal,
    2: FreeTemplateRuby,
    3: ProTemplateSaphire,
    4: ProTemplateQuartz,
    5: ProTemplateNeno,
  };

  const Component = profileData ? templates[profileData.templateId] : null;
  
  if (!Component) return <MonoColorLoader containerClassName="bg-white/90"/>;

  const contact = {
    name: profileData?.firstName + " " + profileData?.lastName,
    countryCode: "+91",
    mobileNumbers: profileData?.phoneNumbers,
    emails: profileData?.emailIds,
    websites: profileData?.websites,
  };

  const handleSave = () => {
    const vcard = generateVCard(contact);
    downloadVCard(vcard, `${contact.name}.vcf`);
  };
  return (
    <Component
      formData={profileData}
      handleSave={handleSave}
      selectedTheme={profileData.brandingAccentColor}
    />
  );
}

export default Profile;
