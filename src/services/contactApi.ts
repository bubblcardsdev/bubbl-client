import axiosInstance from '../helpers/axios';
import { toast } from "react-toastify";
import  FormDataType  from '../components/contact/componets/contactForm';
import { getAccessToken } from '../helpers/localStorage';
 interface FormDataType {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  question:string;
  message: string;
}
export const ContactApi= async (FormData: FormDataType) => {
  try {
    const token = getAccessToken()
    console.log(token,"token")
    const response = await axiosInstance.post(`/contact/`, {
        firstName:FormData?.firstName,
        lastName:FormData?.lastName,
        emailId:FormData?.email,
        phoneNumber:FormData?.phoneNumber,
        question:FormData?.question,
        message:FormData?.message,
        // privacy:FormData?.privacy
    },
  {
    
  });
    console.log(response.data,"res")
    return response.data;
    
  } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to subscribe.")
    // throw error.response?.data || error.message;
  }
};

export { FormDataType };
