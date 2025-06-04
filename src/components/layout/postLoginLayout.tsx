"use client";
import React, { useState } from "react";
import PostLoginSidebar from "./postLoginSidebar";
import PostLoginHeader from "./postLoginHeader";
import useWindowSize from "@/src/hooks/useWindowSize";
const PostLoginLayoutPage = (props: any) => {
  const { currentPage} = props;
  const [isOpen,setIsOpen]=useState(false)
  const size = useWindowSize();
  const onClose=()=>{
    setIsOpen(false)
  }
  const onOpen=()=>{
    setIsOpen(true)
  }
  return (
    <div className="bg-[#1C1C1C] w-full h-screen overflow-y-auto overflow-x-hidden flex relative">
      <div className="bg-[#282828] px-4 w-[240px] fixed h-screen xs:hidden lg:block">
        <PostLoginSidebar currentPage={currentPage} />
      </div>
    
      <div className={`fixed  w-screen h-screen top-0 left-0 z-50 ${isOpen? "block":'hidden'}`} >
        <div role='button' className="w-full h-full" onClick={onClose}></div>
        <div className="bg-[#282828] px-4 w-[240px] fixed h-screen top-0 transition-transform transform translate-x-0">
          <PostLoginSidebar currentPage={currentPage} />
        </div>
      </div>
      <div
        className="lg:ml-[240px]"
        style={{
          width: (size?.width || 0) >= 992 ? "calc(100% - 240px)" : "100%",
        }}
      >
        {/* <div className="border-b  border-[#282828] w-full  h-[60px] lg:px-[50px] md:px-[50px] sm:px-[20px] xs:px-[18px]"> */}
        <div className="border-b border-[#282828]  ">
        <div className="w-full  h-[60px] max-w-[1100px] mx-auto px-[24px]">
          <PostLoginHeader currentPage={currentPage} onSideBarOpen={onOpen}/>
        </div>
        </div>
        {/* <div className="lg:px-[50px] md:px-[50px] sm:px-[20px] xs:px-[18px] py-[20px]"> */}
        <div className="p-[24px] max-w-[1100px] w-full mx-auto">
          {props?.children}
        </div>
      </div>
    </div>
  );
};

export default PostLoginLayoutPage;
