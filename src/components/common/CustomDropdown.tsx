import React from "react";
import { ChevronDown } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CustomDropdownProps {
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  selectClassName?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  selectClassName = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm text-gray-300">{label}</label>
      <div className="relative">
        <select
          className={`w-full bg-[#2A2A2A] text-white text-sm py-2 px-4 rounded-md appearance-none pr-10 border border-gray-600 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9747FF] focus:border-[#9747FF] transition-colors ${selectClassName}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default CustomDropdown;
