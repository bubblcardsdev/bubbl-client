import { ToastContainer } from "react-toastify";
import SiteHeader from "./siteHeader";
import { ReactNode } from "react";
import ProductFooterSection from "../footerPage";

interface SiteLayoutProps {
  children?: ReactNode;
  darkTheme?: boolean;
}

export default function SiteLayout(props: SiteLayoutProps) {
  const { darkTheme } = props;
  return (
    <div
      id="siteLayout"
      className={`w-full h-screen overflow-y-auto overflow-x-hidden ${
        darkTheme ? "bg-black" : ""
      }`}
    >
      <div
        style={{ position: "sticky", width: "100%", zIndex: "9999", top: 0 }}
      >
        <SiteHeader />
      </div>
      {/* style={{ position: 'relative',height:"100vh",overflow:'auto' }} */}
      <main>{props?.children}</main>
      <div className="bg-black w-full"><ProductFooterSection /></div>
      <ToastContainer />
    </div>
  );
}
