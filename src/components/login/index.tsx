"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  FacebookColorIcon,
  LinkedinColorIcon,
  BubblLogo,
} from "../common/icons";
import Image from "next/image";
import Link from "next/link";
import { LOGIN_IMAGES } from "@/src/lib/constant";
import { loginUser } from "../../services/authLoginApi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginPage = () => {
  const router = useRouter();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ emailError: "", passwordError: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{8,}$/;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setLoginForm((prevState) => ({ ...prevState, email }));
    setErrors((prevState) => ({
      ...prevState,
      emailError: emailRegex.test(email) ? "" : "Please enter a valid email",
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setLoginForm((prevState) => ({ ...prevState, password }));
    setErrors((prevState) => ({
      ...prevState,
      passwordError: passwordRegex.test(password)
        ? ""
        : "Password must be at least 8 characters long and include both letters and numbers",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!errors.emailError && !errors.passwordError) {
      setLoading(true);
      try {
        const res = await loginUser(loginForm.email, loginForm.password);
        console.log(res, "res");
        if (res?.success) {
          localStorage.setItem("loginDetails", JSON.stringify(res.data));
          toast.success("Login  successfully!");

          setTimeout(() => router.push("/overview"), 1500);
        } else {
          console.error(res?.data?.message);
        }
      } catch (err) {
        console.error("Login Error", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const RightImageRender = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * 8);
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
              Welcome Aboard!
            </h1>
            <p className="mb-4 text-[#606060] md:text-[16px] font-semibold">
              Please enter your details.
            </p>
            <form className="w-full" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium mb-[6px] text-[#909090]">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={loginForm.email}
                onChange={handleEmailChange}
                className={`w-full p-2 rounded-[8px] bg-[#262626] text-white pl-[4%] placeholder:text-[13px] placeholder:text-[#666161] outline-none ${
                  errors.emailError
                    ? "border border-red-500"
                    : "focus:outline focus:outline-1 focus:outline-[#9747FF]"
                }`}
              />
              {errors.emailError && (
                <p className="text-red-500 text-[12px] mt-[8px]">
                  {errors.emailError}
                </p>
              )}

              <label className="block text-sm md:text-[14px] mt-[20px] font-medium text-[#909090] mb-[6px]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={loginForm.password}
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

              <Link
                href="/forgot-password"
                className="text-[#9747FF] text-[14px] mb-[20px] block mt-[20px] font-[500]"
              >
                Forgot password?
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="w-full p-2 bg-[#9747FF] text-white text-[14px] rounded-[8px] hover:bg-purple-500 disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>

              {/* Social Login Icons */}
              <div className="flex justify-around mt-[16px] space-x-4">
                <button className="py-2 px-0 bg-[#262626] rounded-[5px] h-[40px] w-[110px] flex items-center justify-center">
                  <Image
                    src="/images/googleLogo.png"
                    height={24}
                    width={23}
                    alt="google"
                  />
                </button>
                <button className="p-2 bg-[#262626] rounded-[5px] h-[40px] w-[110px] flex items-center justify-center">
                  <FacebookColorIcon />
                </button>
                <button className="p-2 bg-[#262626] rounded-[5px] h-[40px] w-[110px] flex items-center justify-center">
                  <LinkedinColorIcon />
                </button>
              </div>

              <p className="text-center text-sm font-[500] mt-4 text-[#606060]">
                Don’t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-[#9747FF] font-[500] cursor-pointer"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>

          <div className="flex justify-between w-full text-gray-500 text-xs py-0 mx-auto">
            <p className="text-[14px]">© {new Date().getFullYear()} Bubbl</p>
            <Link href="mailto:sales@bubbl.cards" className="text-[14px]">
              sales@bubbl.cards
            </Link>
          </div>
        </div>

        <div className="hidden md:flex w-1/2 items-center justify-center bg-white h-screen relative">
          {RightImageRender}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
