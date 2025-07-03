"use client";
import { useState } from "react";
import { MoreVertical } from "lucide-react";
import Image from "next/image";

const profileOptions = ["Personal", "Business Deal", "Portfolio", "Client", "Office"];
const modeOptions = ["Bubbl profile", "Direct URL", "Lead Form", "Contact Card"];

export default function DeviceCard({ openMenus = false }: { openMenus?: boolean }) {
  const [selectedProfile, setSelectedProfile] = useState("Personal");
  const [selectedMode, setSelectedMode] = useState("Bubbl profile");
  const [profileOpen, setProfileOpen] = useState(openMenus);
  const [modeOpen, setModeOpen] = useState(openMenus);

  return (
    <div className="bg-[#282828] text-white rounded-xl w-full max-w-[350px] p-4 space-y-4 relative">
      <div className="text-sm text-gray-400">ID : kjbasdfodashbfads</div>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-base font-semibold">Bubbl Blue</h2>
          <p className="text-sm text-gray-400">Activation date: 19/10/2025</p>
          <div className="flex items-center gap-2 mt-1 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span> Active
          </div>
        </div>
        <Image
          src="/purple.png"
          alt="card"
          width={60}
          height={40}
          className="rounded"
        />
        <MoreVertical size={16} className="absolute top-4 right-4 text-gray-400" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-full bg-[#333333] px-4 py-2 rounded-md text-sm text-left"
          >
            {selectedProfile}
          </button>
          {profileOpen && (
            <div className="absolute left-0 mt-2 w-full bg-[#333333] rounded-lg shadow z-20">
              {profileOptions.map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setSelectedProfile(item);
                    setProfileOpen(false);
                  }}
                  className="px-4 py-2 text-sm hover:bg-[#333333] cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setModeOpen(!modeOpen)}
            className="w-full bg-[#333333] px-4 py-2 rounded-md text-sm text-left"
          >
            {selectedMode}
          </button>
          {modeOpen && (
            <div className="absolute left-0 mt-2 w-full bg-[#333333] rounded-lg shadow z-20">
              {modeOptions.map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setSelectedMode(item);
                    setModeOpen(false);
                  }}
                  className="px-4 py-2 text-sm hover:bg-[#3A3A3A] cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
