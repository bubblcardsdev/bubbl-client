import axiosInstance from "../helpers/axios";
import { getAccessToken } from "../helpers/localStorage";


export const getUserPlanService = async (etag?: string) => {
  try {
    const token = getAccessToken();

    const headers: Record<string, string> = {
      Authorization: token,
    };

    // If we already have an ETag, send it in the request to use conditional GET
    if (etag) {
      headers["If-None-Match"] = etag;
    }

    const response = await axiosInstance.get("/plan/user", { headers });

    // If the server returns 304 (Not Modified), skip parsing data
    if (response.status === 304) {
      return {
        success: true,
        notModified: true,
        message: "Data not modified",
      };
    }

    // Otherwise, return the latest plan and ETag
    return {
      success: true,
      notModified: false,
      data: response.data.plan,
      etag: response.data.ETag,
    };
  } catch (error: any) {
    console.error("Error fetching user plan:", error);

    // Graceful error handling
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch user plan",
      status: error.response?.status,
    };
  }
};