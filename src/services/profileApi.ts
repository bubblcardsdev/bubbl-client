import axiosInstance from "../helpers/axios";
import { Id, toast } from "react-toastify";
import { getAccessToken } from "../helpers/localStorage";
import axios from "axios";
export type PhoneNumber = {
  // phoneNumberId?: number;
  countryCode: string;
  phoneNumber: string;
  phoneNumberType: string;
  checkBoxStatus: boolean;
  activeStatus: boolean;
};
export type EmailId = {
  // emailIdNumber?: number;
  emailId: string;
  emailType: string;
  checkBoxStatus: boolean;
  activeStatus: boolean;
};
export type Website = {
  // websiteId?: number;
  website: string;
  websiteType: string;
  checkBoxStatus: boolean;
  activeStatus: boolean;
};
export type SocialMediaName = {
  // profileSocialMediaLinkId?: number;
  profileSocialMediaId: number;
  socialMediaName: string;
  enableStatus: boolean;
  activeStatus: boolean;
};
export type DigitalPaymentLink = {
  // profileDigitalPaymentLinkId?: number;
  profileDigitalPaymentsId: number;
  digitalPaymentLink: string;
  enableStatus: boolean;
  activeStatus: boolean;
};
export interface ProfileFormData {
  profileId: Id;
  profileUid?: string;
  // deviceUid?: string;
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
export const GetDeviceByUuid = async (deviceUid: string) => {
  try {
    const response = await axiosInstance.get(`profile?deviceUid=${deviceUid}`);
    console.log(response?.data?.deviceUid, "res");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching profile:", error);
    const errMsg = axios.isAxiosError(error)
      ? error.response?.data?.data?.message ||
        error.response?.data?.message ||
        error.message
      : "Something went wrong";
    toast.error(errMsg);
    return null;
  }
};
export const GetProfileByUniqueName = async (uniqueName: string) => {
  try {
    const response = await axiosInstance.get(
      `profile?uniqueName=${uniqueName}`
    );
    if (response?.data?.success) {
      return response?.data;
    }
    return null;
  } catch (error: any) {
    console.error(error);
    const errMsg = axios.isAxiosError(error)
      ? error.response?.data?.data?.message ||
        error.response?.data?.message ||
        error.message
      : "Something went wrong";
    toast.error(errMsg);
    return null;
  }
};
export const CreateMyProfileApi = async (formData: ProfileFormData) => {
  try {
    const token = getAccessToken();
    const response = await axiosInstance.post(
      `/profile/create-profile`,
      formData,
      {
        headers: { Authorization: token },
      }
    );
    return response;
  } catch (error: any) {
    let message = "Failed to create profile.";

    const errors = error.response?.data?.data?.error;
    if (Array.isArray(errors) && errors.length > 0) {
      message = formatValidationErrors(errors);
    } else if (error.response?.data?.message) {
      message = error.response.data.message;
    }

    toast.error(message);
    return false;
  }
};


function formatValidationErrors(errors: any[]): string {
  return errors
    .map((err) => {
      let msg = err.message;

      // Remove quotes
      msg = msg.replace(/\"/g, "");

      // Clean array indices: phoneNumbers[0].phoneNumber → Phone Number
      msg = msg.replace(/\[0\]/g, ""); 

      // Replace technical field names with user-friendly labels
      msg = msg
        .replace("profileName", "Profile Title")
        .replace("phoneNumbers.phoneNumber", "Phone Number")
        .replace("emailIds.emailId", "Email")
        .replace("socialMediaNames.socialMediaName", "Social Media Link")
        .replace("digitalPaymentLinks.digitalPaymentLink", "Payment Link");

      return msg;
    })
    .join("\n");
}
export const GetAllProfile = async () => {
  try {
    const token = getAccessToken(); // get token from localStorage or your helper

    const response = await axiosInstance.get("profile/all", {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching profiles:", error);
  }
};
export const GetOneEditProfile = async (id: string | number) => {
  try {
    const token = getAccessToken();

    const response = await axiosInstance.post(
      "profile/find",
      { profileId: id },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error fetching profile:", error);
  }
};

export const GetOneProfileApi = async (id: number) => {
  try {
    const token = getAccessToken();

    const response = await axiosInstance.post(
      `profile/findOne`,
      { profileId: id }, // ✅ send profileId in body
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error duplicating profile:", error?.response?.data || error);
    return null;
  }
};
export const GetProfileByUuid = async (id: string) => {
  try {
    const response = await axiosInstance.post(
      `profile/getProfileByUid`,
      { profileUid: id } // ✅ send profileId in body
    );
    return response.data;
  } catch (error: any) {
    console.error("Error duplicating profile:", error?.response?.data || error);
    return null;
  }
};
export const DeleteProfileApi = async (id: string | number) => {
  try {
    const token = getAccessToken();
    const response = await axiosInstance.delete(
      `profile/delete-profile?profileId=${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error deleting profile:", error);
  }
};
export const UpdateProfile = async (
  id: string | number,
  payload: ProfileFormData
) => {
  try {
    console.log(payload, "pay");
    const token = getAccessToken();
    delete payload?.profileUid;
    delete payload?.userId;
    const response = await axiosInstance.put(
      `/profile/update-profile`,
      payload,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Update Profile API Error:", error?.response || error);
    throw error;
  }
};
export const DuplicateProfileApi = async (id: string | number) => {
  try {
    const token = getAccessToken();
    const response = await axiosInstance.post(
      `profile/duplicate-profile`,
      { profileId: id }, // send profileId in body
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error duplicating profile:", error?.response?.data || error);
    throw error;
  }
};
export const UploadProfileImage = async (
  file: File | any,
  id: number | string
) => {
  try {
    const token = getAccessToken();
    // Prepare form data
    const formData: any = new FormData();
    formData.append("squareImage", file);
    formData.append("rectangleImage", file);
    formData.append("profileId", id);
    const response = await axiosInstance.post(
      "upload/profileImage", // <-- relative path since axiosInstance has baseURL
      formData,
      {
        headers: {
          Authorization: token, // use Bearer token
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error uploading Profile Image:", error);
  }
};
export const UploadbrandinglogoImage = async (
  file: File | any,
  id: number | string
) => {
  try {
    const token = getAccessToken();

    // Prepare form data
    const formData: any = new FormData();
    formData.append("brandingLogo", file);
    formData.append("profileId", id);
    const response = await axiosInstance.post(
      "upload/brandinglogo", // <-- relative path since axiosInstance has baseURL
      formData,
      {
        headers: {
          Authorization: token, // use Bearer token
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error uploading Profile Image:", error);
  }
};
export const DeleteProfileImageApi = async (id: string | number) => {
  try {
    const token = getAccessToken();
    const response = await axiosInstance.put(
      "profile/deleteprofileimage",
      { profileId: id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error, "ProfileImage not delete");
  }
};
export const DeletePbrandinglogoImage = async (id: string | number) => {
  try {
    const token = getAccessToken();

    const response = await axiosInstance.put(
      "profile/deletebradingimage",
      { profileId: id },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createTap = async(clickAction:number,deviceId:string) => {

  try{
    const response =await axiosInstance.post("/analytics/tapDetails",{deviceId,clickAction})
    return response;
  }
  catch(err){
console.log(err);

  }

}
