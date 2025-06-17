"use client";
import React, { useMemo, useState } from "react";
import { BubblLogo } from "../common/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { LOGIN_IMAGES } from "@/src/lib/constant";
const ForgetPassword = () => {
  const router = useRouter();
  const [forgetPasswordForm, setForgetPasswordForm] = useState({
    confirmPassword: "",
    password: "",
  });
  const [errors, setErrors] = useState({ confirmPasswordError: "", passwordError: "" });
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const RightImageRender = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * 8);
    console.log(randomIndex);
    return (
      <Image
        src={LOGIN_IMAGES[randomIndex]}
        alt="Login image"
        fill
        style={{ objectFit: "cover" }}
      />
    );
  }, []);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!errors.confirmPasswordError && !errors.passwordError) {
      router.push("/");
    }
  };
  const handlePasswordChange = (e: any) => {
    const{ password,forgetPassword }= e.target.value;
    setForgetPasswordForm((prevState) => ({ ...prevState, password }));
    setErrors((prevState) => ({
      ...prevState,
      passwordError: passwordRegex.test(password)
        ? ""
        : "Password must be at least 8 characters long and include both letters and numbers",
    }));
  };
  return (
    <div className="h-screen bg-black">
      <div className="flex  md:flex-row overflow-hidden">
        <div className="flex flex-col justify-between items-center w-full md:w-1/2 bg-black text-white p-4 md:p-8 h-screen">
          <div className="w-full flex justify-start sticky top-0">
            <BubblLogo color="white" />
          </div>
          <div className="w-full max-w-xs md:max-w-[400px] flex-col justify-center lg:px-0">
            <h1 className="text-2xl md:text-3xl mb-[16px] font-bold  ">
              Create New Password
            </h1>
            <p className="mb-4 text-[#606060] md:text-[16px] font-semibold ">
              Your New password must be different from previous used passwords.{" "}
            </p>
            <form className="w-full" onSubmit={handleSubmit}>
              <label className="block text-sm md:text-[14px] mt-[20px] font-medium text-[#909090] mb-[6px]">
                ConformPassword
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={forgetPasswordForm.confirmPassword}
                onChange={handlePasswordChange}
                className={`w-full p-2 rounded-[8px] mt-[2px] bg-[#262626] text-white pl-[4%] placeholder:text-[13px] placeholder:text-[#666161] ${
                  errors.passwordError
                    ? "border border-red-500 focus:outline-none"
                    : "focus:outline focus:outline-1 focus:outline-[#9747FF] focus:outline-offset-0"
                }`}
              />
              {errors.passwordError && (
                <p className="text-red-500 text-[12px]  mt-[5px]">
                  {errors.passwordError}
                </p>
              )}
              <label className="block text-sm md:text-[14px] mt-[20px] font-medium text-[#909090] mb-[6px]">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={forgetPasswordForm.password}
                onChange={handlePasswordChange}
                className={`w-full p-2 rounded-[8px] mt-[2px] bg-[#262626] text-white pl-[4%] placeholder:text-[13px] placeholder:text-[#666161] ${
                  errors.passwordError
                    ? "border border-red-500 focus:outline-none"
                    : "focus:outline focus:outline-1 focus:outline-[#9747FF] focus:outline-offset-0"
                }`}
              />
              {errors.passwordError && (
                <p className="text-red-500 text-[12px]  mt-[5px]">
                  {errors.passwordError}
                </p>
              )}
              <button
                type="submit"
                className="w-full p-2 mt-[50px] bg-[#9747FF] text-white text-[14px] rounded-[8px] hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Reset Password
              </button>
            </form>
          </div>
          <div className="flex justify-between w-full text-gray-500 text-xs py-0 mx-auto">
            <p className="text-[14px]">© {new Date().getFullYear()} Bubbl</p>
            <a href="mailto:help@bubbl.cards" className="text-[14px]">
              sales@bubbl.cards
            </a>
          </div>
        </div>
        <div className="hidden md:flex w-1/2 items-center justify-center bg-white  h-screen relative">
          {RightImageRender}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
