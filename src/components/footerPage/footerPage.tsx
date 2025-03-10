"use client";
import React from 'react'
// import './FooterPage.css'
import MailIcon from '../../assets/icons/footer_icon/footer_mail_icon'
import CallerIcon from '../../assets/icons/footer_icon/footer_call_icon'
import FacebookIcon from '../../assets/icons/footer_icon/footer_facebook_icon'
import LinkdinIcon from '../../assets/icons/footer_icon/footer_linkdin_icon'
import TwitterIcon from '../../assets/icons/footer_icon/footer_twitter'
import GitIcon from '../../assets/icons/footer_icon/footer_git_icon'
import WebIcon from '../../assets/icons/footer_icon/footer_web_icon'
import BubbleLogo from '../../assets/icons/homeIcon/bubbl_logo'

function productFooterSection() {
  return (
    <section id="productWhiteBg" className='bg-black product-footer-parent-container '>
      <footer className="bg-black text-white product-footer-container ">
        <div className="product-top-footer">
          {/* Left Section */}
          <div className="product-top-left-footer-container">
            {/* <h2 className="text-2xl font-bold inter">Bubbl</h2> */}
            <BubbleLogo />
            <p className="text-gray-400 inter ">
              Design amazing digital experiences that create more happy in the world.
            </p>
            <div className="grid xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-6  gap-[15px] w-full text-gray-400">
              <a href="#" className="hover:text-white">Shop</a>
              <a href="#" className="hover:text-white">Plans</a>
              <a href="#" className="hover:text-white">How it Works</a>
              <a href="#" className="hover:text-white">Compatability</a>
              <a href="#" className="hover:text-white">Our Story</a>
              <a href="#" className="hover:text-white">Contact Us</a>
            </div>
          </div>

          {/* Right Section */}
          <div className="product-top-right-footer-container ">
            <h3 className="text-xl font-semibold text-left inter ">Contact Us</h3>
            <div className="text-gray-400">
              <p className="flex items-center mb-3 inter">
                <span className="mr-2 inter "><CallerIcon /></span> +91 7358108634
              </p>
              <p className="flex items-center inter" >
                <span className="mr-2 inter"><MailIcon />
                </span> support@bubbl.cards
              </p>
              <div className="flex space-x-4 items-center mt-4">
                <TwitterIcon />
                <LinkdinIcon />
                <FacebookIcon />
                <GitIcon />
                <WebIcon />
              </div>
            </div>
          </div>
        </div>
        <div className=''>
          <hr className="my-8 border-gray-700  " />
        </div>
        {/* Bottom Section */}
        <div className="product-footer-final-container text-gray-400">
          <p className='inter'>Bubbl 2024. All rights reserved</p>
          <p className='inter'>Powered By: XPULSAR TECHNOLOGIES PVT. LTD</p>
          <div className='flex flex-row gap-[15px]'>
            <p>Terms and conditions</p>
            <p>Privacy Policy</p>
            <p>Refund Policy</p>
          </div>

        </div>
      </footer>

    </section>
   

  )
}

export default productFooterSection