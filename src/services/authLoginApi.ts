import axiosInstance from '../helpers/axios';
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(`/login`, {
      email:email,
      password:password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};