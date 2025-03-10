"use client";
import BannerImg from '../../../assets/product/bannerImg/productBannerImg.png';
import Image from 'next/image';
// import './bannerSection.css'
import Link from "next/link";

function BannerSection() {
  return (
    <section id='productGeryBg' className='w-full flex justify-center bg-[#F3F3F3]'>
      <div className='normal-screeen-banner-parent-container' >
        <div className='banner-section-text-container '>
          <p className='banner-section-text inter'>The Future of Networking <br /> in Your Pocket</p>
          <button className='banner-section-explore-product-button inter shadow-2xl'>Explore products</button>
        </div>
        <div className=' banner-image-container w-screen bg-cover bg-center bg-no-repeat md:bg-contain '>
          <Image src={BannerImg} alt='ProductBanner ' className='banner-section-image ' />
        </div>
      </div>
    </section>

  )
}

export default BannerSection
