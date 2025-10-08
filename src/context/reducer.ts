import { CART } from "./action";
import { defaultGlobalState } from "./defaultGlobalState";


export const reducer = (state: any = defaultGlobalState, action: any) => {
  switch (action.type) {
    case CART:
        return { ...state, cart: action.payload };
    default:
      return state;
  }
};