"use client";
import React from "react";
import BlogCard from "./components/blogSection";
import Footer from "../footerPage/index";
import Blog1 from "./components/blog1";
import Blog2 from "./components/blog2";
import Blog3 from "./components/blog3";
import { useRouter } from "next/router";
const Blog = () => {
  const router = useRouter();
  const { id = 1 } = router.query;
  const blogs = [Blog1, Blog2, Blog3];
  const CurrentBlog = blogs?.[Number(id)-1];
  return (
    <section className="w-full bg-[#000000] flex flex-col gap-[50px]  ">
      <div className="flex flex-col gap-[50px] pt-[14vh]  px-[3.5vw] max-w-[1300px] mx-auto w-full">
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
