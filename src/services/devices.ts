import axiosInstance from "../helpers/axios";
import { authHeader, getApiErrorMessage, safeToast } from "../utils/utils";

interface SwitchProfileRequest {
  accountDeviceLinkId: number | null;
  profileId: number | null;
}

interface SwitchModeRequest{
  deviceLinkId: number | null
  accountDeviceLinkId: number | null
  modeId: number | null
  modeUrl: string | null
}

export const getLinkedDevices = async () => {
  try {
    const response = await axiosInstance.get("/device/all", {
      headers: authHeader(),
    });

    if (!response?.data?.success) {
      // Backend responded but not successful
      safeToast.warning("No linked devices found.");
      console.warn("[getLinkedDevices] No linked devices found.");
      return null;
    }

    return response?.data?.data || null;
  } catch (error: any) {
    const message = getApiErrorMessage(error);

    // Client-side toast, server-side log
    safeToast.error(message);
    console.error("[getLinkedDevices] Server error:", message);

    return null; // Always return a safe fallback
  }
};

export const switchProfile = async (data: SwitchProfileRequest) => {
  try {
    const response = await axiosInstance.post("/device/switchProfile", data, {
      headers: authHeader(),
    });

    if (!response?.data?.success) {
      // Backend responded but not successful
      safeToast.warning("Something went wrong");
      console.warn("[switchProfile] Something went wrong");
      return false;
    }

    return response?.data?.success || false;
  } catch (error: any) {
    const message = getApiErrorMessage(error);

    // Client-side toast, server-side log
    safeToast.error(message);
    console.error("[switchProfile] Server error:", message);

    return false; // Always return a safe fallback
  }
};

export const switchMode = async (data: SwitchModeRequest) => {
  try {
    const response = await axiosInstance.post("/device/switchMode", data, {
      headers: authHeader(),
    });

    if (!response?.data?.success) {
      // Backend responded but not successful
      safeToast.warning("Something went wrong");
      console.warn("[switchMode] Something went wrong");
      return false;
    }

    return response?.data?.success || false;
  } catch (error: any) {
    const message = getApiErrorMessage(error);

    // Client-side toast, server-side log
    safeToast.error(message);
    console.error("[switchMode] Server error:", message);

    return false; // Always return a safe fallback
  }
};