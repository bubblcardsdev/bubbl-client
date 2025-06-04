import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "outline" | "danger";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  onClick,
  type = "button",
}) => {
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-2.5 text-lg",
    xl: "px-6 py-3 text-xl",
  };
  const variantClasses = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    secondary: "bg-[#333333] hover:bg-gray-800 text-white",
    outline: "border border-purple-600 text-purple-600 hover:bg-purple-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
  const disabledClasses =
    disabled || loading ? "opacity-60 cursor-not-allowed" : "";
  const baseClasses =
    "inline-flex items-center justify rounded-[10px]  text-sm transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1";
  const combinedClasses =
    `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}${disabledClasses}${className}`.trim();
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedClasses}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 mr-2 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
