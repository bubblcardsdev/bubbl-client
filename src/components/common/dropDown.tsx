import React from "react";
import "./css/DropDown.css";

interface DropdownOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  onChange: (value: string | number) => void;
  value?: string | number;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
}

const DropDown: React.FC<DropdownProps> = ({
  options,
  onChange,
  value,
  placeholder,
  className = "",
  disabled = false,
  label,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="dropdown-container">
      {label && <label className="dropdown-label">{label}</label>}
      <select
        value={value ?? ""}
        onChange={handleChange}
        disabled={disabled}
        className={`dropdown-select ${className}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;