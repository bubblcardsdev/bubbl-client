import React from "react";
import {NottifycationIcon,ProfileIcon} from './components/icon'
const PostLoginHeader = (props:any) => {
  return (
    <div className="flex justify-between py-4 px-10 " >
      <p className="text-white text-[18px]">Over view</p>
      <div className="flex justify-between gap-3">
        <p className="text-center py-1"><NottifycationIcon/></p>
        <p><ProfileIcon/></p>
      </div>
    </div>
  );
};

export default PostLoginHeader;
