import { FAQ } from "@/src/lib/constant";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import FadeInSection from "../../common/fadeInSection";
import TranslateYwithFadeIn from "../../common/translate";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  return (
    <div className="w-full min-h-[90vh] px-4 sm:px-8 py-8 sm:py-12 flex bg-[#ffffff] overflow-hidden">
      <div className="w-full max-w-[1300px] m-auto">
        <div className="text-center mb-8 sm:mb-12">
          <TranslateYwithFadeIn>
    <h4 className="text-center text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-2 sm:mb-5">
            Frequently Asked Questions
          </h4>
          </TranslateYwithFadeIn>
      
<TranslateYwithFadeIn>
   <h3 className="text-gray text-center sm:pb-5 md:pb-2 text-[#828282] text-xs xs:text-xs sm:text-sm md:text-lg lg:text-xl font-semibold leading-relaxed max-w-6xl mx-auto px-2 sm:px-4">
            Do you need some help with something ?
          </h3>
         
</TranslateYwithFadeIn>
       

        </div>

        <div className="space-y-3 sm:space-y-4">
          {FAQ.map((item, index) => (
            <FadeInSection>
  <div key={index} className="border-b border-gray-200">
              <button
                className="flex justify-between items-center w-full py-3 sm:py-5 text-left focus:outline-none"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-base sm:text-lg font-bold text-gray-900 pr-2">
                  {item.question}
                </span>
                <ChevronDown
                  className={`min-w-5 w-5 h-5 sm:w-7 sm:h-7 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 pb-4 sm:pb-6" : "max-h-0"
                }`}
              >
                <p className="text-sm sm:text-base text-gray-600">{item.answer}</p>
              </div>
            </div>
            </FadeInSection>
          
          ))}
        </div>
      </div>
    </div>
  );
}
