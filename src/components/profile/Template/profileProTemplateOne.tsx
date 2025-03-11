"use client";
import React from "react";
import Image from "next/image";
import ProfileImg from "../../../assets/Homeimg/profile.png";
import ShareIcon from "../../common/Icons/share_icon";
import Qr_icon from "../../common/Icons/qr_icon";
import Caller_icon from "../../common/Icons/caller_icon";
import Mail_icon from "../../common/Icons/mail_icon";
import Website_icon from "../../common/Icons/website_icon";
import Location_icon from "../../common/Icons/location_icon";
import Arrow_icon from "../../common/Icons/arrow_icon";
import Instagram_icon from "../../common/Icons/instagram_icon";
import Twitter_icon from "../../common/Icons/twitter_icon";
import Linkedin_icon from "../../common/Icons/linkedin_icon";
import Youtube_icon from "../../common/Icons/youtube_icon";
import Facebook_icon from "../../common/Icons/facebook_icon";
import Googlepay_icon from "../../common/Icons/googlepay_icon";
import Phonepay_icon from "../../common/Icons/phonepay_icon";
import Paytm_icon from "../../common/Icons/paytm_icon";
const ProfileProTemplateOne = () => {
  return (
    <div className="w-full max-w-[400px] mx-auto overflow-hidden border border-red-500">
      <div className=" bg-gray-200 h-[350px]">
        {/* <Image src='/metalCards/patten1.png' alt='' width={100} height={100} className='object-cover' /> */}
      </div>
      <div className="p-6 ">
        <div className="border border-red-500">
          <div className=" flex justify-between w-full border border-green-500">
            <div>
              <p>User Name</p>
              <p>Designation</p>
            </div>
            <div className="bg-white w-20 h-20 ml-10">
              <Image src={ProfileImg} alt="" width={100} height={100} />
            </div>
            <p></p>
          </div>
          <div className=""></div>
          <div className=""></div>
        </div>
        <div>contact information</div>
        <div>social media</div>
        <div className="rounded-lg w-full">
          <h2 className="text-xl font-bold mb-4">Digital Payments</h2>
          <div className="flex justify-start gap-4 mb-6">
            <div className="bg-[#F4F4F4] p-3 rounded-lg ">
              <Googlepay_icon />
            </div>
            <div className="bg-[#F4F4F4] p-3 rounded-lg ">
              <Phonepay_icon />
            </div>
            <div className="bg-[#F4F4F4] p-3 rounded-lg ">
              <Paytm_icon />
            </div>
          </div>
          <hr className="border-gray-300 mb-4" />
          <div className="flex flex-col justify-center items-center">
            <p className="text-sm font-semibold mb-4">
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

export default ProfileProTemplateOne;
