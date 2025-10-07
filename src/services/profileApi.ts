import axiosInstance from "../helpers/axios";
import { Id, toast } from "react-toastify";
import { getAccessToken } from "../helpers/localStorage";
import { getApiErrorMessage } from "../utils/utils";

export type PhoneNumber = {
  countryCode: string;
  phoneNumber: string;
  phoneNumberType: string;
  checkBoxStatus: boolean;
  activeStatus: boolean;
};
export type EmailId = {
  emailId: string;
  emailType: string;
  checkBoxStatus: boolean;
  activeStatus: boolean;
};
export type Website = {
  website: string;
  websiteType: string;
  checkBoxStatus: boolean;
  activeStatus: boolean;
};
export type SocialMediaName = {
  profileSocialMediaId: number;
  socialMediaName: string;
  enableStatus: boolean;
  activeStatus: boolean;
};
export type DigitalPaymentLink = {
  profileDigitalPaymentsId: number;
  digitalPaymentLink: string;
  enableStatus: boolean;
  activeStatus: boolean;
};

export interface ProfileFormData {
  profileId: Id;
  profileUid?: string;
  userId?: number;
  profileName: string;
  templateId: number;
  darkMode: boolean;
  firstName: string;
  lastName: string;
  designation: string;
  companyName: string;
  companyAddress: string;
  shortDescription: string;
  address: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  brandingFontColor: string;
  brandingBackGroundColor: string;
  brandingAccentColor: string;
  brandingFont: string;
  phoneNumberEnable: boolean;
  emailEnable: boolean;
  websiteEnable: boolean;
  socialMediaEnable: boolean;
  digitalMediaEnable: boolean;
  phoneNumbers: PhoneNumber[];
  emailIds: EmailId[];
  websites: Website[];
  socialMediaName: SocialMediaName[];
  digitalPaymentLinks: DigitalPaymentLink[];
}

/* -------------------------- error helpers (central) -------------------------- */



