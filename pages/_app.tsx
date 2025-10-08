import type { AppProps } from "next/app";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "@/src/context/userContext";
import { defaultGlobalState } from "@/src/context/defaultGlobalState";
import { reducer } from "@/src/context/reducer";
import { useReducer } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, defaultGlobalState);
  const value: any = { state, dispatch };

  return (
    <UserContext.Provider value={value}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
