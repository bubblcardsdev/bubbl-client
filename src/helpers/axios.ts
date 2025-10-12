
import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  removeAccessToken,
  removeRefreshToken,
} from "./localStorage";
import { BACKEND_URI } from "../lib/constant";

const BASE_URL = `${BACKEND_URI}/api`; // 👈 adjust this if your backend has no /api

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["x-access-token"] = {accessToken};
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔴 If token expired (401) and we haven’t retried yet
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        console.log(refreshToken,"...vg");
        
        if (!refreshToken) {
          // No refresh token → force logout
          removeAccessToken();
          removeRefreshToken();
          window.open("/login?expired=1","_self")
          return Promise.reject(error);
        }

        // 🔄 Try refreshing the access token
        const response = await axios.post(
          `${BASE_URL}/refresh/token`,{refreshToken}
        );

        if (response.status === 200) {
          const newAccessToken = response?.data?.token?.accessToken;
          console.log(response?.data);
          
          if (newAccessToken) {
            setAccessToken(newAccessToken);
            // Retry original request with new token
            originalRequest.headers[
              "authorization"
            ] = newAccessToken;
            return axiosInstance(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        removeAccessToken();
        removeRefreshToken();
        window.open("/login?expired=1","_self") // 👈 redirect if refresh fails
        return Promise.reject(refreshError);
      }
    }

    // 🔴 If still 401 or 404 → logout & redirect
    if (
      error.response &&
      (error.response.status === 401)
    ) {
      console.warn("API Error:", error.response.status, error.response.data);
      removeAccessToken();
      removeRefreshToken();
      window.open("/login?expired=1","_self")
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
