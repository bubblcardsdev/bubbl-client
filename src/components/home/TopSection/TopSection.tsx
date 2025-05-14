'use client';

import Image from 'next/image';
import { useRouter } from 'next/router';
// import savfolt from "@/src/assets/ClientLogo/safvolt.png"
// import thejo from "@/src/assets/ClientLogo/thejo.png"
import CardSection from "@/src/components/common/cards"
// import videoMock from "@/src/assets/HomePageIcons/videoMock.png"
// import step1Img from "@/src/assets/HomePageIcons/step1.png"
// // import step2Img from "@/src/assets/HomePageIcons/step2.png"
// import step3Img from "@/src/assets/HomePageIcons/step3.png"
// import icon1 from "@/src/assets/HomePageIcons/icon1.png"
// import icon2 from "@/src/assets/HomePageIcons/icon2.png"
// import icon3 from "@/src/assets/HomePageIcons/icon3.png"
// import ICON2 from "@/src/assets/HomePageIcons/ICON2 (2).png"
import CardFunction from './cardFunction';
import ProfileCard from '../components/profileCard';



 const TopSection = () => {
    const pathname = useRouter();
    const logos = [
      { logo: "/assets/Homeimg/safvolt.png", place: "Savfolt", width: 220, height: 110 },
      { logo: "/assets/Homeimg/mynerva.png", place: "Savfolt", width: 220, height: 110 },
      { logo: "/assets/Homeimg/thejo.png",   place: "Thejo",   width: 150, height: 75 },
      { logo: "/assets/Homeimg/mynerva.png",   place: "Thejo",    width: 220, height: 110  },
      { logo: "/assets/Homeimg/safvolt.png", place: "Savfolt", width: 220, height: 110 },
      { logo: "/assets/Homeimg/mynerva.png", place: "Savfolt", width: 220, height: 110 },
      { logo: "/assets/Homeimg/thejo.png",   place: "Thejo",   width: 150, height: 75 },
      { logo: "/assets/Homeimg/mynerva.png",   place: "Thejo",    width: 220, height: 110  },
    ]; 
    const steps = [ 
      {
        number: 1,
        icon: "/HomePageIcons/icon1.png",
        title: 'Choose bubbl card',
        description: 'Choose from our Bubbl Basics or design a custom card. It\'s your choice.',
        img:"/HomePageIcons/step1.png",
        height: 421,
        width: 302,
        css:'10%',

      },
      {
        number: 2,
        icon: "/HomePageIcons/icon2.png",
        title: 'Set up your profile',
        description: 'Tap your device to your phone to activate the link, follow the instructions to create your profile',
        img:"/HomePageIcons/step2.png",
        height: 1866,
        width:1500,
         css:'-5%',
     
         
      },
      {
        number: 3,
        icon: "/HomePageIcons/icon3.png",
        title: 'Network like a pro',
        description: 'You can now tap and share your contact info, social media handles and so much more with your own Bubbl.',
        img:"/HomePageIcons/step3.png",
        height:386,
        width:385,
         css:'-5%',
    
      }
    ];
    return (
      <div className="w-full bg-black text-white overflow-x-hidden">
      <div className="relative w-full">
        <Image
          src="/HomePageIcons/videoMock.png"
          width={400}
          height={234}
          className="w-full h-[50vh] sm:h-[70vh] md:h-[90vh] lg:h-[100vh] object-cover"
          alt="mock"
          priority
          // placeholder='blur'
        />
        <div className="absolute bottom-[3%] flex justify-center w-full">
          <button
            className="px-4 sm:px-6 md:px-8 py-2 bg-[#9747FF] text-white text-sm sm:text-base rounded-[10px] hover:bg-purple-500 transition-colors"
            onClick={() => pathname.push("/shop")}
          >
            Shop now
          </button>
        </div>
      </div>

      {/* How it Works section */}
      <div className="bg-black text-white px-4 py-12 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-16 lg:py-24">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold pb-2 sm:pb-3 md:pb-4">
        Here&apos;s How it Works
        </h1>
        <h3 className="text-center pb-8 sm:pb-10 md:pb-12 text-[#828282] text-sm sm:text-base md:text-lg font-semibold leading-relaxed max-w-3xl mx-auto">
          3 Steps to Network like a pro with bubbl digital business card
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="bg-[#282828] rounded-[16px] flex flex-col shadow-lg overflow-hidden h-[350px]">
              <div className="p-4 sm:p-5">
                <Image
                  src={step.icon}
                  width={56}
                  height={56}
                  className="bg-[#4F4F4F] p-3 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg mb-3"
                  alt="icon"
                />

                <h4 className="mb-2">
                  <span className="text-[#9747FF] font-semibold text-lg sm:text-xl">Step {step.number}: </span>
                  <span className="text-white font-semibold text-lg sm:text-xl">{step.title}</span>
                </h4>

                <p className="text-[#828282] text-sm font-medium leading-relaxed mt-2">{step.description}</p>
              </div>

              <div className="w-full flex justify-center">
                <Image
                  src={step.img}
                  alt={`Step ${step.number} visualization`}
                  width={step.width}
                  height={200}
                  style={{ transform: `translateY(${step.css})`, height: "auto" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partner section */}
      <div className="px-4 py-8 sm:py-12">
        <h4 className="text-white text-center text-xl sm:text-2xl md:text-3xl font-semibold leading-tight">
          Our valued partner
        </h4>

        <div className="w-full flex justify-center pt-4 sm:pt-[5%]">
          <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-12 max-w-[1100px] justify-center">
            {logos.map((e, index) => (
              <div key={index} className="w-36 sm:w-28 md:w-auto flex items-center justify-center">
                <Image
                  src={e?.logo}
                  alt="partner-logo"
                  width={e.width}
                  height={e.height}
                  className="max-w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product section */}
      <div className="bg-black text-white px-4 py-8 sm:p-[8%]">
        <h4 className="text-white text-center text-xl sm:text-2xl md:text-3xl font-semibold leading-tight mb-6 sm:mb-10">
          Our Products
        </h4>
        <div className="pb-10">
          <CardSection />
        </div>
        <div className="w-full flex justify-center">
          <button
            className="px-4 sm:px-6 md:px-8 py-2 bg-[#9747FF] text-white text-sm sm:text-base rounded-[10px] hover:bg-purple-500 transition-colors"
            onClick={() => pathname.push("/shop")}
          >
            Explore more
          </button>
        </div>
      </div>

      <CardFunction />
      <div className="bg-white w-full">
        <ProfileCard />
      </div>
    </div>
)
};
export default TopSection
