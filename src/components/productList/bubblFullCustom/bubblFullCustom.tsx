import React, { useState } from 'react'
import BuleCard from '../../../assets/product/productCardImg/basiccard.png'
import Image from 'next/image';

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
const BubblFullCustom = () => {
    const [activeTab, setActiveTab] = useState("description");
    const [selectedColor, setSelectedColor] = useState("");
    const [activeButton, setActiveButton] = useState('');
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
    return (
        < div className="w-1/2 p-3" >
            <h1 className="text-2xl font-semibold">Bubbl FullCustom</h1>
            <p className="text-gray-600 text-sm mt-1">Made with Recyclable PVC in a Matte finish with Spot UV coating.</p>
            <p className="text-2xl font-bold mt-4">₹ 999</p>
            <p className="text-gray-500 text-sm">incl. of all Tax</p>
            {/* Description */}
            <div className="mt-4 border-t pt-4">
                <h2 className="font-semibold">Note</h2>
                <p className="text-gray-500 text-sm mt-2 font-bold">
                  <span className='text-red-500 text-[22px]'>*</span>  The Smart NFC Business Card is designed to make sharing your professional details seamless and tech-forward.
                    Simply tap your card on any NFC-enabled smartphone, and your contact information, website, or social media links
                    instantly transfer to the recipient’s device—no apps or QR codes required.
                </p>
            </div>
        </div >

    )
}

export default BubblFullCustom
