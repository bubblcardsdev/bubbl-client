// "use client";
import React, { useState, useEffect, useMemo } from "react";
import Footer from "../footerPage/index";
import Image, { StaticImageData } from "next/image";
import BubblCard from "./components/bubblCards";
import { setCart, getCart } from "../../helpers/localStorage";
import { useRouter } from "next/router";
// import Bubbl_Full_custom from '../productList/bubblFullCustom/bubblFullCustom'
// import Bubbl_Name_custom from '../productList/bubblNameCustom/bubblNameCustom'

import BreadCrumbs from "../common/BreadCrumbs";
import axios from "axios";
type CircleContainerProp = {
  colors: string[];
};

interface CardItem {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: StaticImageData;
  sellingPrice: number;
}
const CircleContainer = (props: CircleContainerProp) => {
  const { colors } = props;
  // const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative max-w-[300px] z-10  "
      // onMouseEnter={() => setHovered(true)}
      // onMouseLeave={() => setHovered(false)}
    >
      {colors &&
        colors.length > 0 &&
        colors.map((color: string, index: number) => (
          <div
            key={index}
            className={`absolute w-[15px] h-[15px] rounded-full transition-all ease-in-out duration-500 bottom-[-6px]`}
            style={{
              backgroundColor: color,
              right: `${10 + index * 3}px`,
              // transform: hovered ? `translateX(-${15 * index}px)` : "none",
              transform: `translateX(-${15 * index}px)`,
            }}
            // onClick={() => setHovered(false)}
          />
        ))}
    </div>
  );
};
const steps = [
  {
    id: 1,
    image: "/bubbl_product.png",
    title: "Order your bubbl right now",
  },
  {
    id: 2,
    image: "/mobileProfile.png",
    title:
      "Setup your digital business card through our website, no additional app needed",
  },
  {
    id: 3,
    image: "/QR_scan.png",
    title: "Once delivered, scan QR and set up your profile details",
  },
  {
    id: 4,
    image: "/networking.png",
    title: "Network like a pro",
  },
];
const materials = [
  {
    id: "pvc",
    name: "PVC Card",
    image: "/pvcCards/pvcPatten1.png",
    price: 1200,
    patterns: [
      "/pvcCards/pvc",
      "pvc2",
      "pvc3",
      "pvc4",
      "pvc5",
      "pvc6",
      "pvc7",
      "pvc8",
    ],
  },
  {
    id: "metal",
    name: "Metal Card",
    image: "/metalCards/patten1.png",
    price: 1999,
    patterns: [
      "metal1",
      "metal2",
      "metal3",
      "metal4",
      "metal5",
      "metal6",
      "metal7",
    ],
  },
  {
    id: "bamboo",
    name: "Bamboo Card",
    image: "/metalCards/patten2.png",
    price: 999,
    patterns: ["pattern1", "pattern2", "pattern3"],
  },
];
const ProductList = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<any>({});
  const [itemId, setItemId] = useState<number>(1);
  const [currentImgae, setCurrentImage] = useState("front");
  const [selectedColor, setSelectedColor] = useState(data?.color?.[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(data?.material?.[0]);
  const [selectedPattern, setSelectedPattern] = useState(data?.patterns?.[0]);
  const [cards, setCards] = useState<CardItem[]>([]);

  useEffect(() => {
    if (data) {
      setSelectedColor(data?.color?.[0]);
      setSelectedMaterial(data?.material?.[0]);
      setSelectedPattern(data?.patterns?.[0]);
    }
  }, [data]);

  useEffect(() => {
    if (id) {
      axios
        .post("http://devapii.bubbl.cards/api/cart/productDetails", {
          productId: id,
        })
        .then((res) => {
          setData(res?.data?.data);
          console.log("qqq-2", res?.data?.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return;
    }
  }, [id]);

  useEffect(() => {
    const cartItem: any = JSON.parse(getCart() ?? "[]");
    if (cartItem && cartItem.length > 0) {
      setItemId(cartItem?.[cartItem?.length - 1]?.id + 1);
    }
  }, []);

  const payLoad = useMemo(() => {
    return {
      id: itemId,
      productId: data?.productDetail?.productId,
      productType: data?.productDetail?.name,
      productName: data?.productDetail?.name,
      price: Number(data?.productDetail?.price),
      discount: data?.discount,
      image:
        (data?.color?.length > 0 && selectedColor?.imageUrl) ||
        (data?.patterns?.length > 0 && selectedPattern?.imageUrl) ||
        selectedMaterial?.imageUrl,
      sellingPrice: Number(data?.productDetail?.price),
      quantity: 1,
      color: selectedColor,
      material: selectedMaterial,
      pattern: selectedPattern,
    };
  }, [data, selectedColor, selectedMaterial, selectedPattern]);

  // useEffect(() => {
  //   if (router?.query?.id) {
  //     const cardType =
  //       Products.find((e) => e.id.toString() === router?.query?.id)?.title ||
  //       "";
  //     console.log("card/", cardType);

  //     setSelectedCard(cardType);
  //   }
  // }, []);
  const handleIncrease = (id: number) => {
    const updatedCards = cards.map((card: any) => {
      if (card.id === id) {
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
    const updatedCards = cards.map((card: any) => {
      if (card.productId === id && card.quantity > 1) {
        return { ...card, quantity: card.quantity - 1 };
      }
      return card;
    });
    setCards(updatedCards);
    if (typeof window !== "undefined") {
      setCart(JSON.stringify(updatedCards));
    }
  };
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
      name: "Tile v2",
      title: "Bubbl Tile",
      price: "Rs.1999",
      image: "/purple.png",
      discount: "18.77%",
      colors: ["red", "blue", "green", "yellow", "purple"],
    },
  ];

  //  useEffect(() => {
  //   if (router?.query?.id) {
  //     const cardType =
  //       Products.find((e) => e.id.toString() === router?.query?.id)?.title || "";
  //     setSelectedCard(cardType);
  //   }
  // }, [router?.query?.id,Products]);

  const primaryImage =
    (data?.color?.length > 0 && selectedColor?.imageUrl) ||
    (data?.patterns?.length > 0 && selectedPattern?.imageUrl) ||
    selectedMaterial?.imageUrl;

  const flippedImage = currentImgae == "front" ? primaryImage : primaryImage;
  const flipImage = (view: string) => {
    setCurrentImage(view);
  };

  const addToCard = () => {
    const getCartItems = JSON.parse(getCart() ?? "[]");
    let updatedCart = []
     // Check if item already exists based on productId + selected variations
    const isAlreadyInCart = getCartItems.some(
      (item: any) =>
        item.productId === payLoad.productId
    );
 
    if (isAlreadyInCart) {
    updatedCart =  getCartItems.map((item:any)=>{
         return
      })
    }

     updatedCart = [...getCartItems, payLoad];
    setItemId(itemId + 1);
    setCart(JSON.stringify(updatedCart));
  };


  return (
    <>
      <div className="py-3 h-screen">
        <div className="max-w-[1300px] mx-auto pt-12 mb-4">
          <div className="flex flex-col md:flex-row items-center md:items-start lg:gap-20 md:gap-[60px] p-4  ">
            {/* Left Section - Image */}
            <div className="w-full md:w-1/2 md:sticky top-[85px] flex flex-col gap-3">
              <BreadCrumbs value={data?.productDetail?.name}></BreadCrumbs>
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
                <button
                  onClick={addToCard}
                  className="border border-black lg:px-20 md:px-12 sm:px-8 xs:px-10 lg:py-2  md:py-2 sm:py-2 xs:py-2 rounded-md text-nowrap hover:bg-[#9747FF] hover:text-white hover:border-hidden"
                >
                  Add to cart
                </button>
                {/* {cards.map((value: CardItem) => ( 
                  {/* <div className="flex rounded-[8px] items-center border border-black gap-x-4 h-fit px-2">
                    <p
                      className=" m-0 p-0 cursor-pointer"
                      // onClick={() => handleDecrease(value.id)}
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
                 ))} */}
                <button className="bg-black text-white lg:px-20 md:px-12 sm:px-10 xs:px-10 lg:py-2 md:py-2 sm:py-2 xs:py-2 rounded-md text-nowrap hover:opacity-80">
                  Buy now
                </button>
              </div>
            </div>
            {/* Right Section */}
            <div className="w-full md:w-1/2 md:mt-8 sm:mt-8 xs:mt-8 overflow-y-auto mt-[24px]">
              <BubblCard
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedCard={data?.productDetail?.name}
                selectedMaterial={selectedMaterial}
                setSelectedMaterial={setSelectedMaterial}
                selectedPattern={selectedPattern}
                setSelectedPattern={setSelectedPattern}
                materials={data?.material}
                details={data}
                patterns={data?.patterns}
              />
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
                      <h3 className="text-sm text-[#9F9F9F]">
                        {product.title}
                      </h3>
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
        <div className="bg-black sm:px-3 xs:px-3 mt-[65px]">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ProductList;
