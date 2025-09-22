
import axios from "axios";
import axiosInstance from "../helpers/axios";
import { toast } from "react-hot-toast";

export const fetchAllDevices = async () => {
  try {
    const response = await axiosInstance.get(`/cart/alldevices`);
    if(!response?.data?.success) return null;
    return response?.data?.data
  } catch (error) {
    const errMsg = axios.isAxiosError(error)
      ? error.response?.data?.data?.message ||
        error.response?.data?.message ||
        error.message
      : "Something went wrong";

    toast.error(errMsg);
    return null;

  }
};
