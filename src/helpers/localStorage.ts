const CART = "cartItems";
const DEVICE_ID = "deviceId";
const ACCESSTOKEN = "accesstoken";
const REFRESHTOKEN = "refreshtoken";
const get = (key: string) => localStorage.getItem(key);
const set = (key: string, value: string) => localStorage.setItem(key, value);
const remove = (key: string) => localStorage.removeItem(key);

const getCart = () => get(CART);
const setCart = (value: string) => set(CART, value);
const clearCart = () => remove(CART);

const getDeviceId = () => get(DEVICE_ID);

export const getAccessToken = () => get(ACCESSTOKEN) || "";
export const setAccessToken = (token: string) => set(ACCESSTOKEN, token);
export const removeAccessToken = () => remove(ACCESSTOKEN);

export const getRefreshToken = () => get(REFRESHTOKEN);
export const setRefreshToken = (token: string) => set(REFRESHTOKEN, token);
export const removeRefreshToken = () => remove(REFRESHTOKEN);

export { getCart, setCart, clearCart, getDeviceId };
