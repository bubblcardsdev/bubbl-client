import type { AppProps } from "next/app";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "@/src/context/userContext";
import { defaultGlobalState } from "@/src/context/defaultGlobalState";
import { reducer } from "@/src/context/reducer";
import { useEffect, useReducer } from "react";
import { CART } from "@/src/context/action";
import { getCart } from "@/src/helpers/localStorage";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, defaultGlobalState);
  const value: any = { state, dispatch };
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && router.pathname !== "/cart") {
      const storedCart = getCart();
      if (storedCart) {
        const cartData =
          typeof storedCart === "string" ? JSON.parse(storedCart) : storedCart;
        dispatch({ type: CART, payload: cartData });
      }
    }
  }, []);
  return (
    <UserContext.Provider value={value}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
