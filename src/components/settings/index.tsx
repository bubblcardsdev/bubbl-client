"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ChangePasswordComponent from "../settings/components/password";
import {
  SettingGetuserData,
  UpdateUserImage,
  DeleteUserImage,
  UpdateSettingFormData,
} from "../../services/settings";
import { toast } from "react-toastify";

export interface SettingFormDataType {
  firstName: string;
  lastName: string;
  DOB: string;
  phoneNumber: string;
  email: string;
  gender: string;
  country: string;
  userImage: string;
  updateUserUrl?: string;
}
const INICILAZED_FORM_DATA: SettingFormDataType = {
  firstName: "",
  lastName: "",
  DOB: "",
  phoneNumber: "",
  email: "",
  gender: "",
  country: "",
  userImage: "",
};
const Settings: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(INICILAZED_FORM_DATA);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  // ✅ Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await SettingGetuserData();
        if (res?.userProfile) {
          setFormData({
            firstName: res.userProfile.firstName || "",
            lastName: res.userProfile.lastName || "",
            DOB: res.userProfile.DOB || "",
            phoneNumber: res.userProfile.phoneNumber || "",
            email: res.userProfile.email || "",
            gender: res.userProfile.gender || "",
            country: res.userProfile.country || "",
            userImage: res.userProfile.userImage || "",
          });

          if (res.userProfile.userImage) {
            setImage(res.userProfile.userImage);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  //  Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Handle image upload + API call
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB.");
      return;
    }

    try {
      const res = await UpdateUserImage(file); //  API call

      if (!res?.userImage) {
        setImage(URL.createObjectURL(file)); // fallback preview
        return;
      }
      //  use backend response
      setImage(res.userImage);
      setFormData((prev: any) => ({ ...prev, userImage: res.userImage }));
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload image.");
    }
  };

  //  Handle image delete + API call
  const removeImage = async () => {
    try {
      await DeleteUserImage();
      setImage(null);
      setFormData((prev: any) => ({ ...prev, userImage: "" }));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete image.");
    }
  };

  //  Validation
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.username = "Username is required";
    if (!formData.phoneNumber.match(/^\+?[0-9\s]+$/))
      newErrors.phone = "Invalid phone number";
    if (!formData.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Invalid email address";
    if (!formData.DOB) newErrors.DOB = "DOB is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.country) newErrors.country = "Country is required";
    return newErrors;
  };

  //  Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        const res = await UpdateSettingFormData(formData);
        console.log("Profile updated:", res);
      } catch (err) {
        console.error("Update failed:", err);
      }
    }
  };

  if (loading) {
    return <p className="text-white">Loading user data...</p>;
  }

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

        {/* Profile Image + Upload */}
        <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-3 gap-6 items-center mt-10">
          {/* Profile Image */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 border rounded-full mx-auto lg:mx-0">
            {image ? (
              <Image
                src={image || ""}
                alt="Profile"
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <Image
                src="/profile.png"
                alt="img"
                fill
                className="rounded-full object-cover"
              />
            )}

            {image && (
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-black text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
              >
                x
              </button>
            )}
          </div>

          {/* Info text */}
          <div className="text-center lg:text-left text-xs text-gray-400">
            (Upload max 2MB)
          </div>

          {/* Upload button */}
          <div className="flex justify-center lg:justify-start">
            <label className="bg-white text-black px-4 py-2 rounded text-sm hover:bg-gray-200 cursor-pointer">
              Upload
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* ✅ Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-[60px] grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="text-sm">First Name</label>
            <input
              name="firstName"
              value={formData?.firstName}
              onChange={handleChange}
              placeholder="Enter Your First Name"
              className="w-full mt-2 p-3 rounded-lg bg-[#282828] text-white placeholder:text-gray-500 placeholder:text-sm"
            />
            {errors.username && (
              <p className="text-xs text-red-400">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="text-sm">Phone number</label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full mt-2 p-3 rounded-lg bg-[#282828] text-white placeholder:text-gray-500 placeholder:text-sm"
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
              className="w-full mt-2 p-3 rounded-lg bg-[#282828] text-white placeholder:text-gray-500 placeholder:text-sm"
            />
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm">DOB</label>
            <input
              name="DOB"
              value={formData.DOB}
              onChange={handleChange}
              placeholder="Enter your DOB"
              className="w-full mt-2 p-3 rounded-lg bg-[#282828] text-white placeholder:text-gray-500 placeholder:text-sm"
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
              className="w-full mt-2 p-3 rounded-lg bg-[#282828] text-white placeholder:text-gray-500 placeholder:text-sm"
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
              className="w-full mt-2 p-3 rounded-lg bg-[#282828] text-white placeholder:text-gray-500 placeholder:text-sm"
            />
            {errors.country && (
              <p className="text-xs text-red-400">{errors.country}</p>
            )}
          </div>

          {/*  Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3 col-span-1 md:col-span-2">
            <button
              type="button"
              className="px-4 py-2 bg-[#282828] text-white rounded-lg hover:bg-[#3a3a3a] w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#a855f7] text-white rounded-lg hover:bg-[#9333ea] w-full sm:w-auto"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <ChangePasswordComponent />
    </React.Fragment>
  );
};

export default Settings;
