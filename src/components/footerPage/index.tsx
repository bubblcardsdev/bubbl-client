"use client";
import React from "react";
import {BubblLogo,CallIcon,MailIcon,GitIcon,LinkedinIcon,TwitterIcon,FacebookIcon,WebIcon}from '../common/icons'

function productFooterSection() {
  return (
    <section className="mt-5  py-[5vh] md:mt-10  max-w-[1300px] mx-auto bg-black">
      <footer className=" text-white">
        <div className="w-full flex flex-wrap gap-y-[6vh] justify-between">
          {/* Left Section */}
          <div className="flex flex-col gap-[5vh]">
            <BubblLogo  color='white'/>
            <p className="text-['#E4E7EC']   ">
              Design amazing digital experiences that create more happy in the
              world.
            </p>
            <div className="sm:grid xs:grid xs:grid-cols-2 sm:grid-cols-3 xl:flex  xl:gap-[2rem] sm:gap-[15px] xs:gap-[15px] w-full text-['#E4E7EC'] ">
              <a href="/shop" className="hover:text-white">
                Shop
              </a>
              <a href="/plans" className="hover:text-white">
                Plans
              </a>
              <a href="#" className="hover:text-white">
                How it Works
              </a>
              <a href="/compatibility" className="hover:text-white">
                Compatability
              </a>
              <a href="#" className="hover:text-white">
                Our Story
              </a>
              <a href="/contact" className="hover:text-white">
                Contact Us
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-fit flex flex-col gap-y-[3vh]">
            <h3 className="text-xl font-semibold text-left text-['#E4E7EC']   ">
              Contact Us
            </h3>
            <div className="text-gray-400">
              <p className="flex items-center mb-3 ">
                <span className="mr-2 text-white  ">
                  <CallIcon />
                </span>
               <span className=" text-white ">  +91 7358108634</span>
              </p>
              <p className="flex items-center text-white">
                <span className="mr-2 text-['#E4E7EC'] ">
                  <MailIcon/>
                </span>
                support@bubbl.cards
              </p>
              <div className="flex space-x-4 items-center mt-4">
              <TwitterIcon color='#808080'/> 
              <LinkedinIcon color='#808080'/> 
              <FacebookIcon color='#808080'/>
              <GitIcon  color='#808080'/>
              <WebIcon color='#808080'/> 

              </div>
            </div>
          </div>
        </div>
        <div>
          <hr className="my-8 border-gray-700  " />
        </div>
        {/* Bottom Section */}
        <div className="flex flex-wrap gap-y-[3vh] gap-x-[0vw] text-[13px] items-center justify-between text-gray-400">
          <p className="text-['#98A2B3']">Bubbl 2024. All rights reserved</p>
          <p className="text-['#98A2B3']">Powered By: XPULSAR TECHNOLOGIES PVT. LTD</p>
          <div className="flex flex-row gap-[15px]">
            <a  href="/Termsandcondition" className="text-['#98A2B3']">Terms and conditions</a>
            <a href="/privacyPolicy" className="text-['#98A2B3']">Privacy Policy</a>
            <a href="" className="text-['#98A2B3']">Refund Policy</a>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default productFooterSection;
