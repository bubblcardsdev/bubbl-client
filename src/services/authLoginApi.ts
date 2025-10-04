// src/services/authLoginApi.ts

import { toast } from "react-toastify";
import axiosInstance from "../helpers/axios";
import axios, { AxiosError } from "axios";
import { setAccessToken, setRefreshToken } from "../helpers/localStorage";
import { FormDataType } from "../lib/interface";
import { NextRouter } from "next/router";


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
      google: false,
      apple: false,
    linkedin:false,
     local: true,
     facebook: false
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


export const OauthRegisterApi = async (formData: FormDataType, oAuthType: string) => {
  const [firstName, ...rest] = formData?.name?.trim().split(/\s+/);
  const lastName = rest.join(" ");

  // Base payload
  const payload: Record<string, any> = {
    firstName: firstName,
    lastName: lastName || "",
    email: formData.email,
    companyName: formData.companyName,
    phoneNumber: formData.mobile,
    templateId: 1,
    role: formData?.role,
    profileName: "Personal",
    local: false, // since it's OAuth
    google: false,
    facebook: false,
    linkedin: false,
    apple: false,
  };

  // Set the correct provider flag
  if (oAuthType.toLowerCase() === "google") payload.google = true;
  if (oAuthType.toLowerCase() === "facebook") payload.facebook = true;
  if (oAuthType.toLowerCase() === "linkedin") payload.linkedin = true;
  if (oAuthType.toLowerCase() === "apple") payload.apple = true;

  try {
    const response = await axiosInstance.post(`/register`, payload);

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


export const responseMessage = async (response: any, router: NextRouter) => {
  try {
    const googleResp = await axiosInstance.post("/verifygoogleuserlatest", {
      credential: response?.credential,
    });

    console.log("Backend response:", googleResp.data);
       localStorage.setItem("accessToken",googleResp.data?.token?.accessToken)
    localStorage.setItem("refreshToken",googleResp.data?.token?.refreshToken)
    router.push("/myprofile"); // success redirect
    return true;
  } catch (err: any) {
    console.error("Google login error:", err);

    // AxiosError has response object
    const axiosError = err as AxiosError;
    if (axiosError.response?.status === 404) {
      // user not found, navigate to signup
      localStorage.setItem("oauth","true")
      localStorage.setItem("type","google")

      router.push("/signup");
    }

    return false;
  }
};


export const responseFacebook = async (response: any, router: NextRouter) => {
  console.log(response,"/");
  
  try {
    const googleResp = await axiosInstance.post("/verifyFacebookUserLatest", {
      accesstoken: response?.credential,
    });

    console.log("Backend response:", googleResp.data);
    localStorage.setItem("accessToken",googleResp.data?.token?.accessToken)
    localStorage.setItem("refreshToken",googleResp.data?.token?.refreshToken)

    router.push("/myprofile"); // success redirect
    return true;
  } catch (err: any) {
    console.error("Google login error:", err);

    // AxiosError has response object
    const axiosError = err as AxiosError;
    if (axiosError.response?.status === 404) {
      // user not found, navigate to signup
      localStorage.setItem("oauth","true")
      router.push("/signup");
    }

    return false;
  }
};






export const GoogleLoginApi = async (id: string) => {
  try {
    const googleResp = axios.post("/verifygoogleuser", id);
    return googleResp;
  } catch (error) {
    console.log(error);
  }
};

export const FacebookLoginApi = async (id: string) => {
  try {
    const faceBookResp = axios.post("/verifyfacebookuser", id);
    return faceBookResp;
  } catch (error) {
    console.log(error);
  }
};

export const LinkedInLoginApi = async (id: string) => {
  try {
    const linkResp = axios.post("/verifylinkedinuser", id);
    return linkResp;
  } catch (error) {
    console.log(error);
  }
};