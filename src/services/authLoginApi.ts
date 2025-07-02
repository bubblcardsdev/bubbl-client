import axiosInstance from '../helpers/axios';
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(`/api/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error (error);
  }
};