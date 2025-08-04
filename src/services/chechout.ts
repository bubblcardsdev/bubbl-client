import axiosInstance from "../helpers/axios";

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
    if(response?.data?.success) {
      return response?.data?.orderId;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const initiatePayment = async (data: { orderId: number, orderType: number, token: string }) => {
  try {
    const response = await axiosInstance.post(`/pay/initialePay`, data);
    if(response?.data?.success) {
      return response?.data?.data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};