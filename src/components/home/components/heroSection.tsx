import Image from "next/image";
import { useRouter } from "next/router";

const HeroSection = () => {
  const router = useRouter();
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/HomePageIcons/videoMock.png"
        width={400}
        height={234}
        className="w-full h-screen object-cover"
        alt="mock"
        priority
      />
      <button
        className="absolute md:bottom-[5%] xs:bottom-[10%] left-[50%] translate-x-[-50%] px-4 sm:px-6 md:px-8 py-2 bg-[#9747FF] text-white text-sm sm:text-base rounded-[10px] hover:bg-purple-500 transition-colors"
        onClick={() => router.push("/shop")}
      >
        Shop now
      </button>
    </div>
  );
};

export default HeroSection;
