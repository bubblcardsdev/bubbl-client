import { useRouter } from "next/router";
import CardsReusable from "../../common/cards";

const OurProducts = () => {
  const router = useRouter();
  return (
    <div className="bg-black text-white w-full px-8 py-12 min-h-[90vh] flex">
      <div className="m-auto w-full max-w-[1300px]">
        <h4 className="text-white text-center text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight mb-12">
        Our Products
      </h4>
      
        <CardsReusable />
      <div className="w-full flex justify-center mt-12">
        <button
          className="px-4 sm:px-6 md:px-8 py-2 bg-[#9747FF] text-white text-sm sm:text-base rounded-[10px] hover:bg-purple-500 transition-colors"
          onClick={() => router.push("/shop")}
        >
          Explore more
        </button>
      </div>
      </div>
    </div>
  );
};

export default OurProducts;
