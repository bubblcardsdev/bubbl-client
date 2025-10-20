import React, { useState } from "react";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { ProductDetailMapper } from "@/src/lib/mapper";
import { useRouter } from "next/router";
import { get, isEmpty } from "lodash";

interface ColorType {
  name: string;
  colorName: string;
  colorCode: string;
  imageUrl?: string;
  productId: string;
}

interface PatternType {
  productId: string;
  patternName: string;
  imageUrl: string;
}

interface MaterialType {
  productId: string;
  materialName: string;
  imageUrl: string;
}

interface BubblCardProps {
  details: any;
  addToCart: () => void;
}

const ProductInfo = (props: BubblCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("select your font");
  const options = ["Amenti", "Roboto", "Montserrat"];
  const { details, addToCart } = props;
  const materials = get(details, "materials", []);
  const colors = get(details, "colors", []);
  const patterns = get(details, "patterns", []);
  const [activeTab, setActiveTab] = useState("description");
  const router = useRouter();

  const {
    name,
    shortDescription,
    sellingPrice,
    originalPrice,
    discountPercentage,
    color,
    material,
    pattern,
    deviceDescription,
    productDetails,
    availability,
    deviceTypeId,
  } = ProductDetailMapper(details?.productDetail);

  function tabChanger(tab: string): void {
    setActiveTab(tab);
  }

  const handleBuyNow = () => {
    addToCart();
    router.push("/cart");
  };

  return (
    <>
      <h1 className="text-[28px] font-semibold">{name}</h1>
      <p className="text-[#7F7F7F] text-[15px] font-[500] mt-2">
        {shortDescription}
      </p>
      <div className="flex flex-col mt-4">
        <div className="flex gap-3 flex-wrap">
          {Number(discountPercentage) > 0 && (
            <p className="line-through text-[22px] text-[#7F7F7F] font-medium">
              ₹ {Number(originalPrice)?.toFixed(0)}
            </p>
          )}

          {Number(discountPercentage) > 0 && (
            <span className="text-[#AC6CFF] font-bold text-xs">
              {discountPercentage}% off
            </span>
          )}
        </div>
        <p className="text-[32px] font-semibold leading- letter-spaceing tracking-wide">
          ₹ {Number(sellingPrice)?.toFixed(0)}
        </p>
      </div>
      <p className="text-gray-600 text-sm">incl. of all Tax</p>
      {/* Color Selection */}
      {(!isEmpty(colors) && colors?.length > 1 && deviceTypeId !== 9) && (
        <div className="mt-4">
          <p className="font-normal tracking-wide">
            Select Color <span className="font-semibold">:</span>
            <span className="font-semibold text-[16px]">{color}</span>
          </p>
          <div className="flex gap-2 mt-4">
            {colors?.map((item: ColorType, index: number) => (
              <div
                key={index}
                className={`flex items-center p-[2px] box-content rounded-full ${
                  item.colorName === color
                    ? "border-2 border-black"
                    : "border-2 border-white"
                }`}
              >
                <button
                  key={item.name}
                  className={`w-6 h-6 rounded-full`}
                  style={{ backgroundColor: item.colorCode }}
                  onClick={() => router.push(`/product/${item.productId}`)}
                ></button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Material Selection */}
      {!isEmpty(materials) && materials?.length > 1 && (
        <div className="mt-4">
          <h3 className="font-semibold ">
            Card Material:
            {material}
          </h3>
          <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-4 xs:grid-cols-3 mt-3  gap-y-4 ">
            {materials?.map((record: MaterialType) => (
              <button
                key={record?.productId}
                onClick={() => {
                  router.push(`/product/${record?.productId}`);
                }}
                className={` bg-[#EFEFEF] border rounded-md flex items-center justify-center cursor-pointer w-4/5 ${
                  material === record?.materialName
                    ? "border-[#9C4BFF]"
                    : "border-gray-300 "
                }`}
              >
                <Image
                  src={record?.imageUrl}
                  alt={record?.productId}
                  width={100}
                  height={100}
                  className="block items-center justify-center"
                />
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Pattern Selection */}
      {!isEmpty(patterns) && (
        <div className="mt-4">
          <h3 className="font-semibold ">Select your Pattern</h3>
          <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-4 xs:grid-cols-3 w-full gap-y-4 mt-4">
            {patterns.map((record: PatternType, index: number) => (
              <div
                key={index}
                onClick={() => router.push(`/product/${record?.productId}`)}
                className={` border w-4/5 ${
                  pattern === record?.patternName
                    ? "border-[#9C4BFF]"
                    : "border-gray-300"
                } rounded-md bg-[#EFEFEF] flex items-center justify-center cursor-pointer`}
              >
                <Image
                  src={record?.imageUrl}
                  alt={record?.patternName}
                  className=" rounded-md"
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {name == "Name Custom" && (
        <div className="flex flex-col md:flex-row justify-between mt-6 gap-6 p-1 rounded-lg">
          {/* Name Input */}
          <div className="w-full md:w-[70%]">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 bg-[#F5F5F5]  outline-none rounded-md mt-1 text-black text-sm"
            />
          </div>

          {/* Font Selector */}
          <div className="relative w-full md:w-[30%] space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Font
            </label>
            <button
              className="w-full px-4 py-3 bg-[#F5F5F5] rounded-lg flex justify-between items-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="text-gray-700 text-sm">{selected}</span>
              <IoIosArrowDown className="text-gray-500" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <ul className="absolute w-full mt-2  border bg-[#F5F5F5]  rounded-lg shadow-lg z-10">
                {options.map((option, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-purple-600 hover:text-white"
                    onClick={() => {
                      setSelected(option);
                      setIsOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      {availability ? (
        <div className="xs:flex mt-10 md:hidden flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={addToCart}
            className="border border-black w-full md:max-w-[200px] h-[40px] rounded-md hover:border-[#9747FF] hover:bg-[#9747FF] hover:text-white"
          >
            Add to cart
          </button>
          <button
            onClick={() => handleBuyNow()}
            className="bg-black w-full md:max-w-[200px] h-[40px] text-white rounded-md hover:opacity-80"
          >
            Buy now
          </button>
        </div>
      ) : (
        <p className="text-red-600 xs:block md:hidden font-semibold text-sm mt-6">
          Currently Unavailable
        </p>
      )}
      {/* Description */}
      <div className="mt-10 border-t pt-4">
        <div className="flex flex-row gap-8">
          <h2
            role="button"
            onClick={() => tabChanger("description")}
            className={`font-semibold ${
              activeTab == "description" ? "text-black" : "text-gray-400"
            }`}
          >
            Description
          </h2>
          <h2
            role="button"
            onClick={() => tabChanger("product_details")}
            className={`font-semibold ${
              activeTab == "product_details" ? "text-black" : "text-gray-400"
            }`}
          >
            Product Details
          </h2>
        </div>
        <p className="text-[#7F7F7F] text-sm mt-2">
          {activeTab == "description" ? deviceDescription : productDetails}
        </p>

        {name == "Full Custom" && (
          <div className="bg-gray-100 rounded-xl p-4 text-gray-700 text-[16px] max-w-lg h-[300px] mt-10">
            <div className="flex items-center gap-1 mb-2 font-semibold">
              <AiOutlineInfoCircle className="text-purple-600 text-lg" />
              <span>Note</span>
            </div>
            <hr className="border-gray-300 mb-3" />
            <p className="mb-2">
              <span className="text-red-500">*</span> After placing your order
              and completing the payment, you will receive an email from the
              Bubbl team containing instructions on how to proceed with your
              request.
            </p>
            <p>
              You can provide instructions for the total No.of.Cards, Color of
              each Cards, Your Logo, Name and Designation in each card. Our
              Bubbl Representative will help you throughout the journey
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductInfo;
