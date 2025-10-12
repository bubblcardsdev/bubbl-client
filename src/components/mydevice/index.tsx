"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  getLinkedDevices,
  switchProfile,
} from "@/src/services/devices";
import { isEmpty } from "lodash";
import { Circle } from "lucide-react";
import { BsChevronDown } from "react-icons/bs";
import { MODES } from "@/src/lib/constant";
import { useShowHide } from "@/src/hooks/useShowHide";
import { MyDevice } from "@/src/lib/interface";
import DeviceMenu from "./components/deviceMenu";

interface ProfileList {
  id: number;
  profileName: string;
}

export default function DeviceCards() {

  const initial = {
    profile: false,
    mode: false,
    modeUrl: false,
  };
  // const [dropDown, setDropDown] = useState<DropDowns>(initial);
  const { visible, onShow, onHide } = useShowHide(initial);
  const { profile: profileOpen, mode: modeOpen } = visible;
  const [myDevices, setMyDevices] = useState<MyDevice[]>([]);
  const [profiles, setProfiles] = useState<ProfileList[]>([]);
  const [loading, setLoading] = useState(false);

  const getMydevices = async () => {
    setLoading(true);
    try {
      const response = await getLinkedDevices();
      if (response) {
        setMyDevices(response?.linkedDevices || []);
        setProfiles(response?.profiles || []);
      }
    } catch (e: any) {
      toast.error(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchProfiles = async (
    profile: ProfileList,
    device: MyDevice
  ) => {
    try {
      const response = await switchProfile({
        accountDeviceLinkId: device?.accountDeviceLinkId || null,
        profileId: profile.id || null,
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
  //   modeUrl: string | null
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
  //   }
  // };

  useEffect(() => {
    getMydevices();
  }, []);

  if (loading) return <p className="text-gray-400">Loading...</p>;

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
              device?.deviceStatus === 0 ? "#E9292D" : "#00D729";
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
                  <DeviceMenu
                    data={device}
                    refetch={getMydevices}
                    inActive={device?.deviceStatus === 0}
                  />
                </div>
                {/* Device Image and details */}
                <div className="flex gap-3 items-center">
                  <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                    <h2 className="text-lg mb-1 font-medium truncate max-w-full">
                      {device?.deviceNickName || device?.deviceType}
                    </h2>
                    <p className="text-sm mb-1 max-w-full">
                      Activation date:{" "}
                      <span className="font-extralight">{activationDate}</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm mb-1 truncate font-light max-w-full">
                      {device?.deviceStatus === 0 ? "Deactivated" : "Active"}{" "}
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
                          onShow("profile");
                        }}
                        className="w-full relative flex items-center justify-between bg-[#2A2A2A] px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm border border-[#3A3A3A] hover:border-[#4A4A4A] transition-colors"
                        onBlur={() => {
                          onHide();
                        }}
                      >
                        <span className="text-white w-full truncate text-left">
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
                                    onHide();
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
                          onShow("mode");
                        }}
                        className="w-full flex items-center justify-between bg-[#2A2A2A] px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm border border-[#3A3A3A] hover:border-[#4A4A4A] transition-colors"
                        onBlur={() => {
                          onHide();
                        }}
                      >
                        <span className="text-white truncate text-left">
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
                                  onHide();
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
