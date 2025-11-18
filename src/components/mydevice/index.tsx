"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast,ToastContainer } from "react-toastify";
import {
  getLinkedDevices,
  switchMode,
  switchProfile,
} from "@/src/services/devices";
import { isEmpty } from "lodash";
import { Circle } from "lucide-react";
import { DropdownOption, MyDevice } from "@/src/lib/interface";
import DeviceMenu from "./components/deviceMenu";
import DropDown from "../common/dropDown";
import { useShowHideWithRecord } from "@/src/hooks/useShowHideWithRecord";
import MonoColorLoader from "../common/monoColorLoader";
import ModeUrlWindow from "./components/modes";
import { useRouter } from "next/router";
import CreateNewDevice from "./components/createNewDevice";

export default function DeviceCards() {
  const initial = {
    profileVisible: false,
    profileData: null,
    profileTitle: "",
    modeVisible: false,
    modeData: null,
    modeTitle: "",
  };

    const router = useRouter();
  const defaultUID = router?.query?.deviceUid;

  const initialState = router?.query?.deviceUid ? true : false;
  const [show, setShow] = useState(initialState);

  const [myDevices, setMyDevices] = useState<MyDevice[]>([]);
  const [profiles, setProfiles] = useState<DropdownOption[]>([]);
  const [loading, setLoading] = useState(false);
  const { object, onShow, onHide } = useShowHideWithRecord(initial);

  const getMydevices = async () => {
    setLoading(true);
    try {
      const response = await getLinkedDevices();
      if (response) {
        setMyDevices(response?.linkedDevices || []);
        const profiles = response?.profiles?.map((profile: any) => ({
          label: profile?.profileName,
          value: profile?.id,
        }));
        setProfiles(profiles || []);
      }
    } catch (e: any) {
      toast.error(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchProfiles = async (
    profile: DropdownOption,
    device: MyDevice
  ) => {
    try {
      const response = await switchProfile({
        accountDeviceLinkId: device?.accountDeviceLinkId || null,
        profileId: Number(profile.value) || null,
      });
      if (response) {
        setMyDevices((prev) =>
          !isEmpty(prev)
            ? prev.map((record: MyDevice) => {
                if (record.deviceId === device?.deviceId) {
                  return {
                    ...record,
                    profileId: Number(profile.value),
                    profileName: profile.label,
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

  const handleSwitchModes = async (
    device: MyDevice,
    mode: DropdownOption,
    modeUrl?: string | null
  ) => {
    try {
      const response = await switchMode({
        deviceLinkId: device?.deviceLinkId || null,
        accountDeviceLinkId: device?.accountDeviceLinkId,
        modeId: Number(mode.value),
        modeUrl: modeUrl || null,
      });
      if (response) {
        setMyDevices((prev) =>
          !isEmpty(prev)
            ? prev.map((record: MyDevice) => {
                if (record.deviceId === device?.deviceId) {
                  return {
                    ...record,
                    modeId: Number(mode.value),
                    mode: mode.label,
                    modeUrl: modeUrl || null,
                  };
                }
                return record;
              })
            : []
        );
        toast.success("Mode changed successfully!");
      }
    } catch (e: any) {
      toast.error(e?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getMydevices();
  }, [defaultUID]);

  return (
    <div className="text-white mt-4">
      <ToastContainer />
      {loading && (
        <MonoColorLoader message="Loading ..." size={100} color="#b97cff" />
      )}
      {show && (
        <CreateNewDevice
          visible={show}
          onHide={() => {setShow(false); router.push("/mydevice");}}
          profiles={profiles}
          refetch={getMydevices}
        />
      )}
      <div className="flex gap-3 justify-between mb-2 sm:pr-8">
        <h2 className="text-xl font-medium">My Device</h2>
        <button
          className="bg-[#9747FF] px-2 py-1 rounded-md text-xs"
          onClick={() => setShow(true)}
        >
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
                  <DropDown
                    options={[...profiles, { label: "New Profile", value: 0 }]}
                    onShow={() =>
                      onShow(
                        "profileVisible",
                        "profileData",
                        device.deviceId,
                        ""
                      )
                    }
                    
                    onHide={onHide}
                    label="Switch Profiles"
                    visible={
                      object?.profileVisible &&
                      object?.profileData === device?.deviceId
                    }
                    onSelect={(p: DropdownOption) => {
                      if (p.value === 0) {
                        router.push("/createNewProfile");
                      } else {
                        handleSwitchProfiles(p, device);
                      }
                    }}
                    value={device?.profileId || ""}
                  />
                  <ModeUrlWindow
                    data={device}
                    onSave={(device, mode, modeUrl) =>
                      handleSwitchModes(device, mode, modeUrl)
                    }
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div
            className="bg-[#282828]  hover:border  hover:border-[#828282] rounded-xl h-[177px] flex flex-col items-center justify-center cursor-pointer transition"
            onClick={() => setShow(true)}
          >
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
