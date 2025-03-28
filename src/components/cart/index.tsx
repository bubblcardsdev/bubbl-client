"use client";
import React, { useState } from "react";
import Image from "next/image";
import Bluecard from "../../assets/product/productCardImg/basiccard.png";
import Footer from "../footerPage/index";

const CircleContainer = (props: any) => {
  const { colors } = props;
  const [hovered, setHovered] = useState(false);
  // const colors = ["red", "blue", "green", "yellow", "purple"];
  console.log(colors, "colors");
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

const Cart = (props: any) => {
  const [hoverImage, setHoverImage] = useState<any>("");

  const handleHover = (id: any) => {
    setHoverImage(id);
  };
  const removeHandleHover = () => {
    setHoverImage("");
  };
  const cardsData: any = [
    {
      id: 1,
      title: "Card",
      description: "Bubbl basic card",
      price: "699",
      quantity: 1,
      image: Bluecard,
    },
    {
      id: 2,
      title: "Card",
      description: "Bubbl basic card",
      price: "699",
      quantity: 1,
      image: Bluecard,
    },
    {
      id: 2,
      title: "Card",
      description: "Bubbl basic card",
      price: "699",
      quantity: 1,
      image: Bluecard,
    },
    {
      id: 2,
      title: "Card",
      description: "Bubbl basic card",
      price: "699",
      quantity: 1,
      image: Bluecard,
    },
    {
      id: 2,
      title: "Card",
      description: "Bubbl basic card",
      price: "699",
      quantity: 1,
      image: Bluecard,
    },
    {
      id: 2,
      title: "Card",
      description: "Bubbl basic card",
      price: "699",
      quantity: 1,
      image: Bluecard,
    },
  ];
  const Products = [
    {
      id: 1,
      name: "Full Custom",
      title: "Bubbl Full Custom",
      price: "Rs.999",
      image: Bluecard,
      discount: "18.77%",
      // colors:["blue"]
    },
    {
      id: 2,
      name: "Name Custom",
      title: "Bubbl Name Custom",
      price: "Rs.799",
      image: Bluecard,
      discount: "18.77%",
    },
    {
      id: 3,
      name: "Metal Card",
      title: "Bubbl Metal Card",
      price: "Rs.1999",
      image: Bluecard,
      discount: "18.77%",
    },
  ];
  return (
    <section className="">
      <div className="lg:px-0 md:px-12 sm:px-4 xs:px-1 px-6 pt-32 pb-12 flex flex-col gap-y-10 mx-auto max-w-[1300px] ">
        <div className="flex flex-col lg:flex-row  gap-14">
          {/* Shopping Cart */}
          <div className="w-full h-fit flex flex-col gap-y-6 ">
            <div className="w-full h-fit">
              <h2 className="text-xl sm:text-2xl font-bold  text-[#333333]">
                Shopping cart (2)
              </h2>
              <p className="text-[#7F7F7F] text-sm sm:text-base  font-bold mt-2 ">
                Cart it, Love it, Own it.
              </p>
            </div>
            {/* <div className="bg-[#F5F5F5] rounded-lg overflow-y-auto min-h-[500px]"> */}
            <div className=" max-h-[300px] overflow-auto flex flex-col gap-4 p-1 md:flex-col sm:flex-col xs:flex-col bg-[#F3F3F3] rounded-xl md:mx-4 sm:mx-2 xs:mx-2">
              {cardsData.map((value: any) => (
                <div
                  key={value.id}
                  className="flex items-center  w-full xs:pl-1.5 "
                >
                  <div className="rounded-[8px] w-[90px] h-[65px] flex items-center justify-center  box-border bg-[#F3F3F3]  ">
                    <Image
                      src={value?.image}
                      alt="card"
                      className="box-border w-full h-full"
                    />
                  </div>
                  <div className="flex items-center flex-col sm:flex-row px-2 gap-x-8 gap-y-2 w-full md:justify-between">
                    <div className="flex justify-between w-full items-center lg:gap-x-10 md:gap-x-10 sm:gap-x-8 xs:gap-x-2">
                      <div className="space-y-2 sm:space-y-0 xs:space-y-0">
                        <p className="text-[16px] text-[#7F7F7F] font-semibold">
                          Card
                        </p>
                        <p className="text-[16px] text-black font-semibold ">
                          Bubbl basic card
                        </p>
                      </div>
                      <div className="flex rounded-[8px] items-center border border-black gap-x-4 h-fit px-2 ">
                        <p className=" m-0 p-0">-</p>
                        <p className=" m-0 p-0 text-[10px] text-center">1</p>
                        <p className=" m-0 p-0">+</p>
                      </div>
                    </div>
                    <div className=" flex  w-full gap-x-14 lg:px-8 sm:px-0 xs:px-0 lg:justify-around sm:justify-between xs:justify-between">
                      <p className="font-extrabold text-black text-[20px]  sm:text-right">
                        ₹699/-
                      </p>
                      <p className="underline  text-[16px]">Remove</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* </div> */}
          </div>
          {/* Order Summary */}
          <div className="lg:w-2/3 flex flex-col gap-8 xs:px-2 ">
            <h2 className="text-xl sm:text-2xl font-bold">Order Summary</h2>
            <div className="flex items-center justify-between w-full p-3 px-4 bg-gray-100 rounded-[10px] ">
              <input
                type="text"
                placeholder="Discount code"
                className="w-full bg-transparent outline-none placeholder-gray-400 text-[#ACACAC] "
              />
              <button className=" text-purple-600 font-[500] ">Apply</button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-sm sm:text-base">
                <p className=" text-[#7F7F7F]">Subtotal (1 item)</p>
                <p>$45.00</p>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <p className=" text-[#7F7F7F]">Shipping</p>
                <p>$5.00</p>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <p className=" text-[#7F7F7F]">Discount</p>
                <p>- $10.00</p>
              </div>
              <div className="flex justify-between font-semibold text-sm sm:text-base">
                <p>
                  Total <br />
                  <span className="text-[#7F7F7F] text-sm font-thin">
                    ( Incl of all Taxes )
                  </span>
                </p>
                <p>$40.00</p>
              </div>
            </div>
            <div>
              <button className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700">
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div className="w-full mt-10  sm:px-4 xs:pl-3">
          <>
            <h2 className="text-xl sm:text-2xl font-bold  text-[#333333] py-6">
              Similar Items You Might Also Like
            </h2>
            <div
              className="  flex space-x-4 overflow-x-auto md:grid  my-4 scrollbar-hide hide-scrollbar
                                lg:grid-cols-[repeat(auto-fit,minmax(320px,1fr))] md:grid-cols-none sm:grid-cols-none
                                xs:grid-cols-none gap-5 w-full box-borderover flow-x-auto scrollbar-hide hide-scrollbar snap-x snap-mandatory "
            >
              {Products.map((product: any) => (
                <div
                  key={product.id}
                  className="card-parent-container flex-none  md:w-auto cursor-pointer w-full bg-white transition 
                                    duration-300 ease-in-out  sm:w-[200px] snap-start"
                >
                  <div className="relative mt-4 border bg-[#F3F3F3] rounded-[10px] hover:shadow-lg flex flex-col gap-4 gap-x-6 pb-2">
                    <div className="flex justify-center items-center  px-2 py-2">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="h-[300px] w-[500px] object-contain transition-transform duration-500"
                      />
                    </div>
                    <div className="hidden sm:block">
                      <div className="flex justify-between items-center">
                        <div className="w-max border rounded-lg bg-white flex items-center justify-center px-2 py-[4px] ml-2.5">
                          <p className="w-max content p-0 m-0 text-[#8C8C8C] lg:text-[16px] md:text-[12px]">
                            {product.name}
                          </p>
                        </div>
                        <div className="flex justify-center items-center relative">
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
      <div className="bg-black lg:px-0 md:px-12 sm:px-4 xs:px-1 px-6 ">
        <Footer />
      </div>
    </section>
  );
};

export default Cart;
