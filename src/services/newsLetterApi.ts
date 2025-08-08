import { toast } from "react-toastify";
import axiosInstance from "../helpers/axios";
import { AxiosError } from "axios"; 
interface NewsletterResponse {
  message: string;
}

export const NewsLetterApi = async (emailId: string): Promise<NewsletterResponse> => {
  try {
    const res = await axiosInstance.post<NewsletterResponse>(`contact/newsletter`, { emailId });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    toast.error(error.response?.data?.message || "Failed to subscribe.")
    return {
        message:error.response?.data?.message || "Failed to subscribe."
    };
  }
};
