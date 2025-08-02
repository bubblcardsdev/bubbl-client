import axiosInstance from '../helpers/axios';
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(`/login`, {
      email,
      password,
    });

    if (response?.data?.success === true) {
      localStorage.setItem("accessToken", response.data?.data?.token?.accessToken);
      localStorage.setItem("refreshToken", response.data?.data?.token?.refreshToken);

      return {
        status: true,
        message: response.data.message,
      };
    }
    return {
      status: false,
      error: response.data?.data?.message || "Login failed",
    };
  } catch (error: any) {
    console.error("Login error:", error);

    const errMsg =
      error.response?.data?.data?.message || // your backend error
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    return {
      status: false,
      error: errMsg,
    };
  }
};
