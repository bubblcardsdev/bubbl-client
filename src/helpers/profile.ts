import { createTap } from "../services/profileApi";
import { email, openInNewTab, copyText, call, openSocialLinks } from "../utils/commonLogics";

const socialActions: Record<
  number,
  (value: string, socialMediaId?: number) => void
> = {
  4: (val) => call(val),
  5: (val) => email(val),
  6: (val) => openInNewTab(val),
  7: (val) => openInNewTab(val),
  8: (val, socialMediaId) => openSocialLinks(socialMediaId,val),
  9: (val, socialMediaId) => openSocialLinks(socialMediaId,val),
  10: (val, socialMediaId) => openSocialLinks(socialMediaId,val),
  11: (val, socialMediaId) => openSocialLinks(socialMediaId,val),
  12: (val, socialMediaId) => openSocialLinks(socialMediaId,val),
  13: (val) => copyText(val),
  14: (val) => copyText(val),
  15: (val) => copyText(val),
  16: (val, socialMediaId) => openSocialLinks(socialMediaId,val),
};

const SocialAction: any = {
  1: 8,
  2: 11,
  3: 10,
  4: 12,
  5: 9,
  6: 16,
};

const paymentAction: any = {
  1: 13,
  2: 14,
  3: 15,
};

const onClick = async (
  actionId: number,
  value: string,
  deviceUid: string,
  socialMediaId?: number
) => {
  const action = socialActions[actionId];
  if (action) {
    console.log(value, "social", socialMediaId);
    await action(value, socialMediaId);
    console.log(actionId,socialMediaId,"++");
    
    if (deviceUid) {
      await createTap(actionId, deviceUid);
    }
  }
};

const onCallClick = (formData: any, onShow?: any) => {
  if (formData?.phoneNumbers?.length > 1) {
    console.log(formData,"???");
    
    if (onShow) {
      onShow("visible", "data", formData?.phoneNumbers, "Mobile",formData.deviceUid,4);
    }
    return;
  }

  window.open(`tel:+${formData.phoneNumbers[0].countryCode} ${formData.phoneNumbers[0].phoneNumber}`,"_self");
  onClick(
    4,
    `+${formData.phoneNumbers[0].countryCode} ${formData.phoneNumbers[0].phoneNumber}`,
    formData.deviceUid
  );
};

const onEmailClick = (formData: any, onShow?: any) => {
  if (formData?.emailIds?.length > 1) {
    if (onShow) {
      onShow("visible", "data", formData?.emailIds, "Email",formData.deviceUid,5);
    }
    return;
  }

  onClick(5, formData.emailIds[0].emailId, formData.deviceUid);
};

const onWebsiteClick = (formData: any, onShow?: any) => {
  if (formData?.websites?.length > 1) {
    if (onShow) {
      onShow("visible", "data", formData?.websites, "Website");
    }
    return;
  }

  onClick(6, formData.websites[0].website, formData.deviceUid);
};


const onAddressClick = (formData: any) => {
  onClick(
    7,
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${formData?.address || ""}, ${formData?.city || ""}, ${
        formData?.state || ""
      }, ${formData?.country || ""}`
    )}`,
    formData.deviceUid
  );
};

const onSocialMediaClick = (value: any, formData: any) => {

  onClick(
    SocialAction?.[value?.profileSocialMediaId],
    value?.socialMediaName,
    formData.deviceUid,
    value?.profileSocialMediaId
  );
};

const onPaymentClick = (value: any, formData: any) => {
  onClick(
    paymentAction?.[value?.profileDigitalPaymentsId],
    value?.digitalPaymentLink,
    formData.deviceUid,
    value?.profileDigitalPaymentsId
  );
};

export {
  onCallClick,
  onEmailClick,
  onWebsiteClick,
  onAddressClick,
  onSocialMediaClick,
  onPaymentClick,
};
