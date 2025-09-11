
import axiosInstance from "../helpers/axios";
import { toast } from "react-toastify";
import { getAccessToken } from "../helpers/localStorage";


export interface UserData {
  username: string;
  phone: string;
  email: string;
  dob: string;
  gender: string;
  country: string;
  updateUserUrl?: string;
}

export interface SettingFormDataType {
  firstName: string;
  lastName: string;
  email: string;
  DOB: number;
  phoneNumber: string;
  gender: string;
  country: string;
  updateUserUrl: string;
}

/**
 * Upload Profile Image
 */
export const UpdateUserImage = async (file: File) => {
  try {
    const token = getAccessToken();
    const formData = new FormData();
    formData.append("userImage", file); // 👈 backend field name

    const res = await axiosInstance.post("/upload/userImage", formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data; // { success: true, imageUrl: "..." }
  } catch (error: any) {
    console.error("Error uploading image:", error);
    toast.error("Failed to upload image.");
    throw error;
  }
};

/**
 * Delete Profile Image
 */
export const DeleteUserImage = async () => {
  try {
    const token = getAccessToken();

    const response = await axiosInstance.delete(`/home/deleteImage`, {
      headers: {
        Authorization: token,
      },
    });

    return response.data; // { success: true }
  } catch (error: any) {
    console.error("Error deleting image:", error);
    toast.error("Failed to delete image.");
    throw error;
  }
};

/**
 * Update User Settings (form data like name, phone, etc.)
 */
export const UpdateSettingFormData = async (
  formData: SettingFormDataType
) => {
  try {
    const token = getAccessToken();
    const response = await axiosInstance.put(
      "/updateUser",
      formData, // 👈 send actual form data
      {
        headers: {
          Authorization: token,
        },
      }
    );

    toast.success("Settings updated successfully!");
    return response.data;
  } catch (error: any) {
    console.error("Update failed:", error);
    toast.error(error.response?.data?.message || "Failed to update settings.");
    throw error;
  }
};

/**
 * Fetch User Profile
 */
export const SettingGetuserData = async () => {
  try {
    const token = getAccessToken();

    const response = await axiosInstance.get("/home/userProfile", {
      headers: {
        Authorization: token,
      },
    });

    return response.data; // { userProfile: { ... } }
  } catch (error: any) {
    console.error("Error fetching profile:", error);
    toast.error("Failed to fetch profile data.");
    throw error;
  }
};
export const ChangePassword = async (data: any) => {
  try {
    const token = getAccessToken();
    const response = await axiosInstance.put(
      "/reset",
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching profile:", error);
    toast.error("Failed to fetch profile data.");
    throw error;
  }
}
