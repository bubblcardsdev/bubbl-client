"use client";
import React from "react";
import ContactForm from "./componets/contactForm";
import { Mail, MapPin, Phone } from "lucide-react";
import BubblCommunity from "../common/BubblCommunity";
import Link from "next/link";

function ContactPage() {
  // const router = useRouter()
  // const [email, _] = useState("");
  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   console.log("Email submitted:", email);
  // };
  return (
    <section className="flex flex-col gap-[70px] pt-[20vh]  px-[3.5vw] max-w-[1300px] mx-auto w-full">
        <div className="text-center ">
          <h3 className="text-[#9747FF] text-3xl text-bold ">Contact us</h3>
          <p className="text-white lg:text-5xl font-bold mt-8 md:text-4xl sm:text-2xl xs:text-[26px]">
            We&apos;d love to hear from you
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
                  <Mail className="w-6 h-6 text-purple-500 text-center" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 ">Email</h3>
              <Link
                href="mailto:support@example.com"
                className="text-white hover:text-purple-400 transition-colors"
              >
                support@example.com
              </Link>
            </div>
            {/* Office Section */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center ">
                  <MapPin className="w-6 h-6 text-purple-500" color="#9747FF" />
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
                  <Phone className="w-6 h-6 text-[#9747FF]" color="#9747FF" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 ">Phone</h3>
              <Link
                href="tel"
                className="text-white hover:text-[#9747FF] transition-colors "
              >
                +91 9876-543210
              </Link>
            </div>
          </div>
        </div>
        <ContactForm />
        <div className="mb-8">
          <BubblCommunity />
        </div>
    </section>
  );
}

export default ContactPage;
