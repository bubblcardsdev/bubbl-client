// const CART = "cartItems";

// export const getCart = () => {
//   if (typeof window === "undefined") return null;
//   return localStorage.getItem(CART);
// };

// export const setCart = (value: string) => {
//   if (typeof window === "undefined") return;
//   localStorage.setItem(CART, value);
// };

// export const clearCart = () => {
//   if (typeof window === "undefined") return;
//   localStorage.removeItem(CART);
// };

// export const removeFromCart = (id: number) => {
//   const cart = JSON.parse(getCart() || "[]");
//   const updated = cart.filter((item: any) => item.id !== id);
//   setCart(JSON.stringify(updated));
// };

// export const updateCartQuantity = (id: number, quantity: number) => {
//   const cart = JSON.parse(getCart() || "[]");
//   const updated = cart.map((item: any) =>
//     item.id === id ? { ...item, quantity } : item
//   );
//   setCart(JSON.stringify(updated));
// };
