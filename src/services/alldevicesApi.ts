
import axiosInstance from "../helpers/axios";
export const fetchAllDevices = async () => {
  try {
    const response = await axiosInstance.get(`/cart/alldevices`);
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching data:", error);

  }
};
