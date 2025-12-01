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

export const createPlanOrderService = async (
  planId: number,
  planType: "monthly" | "yearly"
) => {
  try {
    // Make API request to create plan order
    const token = getAccessToken();
    const response = await axiosInstance.post("order/createPlanOrder", {
      planId,
      planType,
    },{
        headers: {
          Authorization:token,
        },
      }
  );

    // Backend response
    const data = response.data;

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to create plan order",
        data: data.data || null,
      };
    }

    // Success: return the order details and current user plan
    return {
      success: true,
      message: data.message,
      order: {
        orderId: data.data.orderId,
        razorpayOrderId: data.data.razorpayOrderId,
        amount: data.data.amount,
        currency: data.data.currency,
        key: data.data.key,
      },
      userPlan: data.userPlan, // current plan info from backend
    };
  } catch (error: any) {
    console.error("Error creating plan order:", error);

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong while creating the plan order",
      data: null,
    };
  }
};

export const planFailurePaymentService =  async (
  razorpay_payment_id?: string,
  razorpay_order_id?: string,
  reason?: string
) => {
  try {
    const token = getAccessToken();
   const payload = { razorpay_payment_id, razorpay_order_id, reason };

    const response = await axiosInstance.post(
      "pay/plan/failurePayment",
      payload,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const data = response.data;

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to process payment failure",
        data: null,
      };
    }

    return {
      success: true,
      message: data.message,
      data: data.data || null,
    };
  } catch (error: any) {
    console.error("Error in plan failure payment:", error);

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong while reporting payment failure",
        };
  }
};

export const verifyPlanPaymentService = async (
  razorpay_payment_id: string,
  razorpay_order_id: string,
  razorpay_signature: string
) => {
  try {
    const token = getAccessToken();

    const response = await axiosInstance.post(
      "pay/verifyPlanPayment",
      {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const data = response.data;

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to verify plan payment",
        orderId: null,
      };
    }
    return {
      success: true,
      message: data.message,
      orderId: data.order_id,
      data:data.updatedPlan,
      etag:data.ETag // backend sends this
    };
  } catch (error: any) {
    console.error("Error verifying plan payment:", error);

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong while verifying the payment",
      orderId: null,
    };
  }
};
