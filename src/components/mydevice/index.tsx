

"use client";

import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical, BsChevronDown, BsPlus } from "react-icons/bs";
import Image from "next/image";

export default function DeviceCards() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [modeOpen, setModeOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [profile, setProfile] = useState("Personal");
  const [mode, setMode] = useState("Bubbl profile");

  const profiles = ["Personal", "Business Deal", "Portfolio", "Client", "Office"];
  const modes = ["Bubbl profile", "Direct URL", "Lead Form", "Contact Card"];

  const rootRef = useRef<HTMLDivElement | null>(null);

  // click outside to close any menu
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setProfileOpen(false);
        setModeOpen(false);
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className=" text-white p-3 sm:p-4 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto C" ref={rootRef} >
        {/* Device Card */}
        <div className="bg-[#1F1F1F] rounded-2xl p-4 sm:p-5 md:p-6 w-full mx-auto relative border border-[#2A2A2A] ">
          {/* Three dots menu at top-right */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
            <button
              onClick={() => {
                setMenuOpen((v) => !v);
                setProfileOpen(false);
                setModeOpen(false);
              }}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-[#2A2A2A]"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              <BsThreeDotsVertical size={16} />
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-32 bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg shadow-xl z-20 overflow-hidden"
              >
                <div className="flex flex-row">
                  <button className="flex-1 text-center px-2 py-2 text-xs hover:bg-[#3A3A3A] transition-colors border-r border-[#3A3A3A]">
                    Edit
                  </button>
                  <button className="flex-1 text-center px-2 py-2 text-xs hover:bg-[#3A3A3A] transition-colors border-r border-[#3A3A3A]">
                    Duplicate
                  </button>
                  <button className="flex-1 text-center px-2 py-2 text-xs hover:bg-red-600 hover:text-white transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ID */}
          <p className="text-xs text-[#666666] mb-3 pr-8">ID : kjbasdfdoashbfads</p>

          {/* Device info and image */}
          <div className="flex justify-between items-start mb-4 sm:mb-6">
            <div className="flex-1 pr-2">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">Bubbl Blue</h2>
              <p className="text-xs sm:text-sm text-[#888888] mb-2">Activation date: 19/10/2025</p>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs sm:text-sm text-white">Active</span>
              </div>
            </div>
            
            {/* Device image placeholder */}
            <div className=" rounded-lg w-[60px] sm:w-[80px] h-[40px] sm:h-[50px] flex items-center justify-center  flex-shrink-0">
              {/* <span className="text-white text-xs font-medium">bubbl</span> */}
              <Image src="/purple.png" alt="purple" height={150} width={150}/>
            </div>
          </div>

          {/* Switch profile and Modes sections - Side by Side Layout */}
          <div className="grid grid-cols-2 gap-4">
            {/* Switch profile */}
            <div>
              <p className="text-xs text-[#888888] mb-2 ">Switch profile</p>
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileOpen((v) => !v);
                    setModeOpen(false);
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between bg-[#2A2A2A] px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm border border-[#3A3A3A] hover:border-[#4A4A4A] transition-colors"
                  aria-haspopup="listbox"
                  aria-expanded={profileOpen}
                >
                  <span className="text-white w-full truncate">{profile}</span>
                  <BsChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform flex-shrink-0 ml-1 ${profileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute left-0 mt-1 w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg shadow-xl z-10 max-h-48 overflow-y-auto">
                    <div className="flex flex-col">
                      {profiles.map((p) => (
                        <div
                          key={p}
                          role="option"
                          aria-selected={p === profile}
                          onClick={() => {
                            setProfile(p);
                            setProfileOpen(false);
                          }}
                          className="px-3 py-2 hover:bg-[#3A3A3A] cursor-pointer text-xs sm:text-sm text-white transition-colors text-left"
                        >
                          {p}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modes */}
            <div>
              <p className="text-xs text-[#888888] mb-2">Modes</p>
              <div className="relative">
                <button
                  onClick={() => {
                    setModeOpen((v) => !v);
                    setProfileOpen(false);
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between bg-[#2A2A2A] px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm border border-[#3A3A3A] hover:border-[#4A4A4A] transition-colors"
                  aria-haspopup="listbox"
                  aria-expanded={modeOpen}
                >
                  <span className="text-white truncate">{mode}</span>
                  <BsChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform flex-shrink-0 ml-1 ${modeOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {modeOpen && (
                  <div className="absolute left-0 mt-1 w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg shadow-xl z-10 max-h-48 overflow-y-auto">
                    <div className="flex flex-col">
                      {modes.map((m) => (
                        <div
                          key={m}
                          role="option"
                          aria-selected={m === mode}
                          onClick={() => {
                            setMode(m);
                            setModeOpen(false);
                          }}
                          className="px-3 py-2 hover:bg-[#3A3A3A] cursor-pointer text-xs sm:text-sm text-white transition-colors text-left"
                        >
                          {m}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add New Device Card */}
        <div className="bg-[#1F1F1F] rounded-2xl w-full max-w-[350px] mx-auto h-[250px] sm:h-[280px] flex items-center justify-center cursor-pointer hover:bg-[#252525] transition-colors">
          <div className="flex flex-col items-center justify-center text-center p-4 ">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2A2A2A] rounded-[10px] flex items-center justify-center mb-3 border border-[#3A3A3A] border-dashed">
              <BsPlus size={18} className="text-gray-400 sm:w-5 sm:h-5" />
            </div>
            <p className="text-gray-300 text-xs sm:text-sm font-medium">Add New Device</p>
          </div>
        </div>
      </div>
    </div>
  );
}
