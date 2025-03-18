"use client";
import React, { useState } from "react";
// import './Contact.css'
import ContactForm from "./componets/contactForm";
import { Mail, MapPin, Phone } from "lucide-react";
import Footer from "../footerPage/index";
// import { Mail_icon } from "../common/icons";
function ContactPage() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };
  return (
    <section className="w-full bg-[#000000] flex flex-col gap-[50px] ">
      <div className="flex flex-col gap-[70px] pt-[20vh] px-[10vw]">
        <div className="text-center ">
          <h3 className="text-[#9747FF] text-3xl text-bold ">Contact us</h3>
          <p className="text-white lg:text-5xl font-bold mt-8 md:text-4xl sm:text-2xl xs:text-[26px]">
            We'd love to hear from you
          </p>
          <p className="text-[#A4A4A4] mt-8  text-[18px] tracking-[2px]">
            Our friendly team is always here to chat.
          </p>
        </div>
        {/* </div> */}
        <div className="bg-black text-white w-full">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email Section */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center ">
                  <Mail className="w-6 h-6 text-purple-500 text-center"  />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 ">Email</h3>
              <a
                href="mailto:support@example.com"
                className="text-white hover:text-purple-400 transition-colors"
              >
                support@example.com
              </a>
            </div>
            {/* Office Section */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center ">
                  <MapPin className="w-6 h-6 text-purple-500" color='#9747FF'/>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 ">Office</h3>
              <p className="text-white">
                No. 6/9, 3rd cross street, Cit colony,
                <br />
                Chennai, Tamilnadu - 600004
              </p>
            </div>

            {/* Phone Section */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center ">
                  <Phone className="w-6 h-6 text-purple-500" color='#9747FF' />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 ">Phone</h3>
              <a
                href="tel"
                className="text-white hover:text-purple-400 transition-colors "
              >
                +91 9876-543210
              </a>
            </div>
          </div>
        </div>
        <ContactForm />
        <div className=" bg-[rgb(11,11,11)] rounded-xl flex flex-row w-full box-border lg:gap-24 md:gap-10 sm:gap-10 xs:gap-10 items-center  lg:flex-row md:flex-col sm:flex-col xs:flex-col px-10 py-14 mt-10">
          <div className="w-full">
            <h2 className="text-3xl text-white lg:text-left md:text-center sm:text-center xs:text-center lg:whitespace-nowrap">
              Join 2,000+ Bubbl Community
            </h2>
            <p className="text-gray-400 text-[18px] tracking-[1px] pt-2 w-full  lg:text-left md:text-center sm:text-center xs:text-center text-sm">
              Stay in the loop with everything you need to know.
            </p>
          </div>
          <div className="flex flex-col gap-[1px] w-full  ">
            <div className="w-full flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-[20px] ">
              <input
                type="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="placeholder:text-[14px] w-full px-3 py-2 bg-[#111111] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="px-7 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors lg:w-fit md:w-full sm:w-full xs:w-full"
              >
                Subscribe
              </button>
            </div>
            <p className="mt-2 pl-1 text-sm  text-gray-400 lg:text-left md:text-center sm:text-center xs:text-center w-full">
              We care about your data in our{" "}
              <a href="#" className="underline hover:text-gray-300 ">
                privacy policy
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default ContactPage;
