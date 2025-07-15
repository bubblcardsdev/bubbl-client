import React from "react";
import { Trash2, Plus } from "lucide-react";
import Image from "next/image";
import { FaPhone, FaEnvelope, FaShareAlt, FaQrcode } from "react-icons/fa";
const EditProfile = () => {
  return (
    <div className="p-4">
      <div className="text-sm text-gray-400 mb-4">Profile / Edit</div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Form Section */}
        <div className="w-full lg:max-w-[650px] bg-[#1e1e1e] rounded-2xl p-6 space-y-6">
          {/* Profile Title & Layout */}
          <div className="space-y-4">
            <div>
              <label className="text-sm mb-2 block text-gray-300">
                Profile Title
              </label>
              <input
                type="text"
                defaultValue="Personal"
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white text-sm"
              />
            </div>
            <div>
              <label className="text-sm mb-2 block text-gray-300">
                Profile Layout
              </label>
              <button className="w-full flex justify-between items-center bg-[#2a2a2a] p-[10px] text-sm rounded-lg text-white">
                Ruby <span className="text-gray-400">›</span>
              </button>
            </div>
          </div>

          {/* Profile and Company Logo */}
          <div className="flex flex-col md:flex-row justify-between gap-6 px-6">
            {["Profile Picture", "Company Logo"].map((label, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-sm mb-2 text-gray-300">{label}</span>
                <div className="relative w-[120px] h-[120px] rounded-full border">
                  <Image
                    src="/logo.png"
                    alt="Profile"
                    width={120}
                    height={120}
                    className="rounded-full"
                  />
                  <button className="absolute top-0 right-0 bg-black/60 rounded-full p-2 text-sm text-white">
                    ×
                  </button>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  (120px * 120px)
                </span>
              </div>
            ))}
          </div>

          {/* Name and Position */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm mb-1 block text-gray-300">Name</label>
              <input
                type="text"
                placeholder="Sai kishore"
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
              />
            </div>
            <div>
              <label className="text-sm mb-1 block text-gray-300">
                Position
              </label>
              <input
                type="text"
                placeholder="Product Designer"
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="text-sm mb-1 block text-gray-300">
              Mobile number
            </label>
            <div className="flex items-center gap-2 bg-[#2a2a2a] px-0 rounded-lg">
              <input
                type="text"
                placeholder="+91 98406 56566"
                className="w-full rounded-lg bg-[#2a2a2a] p-[10px] outline-none text-white"
              />
              <button className="px-3">
                <Trash2 className="w-4 h-4 text-white" />
              </button>
            </div>
            <button className="mt-2 text-sm flex items-center gap-1 w-full rounded-lg bg-[#2a2a2a] p-3 outline-none text-white">
              <Plus className="w-4 h-4" /> Add Mobile Number
            </button>
          </div>

          {/* Contact Mail */}
          <div>
            <label className="text-sm mb-1 block text-gray-300">
              Contact mail
            </label>
            <input
              type="email"
              placeholder="salesbubbl@gmail.com"
              className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none mb-2 text-white"
            />
            <input
              type="email"
              placeholder="bubbl@gmail.com"
              className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
            />
          </div>

          {/* Website */}
          <div>
            <label className="text-sm mb-1 block text-gray-300">Website</label>
            <div className="flex items-center gap-2 bg-[#2a2a2a] px-3 w-full rounded-lg">
              <input
                type="text"
                placeholder="www.bubbl.cards"
                className="w-full bg-[#2a2a2a] p-[10px] outline-none text-white"
              />
              <button>
                <Trash2 className="w-4 h-4 text-white" />
              </button>
            </div>
            <button className="mt-2 text-sm flex items-center gap-1 w-full justify-center rounded-lg bg-[#2a2a2a] p-3 outline-none text-white">
              <Plus className="w-4 h-4" /> Add website Link
            </button>
          </div>

          {/* Address */}
          <div>
            <label className="text-sm mb-1 block text-gray-300">Address</label>
            <input
              type="text"
              placeholder="floor, street, city..."
              className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
            />
          </div>

          {/* Country, State, City, Zipcode */}
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "Country", placeholder: "India" },
              { label: "State", placeholder: "Tamil Nadu" },
              { label: "City", placeholder: "Chennai" },
              { label: "Zipcode", placeholder: "" },
            ].map(({ label, placeholder }, i) => (
              <div key={i}>
                <label className="text-sm mb-1 block text-gray-300">
                  {label}
                </label>
                <input
                  type="text"
                  placeholder={placeholder}
                  className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
                />
              </div>
            ))}
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm mb-1 block text-gray-300">Bio</label>
            <textarea
              rows={4}
              placeholder="Write your bio here..."
              className="w-full bg-[#2a2a2a] text-gray-300 placeholder:text-gray-400 p-3 border-none outline-none resize-none rounded-lg"
              defaultValue="A biography, or simply bio, is a detailed description of a person's life. It involves more than just basic facts like education, work, relationships, and death; it portrays a person's experience of these life events."
            />
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <h1 className="text-white text-sm font-medium">Social Links</h1>
            {[
              "Instagram",
              "Facebook",
              "YouTube",
              "Twitter",
              "WhatsApp",
              "LinkedIn",
            ].map((platform, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-[#2a2a2a] w-full rounded-lg px-3"
              >
                <p className="text-gray-400">Icon</p>
                <input
                  type="text"
                  placeholder={platform}
                  className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
                />
              </div>
            ))}
          </div>

          {/* Digital Links */}
          <div className="flex flex-col gap-4">
            <h1 className="text-white text-sm font-medium">Digital Link</h1>
            {["Google Pay", "Facebook", "LinkedIn"].map((link, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={link}
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="sticky bottom-0 bg-[#1e1e1e] p-4  flex justify-end gap-3 z-10">
            <button className="bg-[#2a2a2a] text-white px-4 py-2 rounded-lg hover:bg-[#3a3a3a] transition">
              Cancel
            </button>
            <button className="bg-[#a855f7] text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
              Save changes
            </button>
          </div>
        </div>

        {/* Right Preview Section */}
        <div className="w-full lg:w-[400px] flex flex-col  bg-gradient-to-b from-[#1f0128] to-black rounded-2xl  px-6 py-6 mt-6 lg:mt-0 overflow-hidden ">
          <p className="text-gray-400 mb-4 text-center">Live preview</p>
          <div className="w-full max-w-sm rounded-[20px_20px_0_0] bg-[#1f1f1f] text-white overflow-hidden shadow-xl">
            <div className="bg-gradient-to-tr from-[#fde68a] to-[#fca5a5] p-6 flex justify-center">
              <div className="w-24 h-24 rounded-2xl overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="avatar"
                  className="w-full h-full object-cover"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div className="px-6 py-4 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">Bubbl</h2>
                  <p className="text-sm text-gray-400">NFC Business Card</p>
                </div>
                <Image src="/logo.svg" alt="logo" className="h-8 w-auto" width={100} height={100} />
              </div>
              <div className="flex items-center gap-3">
                <button className="flex-1 bg-[#a855f7] text-white rounded-xl py-2 text-sm font-semibold hover:bg-purple-700 transition">
                  Save Contact
                </button>
                <div className="flex gap-2">
                  <button className="bg-[#333] p-2 rounded-xl">
                    <FaShareAlt />
                  </button>
                  <button className="bg-[#333] p-2 rounded-xl">
                    <FaQrcode />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-snug">
                I am a creative problem-solver with a passion for designing
                intuitive, user-centered experiences that make everyday tasks
                easier.
              </p>
              <div className="mt-4">
                <h3 className="text-sm text-gray-400 mb-2">
                  Contact Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-[#2c2c2c] p-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <FaPhone className="text-green-500" />
                      <span className="text-sm">+91 7358139544</span>
                    </div>
                    <FaShareAlt className="text-gray-500 text-sm" />
                  </div>
                  <div className="flex items-center justify-between bg-[#2c2c2c] p-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <FaEnvelope />
                      <span className="text-sm">Support@Bubbl.Cards</span>
                    </div>
                    <FaShareAlt className="text-gray-500 text-sm" />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 pb-4 text-sm text-gray-500">Social Links</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
