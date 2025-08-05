"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import CircleContainer from "../common/circleContainer";
import { getCart, setCart } from "../../helpers/localStorage";
import { isEmpty } from "lodash";
import { CartItem } from "@/src/lib/interface";


const Cart = () => {
  // const [hoverImage, setHoverImage] = useState<any>("");
  const [cards, setCards] = useState<CartItem[]>([]);
  const router = useRouter();

  const handleBuyNow = () => {
    if (cards.length > 0) {
      router.push("/checkout");
    }
  };
  useEffect(() => {
    const storedCart = getCart();
    if (storedCart) {
      setCards(JSON.parse(storedCart));
    }
  }, []);

  const handleIncrease = (productId:string) => {
    const updatedCards = cards.map((card) => {
      if (card.productId === productId) {
        return { ...card, quantity: card.quantity + 1 };
      }
      return card;
    });
    setCards(updatedCards);
    if (typeof window !== "undefined") {
      setCart(JSON.stringify(updatedCards));
    }
  };

  const handleDecrease = (productId:string) => {
    const updatedCards = cards
      .map((card) => {
        if (card.productId === productId) {
          const newQuantity = card.quantity - 1;
          return newQuantity > 0 ? { ...card, quantity: newQuantity } : null;
        }
        return card;
      })
      .filter((card): card is CartItem => card !== null); // Remove null entries

    setCards(updatedCards);
    if (typeof window !== "undefined") {
      setCart(JSON.stringify(updatedCards));
    }
  };

  const handleRemove = (productId:string) => {
    const updatedCards = cards.filter((card) => card.productId !== productId);
    setCards(updatedCards);
    if (typeof window !== "undefined") {
      setCart(JSON.stringify(updatedCards));
    }
  };

  const subTotal = cards.reduce(
    (acc, item) => acc + item.sellingPrice * item.quantity,
    0
  );
  const orginalPriceTotal = cards.reduce(
    (acc, item) => acc + item.originalPrice * item.quantity,
    0
  );
  const shipping =  0; // Example fixed shipping cost
  const discount = orginalPriceTotal - subTotal ; // Example: 0% discount
  const total = subTotal + shipping;

  const Products = [
    {
      id: 1,
      name: "Full Custom",
      title: "Bubbl Full Custom",
      price: "Rs.999",
      image: "/purple.png",
      discount: "18.77%",
      colors: ["red", "blue", "green", "yellow", "purple"],
    },
    {
      id: 2,
      name: "Name Custom",
      title: "Bubbl Name Custom",
      price: "Rs.799",
      image: "/purple.png",
      discount: "18.77%",
      colors: ["red", "blue", "green", "yellow", "purple"],
    },
    {
      id: 3,
      name: "Metal Card",
      title: "Bubbl Metal Card",
      price: "Rs.1999",
      image: "/purple.png",
      discount: "18.77%",
      colors: ["red", "blue", "green", "yellow", "purple"],
    },
  ];
  return (
    <div className="max-w-[1300px] mx-auto pt-[100px] mb-4 2xl:px-[20px] xl:px-[30px] lg:px-[100px] md:px-[20px] sm:px-[20px] xs:px-[20px]">
      <div className="flex flex-col md:flex-row items-center md:items-start lg:gap-20 md:gap-[60px]">
        <div className="w-full md:w-[60%] flex flex-col gap-1">
          {/* Shopping Cart */}
          <h2 className="text-xl sm:text-2xl font-bold  text-[#333333]">
            Shopping cart ({cards.length})
          </h2>
          <p className="text-[#7F7F7F] text-sm sm:text-base  font-bold py-0">
            Cart it, Love it, Own it.
          </p>
          <div className="flex flex-col gap-4 px-3 py-4 md:flex-col sm:flex-col xs:flex-col bg-[#F5F5F5] rounded-xl mt-[20px]">
            {!isEmpty(cards) ? (
              cards.map((value: CartItem) => {
                const {
                  quantity,
                  productId,
                  imageUrl,
                  sellingPrice,
                  name,
                  deviceType,
                } = value;
                return (
                  <div
                    key={productId}
                    className="flex items-center  w-full xs:pl-1.5"
                  >
                    <div className="rounded-[8px] w-[90px] h-[65px] flex items-center justify-center  box-border bg-[#E5E5E5]">
                      <Image
                        src={imageUrl}
                        alt="card"
                        className="box-border w-full h-full"
                        height={100}
                        width={100}
                      />
                    </div>
                    <div className="flex items-center flex-col sm:flex-row px-2 gap-x-8 gap-y-2 w-full md:justify-between">
                      <div className="flex justify-between w-full items-center lg:gap-x-10 md:gap-x-10 sm:gap-x-8 xs:gap-x-2">
                        <div className="space-y-2 sm:space-y-0 xs:space-y-0">
                          <p className="text-[16px] sm:text-[14px] xs:text-[12px] text-[#7F7F7F] font-semibold">
                            {deviceType}
                          </p>
                          <p className="text-[16px] text-black font-semibold  sm:text-[14px] xs:text-[12px] text-nowrap">
                            {name}
                          </p>
                        </div>
                        <div className="flex rounded-[8px] items-center border border-black gap-x-4 h-fit px-2">
                          <p
                            className=" m-0 p-0 cursor-pointer bg-[]"
                            onClick={() => handleDecrease(productId)}
                          >
                            -
                          </p>
                          <p className=" m-0 p-0 text-[10px] text-center">
                            {value.quantity}
                          </p>
                          <p
                            className=" m-0 p-0 cursor-pointer"
                            onClick={() => handleIncrease(productId)}
                          >
                            +
                          </p>
                        </div>
                      </div>
                      <div className=" flex  w-full gap-x-14 lg:px-8 sm:px-0 xs:px-0 lg:justify-around sm:justify-between xs:justify-between">
                        <p className="font-extrabold text-black lg:text-[20px]  sm:text-right sm:text-[14px] xs:text-[12px]">
                          ₹{sellingPrice * quantity}/-
                        </p>
                        <p
                          className="underline  text-[16px]sm:text-[14px] xs:text-[12px] cursor-pointer"
                          onClick={() => handleRemove(productId)}
                        >
                          Remove
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>no Data here</p>
            )}
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
                <p className=" text-[#7F7F7F]">
                  SubTotal ({cards.length} items)
                </p>
                <p>₹{subTotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <p className=" text-[#7F7F7F]">Shipping</p>
                <p>₹{shipping.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <p className=" text-[#7F7F7F]">Discount</p>
                <p> ₹{discount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between font-semibold text-sm sm:text-base">
                <p>
                  Total <br />
                  <span className="text-[#7F7F7F] text-sm font-thin">
                    ( Incl of all Taxes )
                  </span>
                </p>
                <p>₹{total.toFixed(2)}</p>
              </div>
            </div>
            <button
              className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300 ease-in-out"
              onClick={handleBuyNow}
              disabled={cards.length === 0}
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
                  {product.colors && product.colors.length > 0 && (
                    <CircleContainer colors={product.colors} />
                  )}
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
  );
};

export default Cart;
