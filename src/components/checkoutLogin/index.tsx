import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  LinkedinColorIcon,

} from "../common/icons";
import { loginUser, responseMessage } from "../../services/authLoginApi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface CheckoutLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutLogin: React.FC<CheckoutLoginProps> = ({ onClose, isOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ emailError: "", passwordError: "" });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{8,}$/;
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log("comes here");

    try {
      if (!loginForm.email || !loginForm.password) {
        toast.error("Email or password is empty");
        return;
      }

      const success = await loginUser(loginForm.email, loginForm.password);

      if (success) {
        toast.success("Logged in successfully!");
        router.push("/myprofile");
      }
    } catch (err) {
      console.error("Unexpected error in handleSubmit:", err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
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
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-full h-full ">
      {/* Background blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm h-full w-full flex justify-center items-center"
        onClick={onClose} // click outside to close
      ></div>

      {/* Popup content */}
      <div className="relative bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 z-10">
        <p className="text-center text-2xl font-semibold  mb-6">Sign in</p>
        <p className="text-center text-[14px] font-[500] text-wrap text-[#cac8c8]">Sign in to complete your purchase.</p>
        <p className="text-center text-[14px] font-[500] text-wrap text-[#cac8c8]">Please enter your details.</p>
        {/* Close button */}
        {/* <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button> */}
        <form className="w-full" onSubmit={handleSubmit}>
          <p></p>
          <label className="block text-sm font-medium mb-[6px] text-[#909090]">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={loginForm.email}
            onChange={handleEmailChange}
            className={`w-full p-2 rounded-[8px] bg-[#F1F1F1] text-black pl-[4%] placeholder:text-[13px] placeholder:text-[#B2B2B2] outline-none `}
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
              className={`w-full p-2 pr-10 rounded-[8px] mt-[2px] bg-[#F1F1F1] text-black pl-[4%] placeholder:text-[13px] placeholder:text-[#B2B2B2] border-none outline-none `}
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

          <a
            href="/forgot-password"
            className="text-[#9747FF] text-[14px] mb-[20px] block mt-[20px] font-[500]"
          >
            Forgot password?
          </a>

          <button
            type="submit"
            // disabled={loading}
            className="w-full p-2 bg-[#9747FF] text-white text-[14px] rounded-[8px] hover:bg-purple-500 disabled:opacity-60"
          >
            {/* {loading ? "Logging in..." : "Log in"} */}
            Login in
          </button>

          {/* Social Login Icons */}
          <div className="flex justify-around mt-[16px] space-x-4">
            <GoogleOAuthProvider clientId="381109639208-5a8i0egsdut082f395brann2n340lbpe.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={(response) => responseMessage(response, router)}
                onError={() => console.log("Login Failed")}
              />
            </GoogleOAuthProvider>
            <a href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78oczkl0lo3jqj&redirect_uri=${encodeURIComponent('http://localhost:3000/linkedin-callback')}&scope=profile%20email%20openid`} className="p-2 bg-[#F1F1F1] rounded-[5px] h-[40px] w-[110px] flex items-center justify-center">
              <LinkedinColorIcon />
            </a>
          </div>

          <p className="text-center text-sm font-[500] mt-4 text-[#606060]">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-[#9747FF] font-[500] cursor-pointer"
            >
              Sign up
            </a>
          </p>
        </form>
      </div >
    </div >
  );
};

export default CheckoutLogin;
