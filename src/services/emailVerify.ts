import axiosInstance from "../helpers/axios";
import { AxiosResponse } from "axios";
import { NextRouter } from "next/router";
// import { RegisterApi } from "./registerApi";
import { toast } from "react-toastify";
import { setEmailVerified } from "../helpers/localStorage";
// import { FormDataType } from "../components/signup";
// import { RegisterCreateProfile } from "./profile";
export interface VerifyOtpResponse {
  success: boolean;
  message?: string;
  data?: {
    email?: string;
    otp?: string;
  };
}

export const verifyEmailOtp = async (
  email: string | null,
  otp: string | null,
  router: NextRouter
): Promise<VerifyOtpResponse | void> => {
  console.log("comes here", email, otp);

  if (!email || !otp) {
    toast.error("Email or OTP is missing");
    return;
  }

  try {
    const response: AxiosResponse<VerifyOtpResponse> = await axiosInstance.post(
      `/verifyemailOtp`,
      { email, otp }
    );

    if (response?.data?.success === true) {
      setEmailVerified("true");
      toast.success("otp has been verified successfully");
        // const reqPath = getReqPath();
        // removeReqPath()
        router.push("/login");
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
    return true;
  } catch (error) {
    return false;
    console.error(error);
  }
};

export const RequestResetLink = async (email: string) => {
  try {
    const response = await axiosInstance.post("/forgotpassword", { email });
    if (response?.data?.success) {
      toast.success(response.data.data.message || "Reset link sent!");
    } else {
      toast.error("Failed to send reset link. Try again.");
    }
    return response?.data;
  } catch (err) {
    toast.error("Error sending reset link. Please try again later.");
    console.error("RequestResetLink error:", err);
  }
};
