import Image from "next/image";
import { useRouter } from "next/router";
import FadeInSection from "../../common/fadeInSection";
import TranslateYwithFadeIn from "../../common/translate";
import { CardWrapper } from "../../common/testiMonialCard";
import { testimonial } from "@/src/lib/constant";
import { useState } from "react";

export default function TestiMonial() {
  const pathname = useRouter();
  const [viewMore,setViewMore] = useState(false)
  
  return (
    <div className="w-full px-8 py-12 min-h-[100vh] bg-[#ffffff] flex overflow-hidden">
      <div className="w-full max-w-[1300px] m-auto">
        <TranslateYwithFadeIn>
 <h4 className=" text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-[2%] sm:mb-5">
          Why People Love Us
        </h4>
        </TranslateYwithFadeIn>
       
        <TranslateYwithFadeIn>
 <h3 className="text-gray text-center sm:pb-5 md:pb-2 text-[#828282] text-xs sm:text-sm md:text-lg lg:text-xl font-semibold leading-relaxed max-w-6xl mx-auto px-4">
          See why people choose Bubbl.cards to create beautiful, personalized
          cards they love!
        </h3>
        </TranslateYwithFadeIn>
 
      <FadeInSection>
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-[4%] max-w-[1200px] mx-auto ">
  {testimonial
  .filter((_, i) => viewMore || i < 6)
  .map((e, i) => (
    <div key={i} className="font-sans w-full aspect-[5/3] [perspective:1000px] group mx-auto">
      <div className="relative w-full h-full text-center transition-transform duration-[500ms] ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        
        {/* Front side with Image */}
        <div className="absolute w-full h-full flex flex-col justify-center items-center [backface-visibility:hidden] rounded-xl overflow-hidden bg-white cursor-pointer">
          <div className="relative w-full h-full">
            <Image
              fill
              src={e.src}
              alt={e.alt}
              className="transition-opacity duration-300 group-hover:opacity-0 object-cover"
            />
          </div>
        </div>

        {/* Back side with Testimonial */}
        <div className="absolute w-full h-full flex flex-col justify-center [backface-visibility:hidden] rounded-xl [transform:rotateY(180deg)] bg-white cursor-pointer">
          <CardWrapper
            profile={e.profile}
            description={e.description}
            username={e.username}
            name={e.name}
          />
        </div>
      </div>
    </div>
  ))}
</div>
      </FadeInSection>
     <TranslateYwithFadeIn>
<div className="flex justify-center">
         <button
  className="px-4 sm:px-6 md:px-8 py-2 bg-[var(--Gray-5,#E0E0E0)] text-sm sm:text-base rounded-[10px] hover:bg-[#bcbcc2] transition-colors"
  onClick={() => setViewMore(prev => !prev)} 
>
  {viewMore ? 'View Less' : 'View More'} 
</button>
        </div>
     </TranslateYwithFadeIn>
 
       
      </div>
    </div>
  );
}
