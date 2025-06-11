"use client";
import React, { useState } from "react";
import { FaTruck } from "react-icons/fa";
import Image from "next/image";
import CardImg from "../../assets/product/productCardImg/basiccard.png";
import Footer from "../footerPage/index";
import { IoFilter, IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
interface FormData {
  email: string;
  phone: string;
  newsletter: boolean;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const CheckoutPage = () => {
  // const [formData, setFormData] = useState<FormData>({
  //     email: '',
  //     phone: '',
  //     newsletter:'',
  //     firstName: '',
  //     lastName: '',
  //     address: '',
  //     city: '',
  //     state: '',
  //     postalCode: '',
  //     country:'',
  //     newsletter: false.

  // });

  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "", // Fixed missing value
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    newsletter: false,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isOpen, setIsOpen] = useState<any>(false);
  const [stateSelected, setStateSelected] = useState<any>("select your state");
  const statOoptions = ["TamilNadu", "kerla"];
  const [selected, setSelected] = useState<any>("select your state");
  const options = ["India", "Armenia", "Canada"];
  const validate = () => {
    let newErrors: Partial<FormData> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
    }
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.postalCode) newErrors.postalCode = "Postal code is required";
    if (!formData.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //     const { name, value, type, checked } = e.target;
  //     setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });

  // };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? target.checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully");
    }
  };
  return (
    <div className="py-0 h-screen">
      <div className="max-w-[1300px] mx-auto  flex lg:px-10 md:px-10 sm:px-10 xs:px-4 pt-6 pb-14 lg:gap-40 md:gap-14 lg:flex-row md:flex-row sm:flex-col-reverse xs:flex-col-reverse mt-[100px] ">
        <div className="lg:w-[64%] sm:w-full ">
          <form onSubmit={handleSubmit}>
            <h1 className="text-[26px] font-bold mb-1   ">
              Checkout (2 items)
            </h1>
            <p className="text-[#7F7F7F] mb-6 font-semibold  text-[15px]">
              Your Order, Just a Click Away
            </p>
            <div className="mb-8">
              <h2 className="text-[24px] font-semibold mb-1 ">
                Contact Information
              </h2>
              <p className="text-[#7F7F7F] mb-4 font-semibold  text-[14px]">
                We’ll Notify You Every Step
              </p>
              <div className="space-y-7">
                <div>
                  <label className="block text-[14px] font-medium text-[#7F7F7F] ">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#ACACAC] "
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="mr-4"
                    checked={formData.newsletter}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="newsletter"
                    className="text-sm text-[#7F7F7F]  rounded-lg"
                  >
                    Email me with news and offers
                  </label>
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#7F7F7F] ">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    placeholder="IN: 1-19 5000-90000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#ACACAC] "
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-8 space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-2 ">
                  Shipment Information
                </h2>
                <p className="text-[#7F7F7F] mb-0 font-semibold text-[14px]">
                  Help Us Get Your Order to the Right Place
                </p>
              </div>

              <div className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] font-medium text-[#7F7F7F] ">
                      First name
                    </label>
                    <input
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#ACACAC] placeholder:text-[14px]"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium text-[#7F7F7F] ">
                      Last name
                    </label>
                    <input
                      type="text"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#ACACAC] placeholder:text-[14px] "
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#7F7F7F] ">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Dear no, street, Locality"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#ACACAC] placeholder:text-[14px]"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                  )}
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] font-medium text-[#7F7F7F] ">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#ACACAC] placeholder:text-[14px]"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">{errors.city}</p>
                    )}
                  </div>
                  <div className="relative w-full space-y-1 ">
                    <label className="block text-sm font-medium text-[#7F7F7F]">
                      State
                    </label>
                    <button
                      className="w-full px-4 py-[14px] bg-[#F5F5F5] rounded-lg flex justify-between items-center"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <span className="text-[#7F7F7F] text-sm">
                        {stateSelected}
                      </span>
                      <IoIosArrowDown className="text-[#7F7F7F]" />
                    </button>
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm">{errors.country}</p>
                    )}
                    {isOpen && (
                      <ul className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        {options.map((option, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-purple-600 hover:text-white"
                            onClick={() => {
                              setStateSelected(option);
                              setIsOpen(false);
                            }}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] font-medium text-[#7F7F7F] ">
                      Postal code
                    </label>
                    <input
                      type="text"
                      placeholder="080000"
                      className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 placeholder:text-[14px]"
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm">
                        {errors.postalCode}
                      </p>
                    )}
                  </div>
                  <div className="relative w-full space-y-1 ">
                    <label className="block text-sm font-medium text-[#7F7F7F]">
                      Country
                    </label>
                    <button
                      className="w-full px-4 py-[14px] bg-[#F5F5F5] rounded-lg flex justify-between items-center"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <span className="text-[#7F7F7F] text-sm">{selected}</span>
                      <IoIosArrowDown className="text-[#7F7F7F]" />
                    </button>
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm">{errors.country}</p>
                    )}
                    {isOpen && (
                      <ul className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        {options.map((option, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-purple-600 hover:text-white"
                            onClick={() => {
                              setSelected(option);
                              setIsOpen(false);
                            }}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-sm text-[#7F7F7F] mb-4">
              <p className=" mb-8">
                Your info will be saved to a Shop account. By continuing, you
                agree to Shop’s Terms of Service and acknowledge the Privacy
                Policy.
              </p>
            </div>
            <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-md text-center">
              Proceed to payment
            </button>
          </form>
        </div>
        <div className="lg:w-[40%] sm:w-full bg-white p-6 xs:p-0 rounded-lg h-fit lg:sticky md:sticky sm:static xs:static top-[125px] ">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[26px] font-semibold ">Review your cart</h2>
            <a href="#" className="underline font-semibold  text-black ">
              Edit
            </a>
          </div>
          <div className="flex lg:items-center md:items-center sm:items-center xs:items-start lg:gap-4 md:gap-6 sm:gap-16 xs:gap-1 pb-4 mb-4 lg:flex-row md:flex-row sm:flex-row xs:flex-row ">
            <div className=" w-[90px] h-[65px] rounded-[8px] flex justify-center items-center bg-[#F3F3F3]">
              <Image src={CardImg} alt="card" width={500} height={300} />
            </div>
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-gray-500 text-sm p-0 m-0 ">Card</p>
                <p className="font-semibold">Bubbl basic card</p>
              </div>
              <p className="ml-auto font-bold text-[18px]">₹699/-</p>
            </div>
          </div>
          <div className="text-gray-600 space-y-2">
            <div className="flex justify-between">
              <span className=" text-[#7F7F7F]">Subtotal (1 item)</span>
              <span className=" text-[14px]">₹45.00</span>
            </div>
            <div className="flex justify-between">
              <span className=" text-[#7F7F7F]">Shipping</span>
              <span className=" text-[14px]">₹5.00</span>
            </div>
            <div className="flex justify-between">
              <span className=" text-[#7F7F7F]">Discount</span>
              <span className=" text-[14px]">-₹10.00</span>
            </div>
            <div className="flex justify-between">
              <span className=" text-[#7F7F7F]">GST 18%</span>
              <span className=" text-[14px]">₹190.00</span>
            </div>
          </div>
          <div className=" mt-4 pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span className=" text-[#7F7F7F]">Total</span>
              <span className="">₹699.00</span>
            </div>
            <p className="text-sm text-[#7F7F7F] ">(Incl of all taxes)</p>
          </div>
          <div className="mt-6 mb-6 bg-[#F5F5F5] p-3 rounded-lg flex items-center gap-2 ">
            <FaTruck className="text-lg" />
            <span className=" text-[#7F7F7F]">
              Deliver by :{" "}
              <span className="font-semibold lg:text-[16px] md:text-[16px] sm:text-lg xs:text-sm inter text-black">
                12 June 2024
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="bg-black text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-0">
        <Footer />
      </div>
    </div>
  );
};
export default CheckoutPage;
