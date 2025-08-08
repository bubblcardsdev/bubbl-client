import axiosInstance from '../helpers/axios';
import { toast } from "react-toastify";
import  FormDataType  from '../components/support';
import { getAccessToken } from '../helpers/localStorage';
 interface FormDataType {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}
export const SupportApi= async (FormData: FormDataType) => {
  try {
    const token = getAccessToken()
    console.log(token,"token")
    const response = await axiosInstance.post(`/contact/supportForm`, {
        firstName:FormData?.firstName,
        lastName:FormData?.lastName,
        emailId:FormData?.email,
        phoneNumber:FormData?.phoneNumber,
        message:FormData?.message,
        // privacy:FormData?.privacy
    },
  {
    headers: {
      "Authorization": token
    }
  });
    console.log(response.data,"res")
    return true
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to subscribe.")
  }
};

export { FormDataType };
