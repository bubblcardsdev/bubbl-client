import { createContext } from "react";
import { defaultGlobalState } from "./defaultGlobalState";

export const UserContext = createContext(defaultGlobalState)