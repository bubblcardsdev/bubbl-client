// import axios from "axios";
// import Router from "next/router";
// import {
//   getAccessToken,
//   getRefreshToken,
//   setAccessToken,
// } from "./localStorage";
// // import { disconnectSocket } from "./socket";
// import { BACKEND_URI } from "../lib/constant";

// const BASE_URL = `${BACKEND_URI}/api`;
// // const BASE_URL = `http://localhost:3500/api`;

// const axiosInstance = axios.create({ baseURL: BASE_URL });

// // Interceptor to check for 401 errors (token expiration)
// axiosInstance.interceptors.response.use(
//   (response) => response, // if the response is successful, return it
//   async (error) => {
//     const originalRequest = error.config;
//     // Check if the response exists and status is 401 (Unauthorized)
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = getRefreshToken();
//         const accessToken = getAccessToken();

//         // Send the request to refresh the token
//         const response = await axios.get(
//           `${BASE_URL}/authService/auth/GetAccessToken`,
//           {
//             headers: {
//               authorization: `Bearer ${refreshToken}`,
//               "x-access-token": `Bearer ${accessToken}`,
//             },
//           }
//         );

//         if (response.status === 200) {
//           const newAccessToken = response?.headers["x-access-token"];
//           console.log(newAccessToken, response);
//           setAccessToken(newAccessToken);
//           // Set the new access token in the request header and retry the original request
//           originalRequest.headers[
//             "x-access-token"
//           ] = `Bearer ${newAccessToken}`;
//           return axiosInstance(originalRequest); // Retry the request with the new token
//         }
//       } catch (refreshError) {
//         // If the refresh token also fails, redirect to the login page
//         console.error("Refresh token failed:", refreshError);
//         // localStorage.clear();
//          Router.push("/login?lt=1"); // Redirect to login on token refresh failure
//         return Promise.reject(refreshError); // Reject the original promise
//       }
//     }

//     // If the error is not a 401 or other conditions fail, push to login and reject
//     if (error.response && error.response.status === 401) {
//       console.log("Refresh token failed:", error?.response);
//       // localStorage.clear();
//        Router.push("/login?lt=1"); // Redirect to login on token expiration
//     }

//     return Promise.reject(error); // Reject the original error promise
//   }
// );

// export default axiosInstance;
import axios from "axios";
import Router from "next/router";
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
          Router.push("/login?expired=1");
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
        Router.push("/login?expired=1"); // 👈 redirect if refresh fails
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
      Router.push("/login?expired=1");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
