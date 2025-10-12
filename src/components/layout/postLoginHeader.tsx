"use client";
import React, { useContext } from "react";
import {
  CartIcon,
  // NottifycationIcon,
  ProfileIcon,
} from "../common/icons";
import { LuMenu } from "react-icons/lu";
import { FunctionProps } from "./postLoginSidebar";
import Link from "next/link";
import { UserContext } from "@/src/context/userContext";
import { ThreeDotMenuOption } from "@/src/lib/interface";
import { useRouter } from "next/router";
import ThreeDotMenu from "../common/threeDotMenu";
import { LogOut, Settings } from "lucide-react";
import { CART } from "@/src/context/action";
const PostLoginHeader = (props: FunctionProps) => {
  const { onSideBarOpen } = props;
  const { state,dispatch }: any = useContext(UserContext);
  const router = useRouter();

  const { cart: cards } = state;

  const logout = () => {
    localStorage.clear();
    dispatch({ type: CART, payload: [] });
    router.push("/login");
  };

  const menuOptions: ThreeDotMenuOption[] = [
    {
      label: "Settings",
      onClick: () => router.push("/settings"),
      icon: <Settings size={18} />,
    },
    {
      label: "Logout",
      onClick: () => logout(),
      className: "text-red-400",
      icon: <LogOut size={18} />,
    },
  ];
  return (
    <div className="flex justify-between py-4 w-full ">
      <button onClick={onSideBarOpen} className="text-white xs:block lg:hidden">
        <LuMenu />
      </button>

      <div />

      <div className="flex items-center gap-6">
        <Link href="/cart" shallow className="cursor-pointer relative">
          <CartIcon />
          {Array.isArray(cards) && cards.length > 0 && (
            <span className="absolute top-[-5px] right-[-5px] text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              {cards.length > 9 ? "9+" : cards.length}
            </span>
          )}
        </Link>
        <ThreeDotMenu
          options={menuOptions}
          icon={<ProfileIcon stroke={"black"} strokeWidth={1} />}
        />
      </div>
    </div>
  );
};

export default PostLoginHeader;
