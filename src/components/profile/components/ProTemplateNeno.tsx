import React from "react";
import Image from "next/image";
import {
  Share_icon,
  Qr_icon,
  CallProfileIcon,
  MailProfileIcon,
  LocationFill_icon,
  WebIcon_thin,
  InstagramBackgroundFill,
  TwitterIconbackgroundFill,
  FacebookIconbackgroundFill,
  WhatsappIconbackgroundFill,
  YoutubeIconbackgroundFill,
  LinkedinIconbackgroundFill,
  Googlepay_icon,
  Phonepay_icon,
  Paytm_icon,
} from "../../common/icons";
const ProTemplateNeno = () => {
  return (
    <div className="flex  flex-col items-center align-middle justify-between bg-gray-400 ">
      <div className="">
      <div className="bg-gray-500  w-[400px] h-[350px] object-cover rounded-[0_0_20px_20px]">
          <Image
            src="/profile.png"
            alt=""
            height={500}
            width={500}
            className="object-cover"
          />
        </div>
        <div className="relative overflow-hidden min-h-screen w-[400px] bg-black box-border p-5 space-y-4 border border-red-500">
          <div className=" rounded-xl p-4 md:p-5 w-full text-white relative z-10  backdrop-blur bg-opacity border border-gray-400  ">
            <div className="absolute top-0 right-0 bg-gray-500 text-black p-7 rounded-[0_10px_0px_0]">
              <Image
                src="/profile.png"
                alt=""
                width={100}
                height={100}
                className="object-fill h-12 w-12"
              />
            </div>
            <div className="mt-0 flex flex-col gap-y-1">
              <h2 className="text-lg font-semibold">Your Name</h2>
              <p className="text-sm font-semibold tracking-wide text-white/70 ">
                Designation
              </p>
              <p className="text-sm font-semibold tracking-wide text-white/70 ">
                company Name
              </p>
              <p className="text-sm text-white/80 leading-relaxed mt-3">
                Lorem ipsum dolor sit amet, minim veniam incididunt ut labore et
                dolore magna aliqua. Ut enim ad quis nostrud exercitation. , sed
                do eiusmod tempor consectetur adipiscing elit
              </p>
              <div className="flex gap-4 mt-6">
                <button className="flex-1 bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-md">
                  Save Contact
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-md">
                  <Share_icon />
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-md">
                  <Qr_icon />
                </button>
              </div>
            </div>
          </div>
          <div className=" rounded-lg p-4 md:p-5 w-full text-white relative z-10  backdrop-blur bg-opacity border border-gray-400   ">
            <p className="text-xl text-white">Contact Information</p>
            <div className="flex flex-row justify-evenly gap-x-16 mt-6">
              <CallProfileIcon />
              <MailProfileIcon />
              <LocationFill_icon />
              <WebIcon_thin />
            </div>
          </div>
          <div className=" rounded-lg p-4 md:p-5 w-full text-white relative z-10  backdrop-blur bg-opacity border border-gray-400  ">
            <p className="text-xl text-white">Social Media</p>
            <div className="grid grid-cols-4 justify-evenly gap-x-16 mt-6 gap-y-12">
              <InstagramBackgroundFill />
              <TwitterIconbackgroundFill />
              <FacebookIconbackgroundFill />
              <YoutubeIconbackgroundFill />
              <LinkedinIconbackgroundFill />
              <YoutubeIconbackgroundFill />
              <WhatsappIconbackgroundFill />
            </div>
          </div>
          <div className=" rounded-lg p-4 md:p-5 w-full text-white relative z-10  backdrop-blur bg-opacity border border-gray-400">
            <p className="text-xl text-white">Digital Payments</p>
            <div className="grid grid-cols-4 justify-evenly gap-x-16 mt-6">
              <Googlepay_icon />
              <Phonepay_icon color="#8D00D2" />
              <Paytm_icon />
            </div>
          </div>
          {/* <hr className="border-gray-300 mb-4 relative z-10  backdrop-blur bg-opacity border" /> */}
          <div className="flex flex-col justify-center items-center relative z-10  backdrop-blur bg-opacity border border-gray-400 p-4 rounded-lg">
            <p className="text-sm font-semibold mb-4 text-white">
              Go Digital - Save Paper, Trees & Our Earth.
            </p>
            <button className="bg-[#9000FF] text-white px-6 py-2 rounded-lg font-semibold  hover:bg-[#9000FF]">
              Join Now
            </button>
            <p className="text-xs text-gray-500 mt-4">
              Powered by bubbl.cards ®
            </p>
          </div>
          <div className="absolute top-[30px] right-[-100px] h-[200px] w-[200px] bg-gradient-to-r from-[#67b26f] to-[#4ca2cd] rounded-[100%_90%_60%_100%]">
            <div className="absolute top-[200px] left-[-400px] h-[250px] w-[300px] bg-gradient-to-r from-[#67b26f] to-[#4ca2cd] rounded-[100%_100%_90%_100%]">
              <div className="absolute top-[400px] right-[-280px] h-[230px] w-[400px] bg-gradient-to-r from-[#67b26f] to-[#4ca2cd] rounded-[100%_100%_90%_100%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProTemplateNeno;
