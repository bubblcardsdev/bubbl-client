import { toast } from "react-toastify";
import axiosInstance from "../helpers/axios";
import { FormDataType } from "../components/signup";


export const RegisterApi = async (formData: FormDataType) => {

  try {
    const response = await axiosInstance.post(`/register`,formData);

    return response?.data?.success;
  } catch (error:any) {
    toast.error(error.response.data.data.message || "Something went wrong !!!")
    console.log("Error fetching data:", error);
  }
};
