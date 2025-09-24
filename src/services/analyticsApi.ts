import { getAccessToken } from "../helpers/localStorage";
import axiosInstance from "../helpers/axios";

export const GetPaymentTaps:any = async (filter:any) => {
  try {
    const token = getAccessToken();
    const response = await axiosInstance.put(
      "/analytics/getPaymentTaps",
      filter||{ deviceId: "All", range: "Weekly" }, //  body
      {
        headers: {
          Authorization: token, // header
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Get Payment Taps API Error:", error?.response || error);
  }
};

export const GetSocialTaps: any = async (filter: any) => {
  try {
    const token = getAccessToken();
    const response = await axiosInstance.put(
      "/analytics/getSocialTaps",
      filter || { deviceId: "All", range: "Weekly" }, // ✅ body
      {
        headers: {
          Authorization: token, // ✅ header
        },
      }
    );
    console.log(response.data, "social");
    return response.data;
  } catch (error: any) {
    console.error("Get Social Taps API Error:", error?.response || error);
  }
};

export const GetContactTaps:any = async (filter: any) => {
  try {
    const token = getAccessToken();
    const response = await axiosInstance.put(
      "/analytics/getContactTaps",
     filter|| { deviceId: "All", range: "Weekly" }, // body
      {
        headers: {
          Authorization: token, //  header
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Get Contact Taps API Error:", error?.response || error);
  }
};

export const GetDeviceType:any = async (filter: any) => {
  try {
    const token = getAccessToken();
    const response = await axiosInstance.put(
      "/analytics/getDeviceType",
      filter || { deviceId: "All", range: "Weekly" }, // body
      {
        headers: {
          Authorization: token, // header
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Get Device Type API Error:", error?.response || error);
  }
};
export const GetModeUsageType:any = async (filter: any) => {
  try {
    const token = getAccessToken();
    const response = await axiosInstance.put(
      "/analytics/getModeUsage",
      filter || { deviceId: "All", range: "Weekly" }, // body
      {
        headers: {
          Authorization: token, //  header
        },
      }
    );
    console.log(response.data, "social");
    return response.data;
  } catch (error: any) {
    console.error("Get modeusage Type API Error:", error?.response || error);
  }
};
export const GetTapsData:any = async (range:string) => {
  try {
    const token = getAccessToken();
    const response = await axiosInstance.put(
      "/analytics/getTapsData",
       { deviceId: "All", range: range }, // body
      {
        headers: {
          Authorization: token, //  header
        },
      }
    );
    console.log(response.data, "TapsData");
    return response.data;
  } catch (error: any) {
    console.error("Get TapsData Type API Error:", error?.response || error);
  }
};