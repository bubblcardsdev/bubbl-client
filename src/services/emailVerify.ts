import axiosInstance from "../helpers/axios";
import { AxiosResponse } from "axios";
import Router from "next/router";
export interface VerifyOtpResponse {
  success: boolean;
  message?: string;
  data?:{
    email?:string,
    otp?:string,
  } 
}
export const EmailverifyOtp = async (
  email: string | null,
  otp: string | null,
): Promise<VerifyOtpResponse | void> => {
  if (!email || !otp) {
    console.error("Email or OTP is missing");
    return;
  }

  try {
    const response: AxiosResponse<VerifyOtpResponse> = await axiosInstance.post(
      `/verifyemailOtp`,
      {
        email,
        otp,
      }
    );

    if (response?.data?.success === true) {
      Router.push("/login");
    }

    return response.data;
  } catch (error) {
    console.error("OTP verification error:", error);
  }
};

export const ResendMail = async (email: string | null) => {
  try {
    const response = await axiosInstance.post(`/resendMail`, {
      email: email,
    });
    console.log(response, "fff-1");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
