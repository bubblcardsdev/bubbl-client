import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../helpers/axios";
import { FormDataType } from "./contactApi";




export const addToCart = async (formData: FormDataType) => {

  try {
    const response = await axiosInstance.put(`/cart/addtocart`, {
 
    });
    if (!response?.data?.success) return false;

    toast.success(response?.data?.data?.message || "Added to Cart successfully");
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

export const fetchCart = async () => {

  try {
    const response = await axiosInstance.get(`/cart/all`, {
 
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

