'use client';
import React, { useState } from 'react'
import Image from 'next/image';
import Bluecard from '../../assets/product/productCardImg/basiccard.png'
import Footer from '../footerPage/index'
const CircleContainer = (props: any) => {
    const { colors } = props
    const [hovered, setHovered] = useState(false);
    // const colors = ["red", "blue", "green", "yellow", "purple"];
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
const Cart = (props: any) => {
    const [hoverImage, setHoverImage] = useState<any>('')

    const handleHover = (id: any) => {
        setHoverImage(id)
    }
    const removeHandleHover = () => {
        setHoverImage('')
    }
    const cardsData: any = [
        {
            id: 1,
            title: 'Card',
            description: 'Bubbl basic card',
            price: '699',
            quantity: 1,
            image: Bluecard
        },
        {
            id: 2,
            title: 'Card',
            description: 'Bubbl basic card',
            price: '699',
            quantity: 1,
            image: Bluecard
        }
    ];
    const Products = [
        {
            id: 1,
            name: "Full Custom",
            title: "Bubbl Full Custom",
            price: "Rs.999",
            image: Bluecard,
            discount: "18.77%",
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
        {
            id: 4,
            name: " Basic",
            title: " Bubbl Basic",
            price: "Rs.699",
            image: Bluecard,
            discount: "10%",
        },
    ];
    return (
        <section className=''>
            <div className=' pt-32 pb-12 lg:px-16 md:px-12 sm:px-4 xs:px-1 px-6 flex flex-col gap-y-10 mx-auto max-w-[1300px] '>
                <div className="flex flex-col lg:flex-row  gap-14">
                    {/* Shopping Cart */}
                    <div className="w-full h-fit flex flex-col gap-y-6 ">
                        <div className='w-full h-fit'>
                            <h2 className="text-xl sm:text-2xl font-bold inter text-[#333333]">Shopping cart (2)</h2>
                            <p className="text-[#7F7F7F] text-sm sm:text-base inter font-bold mt-2">Cart it, Love it, Own it.</p>
                        </div>
                        {cardsData.map((value: any) => (
                            <div key={value.id} className='flex items-center bg-white  w-full mt-10 xs:pl-1.5'>
                                <div className='rounded-[8px] w-[90px] h-[65px] flex items-center justify-center  box-border bg-[#F3F3F3]  '>
                                    <Image src={value?.image} alt="card" className='box-border w-full h-full' />
                                </div>
                                <div className='flex items-center flex-col sm:flex-row px-2 gap-x-8 gap-y-2 w-full md:justify-between'>
                                    <div className='flex justify-between w-full items-center lg:gap-x-10 md:gap-x-10 sm:gap-x-8 xs:gap-x-2'>
                                        <div className='space-y-2 sm:space-y-0 xs:space-y-0'>
                                            <p className='inter text-[16px] text-[#7F7F7F] font-semibold'>Card</p>
                                            <p className='inter text-[16px] text-black font-semibold '>Bubbl basic card</p>
                                        </div>
                                        <div className='flex rounded-[8px] items-center border border-black gap-x-4 h-fit px-2 '>
                                            <p className='inter m-0 p-0'>-</p>
                                            <p className='inter m-0 p-0 text-[10px] text-center'>1</p>
                                            <p className='inter m-0 p-0'>+</p>
                                        </div>
                                    </div>
                                    <div className=' flex  w-full gap-x-14 lg:px-8 sm:px-0 xs:px-0 lg:justify-around sm:justify-between xs:justify-between'>
                                        <p className="font-extrabold text-black text-[20px] inter sm:text-right">₹699/-</p>
                                        <p className='underline inter text-[16px]'>Remove</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Order Summary */}
                    <div className="lg:w-2/3 flex flex-col gap-8 xs:px-2 ">
                        <h2 className="text-xl sm:text-2xl font-bold inter">Order Summary</h2>
                        <div className="flex items-center justify-between w-full p-3 px-4 bg-gray-100 rounded-[10px] ">
                            <input
                                type="text"
                                placeholder="Discount code"
                                className="w-full bg-transparent outline-none placeholder-gray-400 text-[#ACACAC] inter"
                            />
                            <button className="inter text-purple-600 font-[500] ">
                                Apply
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm sm:text-base">
                                <p className='inter text-[#7F7F7F]'>Subtotal (1 item)</p>
                                <p className='inter '>$45.00</p>
                            </div>
                            <div className="flex justify-between text-sm sm:text-base">
                                <p className='inter text-[#7F7F7F]'>Shipping</p>
                                <p className='inter'>$5.00</p>
                            </div>
                            <div className="flex justify-between text-sm sm:text-base">
                                <p className='inter text-[#7F7F7F]'>Discount</p>
                                <p className='inter '>- $10.00</p>
                            </div>
                            <div className="flex justify-between font-semibold text-sm sm:text-base">
                                <p className='inter '>Total <br /><span className='text-[#7F7F7F] text-sm font-thin'>( Incl of all Taxes )</span></p>
                                <p className='inter '>$40.00</p>
                            </div>
                        </div>
                        <div >
                            <button className=" inter w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold inter text-[#333333] py-6">
                            Similar Items You Might Also Like
                        </h2>

                        {/* Scrollable container for small screens */}
                        <div className="flex space-x-4 overflow-x-auto md:grid md:grid-cols-4 gap-4 my-2 scrollbar-hide ">
                            {Products.map((product) => (
                                <div key={product.id} className="card-parent-container flex-none w-[250px] md:w-auto">
                                    <div className="relative border bg-[#F3F3F3] rounded-[10px] hover:shadow-lg flex flex-col gap-4 pb-2 mt-4">
                                        <div onMouseEnter={() => handleHover(product.id)} onMouseLeave={removeHandleHover}
                                            className="flex justify-center items-center">
                                            <Image src={product.image} alt={product.name} className="h-[200px] object-contain" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="w-max border rounded-lg bg-white flex items-center justify-center px-2 py-[4px] ml-2.5">
                                                <p className="w-max content p-0 m-0 text-[#8C8C8C] inter text-[13px]">{product.name} </p>
                                            </div>
                                            <div className="flex justify-center items-center relative">
                                                {/* {product?.colors && product?.colors.length > 0 && <CircleContainer colors={product?.colors} />} */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between pt-4">
                                        <div className="px-2">
                                            <h3 className="text-[14px] text-[#9F9F9F] inter">{product.title}</h3>
                                            <p className="text-black inter font-[600] text-[15px]">{product.price}</p>
                                        </div>
                                        <div className="px-2">
                                            <p className="bg-[#AC6CFF] rounded-md text-white py-0.5 px-2 text-[12px] inter">{product.discount}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </section>
    );
};

export default Cart;