"use client";
import React, { useMemo, useState } from "react";
import { BubblLogo } from "../common/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { LOGIN_IMAGES } from "@/src/lib/constant";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { changePassword } from "@/src/services/authLoginApi";

const ForgetPassword = () => {
  const router = useRouter();
  const { token } = router.query;

  const [forgetPasswordForm, setForgetPasswordForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    passwordError: "",
    confirmPasswordError: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{8,}$/;

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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;

    setForgetPasswordForm((prev) => ({ ...prev, password }));

    setErrors((prev) => ({
      ...prev,
      passwordError: passwordRegex.test(password)
        ? ""
        : "Password must be at least 8 characters long, include letters, numbers, and symbols",
      confirmPasswordError:
        forgetPasswordForm.confirmPassword === password
          ? ""
          : prev.confirmPasswordError,
    }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPassword = e.target.value;

    setForgetPasswordForm((prev) => ({ ...prev, confirmPassword }));

    setErrors((prev) => ({
      ...prev,
      confirmPasswordError:
        confirmPassword === forgetPasswordForm.password
          ? ""
          : "Passwords do not match",
    }));
  };

  // ✅ Enable button only if password is valid & matches confirmPassword
  const isFormValid =
    passwordRegex.test(forgetPasswordForm.password) &&
    forgetPasswordForm.password === forgetPasswordForm.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }

    const response = await changePassword(
      token as string,
      forgetPasswordForm.password
    );

    if (response) {
      router.push("/login");
    }
  };

  return (
    <div className="h-screen bg-black">
      <div className="flex md:flex-row overflow-hidden">
        {/* Left Side */}
        <div className="flex flex-col justify-between items-center w-full md:w-1/2 bg-black text-white p-4 md:p-8 h-screen">
          <div className="w-full flex justify-start sticky top-0">
            <BubblLogo color="white" />
          </div>

          <div className="w-full max-w-xs md:max-w-[400px] flex-col justify-center lg:px-0">
            <h1 className="text-2xl md:text-3xl mb-[16px] font-bold">
              Create New Password
            </h1>
            <p className="mb-4 text-[#606060] md:text-[16px] font-semibold">
              Your new password must be different from previously used passwords.
            </p>

            <form className="w-full" onSubmit={handleSubmit}>
              {/* Password */}
              <label className="block text-sm md:text-[14px] mt-[20px] font-medium text-[#909090] mb-[6px]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={forgetPasswordForm.password}
                  onChange={handlePasswordChange}
                  className={`w-full p-2 pr-10 rounded-[8px] mt-[2px] bg-[#262626] text-white pl-[4%] placeholder:text-[13px] placeholder:text-[#666161] ${
                    errors.passwordError
                      ? "border border-red-500 focus:outline-none"
                      : "focus:outline focus:outline-1 focus:outline-[#9747FF] focus:outline-offset-0"
                  }`}
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              {errors.passwordError && (
                <p className="text-red-500 text-[12px] mt-[5px]">
                  {errors.passwordError}
                </p>
              )}

              {/* Confirm Password */}
              <label className="block text-sm md:text-[14px] mt-[20px] font-medium text-[#909090] mb-[6px]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={forgetPasswordForm.confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={`w-full p-2 pr-10 rounded-[8px] mt-[2px] bg-[#262626] text-white pl-[4%] placeholder:text-[13px] placeholder:text-[#666161] ${
                    errors.confirmPasswordError
                      ? "border border-red-500 focus:outline-none"
                      : "focus:outline focus:outline-1 focus:outline-[#9747FF] focus:outline-offset-0"
                  }`}
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </div>
              {errors.confirmPasswordError && (
                <p className="text-red-500 text-[12px] mt-[5px]">
                  {errors.confirmPasswordError}
                </p>
              )}

              {/* ✅ Disabled button when form invalid */}
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full p-2 mt-[50px] text-[14px] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                  isFormValid
                    ? "bg-[#9747FF] hover:bg-purple-500 text-white"
                    : "bg-gray-600 cursor-not-allowed text-gray-300"
                }`}
              >
                Reset Password
              </button>
            </form>
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

export default ForgetPassword;



