// components/MobileModel.tsx
import React from "react";

interface MobileModelProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  name?: string;
}

const MobileModel = ({ show, onClose, title, children }: MobileModelProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default MobileModel;
