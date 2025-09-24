"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";

export default function LinkedinHandler() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      console.error("No LinkedIn auth code in URL");
      return;
    }

    const verifyLinkedinUser = async () => {
      try {
        const linkedinResp = await axios.post(
          "http://localhost:8000/api/verifylinkedinuserlatest",
          { authorizationCode: code }
        );

        console.log("Backend LinkedIn response:", linkedinResp.data);

        localStorage.setItem(
          "accessToken",
          linkedinResp.data?.token?.accessToken
        );
        localStorage.setItem(
          "refreshToken",
          linkedinResp.data?.token?.refreshToken
        );

        router.push("/myprofile");
      } catch (err: any) {
        console.error("LinkedIn login error:", err);
        const axiosError = err as AxiosError;

        if (axiosError.response?.status === 404) {
          localStorage.setItem("oauth", "true");
          localStorage.setItem("type", "linkedin");
          router.push("/signup");
        }
      }
    };

    verifyLinkedinUser();
  }, [router]);

  return <p>Verifying LinkedIn login…</p>;
}
