import Image from "next/image";
import FadeInSection from "../../common/fadeInSection";
import TranslateYwithFadeIn from "../../common/translate";

const StickyPortion = () => {
  return (
    //  <div className="bg-black pb-[5%] w-full">
    //   <div className="flex flex-col lg:flex-row w-full mb-[12%] m-full max-w-[1300px] h-full">
    <section className="bg-black text-white w-full px-8 py-12 flex flex-col mb-[100px]">
      <TranslateYwithFadeIn>
  <h4 className="text-white text-center text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight mb-3">
        One Card Many Function
      </h4>
      </TranslateYwithFadeIn>
    
      <TranslateYwithFadeIn>
 <h3 className="text-center pb-8 sm:pb-10 lg:pb-12 text-[#828282] text-xs sm:text-sm lg:text-base font-semibold leading-relaxed overflow-hidden">
        Take it to the next level Customizations <br />and Features with bubbl
      </h3>
      </TranslateYwithFadeIn>
 
    
      <div className="w-full max-w-[1300px] m-auto flex flex-col lg:flex-row gap-6 lg:gap-12 lg:min-h-[1850px]">

        {/* Middle column: Hand Image – FIRST for all screen sizes */}
        <div className="w-full lg:w-1/3 lg:min-w-[400px] xl:min-w-[500px] order-1 lg:order-2 mb-10 lg:mb-0 lg:sticky lg:top-[100px] self-start">
          <div className="flex justify-center">
            <Image
              src="/HomePageIcons/HandImage.png"
              height={673}
              width={644}
              className="w-full max-w-[320px] lg:max-w-full scale-125 mt-8 sm:mt-10 lg:mt-[10%]"
              alt="handImage"
            />
          </div>
        </div>

        {/* Left column – SECOND */}
        <div className="w-full lg:w-1/3 order-2 lg:order-1 flex flex-col justify-start gap-6 sm:gap-12 lg:gap-[300px]">
          <FadeInSection>
            <div className="flex justify-center mt-10 sm:mt-14 lg:mt-[100%]">
              <Image
                className="w-full max-w-[280px] lg:max-w-[329px]"
                src="/HomePageIcons/AWS.png"
                height={155}
                width={329}
                alt="aws"
              />
            </div>
          </FadeInSection>
          <FadeInSection> <div className="flex justify-center mt-10">
            <Image
              className="w-full max-w-[280px] lg:max-w-[329px]"
              src="/HomePageIcons/Digitalpayments.png"
              height={155}
              width={329}
              alt="digitalPayment"
            />
          </div></FadeInSection>
          <FadeInSection>
            <div className="flex justify-center mt-10">
              <Image
                className="w-full max-w-[280px] lg:max-w-[329px]"
                src="/HomePageIcons/stocks.png"
                height={155}
                width={329}
                alt="stocks"
              />
            </div>
          </FadeInSection>
        </div>

        {/* Right column – THIRD */}
        <div className="w-full lg:w-1/3 order-3 flex flex-col justify-start gap-6 sm:gap-12 lg:gap-[300px]">
          <FadeInSection>
            <div className="flex justify-center mt-10 sm:mt-14 lg:mt-[170%]">
              <Image
                className="w-full max-w-[280px] lg:max-w-[329px]"
                height={155}
                width={329}
                src="/HomePageIcons/Leadcapture.png"
                alt="LeadCapture"
              />
            </div>
          </FadeInSection>
          <FadeInSection><div className="flex justify-center mt-10">
            <Image
              className="w-full max-w-[280px] lg:max-w-[329px]"
              height={155}
              width={329}
              src="/HomePageIcons/Emailsignature.png"
              alt="email"
            />
          </div></FadeInSection>
          <FadeInSection>
            <div className="flex justify-center mt-10">
              <Image
                className="w-full max-w-[280px] lg:max-w-[329px]"
                height={155}
                width={329}
                src="/HomePageIcons/stocks2.png"
                alt="stocks2"
              />
            </div>
          </FadeInSection>
        </div>

      </div>
    </section>

  );
};

export default StickyPortion;
