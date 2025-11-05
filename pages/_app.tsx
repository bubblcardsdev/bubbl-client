import type { AppProps } from "next/app";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "@/src/context/userContext";
import { defaultGlobalState } from "@/src/context/defaultGlobalState";
import { reducer } from "@/src/context/reducer";
import { useEffect, useReducer } from "react";
import { CART, PLAN } from "@/src/context/action";
import { getCart } from "@/src/helpers/localStorage";
import { useRouter } from "next/router";
import { getUserPlanService } from "@/src/services/plan";

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
      const accessToken = localStorage.getItem("accessToken");
      const noAuthPaths = [
        "/login",
        "/signup",
        "/forgot-password",
        "/plans",
        "/shop",
        "/cart",
        "/about",
        "/",
      ];
      if (
        !accessToken ||
        noAuthPaths.includes(router.pathname) ||
        router.pathname.startsWith("/profile")
      ) {
        return;
      }
      getUserPlanDetails();
    }
// if (typeof window !== "undefined") {
//   const excludedPaths = ["/", "/login", "/signup", "/home", "/shop", "/plans", "/about"];

//   const isExcludedPath = excludedPaths.includes(router.pathname);
//   // console.log(isExcludedPath, router.pathname, "/ex");
//   if (!isExcludedPath) {
//     getUserPlanDetails();
//   }
// }
  }, []);

  async function getUserPlanDetails() {
    try {
      const currentEtag = state.plan?.etag;
      const response = await getUserPlanService(currentEtag);

      if (response.notModified) {
        console.log(" Plan not modified — using cached data");
        return;
      }

      if (response.success) {
        dispatch({
          type: PLAN,
          payload: {
            data: response.data,
            etag: response.etag,
          },
        });

        console.log("Plan updated in global state:", response.data);
      } else {
        console.warn("Failed to fetch user plan:", response.message);
      }
    } catch (error) {
      console.error("Error fetching user plan:", error);
    }
  }

  return (
    <UserContext.Provider value={value}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
