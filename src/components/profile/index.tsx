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
import { theme } from "../../utils/profileThemecolor";
import { downloadVCard } from "../../utils/downloadVcard";
import { generateVCard } from "../../utils/generateVCard";
import { useRouter } from "next/router";
interface Props {
  deviceUid?: string;
  profileId?: string;
  uniqueName?: string;
}
function Profile(props: Props) {
  const { profileId = "", deviceUid = "", uniqueName = "" } = props;
  const [profileData, setProfileData] = useState<any>(null);
  const [selectedTheme, setSelectedTheme] = useState<any>({});
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();
  const formDataBuilder = (data: any) => {
    return {
      profileId: data?.id,
      profileUid: data?.profileUid,
      deviceUid: data?.devices?.deviceUid,
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
      let res = null;

      if (deviceUid) {

        res = await GetDeviceByUuid(deviceUid);
      } else if (profileId) {

        res = await GetProfileByUuid(profileId);
      } else if (uniqueName) {
        res = await GetProfileByUniqueName(uniqueName);
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
      } else setNotFound(true);
    } catch (error) {
      console.error("Error calling Profile", error);
    }
  };

  useEffect(() => {
    if (notFound) router.push("/404");
    getProfileData();
  }, [notFound]);
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
      selectedTheme={getThemeNameByColor(selectedTheme?.brandingAccentColor)}
    />
  );
}

export default Profile;
