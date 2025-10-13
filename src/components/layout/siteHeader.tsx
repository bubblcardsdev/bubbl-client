"use client";
import { useContext, useEffect, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useRouter } from "next/router";
import { themeObject } from "../../lib/constant";
import {
  BubblLogo,
  CartIcon,
  ProfileIcon,
} from "../common/icons";
import Link from "next/link";
import { UserContext } from "@/src/context/userContext";
import { getCart } from "@/src/helpers/localStorage";
import { CART } from "@/src/context/action";
import Button from "../common/Button";
import { getToken } from "@/src/utils/utils";
import ThreeDotMenu from "../common/threeDotMenu";
import { ThreeDotMenuOption } from "@/src/lib/interface";
import { LayoutDashboardIcon, LogOut } from "lucide-react";

const SiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { state, dispatch }: any = useContext(UserContext);

  const [tokenString, setTokenString] = useState<string>("");

  const { cart: cards } = state;
  const theme = themeObject[router.pathname] || "white";
  const isDarkTheme =
    theme === "black" ||
    theme === "linear-gradient(to right, #4A4A4A, #000000)";
  const fetchToken = async () => {
    const token = await getToken();
    setTokenString(token || "");
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = getCart();
      fetchToken();
      if (storedCart) {
        dispatch({ type: CART, payload: JSON.parse(storedCart) });
      }
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    dispatch({ type: CART, payload: [] });
    router.push("/login");
  };

  const menuOptions: ThreeDotMenuOption[] = [
    {
      label: "Dashboard",
      onClick: () => router.push("/overview"),
      className: isDarkTheme ? "" : "hover:bg-[#F3F3F3] text-gray-900",
      icon: <LayoutDashboardIcon size={18} />,
    },
    {
      label: "Logout",
      onClick: () => logout(),
      className: isDarkTheme
        ? "text-red-400"
        : "hover:bg-[#F3F3F3] text-red-400",
      icon: <LogOut size={18} />,
    },
  ];

  return (
    <nav
      className={`flex items-center justify-between px-6 py-2 h-[60px] md:px-10 lg:px-16 relative transition-all duration-300 border-b`}
      style={{
        background: theme,
        color: isDarkTheme ? "white" : "black",
        borderBottom: `1px solid ${isDarkTheme ? "rgba(255, 255, 255, 0.2)" : "#E5E7EB"
          }`,
      }}
    >
      {/* Logo */}
      <Link href="/" shallow className="text-xl font-bold">
        <span className={`tracking-wide ${isDarkTheme ? "invert" : ""}`}>
          <BubblLogo />
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className=" group hidden md:flex justify-between gap-5">
        {["Shop", "Plans", "About"].map((item) => (
          <div
            key={item}
            className={`flex items-center justify-center h-9 w-[6rem] rounded-md cursor-pointer transition-all duration-300 ${isDarkTheme ? "hover:bg-[#333333]" : "hover:bg-[#F3F3F3]"
              }`}
            onClick={() => router.push(`/${item.toLowerCase()}`)}
          >
            <span className="font-bold">{item}</span>
          </div>
        ))}
      </div>

      {/* Right Section */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Cart Icon */}
        <button
          aria-label="Cart"
          className="text-xl hover:text-gray-600 relative"
          style={{ color: isDarkTheme ? "white" : "black" }}
        >
          <span
            className={`${theme === "white" ? "invert" : ""}`}
            onClick={() => router.push("/cart")}
          >
            <CartIcon />
          </span>
          {Array.isArray(cards) && cards.length > 0 && (
            <span className="absolute top-[-5px] right-[-5px] text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              {cards.length > 9 ? "9+" : cards.length}
            </span>
          )}
        </button>
        {/* Login Button */}
        {tokenString ? (
          <ThreeDotMenu
            options={menuOptions}
            menuClassName={isDarkTheme ? "" : "bg-white text-black"}
            icon={
              <ProfileIcon stroke={"black"} strokeWidth={1} color={"white"} />
            }
          />
        ) : (
          <Button onClick={() => router.push("/login")}>Login</Button>
        )}
      </div>

      {/* <div
        style={{
          background:
            "linear-gradient(242deg,rgba(174, 174, 174, 0.1) 0%, rgba(167, 150, 189, 0.1) 100%)",
        }}
        className=" group backdrop-blur-3xl md:flex p-3 justify-center top-[100%] w-[987px] max-w-[80%] h-[387px] bg-gray-400 translate-x-[40%] absolute xs:hidden rounded-[24px] space-x-3 "
      >
        <div className="w-1/3 bg-[rgba(255,255,255,0.3)] border border-[#D8D8D8] backdrop-blur rounded-[16px]">
          <h1>Bubbl Basic</h1>
        </div>
        <div className="w-1/3 bg-yellow-500 rounded-[16px] p-4">
          <h1 className="text-[#000000]">Bubbl Basic</h1>
        </div>
        <div className="w-1/3 bg-blue-500 rounded-[16px]">
          <h1 className="text-[#000000]">Bubbl Basic</h1>
        </div>
      </div> */}

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <button
          aria-label="Toggle Menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl"
          style={{ color: isDarkTheme ? "white" : "black" }}
        >
          {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`absolute top-full left-0 w-full shadow-lg md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        style={{ backgroundColor: isDarkTheme ? "black" : "white" }}
      >
        <div className="flex flex-col items-center space-y-2 py-[20px]">
          {["Shop", "Plans", "About", "Cart"].map((item) => (
            <div
              key={item}
              className={`w-[80%] px-6 py-2 text-center cursor-pointer transition-all duration-300 rounded-lg ${isDarkTheme ? "hover:bg-[#333333]" : "hover:bg-[#F3F3F3]"
                }`}
              onClick={() => router.push(`/${item.toLowerCase()}`)}
            >
              <span className="font-bold">{item}</span>
            </div>
          ))}
          {
            !tokenString ?
              <div
                className={`w-[80%] px-6 py-2 text-center cursor-pointer transition-all duration-300 rounded-lg ${isDarkTheme ? "hover:bg-[#333333]" : "hover:bg-[#F3F3F3]"
                  }`}
                onClick={() => router.push(`/login`)}
              >
                <span className="font-bold">Login</span>
              </div>
              :
              <><div
                className={`w-[80%] px-6 py-2 text-center cursor-pointer transition-all duration-300 rounded-lg ${isDarkTheme ? "hover:bg-[#333333]" : "hover:bg-[#F3F3F3]"}`}
                onClick={() => router.push(`/settings`)}
              >
                <span className="font-bold">Settings</span>
              </div><div
                className={`w-[80%] px-6 py-2 text-center cursor-pointer transition-all duration-300 rounded-lg ${isDarkTheme ? "hover:bg-[#333333]" : "hover:bg-[#F3F3F3]"}`}
                onClick={() => logout()}
              >
                  <span className="font-bold">Logout</span>
                </div></>
          }
        </div>
      </div>
    </nav>
  );
};

export default SiteHeader;
