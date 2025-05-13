import React from "react";
import PostLoginSidebar from "./postLoginSidebar";
import PostLoginHeader from "./postLoginHeader";
const PostLoginLayoutPage = (props: any) => {
  const {currentPage}=props
  return (
    <div className="bg-black w-full h-screen flex">
      <div className="bg-[#282828] w-[14%]">
        <PostLoginSidebar currentPage={currentPage}/>
      </div>
      <div className=" w-[84%]">
        <div className=" border-b  border-[#282828] w-full  h-[60px] px-10 ">
          <PostLoginHeader currentPage={currentPage} />
        </div>
        <div className="px-6">
          {props?.children}
        </div>
      </div>
    </div>
  );
};

export default PostLoginLayoutPage;

