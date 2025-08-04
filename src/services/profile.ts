import { toast } from "react-toastify";
import axiosInstance from "../helpers/axios";
import { FormDataType } from "../components/signup";


export const RegisterCreateProfile = async(formData:FormDataType)=>{

  const [firstName, ...rest] = formData?.firstName?.trim().split(/\s+/); 
const lastName = rest.join(" ");  

const payload = {
  firstName,
  lastName,
  emailIds: [
    {
      emailId: formData.email,
      activeStatus: true,         
    }
  ],
  phoneNumbers: [
    {
      countryCode: "+91",   // should get from form fiels later      
      phoneNumber: formData.mobile,
      activeStatus: true,         
    }
  ],
  profileName: "Personal",
  templateId: 1,
  companyName: formData.companyName || "",
  role: formData.role || "",            
};
try {
    const response = await axiosInstance.post(`/profile/create-profile`,payload);

    return response?.data?.success;
  } catch (error:any) {
    //   return {
    //   success:false,
    //   error:error?.message
    // }
    toast.error(error.response.data.data.message || "Something went wrong !!!")
    console.log("Error fetching data:", error);
  }

}