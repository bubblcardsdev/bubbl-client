import axiosInstance from "../helpers/axios";
export const fetchProductDetails = async (productId: string) => {
  try {
    const response = await axiosInstance.post(`/api/cart/productDetails`, {
      productId,
    });
    return response.data?.data;
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    throw error;
  }
};