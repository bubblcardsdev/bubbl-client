const CART = "cartItems";
const DEVICE_ID = "deviceId";
const ACCESSTOKEN = "accessToken";
const REFRESHTOKEN = "refreshToken";
const UserRequestedPath = "reqUrl";

const get = (key: string) => localStorage.getItem(key);
const set = (key: string, value: string) => localStorage.setItem(key, value);
const remove = (key: string) => localStorage.removeItem(key);

const getCart = () => get(CART);
const setCart = (value: string) => set(CART, value);
const clearCart = () => remove(CART);

const getDeviceId = () => get(DEVICE_ID);

const getAccessToken = () => get(ACCESSTOKEN) || "";
const setAccessToken = (token: string) => set(ACCESSTOKEN, token);
const removeAccessToken = () => remove(ACCESSTOKEN);

const getRefreshToken = () => get(REFRESHTOKEN);
const setRefreshToken = (token: string) => set(REFRESHTOKEN, token);
const removeRefreshToken = () => remove(REFRESHTOKEN);

const getReqPath = () => get(UserRequestedPath) || "";
const setReqPath = (url: string) => set(UserRequestedPath, url);
const removeReqPath = () => remove(UserRequestedPath);

export {
  getCart,
  setCart,
  clearCart,
  getDeviceId,
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
  getReqPath,
  setReqPath,
  removeReqPath,
};
