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
    console.log(response, "res");
    return response?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
