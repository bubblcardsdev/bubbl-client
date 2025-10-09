"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { getLinkedDevices, switchProfile } from "@/src/services/devices";
import { isEmpty } from "lodash";
import { Circle, MoreVertical } from "lucide-react";
import { BsChevronDown } from "react-icons/bs";
import { MODES } from "@/src/lib/constant";

interface ProfileList {
  id: number;
  profileName: string;
}

interface DropDowns {
  profile: boolean;
  mode: boolean;
}

interface MyDevice {
  profileName: string;
  accountDeviceLinkId: number;
  deviceId: number;
  deviceUid: string;
  linkedAt: string;
  deviceNickName: string | null;
  deviceType: string;
  deviceLinkId: number | null;
  linkedProfileId: number | null;
  linkedModeId: number | null;
  deviceStatus: 1 | 0 | null;
  uniqueName: string | null;
  profileId: number | null;
  modeId: number | null;
  mode: string | null;
  modeUrl: string | null;
}

// interface Selected {
//   profile: number | null;
//   mode: number | null;
// }

export default function DeviceCards() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const initial = {
    profile: false,
    mode: false,
  };
  const [dropDown, setDropDown] = useState<DropDowns>(initial);
  const { profile: profileOpen, mode: modeOpen } = dropDown;
  const [myDevices, setMyDevices] = useState<MyDevice[]>([]);
  const [profiles, setProfiles] = useState<ProfileList[]>([]);

  const getMydevices = async () => {
    try {
      const response = await getLinkedDevices();
      if (response) {
        setMyDevices(response?.linkedDevices || []);
        setProfiles(response?.profiles || []);
      }
    } catch (e: any) {
      toast.error(e?.message || "Something went wrong");
    }
  };

  const handleSwitchProfiles = async (
    profile: ProfileList,
    device: MyDevice
  ) => {
    try {
      const response = await switchProfile({
        accountDeviceLinkId: device?.accountDeviceLinkId || null,
        profileId: device?.profileId || null,
      });
      if (response) {
        setMyDevices((prev) =>
          !isEmpty(prev)
            ? prev.map((record: MyDevice) => {
                if (record.deviceId === device?.deviceId) {
                  return {
                    ...record,
                    profileId: profile.id,
                    profileName: profile.profileName,
                  };
                }
                return record;
              })
            : []
        );
      }
    } catch (e: any) {
      toast.error(e?.message || "Something went wrong");
    }
  };

  // const handleSwitchModes = async (
  //   device: MyDevice,
  //   mode: { id: number; name: string },
  //   modeUrl: string
  // ) => {
  //   try {
  //     const response = await switchMode({
  //       deviceLinkId: device?.deviceLinkId || null,
  //       accountDeviceLinkId: device?.accountDeviceLinkId,
  //       modeId: device?.modeId,
  //       modeUrl: modeUrl,
  //     });
  //     if (response) {
  //       setMyDevices((prev) =>
  //         !isEmpty(prev)
  //           ? prev.map((record: MyDevice) => {
  //               if (record.deviceId === device?.deviceId) {
  //                 return {
  //                   ...record,
  //                   modeId: mode.id,
  //                   mode: mode.name,
  //                   modeUrl: modeUrl,
  //                 };
  //               }
  //               return record;
  //             })
  //           : []
  //       );
  //     }
  //   } catch (e: any) {
  //     toast.error(e?.message || "Something went wrong");
  //   } finally {
  //     setDropDown({ ...dropDown, profile: false });
  //   }
  // };

  useEffect(() => {
    getMydevices();
  }, []);

  return (
    <div className="text-white mt-4">
      <div className="flex gap-3 justify-between mb-2 sm:pr-8">
        <h2 className="text-xl font-medium">My Device</h2>
        <button className="bg-[#9747FF] px-2 py-1 rounded-md text-xs">
          <span className="text-sm">+</span>&nbsp;New Device
        </button>
      </div>
      <p className="text-sm text-gray-400 mb-6">
        Personalize your device to showcase your professional brand and make
        every connection count.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {!isEmpty(myDevices) ? (
          myDevices.map((device: MyDevice, i: number) => {
            const activationDate = device?.linkedAt
              ? new Date(device?.linkedAt).toLocaleDateString()
              : "";

            const badgeColor =
              device?.deviceStatus === 1 ? "#00D729" : "#E9292D";
            return (
              <div
                className="bg-[#282828] rounded-xl p-6 flex flex-col gap-2 w-full"
                key={i}
              >
                {/* Device Id and Menu */}
                <div className="flex justify-between gap-3 text-xs">
                  <span className="text-[#828282]">
                    ID:&nbsp;&nbsp;{device.deviceUid}
                  </span>
                  <div
                    className="relative shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical
                      size={18}
                      className="text-gray-400 cursor-pointer focus:outline-none"
                      onClick={() => setOpenMenu(openMenu === i ? null : i)}
                      onBlur={() => setOpenMenu(null)}
                      tabIndex={0}
                    />
                    {openMenu === i && (
                      <div className="absolute right-0 mt-2 w-36 bg-[#1D1D1D] rounded-lg shadow-lg z-10">
                        <button
                          // onClick={() => deleteProfile(profile.id)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#3a3a3a] w-full"
                        >
                          Rename Device
                        </button>
                        <button
                          // onClick={() => handleDuplicate(profile.id)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#3a3a3a] w-full"
                        >
                          Claim Name
                        </button>
                        <button
                          // onClick={() => handleDuplicate(profile.id)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#3a3a3a] w-full"
                        >
                          Deactivate Device
                        </button>
                        <button
                          // onClick={() => handleDuplicate(profile.id)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-[#3a3a3a] w-full"
                        >
                          Remove Device
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {/* Device Image and details */}
                <div className="flex gap-3 items-center">
                  <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                    <h2 className="text-lg mb-1 font-medium truncate max-w-full">
                      {device?.deviceNickName || device?.deviceType}
                    </h2>
                    <p className="text-sm mb-1 font-extralight max-w-full">
                      Activation date: {activationDate}
                    </p>
                    <p className="flex items-center gap-2 text-sm mb-1 truncate font-extralight max-w-full">
                      {device?.deviceStatus ? "Active" : "Deactivated"}{" "}
                      <Circle fill={badgeColor} size={12} color={badgeColor} />
                    </p>
                  </div>
                  <Image
                    src="/purple.png"
                    alt="purple"
                    height={110}
                    width={110}
                  />
                </div>
                {/* Switch Profiles and Modes */}
                <div className="grid grid-cols-2 gap-6 items-center">
                  <div>
                    <p className="text-xs text-[#888888] mb-3">
                      Switch profile
                    </p>
                    <div className="relative">
                      <button
                        onClick={() => {
                          setDropDown({ ...dropDown, profile: true });
                        }}
                        className="w-full relative flex items-center justify-between bg-[#2A2A2A] px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm border border-[#3A3A3A] hover:border-[#4A4A4A] transition-colors"
                        onBlur={() => {
                          setDropDown({ ...dropDown, profile: false });
                        }}
                      >
                        <span className="text-white w-full truncate">
                          {device.profileName}
                        </span>
                        <BsChevronDown
                          size={14}
                          className={`text-gray-400 transition-transform flex-shrink-0 ml-1 ${
                            profileOpen ? "rotate-180" : ""
                          }`}
                        />
                        {profileOpen && (
                          <div className="absolute left-0 top-full mt-1 w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg shadow-xl z-10 max-h-48 overflow-y-auto">
                            <div className="flex flex-col">
                              {profiles.map((p, i) => (
                                <div
                                  key={i}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDropDown({ ...dropDown, profile: false });
                                    handleSwitchProfiles(p, device);
                                  }}
                                  className="px-3 py-2 hover:bg-[#3A3A3A] cursor-pointer text-xs sm:text-sm text-white transition-colors text-left"
                                >
                                  {p.profileName}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Modes */}
                  <div>
                    <p className="text-xs text-[#888888] mb-3">Modes</p>
                    <div className="relative">
                      <button
                        onClick={() => {
                          setDropDown({ ...dropDown, mode: true });
                        }}
                        className="w-full flex items-center justify-between bg-[#2A2A2A] px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm border border-[#3A3A3A] hover:border-[#4A4A4A] transition-colors"
                        onBlur={() => {
                          setDropDown({ ...dropDown, mode: false });
                        }}
                      >
                        <span className="text-white truncate">
                          {device.mode}
                        </span>
                        <BsChevronDown
                          size={14}
                          className={`text-gray-400 transition-transform flex-shrink-0 ml-1 ${
                            modeOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {modeOpen && (
                        <div className="absolute left-0 mt-1 w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg shadow-xl z-10 max-h-48 overflow-y-auto">
                          <div className="flex flex-col">
                            {MODES.map((m, i) => (
                              <div
                                key={i}
                                onClick={() => {
                                  setDropDown({ ...dropDown, mode: false });
                                }}
                                className="px-3 py-2 hover:bg-[#3A3A3A] cursor-pointer text-xs sm:text-sm text-white transition-colors text-left"
                              >
                                {m.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-[#282828]  hover:border  hover:border-[#828282] rounded-xl h-[177px] flex flex-col items-center justify-center cursor-pointer transition">
            <div className="flex flex-col items-center">
              <div className="text-2xl">＋</div>
              <p className="text-sm text-gray-300 mt-1">Add New Device</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
