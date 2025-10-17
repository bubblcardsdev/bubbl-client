"use client";
import Image from "next/image";
import Link from "next/link";
import {
  BubblLogo,
  Share_icon,
  ScannerQr_icon,
  Arrow_icon,
} from "../common/icons";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import { stepSchemas } from "@/src/validators/auth";
import { FormDataType } from "@/src/lib/interface";
import { SIGNUP_STEPS } from "@/src/lib/constant";
import { OauthRegisterApi, RegisterApi } from "@/src/services/authLoginApi";

const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<any>({});
  type FormData = Record<string, string>;

  const [isOauth, setIsOauth] = useState<boolean>(false);
  const [oAuthType, setOauthType] = useState<string>("local");

  useEffect(() => {
    console.log(oAuthType);

    const oauth = localStorage.getItem("oauth");
    const oauthType = localStorage.getItem("type");

    if (oauth === "true" && typeof oauthType === "string") {
      setIsOauth(true);
      setOauthType(oauthType);
    }

    return () => {
      // Clear only what you set
      localStorage.removeItem("oauth");
      localStorage.removeItem("type");
    };
  }, []);
  // const [isOauth,setIsOauth] = useState<boolean>(false)

  const stepFields: Record<number, (keyof FormData)[]> = {
    1: ["name"],
    2: ["role", "companyName"],
    3: ["email"],
    4: ["password", "confirmPassword"],
  };
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    role: "",
    companyName: "",
    mobile: "",
    email: "",
    confirmPassword: "",
    password: "",
  });

  const getStepFormData = (step: number): Partial<FormDataType> => {
    const fields = stepFields[step] as (keyof FormDataType)[];
    return fields.reduce((acc, key) => {
      acc[key] = formData[key];
      return acc;
    }, {} as Partial<FormDataType>);
  };

  const validateFields = (step: number): boolean => {
    const stepForm = getStepFormData(step);
    const schema = stepSchemas[step];

    const { error } = schema.validate(stepForm, { abortEarly: false });
    console.log(error);
    if (!error) return true;

    const newErrors: Record<string, string> = {};
    error.details.forEach((item: any) => {
      newErrors[item.path[0]] = item.message;
    });
    setErrors(newErrors);
    return false;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields(step)) {
      try {
        if (!isOauth) {
          const response = await RegisterApi(formData);
          if (response) {
            // const isOtpSent = await ResendMail(formData.email);
            router.push({
              pathname: "/emailVerify",
              query: { email: formData.email, otpStatus: true },
            });
          }
        } else {
          const response = await OauthRegisterApi(formData, oAuthType);
          if (response) {
            toast.success("User created successfully");
            router.push("/login");
          }
        }
        //  await RegisterCreateProfile(formData);
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong.");
      }
    }
  };

  const handleStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields(step)) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <div className="w-full flex min-h-screen flex-col md:flex-row  overflow-x-hidden ">
      <ToastContainer />
      <div className="flex flex-col justify-between items-center w-full md:w-1/2 bg-black text-white p-4 md:p-8 h-screen">
        <div className="w-full flex justify-start sticky top-0 p-2 mb-8">
          <BubblLogo color="white" />
        </div>
        <div className="w-full max-w-xs md:w-[400px] flex-grow mt-[50px] flex-col justify-center px-4">
          <div className="flex justify-start space-x-2 mb-8">
            {[1, 2, 3, 4].map((item, key: number) => (
              <div
                onClick={() => {
                  if (item <= step) {
                    setStep(item);
                  }
                }}
                key={key}
                className="w-[70px] h-[5px] rounded-[25px] bg-[#262626] flex cursor-pointer"
              >
                <div
                  style={{
                    background: "#7939CC",
                    height: "100%",
                    borderRadius: "25px",
                    width: `${step > item ? 100 : step == item ? 30 : 0}%`,
                  }}
                ></div>
              </div>
            ))}
          </div>
          <div className="text-start mb-2">
            {
              <>
                <h1 className="text-2xl font-bold  ">
                  {SIGNUP_STEPS[step - 1]?.title}
                </h1>
                <p className="text-[#606060] text-sm font-[500]  mt-[10px] leading-[1.3]">
                  {SIGNUP_STEPS[step - 1].subtitle}
                </p>
              </>
            }
          </div>
          <form className="w-full max-w-xs">
            {step === 1 && (
              <div className="mb-6 mt-[30px]">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#909090] mb-2 "
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-2 rounded-[8px] mt-[2px] bg-[#262626] text-white pl-[4%] placeholder:text-[13px] placeholder:text-[#666161] ${
                    errors?.name
                      ? "border border-red-500 focus:outline-none"
                      : "focus:outline focus:outline-1 focus:outline-[#9747FF] focus:outline-offset-0"
                  }`}
                  placeholder="Enter your name"
                />
                {errors?.name && (
                  <p className="text-red-500 text-sm  mt-1">{errors?.name}</p>
                )}
              </div>
            )}
            {step === 2 && (
              <>
                <div className="mb-6 mt-[20px]">
                  <label
                    htmlFor="role"
                    className="ck text-sm font-medium text-[#909090] mb-2"
                  >
                    Your Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Enter your role"
                    className={`w-full p-2 rounded-[8px] mt-[2px] bg-[#262626] text-white pl-[4%] placeholder:text-[13px] placeholder:text-[#666161] outline-none ${
                      errors?.role
                        ? "border border-red-500 focus:outline-none"
                        : "focus:outline focus:outline-1 focus:outline-[#9747FF] focus:outline-offset-0"
                    }`}
                  />
                  {errors?.role && (
                    <p className="text-red-500 text-sm mt-1">{errors?.role}</p>
                  )}
                </div>
                <div className="mb-6 mt-[20px]">
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-[#909090] mb-2 "
                  >
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter your company name"
                    className={`w-full p-2 rounded-[8px] mt-[2px] bg-[#262626] text-white pl-[4%] placeholder:text-[13px] placeholder:text-[#666161] outline-none ${
                      errors?.companyName
                        ? "border border-red-500 focus:outline-none"
                        : "focus:outline focus:outline-1 focus:outline-[#9747FF] focus:outline-offset-0"
                    }`}
                  />
                  {errors?.companyName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.companyName}
                    </p>
                  )}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="mb-6 mt-[20px]">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#909090] mb-2 "
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full p-2 rounded-[8px] mt-[2px] bg-[#262626] text-white pl-[4%] placeholder:text-[13px] placeholder:text-[#666161] outline-none ${
                      errors?.email
                        ? "border border-red-500 focus:outline-none"
                        : "focus:outline focus:outline-1 focus:outline-[#9747FF] focus:outline-offset-0"
                    }`}
                  />
                  {errors?.email && (
                    <p className="text-red-500 text-sm  mt-1">
                      {errors?.email}
                    </p>
                  )}
                </div>
                <div className="mb-6 mt-[20px]">
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-[#909090] mb-2 "
                  >
                    PhoneNumber
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    className={`w-full p-2 rounded-[8px] mt-[2px] bg-[#262626] text-white pl-[4%] placeholder:text-[13px] placeholder:text-[#666161] outline-none ${
                      errors?.mobile
                        ? "border border-red-500 focus:outline-none"
                        : "focus:outline focus:outline-1 focus:outline-[#9747FF] focus:outline-offset-0"
                    }`}
                  />
                  {errors?.mobile && (
                    <p className="text-red-500 text-sm  mt-1">
                      {errors?.mobile}
                    </p>
                  )}
                </div>
              </>
            )}
            {step === 4 && !isOauth && (
              <>
                <div className="mb-6 relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#909090] mb-2"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`w-full p-2 pr-10 rounded-[8px] mt-[2px] bg-[#262626] text-white pl-[4%] placeholder:text-[13px] placeholder:text-[#666161] outline-none ${
                      errors?.password
                        ? "border border-red-500 focus:outline-none"
                        : "focus:outline focus:outline-1 focus:outline-[#9747FF] focus:outline-offset-0"
                    }`}
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[50px] transform -translate-y-1/2 text-xl text-gray-400 cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </span>
                  {errors?.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.password}
                    </p>
                  )}
                </div>
                <div className="mb-6 relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#909090] mb-2 "
                  >
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`w-full p-2 rounded-[8px] mt-[2px] bg-[#262626] text-white pl-[4%] placeholder:text-[13px] placeholder:text-[#666161] outline-none ${
                      errors?.confirmPassword
                        ? "border border-red-500 focus:outline-none"
                        : "focus:outline focus:outline-1 focus:outline-[#9747FF] focus:outline-offset-0"
                    }`}
                  />
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-[50px] transform -translate-y-1/2 text-xl text-gray-400 cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </span>
                  {errors?.confirmPassword && (
                    <p className="text-red-500 text-sm  mt-1">
                      {errors?.confirmPassword}
                    </p>
                  )}
                </div>
              </>
            )}

            <button
              onClick={(e) => {
                if (step === 4) {
                  handleSubmit(e);
                } else if (step === 3 && isOauth) {
                  handleSubmit(e);
                } else {
                  handleStep(e);
                }
              }}
              className="w-full p-[10px] bg-[#7939CC] text-white text-[14px] rounded-[10px] hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {step === 4 && !isOauth ? "Verify account" : "Continue"}
            </button>
            {/* )} */}

            {/* Social Icons */}
            {/* {step === 4 && (
              <div className="flex justify-around mt-[16px] space-x-4">
                <button className="py-2 px-0 bg-[#262626] rounded-[5px] h-[40px] w-[110px] flex items-center justify-center ">
                  <Image
                    src="/images/googleLogo.png"
                    height={20}
                    width={20}
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
            )} */}
            {(step === 4 || step === 1) && (
              <p className="text-center text-sm font-[500] mt-4 text-[#606060]">
                Already have an account?{" "}
                <Link href="/login" className="text-[#7939CC]">
                  Login
                </Link>
              </p>
            )}
          </form>
        </div>
        <div className="flex justify-between w-full text-gray-500 text-xs mt-auto py-4 ">
          <p className="text-[14px]">© {new Date().getFullYear()} Bubbl</p>
          <Link href="mailto:help@bubbl.cards" className="text-[14px]">
            sales@bubbl.cards
          </Link>
        </div>
      </div>
      {/* Right side profile page */}
      <div className=" hidden md:flex w-1/2 bg-gray-800 items-center justify-center ">
        <div className="w-[300px] p-4 bg-black rounded-lg shadow-lg  bordr">
          <div className="flex items-center  bg-blue justify-center w-full ">
            <p className="text-xs text-center text-white mt-1 truncate max-w-[190px]">
              &#x1F44B; Welcome {formData.name}
            </p>
          </div>
          <div className=" mt-[14px] relative w-50 p-2 rounded-lg shadow-lg  overflow-hidden bg-[#141414]">
            <div className="relative w-full pt-4 rounded-lg shadow-lg overflow-hidden bg-[url('/profile.png')] bg-cover bg-yellow-100">
              {/* Blur Overlay with Rounded Corners */}
              <div className="absolute inset-0 w-full h-full bg-center backdrop-blur-lg bg-black/30 rounded-lg"></div>

              {/* Content */}
              <div className="flex flex-col gap-1 z-10 relative">
                <Image
                  src="/profile.png"
                  alt="Profile"
                  className="w-20 h-20 rounded-full mx-auto"
                  width={100}
                  height={100}
                />
                <h2 className="text-[18px] font-[700] text-center text-black">
                  {formData.name}
                </h2>
                <p className="text-[14px] text-center text-black/60 font-semibold">
                  {formData.role}
                </p>
                <p className="text-[14px] text-center text-black/60 font-semibold">
                  {formData.companyName}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-between  space-x-3 w-full rounded-md">
              <button className="flex-grow-[3]  flex-shrink-1 basis-3/3 h-10 px-4 bg-[#1F1F1F] rounded-lg text-white text-sm">
                Save Contact
              </button>
              <button className="flex-grow flex-shrink-0 basis-1/5 h-10 bg-[#1F1F1F] rounded-lg text-white flex justify-center items-center">
                <Share_icon />
              </button>
              <button className="flex-grow flex-shrink-0 basis-1/5 h-10 bg-[#1F1F1F] rounded-lg text-white flex justify-center items-center">
                <ScannerQr_icon />
              </button>
            </div>
          </div>
          {step >= 3 && (
            <div className="mt-4 bg-[#111111]  rounded-lg shadow-lg space-y-2 ">
              {formData?.email?.length > 0 && (
                <div className="flex items-center justify-between  rounded-lg px-[10px] py-0 pt-[10px] pb-[10px] ">
                  <div className="flex items-center space-x-2  ">
                    <div className="w-10 h-10  bg-[#1F1F1F] rounded-[10px] flex items-center justify-center">
                      <span
                        role="img"
                        aria-label="Email"
                        className="text-blue-500 text-lg"
                      >
                        <Image
                          src="/images/emailIcon.png"
                          height={30}
                          width={30}
                          alt="google"
                        />
                      </span>
                    </div>
                    <p className="text-white text-sm truncate max-w-[150px] ml-[20px] ">
                      {formData.email}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    {/* <span className="text-gray-400 text-sm">1</span> */}
                    <span className="text-gray-500 text-sm">
                      <Arrow_icon />
                    </span>
                  </div>
                </div>
              )}
              {/* divider */}
              {formData?.email?.length > 0 &&
                formData?.mobile?.toString()?.length > 0 && (
                  <div className="border-t border-[#1F1F1F]"></div>
                )}
              {formData?.mobile?.toString()?.length > 0 && (
                <div className="flex items-center justify-between  rounded-lg px-[10px] py-0 pt-[10px] pb-[10px]">
                  <div className="flex items-center space-x-2  ">
                    <div className="w-10 h-10  bg-[#1F1F1F] rounded-[10px] flex items-center justify-center ">
                      <span
                        role="img"
                        aria-label="Phone"
                        className="text-green-500 text-lg"
                      >
                        <Image
                          src="/images/phoneIcon.png"
                          height={30}
                          width={30}
                          alt="google"
                        />
                      </span>
                    </div>
                    <p className="text-white text-sm ml-[15px] ">
                      {formData.mobile}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    {/* <span className="text-gray-400 text-sm">1</span> */}
                    <span className="text-gray-500 text-sm">
                      <Arrow_icon />
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
