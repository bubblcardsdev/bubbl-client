"use client";
import React from "react";
import {
  // NottifycationIcon,
  ProfileIcon,
} from "../common/icons";
import { LuMenu } from "react-icons/lu";
import { FunctionProps } from "./postLoginSidebar";
import { useRouter } from "next/router";
const PostLoginHeader = (props:FunctionProps) => {
  const { onSideBarOpen } = props;
  const router = useRouter()
  return (
    <div className="flex justify-between py-4 w-full ">
      <div className="flex items-center gap-12">
        <div className="text-white xs:block lg:hidden ">
          <span role="button" onClick={onSideBarOpen}>
            <LuMenu />
          </span>
        </div>
        {/* <p className="text-white text-[18px]">{props?.currentPage?.title}</p> */}
      </div>
      <div className="flex justify-between gap-3">
        <p className="text-center py-1">
          {/* <NottifycationIcon /> */}
        </p>
        <p onClick={()=>router.push("/settings")} className="cursor-pointer">
          <ProfileIcon />
        </p>
      </div>
    </div>
  );
};

export default PostLoginHeader;