function formatValidationErrors(errors: any[]): string {
  return errors
    .map((err) => {
      let msg = err?.message ?? "";

      // Remove quotes
      msg = msg.replace(/\"/g, "");

      // Clean specific array indices (avoid leaking internals)
      msg = msg.replace(/\[\d+\]/g, "");

      // Replace technical field names with user-friendly labels
      msg = msg
        .replace(/(^|\.)profileName/g, "Profile Title")
        .replace(/(^|\.)phoneNumbers\.phoneNumber/g, "Phone Number")
        .replace(/(^|\.)emailIds\.emailId/g, "Email")
        .replace(/(^|\.)socialMedia(Name|Names)\.socialMediaName/g, "Social Media Link")
        .replace(/(^|\.)digitalPaymentLinks\.digitalPaymentLink/g, "Payment Link");

      return msg.trim();
    })
    .filter(Boolean)
    .join("\n");
}

function authHeader() {
  const token = getAccessToken();
  return { Authorization: token };
}

/* ---------------------------------- APIs ---------------------------------- */

export const GetDeviceByUuid = async (deviceUid: string) => {
  try {
    const response = await axiosInstance.get(`profile?deviceUid=${deviceUid}`);
    return response?.data ?? null;
  } catch (error) {
    console.error("Error fetching profile:", error);
    toast.error(getApiErrorMessage(error));
    return null;
  }
};

export const GetProfileByUniqueName = async (uniqueName: string) => {
  try {
    const response = await axiosInstance.get(`profile?uniqueName=${uniqueName}`);
    if (response?.data?.success) return response.data;
    return null;
  } catch (error) {
    console.error("GetProfileByUniqueName error:", error);
    toast.error(getApiErrorMessage(error));
    return null;
  }
};

export const CreateMyProfileApi = async (formData: ProfileFormData) => {
  try {
    const response = await axiosInstance.post(`/profile/create-profile`, formData, {
      headers: authHeader(),
    });
    return response; // original returns the full axios response
  } catch (error: any) {
    console.error("CreateMyProfileApi error:", error);
    let message = "Failed to create profile.";

    const errors = error?.response?.data?.data?.error;
    if (Array.isArray(errors) && errors.length > 0) {
      message = formatValidationErrors(errors);
    } else {
      message = getApiErrorMessage(error, message);
    }

    toast.error(message);
    return false; // original contract
  }
};

export const GetAllProfile = async () => {
  try {
    const response = await axiosInstance.get("profile/all", {
      headers: authHeader(),
    });
    return response?.data ?? null;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    toast.error(getApiErrorMessage(error));
    return null;
  }
};

export const GetOneEditProfile = async (id: string | number) => {
  try {
    const response = await axiosInstance.post(
      "profile/find",
      { profileId: id },
      { headers: authHeader() }
    );
    return response?.data ?? null;
  } catch (error) {
    console.error("Error fetching profile:", error);
    toast.error(getApiErrorMessage(error));
    return null;
  }
};

export const GetOneProfileApi = async (id: number) => {
  try {
    const response = await axiosInstance.post(
      `profile/findOne`,
      { profileId: id },
      { headers: authHeader() }
    );
    return response?.data ?? null;
  } catch (error) {
    console.error("Error fetching single profile:", error);
    toast.error(getApiErrorMessage(error));
    return null; // original returned null in error path
  }
};

export const GetProfileByUuid = async (id: string) => {
  try {
    const response = await axiosInstance.post(`profile/getProfileByUid`, { profileUid: id });
    return response?.data ?? null;
  } catch (error) {
    console.error("Error getting profile by UID:", error);
    toast.error(getApiErrorMessage(error));
    return null;
  }
};

export const DeleteProfileApi = async (id: string | number) => {
  try {
    const response = await axiosInstance.delete(`profile/delete-profile?profileId=${id}`, {
      headers: authHeader(),
    });
    return response?.data ?? null;
  } catch (error) {
    console.error("Error deleting profile:", error);
    toast.error(getApiErrorMessage(error));
    return null;
  }
};

export const UpdateProfile = async (id: string | number, payload: ProfileFormData) => {
  try {
    // maintain original behavior (delete transient keys)
    delete (payload as any)?.profileUid;
    delete (payload as any)?.userId;

    const response = await axiosInstance.put(`/profile/update-profile`, payload, {
      headers: authHeader(),
    });
    return response?.data ?? null;
  } catch (error) {
    console.error("Update Profile API Error:", (error as any)?.response || error);
    // keep original logic: this function threw the error
    // (callers likely rely on try/catch at call site)
    const msg = getApiErrorMessage(error, "Failed to update profile.");
    toast.error(msg);
    return null;
  }
};

export const DuplicateProfileApi = async (id: string | number) => {
  try {
    const response = await axiosInstance.post(
      `profile/duplicate-profile`,
      { profileId: id },
      { headers: authHeader() }
    );
    return response?.data ?? null;
  } catch (error) {
    console.error("Error duplicating profile:", (error as any)?.response?.data || error);
    // keep original logic: this function threw the error
    const msg = getApiErrorMessage(error, "Failed to duplicate profile.");
    toast.error(msg);
    return null;
  }
};

export const UploadProfileImage = async (file: File | any, id: number | string) => {
  try {
    const formData: any = new FormData();
    formData.append("squareImage", file);
    formData.append("rectangleImage", file);
    formData.append("profileId", id);

    const response = await axiosInstance.post("upload/profileImage", formData, {
      headers: {
        ...authHeader(),
        // Let Axios set correct multipart boundary automatically
      },
    });
    return response?.data ?? null;
  } catch (error) {
    console.error("Error uploading Profile Image:", error);
    toast.error(getApiErrorMessage(error, "Failed to upload profile image."));
    return null;
  }
};

export const UploadbrandinglogoImage = async (file: File | any, id: number | string) => {
  try {
    const formData: any = new FormData();
    formData.append("brandingLogo", file);
    formData.append("profileId", id);

    const response = await axiosInstance.post("upload/brandinglogo", formData, {
      headers: {
        ...authHeader(),
      },
    });
    return response?.data ?? null;
  } catch (error) {
    console.error("Error uploading branding logo:", error);
    toast.error(getApiErrorMessage(error, "Failed to upload branding logo."));
    return null;
  }
};

export const DeleteProfileImageApi = async (id: string | number) => {
  try {
    const response = await axiosInstance.put(
      "profile/deleteprofileimage",
      { profileId: id },
      { headers: authHeader() }
    );
    return response?.data ?? null;
  } catch (error) {
    console.error("Profile image not deleted:", error);
    toast.error(getApiErrorMessage(error, "Failed to delete profile image."));
    return null;
  }
};

export const DeletePbrandinglogoImage = async (id: string | number) => {
  try {
    const response = await axiosInstance.put(
      "profile/deletebradingimage",
      { profileId: id },
      { headers: authHeader() }
    );
    return response?.data ?? null;
  } catch (error) {
    console.error("Branding logo not deleted:", error);
    toast.error(getApiErrorMessage(error, "Failed to delete branding logo."));
    return null;
  }
};

export const createTap = async (clickAction: number, deviceId: string) => {
  try {
    const response = await axiosInstance.post("/analytics/tapDetails", { deviceId, clickAction });
    return response ?? null; // original returned full axios response
  } catch (error) {
    console.log("createTap error:", error);
    // analytics call: avoid noisy toasts; only log. If you want toast, uncomment:
    // toast.error(getApiErrorMessage(error, "Failed to log tap."));
    return null;
  }
};
