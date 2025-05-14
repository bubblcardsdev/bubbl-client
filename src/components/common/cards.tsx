"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";







const CircleContainer = ({ colors }: { colors: string[] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative max-w-[300px] z-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {colors.length > 0 &&
        colors.map((color, index) => (
          <div
            key={index}
            className="absolute w-[15px] h-[15px] rounded-full transition-all ease-in-out duration-500 bottom-[-6px]"
            style={{
              backgroundColor: color,
              right:`${10 + index * 3}px`,
              transform: hovered ? `translateX(-${15 * index}px)` : "none",
            }}
            onClick={() => setHovered(false)}
          />
        ))}
    </div>
  );
};

function CardsReusable() {
  const router = useRouter();
  const products = [
    {
      id: 4,
      name: "Basic Card",
      title: "Bubbl Basic Card",
      price: "Rs.999",
      image: "/productCardImg/basiccard.png",
      discount: "18.77%",
      secondaryImage:"/productCardImg/basiccard.png",
      colors: ['black','blue','green','yellow','red','white','purple'],
    },
    {
      id: 5,
      name: "Socket",
      title: "Bubbl Socket",
      price: "Rs.799",
      image:"/productCardImg/socket.png" ,
      discount: "18.77%",
      secondaryImage: "/productCardImg/socket.png",
      colors: ['black','blue','green','yellow','red','white','purple'],
    },
    {
      id: 6,
      name: "Tile",
      title: "Bubbl Tile",
      price: "Rs.1999",
      image:"/productCardImg/tile.png" ,
      discount: "18.77%",
      secondaryImage: "/productCardImg/tile.png",
      colors: ['black','blue','green','yellow','red','white','purple'],
    },
  ];

  const handleCardClick = (id: number) => {
    router.push(`/productList/${id}`);
  };

  return (
    <div className="bg-black text-white">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mx-auto xs:py-0 sm:py-10">
      {products.map((card) => (
        <div
          key={card.id}
          className="cursor-pointer w-full transition duration-300 ease-in-out"
          onClick={() => handleCardClick(card.id)}  
        >
          <div className="bg-[#282828] border border-[#4F4F4F] rounded-[16px] hover:shadow-lg flex flex-col overflow-hidden">
            <div
              className="flex justify-center items-center p-4 group"
            >
              <Image
                src={card.image}
                alt={card.name}
                width={500}
                height={300}
                className="w-full h-[250px] object-contain transition-transform duration-500 group-hover:scale-[1.2]"
              />
            </div>
            <div className="flex justify-between items-center px-4 pb-3">
              <div className="rounded-lg bg-[#333333] flex items-center justify-center px-3 py-1">
                <p className="text-white text-sm font-medium m-0">
                  {card.name}
                </p>
              </div>
              {card?.colors?.length > 0 && (
                <div className="flex justify-center items-center">
                  <CircleContainer colors={card.colors} />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between pt-4 px-2">
            <div>
              <h3 className="text-md text-white font-medium">
                {card.title}
              </h3>
              <p className="text-white font-semibold text-[18px]">
                {card.price}
              </p>
            </div>
            <div>
              <p className="bg-[#9747FF] rounded-md text-white py-0.5 px-2 text-sm">
                {card.discount}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}

export default CardsReusable;