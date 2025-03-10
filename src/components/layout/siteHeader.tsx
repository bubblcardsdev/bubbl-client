"use client";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useRouter } from "next/router";
import { themeObject } from "../constant/constant";
import { BubbleLogo, CartIcon } from "../common/icons";



const SiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = useRouter();
  console.log(pathname,"pathname")
  const theme = themeObject[pathname.pathname] || "white";
  console.log(theme,"theme")
  const isDarkTheme = theme === "black";
  return (
    <nav
      className={`flex items-center justify-between px-6 py-2 md:px-10 lg:px-16 relative transition-all duration-300 border-b`}
      style={{
        background: isDarkTheme ? "black" : "white",
        color: isDarkTheme ? "white" : "black",
        borderBottom: `1px solid ${isDarkTheme ? "rgba(255, 255, 255, 0.2)" : "#E5E7EB"}`, 
      }}
    >
      {/* Logo */}
      <div className="text-xl font-bold">
        <span className={`tracking-wide ${isDarkTheme ? "invert" : ""}`}>
          <BubbleLogo />
        </span>
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex justify-between space-x-[13%]">
        {["Shop", "Plans", "About"].map((item) => (
          <div 
            key={item} 
            className={`flex items-center justify-center h-9 w-20 rounded-md cursor-pointer transition-all duration-300 ${
              isDarkTheme 
                ? "hover:bg-[#333333]" // Updated hover color for black background
                : "hover:bg-[#F3F3F3]"
            }`}
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
          <span className={`${theme === "white" ? "invert" : ""}`}>
            <CartIcon />
          </span>
        </button>
        {/* Login Button */}
        <button className="px-4 py-2 bg-purple-500 text-white font-semibold rounded hover:bg-purple-600">
          Login
        </button>
      </div>
      
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
    isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
  }`}
  style={{ backgroundColor: theme }}
>
  <div className="flex flex-col items-center space-y-2 ">
    {["Shop", "Plans", "About", "Cart", "Login"].map((item) => (
      <div
        key={item}
        className={`w-full px-6 py-2 text-center cursor-pointer transition-all duration-300 ${
          isDarkTheme ? "hover:bg-[#333333]" : "hover:bg-[#F3F3F3]"
        }`}
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
