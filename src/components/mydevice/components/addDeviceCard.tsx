import { Plus } from "lucide-react";

export default function AddDeviceCard() {
  return (
    <div className="bg-[#282828] text-white p-4 rounded-xl shadow-md w-full max-w-[350px] flex flex-col justify-center items-center h-[200px] border-2 border-dashed border-gray-500 cursor-pointer">
      <div className="w-10 h-10 flex items-center justify-center border border-gray-500 rounded-md">
        <Plus />
      </div>
      <p className="text-sm mt-4">Add New Device</p>
    </div>
  );
}
