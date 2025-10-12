"use client";
import React from "react";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  AppleIcon,
  NothingIcon,
  SamsungIcon,
  Google,
  LgIcon,
  HuaweiIcon,
  HtcIcon,
  OneplusIcon,
  XiaomiIcon,
  SonyIcon,
  NokiaIcon,
} from "../common/icons";

import { ReactNode } from "react";

type DeviceBrand = {
  brand: ReactNode;
  models: string[];
};

const devices: DeviceBrand[] = [
  {
    brand: <AppleIcon />,
    models: [
      "iPhone XR",
      "iPhone XS/XS Max",
      "iPhone 11 Models (Pro, Max, etc.)",
      "iPhone 12 Models",
      "iPhone 13 Models",
      "iPhone 14 Models",
      "iPhone SE",
      "iPhone 7, iPhone 8, iPhone X (must use the NFC scanner in the control center)",
      "All future iPhones",
    ],
  },
  {
    brand: <NothingIcon />,
    models: [
      "Nothing 1",
      "Nothing 2",
      "Nothing phone 2a",
      "Nothing 3a pro",
      "Nothing 3a",
    ],
  },
  {
    brand: <SamsungIcon />,
    models: [
      " Note 8",
      "      Note 9",
      "  Note 10",

      "Note 10+",

      "  Note 20 Models",

      "and all future Samsung Phones",
    ],
  },
  {
    brand: <Google />,
    models: [
      " Pixel/XL",
      "Pixel 2/2XL",

      "Pixel 3/3XL",

      "Pixel 3A/3aXL",

      "Pixel 4",

      " and all future Pixel Phones",
    ],
  },
  {
    brand: <LgIcon />,
    models: [
      "G3",

      "  Nexus 5X",

      "V10",

      "G4",

      "K10",

      " V20",

      "G5",

      "G6",

      " V30",

      " V35 ThinQ",

      "Q Stylus",

      " Q Stylo 4",

      "V40 ThinQ",

      " V50 ThinQ 5G",

      "Q8",

      "Q7",

      "G7 ThinQ",

      "G8",

      " G8s ThinQ",

      "Q9",

      " One",

      "and all future LG Phones",
    ],
  },
  {
    brand: <HuaweiIcon />,
    models: [
      "P10/Plus/P10 Lite",

      "P20/Pro/Lite,",

      "P30/Pro/Lite",

      " and all future Huawei Phones",
    ],
  },
  {
    brand: <HtcIcon />,
    models: [
      "One M9",

      "Desire 10 Pro",

      "Exodus 1",

      "U11/Life/+",

      "Desire 12/12+",

      "U11 Eyes",

      "U12 Life",

      "U12+",

      "U19e",

      "19+",

      "and all future HTC Phones",
    ],
  },
  {
    brand: <OneplusIcon />,
    models: [
      "One",

      "3/3T",
      " 5/5T",

      " 6/5T",

      " 7/For/5G",

      "and all future OnePlus Phones",
    ],
  },
  {
    brand: <XiaomiIcon />,
    models: [
      " Mi Mix",

      "Mi Mix2/S",

      "Mi Mix 3",

      "Mi5/S/Plus",

      "Mi6/X",

      "Mi8/Lte/Pro",

      "Mi9/SE",

      "and all future Xiaomi Phones",
    ],
  },
  {
    brand: <SonyIcon />,
    models: [
      "  Xperia XZ1/Compact",

      " Xperia 1",

      "10/Plus",

      "Xperia XA1/Ultra/Plus",

      " Xperia XZ2/Compact/Premium",

      "Xperia XA2/Ultra/Plus",

      "Xperia XZ3",

      " and all future Sony Phones",
    ],
  },
  {
    brand: <NokiaIcon />,
    models: [
      "iPhone 13 Models",
      " 3",
      " 5",
      " 6",
      "8",
      " 8.1",
      "6.1",
      " 8 Sirocco",
      " 7 Plus",
      " 5.1",
      " 9 PureView",
      " and all future Nokia Phones",
    ],
  },
];

const CompatibilityPage = () => {
  const [openIndex, setOpenIndex] = useState<null | number>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section className=" text-white p-6">
      <div className="max-w-[1300px] mx-auto lg:mt-[80px] md:mt-0 sm:mt-0 xs:mt-0">
        {/* <nav className="text-gray-400 text-sm mb-4 ">
            Home &gt; Device List
          </nav> */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 mt-3">
          All Compatible Devices
        </h1>
        <p className="text-gray-400 mb-6">
          You can use bubbl with all devices to share your profile.
          Compatibility is only important when it comes to the reader or
          activating the bubblcard. Bubbl is compatible with iPhone XR or newer
          (iPhone 7, iPhone 8, iPhone X must use the NFC scanner in the control
          center) and most Androids. It&apos;s also possible to share your
          profile with almost any device using the URL or QR-Code.
        </p>
        <div className=" border-t  border-gray-400">
          {devices?.map((device: DeviceBrand, index) => (
            <div key={index} className="border-b border-gray-400 p-6">
              <button
                onClick={() => toggleDropdown(index)}
                className="w-full flex justify-between items-center text-left text-lg font-medium focus:outline-none"
              >
                {device.brand}
                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openIndex === index && (
                <ul className="mt-2 text-gray-400 pl-4 space-y-1">
                  {device.models.length ? (
                    device.models.map((model: string, i: number) => (
                      <li key={i}>• {model}</li>
                    ))
                  ) : (
                    <li className="text-gray-500">No specific models listed</li>
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompatibilityPage;
