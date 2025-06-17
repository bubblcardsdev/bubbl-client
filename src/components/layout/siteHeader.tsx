"use client";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useRouter } from "next/router";
import { themeObject } from "../../lib/constant";
import { BubblLogo, CartIcon } from "../common/icons";

const SiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = useRouter();
  const theme = themeObject[pathname.pathname] || "white";
  const isDarkTheme =
    theme === "black" ||
    theme === "linear-gradient(to right, #4A4A4A, #000000)";

  return (
    <nav
      className={`flex items-center justify-between px-6 py-2 md:px-10 lg:px-16 relative transition-all duration-300 border-b`}
      style={{
        background: theme,
        color: isDarkTheme ? "white" : "black",
        borderBottom: `1px solid ${
          isDarkTheme ? "rgba(255, 255, 255, 0.2)" : "#E5E7EB"
        }`,
      }}
    >
      {/* Logo */}
      <div className="text-xl font-bold">
        <span className={`tracking-wide ${isDarkTheme ? "invert" : ""}`}>
          <BubblLogo />
        </span>
      </div>

      {/* Desktop Menu */}
      <div className=" group hidden md:flex justify-between gap-5">
        {["Shop", "Plans", "About"].map((item) => (
          <div
            key={item}
            className={`flex items-center justify-center h-9 w-[6rem] rounded-md cursor-pointer transition-all duration-300 ${
              isDarkTheme ? "hover:bg-[#333333]" : "hover:bg-[#F3F3F3]"
            }`}
            onClick={() => pathname.push(`/${item.toLowerCase()}`)}
          >
            <span className="font-bold">{item}</span>
          </div>
        ))}
      </div>

      {/* Right Section */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Cart Icon */}
        <button
          aria-label="Cart"
          className="text-xl hover:text-gray-600"
          style={{ color: isDarkTheme ? "white" : "black" }}
        >
          <span
            className={`${theme === "white" ? "invert" : ""}`}
            onClick={() => pathname.push("/cart")}
          >
            <CartIcon />
          </span>
        </button>
        {/* Login Button */}
        <button
          className="px-8 py-2 bg-[#9747FF] text-white  rounded-[10px] hover:bg-purple-500"
          onClick={() => pathname.push("/login")}
        >
          Login
        </button>
      </div>

      {/* <div
        style={{
          background:
            "linear-gradient(242deg,rgba(174, 174, 174, 0.1) 0%, rgba(167, 150, 189, 0.1) 100%)",
        }}
        className=" group backdrop-blur-3xl md:flex p-3 justify-center top-[100%] w-[987px] max-w-[80%] h-[387px] bg-gray-400 translate-x-[40%] absolute xs:hidden rounded-[24px] space-x-3 "
      >
        <div className="w-1/3 bg-[rgba(255,255,255,0.3)] border border-[#D8D8D8] backdrop-blur rounded-[16px]">
          <h1>Bubbl Basic</h1>
        </div>
        <div className="w-1/3 bg-yellow-500 rounded-[16px] p-4">
          <h1 className="text-[#000000]">Bubbl Basic</h1>
        </div>
        <div className="w-1/3 bg-blue-500 rounded-[16px]">
          <h1 className="text-[#000000]">Bubbl Basic</h1>
        </div>
      </div> */}

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <button
          aria-label="Toggle Menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl"
          style={{ color: isDarkTheme ? "white" : "black" }}
        >
          {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`absolute top-full left-0 w-full shadow-lg md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96" : "max-h-0"
        }`}
        style={{ backgroundColor: isDarkTheme ? "black" : "white" }}
      >
        <div className="flex flex-col items-center space-y-2 py-[20px]">
          {["Shop", "Plans", "About", "Cart", "Login"].map((item) => (
            <div
              key={item}
              className={`w-[80%] px-6 py-2 text-center cursor-pointer transition-all duration-300 rounded-lg ${
                isDarkTheme ? "hover:bg-[#333333]" : "hover:bg-[#F3F3F3]"
              }`}
              onClick={() => pathname.push(`/${item.toLowerCase()}`)}
            >
              <span className="font-bold">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SiteHeader;
