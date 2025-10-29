import type { AppProps } from "next/app";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "@/src/context/userContext";
import { defaultGlobalState } from "@/src/context/defaultGlobalState";
import { reducer } from "@/src/context/reducer";
import { useEffect, useReducer } from "react";
import { CART, PLAN_ID } from "@/src/context/action";
import { getCart, getRefreshToken } from "@/src/helpers/localStorage";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
interface JwtPayload {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  planId?: number;
  iat?: number;
  exp?: number;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, defaultGlobalState);
  const value: any = { state, dispatch };
  const router = useRouter();
  useEffect(() => {
    // Load stored cart for all pages except /cart
    if (typeof window !== "undefined" && router.pathname !== "/cart") {
      const storedCart = getCart();
      if (storedCart) {
        const cartData =
          typeof storedCart === "string" ? JSON.parse(storedCart) : storedCart;
        dispatch({ type: CART, payload: cartData });
      }
    }

    // Set planId on /pricings page if refresh token exists
    if (typeof window !== "undefined" && router.pathname === "/pricings") {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const decoded = jwtDecode<JwtPayload>(refreshToken);
          dispatch({
            type: PLAN_ID,
            payload: decoded.planId ?? 1, // default to 1 if missing
          });
          console.log(PLAN_ID, decoded.planId);

        } catch (err) {
          console.error("Failed to decode token:", err);
        }
      }
    }
  }, []);
  return (
    <UserContext.Provider value={value}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
