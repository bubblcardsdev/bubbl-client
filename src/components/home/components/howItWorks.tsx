import { STEPS } from "@/src/lib/constant";
import Image from "next/image";
import FadeInSection from "../../common/fadeInSection";
import TranslateYwithFadeIn from "../../common/translate";

const HowItWorks = () => {
  return (
    <section className="bg-black text-white w-full px-8 py-12 min-h-[100vh] flex">
      <div className="w-full max-w-[1300px] m-auto">
        <TranslateYwithFadeIn>
          <h4 className="text-white text-center text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight mb-3">
            Here&apos;s How it Works
          </h4>
        </TranslateYwithFadeIn>

        {/* </HeaderAnimation> */}

        <TranslateYwithFadeIn>
          <h3 className="text-center mb-16 text-[#828282] text-sm sm:text-base md:text-lg font-semibold">
            3 Steps to Network like a pro with bubbl digital business card
          </h3>
        </TranslateYwithFadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mx-auto">
          {STEPS.map((step, index) => (
            <FadeInSection key={index}>
              <div
                key={index}
                className="bg-[#282828] rounded-[16px] flex flex-col shadow-lg overflow-hidden h-[350px]"
              >
                <div className="p-4 sm:p-5">
                  <Image
                    src={step.icon}
                    width={56}
                    height={56}
                    className="bg-[#4F4F4F] p-3 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg mb-3"
                    alt="icon"
                  />

                  <h4 className="mb-2">
                    <span className="text-[#9747FF] font-semibold text-lg sm:text-xl">
                      Step {step.number}:{" "}
                    </span>
                    <span className="text-white font-semibold text-lg sm:text-xl">
                      {step.title}
                    </span>
                  </h4>

                  <p className="text-[#828282] text-sm font-medium leading-relaxed mt-2">
                    {step.description}
                  </p>
                </div>

                <div className="w-full flex justify-center">
                  <Image
                    src={step.img}
                    alt={`Step ${step.number} visualization`}
                    width={step.width}
                    height={200}
                    style={{
                      transform: `translateY(${step.css})`,
                      height: "auto",
                    }}
                  />
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
