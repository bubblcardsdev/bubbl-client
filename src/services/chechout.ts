import { toast } from "react-toastify";
import axiosInstance from "../helpers/axios";
import { getAccessToken } from "../helpers/localStorage";

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
      return true;
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
   await axiosInstance.post(
      "/pay/failurePayment",
      data,
      {
        headers: { Authorization: token },
      }
    );
  } catch (err: any) {
   console.error("Error recording payment failure:", err);
    return false;
  }
};
