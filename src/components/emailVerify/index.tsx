"use client";
import React, { useMemo, useState, ChangeEvent } from "react";
import { BubblLogo } from "../common/icons";
import Image from "next/image";
import Link from "next/link";
import { LOGIN_IMAGES } from "@/src/lib/constant";
import { EmailverifyOtp, ResendMail } from "@/src/services/emailVerify";
const EmailVerifyPage = () => {

  const [otp, setOtp] = useState<string | null>(null);
  const email: string =  "";
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setOtp(value);
  };

  const RightImageRender = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * LOGIN_IMAGES.length);
    return (
      <Image
        src={LOGIN_IMAGES[randomIndex]}
        alt="Login image"
        fill
        style={{ objectFit: "cover" }}
      />
    );
  }, []);
  return (
    <div className="h-screen bg-black">
      <div className="flex md:flex-row overflow-hidden">
        <div className="flex flex-col justify-between items-center w-full md:w-1/2 bg-black text-white p-4 md:p-8 h-screen">
          <div className="w-full flex justify-start sticky top-0">
            <BubblLogo color="white" />
          </div>
          <div className="w-full max-w-xs md:max-w-[400px] flex-col justify-center lg:px-0">
            <h1 className="text-2xl md:text-3xl mb-[16px] font-bold">
              Enter your OTP
            </h1>
            <p className="mb-4 text-[#606060] md:text-[16px] font-semibold">
              Enter mail ID to Confirm your account.
            </p>
            <form className="w-full">
              <label className="block text-sm md:text-[14px] mt-[20px] font-medium text-[#909090] mb-[6px]">
                OTP
              </label>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Enter OTP"
                className={`w-full p-2 pr-10 rounded-[8px] mt-[2px] bg-[#262626] text-white pl-[4%] placeholder:text-[13px] placeholder:text-[#666161] 
                   {errors.OTPError
                    ? "border border-red-500 focus:outline-none"
                     : "focus:outline focus:outline-1 focus:outline-[#9747FF] focus:outline-offset-0"
                   }
               `}
              />
              <button
                onClick={() => {
                  EmailverifyOtp(email, otp);
                }}
                type="submit"
                className="w-full p-2 mt-[25px] bg-[#9747FF] text-white text-[14px] rounded-[8px] hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Verify
              </button>
            </form>
            <p
            className="mt-4 text-purple-500"
              role="button"
              onClick={() => {
                ResendMail(email);
              }}
            >
              {" "}
              Resend OTP
            </p>
          </div>
          <div className="flex justify-between w-full text-gray-500 text-xs py-0 mx-auto">
            <p className="text-[14px]">© {new Date().getFullYear()} Bubbl</p>
            <Link href="mailto:help@bubbl.cards" className="text-[14px]">
              sales@bubbl.cards
            </Link>
          </div>
        </div>
        {/* Right Side Image */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-white h-screen relative">
          {RightImageRender}
        </div>
      </div>
    </div>
  );
};

export default EmailVerifyPage;
