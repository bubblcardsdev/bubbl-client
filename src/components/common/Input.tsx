// Input.tsx
import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className = "", ...rest }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full h-11 rounded-[14px] p-[10px_10px] outline-none bg-[#333333] font-inter text-base transition duration-500 focus:border-gray-300 ${className}`}
      {...rest}
    />
  );
});

Input.displayName = "Input"; // Needed for forwardRef components

export default Input;
