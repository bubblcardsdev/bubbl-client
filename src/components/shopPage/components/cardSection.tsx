"use client";
import React, { useState } from "react";
import SearchIcon from "../../../assets/icons/productIcon/Product_search_icon";
import Cards from "./cards";
import { IoFilter, IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

function CardSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("All products");

  const options = ["Category 1", "Category 2"];

  return (
    <section className=" min-h-[calc(100vh-13vh)]  max-w-[1300px] mx-auto">
      <div className="py-8 flex flex-col items-center gap-[2vh] px-6">
        <div className="w-full flex justify-between ml-2  gap-4">
          {/* Search Bar */}
          <div className="flex flex-col mb-4 md:mb-0  lg:w-2/5 w-full md:w-3/4 sm:w-3/4 xs:w-3/4">
            <div className="flex items-center w-full  h-12 bg-[#F5F5F5]  rounded-xl  ">
              <span className="px-4 ">
                <SearchIcon />
              </span>
              <input
                type="text"
                className="flex-grow  focus:outline-none bg-[#F5F5F5] rounded-[10px] focus:ring-0 px-2  text-black truncate w-full overflow-hidden   "
                placeholder="Search bubbl product..."
              />
            </div>
            <p className="text-gray-400 pt-2 pl-1 md:pl-4  ml-1 ">
              Result: 21 Products
            </p>
          </div>
          {/* Dropdown */}
          <div className="relative w-12 md:w-48">
            <button
              className="w-full px-4 py-3 text-black bg-[#F5F5F5] rounded-xl flex justify-between items-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="hidden md:block"> {selected}</span>
              <span className="md:hidden text-lg -pr-4 ">
                <IoFilter size={20} className="" />
              </span>
              <span className="hidden md:block">
                <IoIosArrowDown />
              </span>
            </button>
            {/* Dropdown Menu */}
            {isOpen && (
              <ul className="absolute w-full mt-2 bg-[#F5F5F5] border border-gray-300 rounded-lg shadow-lg md:hidden sm:hidden xs:hidden">
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
            {/* mobile Dropdown Menu  */}
            {isOpen && (
              <div className="absolute right-0 mt-2 bg-[#F5F5F5] border border-gray-300 rounded-lg shadow-lg sm:hidden w-48 p-2">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <span className="text-lg font-semibold">
                    Select an Option
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-600 hover:text-black"
                  >
                    <IoClose size={20} />
                  </button>
                </div>

                <ul className="text-left">
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
              </div>
            )}
          </div>
        </div>
        <Cards />
        <div className="p-12 bg-[#F3F3F3]  rounded-lg mt-16  w-full ">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 ">
              Still thinking about it?
            </h2>
            <p className="text-gray-600 ">
              Sign up for our newsletter and get 10% off your next purchase.
            </p>
            <form className="mt-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <input
                  type="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex max-w-md px-6 py-2  border border-gray-300 rounded-lg  text-black focus:ring-1 focus:ring-purple-500 focus:border-transparent outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors duration-200 "
                >
                  Subscribe
                </button>
              </div>
            </form>
            <p className="text-sm text-gray-500 ">
              We care about your data in our{" "}
              <a
                href="/privacy-policy"
                className="text-gray-600 underline hover:text-purple-500 "
              >
                privacy policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CardSection;
