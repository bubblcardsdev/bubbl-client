"use client";


import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { GetTapProfile } from "@/src/services/profileApi";
import { downloadVCard } from "@/src/utils/downloadVcard";
import { generateVCard } from "@/src/utils/generateVCard";


import FreeTemplateOpal from "@/src/components/profile/components/FreeTemplateOpal";
import FreeTemplateRuby from "@/src/components/profile/components/FreeTemplateRuby";
import ProTemplateQuartz from "@/src/components/profile/components/ProTemplateQuartz";
import ProTemplateNeno from "@/src/components/profile/components/ProTemplateNeno";
import ProTemplateSaphire from "@/src/components/profile/components/ProTemplateSaphire";



import MonoColorLoader from "@/src/components/common/monoColorLoader";

function Tap({ deviceUid }: { deviceUid: string }) {

    const [profileData, setProfileData] = useState<any>(null);
    const [notFound, setNotFound] = useState(false);
    const router = useRouter();
    console.log(deviceUid, "deviceUid");

    const formDataBuilder = (data: any) => {
        console.log(data, 'd')
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
            let accessToken = localStorage.getItem("accessToken");
            let res = await GetTapProfile(deviceUid);

            if (res.status === 200) {

                const obj = {
                    ...res?.data?.profile,
                    profileImg: res?.data?.profileImgs?.[0]?.image,
                    companyLogoUrl: res?.data?.profile?.brandingLogoUrl,
                    deviceUid: res?.data?.deviceUid?.deviceUid
                };
                const response = formDataBuilder(obj);
                setProfileData(response);

            } else if (res.status == 201) {

                if (accessToken) router.push("/mydevice?deviceUid=" + deviceUid);
                else {
                    let reqUrl = "/mydevice?deviceUid=" + deviceUid;
                    localStorage.setItem("reqUrl", reqUrl);
                    setNotFound(true);
                    router.push("/login");
                };

            } else if (res.status == 204) {
                if (accessToken) router.push("/mydevice");
                else {
                    let reqUrl = "/mydevice";
                    localStorage.setItem("reqUrl", reqUrl);
                    setNotFound(true)
                    router.push("/login");
                };
            } else setNotFound(true);


        } catch (error) {
            console.error("Error calling Profile", error);
        }
    };



    useEffect(() => {
        getProfileData();
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
    console.log(Component);

    if (!Component) return <MonoColorLoader containerClassName="bg-white/90" />;

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

export default Tap;