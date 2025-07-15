"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface ProtectedAuthProps {
  children: React.ReactNode;
}

interface LoginDetails {
  token?: {
    accessToken?: string;
  };
  user?: {
    name?: string;
    email?: string;
  };
}

const ProtectedAuth: React.FC<ProtectedAuthProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const storedData = localStorage.getItem("loginDetails");

    try {
      const loginDetails: LoginDetails = storedData
        ? JSON.parse(storedData)
        : {};

      const token = loginDetails?.token?.accessToken;

      if (!token) {
        router.push("/login");
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
