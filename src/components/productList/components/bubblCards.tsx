import React, { useState } from "react";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai";
// const materials = [
//   {
//     id: "pvc",
//     name: "PVC Card",
//     image: "/pvcCards/pvcPatten1.png",
//     price: 1200,
//     patterns: [
//       "/pvcCards/pvc",
//       "pvc2",
//       "pvc3",
//       "pvc4",
//       "pvc5",
//       "pvc6",
//       "pvc7",
//       "pvc8",
//     ],
//   },
//   {
//     id: "metal",
//     name: "Metal Card",
//     image: "/metalCards/patten1.png",
//     price: 1999,
//     patterns: [
//       "metal1",
//       "metal2",
//       "metal3",
//       "metal4",
//       "metal5",
//       "metal6",
//       "metal7",
//     ],
//   },
//   {
//     id: "bamboo",
//     name: "Bamboo Card",
//     image: "/metalCards/patten2.png",
//     price: 999,
//     patterns: ["pattern1", "pattern2", "pattern3"],
//   },
// ];
type BubblCardProps = {
  selectedColor: ColorType | null;
  setSelectedColor: (color: ColorType) => void;
  selectedCard: string;
  selectedMaterial: MaterialType | null;
  setSelectedMaterial: (material: MaterialType) => void;
  selectedPattern: PatternType | null;
  setSelectedPattern: (pattern: PatternType) => void;
  materials: MaterialType[];
  details: DetailsType;
  patterns: PatternType[];
};


// interface SelectedOptionType {
//   label: string;
//   value: string;
// }


