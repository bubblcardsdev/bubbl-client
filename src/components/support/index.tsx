"use client";
import React from "react";
import { Location_icon, Phone_icon, MailProfileIcon } from "../common/icons";
import Link from "next/link";

const Support = () => {
  return (
    <div className="text-white mt-5 px-4 md:px-8 lg:px-16">
      <p className="text-lg">Get in touch</p>
      <p className="text-sm mt-1">
        We’d love to hear from you. Please fill out this form.
      </p>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Left Contact Info Panel */}
        <div className="w-full bg-gradient-to-br from-[#8654E1] to-[#1A1A1A] rounded-lg p-6 space-y-6">
          <div className="space-y-4">
            <p className="text-3xl">Let&apos;s Connect</p>
            <p>
              Got questions, feedback, or just want to say hi? We&apos;d <br />
              love to hear from you!
              <br />
              Reach out to our team and we’ll get back to you as <br />
              soon as possible.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-lg bg-[#282828] rounded-full p-3">
              <MailProfileIcon />
            </span>
            <div>
              <p className="font-medium text-[#BDBDBD]">Email</p>
              <p className="text-gray-300 break-words">support@bubbl.cards</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-lg bg-[#282828] rounded-full p-3">
              <Phone_icon />
            </span>
            <div>
              <p className="font-medium text-[#BDBDBD]">Phone</p>
              <p className="text-gray-300">+91 99999 99999</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-lg bg-[#282828] rounded-full p-3">
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

        {/* Right Form Panel */}
        <form className="w-full bg-[#1f1f1f] p-6 rounded-md space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm mb-2 block">First name</label>
              <input
                type="text"
                placeholder="First name"
                className="w-full bg-[#282828] p-3 text-sm text-white placeholder-[#4F4F4F] rounded-md"
              />
            </div>
            <div>
              <label className="text-sm mb-2 block">Last name</label>
              <input
                type="text"
                placeholder="Last name"
                className="w-full bg-[#282828] p-3 text-sm text-white placeholder-[#4F4F4F] rounded-md"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm mb-2 block">Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full bg-[#282828] p-3 text-sm text-white placeholder-[#4F4F4F] rounded-md"
              />
            </div>
            <div>
              <label className="text-sm mb-2 block">Phone number</label>
              <div className="flex items-center bg-[#282828] rounded-md overflow-hidden">
                <span className="text-sm text-white px-3">IND</span>
                <input
                  type="tel"
                  placeholder="+91 0000-00000"
                  className="flex-1 bg-transparent p-3 text-sm text-white placeholder-[#4F4F4F] outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm mb-2 block">Message</label>
            <textarea
              rows={5}
              placeholder="Your message..."
              className="w-full bg-[#282828] p-3 text-sm text-white placeholder-[#4F4F4F] rounded-md"
            />
          </div>

          <div className="flex items-start gap-2 text-sm text-white">
            <input
              type="checkbox"
              className="accent-[#9747FF] h-4 w-4 rounded border border-[#494949] checked:bg-[#D6D3FB]"
            />
            <p className="text-[#B3B3B3]">
              You agree to our friendly{" "}
              <Link
                href="/privacyPolicy"
                className="underline hover:text-[#a66bf4]"
              >
                privacy policy
              </Link>
              .
            </p>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-[#9747FF] hover:bg-[#7a36e4] text-white text-sm px-5 py-2 rounded-md"
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
