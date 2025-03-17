'use client';
import React, { useState } from 'react'
import Image from 'next/image';
import Footer from '../footerPage/index'
import BuleCard from '../../assets/product/productCardImg/basiccard.png'
import Bubbl_basic_card from './components/bubblBasicCard'
// import Bubbl_Full_custom from '../productList/bubblFullCustom/bubblFullCustom'
// import Bubbl_Name_custom from '../productList/bubblNameCustom/bubblNameCustom'
import Arrow_icon from '../../assets/icons/productIcon/productList_Arrow_icon'
const CircleContainer = (props: any) => {
  const { colors } = props
  const [hovered, setHovered] = useState(false);
  const [currentImgae, setCurrentImage] = useState("primary")
  return (
    <div
      className="relative max-w-[300px] z-10  "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {colors && colors.length > 0 && colors.map((color: any, index: number) => (
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
    title: "Setup your digital business card through our website, no additional app needed",
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
  const colors = [
    { name: "Blue", color: "bg-blue-500", image: "/product-blue.jpg" },
    { name: "Yellow", color: "bg-yellow-500", image: "/product-yellow.jpg" },
    { name: "Orange", color: "bg-orange-500", image: "/product-orange.jpg" },
    { name: "Red", color: "bg-red-500", image: "/product-red.jpg" },
    { name: "Green", color: "bg-green-500", image: "/product-green.jpg" },
    { name: "Purple", color: "bg-purple-500", image: "/product-purple.jpg" },
    { name: "Gray", color: "bg-gray-500", image: "/product-gray.jpg" },
    { name: "Black", color: "bg-black", image: "/product-black.jpg" }
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
      name: "Metal Card",
      title: "Bubbl Metal Card",
      price: "Rs.1999",
      image: BuleCard,
      discount: "18.77%",
      //   secondaryImage: MetalCardFrontBack,
      colors: ["red", "blue", "green", "yellow", "purple"],
    },
    {
      id: 4,
      name: "Metal Card",
      title: "Bubbl Metal Card",
      price: "Rs.1999",
      image: BuleCard,
      discount: "18.77%",
      //   secondaryImage: MetalCardFrontBack,
      colors: ["red", "blue", "green", "yellow", "purple"],
    },
  ];
  return (
    <>
      <div className='max-w-[1300px] mx-auto p-3 mt-[80px] '>
        <div className='ml-4 flex  items-center space-x-2'><a className='inter text-[14px] text-gray-400'>ProductList</a>
          <span className='text-center '><Arrow_icon /></span>
          <a className='inter text-[16px] text-black text-semibold'>Basic card</a>
        </div>
        {/* <div className="flex">
          <div className=" w-full  rounded-lg  flex  gap-14">
            <div className="w-full p-4 ">
              <div className="relative bg-[#EFEFEF] rounded-2xl p-4 w-full">
                <Image
                  src={BuleCard}
                  alt="Bubbl Card"
                  width={400}
                  height={400}
                  className="rounded-md h-[350px] object-fill w-full "
                />
                <div className="flex justify-center mt-2">
                  <div className="h-1 w-14 bg-gray-300 rounded-full mr-2 p-1"></div>
                  <div className="h-1 w-14 bg-purple-500 rounded-full p-1"></div>
                </div>
              </div>
              <p className="text-center text-sm mt-2">( Front View )</p>
              <div className="mt-6 flex gap-4 justify-center items-centerF">
                <button className="border border-black px-[55px] py-2 rounded-md md:text-nowrap sm:text-nowrap xs:text-nowrap">Add to cart</button>
                <button className="bg-black text-white px-[55px] py-2 rounded-md">Buy now</button>
              </div>
            </div>
            <div className='w-[80%]'>
              right side
              <Bubbl_basic_card />
              <Bubbl_Full_custom />
              <Bubbl_Name_custom />
            </div>
          </div>
        </div> */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-4">
          {/* Left Section - Image */}
          <div className="w-full md:w-1/2">
            <div className="relative bg-[#EFEFEF] rounded-2xl p-4 w-full">
              <Image
                src={BuleCard}
                alt="Bubbl Card"
                width={400}
                height={400}
                className="rounded-md h-[300px] md:h-[350px] object-fill w-full"
              />
              <div className="flex justify-center mt-2">
                <div className="h-1 w-12 bg-gray-300 rounded-full mr-2 p-1"></div>
                <div className="h-1 w-12 bg-purple-500 rounded-full p-1"></div>
              </div>
            </div>
            <p className="text-center text-sm mt-2">( Front View )</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="border border-black px-8 sm:px-10 py-2 rounded-md">Add to cart</button>
              <button className="bg-black text-white px-8 sm:px-10 py-2 rounded-md">Buy now</button>

            </div>
          </div>
          {/* Right Section */}
          <div className="w-full md:w-1/2">
            <Bubbl_basic_card />
            {/* Additional components can be added here */}
          </div>
        </div>

        <section className=" py-14 bg-[#F5F5F5] rounded-2xl mt-[70px] border">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">How It Works:</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center text-center h-full w-full"
                >
                  <div className="w-40 h-40 flex items-center justify-center">
                    <Image src={step.image} alt={step.title} width={400} height={400} />
                  </div>
                  <h3 className="text-lg font-bold mt-4">{step.id}</h3>
                  <p className="text-gray-600 w-4/5">{step.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="w-full mt-10">
          <>
            <h2 className="text-xl sm:text-2xl font-bold inter text-[#333333] py-6">
              Similar Items You Might Also Like
            </h2>
            {/* Scrollable container for small screens */}
            <div className="flex space-x-4 overflow-x-auto md:grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-3 gap-4 my-4 scrollbar-hide hide-scrollbar">
              {Products.map((product) => (
                <div key={product.id} className="card-parent-container flex-none w-[120px] sm:w-[180px] md:w-auto">
                  <div className="relative border bg-[#F3F3F3] rounded-[10px] hover:shadow-lg flex flex-col gap-4 pb-2 mt-4">
                    {/* Image - Always visible */}
                    <div className="flex justify-center items-center">
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="h-[80px] sm:h-[150px] object-contain"
                      />
                    </div>
                    {/* Details - Hidden on small screens */}
                    <div className="hidden sm:block">
                      <div className="flex justify-between items-center">
                        <div className="w-max border rounded-lg bg-white flex items-center justify-center px-2 py-[4px] ml-2.5">
                          <p className="w-max content p-0 m-0 text-[#8C8C8C] inter text-[16px]">{product.name}</p>
                        </div>
                        <div className="flex justify-center items-center relative">
                          {product?.colors && product?.colors.length > 0 && <CircleContainer colors={product?.colors} />}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="w-max content p-0 m-0 text-[#8C8C8C] inter text-[16px] lg:hidden">{product.name}</p>
                </div>
              ))}
            </div>
          </>
        </div>
      </div>
      <Footer />
    </>

  )
}

export default ProductList
