"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Facebook from '../../assets/icons/homeIcon/facebook_icon';
import Google from '../../assets/icons/homeIcon/google_icon';
import Linkedin from '../../assets/icons/homeIcon/linkedin_icon';
import Bubbl_logo from '../../assets/icons/homeIcon/bubbl_logo';

const LoginPage = () => {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ emailError: "", passwordError: "" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleEmailChange = (e:any) => {
    const email = e.target.value;
    setLoginForm((prevState) => ({ ...prevState, email }));
    setErrors((prevState) => ({
      ...prevState,
      emailError: emailRegex.test(email) ? "" : "Please enter a valid email",
    }));
  };

  const handlePasswordChange = (e:any) => {
    const password = e.target.value;
    setLoginForm((prevState) => ({ ...prevState, password }));
    setErrors((prevState) => ({
      ...prevState,
      passwordError: passwordRegex.test(password)
        ? ""
        : "Password must be at least 8 characters long and include both letters and numbers",
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (!errors.emailError && !errors.passwordError) {
      router.push('/signup');
    }
  };

  return (
    <div className="flex h-screen flex-col md:flex-row overflow-hidden">
      {/* Left Side: Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-black text-white p-4 md:p-8">
        {/* Logo */}
        <div className="w-full flex justify-start sticky top-0 p-2 mb-8">
          <Bubbl_logo />
        </div>

        {/* Form Container */}
        <div className="w-full max-w-xs md:w-[400px] flex-grow flex-col justify-center px-4">
          <h1 className="text-2xl md:text-3xl mb-2 font-bold ">Welcome Aboard!</h1>
          <p className="mb-4 text-[#606060] md:text-[14px] text-sm font-[500] ">Welcome About! Please enter your details.</p>

          <form className="w-full" onSubmit={handleSubmit}>
            <label className="block text-sm md:text-[14px] font-medium text-[#909090]">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={loginForm.email}
              onChange={handleEmailChange}
              className={`w-full p-2 rounded-[10px] mt-[2px] bg-[#262626] text-white focus:outline-none pl-[15px] placeholder:text-[13px] placeholder:text-[#666161] ${errors.emailError ? 'border border-red-500' : ''}`}
            />
            {errors.emailError && <p className="text-red-500 text-[12px] mt-[8px]">{errors.emailError}</p>}

            <label className="block text-sm md:text-[14px] mt-[14px] font-medium text-[#909090]">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={loginForm.password}
              onChange={handlePasswordChange}
              className={`w-full p-2 rounded-[10px] mt-[2px] bg-[#262626]  text-white focus:outline-none pl-[15px] placeholder:text-[13px] placeholder:text-[#666161] ${errors.passwordError ? 'border border-red-500' : ''}`}
            />
            {errors.passwordError && <p className="text-red-500 text-[12px]  mt-[5px]">{errors.passwordError}</p>}

            <a href="/forgot-password" className="text-[#4B2380] text-[14px] mb-4 block  mt-[16px] font-[500]">Forgot password?</a>

            <button
              type="submit"
              className="w-full p-2  bg-[#ac6dfe] text-white text-[14px] rounded-[10px] hover:bg-[#7939CC]focus:outline-none focus:ring-2 focus:ring-purple-500">
              Log in
            </button>

            {/* Social Icons */}
            <div className="flex justify-around mt-[12px] space-x-4">
              <button className="p-2 bg-[#262626] rounded-[5px] h-[40px] w-[110px] flex items-center justify-center">
              <span className="mt-[10px]"><Google /></span>
              </button>
              <button className="p-2 bg-[#262626] rounded-[5px] h-[40px] w-[110px] flex items-center justify-center">
                <Facebook />
              </button>
              <button className="p-2 bg-[#262626] rounded-[5px] h-[40px] w-[110px] flex items-center justify-center">
                <Linkedin />
              </button>
            </div>

            <p className="text-center text-sm font-[500] mt-4  text-[#606060]">
              Don’t have an account? <a href="/signup" className="text-[#4B2380] font-[500] ">Sign up</a>
            </p>
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-between w-full text-gray-500 text-xs mt-auto py-4">
          <p>bubbl 2025</p>
          <a href="mailto:help@bubbl.cards" >help@bubbl.cards</a>
        </div>
      </div>

      {/* Right Side: Image/Graphic */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-800">
        <p className="text-center text-gray-400 text-xs mt-2">powered by bubbl.cards</p>
      </div>
    </div>
  );
};

export default LoginPage;
