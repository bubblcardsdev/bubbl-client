"use client";
import React from "react";
import Image from "next/image";
import ProfileImg from "../../../assets/Homeimg/profile.png";
import {
  Share_icon,
  Qr_icon,
  Phone_icon,
  Twitter_icon_thin,
  Paytm_icon,
  Phonepay_icon,
  Googlepay_icon,
  Facebook_icon_thin,
  Linkedin_icon_thin,
  Youtube_icon,
  Mail_icon,
  WebIcon_thin,
  Location_icon,
  Arrow_icon,
  Instagram_icon,
} from "../../common/icons";

function Profile() {
  const socialMedia = [
    { name: "Instagram", username: "@user name", icon: "/instagram.png" },
    { name: "Twitter", username: "@user name", icon: "/twitter.png" },
    { name: "LinkedIn", username: "User name", icon: "/linkedin.png" },
    { name: "Youtube", username: "@user name", icon: "/youtube.png" },
    { name: "Facebook", username: "@user name", icon: "/facebook.png" },
  ];
  return (
    <div className="w-full flex justify-center items-center align-middle bg-[#ccc]">
      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-sm bg-[#EDEDED]  relative overflow-hidden ">
          <div className="absolute top-0 left-0 w-[100%] bg-[#9000FF] h-[165px] rounded-br-[550px] mb-[100px] "></div>
          <div className="relative  flex flex-col items-center  mt-[80px] bg-black rounded-[100px] h-[170px] w-[170px] ml-[100px] outline-none">
            <Image
              src={ProfileImg.src}
              alt="profile_Img"
              width={170}
              height={170}
              className=""
            />
          </div>
          <div className="p-5 space-y-4">
            <div className="flex  justify-between  ">
              <div className="flex flex-col space-y-4">
                <button className="bg-[#9000FF] px-8 py-[10px] text-white rounded-[6px]">
                  save Contact
                </button>
                <div className="space-x-4">
                  <button className="bg-[#9000FF] p-3 rounded-md">
                    <Share_icon />
                  </button>
                  <button className="bg-[#9000FF] p-3 rounded-md">
                    <Qr_icon/>
                  </button>
                </div>
              </div>
              <Image
                src={ProfileImg.src}
                width={110}
                height={110}
                alt="profile_img"
              />
            </div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1">Mary Jane</h1>
              <p className="text-[16px] text-gray-700 mb-2">
                Senior Business Consultant
              </p>
              <p className="text-gray-600 text-sm">
                As a Senior Business Consultant, I specialize in driving results
                through strategic planning, process optimization, and strong
                leadership. My focus is on fostering growth, efficiency, and
                lasting business success.
              </p>
            </div>
            <div className="">
              <h2 className="text-xl font-bold mb-3">Contact Information</h2>
              {/* Contact Items */}
              <div className="space-y-4">
                {/* Phone */}
                <div className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden">
                  <div className="flex-1 flex items-center gap-3 p-4">
                    <  Phone_icon
                    color='#9000FF'/>
                    <span className="ml-1 flex-grow">7358105486</span>
                  </div>
                  <div className="bg-[#9000FF] flex items-center px-3 ">
                    <Arrow_icon />
                  </div>
                </div>
                {/* mail*/}
                <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden">
                  <div className="flex-1 flex items-center gap-3 p-4">
                    <Mail_icon color='#9000FF' />
                    <span className="ml-1 flex-grow">
                      kalaivani@bubbl.cards
                    </span>
                  </div>
                  <div className="bg-[#9000FF] flex items-center px-3 ">
                    <Arrow_icon />
                  </div>
                </div>
                {/* website */}
                <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden mt-4">
                  <div className="flex-1 flex items-center gap-3 p-4">
                    <WebIcon_thin color='#9000FF'/>
                    <span className="ml-1 flex-grow">bubbl.cards</span>
                  </div>
                  <div className="bg-[#9000FF] flex items-center px-3 ">
                    <Arrow_icon />
                  </div>
                </div>
                {/* location */}
                <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden mt-4">
                  <div className="flex-1 flex items-center gap-3 p-4">
                    <Location_icon color='#9000FF' />
                    <span className="ml-1 flex-grow">india</span>
                  </div>
                  <div className="bg-[#9000FF] flex items-center px-3 ">
                    <Arrow_icon />
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <h2 className="text-xl font-bold mb-3">social media</h2>
              <div className="space-y-4 ">
                {/* instagram */}
                <div className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden">
                  <div className="flex-1 flex items-center gap-3 px-4 py-2">
                    <Instagram_icon color='#9000FF' />
                    <div className="px-0">
                      <h1 className=" flex-grow text-black font-semibold text-[16px]">
                        Instagram
                      </h1>
                      <p className="text-[12px]">https://chatgpt.com/c/67a</p>
                    </div>
                  </div>
                  <div className="bg-[#9000FF] flex items-center px-3 ">
                    <Arrow_icon />
                  </div>
                </div>
                {/* twitter*/}
                <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden">
                  <div className="flex-1 flex items-center gap-3 px-4 py-2">
                    <Twitter_icon_thin color='#9000FF' />
                    <div className="px-0">
                      <h1 className=" flex-grow text-black font-semibold text-[16px]">
                        Twitter
                      </h1>
                      <p className="text-[12px]">https://chatgpt.com/c/67a</p>
                    </div>
                  </div>
                  <div className="bg-[#9000FF] flex items-center px-3 ">
                    <Arrow_icon />
                  </div>
                </div>
                {/* linkedin */}
                <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden mt-4">
                  <div className="flex-1 flex items-center gap-3 px-4 py-2">
                    <Linkedin_icon_thin color='#9000FF'/>
                    <div className="px-0">
                      <h1 className=" flex-grow text-black font-semibold text-[16px]">
                        Linkedin
                      </h1>
                      <p className="text-[12px]">https://chatgpt.com/c/67a</p>
                    </div>
                  </div>
                  <div className="bg-[#9000FF] flex items-center px-3 ">
                    <Arrow_icon />
                  </div>
                </div>
                {/* youtube */}
                <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden mt-4">
                  <div className="flex-1 flex items-center gap-3 px-4 py-2">
                    <Youtube_icon color='#9000FF'/>
                    <div className="px-0">
                      <h1 className=" flex-grow text-black font-semibold text-[16px]">
                        Youtube
                      </h1>
                      <p className="text-[12px]">https://chatgpt.com/c/67a</p>
                    </div>{" "}
                  </div>
                  <div className="bg-[#9000FF] flex items-center px-3 text-white  ">
                    <Arrow_icon />
                  </div>
                </div>
                {/* facebook */}
                <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden mt-4">
                  <div className="flex-1 flex items-center gap-3 px-4 py-2">
                    <Facebook_icon_thin color='#9000FF'/>
                    <div className="px-0">
                      <h1 className=" flex-grow text-black font-semibold text-[16px]">
                        Facebook
                      </h1>
                      <p className="text-[12px]">https://chatgpt.com/c/67a</p>
                    </div>{" "}
                  </div>
                  <div className="bg-[#9000FF] flex items-center px-3 ">
                    <Arrow_icon />
                  </div>
                </div>
              </div>
            </div>
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
      </div>
    </div>
  );
}

export default Profile;
