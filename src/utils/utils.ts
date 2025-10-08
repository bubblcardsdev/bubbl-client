import axios from "axios";
import { getAccessToken } from "../helpers/localStorage";
import { toast } from "react-toastify";

export function getApiErrorMessage(error: unknown, fallback = "Something went wrong") {
  if (axios.isAxiosError(error)) {
    const res = error.response as any;
    // Try the common shapes first, then fall back
    return (
      res?.data?.data?.message ||
      res?.data?.message ||
      res?.data?.error?.message ||
      error.message ||
      fallback
    );
  }
  // Non-axios errors
  if (error && typeof error === "object" && "message" in (error as any)) {
    return (error as any).message || fallback;
  }
  return fallback;
}

export function authHeader() {
  const token = getAccessToken();
  return { Authorization: token };
}

export const safeToast = {
  success: (message: string) => {
    if (typeof window !== "undefined") {
      toast.success(message);
    } else {
      console.log("[toast:success]", message);
    }
  },

  error: (message: string) => {
    if (typeof window !== "undefined") {
      toast.error(message);
    } else {
      console.error("[toast:error]", message);
    }
  },

  warning: (message: string) => {
    if (typeof window !== "undefined") {
      toast.warning(message);
    } else {
      console.warn("[toast:warning]", message);
    }
  },

  info: (message: string) => {
    if (typeof window !== "undefined") {
      toast.info(message);
    } else {
      console.log("[toast:info]", message);
    }
  },
};