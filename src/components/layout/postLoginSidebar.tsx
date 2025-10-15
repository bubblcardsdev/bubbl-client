"use client";
import React, { ReactNode } from "react";
import {
  BubblLogoWhiteIcon,
  DasboardIcon,
  MyProfileIcon,
  MyDeviceIcon,
  LeadsIcon,
  AnalyticsIcon,
  PricingsIcon,
  SupportIcon,
} from "../common/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
const menuItems = [
  {
    label: "Overview",
    icon: <DasboardIcon />,
    name: "overview",
    path: "/overview",
  },
  {
    label: "My profiles",
    icon: <MyProfileIcon />,
    name: "Editprofile",
    path: "/myprofile",
  },
  {
    label: "My Devices",
    icon: <MyDeviceIcon />,
    name: "mydevice",
    path: "/mydevice",
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
    label: "Shop",
    icon: <ShoppingBag fill="white" stroke ="#282828"/>,
    name: "shop",
    path: "/shop",
  },
  {
    label: "Support",
    icon: <SupportIcon />,
    name: "support",
    path: "/support",
  },
  // {
  //   label: "Settings",
  //   icon: <SettingsIcon />,
  //   name: "settings",
  //   path: "/settings",
  // },
];
type MenuItem = {
  label: string;
  icon: ReactNode;
  name: string;
  path: string;
};
interface PageData {
  title: string;
  name: string;
}
export type FunctionProps ={
  currentPage:PageData;
    children?: ReactNode;
  onSideBarOpen?: () => void;

}
const PostLoginSidebar = (props: FunctionProps) => {
  const { currentPage } = props;
  
  const router = useRouter();
  const handleNavigate = (path: string) => {
    router.push(path);
  };
  return (
    <div className="flex flex-col px-[10px]  ">
      <Link href="/" shallow className="py-5 px-0">
        <BubblLogoWhiteIcon />
      </Link>
      <p className="text-[#7E7E7E] px-5 pb-4">Bubbl board</p>
      <div className="flex flex-col gap-[10px] px-2">
        {menuItems.map((item: MenuItem, index: number) => (
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
      </div>
    </div>
  );
};

export default PostLoginSidebar;
