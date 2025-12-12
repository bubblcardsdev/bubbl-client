import { useRouter } from "next/router";
import CoverflowCarousel from "../../common/carouselList";
import FadeInSection from "../../common/fadeInSection";
import TranslateYwithFadeIn from "../../common/translate";
import { trackButtonClick } from "@/src/services/seo";

const FutureNetworking = () => {
  const router = useRouter();
  const images = [
    {
      id: 1,
      src: "/HomePageIcons/detail_01.png",
      alt: "Image 1",
    },
    {
      id: 2,
      src: "/HomePageIcons/detail_02.png",
      alt: "Image 2",
    },
    {
      id: 3,
      src: "/HomePageIcons/detail_03.png",
      alt: "Image 3",
    },
    {
      id: 4,
      src: "/HomePageIcons/detail_04.png",
      alt: "Image 4",
    },
    {
      id: 5,
      src: "/HomePageIcons/detail_05.png",
      alt: "Image 5",
    },
  ];

  return (
    <div className="w-full min-h-[90vh] px-8 py-12 flex bg-[#ffffff] overflow-hidden">
      <div className="w-full max-w-[1300px] m-auto">
        <TranslateYwithFadeIn>
  <h4 className="text-black text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-6">
          The Future of Networking
        </h4>
        </TranslateYwithFadeIn>
      
    <TranslateYwithFadeIn>
<h3 className="text-center mb-12 text-[#828282] text-xs sm:text-sm md:text-lg lg:text-xl font-semibold leading-relaxed">
          Unleash a new era of connectivity, build, connections and showcase
          your offerings using our products tailored for business, individuals,
          events, universities, retail & more
        </h3>
    </TranslateYwithFadeIn>
        <FadeInSection>
<div className="flex justify-center">
          <CoverflowCarousel images={images} />
        </div>
       </FadeInSection>
        <TranslateYwithFadeIn>
 <div className="flex justify-center mt-16">
          <button
          id='getInTouch'
            className="px-4 sm:px-6 md:px-8 py-2 bg-[#9747FF] text-white text-sm sm:text-base rounded-[10px] hover:bg-purple-500 transition-colors"
            onClick={() => {
                trackButtonClick("getInTouch")
              router.push("/shop")}}
          >
            Get In Touch
          </button>
        </div>
        </TranslateYwithFadeIn>
 
      
      </div>
    </div>
  );
};

export default FutureNetworking;
