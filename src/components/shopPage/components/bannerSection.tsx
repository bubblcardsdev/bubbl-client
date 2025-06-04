"use client";
import Image from "next/image";
import Link from "next/link";

function BannerSection() {
  return (
    <section className="w-full flex justify-center bg-[#F3F3F3]">
      <div className=" h-screen w-full max-w-[1300px] flex flex-col items-center justify-between gap-0 overflow-hidden md:px-[72px]">
        <div className="h-[270px] w-full flex flex-col items-center justify-center lg:gap-[0px] lg:pt-[20px] md:h-[360px] sm:h-full sm:gap-[15px] sm:mt-[80px] sm:px-[8px] xs:mt-[100px] xs:gap-[15px]">
          <p className="lg:text-[40px] text-center leading-normal md:text-[36px] md:font-semibold md:w-full md:leading-inherit sm:text-[30px] sm:p-[10px] sm:text-center xs:text-[26px] xs:font-bold">
            Upgrade Your Networking <br /> Game Today
          </p>
          <button className="shadow-md shadow-gray-400 bg-[#A464F7] text-white lg:text-[16px] px-[34px] py-[13px] rounded-[10px] tracking-normal sm:mt-[10px] sm:text-[14px]">
            Explore products
          </button>
        </div>
        <div className="w-full bg-cover bg-center bg-no-repeat md:bg-contain flex justify-center ">
          <Image
            src="/product/productBannerImg.png"
            alt="ProductBanner "
            height={1000}
            width={1000}
            className="w-[85%] md:w-full md:h-full md:object-fill sm:w-full sm:h-full sm:object-fill sm:rounded-bl-[20px] sm:rounded-br-[20px]"
          />
        </div>
      </div>
    </section>
  );
}

export default BannerSection;
