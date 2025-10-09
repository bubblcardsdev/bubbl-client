import { LOGOS } from "@/src/lib/constant";
import Image from "next/image";
import FadeInSection from "../../common/fadeInSection";
import TranslateYwithFadeIn from "../../common/translate";

const ValuedPartners = () => {
  return (
    <div className="bg-black text-white w-full px-8 py-12 min-h-[50vh] flex">
      <div className="w-full max-w-[1300px] m-auto">
        <TranslateYwithFadeIn>
          <h4 className="text-white text-center text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight mb-8">
            Our valued partner
          </h4>
        </TranslateYwithFadeIn>
        <TranslateYwithFadeIn>
          <h3 className="text-center  text-[#828282] text-sm sm:text-base md:text-lg font-semibold">
            1000+ clients 2500 users, closed deal size worth 5cr+
          </h3>
        </TranslateYwithFadeIn>

        <div className="relative  min-h-[200px] px-4 py-12 rounded-[3rem] mt-3 overflow-hidden w-full">
          <FadeInSection>
            <div className="grid grid-cols-10 sm:grid-cols-10 lg:grid-cols-10 gap-x-10 gap-y-10 justify-items-center min-w-max">
              {LOGOS.map((e, index) => (
                <div
                  key={index}
                  className={`w-[200px] flex items-center justify-center p-4 rounded-[20px] relative border border-[#4F4F4F] ${
                    index > 7 ? "animate-reverseSlide" : "animate-slide"
                  }`}
                >
                  <Image
                    src={e?.logo}
                    alt="partner-logo"
                    width={e.width}
                    height={e.height}
                    className="w-full max-w-[200px] object-contain invert"
                  />
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
};

export default ValuedPartners;
