"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  spinnerClassName?: string;
}

export default function Button({
  loading = false,
  disabled = false,
  children,
  className = "",
  spinnerClassName = "",
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      className={`flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-md font-medium transition-all duration-200 bg-[#9747FF] text-white disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ${className}`}
      {...rest}
    >
      {loading && (
        <span
          className={`w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin ${spinnerClassName}`}
        />
      )}
      {children}
    </button>
  );
}
