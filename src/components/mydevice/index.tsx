"use client";
import React, { useState } from "react";
import { Plus, MoreVertical, ChevronDown } from "lucide-react";
import Image from "next/image";

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

/**
 * Renders a client-side list of device cards with per-device profile and mode controls and an "Add New Device" tile.
 *
 * Each card displays device metadata (id, title, activation date, status, image) and provides two dropdowns to switch
 * the device's profile and mode. Component manages local state:
 * - `devices`: array of device objects shown in the UI.
 * - `openDropdown`: which device and which dropdown ("profile" | "mode") is currently open.
 *
 * Exposed behaviors:
 * - addDevice: appends a new device with a generated id and preset fields.
 * - updateDevice(id, field, value): updates the specified device's `profile` or `mode` and closes any open dropdown.
 *
 * Interaction notes:
 * - Only one dropdown can be open at a time; clicking the same control toggles its dropdown.
 * - Selecting an option updates the device's field and closes the dropdown.
 *
 * @returns A JSX element containing the device cards and the Add New Device control.
 */
export default function DeviceCards() {
  const [devices, setDevices] = useState([
    {
      id: "kjbasdfodashbfads",
      title: "Bubbl Blue",
      activationDate: "19/10/2025",
      status: "Active",
      profile: "Personal",
      mode: "Bubbl profile",
    },
  ]);

  const [openDropdown, setOpenDropdown] = useState<{
    id: string;
    type: "profile" | "mode";
  } | null>(null);

  const addDevice = () => {
    const newDevice = {
      id: Math.random().toString(36).substring(2, 9),
      title: "Bubbl Blue",
      activationDate: "19/10/2025",
      status: "Active",
      profile: "Personal",
      mode: "Bubbl profile",
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

  return (
    <div className="flex flex-wrap gap-4 p-4  text-white">
      {devices.map((device) => (
        <div
          key={device.id}
          className="bg-[#1e1e1e] p-4 rounded-xl w-[300px] shadow-md relative"
        >
          {/* Dots Icon */}
          <button className="absolute top-3 right-3 text-gray-400 hover:text-white">
            <MoreVertical className="w-4 h-4" />
          </button>

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
                {device.status}
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              </div>
            </div>
            <Image
              src="/purple.png" // You can use a real image in public/
              alt="Card"
              width={100}
              height={100}
              className="rounded mt-1"
            />
          </div>

          {/* Profile + Modes */}
          <div className="mt-4 flex justify-between text-sm relative">
            {/* Profile Dropdown */}
            <div className="flex flex-col w-[48%]">
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
                  <div className="absolute top-full left-0 mt-1 w-[48%] bg-[#2a2a2a] rounded-md z-10 shadow-md">
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
            <div className="flex flex-col w-[48%]">
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
                  <div className="absolute top-full right-0 mt-1 w-[48%] bg-[#2a2a2a] rounded-md z-10 shadow-md">
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
      ))}

      {/* Add New Device Button */}
      <div
        onClick={addDevice}
        className="cursor-pointer w-[250px] h-[250px] flex flex-col justify-center items-center bg-[#1e1e1e] border-2 border-gray-500 rounded-xl hover:bg-[#2a2a2a] transition"
      >
        <div className="w-10 h-10 bg-[#2a2a2a] rounded-full flex items-center justify-center mb-2">
          <Plus className="text-white w-5 h-5" />
        </div>
        <p className="text-white">Add New Device</p>
      </div>
    </div>
  );
}
