import { toast } from "react-toastify";
import axiosInstance from "../helpers/axios";

interface RegisterFormData {
  firstName: string;
  email: string;
  password: string;
}
export const RegisterApi = async (formData: RegisterFormData) => {

  try {
    const response = await axiosInstance.post(`/register`, {
      firstName: formData.firstName,
      email: formData.email,
      password:formData.password,
    });

    return response?.data?.success;
  } catch (error:any) {
    toast.error(error.response.data.data.message || "Something went wrong !!!")
    console.log("Error fetching data:", error);
  }
};
