"use client";
import { ContactApi } from "@/src/services/contactApi";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { trackFormSubmit } from "@/src/services/seo";

interface FormDataType {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  question: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    question: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormDataType>>({});

  const validateForm = () => {
    let valid = true;
    const newErrors: Partial<FormDataType> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      valid = false;
    } else if (!/^\+?\d{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format";
      valid = false;
    }

    if (!formData.question.trim()) {
      newErrors.question = "Question is required";
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await ContactApi(formData); // ✅ send actual form data
      toast.success("Your Queries has been  successfully sent!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        question: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit form");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="w-full bg-black flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h3 className="text-[#9747FF] text-2xl">Contact us</h3>
          <h2 className="text-white text-3xl font-semibold mb-2  py-4">
            Get in touch
          </h2>
          <p className="text-gray-400">
            We&apos;d love to hear from you. Please fill out this form.
          </p>
        </div>

        <form
          // onSubmit={handleSubmit}
          onSubmit={(e) => {
            trackFormSubmit("contact_form");
            handleSubmit(e);
          }}
          className="space-y-4"
        >
          {/* First and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-[#111111] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                placeholder="First name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-[#111111] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#9747FF]"
                placeholder="Last name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#111111] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#9747FF]"
              placeholder="you@company.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Phone number
            </label>
            <div className="flex">
              <select className="bg-[#111111] text-[14px] rounded-l-lg px-3 py-2.5 text-white focus:outline-none">
                <option>IND</option>
              </select>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full bg-[#111111] rounded-r-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#9747FF]"
                placeholder="+91 0000-00000"
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Question */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Question?
            </label>
            <textarea
              name="question"
              placeholder="Ask questions"
              value={formData.question}
              onChange={handleChange}
              rows={4}
              className="w-full bg-[#111111] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#9747FF]"
            />
            {errors.question && (
              <p className="text-red-500 text-sm mt-1">{errors.question}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full bg-[#111111] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#9747FF]"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {/* Privacy Policy */}
          {/* <div className="flex items-center">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              onChange={handleChange}
              className="rounded bg-[#111111] border-none text-white focus:ring-[#9747FF]"
            />
            <label htmlFor="privacy" className="ml-2 text-sm text-gray-400">
              You agree to our friendly{" "}
              <a
                href="/privacy-policy"
                className="underline hover:text-[#9747FF]"
              >
                privacy policy
              </a>
              .
            </label>
          </div> */}

          <button
            type="submit"
            className="w-full bg-[#9747FF] text-white py-2.5 px-4 rounded-lg hover:bg-purple-600"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
