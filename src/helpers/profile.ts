import { createTap } from "../services/profileApi";
import { email, openInNewTab, copyText, call } from "../utils/commonLogics";

const socialActions: Record<
  number,
  (value: string, socialMediaId?: number) => void
> = {
  4: (val) => call(val),
  5: (val) => email(val),
  6: (val) => openInNewTab(val),
  7: (val) => openInNewTab(val),
  8: (val, socialMediaId) => openInNewTab(val, socialMediaId),
  9: (val, socialMediaId) => openInNewTab(val, socialMediaId),
  10: (val, socialMediaId) => openInNewTab(val, socialMediaId),
  11: (val, socialMediaId) => openInNewTab(val, socialMediaId),
  12: (val, socialMediaId) => openInNewTab(val, socialMediaId),
  13: (val) => copyText(val),
  14: (val) => copyText(val),
  15: (val) => copyText(val),
};

const SocialAction: any = {
  1: 8,
  2: 11,
  3: 12,
  4: 10,
  5: 1,
  6: 9,
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
    if (deviceUid) {
      await createTap(actionId, deviceUid);
    }
  }
};

const onCallClick = (formData: any, onShow?: any) => {
  if (formData?.phoneNumbers?.length > 1) {
    if (onShow) {
      onShow("visible", "data", formData?.phoneNumbers, "Mobile");
    }
    return;
  }

  onClick(
    4,
    `+${formData.phoneNumbers[0].countryCode} ${formData.phoneNumbers[0].phoneNumber}`,
    formData.deviceUid
  );
};

const onEmailClick = (formData: any, onShow?: any) => {
  if (formData?.emailIds?.length > 1) {
    if (onShow) {
      onShow("visible", "data", formData?.emailIds, "Email");
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
