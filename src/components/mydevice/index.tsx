"use client";
import React, { useState, useRef, useEffect } from "react";
import { Plus, MoreVertical, ChevronDown } from "lucide-react";
import Image from "next/image";

interface Device {
  id: string;
  title: string;
  activationDate: string;
  status: string;
  profile: string;
  mode: string;
  imageUrl?: string;
}
interface DropdownState {
  id: string;
  type: "profile" | "mode";
}

const profileOptions = [
  "Personal",
  "Business Deal",
  "Portfolio",
  "Client",
  "Office",
];
const modeOptions = [
  "Bubbl profile",
  "Direct URL",
  "Lead Form",
  "Contact Card",
];

type DeviceCardsProps = {
  initialDevices?: Device[];
};

export default function DeviceCards({ initialDevices = [] }: DeviceCardsProps) {
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [openDropdown, setOpenDropdown] = useState<DropdownState | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [loadingDevices, setLoadingDevices] = useState(false);

  useEffect(() => {
    if (initialDevices.length === 0) {
      setLoadingDevices(true);
      let cancelled = false;
      // Simulate API fetch
      setTimeout(() => {
        if (!cancelled) {
          setDevices([
            {
              id: crypto.randomUUID(),
              title: "Bubbl Blue",
              activationDate: new Date().toISOString().slice(0, 10),
              status: "Active",
              profile: "Personal",
              mode: "Bubbl profile",
              imageUrl: "/purple.png",
            },
          ]);
          setLoadingDevices(false);
        }
      }, 500);
      return () => {
        cancelled = true;
      };
    }
  }, [initialDevices]);

  const addDevice = (
    title: string = "Bubbl Blue",
    status: string = "Active",
    profile: string = "Personal",
    mode: string = "Bubbl profile",
    imageUrl: string = "/purple.png"
  ) => {
    const newDevice: Device = {
      id: crypto.randomUUID(),
      title,
      activationDate: new Date().toISOString().slice(0, 10),
      status,
      profile,
      mode,
      imageUrl,
    };
    setDevices((prev) => [...prev, newDevice]);
  };

  const updateDevice = (
    id: string,
    field: "profile" | "mode",
    value: string
  ) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === id ? { ...device, [field]: value } : device
      )
    );
    setOpenDropdown(null);
  };

  // Handle MoreVertical menu outside click and keyboard
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuOpenId &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setMenuOpenId(null);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpenId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpenId]);

  const handleMenuToggle = (id: string) => {
    setMenuOpenId((prev) => (prev === id ? null : id));
  };

  const handleMenuAction = () => {
    // Implement your logic here
    setMenuOpenId(null);
  };

  const handleAddDeviceKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      addDevice();
    }
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 text-white">
      {loadingDevices ? (
        <div className="text-gray-400">Loading devices...</div>
      ) : (
        devices.map((device) => (
          <div
            key={device.id}
            className="bg-[#1e1e1e] p-4 rounded-xl w-[300px] shadow-md relative"
          >
            {/* Dots Icon */}
            <button
              ref={menuButtonRef}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              aria-haspopup="true"
              aria-expanded={menuOpenId === device.id}
              onClick={() => handleMenuToggle(device.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleMenuToggle(device.id);
                }
              }}
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {menuOpenId === device.id && (
              <div
                ref={menuRef}
                className="absolute top-10 right-3 bg-[#2a2a2a] rounded-md z-30 shadow-md flex flex-col min-w-[120px]"
                role="menu"
              >
                <button
                  className="px-3 py-2 text-sm hover:bg-[#3a3a3a] text-left"
                  onClick={() => handleMenuAction()}
                  role="menuitem"
                >
                  Edit
                </button>
                <button
                  className="px-3 py-2 text-sm hover:bg-[#3a3a3a] text-left"
                  onClick={() => handleMenuAction()}
                  role="menuitem"
                >
                  Delete
                </button>
                <button
                  className="px-3 py-2 text-sm hover:bg-[#3a3a3a] text-left"
                  onClick={() => handleMenuAction()}
                  role="menuitem"
                >
                  Duplicate
                </button>
              </div>
            )}

            {/* ID */}
            <p className="text-xs text-gray-400 mb-2">ID: {device.id}</p>

            {/* Title / Activation / Status / Image */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">{device.title}</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Activation date: {device.activationDate}
                </p>
                <div className="flex items-center text-sm text-gray-400 mt-1 gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {device.status}
                </div>
              </div>
              <DeviceImage imageUrl={device.imageUrl} />
            </div>

            {/* Profile + Modes */}
            <div className="mt-4 flex justify-between text-sm relative">
              {/* Profile Dropdown */}
              <div className="flex flex-col w-[48%] relative">
                <span className="text-gray-400 text-xs mb-1">Switch profile</span>
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown?.id === device.id &&
                        openDropdown.type === "profile"
                        ? null
                        : { id: device.id, type: "profile" }
                    )
                  }
                  className="bg-[#2a2a2a] flex items-center justify-between px-3 py-2 rounded-lg"
                >
                  {device.profile}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
                {openDropdown?.id === device.id &&
                  openDropdown.type === "profile" && (
                    <div className="absolute top-full left-0 mt-1 w-[48%] bg-[#2a2a2a] rounded-md z-20 shadow-md">
                      {profileOptions.map((option) => (
                        <div
                          key={option}
                          onClick={() =>
                            updateDevice(device.id, "profile", option)
                          }
                          className="px-3 py-2 text-sm hover:bg-[#3a3a3a] cursor-pointer"
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              {/* Mode Dropdown */}
              <div className="flex flex-col w-[48%] relative">
                <span className="text-gray-400 text-xs mb-1">Modes</span>
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown?.id === device.id &&
                        openDropdown.type === "mode"
                        ? null
                        : { id: device.id, type: "mode" }
                    )
                  }
                  className="bg-[#2a2a2a] flex items-center justify-between px-3 py-2 rounded-lg"
                >
                  {device.mode}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
                {openDropdown?.id === device.id &&
                  openDropdown.type === "mode" && (
                    <div className="absolute top-full right-0 mt-1 w-[48%] bg-[#2a2a2a] rounded-md z-20 shadow-md">
                      {modeOptions.map((option) => (
                        <div
                          key={option}
                          onClick={() => updateDevice(device.id, "mode", option)}
                          className="px-3 py-2 text-sm hover:bg-[#3a3a3a] cursor-pointer"
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          </div>
        ))
      )}

      {/* Add New Device Button */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Add New Device"
        onClick={() => addDevice()}
        onKeyDown={handleAddDeviceKeyDown}
        className="cursor-pointer w-[250px] h-[250px] flex flex-col justify-center items-center bg-[#1e1e1e] border-2 border-gray-500 rounded-xl hover:bg-[#2a2a2a] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
      >
        <div className="w-10 h-10 bg-[#2a2a2a] rounded-full flex items-center justify-center mb-2">
          <Plus className="text-white w-5 h-5" />
        </div>
        <p className="text-white">Add New Device</p>
      </div>
    </div>
  );

}

// DeviceImage component for fallback
function DeviceImage({ imageUrl }: { imageUrl?: string }) {
  const [src, setSrc] = useState(imageUrl || "/purple.png");
  const fallback = "/purple.png";
  return (
    <Image
      src={src}
      alt="Card"
      width={100}
      height={100}
      className="rounded mt-1"
      onError={() => setSrc(fallback)}
    />
  );
}

