"use client";
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    privacy: false
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    privacy: ''
  });

  const validateForm = () => {
    let valid = true;
    let newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      privacy: ''
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    if (!formData.privacy) {
      newErrors.privacy = 'You must agree to the privacy policy';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    }
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  return (
    <section  className="w-full bg-black flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h3 className='text-[#9747FF] text-2xl'>Contact us</h3>
          <h2 className="text-white text-3xl font-semibold mb-2  py-4">Get in touch</h2>
          <p className="text-gray-400 ">We'd love to hear from you. Please fill out this form.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm text-gray-400 mb-1">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-[#111111] placeholder:text-[14px]  rounded-lg border border-none px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                placeholder="First name"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm text-gray-400 mb-1 ">Last name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-[#111111] placeholder:text-[14px]  rounded-lg border border-none px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#9747FF]"
                placeholder="Last name"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#111111] placeholder:text-[14px]  rounded-lg border border-none px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#9747FF]"
              placeholder="you@company.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm text-gray-400 mb-1 ">Phone number</label>
            <div className="flex">
              <select className="bg-[#111111] text-[14px] rounded-l-lg border border-none px-3 py-2.5 text-white focus:outline-none focus:border-[#9747FF] border-r-0">
                <option className='text-gray'>IND</option>
              </select>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#111111] placeholder:text-[14px]  rounded-r-lg border border-none px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#9747FF]"
                placeholder="+91 0000-00000"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm text-gray-400 mb-1 ">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full bg-[#111111]  rounded-lg border border-none px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#9747FF]"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              checked={formData.privacy}
              onChange={handleChange}
              className="rounded bg-[#111111]  border-none text-white focus:ring-[#9747FF] focus:ring-offset-0"
            />
            <label htmlFor="privacy" className="ml-2 text-sm text-gray-400 ">
              You agree to our friendly{' '}
              <a href="/privacy-policy" className="text-gray-400 underline  hover:text-[#9747FF]">
                privacy policy
              </a>.
            </label>
          </div>
          {errors.privacy && <p className="text-red-500 text-sm mt-1">{errors.privacy}</p>}

          <button
            type="submit"
            className="w-full bg-[#9747FF] hover:bg-[#9747FF] text-white py-2.5 px-4 rounded-lg transition-colors "
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
