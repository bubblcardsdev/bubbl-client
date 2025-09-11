"use client";
import React, { useState } from "react";
import { Location_icon, Phone_icon, MailProfileIcon } from "../common/icons";
import { toast } from "react-toastify";
import { SupportApi } from "@/src/services/supportApi";

interface FormDataType {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const Support = () => {
  const initial = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  };
  const [FormData, setFormData] = useState<FormDataType>(initial);
  const [errors, setErrors] = useState<Partial<FormDataType>>({});

  const validate = () => {
    const newErrors: Partial<FormDataType> = {};

    if (!FormData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!FormData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!FormData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(FormData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!FormData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(FormData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (!FormData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await SupportApi(FormData);
      toast.success("Form submitted successfully!");
      setFormData(initial);
    } catch (error) {
      console.log(error, "Failed to submit form");
    }
  };

  return (
    <div className="text-white mt-8 container max-w-[1200px] mx-auto px-4">
      <p className="text-lg">Get in touch</p>
      <p className="text-sm mt-1 text-gray-300">
        We’d love to hear from you. Please fill out this form.
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
        {/* Left Contact Info Panel */}
        <div className="w-full bg-gradient-to-br from-[#8654E1] to-[#1A1A1A] rounded-lg p-6 space-y-6">
          <div className="space-y-4">
            <p className="text-2xl md:text-3xl font-semibold">
              Let&apos;s Connect
            </p>
            <p className="text-sm md:text-base leading-relaxed text-gray-300">
              Got questions, feedback, or just want to say hi? We&apos;d love to
              hear from you! Reach out to our team and we’ll get back to you as
              soon as possible.
            </p>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-lg bg-[#282828] rounded-full p-3">
              <MailProfileIcon color={"#8654E1"} />
            </span>
            <div>
              <p className="font-medium text-[#BDBDBD]">Email</p>
              <p className="text-gray-300 break-words">support@bubbl.cards</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-lg bg-[#282828] rounded-full p-3">
              <Phone_icon color={"#8654E1"} />
            </span>
            <div>
              <p className="font-medium text-[#BDBDBD]">Phone</p>
              <p className="text-gray-300">+91 99999 99999</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-lg bg-[#282828] rounded-full p-3">
              <Location_icon  color={"#8654E1"}/>
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
        <form
          onSubmit={handleSubmit}
          className="w-full bg-[#1f1f1f] p-6 rounded-md space-y-6"
        >
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm mb-2 block">First name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={FormData.firstName}
                onChange={handleChange}
                className="w-full bg-[#282828] p-3 text-sm text-white placeholder-[#4F4F4F] rounded-md"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="text-sm mb-2 block">Last name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={FormData.lastName}
                onChange={handleChange}
                className="w-full bg-[#282828] p-3 text-sm text-white placeholder-[#4F4F4F] rounded-md"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm mb-2 block">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={FormData.email}
                onChange={handleChange}
                className="w-full bg-[#282828] p-3 text-sm text-white placeholder-[#4F4F4F] rounded-md"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="text-sm mb-2 block">Phone number</label>
              <div className="flex items-center bg-[#282828] rounded-md overflow-hidden">
                <span className="text-sm text-white px-3">IND</span>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={FormData.phoneNumber}
                  onChange={handleChange}
                  className="flex-1 bg-transparent p-3 text-sm text-white placeholder-[#4F4F4F] outline-none"
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm mb-2 block">Message</label>
            <textarea
              rows={5}
              name="message"
              placeholder="Your Message"
              value={FormData.message}
              onChange={handleChange}
              className="w-full bg-[#282828] p-3 text-sm text-white placeholder-[#4F4F4F] rounded-md"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-[#9747FF] hover:bg-[#7a36e4] text-white text-sm px-5 py-2 rounded-md w-full sm:w-auto"
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
