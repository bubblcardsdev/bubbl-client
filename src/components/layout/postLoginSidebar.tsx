import React from "react";
import { BubblLogo, GitIcon } from "../common/icons";
import {
  BubblLogoWhiteIcon,
  DasboardIcon,
  MyProfileIcon,
  MyDeviceIcon,
  LeadsIcon,
  AnalyticsIcon,
  PricingsIcon,
  SupportIcon,
  SettingsIcon,
} from "./components/icon";
import { useRouter } from "next/router";
import path from "path";
const menuItems: any = [
  {
    label: "Overview",
    icon: <DasboardIcon />,
    name: "overview",
    path: "/dashboard/overview",
  },
  {
    label: "My profiles",
    icon: <MyProfileIcon />,
    name: "myprofile",
    path: "/myprofile",
  },
  {
    label: "My Devices",
    icon: <MyDeviceIcon />,
    name: "mydevices",
    path: "/mydevices",
  },
  { label: "Leads", icon: <LeadsIcon />, name: "leads", path: "/leads" },
  {
    label: "Analytics",
    icon: <AnalyticsIcon />,
    name: "analytics",
    path: "/analytics",
  },
  {
    label: "Pricings",
    icon: <PricingsIcon />,
    name: "pricings",
    path: "/pricings",
  },
  {
    label: "Support",
    icon: <SupportIcon />,
    name: "support",
    path: "/support",
  },
  {
    label: "Settings",
    icon: <SettingsIcon />,
    name: "settings",
    path: "/dashboard/settings",
  },
];
const PostLoginSidebar = (props: any) => {
  const { currentPage } = props;
  const router = useRouter();
  const handleNavigate = (path: string) => {
    router.push(path);
  };
  return (
    <div className="flex flex-col  px-4">
      <div className="py-5 px-0">
        <BubblLogoWhiteIcon />
      </div>
      <p className="text-gray-500 px-5 pb-4">Bubbl board</p>
      <div className="flex flex-col gap-1 px-2 ">
        {/* <div className=" flex flex-col gap-3 p-3"> */}
        {/* <DasboardIcon />
          <p className="text-white text-[14px]">Overview</p> */}
        {menuItems.map((item: any, index: number) => (
          <div
            role={"button"}
            key={index}
            onClick={() => {
              handleNavigate(item?.path);
            }}
            className={`flex items-center gap-3 px-3 py-2 cursor-pointer 
                text-white text-sm hover:bg-[#FFFFFF1A] rounded-lg transition
                ${item?.name === currentPage?.name ? " bg-[#FFFFFF1A] " : ""} 
               `}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
        {/* </div> */}
        {/* <div className="flex gap-3 p-3">
          <MyProfileIcon />
          <p className="text-white text-[14px]">MyProfile</p>
        </div>
        <div className="flex gap-3 p-3">
          <MyDeviceIcon />
          <p className="text-white text-[14px]">MyDevice</p>
        </div>
        <div className="flex gap-3 p-3">
          <LeadsIcon />
          <p className="text-white text-[14px]">Leads</p>
        </div>
        <div className="flex gap-3 p-3">
          <AnalyticsIcon />
          <p className="text-white text-[14px]">Analytics</p>
        </div>
        <div className="flex  gap-3 p-3">
          <PricingsIcon />
          <p className="text-white text-[14px]">Pricings</p>
        </div>
        <div className=" flex gap-3 p-3">
          <SupportIcon />
          <p className="text-white text-[14px]">Support</p>
        </div>
        <div className="flex  gap-3 p-3">
          <SettingsIcon />
          <p className="text-white text-[14px]">Settings</p>
        </div> */}
      </div>
    </div>
  );
};

export default PostLoginSidebar;
