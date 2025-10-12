"use client";
import React from "react";
import {
  BubblLogo,
  CallIcon,
  MailIcon,
  LinkedinIcon,
  FacebookIcon,
  InstagramOutlined,
} from "../common/icons";
import Link from "next/link";
function ProductFooterSection() {
  return (
    <footer className="p-6 max-w-[1300px] mx-auto bg-black text-white">
      <div className="w-full flex flex-wrap gap-5 justify-between">
        {/* Left Section */}
        <div className="flex flex-col gap-5">
          <BubblLogo color="white" />
          <p className="text-['#E4E7EC']   ">
            Design amazing digital experiences that create more happy in the
            world.
          </p>
          <div className="sm:grid xs:grid xs:grid-cols-2 sm:grid-cols-3 xl:flex  xl:gap-[2rem] sm:gap-[15px] xs:gap-[15px] w-full text-['#E4E7EC'] ">
            <Link href="/shop" className="hover:text-white">
              Shop
            </Link>
            <Link href="/plans" className="hover:text-white">
              Plans
            </Link>
            <Link href="/compatibility" className="hover:text-white">
              Compatability
            </Link>
            <Link href="/about" className="hover:text-white">
              Our Story
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-fit flex flex-col gap-5">
          <h3 className="text-xl font-semibold text-left text-['#E4E7EC']">
            Contact Us
          </h3>
          <div className="text-gray-400">
            <p className="flex items-center mb-3">
              <span className="mr-2 text-white">
                <CallIcon />
              </span>
              <span className=" text-white "> +91 7358108634</span>
            </p>
            <p className="flex items-center text-white">
              <span className="mr-2 text-['#E4E7EC'] ">
                <MailIcon />
              </span>
              support@bubbl.cards
            </p>
            <div className="flex space-x-4 items-center mt-4">
              <Link
                href="https://in.linkedin.com/company/bubbl-cards"
                target="_blank"
              >
                <LinkedinIcon color="#808080" />
              </Link>
              <Link href="https://www.facebook.com/bubbl.card" target="_blank">
                <FacebookIcon color="#808080" />
              </Link>
              <Link
                href="https://www.instagram.com/bubbl.cards"
                target="_blank"
              >
                <InstagramOutlined />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <hr className="my-8 border-gray-700" />
      </div>
      {/* Bottom Section */}
      <div className="flex flex-wrap gap-3 text-[13px] items-center justify-between text-gray-400">
        <p className="text-['#98A2B3']">Bubbl 2024. All rights reserved</p>
        <p className="text-['#98A2B3']">
          Powered By: XPULSAR TECHNOLOGIES PVT. LTD
        </p>
        <div className="flex flex-row gap-[15px] flex-wrap">
          <Link href="/Termsandcondition" shallow className="text-['#98A2B3']">
            Terms and conditions
          </Link>
          <Link href="/privacyPolicy" shallow className="text-['#98A2B3']">
            Privacy Policy
          </Link>
          <Link href="/shippingPolicy" shallow className="text-['#98A2B3']">
            Shipping Policy
          </Link>
          <Link href="/refundPolicy" shallow className="text-['#98A2B3']">
            Refund Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default ProductFooterSection;
