import { useRouter } from "next/router";
import Image from "next/image";
import FadeInSection from "../../common/fadeInSection";
import TranslateYwithFadeIn from "../../common/translate";
import { trackButtonClick } from "@/src/services/seo";

export default function PivotSection() {
  const router = useRouter();

  return (
    <div className="bg-black text-white w-full px-8 py-12 min-h-[90vh] flex overflow-hidden">
      <div className="w-full max-w-[1300px] m-auto">
        <TranslateYwithFadeIn>
          <h4 className="text-white text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-[2%] sm:mb-5">
            Make Connections Effortless with
          </h4>
        </TranslateYwithFadeIn>

        <TranslateYwithFadeIn>
          <h3 className="text-white text-center xs:pb-5 md:pb-2 text-xs xs:text-base md:text-lg lg:text-xl font-semibold leading-relaxed max-w-6xl mx-auto px-4">
            Bubbl cards
          </h3>
       
        </TranslateYwithFadeIn>
        <FadeInSection>
          <div className="flex justify-center mt-[2%] mb-[2%]">
            <button
            id='shopNow'
              className="px-4 sm:px-6 md:px-8 py-2 bg-[#9747FF] text-white text-sm sm:text-base rounded-[10px] hover:bg-purple-500 transition-colors"
              onClick={() =>{ trackButtonClick("shopNow");router.push("/shop")}}
            >
              Shop Now
            </button>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="flex justify-center mt-16">
            <Image
              src="/HomePageIcons/pivot.png"
              height={4060}
              width={1016}
              alt="pivot"
              priority
            />
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
