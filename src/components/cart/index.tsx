"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Bluecard from "../../assets/product/productCardImg/basiccard.png";
import Footer from "../footerPage/index";
import { Link } from "lucide-react";

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
const cardsData: any = [
  {
    id: 1,
    title: "Card",
    description: "Bubbl basic card",
    price: 699,
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
const Cart = (props: any) => {
  const [hoverImage, setHoverImage] = useState<any>("");
  const [cards, setCards] = useState(cardsData);
  const router = useRouter();

  const handleBuyNow = () => {
    router.push("/checkout");
  };
  const handleHover = (id: any) => {
    setHoverImage(id);
  };
  const removeHandleHover = () => {
    setHoverImage("");
  };
  const handleIncrease = (id: number) => {
    setCards((prev: any) => {
      console.log(prev, "aa");
      return prev.map((card: any) => {
        if (id == card.id) {
          return {
            ...card,
            quantity: card.quantity + 1,
          };
        }
        return card;
      });
    });
  };
  const handleDecrease = (id: number) => {
    console.log(id, "cards");
    setCards((prev: any) =>
      prev.map((card: any) =>
        card.id === id && card.quantity > 1
          ? { ...card, quantity: card.quantity - 1 }
          : card
      )
    );
  };
  const handleRemove = (id: number) => {
    setCards((prev: any) => prev.filter((card: any) => card.id !== id));
  };

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
    <div className="py-3 h-screen">
      <div className="max-w-[1300px] mx-auto pt-[100px] mb-4 2xl:px-[20px] xl:px-[30px] lg:px-[100px] md:px-[20px] sm:px-[20px] xs:px-[20px]">
        <div className="flex flex-col md:flex-row items-center md:items-start lg:gap-20 md:gap-[60px]">
          <div className="w-full md:w-[60%] flex flex-col gap-1">
            {/* Shopping Cart */}
            <h2 className="text-xl sm:text-2xl font-bold  text-[#333333]">
              Shopping cart (2)
            </h2>
            <p className="text-[#7F7F7F] text-sm sm:text-base  font-bold py-0">
              Cart it, Love it, Own it.
            </p>
            <div className="flex flex-col gap-4 px-3 py-4 md:flex-col sm:flex-col xs:flex-col bg-[#F5F5F5] rounded-xl mt-[20px]">
              {cards.map((value: any) => (
                <div
                  key={value.id}
                  className="flex items-center  w-full xs:pl-1.5"
                >
                  <div className="rounded-[8px] w-[90px] h-[65px] flex items-center justify-center  box-border bg-[#E5E5E5]">
                    <Image
                      src={value?.image}
                      alt="card"
                      className="box-border w-full h-full"
                    />
                  </div>
                  <div className="flex items-center flex-col sm:flex-row px-2 gap-x-8 gap-y-2 w-full md:justify-between">
                    <div className="flex justify-between w-full items-center lg:gap-x-10 md:gap-x-10 sm:gap-x-8 xs:gap-x-2">
                      <div className="space-y-2 sm:space-y-0 xs:space-y-0">
                        <p className="text-[16px] sm:text-[14px] xs:text-[12px] text-[#7F7F7F] font-semibold">
                          Card
                        </p>
                        <p className="text-[16px] text-black font-semibold  sm:text-[14px] xs:text-[12px] text-nowrap">
                          Bubbl basic card
                        </p>
                      </div>
                      <div className="flex rounded-[8px] items-center border border-black gap-x-4 h-fit px-2">
                        <p
                          className=" m-0 p-0 cursor-pointer"
                          onClick={() => handleDecrease(value.id)}
                        >
                          -
                        </p>
                        <p className=" m-0 p-0 text-[10px] text-center">
                          {value.quantity}
                        </p>
                        <p
                          className=" m-0 p-0 cursor-pointer"
                          onClick={() => handleIncrease(value.id)}
                        >
                          +
                        </p>
                      </div>
                    </div>
                    <div className=" flex  w-full gap-x-14 lg:px-8 sm:px-0 xs:px-0 lg:justify-around sm:justify-between xs:justify-between">
                      <p className="font-extrabold text-black lg:text-[20px]  sm:text-right sm:text-[14px] xs:text-[12px]">
                        ₹{value.price * value.quantity}/-
                      </p>
                      <p
                        className="underline  text-[16px]sm:text-[14px] xs:text-[12px] cursor-pointer"
                        onClick={() => handleRemove(value.id)}
                      >
                        Remove
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-[40%] md:sticky top-[100px] flex flex-col gap-3 sm:mt-[20px] xs:mt-[20px]">
            <div className="w-full flex flex-col gap-8 xs:px-0 sticky top-0 ">
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
                  <p>₹45.00</p>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <p className=" text-[#7F7F7F]">Shipping</p>
                  <p>₹5.00</p>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <p className=" text-[#7F7F7F]">Discount</p>
                  <p>- ₹10.00</p>
                </div>
                <div className="flex justify-between font-semibold text-sm sm:text-base">
                  <p>
                    Total <br />
                    <span className="text-[#7F7F7F] text-sm font-thin">
                      ( Incl of all Taxes )
                    </span>
                  </p>
                  <p>₹40.00</p>
                </div>
              </div>
              <button
                className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div className="w-full mt-10 pl-2 pr-0">
          <h2 className="text-xl sm:text-2xl font-bold text-[#333333] py-6">
            Similar Items You Might Also Like
          </h2>
          <div className="grid grid-flow-col auto-cols-[80%] sm:auto-cols-[45%] md:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide pb-4 ">
            {Products.map((product) => (
              <div
                key={product.id}
                className="snap-start rounded-lg  transition duration-300 ease-in-out"
              >
                <div className="relative mt-4 bg-[#F3F3F3] rounded-[10px] flex flex-col gap-2 pb-2">
                  <div className="flex justify-center items-center px-2 py-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      className=" object-contain transition-transform duration-500"
                    />
                  </div>
                  <div className="px-2 flex justify-between items-center">
                    <div className="border rounded-lg bg-white px-2 py-[4px]">
                      <p className="text-[#8C8C8C] text-sm">{product.name}</p>
                    </div>
                    {/* {product.colors && product.colors.length > 0 && (
                      <CircleContainer colors={product.colors} />
                    )} */}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 px-2">
                  <div>
                    <h3 className="text-sm text-[#9F9F9F]">{product.title}</h3>
                    <p className="text-black font-semibold text-lg">
                      {product.price}
                    </p>
                  </div>
                  <p className="bg-[#AC6CFF] rounded-md text-white py-0.5 px-2 text-sm">
                    {product.discount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-black  md:px-4 sm:px-4 xs:px-4 mt-[65px]">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
