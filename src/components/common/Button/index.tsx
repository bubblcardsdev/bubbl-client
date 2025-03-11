import React from 'react';

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ className = '', onClick, children = 'Button' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg bg-[#AC6CFF] text-white hover:bg-[#AC6CFF] ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
