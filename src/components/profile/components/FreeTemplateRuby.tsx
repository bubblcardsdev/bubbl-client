"use client";
import React from "react";
import Image from "next/image";
import {
  Share_icon,
  Qr_icon,
  PhoneColorIcon,
  Arrow_icon,
  MapIconBackgroundFill,
  MailIconbackgroundFill,
  WebIconBackgroundFill,
  InstagramBackgroundFill,
  TwitterIconbackgroundFill,
  LinkedinIconbackgroundFill,
  YoutubeIconbackgroundFill,
  FacebookIconbackgroundFill,
  WhatsappIconbackgroundFill,
  Googlepay_icon,
  Paytm_icon,
  Phonepay_icon,
} from "../../common/icons";
const FreeTemplateRuby = () => {
  return (
    <div className="flex items-center align-middle justify-center">
      <div className="relative w-full max-w-sm">
        <div className="h-[230px] bg-yellow-500  rounded-t-2xl ">
          <Image
            src="/profile.png"
            alt="profile"
            width={400}
            height={400}
            className="blur-sm"
          />
        </div>
        <div className="bg-white rounded-2xl  pt-20 pb-6 px-6 -mt-20 relative z-10  ">
          <div className="absolute -top-[70px] left-1/2 transform -translate-x-1/2 z-20">
            <div className="w-[140px] h-[140px] rounded-[20px] bg-gray-200 flex items-center justify-center">
              <Image
                src="/profile.png"
                alt="profile"
                width={150}
                height={150}
                className="flex items-center justify-center "
              />
            </div>
          </div>
          <div className="flex justify-between items-start mt-6 ">
            <div className="text-left flex flex-col gap-1">
              <p className="text-black text-xl font-bold">Name </p>
              <p className="text-black text-md">Designation</p>
              <p className="text-black text-md">company name</p>
            </div>
            <div className="bg-gray-100 p-1 rounded-xl  text-sm font-semibold text-gray-800">
              <Image src="/profile.png" alt="logo" width={80} height={80} />
            </div>
          </div>
          <div className="mt-6 flex gap-3 ">
            <button className="bg-gray-100 text-lg text-purple-600 font-semibold p-[10px]  rounded-[10px] w-[70%]">
              Save Contact
            </button>
            <button className="bg-gray-100 text-purple-500 p-[10px] rounded-[10px] w-[15%] ">
              <span className="flex items-center align-middle justify-center">
                <Share_icon color={"#9000FF"} />
              </span>
            </button>
            <button className="bg-gray-100 text-purple-500 p-[10px] rounded-[10px] w-[15%]">
              <span className="flex items-center align-middle justify-center">
                <Qr_icon color={"#9000FF"} />
              </span>
            </button>
          </div>
          <p className="text-gray-700 text-sm mt-6 border-l-2 border-purple-500 pl-3 w-full">
            Embrace the future of networking with our NFC on to in digital
            business cards, Sharing your contact information is just a tap away
            aring your contact information is just a tap away
          </p>
          <div className="py-4">
            <h2 className="text-xl font-bold mb-3">Contact Information</h2>
            <div className="space-y-4">
              {/* Phone */}
              <div className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden">
                <div className="flex-1 flex items-center gap-3 p-4">
                  <PhoneColorIcon />
                  <span className="ml-1 flex-grow">7358105486</span>
                </div>
                <div className="bg-[#E5E5E5] flex items-center px-3 ">
                  <Arrow_icon color="#9000FF" />
                </div>
              </div>
              {/* mail*/}
              <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden">
                <div className="flex-1 flex items-center gap-3 p-4">
                  {/* <Image
                    src="/mailIcon.png"
                    alt="mailIcon"
                    width={1000}
                    height={1000}
                    className="h-8 w-8"
                  /> */}
                  <MailIconbackgroundFill />
                  <span className="ml-1 flex-grow">kalaivani@bubbl.cards</span>
                </div>
                <div className="bg-[#E5E5E5] flex items-center px-3 ">
                  <Arrow_icon color="#9000FF" />
                </div>
              </div>
              {/* website */}
              <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden mt-4">
                <div className="flex-1 flex items-center gap-3 p-4">
                  <WebIconBackgroundFill />
                  <span className="ml-1 flex-grow">bubbl.cards</span>
                </div>
                <div className="bg-[#E5E5E5] flex items-center px-3 ">
                  <Arrow_icon color="#9000FF" />
                </div>
              </div>
              {/* location */}
              <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden mt-4">
                <div className="flex-1 flex items-center gap-3 p-4">
                  <MapIconBackgroundFill />
                  <span className="ml-1 flex-grow">india</span>
                </div>
                <div className="bg-[#E5E5E5] flex items-center px-3 ">
                  <Arrow_icon color="#9000FF" />
                </div>
              </div>
            </div>
          </div>
          <div className="py-4">
            <h2 className="text-xl font-bold mb-4 ">Social Media</h2>
            <div className="space-y-4 ">
              {/* instagram */}
              <div className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden">
                <div className="flex-1 flex items-center gap-3 px-4 py-2">
                  <InstagramBackgroundFill />
                  <div className="px-0">
                    <h1 className=" flex-grow text-black font-semibold text-[16px]">
                      Instagram
                    </h1>
                    <p className="text-[12px]">https://chatgpt.com/c/67a</p>
                  </div>
                </div>
                <div className="bg-[#E5E5E5] flex items-center px-3 ">
                  <Arrow_icon color="#9000FF" />
                </div>
              </div>
              {/* twitter*/}
              <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden">
                <div className="flex-1 flex items-center gap-3 px-4 py-2">
                  <TwitterIconbackgroundFill />
                  <div className="px-0">
                    <h1 className=" flex-grow text-black font-semibold text-[16px]">
                      Twitter
                    </h1>
                    <p className="text-[12px]">https://chatgpt.com/c/67a</p>
                  </div>
                </div>
                <div className="bg-[#E5E5E5] flex items-center px-3 ">
                  <Arrow_icon color="#9000FF" />
                </div>
              </div>
              {/* linkedin */}
              <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden mt-4">
                <div className="flex-1 flex items-center gap-3 px-4 py-2">
                  <LinkedinIconbackgroundFill />
                  <div className="px-0">
                    <h1 className=" flex-grow text-black font-semibold text-[16px]">
                      Linkedin
                    </h1>
                    <p className="text-[12px]">https://chatgpt.com/c/67a</p>
                  </div>
                </div>
                <div className="bg-[#E5E5E5] flex items-center px-3 ">
                  <Arrow_icon color={"#9000FF"} />
                </div>
              </div>
              {/* youtube */}
              <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden mt-4">
                <div className="flex-1 flex items-center gap-3 px-4 py-2">
                  <YoutubeIconbackgroundFill />
                  <div className="px-0">
                    <h1 className=" flex-grow text-black font-semibold text-[16px]">
                      Youtube
                    </h1>
                    <p className="text-[12px]">https://chatgpt.com/c/67a</p>
                  </div>
                </div>
                <div className="bg-[#E5E5E5] flex items-center px-3 text-white  ">
                  <Arrow_icon color="#9000FF" />
                </div>
              </div>
              {/* facebook */}
              <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden mt-4">
                <div className="flex-1 flex items-center gap-3 px-4 py-2">
                  <FacebookIconbackgroundFill />
                  <div className="px-0">
                    <h1 className=" flex-grow text-black font-semibold text-[16px]">
                      Facebook
                    </h1>
                    <p className="text-[12px]">https://chatgpt.com/c/67a</p>
                  </div>
                </div>
                <div className="bg-[#E5E5E5] flex items-center px-3 ">
                  <Arrow_icon color="#9000FF" />
                </div>
              </div>
              <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden mt-4">
                <div className="flex-1 flex items-center gap-3 px-4 py-2">
                  <WhatsappIconbackgroundFill />
                  <div className="px-0">
                    <h1 className=" flex-grow text-black font-semibold text-[16px]">
                      Whatsapp
                    </h1>
                    <p className="text-[12px]">https://chatgpt.com/c/67a</p>
                  </div>
                </div>
                <div className="bg-[#E5E5E5] flex items-center px-3 ">
                  <Arrow_icon color="#9000FF" />
                </div>
              </div>
            </div>
          </div>
          <div className="py-4">
            <h2 className="text-xl font-bold mb-4">Digital Payments</h2>
            <div className="space-y-4 ">
              <div className="w-full bg-[#F4F4F4] rounded-md flex items-stretch overflow-hidden">
                <div className="flex-1 flex items-center gap-3 px-4 py-2">
                  <Googlepay_icon />
                  <div className="px-0">
                    <h1 className=" flex-grow text-black font-semibold text-[16px]">
                      Gpay
                    </h1>
                    <p className="text-[12px]">https://chatgpt.com/c/67a</p>
                  </div>
                </div>
                <div className="bg-[#E5E5E5] flex items-center px-3 ">
                  <Arrow_icon color="#9000FF" />
                </div>
              </div>
              <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden">
                <div className="flex-1 flex items-center gap-3 px-4 py-2">
                  <Phonepay_icon color='#673594' />
                  <div className="px-0">
                    <h1 className=" flex-grow text-black font-semibold text-[16px]">
                      Phone pay
                    </h1>
                    <p className="text-[12px]">https://chatgpt.com/c/67a</p>
                  </div>
                </div>
                <div className="bg-[#E5E5E5] flex items-center px-3 ">
                  <Arrow_icon color="#9000FF" />
                </div>
              </div>
              <div className="w-full bg-[#F4F4F4] rounded-md mb-4 flex items-stretch overflow-hidden mt-4">
                <div className="flex-1 flex items-center gap-3 px-4 py-2">
                  <Paytm_icon />
                  <div className="px-0">
                    <h1 className=" flex-grow text-black font-semibold text-[16px]">
                      paytm
                    </h1>
                    <p className="text-[12px]">https://chatgpt.com/c/67a</p>
                  </div>
                </div>
                <div className="bg-[#E5E5E5] flex items-center px-3 ">
                  <Arrow_icon color="#9000FF" />
                </div>
              </div>
            </div>
          </div>
          <hr className="border-gray-300 mb-4" />
          <div className="flex flex-col justify-center items-center">
            <p className="text-sm font-semibold mb-4">
              Go Digital - Save Paper, Trees & Our Earth.
            </p>
            <button className="bg-[#9000FF] text-white px-6 py-2 rounded-lg font-semibold  hover:bg-[#9000FF]">
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
export default FreeTemplateRuby;
