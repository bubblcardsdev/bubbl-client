import React, { useState } from 'react'
import BuleCard from '../../../assets/product/productCardImg/basiccard.png'
import Image from 'next/image';

const materials = [
    { id: "pvc", name: "PVC Card", image: "/pvcCards/pvcPatten1.png", price: 1200, patterns: ["/pvcCards/pvc", "pvc2", "pvc3", "pvc4", "pvc5", "pvc6", "pvc7", "pvc8"] },
    { id: "metal", name: "Metal Card", image: "/metalCards/patten1.png", price: 1999, patterns: ["metal1", "metal2", "metal3", "metal4", "metal5", "metal6", "metal7"] },
    { id: "bamboo", name: "Bamboo Card", image: "/metalCards/patten2.png", price: 999, patterns: ["pattern1", "pattern2", "pattern3"] },
];
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
const BubblBasicCrd = () => {
    const [activeTab, setActiveTab] = useState("description");
    const [selectedColor, setSelectedColor] = useState("");
    const [activeButton, setActiveButton] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
    const [selectedPattern, setSelectedPattern] = useState(selectedMaterial.patterns[0]);
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
        < div className="" >
            <h1 className="text-[28px] font-semibold mt-0">Bubbl Basic Card</h1>
            <p className="text-[#7F7F7F] text-[15px] font-[500] mt-2">Made with Recyclable PVC in a Matte finish with Spot UV coating.</p>
            <p className="text-[34px] font-[700] mt-4 leading- letter-spaceing tracking-wide">₹ 275</p>
            <p className="text-gray-600 text-sm">incl. of all Tax</p>
            {/* Color Selection */}
            <div className="mt-4">
                <p className="font-normal tracking-wide">Select Color <span className='font-semibold'>:</span> <span className="font-semibold text-[16px]">{selectedColor}</span></p>
                <div className="flex gap-2 mt-2">
                    {colors.map((item) => (
                        <button
                            key={item.name}
                            className={`w-6 h-6 ${item.color} rounded-full border-2 border-transparent focus:border-black `}
                            onClick={() => setSelectedColor(item.name)}
                        ></button>
                    ))}
                </div>
            </div>
            {/* Material Selection */}
            <div className="mt-4">
                <h3 className="font-semibold ">Card Material:</h3>
                <div className="grid grid-cols-5  mt-2  gap-y-4 gap-x-8">
                    {materials.map((material) => (
                        <button
                            key={material.id}
                            onClick={() => {
                                setSelectedMaterial(material);
                                setSelectedPattern(material.patterns[0]); // Reset pattern on material change
                            }}
                            className={` bg-[#EFEFEF] border rounded-md ${selectedMaterial.id === material.id ? "border-[#9C4BFF]" : "border-gray-300 "}`}
                        >
                            {/* {material.name} */}
                            <Image src={material?.image} alt={material?.name} width={100} height={100} className='' />
                        </button>
                    ))}
                </div>
            </div>
            {/* Pattern Selection */}
            <div className="">
                <h3 className="font-semibold ">Select your Pattern</h3>
                <div className="grid grid-cols-5 w-full gap-y-4 gap-x-8 ">
                    {selectedMaterial.patterns.map((pattern) => (
                        <div
                            key={pattern}
                            onClick={() => setSelectedPattern(pattern)}
                            className={` border ${selectedPattern === pattern ? "border-[#9C4BFF]" :
                                 "border-gray-300"} rounded-md bg-[#EFEFEF] flex items-center justify-center`}
                        >
                            <Image src={'/metalCards/patten1.png'} alt={pattern} className=" rounded-md"
                                width={100}
                                height={100} />
                        </div>
                    ))}
                </div>
            </div>
            {/* Name Input */}
            <div className="mt-4">
                <label className="block text-sm font-medium">Name</label>
                <input type="text" placeholder="Your Name" className="w-full p-3 bg-[#F5F5F5] outline-none rounded-md mt-1 text-black text-sm" />
            </div>
            {/* Font Selection */}
            <div className="mt-4">
                <label className="block text-sm font-medium">Font</label>
                <select className="w-full p-3 bg-[#F5F5F5] rounded-md mt-1 outline-none">
                    <option>Amenti</option>
                    <option>Roboto</option>
                    <option>Montserrat</option>
                </select>
            </div>
            {/* Description */}
            <div className="mt-4 border-t pt-4">
                <h2 className="font-semibold">Description</h2>
                <p className="text-[#7F7F7F] text-sm mt-2">
                    The Smart NFC Business Card is designed to make sharing your professional details seamless and tech-forward.
                    Simply tap your card on any NFC-enabled smartphone, and your contact information, website, or social media links
                    instantly transfer to the recipient’s device—no apps or QR codes required.
                </p>
            </div>
        </div>

    )
}

export default BubblBasicCrd
