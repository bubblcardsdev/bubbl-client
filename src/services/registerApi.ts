import { toast } from "react-toastify";
import axiosInstance from "../helpers/axios";
import { FormDataType } from "../components/signup";


export const RegisterApi = async (formData: FormDataType) => {
const [firstName, ...rest] = formData?.firstName?.trim().split(/\s+/); 
const lastName = rest.join(" ");  
try {
    const response = await axiosInstance.post(`/register`,{
  firstName: firstName,
  lastName: lastName || "",
  email: formData.email,
  password:formData.password,
  companyName:formData.companyName,
  phoneNumber:formData.mobile,
  templateId:1,
  role:formData?.role,
  profileName:"Personal"
    });
 toast.success(response?.data?.data?.message || "User created successfully")
    return response?.data?.success;
  } catch (error:any) {
     toast.error(error.response.data.data.message || "Something went wrong !!!")
    console.log("Error fetching data:", error);
  }
};
