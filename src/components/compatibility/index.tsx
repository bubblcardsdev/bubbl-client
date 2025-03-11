'use client';
import React from 'react'
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Apple_icon from '../common/Icons/apple_icon'
import Nothing_icon from '../common/Icons/nothing_icon'
import Samsung_icon from '../common/Icons/samsung_icon'
import Google_icon from '../common/Icons/google_icon'
import Lg_icon from '../common/Icons/lg_icon'
import Huawei_icon from '../common/Icons/huawei_icon'
import Htc_icon from '../common/Icons/htc_icon'
import Oneplus_icon from '../common/Icons/oneplus_icon'
import Mi_icon from '../common/Icons/mi_icon'
import Sony_icon from '../common/Icons/sony_icon'
import Nokia_icon from '../common/Icons/nokia_icon'
import Footer from '../footerPage/footerPage'

const devices = [
  {
    brand: <Apple_icon />,
    models: [
      'iPhone XR',
      'iPhone XS/XS Max',
      'iPhone 11 Models (Pro, Max, etc.)',
      'iPhone 12 Models',
      'iPhone 13 Models',
      'iPhone 14 Models',
      'iPhone SE',
      'iPhone 7, iPhone 8, iPhone X (must use the NFC scanner in the control center)',
      'All future iPhones',
    ],
  },
  {
    brand: <Nothing_icon />,
    models: ['iPhone XR',
      'iPhone XS/XS Max',
      'iPhone 11 Models (Pro, Max, etc.)',
      'iPhone 12 Models',
      'iPhone 13 Models',
      'iPhone 14 Models',
      'iPhone SE',
      'iPhone 7, iPhone 8, iPhone X (must use the NFC scanner in the control center)',
      'All future iPhones',]
  },
  {
    brand: <Samsung_icon />,
    models: ['iPhone 12 Models',
      'iPhone 13 Models',
      'iPhone 14 Models',
      'iPhone SE',
      'iPhone 7, iPhone 8, iPhone X (must use the NFC scanner in the control center)',
      'All future iPhones']
  },
  {
    brand: <Google_icon />,
    models: ['iPhone 14 Models',
      'iPhone SE',]
  },
  {
    brand: <Lg_icon />, models: [
      'iPhone 13 Models',
      'iPhone 14 Models',
      'iPhone SE',
    ]
  },
  {
    brand: <Huawei_icon />, models: [
      'iPhone SE',
      'iPhone 7, iPhone 8, iPhone X (must use the NFC scanner in the control center)',
    ]
  },
  {
    brand: <Htc_icon />, models: [
      'iPhone SE',
    ]
  },
  {
    brand: <Oneplus_icon />, models: [
      'iPhone 13 Models',
      'iPhone 14 Models',
      'iPhone SE',
    ]
  },
  {
    brand: <Mi_icon />, models: [
      'iPhone 13 Models',
      'iPhone 13 Models',
      'iPhone 14 Models',
      'iPhone SE',
    ]
  },
  {
    brand: <Sony_icon />, models: ['iPhone 13 Models',
      'iPhone 14 Models',
      'iPhone SE',]
  },
  {
    brand: <Nokia_icon />, models: ['iPhone 13 Models',
      'iPhone 14 Models',
      'iPhone SE',]
  },
];
const CompatibilityPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section className=' bg-black text-white'>
      <div className=" bg-black text-white p-4 md:p-12 ">
        <div className="max-w-[1300px] mx-auto mt-[80px] ">
          <nav className="text-gray-400 text-sm mb-4 ">Home &gt; Device List</nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 mt-3">All Compatible Devices</h1>
          <p className="text-gray-400 mb-6">
            You can use bubbl with all devices to share your profile. Compatibility is only important when it comes to the reader
            or activating the bubblcard. Bubbl is compatible with iPhone XR or newer (iPhone 7, iPhone 8, iPhone X must use the NFC scanner in
            the control center) and most Androids. It’s also possible to share your profile with almost any device using the URL or QR-Code.
          </p>
          <div className=' border-t  border-gray-400 mt-8'>
            {devices?.map((device, index) => (
              <div key={device?.id || `${device?.brand}-${index}`} className="border-b border-gray-400 py-2 mt-4">
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
                      device.models.map((model, i) => <li key={i}>• {model}</li>)
                    ) : (
                      <li className="text-gray-500">No specific models listed</li>
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </section>
  )
}

export default CompatibilityPage
