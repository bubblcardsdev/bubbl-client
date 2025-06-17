"use client";
import React from "react";
import { Location_icon, Phone_icon, MailProfileIcon } from "../common/icons";
import { useRouter } from "next/router";
const Support = () => {

  const router = useRouter();
  return (
    <div className="text-white mt-[5px] ">
      <p className="text-lg">Get in touch</p>
      <p className="text-sm mt-1">
        We’d love to hear from you. Please fill out this form.
      </p>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-4 mt-4  ">
        <div className="text-sm grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1  gap-y-[30px]  w-[450px] bg-gradient-to-br from-[#8654E1] to-[#1A1A1A] rounded-lg p-6">
          <div className="mt-0 flex flex-col gap-y-[20px]">
            <p className="text-3xl">Let&apos;s Connect </p>
            <p className="">Got questions, feedback, or just want to say hi? We&apos;d <br/>love to hear from you!<br/>Reach out to our team and we’ll get back to you as <br/>soon as possible.</p>
          </div>
          <div className="flex items-center gap-4 ">
            <span className="text-lg bg-[#282828] rounded-full p-[10px]">
              <MailProfileIcon />
            </span>
            <div>
              <p className="font-medium text-[#BDBDBD]">Email</p>
              <p className="text-gray-300">support@bubbl.cards</p>
            </div>
          </div>
          <div className="flex items-center gap-4 ">
            <span className="text-lg bg-[#282828] rounded-full p-[10px]">
              <Phone_icon />
            </span>
            <div>
              <p className="font-medium text-[#BDBDBD]">Phone</p>
              <p className="text-gray-300">+91 99999 99999</p>
            </div>
          </div>
          <div className="flex items-center gap-4 ">
            <span className="text-lg bg-[#282828] rounded-full p-[10px]">
              <Location_icon />
            </span>
            <div>
              <p className="font-medium text-[#BDBDBD]">Office</p>
              <p className="text-gray-300 leading-relaxed">
                No. 6/9,
                <br /> 3rd cross street, Cit colony,
                <br />
                Chennai, Tamilnadu - 600004.
              </p>
            </div>
          </div>
        </div>
        <form className="w-full bg-[#333333] p-6 rounded-md space-y-5 ">
          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 gap-4">
            <div>
              <label className="text-sm mb-2 block text-white">
                First name
              </label>
              <input
                type="text"
                placeholder="First name"
                className="w-full bg-[#282828]  p-3 text-sm text-white placeholder-[#4F4F4F] rounded-md"
              />
            </div>
            <div>
              <label className="text-sm mb-2 block text-white">Last name</label>
              <input
                type="text"
                placeholder="Last name"
                className="w-full bg-[#282828]  p-3 text-sm text-white placeholder-[#4F4F4F] rounded-md"
              />
            </div>
          </div>
          <div className="grid xl:grid-cols-2 xs:grid-cols-1  gap-4">
            <div>
              <label className="text-sm mb-2 block text-white">Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full bg-[#282828]  p-3 text-sm text-white placeholder-[#4F4F4F] rounded-md"
              />
            </div>
            <div>
              <label className="text-sm mb-2 block text-white">
                Phone number
              </label>
              <div className="flex items-center bg-[#282828]  rounded-md overflow-hidden">
                <ol className="bg-[#282828] text-white text-sm px-3 outline-none ">
                  <li>IND</li>
            
                </ol>
                <input
                  type="tel"
                  placeholder="+91 0000-00000"
                  className="flex-1 bg-transparent p-3 text-sm text-white placeholder-[#4F4F4F] outline-none"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm mb-2 block text-white">Message</label>
            <textarea
              rows={6}
              className="w-full bg-[#282828]  text-sm text-white placeholder-[#4F4F4F] rounded-md"
            />
          </div>

          <div className="flex items-start space-x-2 text-sm text-white">
            <input
              type="checkbox"
              className="accent-[#9747FF] appearance-none h-[16px] w-[17px] rounded-md border border-[#494949] bg-transparent checked:bg-[#D6D3FB] checked:border-none checked:text-black flex items-center justify-center checked:after:content-['✓'] checked:after:text-[12px] checked:after:font-bold checked:after:flex checked:after:justify-center checked:after:items-cente"
            />
            <p className="text-[#B3B3B3]">
              You agree to our friendly
              <a className="underline text-[#B3B3B3]" onClick={()=>router.push("/privacyPolicy")}>
                privacy policy
              </a>
              .
            </p>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-[#9747FF] hover:bg-[#9747FF] text-white text-[14px] text-nowrap text-center px-5 py-2 rounded-md sm:w-[150px] xs:w-[150px] left-0"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Support;
