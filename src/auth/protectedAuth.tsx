"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAccessToken } from "../helpers/localStorage";
import { safeToast } from "../utils/utils";

interface ProtectedAuthProps {
  children: React.ReactNode;
}



const ProtectedAuth: React.FC<ProtectedAuthProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    if(typeof window !== "undefined"){
      const token = getAccessToken();

    try {

      if (!token) {
        router.push("/login");
        setIsAuthorized(true);
      } else {
        const emailVerified = localStorage.getItem("emailVerified") === "true";
        if (!emailVerified) {
          safeToast.info("Please login again to verify your email");
          router.push("/login");
          setIsAuthorized(false);
        }
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error("Failed to parse loginDetails", error);
      router.push("/login");
    }
    }
  }, [router]);

  if (!isAuthorized) return null; 

  return <>{children}</>;
};

export default ProtectedAuth;
