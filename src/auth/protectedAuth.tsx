"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAccessToken } from "../helpers/localStorage";

interface ProtectedAuthProps {
  children: React.ReactNode;
}



const ProtectedAuth: React.FC<ProtectedAuthProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const token = getAccessToken();

    try {

      if (!token) {
        // router.push("/login");
        setIsAuthorized(true);
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error("Failed to parse loginDetails", error);
      router.push("/login");
    }
  }, [router]);

  if (!isAuthorized) return null; 

  return <>{children}</>;
};

export default ProtectedAuth;
