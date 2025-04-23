"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import FullCustomCard from "../../../assets/product/productCardImg/fullCustom.png";
import NameCustomCard from "../../../assets/product/productCardImg/metalCard.png";
import BasicCard from '../../../assets/product/productCardImg/basiccard.png'
import Scoket from '../../../assets/product/productCardImg/socket.png'
import Tile from '../../../assets/product/productCardImg/tile.png'
import Band from '../../../assets/product/productCardImg/band.png'
import Standee from '../../../assets/product/productCardImg/standee.png'






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
              right: `${10 + index * 3}px`,
              transform: hovered ? `translateX(-${15 * index}px)` : "none",
            }}
            onClick={() => setHovered(false)}
          />
        ))}
    </div>
  );
};

function Cards() {
  const [hoverImage, setHoverImage] = useState<number | null>(null);
  const router = useRouter();

  const title: Record<string, { title: string; description: string }> = {
    custom_card: {
      title: "Bubbl Custom Card",
      description:
        " Bubbl aims to replace paper business cards with sustainable options. We offer custom branding and bulk orders for corporate clients. Join us today",
    },
    basic_card: {
      title: "Bubbl Basic Card",
      description:
        "Pick from our line of Bubbl- Basics - Affordable, Eco-friendly and perfect for first time users who just want to get the feel of futuristic networking.",
    },
    bubbl_other_product: {
      title: "Bubbl  other product",
      description:
        "Bubbl aims to replace paper business cards with sustainable options. We offer custom branding and bulk orders for corporate clients. Join us today!",
    },
    bundle_devices: {
      title: "Bubbl Bundle Device",
      description:
        "If you want to get a more than just one bubbl, don't worry, we have fan favourite bundles at great deals. Making new connections has never bees easier!",
    },
  };

  const products = [
    {
      sectionType: "custom_card",
      cards: [
        {
          id: 1,
          name: "Full Custom",
          title: "Bubbl Full Custom",
          price: "Rs.999",
          image: FullCustomCard,
          discount: "18.77%",
          secondaryImage: FullCustomCard,
          colors: [],
        },
        {
          id: 2,
          name: "Name Custom",
          title: "Bubbl Name Custom",
          price: "Rs.799",
          image: NameCustomCard,
          discount: "18.77%",
          secondaryImage: NameCustomCard,
          colors: [],
        },
       
      ],
    },
    {
      sectionType: "basic_card",
      cards: [
        {
          id: 4,
          name: "Basic Card",
          title: "Bubbl Basic Card",
          price: "Rs.999",
          image: BasicCard,
          discount: "18.77%",
          secondaryImage: BasicCard,
          colors: ['black','blue','green','yellow','red','white','purple'],
        },
        {
          id: 5,
          name: "Socket",
          title: "Bubbl Socket",
          price: "Rs.799",
          image: Scoket,
          discount: "18.77%",
          secondaryImage: Scoket,
          colors: ['black','blue','green','yellow','red','white','purple'],
        },
        {
          id: 6,
          name: "Tile",
          title: "Bubbl Tile",
          price: "Rs.1999",
          image: Tile,
          discount: "18.77%",
          secondaryImage: Tile,
          colors: ['black','blue','green','yellow','red','white','purple'],
        },
      ],
    },
    {
      sectionType: "bubbl_other_product",
      cards: [
        {
          id: 5,
          name: "Band",
          title: "Bubbl Band",
          price: "Rs.1499",
          image: Band,
          discount: "18.77%",
          secondaryImage: Band,
          colors: ['black','white'],
        },
        {
          id: 6,
          name: "Standee",
          title: "Bubbl Standee",
          price: "Rs.1499",
          image: Standee,
          discount: "18.77%",
          secondaryImage: Standee,
          colors: ['black','white'],
        },
      ],
    },
  ];

  const handleCardClick = (id: number) => {
    router.push(`/productList/${id}`);
  };

  return (
    <div className="w-full top-6">
      {products.map((product, index) => (
        <div className="flex flex-col gap-6 w-full md:px-0"  key={index}>
          <div className="w-full mt-[60px] ml-0 ">
            <h1 className="w-full text-3xl text-black font-bold mb-2">
              {title[product.sectionType]?.title}
            </h1>
            <p className="w-full text-[#7F7F7F] font-semibold text-[17px]">
              {title[product.sectionType]?.description}
            </p>
          </div>
          <div className="grid lg:grid-cols-[repeat(3,minmax(320px,1fr))] md:grid-cols-[repeat(2,minmax(320px,1fr))] sm:grid-cols-none xs:grid-cols-none gap-5 w-full box-border ">
            {product.cards.map((card) => (
              <div
                key={card.id}
                className="cursor-pointer w-full bg-white transition duration-300 ease-in-out"
                onClick={() => handleCardClick(card.id)}
              >
                <div className="relative border bg-[#F3F3F3] rounded-[10px] hover:shadow-lg flex flex-col gap-4 gap-x-6 pb-2">
                  <div
                    onMouseEnter={() => setHoverImage(card.id)}
                    onMouseLeave={() => setHoverImage(null)}
                    className="flex justify-center items-center px-2 py-2"
                  >
                    <Image
                      src={card.image}
                      alt={card.name}
                      width={500}
                      height={500}
                      className="h-[300px] w-[500px] object-contain transition-transform duration-500"
                      style={{
                        opacity: hoverImage === card.id ? 0.9 : 1,
                        transform:
                          hoverImage === card.id ? "scale(1.05)" : "scale(1)",
                      }}
                    />
                  </div>
                  <div className=" flex justify-between items-center ">
                    <div className="w-max  border  rounded-lg  bg-white  lex items-center justify-center px-2 py-[4px] ml-2.5 ">
                      <p className="w-max content p-0 m-0 text-[#8C8C8C] inter text-[14px]">
                        {card.name}
                      </p>
                    </div>
                    <div className="flex justify-center items-center relative  ">
                      {card?.colors && card?.colors?.length > 0 && (
                        <CircleContainer colors={card?.colors} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between pt-4 ">
                  <div className="px-2">
                    <h3 className="text-md text-[#9F9F9F] inter">
                      {card.title}
                    </h3>
                    <p className="text-black inter font-[600] text-[18px]  ">
                      {card.price}
                    </p>
                  </div>
                  <div className="px-2">
                    <p className=" bg-[#AC6CFF] rounded-md text-white py-0.5 px-2 text-sm inter  ">
                      {card.discount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
