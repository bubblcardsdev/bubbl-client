import axiosInstance from "../helpers/axios";
export const RegisterApi = async (formData: any) => {

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
