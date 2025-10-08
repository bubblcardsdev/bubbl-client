import React from "react";
import HeroSection from "./components/heroSection";
import HowItWorks from "./components/howItWorks";
import ValuedPartners from "./components/valuedPartners";
import OurProducts from "./components/ourProducts";

import Networking from "./components/networking";
import FutureNetworking from "./components/futureNetworking";
import TestiMonial from "./components/testimonial";
import FAQsection from "./components/FAQsection";
import PivotSection from "./components/pivotSection";
import StickyPortion from "./components/stickyPortion";
import ProfileCard from "./components/profileCard";
const Home = () => {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <ValuedPartners />
      <OurProducts />
      <StickyPortion />
      <ProfileCard />
      <Networking />
      {/* <FutureNetworking /> */}
      <TestiMonial />
      <FAQsection />
      <PivotSection />
    </>
  );
};

export default Home;
