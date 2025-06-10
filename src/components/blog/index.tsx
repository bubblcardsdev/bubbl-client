import React from "react";
import Image from "next/image";
import BlogCard from "./components/blogSection";
import Footer from "../footerPage/index";
import Blog1 from "./components/blog1";
import Blog2 from "./components/blog2";
import Blog3 from "./components/blog3";
import { useRouter } from "next/router";
const Blog = () => {
  const router = useRouter();
  const { id = 1 } = router.query;
  const blogs: any = [Blog1, Blog2, Blog3];
  const CurrentBlog = blogs?.[Number(id)-1];
  return (
    <section className="w-full bg-[#000000] flex flex-col gap-[50px]  ">
      <div className="flex flex-col gap-[50px] pt-[14vh]  px-[3.5vw] max-w-[1300px] mx-auto w-full">
        <div className="flex flex-col gap-[0px]">
          <p className="text-[#6F17EC] text-[18px] text-center">
            Published 20 Jan 2022
          </p>
          <h1 className="text-[38px] font-bold text-center  text-white mb-3">
            NFC new network revolution
          </h1>
          <p className="text-gray-300 text-center ">
            Why Digital Business Cards Are the Smart Choice for Busy
            Professionals
          </p>
        </div>
        <div className="w-full  bg-[#1f2a40] rounded-lg overflow-hidden ">
          <div className="relative w-full h-72 sm:h-96">
            <Image
              src="/pricings_bg.png"
              alt="NFC Card"
              layout="fill"
              objectFit="cover"
              className="object-center"
            />
          </div>
        </div>
        <div>
          <CurrentBlog />
        </div>
        <div>
          <BlogCard />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </section>
  );
};

export default Blog;
