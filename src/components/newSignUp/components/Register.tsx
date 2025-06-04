"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/router"
import Image from "next/image";
import { LOGIN_IMAGES } from "@/src/lib/constant";
import { BubblLogo, FacebookColorIcon, LinkedinColorIcon } from "../../common/icons";


const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
      name: "",
      role: "",
      companyName: "",
      mobile: "",
      email: "",
      password: "",
    });
   
    const [step, setStep] = useState(1);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ emailError: "", passwordError: "" });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const handleEmailChange = (e: any) => {
    const email = e.target.value;
    setLoginForm((prevState) => ({ ...prevState, email }));
    setErrors((prevState) => ({
      ...prevState,
      emailError: emailRegex.test(email) ? "" : "Please enter a valid email",
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!errors.emailError && !errors.passwordError) {
      router.push("/signup");
    }
  };

  const stepperProgress = useMemo(() => {
      const getWidth = (fields: any) => {
        const filledFields = fields.filter(
          (field: any) => formData?.[field]?.length > 0
        ).length;
        return filledFields === fields.length ? 100 : filledFields > 0 ? 50 : 10;
      };
  
      switch (step) {
        case 1:
          return getWidth(["name"]);
        case 2:
          return getWidth(["role", "companyName"]);
        case 3:
          return getWidth(["email", "mobile"]);
        case 4:
          return getWidth(["email", "password"]);
        default:
          return 10;
      }
    }, [step, formData]);
   
  return (
    <div className="h-screen bg-black">
      <div className="flex  md:flex-row overflow-hidden">
        <div className="flex flex-col justify-between items-center w-full md:w-1/2 bg-black text-white p-4 md:p-8 h-screen">
          <div className="w-full flex justify-start sticky top-0">
          <BubblLogo color="white"  />
          </div>
           <div className="flex justify-start space-x-2">
            {[1, 2, 3, 4].map((item, key: number) => (
              <div
                onClick={() => setStep(item)}
                key={key}
                className={`w-[70px] h-[5px] rounded-[25px] bg-[#262626] flex`}
              >
                <div
                  style={{
                    background: "#7939CC",
                    height: "100%",
                    borderRadius: "25px",
                    width: `${
                      step > item ? 100 : step == item ? stepperProgress : 0
                    }%`,
                  }}
                ></div>
              </div>
            ))}
          </div>
          <div className="w-full max-w-xs md:max-w-[400px] flex-col justify-center lg:px-0">
            <h1 className="text-2xl md:text-3xl mb-[16px] font-bold  ">
              Welcome Aboard!
            </h1>
            <p className="mb-4 text-[#606060] md:text-[16px] font-semibold ">
             Let’s set up your account for a seamless experience.
            </p>
            <form className="w-full" onSubmit={handleSubmit}>
              <label className="block text-sm md:text-[14px] font-medium mb-[6px]  text-[#909090]">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={loginForm.email}
                onChange={handleEmailChange}
              className={`w-full p-2 rounded-[8px] mt-[2px] mb-[20px] bg-[#262626] text-white pl-[4%] placeholder:text-[13px] placeholder:text-[#666161] outline-none ${
  errors.emailError
    ? "border border-red-500 focus:outline-none"
    : "focus:outline focus:outline-1 focus:outline-[#9747FF] focus:outline-offset-0"
}`}
              />
              {errors.emailError && (
                <p className="text-red-500 text-[12px] mt-[8px]">
                  {errors.emailError}
                </p>
              )}
             
              <button
                type="submit"
                className="w-full p-2  bg-[#9747FF] text-white text-[14px] rounded-[8px] hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Log in
              </button>
              {/* Social Icons */}
              <div className="flex justify-around mt-[16px] space-x-4">
                <button className="py-2 px-0 bg-[#262626] rounded-[5px] h-[40px] w-[110px] flex items-center justify-center ">
                
                    <Image src="/images/googleLogo.png" height={24} width={23} alt="google" />
                 
                </button>
                <button className="p-2 bg-[#262626] rounded-[5px] h-[40px] w-[110px] flex items-center justify-center">
                  <FacebookColorIcon />
                </button>
                <button className="p-2 bg-[#262626] rounded-[5px] h-[40px] w-[110px] flex items-center justify-center">
                  <LinkedinColorIcon />
                </button>
              </div>

              <p className="text-center text-sm font-[500] mt-4  text-[#606060]">
                Don’t have an account?{" "}
                <a onClick={()=>router.push("/login")} className="text-[#9747FF] font-[500] cursor-pointer">
                  Login
                </a>
              </p>
            </form>
          </div>
          <div className="flex justify-between w-full text-gray-500 text-xs py-0 mx-auto">
            <p className="text-[14px]">© {new Date().getFullYear()} Bubbl</p>
            <a  href="mailto:help@bubbl.cards" className="text-[14px]" >sales@bubbl.cards</a>
          </div>
        </div>
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-800  h-screen relative">
       
        </div>
      </div>
    </div>
  );
};

export default Register;
