import { toast } from "react-toastify";
import axiosInstance from "../helpers/axios";
import { getAccessToken } from "../helpers/localStorage";
import { safeToast } from "../utils/utils";
import axios from "axios";

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailId: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}

export const CheckoutApi = async (data: {
  productData: { productId: string; quantity: number }[];
  shippingFormData: CheckoutFormData;
}) => {
  try {
    const response = await axiosInstance.post(`/order/checkout`, data);
    if (response?.data?.success) {
      return response?.data?.orderId;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const createOrder = async (data: {
  productData: { productId: string; quantity: number }[];
  shippingFormData: CheckoutFormData;
  promoCode?: string;
}) => {
  try {
    const token = getAccessToken();

    const response = await axiosInstance.post("/order/createOrder", data, {
      headers: {
        Authorization: token,
      },
    });
    return response?.data?.data;
  } catch (err: any) {
    console.error(err);
    toast(
      err?.response?.data?.message ||
        err?.message ||
        "Something went wrong, try again later"
    );
    return undefined; // ensure function always returns the expected type
  }
};

export const initiatePayment = async (data: {
  orderId: number;
  orderType: number;
  token: string;
}) => {
  try {
    const response = await axiosInstance.post(`/pay/initialePay`, data);
    if (response?.data?.success) {
      return response?.data?.data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const applyPromoCode = async (
  data: {
    promoCode: string;
    productData: { productId: string; quantity: number }[];
  },
  toast: boolean = true
) => {
  try {
    const token = getAccessToken();
    const response = await axiosInstance.post("/order/applyPromo", data, {
      headers: {
        Authorization: token,
      },
    });
    if (!response?.data?.success) {
      if (toast) {
        safeToast.error(response?.data?.message || "Something went wrong");
      }
      return null;
    }
    if (toast) {
      safeToast.success("Promo code applied successfully");
    }
    return response?.data?.data;
  } catch (error) {
    const errMsg = axios.isAxiosError(error)
      ? error.response?.data?.data?.message ||
        error.response?.data?.message ||
        error.message
      : "Something went wrong";

    if (toast) {
      safeToast.error(errMsg);
    }
    return null;
  }
};

export const verifyPayment = async (
  razorpay_payment_id: string,
  razorpay_order_id: string,
  razorpay_signature: string
) => {
  const data = { razorpay_payment_id, razorpay_order_id, razorpay_signature };
  const token = getAccessToken();

  try {
    const { data: responseData } = await axiosInstance.post(
      "/pay/verifyPayment",
      data,
      {
        headers: { Authorization: token },
      }
    );

    if (responseData?.success) {
      return { success: true, order_id: responseData?.order_id };
    } else {
      toast.error(responseData?.message || "Payment verification failed");
      return false;
    }
  } catch (err: any) {
    const message =
      err?.response?.data?.message || err?.message || "Something went wrong";
    toast.error(message);
    console.error("Error verifying payment:", err);
    return false;
  }
};

export const recordPaymentFailure = async (
  razorpay_payment_id?: string,
  razorpay_order_id?: string,
  reason?: string
) => {
  const data = { razorpay_payment_id, razorpay_order_id, reason };
  const token = getAccessToken();

  try {
    await axiosInstance.post("/pay/failurePayment", data, {
      headers: { Authorization: token },
    });
  } catch (err: any) {
    console.error("Error recording payment failure:", err);
    return false;
  }
};

export const getOrderDetailsService = async (orderId: number) => {
  const token = getAccessToken();

  try {
    const response = await axiosInstance.post(
      "/order/one",
      { orderId },
      {
        headers: {
          Authorization: token, // include 'Bearer' if your API expects it
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (err: any) {
    console.error(
      "Error fetching order details:",
      err.response?.data || err.message
    );
    toast.error(err.response?.data?.message || "Something went wrong");
  }
};
