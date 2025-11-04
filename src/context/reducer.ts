import { CART, PLAN } from "./action";
import { defaultGlobalState } from "./defaultGlobalState";


export const reducer = (state: any = defaultGlobalState, action: any) => {
  switch (action.type) {
    case CART:
        return { ...state, cart: action.payload };
    case PLAN:
      return {...state,planId:action.payload};
    default:
      return state;
  }
};