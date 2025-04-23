"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "../footerPage/index";
import BuleCard from "../../assets/product/productCardImg/basiccard.png";
import BackCard from "../../assets/product/productCardImg/metalCard.png";
import BubblCard from "./components/bubblCards";
// import Bubbl_Full_custom from '../productList/bubblFullCustom/bubblFullCustom'
// import Bubbl_Name_custom from '../productList/bubblNameCustom/bubblNameCustom'
import Arrow_icon from "../../assets/icons/productIcon/productList_Arrow_icon";
import { BracesIcon } from "lucide-react";
import BreadCrumbs from "../common/BreadCrumbs";
import { useRouter } from "next/router";
const CircleContainer = (props: any) => {
  const { colors } = props;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative max-w-[300px] z-10  "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {colors &&
        colors.length > 0 &&
        colors.map((color: any, index: number) => (
          <div
            key={index}
            className={`absolute w-[15px] h-[15px] rounded-full transition-all ease-in-out duration-500 bottom-[-6px]`}
            style={{
              backgroundColor: color,
              right: `${10 + index * 3}px`,
              transform: hovered ? `translateX(-${15 * index}px)` : "none",
            }}
            onClick={() => setHovered(false)}
          />
        ))}
    </div>
  );
};
const steps = [
  {
    id: 1,
    image: "/images/howItWorks_group_img.png",
    title: "Order your bubbl right now",
  },
  {
    id: 2,
    image: "/images/howItWorks_qr_img.png",
    title:
      "Setup your digital business card through our website, no additional app needed",
  },
  {
    id: 3,
    image: "/images/howItWorks_share_humman_img.png",
    title: "Once delivered, scan QR and set up your profile details",
  },
  {
    id: 4,
    image: "/images/howItWorks_template_img.png",
    title: "Network like a pro",
  },
];
const ProductList = () => {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState<string>("Bubbl Basic Card");
  const [currentImgae, setCurrentImage] = useState("front");

  useEffect(() => {
    if (router?.query?.id) {
      const cardType =
        Products.find((e) => e.id.toString() === router?.query?.id)?.title ||
        "";
      console.log("card/", cardType);

      setSelectedCard(cardType);
    }
  }, []);
  const colors = [
    { name: "Blue", color: "bg-blue-500", image: "/product-blue.jpg" },
    { name: "Yellow", color: "bg-yellow-500", image: "/product-yellow.jpg" },
    { name: "Orange", color: "bg-orange-500", image: "/product-orange.jpg" },
    { name: "Red", color: "bg-red-500", image: "/product-red.jpg" },
    { name: "Green", color: "bg-green-500", image: "/product-green.jpg" },
    { name: "Purple", color: "bg-purple-500", image: "/product-purple.jpg" },
    { name: "Gray", color: "bg-gray-500", image: "/product-gray.jpg" },
    { name: "Black", color: "bg-black", image: "/product-black.jpg" },
  ];
  const Products = [
    {
      id: 1,
      name: "Full Custom",
      title: "Bubbl Full Custom",
      price: "Rs.999",
      image: BuleCard,
      discount: "18.77%",
      //   secondaryImage: FullCustomCardFrontBack,
      colors: ["red", "blue", "green", "yellow", "purple"],
    },
    {
      id: 2,
      name: "Name Custom",
      title: "Bubbl Name Custom",
      price: "Rs.799",
      image: BuleCard,
      discount: "18.77%",
      //   secondaryImage: BubblBasicCardBlackFrontBack,
      colors: ["red", "blue", "green", "yellow", "purple"],
    },
    {
      id: 3,
      name: "Tile v2",
      title: "Bubbl Tile",
      price: "Rs.1999",
      image: BuleCard,
      discount: "18.77%",
      //   secondaryImage: MetalCardFrontBack,
      colors: ["red", "blue", "green", "yellow", "purple"],
    },
  ];
  const flippedImage = currentImgae == "front" ? BuleCard : BackCard;
  const flipImage = (view: string) => {
    setCurrentImage(view);
  };
  return (
    <>
      <div className="py-3 h-screen">
        <div className="max-w-[1300px] mx-auto pt-12 mb-4">
          <div className="flex flex-col md:flex-row items-center md:items-start lg:gap-20 md:gap-[60px] p-4  ">
          
            {/* Left Section - Image */}
            <div className="w-full md:w-1/2 md:sticky top-[85px] flex flex-col gap-3">
            <BreadCrumbs value={selectedCard}></BreadCrumbs>
              <div className="relative bg-[#EFEFEF] rounded-2xl lg:p-4 sm:px-0 xs:px-0 w-full ">
                <Image
                  src={flippedImage}
                  alt="Bubbl Card"
                  width={400}
                  height={400}
                  className="rounded-md h-[300px] md:h-[350px] object-fill w-full xs:object-cover"
                />
                <div className="flex justify-center mt-2  ">
                  <div
                    role="button"
                    onClick={() => flipImage("front")}
                    className={`h-1 w-12 mb-2 ${
                      currentImgae == "front" ? "bg-purple-500" : "bg-gray-300"
                    } rounded-full mr-2 p-1`}
                  ></div>
                  <div
                    role="button"
                    onClick={() => flipImage("back")}
                    className={`h-1 w-12 ${
                      currentImgae == "back" ? "bg-purple-500" : "bg-gray-300"
                    } rounded-full mr-2 p-1`}
                  ></div>
                </div>
              </div>
              <p className="text-center text-sm mt-2 capitalize">
                ( {currentImgae} View )
              </p>
              <div className="mt-6 flex flex-col md:flex-row sm:flex-row xs:flex-row gap-4 justify-center md:px-4 sm:px-4 xs:px-4">
                <button className="border border-black lg:px-20 md:px-12 sm:px-8 xs:px-10 lg:py-2  md:py-2 sm:py-2 xs:py-2 rounded-md text-nowrap">
                  Add to cart
                </button>
                <button className="bg-black text-white lg:px-20 md:px-12 sm:px-10 xs:px-10 lg:py-2 md:py-2 sm:py-2 xs:py-2 rounded-md text-nowrap">
                  Buy now
                </button>
              </div>
            </div>
            {/* Right Section */}
            <div className="w-full md:w-1/2 md:mt-8 sm:mt-8 xs:mt-8 overflow-y-auto mt-[24px]">
              <BubblCard selectedCard={selectedCard} />
              {/* Additional components can be added here */}
            </div>
          </div>
          <section className=" py-14 bg-[#F5F5F5] rounded-2xl mt-[70px] lg:mx:10 md:mx-4 sm:mx-4 xs:mx-3 ">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">How It Works:</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className="flex flex-col items-center text-center h-full w-full"
                  >
                    <div className="w-40 h-40 flex items-center justify-center">
                      <Image
                        src={step.image}
                        alt={step.title}
                        width={400}
                        height={400}
                      />
                    </div>
                    <h3 className="text-lg font-bold mt-4">{step.id}</h3>
                    <p className="text-gray-600 w-4/5">{step.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <div className="w-full mt-10  sm:px-4 xs:pl-3 ">
            <>
              <h2 className="text-xl sm:text-2xl font-bold  text-[#333333] py-6">
                Similar Items You Might Also Like
              </h2>
              <div className="grid grid-cols-3 lg:gap-x-10 md:lg:gap-x-10 overflow-auto sm:gap-x-10 xs:gap-x-2">
                {Products.map((product: any) => (
                  <div
                    key={product.id}
                    className="card-parent-container flex-none  md:w-auto cursor-pointer w-full bg-white transition 
                                             duration-300 ease-in-out  snap-start"
                  >
                    <div className="relative mt-4 border bg-[#F3F3F3] w-full rounded-[10px] hover:shadow-lg flex flex-col gap-4 xs:gap-0 gap-x-6 pb-2">
                      <div className="flex justify-center items-center  px-2 py-2">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={500}
                          height={500}
                          className=" object-contain transition-transform duration-500"
                        />
                      </div>
                      <div className="hidden sm:block xs:block">
                        <div className="flex justify-between items-center">
                          <div className="w-max border rounded-lg bg-white flex items-center justify-center px-2 py-[4px] ml-2.5">
                            <p className="w-max content p-0 m-0 text-[#8C8C8C] lg:text-[16px] md:text-[12px] sm:text-[12px] xs:text-[8px]">
                              {product.name}
                            </p>
                          </div>
                          <div className="flex justify-center items-center relative sm:hidden xs:hidden ">
                            {product?.colors && product?.colors?.length > 0 && (
                              <CircleContainer colors={product?.colors} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between pt-4 lg:flex md:flex  xs:hidden sm:hidden ">
                      <div className="px-2">
                        <h3 className="text-md text-[#9F9F9F] inter">
                          {product.title}
                        </h3>
                        <p className="text-black inter font-[600] text-[18px]  ">
                          {product.price}
                        </p>
                      </div>
                      <div className="px-2">
                        <p className=" bg-[#AC6CFF] rounded-md text-white py-0.5 px-2 text-sm inter  ">
                          {product.discount}
                        </p>
                      </div>
                    </div>{" "}
                  </div>
                ))}
              </div>
            </>
          </div>
        </div>
        <div className="bg-black sm:px-3 xs:px-3">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ProductList;
