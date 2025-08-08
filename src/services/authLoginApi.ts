// src/services/authLoginApi.ts
import { toast } from "react-toastify";
import axiosInstance from "../helpers/axios";
import axios from "axios";
import { setAccessToken, setRefreshToken } from "../helpers/localStorage";
import { FormDataType } from "../lib/interface";

export const loginUser = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const response = await axiosInstance.post(`/login`, { email, password });

    if (response?.data?.success) {
      const token = response.data?.data?.token;
      setAccessToken(token?.accessToken);
      setRefreshToken(token?.refreshToken);

      return true;
    }
    toast.error("Login failed. Please try again.");
    return false;
  } catch (error: any) {
    const errMsg =
      axios.isAxiosError(error)
        ? error.response?.data?.data?.message ||
          error.response?.data?.message ||
          error.message
        : "Something went wrong";

    toast.error(errMsg);
    return false;
  }
};

export const RegisterApi = async (formData: FormDataType) => {
  const [firstName, ...rest] = formData?.name?.trim().split(/\s+/);
  const lastName = rest.join(" ");
  try {
    const response = await axiosInstance.post(`/register`, {
      firstName: firstName,
      lastName: lastName || "",
      email: formData.email,
      password: formData.password,
      companyName: formData.companyName,
      phoneNumber: formData.mobile,
      templateId: 1,
      role: formData?.role,
      profileName: "Personal",
    });
    if (!response?.data?.success) return false;

    toast.success(response?.data?.data?.message || "User created successfully");
    return true;
  } catch (error: any) {
    console.error(error);
    const errMsg = axios.isAxiosError(error)
      ? error.response?.data?.data?.message ||
        error.response?.data?.message ||
        error.message
      : "Something went wrong";

    toast.error(errMsg);
    return false;
  }
};