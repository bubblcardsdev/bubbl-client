import { X } from "lucide-react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?:string;
  width?:string
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children,className }) => {
  return (
    <div className={`fixed inset-0 overflow-auto z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="absolute inset-0 bg-[#1C1C1C] opacity-50" onClick={onClose}></div>
      <div className={`absolute right-0 top-0 h-full  bg-[#000000] overflow-auto shadow-lg text-white transition-transform transform translate-x-0 w-96 ${className}`}>
        <div className="flex items-center justify-between px-4 py-3 border-gray-700">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-300 hover:text-white" />
          </button>
        </div>
        <div className="flex flex-col ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
