import { LOGOS } from "@/src/lib/constant";
import Image from "next/image";

const ValuedPartners = () => {
  return (
    <div className="bg-black text-white w-full px-8 py-12 min-h-[50vh] flex">
      <div className="w-full max-w-[1300px] m-auto">
        <h4 className="text-white text-center text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
        Our valued partner
      </h4>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-12 xs:mt-10 sm:mt-16">
          {LOGOS.map((e, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-center"
            >
              <Image
                src={e?.logo}
                alt="partner-logo"
                width={e.width}
                height={e.height}
                className="xs:w-[100px] sm:w-[140px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValuedPartners;
