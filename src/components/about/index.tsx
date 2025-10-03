"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AboutHandIcon,
  AboutLightIcon,
  AboutCollaborationIcon,
  AboutSustainabilityIcon,
  AboutWhyChooseIcon,
} from "../common/icons";
import BubblCommunity from "../common/BubblCommunity";
import { WHY_CHOOSE_US } from "@/src/lib/constant";
import { WhyChooseUsTypes } from "@/src/lib/interface";
const AboutcardSection = [
  {
    title: "Simplicity",
    description:
      "We believe that the best tech feels invisible. Every Bubbl card is designed to simplify networking—no apps, no friction—just tap and connect.",
    icon: <AboutHandIcon />,
  },
  {
    title: "Innovation",
    description:
      "We constantly explore new technologies to enhance the way people share information. From customizable profiles to smart integrations, we’re always pushing the envelope.",
    icon: <AboutLightIcon />,
  },
  {
    title: "Collaboration",
    description:
      "We work closely with clients, designers, and developers to build products that reflect real-world needs. Together, we shape experiences that feel personal and powerful.",
    icon: <AboutCollaborationIcon />,
  },
  {
    title: "Sustainability",
    description:
      "We believe in lasting impressions—not waste. By replacing paper cards with smart, reusable alternatives, Bubbl is helping reduce environmental impact one tap at a time.",
    icon: <AboutSustainabilityIcon />,
  },
];

const About = () => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-black text-white flex flex-col items-center p-8 w-full max-w-[1200px] mx-auto mb-10">
      <h1 className="text-5xl font-bold mb-0 mt-10">About Us</h1>
      <div className="relative top-10 -left-[550px] z-40">
        <div className=" font-bold py-2 px-4 rounded-lg  text-white">
          <Image
            src="/company_logo.png"
            alt="company logo"
            width={1000}
            height={1000}
            className="w-[150px] h-[80px]"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-8 ">
        <div className="w-full md:w-1/2  relative">
          <Image
            src="/about_bg.png"
            alt="Professional in a suit"
            width={500}
            height={500}
            className="rounded-lg object-cover w-full max-w-[1200px]"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <p className="text-md text-gray-300">
            At Xpulsar Technologies, we stand on a foundation of innovation and
            digital excellence. From cutting-edge software to smart physical
            products, Xpulsar powers future-ready solutions that help
            individuals and brands thrive in a fast-moving world.
          </p>
          <h2 className="text-xl font-semibold">
            Powered by Xpulsar Technologies
          </h2>
          <p className="text-md  text-gray-300">
            At Bubbl cards, we’re redefining how people connect with tap-and-go
            smart cards that blend technology, design, and sustainability.
            Whether you’re a professional, creator, or business, our NFC-enabled
            solutions make it effortless to share your identity in
            seconds—memorable, modern, and eco-friendly.
          </p>
          <ul className="list-disc list-inside space-y-2  text-gray-300">
            <li>Instant Tap & Connect Cards</li>
            <li>Reusable, Sustainable, Smart</li>
            <li>Custom Features, Personalized Experiences</li>
          </ul>
          <Link href="/contact">
            <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg flex items-center">
              Connect with Us <span>icon</span>
            </button>
          </Link>
        </div>
      </div>
      <section className=" text-white px-0 py-24">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-purple-500">
            Our Mission and Values
          </h2>
          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            Redefining Connections with Smart Simplicity
          </h1>
          <p className="text-gray-300 mt-6 leading-relaxed text-base">
            At Bubbl.cards, we’re redefining how people connect through NFC
            technology and intuitive design.
            <br className="hidden sm:block" />
            We empower professionals to share their identity
            instantly—effortlessly and memorably.
            <br className="hidden sm:block" />
            Our core values: innovation, integrity, and creativity in every
            interaction.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  mx-auto mt-16 px-2">
          {AboutcardSection.map((item, i) => (
            <div
              key={i}
              className="relative  border border-gray-400 rounded-2xl p-6 text-left min-h-[260px]   transition overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#9747FF] blur-3xl rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>
              <div className="absolute top-4 right-4 z-10">{item.icon}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-black text-white px-0 py-8">
        <div className=" text-center">
          <p className="text-gray-300 mb-6 px-[50px]">
            Bubbl cards stands out with advanced NFC technology and fully
            customizable designs that reflect your unique brand. We offer
            effortless, app-free digital sharing on all NFC devices, combined
            with eco-friendly materials. With dedicated support and trusted by
            professionals, we deliver superior quality and seamless networking
            experiences.
          </p>
          <div className="text-left text-lg font-medium text-gray-500 mb-4 mt-10 flex gap-4">
            <span className="animate-slow-spin">
              <AboutWhyChooseIcon color={"#9747FF"} />
            </span>
            <span>Why choose us</span>
          </div>
          <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden  border-[#272727] bg-gradient-to-br from-[#4e4c4c] to-[#121414] ">
            {WHY_CHOOSE_US.map((sec:WhyChooseUsTypes) => (
              <div
                key={sec.id}
                onClick={() => setActive(sec.id)}
                className={`cursor-pointer transition-all duration-300  ${
                  active === sec.id ? "flex-[3] p-8" : "flex-1 p-4"
                } border-r border-[#272727] last:border-none hover:bg-[#121414]`}
              >
                <div className="text-3xl font-semibold mb-2 text-white text-start">
                  {sec.id < 10 ? `0${sec.id}.` : `${sec.id}.`}
                </div>
                <div className="text-3xl font-medium leading-tight text-white text-start">
                  {active === sec.id ? sec.title : sec.title.split(" ")[0]}
                </div>
                {active === sec.id && sec.description && (
                  <p className="text-sm text-gray-400 mt-[100px]">
                    {sec.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <BubblCommunity />
    </div>
  );
};
export default About;
