"use client";
import { useEffect, useState } from "react";
import { GetProfileByUuid } from "@/src/services/profileApi";

import FreeTemplateOpal from "./components/FreeTemplateOpal";
import FreeTemplateRuby from "./components/FreeTemplateRuby";
import ProTemplateQuartz from "./components/ProTemplateQuartz";
import ProTemplateNeno from "./components/ProTemplateNeno";
import ProTemplateSaphire from "./components/ProTemplateSaphire";
import {theme} from '../../utils/profileThemecolor'
interface Props {
  deviceUid?: string;
  profileId?: string;
}

function Profile(props: Props) {
  const {  profileId = "", deviceUid="" } = props;
  const [profileData, setProfileData] = useState<any>(null);
  const [selectedTheme, setSelectedTheme] = useState<any>({});
  const formDataBuilder = (data: any) => {
    return {
      profileId: data?.id,
      profileUid: data?.profileUid,
      userId: data?.userId,
      profileName: data?.profileName || "",
      templateId: data?.templateId, // ✅ lowercase
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
      brandingFontColor: data?.deviceBranding?.[0]?.brandingFontColor || "",
      brandingBackGroundColor:
        data?.deviceBranding?.[0]?.brandingBackGroundColor || "",
      brandingAccentColor: data?.deviceBranding?.[0]?.brandingAccentColor || "",
      brandingFont: data?.brandingFont || "",
      phoneNumberEnable: data?.phoneNumberEnable || "",
      emailEnable: data?.emailEnable || "",
      websiteEnable: data?.websiteEnable || "",
      socialMediaEnable: data?.socialMediaEnable || "",
      digitalMediaEnable: data?.digitalMediaEnable || "",
      phoneNumbers: (data?.profilePhoneNumbers || []).slice(0, 2),
      emailIds: data?.profileEmails || [],
      websites: data?.profileWebsites || [],
      socialMediaNames: [...(data?.profileSocialMediaLinks || [])],
      digitalPaymentLinks: data?.profileDigitalPaymentLinks || [],
      profileImageUrl: data?.profileImg || "",
      companyLogoUrl: data?.companyLogoUrl || "",
    };
  };
  const getProfileData = async () => {
    try {
      
        let res = null
        if(deviceUid){
          res = await GetProfileByUuid(deviceUid)
        }else{
          res = await GetProfileByUuid(profileId)
        }
        
        if (res) {
          setSelectedTheme((prev: any) => ({
            ...prev,
            brandingAccentColor:
              res?.data?.deviceBranding?.[0]?.brandingAccentColor || "",
          }));

          const obj = {
            ...res?.data?.profile,
            deviceBranding: res?.data?.deviceBranding,
            profileImg: res?.data?.profileImgs?.[0]?.image,
            companyLogoUrl: res?.data?.profile?.brandingLogoUrl,
          };
          const response = formDataBuilder(obj);
          setProfileData(response);
        }
      
    } catch (error) {
      console.error("Error calling Profile", error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);
  const getThemeNameByColor = (color: string) => {
    const found = theme.find(
      (t) => t.color.toLowerCase() === color.toLowerCase()
    );
    return found ? found.name : null;
  };
  // map templateId numbers (1–5) directly to components
  const templates: Record<number, any> = {
    1: FreeTemplateOpal,
    2: FreeTemplateRuby,
    3: ProTemplateSaphire,
    4: ProTemplateQuartz,
    5: ProTemplateNeno,
  };

  const Component = profileData ? templates[profileData.templateId] : null;
  console.log(selectedTheme, selectedTheme?.brandingAccentColor, "theme");
  if (!Component) return <p>Loading or invalid template...</p>;

  return (
    <Component
      formData={profileData}
      selectedTheme={getThemeNameByColor(selectedTheme?.brandingAccentColor)}
    />
  );
}

export default Profile;
