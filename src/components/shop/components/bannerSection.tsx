"use client";
import Image from "next/image";

function BannerSection() {
  return (
    <section className="w-full bg-[#F3F3F3] h-[calc(100dvh-60px)] relative overflow-hidden">
      <h1 className="text-center font-bold text-3xl lg:text-4xl px-6 mt-[100px]">
        Upgrade Your Networking <br /> Game Today
      </h1>
      <Image
        src="/product/productBannerImg.png"
        alt="ProductBanner "
        height={1000}
        width={1000}
        className="md:w-[700px] xl:w-[70%] min-w-[480px] w-full absolute bottom-0 lg:bottom-[-15%] xl-bottom-0 left-1/2 -translate-x-1/2"
      />
    </section>
  );
}

export default BannerSection;
