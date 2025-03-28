"use client";
import Image from 'next/image';
import React, { useState, useEffect,useMemo } from "react";
import Bubbl_logo from '../../assets/icons/homeIcon/bubbl_logo'
import Google from "../../assets/icons/homeIcon/google_icon";
import Facebook from "../../assets/icons/homeIcon/facebook_icon";
import Linkedin from "../../assets/icons/homeIcon/linkedin_icon";
import Hand from '../../assets/Homeimg/hand.png';
import Profile from '../../assets/Homeimg/profile.png';
import ShareIcon from "../../assets/icons/homeIcon/share_icon";
import ScannerQrIcon from "../../assets/icons/homeIcon/scannerQr_icon";
import ArrowIcon from '../../assets/icons/homeIcon/arrow_icon';


function Signup() {
    const [isShaking, setIsShaking] = useState(false);
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({
        name: "",
        role: "",
        companyName: "",
        mobile: "",
        email: "",
        password: "",
    });

    const [formData, setFormData] = useState<any>({
        name: "",
        role: "",
        companyName: "",
        mobile: "",
        email: "",
        password: "",
    });
    console.log(formData, 'formdata')
    const validateFields = () => {
        let isValid = true;
        const newErrors = { name: "", role: "", companyName: "", mobile: "", email: "", password: "" };

        if (step === 1) {
            if (!formData.name.trim()) {
                newErrors.name = "Name is required.";
                isValid = false;
            }
        }
        if (step === 2) {
            if (!formData.role.trim()) {
                newErrors.role = "Role is required.";
                isValid = false;
            }
            if (!formData.companyName.trim()) {
                newErrors.companyName = "Company name is required.";
                isValid = false;
            }
        }

        if (step === 3) {
            if (!formData.mobile.trim()) {
                newErrors.mobile = "Mobile number is required.";
                isValid = false;
            } else if (!/^\d{10}$/.test(formData.mobile)) {
                newErrors.mobile = "Enter a valid 10-digit mobile number.";
                isValid = false;
            }
            if (!formData.email.trim()) {
                newErrors.email = "Email is required.";
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = "Enter a valid email address.";
                isValid = false;
            }

        }
        if (step === 4) {

            if (!formData.email.trim()) {
                newErrors.email = "Email is required.";
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = "Enter a valid email address.";
                isValid = false;
            }

            if (!formData.password.trim()) {
                newErrors.password = "password is required.";
                isValid = false;
            } else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password)) {
                newErrors.password = "Enter a valid password address.";
                isValid = false;
            }
        }
        setErrors(newErrors);
        return isValid;
    };
   
    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input
    };
    // Move to the next step
    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateFields()) {
            if (step <= 4) setStep(step + 1); // Assuming 3 steps for this example
        }
    };
    const stepperProgress = useMemo(() => {
        const getWidth = (fields:any) => {
          const filledFields = fields.filter((field:any) => formData?.[field]?.length > 0).length;
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

        <div className="flex h-screen flex-col md:flex-row  overflow-hidden">
            <div className="flex flex-col justify-between items-center w-full md:w-1/2 bg-black text-white p-8 h-full">
                <div className="w-full flex justify-start sticky top-0 p-2 mb-8">
                    <Bubbl_logo />
                </div>
                <div className='w-full max-w-xs md:w-[400px] flex-grow mt-[50px] flex-col justify-center px-4'>
                    <div className="flex justify-start space-x-2 mb-8">
                    {[1, 2, 3, 4].map((item,key:number) => (
                            <div onClick={()=>setStep(item)} key={key} className={`w-[70px] h-[5px] rounded-[25px] bg-[#262626] flex`}>
                                <div style={{background:'#7939CC',height:'100%',borderRadius:'25px',width:`${step>item?100:step==item?stepperProgress:0}%`}}></div>
                            </div>
                        ))}
                    </div>
                    <div className="text-start mb-2">
                        {step === 1 && (
                            <>
                                <h1 className="text-2xl font-bold  ">Welcome Aboard!</h1>
                                <p className="text-[#606060] text-sm font-[500]  mt-[10px] leading-[1.3]">
                                    Let's set up your account for a seamless experience
                                </p>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <h1 className="text-2xl font-bold ">Your Work, Your Way</h1>
                                <p className="text-[#606060] text-sm font-[500]  mt-[10px] leading-[1.3]">
                                    Describe your work to customize tools and resources
                                </p>
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <h1 className="text-2xl font-bold ">Let's Make Connection Simple</h1>
                                <p className="text-[#606060] text-sm font-[500] mt-[10px] leading-[1.3]">
                                    Share your contact info to ensure smooth effortless connectivity
                                </p>
                            </>
                        )}
                        {step === 4 && (
                            <>
                                <h1 className="text-2xl font-bold ">You're All Set</h1>
                                <p className="text-[#606060] text-sm font-[500]  mt-[10px] leading-[1.3]">
                                    Now, save your card by signing up below. Welcome to the future of networking.
                                </p>
                            </>
                        )}
                    </div>
                    <form className="w-full max-w-xs" onSubmit={handleNext}>
                        {step === 1 && (
                            <div className="mb-6 mt-[30px]">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-[#909090] mb-2 "
                                >
                                    Full Name*
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full p-[10px]  rounded-[10px] bg-[#262626]  font-[5px] text-gray-400 focus:outline-none pl-[15px] placeholder:text-[13px] placeholder:text-[#666161] ${errors.name ? "border border-red-500" : ""
                                        }`}
                                    placeholder="Enter your name"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm  mt-1">{errors.name}</p>
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
                                        Your Role *
                                    </label>
                                    <input
                                        type="text"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        placeholder="Enter your role"
                                        className={`w-full p-[10px] rounded-[10px]  bg-[#262626] text-white focus:outline-none placeholder:text-[13px] pl-[15px] placeholder:text-[#666161] ${errors.role ? "border border-red-500" : ""
                                            }`}
                                    />
                                    {errors.role && (
                                        <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                                    )}
                                </div>
                                <div className="mb-6 mt-[20px]">
                                    <label
                                        htmlFor="companyName"
                                        className="block text-sm font-medium text-[#909090] mb-2 "
                                    >
                                        Company Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        placeholder="Enter your company name"
                                        className={`w-full p-[10px] rounded-[10px] bg-[#262626] text-white focus:outline-none placeholder:text-[13px] pl-[15px] placeholder:text-[#666161] ${errors.companyName ? "border border-red-500" : ""
                                            }`}
                                    />
                                    {errors.companyName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
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
                                        Email *
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className={`w-full p-[10px] rounded-[10px] bg-[#262626] text-white  focus:outline-none placeholder:text-[13px] pl-[15px] placeholder:text-[#666161] ${errors.email ? "border border-red-500" : ""
                                            }`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-[10px]  mt-1">{errors.email}</p>
                                    )}
                                </div>
                                <div className="mb-6 mt-[20px]">
                                    <label
                                        htmlFor="mobile"
                                        className="block text-sm font-medium text-[#909090] mb-2 "
                                    >
                                        Mobile Number *
                                    </label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="Enter your mobile number"
                                        className={`w-full p-[10px] rounded-[10px] bg-[#262626]   text-white focus:outline-none placeholder:text-[13px] pl-[15px] placeholder:text-[#666161] ${errors.mobile ? "border border-red-500" : ""
                                            }`}
                                    />
                                    {errors.mobile && (
                                        <p className="text-red-500 text-sm  mt-1">{errors.mobile}</p>
                                    )}
                                </div>

                            </>
                        )}
                        {step === 4 && (
                            <>

                                <div className="mb-6 mt-[20px]">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-[#909090] mb-2 "
                                    >
                                        Email *
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className={`w-full p-2 rounded-[10px] bg-[#262626]  text-white focus:outline-none placeholder:text-[13px] pl-[15px] placeholder:text-[#666161] ${errors.email ? "border border-red-500" : ""
                                            }`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500  text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="mobile"
                                        className="block text-sm font-medium text-[#909090] mb-2 "
                                    >
                                        Password *
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className={`w-full p-2 rounded-[10px] bg-[#262626]  text-white focus:outline-none placeholder:text-[13px] pl-[15px] placeholder:text-[#666161] ${errors.password ? "border border-red-500" : ""
                                            }`}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm  mt-1">{errors.password}</p>
                                    )}
                                </div>
                            </>
                        )}
                        {/* Continue Button */}
                        {step === 4 ?
                            <button
                                type="submit"
                                className="w-full p-[10px]  bg-[#7939CC] rounded-[10px] text-white text-[14px]  hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                Sign Up </button> :
                            <button
                                type="submit"
                                className="w-full p-[12px]  bg-[#7939CC] text-white text-[14px] rounded-[10px] hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                Continue
                            </button>}

                        {/* Social Icons */}
                        {step === 4 && (
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
                        )}
                        {(step === 4 || step === 1) && (
                            <p className="text-center text-sm font-[500] mt-4 text-[#606060]">
                                Already have an account? <a href="/signup" className="text-[#4B2380] ">Login</a>
                            </p>
                        )}

                    </form>
                </div>
                <div className="flex justify-between w-full text-gray-500 text-xs mt-auto py-4 ">
                    <p >bubbl 2025</p>
                    <a href="mailto:help@bubbl.cards" >help@bubbl.cards</a>
                </div>
            </div>
            {/* Right side profile page */}
            <div className=" hidden md:flex w-1/2 bg-gray-800 items-center justify-center ">
                <div className="w-[300px] p-4 bg-black rounded-lg shadow-lg  bordr">
                    <div className="flex items-center  bg-blue justify-center w-full  ">
                        <Image
                        className="inline-block animate-wave delay-100 text:4xl"
                            role="img"
                            aria-label="waving-hand" 
                            src='/hand.png'
                            alt="Hand icon"
                            width={20}
                            height={20}
                        />
                        <p className="text-[10px] text-center text-white">
                            Welcome {formData.name}
                        </p>
                    </div>
                    <div className=" mt-[14px] relative w-50 p-2 rounded-lg shadow-lg  overflow-hidden bg-[#141414]">
                        <div className=" relative w-full pt-4 rounded-lg shadow-lg  overflow-hidden  bg-yellow-100 ">
                            <div className=" absolute inset-0 w-full h-full bg-opacity-40 bg-center filter blur-[15px] bg-cover" style={{ backgroundImage: `./profile.png})` }}></div>
                            <div className="relative z-10">
                                <Image
                                    src='/profile.png'
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full mx-auto mb-4"
                                    width={100}
                                    height={100}
                                />
                                <h2 className="text-[18px] font-[700] text-center text-black mb-2">{formData.name}</h2>
                                <p className="text-sm text-center  text-black ">{formData.role}</p>
                                <p className="text-sm text-center p-2 text-black ">{formData.companyName}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between  space-x-3 w-full rounded-md">
                            <button className="flex-grow-[3]  flex-shrink-1 basis-3/3 h-10 px-4 bg-[#1F1F1F] rounded-lg text-white text-sm">
                                Save Contact
                            </button>
                            <button className="flex-grow flex-shrink-0 basis-1/5 h-10 bg-[#1F1F1F] rounded-lg text-white flex justify-center items-center">
                                <ShareIcon />
                            </button>
                            <button className="flex-grow flex-shrink-0 basis-1/5 h-10 bg-[#1F1F1F] rounded-lg text-white flex justify-center items-center">
                                <ScannerQrIcon />
                            </button>
                        </div>
                    </div>
                    {step >= 3 && <div className="mt-4 bg-[#111111]  rounded-lg shadow-lg space-y-2 ">
                        {formData?.email?.length > 0 && <div className="flex items-center justify-between  rounded-lg px-[10px] py-0 pt-[10px] pb-[10px] " >
                            <div className="flex items-center space-x-2  ">
                                <div className="w-10 h-10  bg-gray-900 rounded-[10px] flex items-center justify-center">
                                    <span role="img" aria-label="Email" className="text-blue-500 text-lg">📧
                                    </span>
                                </div>
                                <p className="text-white text-sm truncate max-w-[150px] ml-[20px] ">{formData.email}</p>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                {/* <span className="text-gray-400 text-sm">1</span> */}
                                <span className="text-gray-500 text-sm"><ArrowIcon /></span>
                            </div>
                        </div>}
                        {/* divider */}
                        {formData?.email?.length > 0 && formData?.mobile?.toString()?.length > 0 && <div className="border-t border-gray-800"></div>
                        }
                        {formData?.mobile?.toString()?.length > 0 && <div className="flex items-center justify-between  rounded-lg px-[10px] py-0 pt-[10px] pb-[10px]">
                            <div className="flex items-center space-x-2  ">
                                <div className="w-10 h-10  bg-gray-900 rounded-[10px] flex items-center justify-center ">
                                    <span role="img" aria-label="Phone" className="text-green-500 text-lg">📞
                                    </span>
                                </div>
                                <p className="text-white text-sm ml-[15px] ">{formData.mobile}</p>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                {/* <span className="text-gray-400 text-sm">1</span> */}
                                <span className="text-gray-500 text-sm"><ArrowIcon /></span>
                            </div>
                        </div>}
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default Signup;
