"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
// import "./cards.css";

import FullCustomCard from "../../../../assets/product/productCardImg/fullCustom.png";
import FullCustomCardFrontBack from "../../../../assets/product/productCardImg/fullCustomCard_frontback.png";
import BubblBasicCardBlack from "../../../../assets/product/productCardImg/basiccard.png";
import BubblBasicCardBlackFrontBack from "../../../../assets/product/productCardImg/metalCard_frontBack.png";
import MetalCard from "../../../../assets/product/productCardImg/metalCard.png";
import MetalCardFrontBack from "../../../../assets/product/productCardImg/metalCard_frontBack.png";
import BlueCard from "../../../../assets/product/productCardImg/blueCard.png";
import BlueCardFrontBack from "../../../../assets/product/productCardImg/metalCard_frontBack.png";
import socket from "../../../../assets/product/productCardImg/socket.png";
import socketFrontBack from "../../../../assets/product/productCardImg/socketFullView.png";
import TileV2 from "../../../../assets/product/productCardImg/tile.png";
import TileV2FrontBack from "../../../../assets/product/productCardImg/tileV2.png";
import Band from "../../../../assets/product/productCardImg/band.png";
import BandFullView from "../../../../assets/product/productCardImg/Bubbl_band.png";
import Standee from "../../../../assets/product/productCardImg/standee.png";
import Workezbackside from "../../../../assets/product/productFullImg/workez_backside.png";

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
        "Bubbl aims to replace paper business cards with sustainable options. We offer custom branding and bulk orders for corporate clients. Join us today!",
    },
    basic_card: {
      title: "Bubbl Basic Card",
      description:
        "Bubbl aims to replace paper business cards with sustainable options. We offer custom branding and bulk orders for corporate clients. Join us today!",
    },
    bandstandee: {
      title: "Bubbl Band and Standee",
      description:
        "Bubbl aims to replace paper business cards with sustainable options. We offer custom branding and bulk orders for corporate clients. Join us today!",
    },
    bundle_devices: {
      title: "Bubbl Bundle Device",
      description:
        "Bubbl aims to replace paper business cards with sustainable options. We offer custom branding and bulk orders for corporate clients. Join us today!",
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
          secondaryImage: FullCustomCardFrontBack,
          colors: [],
        },
        {
          id: 2,
          name: "Name Custom",
          title: "Bubbl Name Custom",
          price: "Rs.799",
          image: BubblBasicCardBlack,
          discount: "18.77%",
          secondaryImage: BubblBasicCardBlackFrontBack,
          colors: [],
        },
        {
          id: 3,
          name: "Metal Card",
          title: "Bubbl Metal Card",
          price: "Rs.1999",
          image: MetalCard,
          discount: "18.77%",
          secondaryImage: MetalCardFrontBack,
          colors: [],
        },
      ],
    },
    {
      sectionType: "basic_card",
      cards: [
        {
          id: 4,
          name: "Card",
          title: "Bubbl Basic Card",
          price: "Rs.999",
          image: BlueCard,
          discount: "18.77%",
          secondaryImage: BlueCardFrontBack,
          colors: [],
        },
        {
          id: 5,
          name: "Socket",
          title: "Bubbl Socket",
          price: "Rs.799",
          image: socket,
          discount: "18.77%",
          secondaryImage: socketFrontBack,
          colors: [],
        },
        {
          id: 6,
          name: "Tile",
          title: "Bubbl Tile",
          price: "Rs.1999",
          image: TileV2,
          discount: "18.77%",
          secondaryImage: TileV2FrontBack,
          colors: [],
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
        <div className="flex flex-col gap-6 w-full" key={index}>
          <div className="w-full mt-[60px] ml-2">
            <h1 className="w-full text-3xl text-black font-bold mb-2">
              {title[product.sectionType]?.title}
            </h1>
            <p className="w-full text-[#7F7F7F] font-semibold text-[17px]">
              {title[product.sectionType]?.description}
            </p>
          </div>
          <div className="card-grid-alignment">
            {product.cards.map((card) => (
              <div
                key={card.id}
                className="card-parent-container px-2 cursor-pointer"
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
                        transform: hoverImage === card.id ? "scale(1.05)" : "scale(1)",
                      }}
                    />
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
