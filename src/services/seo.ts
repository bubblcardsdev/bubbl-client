// utils/seo.ts
export interface ProductType {
  id: string | number;
  name: string;
  price: number | string;
}
export const trackButtonClick = (name: string) => {
  if (typeof window !== "undefined") {
    window.dataLayer.push({
      event: "button_click",
      button_name: name,
    });
  }
};
export const trackFormSubmit = (formName: string) => {
  if (typeof window !== "undefined") {
    window.dataLayer.push({
      event: "form_submit",
      form_name: formName,
    });
  }
};
export const trackAddToCart = (product: ProductType) => {
  if (typeof window !== "undefined") {
    window.dataLayer.push({
      event: "add_to_cart",
      product_id: product?.id,
      product_name: product?.name,
      price: product?.price,
    });
  }
};

export const trackCheckout = (amount: number) => {
  if (typeof window !== "undefined") {
    window.dataLayer.push({
      event: "initiate_checkout",
      total_value: amount,
    });
  }
};

export const trackPurchase = (orderId: string, amount: number) => {
  if (typeof window !== "undefined") {
    window.dataLayer.push({
      event: "purchase",
      order_id: orderId,
      total: amount,
    });
  }
};

export const trackAbandonedCart = (cartItems: any[], cartValue: number) => {
  if (typeof window !== "undefined") {
    window.dataLayer.push({
      event: "abandoned_cart",
      items: cartItems,
      total: cartValue,
    });
  }
};

export const trackThankYouPage = () => {
  if (typeof window !== "undefined") {
    window.dataLayer.push({
      event: "thank_you_page",
    });
  }
};
