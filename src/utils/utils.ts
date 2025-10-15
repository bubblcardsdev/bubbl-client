import axios from "axios";
import { getAccessToken } from "../helpers/localStorage";
import { toast } from "react-toastify";


const friendlyFieldNames: Record<string, string> = {
  phoneNumber: "Phone number",
  emailId: "Email address",
  profileName: "Profile name",
  firstName: "First name",
  lastName: "Last name",
  // add more as needed
};

export function getApiErrorMessage(error: unknown, fallback = "Something went wrong") {
  console.log(error, "err");

  let message = fallback;

  if (axios.isAxiosError(error)) {
    const res = error.response as any;
    const rawMessage: string = res?.data?.message || error.message || fallback;

    // Regex to find something like "phoneNumbers[0].phoneNumber"
    const regex = /"([a-zA-Z0-9\[\]\.]+)"/g;

    message = rawMessage.replace(regex, (match, p1) => {
      // Get the last part after the dot
      const parts = p1.split(".");
      const key = parts[parts.length - 1];
      return friendlyFieldNames[key] || key;
    });
  } else if (error && typeof error === "object" && "message" in (error as any)) {
    message = (error as any).message || fallback;
  }

  return message;
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

export const getToken = async() => {
  try{
    return await getAccessToken();
  }catch(err){
    console.log(err)
  }
}
