"use client";
import React, { useState } from "react";
import Image from "next/image";
import ShreIcon from "../../common/Icons/share_icon";
import QrIcon from "../../common/Icons/qr_icon";
import Logo from "../../../assets/product/productCardImg/Bubbl_band.png";
import PhoneIcon from '../../common/Icons/caller_icon';
import MailIcon from '../../common/Icons/mail_icon';
import WebsiteIcon from '../../common/Icons/website_icon';
import LocationIcon from '../../common/Icons/location_icon';
import InstagramIcon from '../../common/Icons/instagram_icon';
import WhatsappIcon from '../../common/Icons/website_icon';
import FacebookIcon from '../../common/Icons/facebook_icon';
import LinkedinIcon from '../../common/Icons/linkedin_icon';
import TwitterIcon from '../../common/Icons/twitter_icon';
import Googlepay_Icon from '../../common/Icons/googlepay_icon';
import Phonepay_Icon from '../../common/Icons/phonepay_icon';
import PaytmIcon from '../../common/Icons/paytm_icon'
const profileProTemplateTwo = () => {
  const [openSection, setOpenSection] = useState("");
  const toggleSection = (section: any) => {
    setOpenSection(openSection === section ? "" : section);
  };
  return (
    <div className="w-full max-w-[400px] mx-auto overflow-hidden">
      <div className=" bg-gray-200 h-[350px]">
        {/* <Image src='/metalCards/patten1.png' alt='' width={100} height={100} className='object-cover' /> */}
      </div>

      <div className="px-6 py-8 w-full space-y-3 bg-white">
        <div className="relative rounded-lg w-fit h-34 bg-[#ccc] flex items-center flex-row border">
          {/* Text Content */}
          <div className="relative w-[300px] h-34 p-2">
            <p className="text-lg font-bold text-purple-600">Your Name</p>
            <p className="text-[16px] text-gray-700">Designation</p>
            <p className="text-[14px] text-gray-600 w-[80%] ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eius roundemod tempor incididunt
            </p>
          </div>
          {/* Logo Div (Overlapping) */}
          <div className=" bg-black h-[100px] w-[100px] absolute  -right-8 flex items-center">
            <p className="text-white font-semibold">
              <Image src={Logo} alt="" />
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-0">
          {/* Save Contact Button with Share Icon */}
          <div className="flex items-center justify-between rounded-lg border-2 border-purple-600  flex-1 h-[45px]">
            <button className="flex-1  h-fit w-[10px]">
              <span className="text-sm text-purple-600 font-semibold">
                Save Contact
              </span>
            </button>
            <div className="border-l-2 border-l-purple-600 h-full flex items-center text-purple-600 px-2">
              <ShreIcon color={"#9000FF"} />
            </div>
          </div>
          {/* QR Code Button */}
          <button className="p-[10px] bg-purple-600 rounded-lg">
            <QrIcon />
          </button>
        </div>
        <div className="p-2">
          {/* Contact Information */}
          <h2 className="text-lg font-bold mb-4">Contact Information</h2>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="relative flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <PhoneIcon color={'#9000FF'} />
              <span className="absolute -top-1 -right-2 bg-purple-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                2
              </span>
            </div>
            <div className="relative flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <MailIcon  color={'#9000FF'} />
              <span className="absolute  -top-1 -right-2 bg-purple-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                2
              </span>
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <LocationIcon  color={'#9000FF'}/>
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <WebsiteIcon color={'#9000FF'} />
            </div>
          </div>
          {/* Social Media */}
          <h2 className="text-lg font-bold mb-4">Social Media</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <InstagramIcon color={'#9000FF'}/>
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <WhatsappIcon color={'#9000FF'} />
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <FacebookIcon color={'#9000FF'} />
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <LinkedinIcon  color={'#9000FF'}/>
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <TwitterIcon color='red' />
            </div>
            
          </div>
          <h2 className="text-lg font-bold mb-6">Digital payments</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <Googlepay_Icon />
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <Phonepay_Icon />
            </div>
            <div className="flex items-center justify-center w-14 h-14 bg-[#ccc] rounded-md shadow-md">
              <PaytmIcon />
            </div>
          </div>
          <hr className="border-gray-300 mb-1 mt-4 border-1 " />
          <div className="flex flex-col justify-center items-center">
            <p className="text-sm font-semibold mb-4 mt-3">
              Go Digital - Save Paper, Trees & Our Earth.
            </p>
            <button className="bg-[#9000FF] text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-[#9000FF]">
              Join Now
            </button>
            <p className="text-xs text-gray-500 mt-4">
              Powered by bubbl.cards ®
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default profileProTemplateTwo;
