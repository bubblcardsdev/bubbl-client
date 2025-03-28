"use client";
import React from "react";
import BannerSection from "./components/bannerSection";
import Cardsection from "./components/cardSection";
import Footer from "../footerPage/index";

function ShopPage() {
  return (
    <>
      <BannerSection />
      <Cardsection />
      <div className="bg-black px-4">
        <Footer />
      </div>
    </>
  );
}

export default ShopPage;
