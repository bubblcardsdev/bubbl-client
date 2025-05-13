import rasone from "@/src/assets/HomePageIcons/rasooe.png";
import boomCard from "@/src/assets/HomePageIcons/boom cards.png";
import Image from "next/image";
import { useRouter } from "next/router";

export default function TestiMonial() {
  const pathname = useRouter();
  const images = [
    { id: 2, src: rasone, alt: "Rasone" },
    { id: 2, src: rasone, alt: "Rasone" },
    { id: 2, src: rasone, alt: "Rasone" },
    { id: 3, src: boomCard, alt: "Boom Cards" },
    { id: 3, src: boomCard, alt: "Boom Cards" },
    { id: 3, src: boomCard, alt: "Boom Cards" },
  ];

  return (
    <div className="w-full px-8 py-12 min-h-[100vh] bg-[#ffffff] flex">
      <div className="w-full max-w-[1300px] m-auto">
        <h4 className=" text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-[2%] sm:mb-5">
          Why People Love Us
        </h4>
        <h3 className="text-gray text-center sm:pb-5 md:pb-2 text-[#828282] text-xs sm:text-sm md:text-lg lg:text-xl font-semibold leading-relaxed max-w-6xl mx-auto px-4">
          See why people choose Bubbl.cards to create beautiful, personalized
          cards they love!
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {images.map((e, i) => (
            <Image key={i} height={324} width={500} src={e.src} alt={e.alt} />
          ))}
        </div>
        <div className="flex justify-center">
          <button
            className="px-4 sm:px-6 md:px-8 py-2 bg-[var(--Gray-5,#E0E0E0)]  text-sm sm:text-base rounded-[10px] hover:bg-[#bcbcc2] transition-colors"
            onClick={() => pathname.push("/shop")}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
}
