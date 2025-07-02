import axiosInstance from "../helpers/axios";

export const CheckoutApi = async (checkoutFormData: any) => {
  const data = {
    productData: [
      {
        productId: "58491944-912b-49fe-b6e6-dfee1b78a3d6",
        quantity: 2,
      },
    ],
    shippingFormData: {
      firstName: checkoutFormData?.firstName,
      lastName: checkoutFormData?.lastName,
      phoneNumber: checkoutFormData?.phoneNumber,
      emailId: checkoutFormData?.emailId,
      address: checkoutFormData?.address,
      city: checkoutFormData?.city,
      state: checkoutFormData?.state,
      zipcode: checkoutFormData?.zipcode,
      country: checkoutFormData?.country,
    },
  };
  try {
    const response = await axiosInstance.post(`/order/checkout`, data);
    console.log(response, "res");
    return response?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
