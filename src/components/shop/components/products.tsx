"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { isEmpty } from "lodash";
const CircleContainer = ({ colors }: { colors: string[] }) => {
  // const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative max-w-[300px] z-10"
      // onMouseEnter={() => setHovered(true)}
      // onMouseLeave={() => setHovered(false)}
    >
      {colors.length > 0 &&
        colors.map((color, index) => {
          console.log(color);
          return (
            <div
              key={index}
              className="absolute w-[15px] h-[15px] rounded-full transition-all ease-in-out duration-500 bottom-[-6px]"
              style={{
                backgroundColor: color,
                right: `${10 + index * 3}px`,
                // transform: hovered ? `translateX(-${15 * index}px)` : "none",
                transform: `translateX(-${15 * index}px)`,
              }}
              // onClick={() => setHovered(false)}
            />
          );
        })}
    </div>
  );
};

export type TitleInfo = {
  title: string;
  description: string;
};

export type TitleMap = {
  [key: string]: TitleInfo;
};

export type Card = {
  id: string;
  name: string;
  title: string;
  price: string;
  image: string;
  discount: string;
  secondaryImage: string | null;
  colors: Array<string>;
  material: string;
  cardType: string;
};

type ProductProps = {
  title: TitleMap;
  data: any;
};

function Products(props: ProductProps) {
  const { data = [], title } = props;
  const [hoverImage, setHoverImage] = useState<number | string | null>(null);
  const router = useRouter();
  const handleCardClick = (id: string | number) => {
    router.push(`/product/${id}`);
  };
  return (
    <div className="w-full top-6">
      {data &&
        Object.keys(data).map((key: string, index: number) => {
          const product: Array<Card> = data[key];
          if (!product) return null;
          return (
            <div className="flex flex-col gap-6 w-full md:px-0" key={index}>
              <div className="w-full mt-[60px] ml-0 ">
                <h1 className="w-full text-3xl text-black font-bold mb-2">
                  {title[key]?.title}
                </h1>
                <p className="w-full text-[#7F7F7F]  text-[16px]">
                  {title[key]?.description}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full box-border ">
                {!isEmpty(product) &&
                  product.map((card: any) => {
                    console.log(key, card);
                    return (
                      <div
                        key={card.productId}
                        className="cursor-pointer w-full bg-white transition duration-300 ease-in-out"
                        onClick={() => handleCardClick(card.productId)}
                      >
                        <div className="relative border bg-[#F3F3F3] rounded-[10px] hover:shadow-lg flex flex-col gap-4 gap-x-6 pb-2">
                          <div
                            onMouseEnter={() => setHoverImage(card.productId)}
                            onMouseLeave={() => setHoverImage(null)}
                            className="flex justify-center items-center px-2 py-2"
                          >
                            <Image
                              src={card.primaryImage}
                              alt={card.productName}
                              width={500}
                              height={500}
                              className=" object-cover transition-transform duration-500"
                              style={{
                                opacity:
                                  hoverImage === card.productId ? 0.9 : 1,
                                transform:
                                  hoverImage === card.productId
                                    ? "scale(1.05)"
                                    : "scale(1)",
                              }}
                            />
                          </div>
                          <div className=" flex justify-between items-center ">
                            <div className="w-max  border  rounded-lg  bg-white  lex items-center justify-center px-2 py-[4px] ml-2.5 ">
                              <p className="w-max content p-0 m-0 text-[#8C8C8C] inter text-[14px]">
                                {/* {card?.cardType} */}
                                {/* {card?.material} */}
                                {card?.productName}
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
                              {card?.productName}
                            </h3>
                            <p className="text-black inter font-[600] text-[18px]  ">
                              RS. {card.sellingPrice}
                            </p>
                          </div>

                          {Number(card.discount) > 0 && (
                            <div className="px-2">
                              <p className=" bg-[#AC6CFF] rounded-md text-white py-0.5 px-2 text-sm inter  ">
                                {card.discount}%
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Products;
