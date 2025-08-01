"use client";
import React, { useState } from "react";
import Image from "next/image";
import Password from "../settings/components/password";
import {Plus} from "lucide-react";

const Settings: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setImage(URL.createObjectURL(file));
    } else {
      alert("Please upload an image smaller than 2MB.");
    }
  };

  const removeImage = () => {
    setImage(null);
  };
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
    country: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // const [profilePic, setProfilePic] = useState("/avatar.png");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.phone.match(/^\+?[0-9\s]+$/))
      newErrors.phone = "Invalid phone number";
    if (!formData.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Invalid email address";
    if (!formData.dob) newErrors.dob = "DOB is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.country) newErrors.country = "Country is required";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Submitting:", formData);
    }
  };
  return (
    <React.Fragment>
      <div className="mt-[5px]">
        <p className="text-md text-white mb-2">Personal Info</p>
        <p className="text-[#828282] mb-4">
          Update your photo and personal details here.
        </p>
      </div>
      <hr className="py-[0px] border-[#494949]" />
      <div className="bg-[#1f1f1f] text-white p-6 rounded-xl shadow mt-8">
        <h2 className="text-lg font-semibold mb-1">Profile Picture</h2>
        <p className="text-sm text-gray-400 mb-4">
          This will be displayed on your profile.
        </p>
        {/* <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col items-start sm:items-center lg:gap-[150px] sm:gap-[50px] xs:gap-[50px] justify-around mt-[40px] ">
          <div className="relative w-20 h-20">
            <Image
              src="/profile.png"
              alt="Profile"
              fill
              className="rounded-full object-cover"
            />
            <button
              type="button"
              // onClick={() => setProfilePic("/avatar.png")}
              className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
            >
              x
            </button>
          </div>
          <p className="text-xs text-gray-400">(upload max 2mb)</p>
          <button className="bg-white text-black px-4 py-[8px] rounded text-sm hover:bg-gray-200">
            Update
          </button>
        </div> */}
        <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col items-start sm:items-center lg:gap-[150px] sm:gap-[50px] xs:gap-[50px] justify-around mt-[40px]">
          <div className="relative w-20 h-20 border rounded-full">
            {image ? (
              <Image
                src={image}
                alt="Profile"
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <Image
                src=""
                alt="img"
                fill
                className="rounded-full object-cover"
              />
            )}

            {image && (
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
              >
                x
              </button>
            )}
          </div>

          <p className="text-xs text-gray-400">(upload max 2mb)</p>

          <div className="flex flex-col items-center">
            <label className="bg-white text-black px-4 py-[8px] rounded text-sm hover:bg-gray-200 cursor-pointer">
              upload
              <div className="absolute inset-0 w-[120px] h-[120px] top-7  opacity-100 group-hover:bg-black/50 flex items-center justify-center text-white text-xs transition rounded-full">
                <Plus size={16} />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {/* {image && (
              <button className="bg-white text-black px-4 py-[8px] rounded text-sm hover:bg-gray-200">
                Update
              </button>
            )} */}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-[60px] grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="text-sm">User Name</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="w-full mt-[8px] p-2 rounded-lg bg-[#282828] text-white placeholder:text-gray-500  placeholder:text-[14px]"
            />
            {errors.username && (
              <p className="text-xs text-red-400">{errors.username}</p>
            )}
          </div>
          <div>
            <label className="text-sm">Phone number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full mt-[8px] p-2 rounded-lg bg-[#282828] text-white placeholder:text-gray-500  placeholder:text-[14px] "
            />
            {errors.phone && (
              <p className="text-xs text-red-400">{errors.phone}</p>
            )}
          </div>
          <div>
            <label className="text-sm">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-[8px] p-2 rounded-lg bg-[#282828] text-white placeholder:text-gray-500  placeholder:text-[14px] border-none"
            />
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="text-sm">DOB</label>
            <input
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              placeholder="Enter your DOB"
              className="w-full mt-[8px] p-2 rounded-lg bg-[#282828] text-white placeholder:text-gray-500  placeholder:text-[14px] border-none"
            />
            {errors.dob && <p className="text-xs text-red-400">{errors.dob}</p>}
          </div>
          <div>
            <label className="text-sm">Gender</label>
            <input
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Enter Your Gender"
              className="w-full mt-[8px] p-2 rounded-lg bg-[#282828] text-white placeholder:text-gray-500 placeholder:text-[14px] border-none"
            />
            {errors.gender && (
              <p className="text-xs text-red-400">{errors.gender}</p>
            )}
          </div>
          <div>
            <label className="text-sm">Country</label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter your Country"
              className="w-full mt-[8px] p-2 rounded-lg bg-[#282828] text-white placeholder:text-gray-500  placeholder:text-[14px] border-none"
            />
            {errors.country && (
              <p className="text-xs text-red-400">{errors.country}</p>
            )}
          </div>
        </form>

        <div className="mt-6 flex justify-end gap-3 flex-wrap">
          <button
            type="button"
            className="px-4 py-2 bg-[#282828] text-white rounded-lg hover:bg-[#3a3a3a]"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#a855f7] text-white rounded-lg hover:bg-[#9333ea]"
          >
            Save changes
          </button>
        </div>
      </div>
      <Password />
    </React.Fragment>
  );
};

export default Settings;
