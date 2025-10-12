import { getAccessToken } from "../helpers/localStorage";
import axiosInstance from "../helpers/axios";
import { toast } from "react-toastify";
import { getApiErrorMessage, safeToast } from "../utils/utils";

export interface LeadFormData {
  id: number;
  name: string;
  emailId: string;
  mobileNumber: number;
  location: string;
  where_you_met: string;
  company: string;
}

export const CreateLeadApi = async (formData: LeadFormData) => {
  try {
    const token = getAccessToken();
    console.log(token, "token");
    const response = await axiosInstance.post(
      `/analytics/createLead`,
      formData,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response.data, "res");
    return response;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to create lead.");
    return false;
  }
};
export const GetAllLeadsByIdData = async () => {
  try {
    const token = getAccessToken(); // get token from storage

    const response = await axiosInstance.get("analytics/getLeadsById", {
      headers: {
        Authorization: token, //  add Bearer prefix
      },
    });

    console.log("Leads API Response:", response.data);

    //  handle API success/failure
    if (response.data?.success) {
      return response.data; // contains your leads
    } else {
      toast.error(response.data?.message || "Failed to fetch leads");
      return null;
    }
  } catch (error: any) {
    console.error("Error fetching leads:", error?.response?.data || error);
    toast.error(error?.response?.data?.message || "Failed to fetch leads");
    return null;
  }
};
export const UpdateLead = async (payload: LeadFormData) => {
  try {
    console.log(payload, "pay");
    const token = getAccessToken();

    const response = await axiosInstance.post(
      `/analytics/updateLead`, // pass leadId in query
      payload,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Update Lead API Error:", error?.response || error);
    throw error;
  }
};

export const DeleteLead = async (id: string | number) => {
  try {
    const token = getAccessToken();

    const response = await axiosInstance.delete(
      `analytics/deleteLead?leadId=${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.data.success) {
      safeToast.success("Lead deleted successfully");
      return response.data;
    }
    safeToast.error(response?.data?.message || "Failed to delete lead");
    return null;
  } catch (error: any) {
    const message = getApiErrorMessage(error);

    // Client-side toast, server-side log
    safeToast.error(message);
    console.error("Error deleting lead:", error);
    return null;
  }
};

export const GetOverViewData = async () => {
  try {
    const token = getAccessToken(); // get token from storage

    const response = await axiosInstance.get("analytics/getOverView", {
      headers: {
        Authorization: token, //  add Bearer prefix
      },
    });

    console.log("overview API Response:", response.data);

    //  handle API success/failure
    if (response.data?.success) {
      return response.data; // contains your leads
    } else {
      toast.error(response.data?.message || "Failed to fetch overview");
      return null;
    }
  } catch (error: any) {
    console.error("Error fetching overview:", error?.response?.data || error);
    toast.error(error?.response?.data?.message || "Failed to fetch overview");
    return null;
  }
};