interface ColorType {
  name: null | undefined;
  colorName: string;
  colorCode: string;
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

interface ProductDetailType {
  name: string;
  shortDescription: string;
  price: number;
  deviceDescription?: string;
  productDetails?: string;
}

interface DetailsType {
  productDetail: ProductDetailType;
  color?: ColorType[];
  patterns?: PatternType[];
}


const BubblBasicCrd = (props: BubblCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("select your font");
  // const [selectedMaterialIndex, setSelectedMaterialIndex] = useState(0);
  const options = ["Amenti", "Roboto", "Montserrat"];
  const {
    selectedCard,
    selectedColor,
    setSelectedColor,
    selectedMaterial,
    setSelectedMaterial,
    selectedPattern,
    setSelectedPattern,
    details,
    materials,
    patterns,
  } = props;
  const [activeTab, setActiveTab] = useState("description");
  // const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // const handleMaterialClick = (index: number) => {
  //   setSelectedIndex(index);
  // };
  // const [selectedColor, setSelectedColor] = useState("Blue");
  // const [activeButton, setActiveButton] = useState("");
  // const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  // const [selectedPattern, setSelectedPattern] = useState(
  //   selectedMaterial.patterns[0]
  // );
  // const colors = [
  //   { name: "Blue", color: "bg-blue-500", image: "/product-blue.jpg" },
  //   { name: "Yellow", color: "bg-yellow-500", image: "/product-yellow.jpg" },
  //   { name: "Orange", color: "bg-orange-500", image: "/product-orange.jpg" },
  //   { name: "Red", color: "bg-red-500", image: "/product-red.jpg" },
  //   { name: "Green", color: "bg-green-500", image: "/product-green.jpg" },
  //   { name: "Purple", color: "bg-purple-500", image: "/product-purple.jpg" },
  //   { name: "Gray", color: "bg-gray-500", image: "/product-gray.jpg" },
  //   { name: "Black", color: "bg-black", image: "/product-black.jpg" },
  // ];
  function tabChanger(tab: string): void {
    setActiveTab(tab);
  }
  return (
    <div className="">
      <h1 className="text-[28px] font-semibold">{selectedCard}</h1>
      <p className="text-[#7F7F7F] text-[15px] font-[500] mt-2">
        {details?.productDetail?.shortDescription ??
          `Made with Recyclable PVC in a Matte finish with Spot UV coating.`}
      </p>
      <p className="text-[34px] font-[700] mt-4 leading- letter-spaceing tracking-wide">
        ₹ {details?.productDetail?.price}
      </p>
      <p className="text-gray-600 text-sm">incl. of all Tax</p>
      {/* Color Selection */}
      {details?.color && details?.color?.length > 0 && (
        <div className="mt-4">
          <p className="font-normal tracking-wide">
            Select Color <span className="font-semibold">:</span>
            <span className="font-semibold text-[16px]">
              {selectedColor?.colorName}
            </span>
          </p>
          <div className="flex gap-2 mt-4">
            {details?.color?.map((item: ColorType, index: number) => (
              <div
                key={index}
                className={`flex items-center p-[2px] box-content rounded-full ${item.colorName === selectedColor?.colorName
                    ? "border-2 border-black"
                    : "border-2 border-white"
                  }`}
              >
                <button
                  key={item.name}
                  className={`w-6 h-6 rounded-full`}
                  style={{ backgroundColor: item.colorCode }}
                  onClick={() => setSelectedColor(item)}
                ></button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Material Selection */}
      {materials && materials?.length > 1 && (
        <div className="mt-4">
          <h3 className="font-semibold ">
            Card Material:
            {/* {materials?.map((material: MaterialType, index: number) => (
              <span key={index} className="ml-2">
                {(index === selectedMaterialIndex && material?.materialName) ||
                  ""}
              </span>
            ))} */}
          </h3>
          <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-4 xs:grid-cols-3 mt-3  gap-y-4 ">
            {materials?.map((material: MaterialType) => (
              <button
                key={material?.productId}
                onClick={() => {
                  setSelectedMaterial(material);
                  if (details?.patterns && details.patterns.length > 0) {
                    setSelectedPattern(details.patterns[0]);
                  }
                }}

                className={` bg-[#EFEFEF] border rounded-md flex items-center justify-center w-4/5 ${selectedMaterial?.productId === material?.productId
                    ? "border-[#9C4BFF]"
                    : "border-gray-300 "
                  }`}
              >
                <Image
                  src={material?.imageUrl}
                  alt={material?.productId}
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
      {patterns && patterns?.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold ">Select your Pattern</h3>
          <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-4 xs:grid-cols-3 w-full gap-y-4 mt-4">
            {details?.patterns && details?.patterns.map((pattern: PatternType, index: number) => (
              <div
                key={index}
                onClick={() => setSelectedPattern(pattern)}
                className={` border w-4/5 ${selectedPattern?.productId === pattern?.productId
                    ? "border-[#9C4BFF]"
                    : "border-gray-300"
                  } rounded-md bg-[#EFEFEF] flex items-center justify-center`}
              >
                <Image
                  src={pattern?.imageUrl}
                  alt={pattern?.patternName}
                  className=" rounded-md"
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {details?.productDetail?.name == "Name Custom" && (
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

      {/* Description */}
      <div className="mt-10 border-t pt-4">
        <div className="flex flex-row gap-8">
          <h2
            role="button"
            onClick={() => tabChanger("description")}
            className={`font-semibold ${activeTab == "description" ? "text-black" : "text-gray-400"
              }`}
          >
            Description
          </h2>
          <h2
            role="button"
            onClick={() => tabChanger("product_details")}
            className={`font-semibold ${activeTab == "product_details" ? "text-black" : "text-gray-400"
              }`}
          >
            Product Details
          </h2>
        </div>
        {activeTab == "description" && (
          <p className="text-[#7F7F7F] text-sm mt-2">
            {details?.productDetail?.deviceDescription ??
              `The Smart NFC Business Card is designed to make sharing your
            professional details seamless and tech-forward. Simply tap your card
            on any NFC-enabled smartphone, and your contact information,
            website, or social media links instantly transfer to the recipient’s
            device—no apps or QR codes required.`}
          </p>
        )}
        {activeTab === "product_details" && (
          <div>
            {details?.productDetail?.productDetails ? (
              <p className="text-[#7F7F7F] text-sm mt-2">
                {details?.productDetail?.productDetails}
              </p>
            ) : (
              <p className="text-[#7F7F7F] text-sm mt-2">
                - NFC-based digital networking solution <br />
                - E-business card <br />
                - Share contact information <br />
                - Share social media profiles effortlessly with a tap <br />
                - Always editable and fully customizable templates <br />
                - User-friendly website accessible on web and phones <br />-
                Modern, eco-friendly alternative to paper business cards <br />-
                Elevate your networking game with innovation and simplicity
              </p>
            )}
          </div>
        )}
        {details?.productDetail?.name == "Full Custom" && (
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
    </div>
  );
};

export default BubblBasicCrd;
