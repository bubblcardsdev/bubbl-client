import axiosInstance from "../helpers/axios";
import { AxiosResponse } from "axios";
// import  { NextRouter } from "next/router";
import { RegisterApi } from "./registerApi";
import { toast } from "react-toastify";
import { FormDataType } from "../components/signup";
export interface VerifyOtpResponse {
  success: boolean;
  message?: string;
  data?:{
    email?:string,
    otp?:string,
  } 
}

export const verifyEmailOtp = async (
  email: string | null,
  otp: string | null
): Promise<VerifyOtpResponse | void> => {
  if (!email || !otp) {
    toast.error("Email or OTP is missing");
    return;
  }

  try {
    const response: AxiosResponse<VerifyOtpResponse> = await axiosInstance.post(
      `/verifyemailOtp`,
      { email, otp}
    );

    if (response?.data?.success === true) {
      const formDataString = sessionStorage.getItem("formData");
      if (!formDataString) {
        toast.error("Registration data missing. Please try again.");
        return;
      }

      const parsedFormData: FormDataType = JSON.parse(formDataString);
      const registerResponse = await RegisterApi(parsedFormData);

      if (registerResponse) {
        toast.success("Account created successfully!");
        // router.push("/login")
        sessionStorage.removeItem("formData")
        // Maybe: clear sessionStorage and redirect
      }
    } else {
      toast.error(response.data?.message || "OTP Verification failed");
    }

    return response.data;
  } catch (error: any) {
    const errMsg = error.response?.data?.message || "OTP verification failed!";
    toast.error(errMsg);
    console.error("OTP verification error:", error);
  }
};


export const ResendMail = async (email: string) => {
  
  try {
    const response = await axiosInstance.post(`/resendMailOtp`, {
      email: email,
    });
    console.log(response, "fff-1");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
