"use client";
import { useState } from "react";
import FullCustomCard from '../../../assets/product/productCardImg/basiccard.png'
import Image from 'next/image';

const materials = [
    { id: "pvc", name: "PVC Card",image:"", price: 1200, patterns: ["pvc1", "pvc2", "pvc3", "pvc4", "pvc5", "pvc6", "pvc7", "pvc8"]},
    { id: "metal", name: "Metal Card", image:"/cards/NameCustom_metalcard.png",price: 1999, patterns: ["metal1", "metal2", "metal3", "metal4", "metal5", "metal6", "metal7"] },
    { id: "bamboo", name: "Bamboo Card",image:"", price: 999, patterns: ["pattern1", "pattern2", "pattern3"] },
];
const BubblNameCustom = () => {
    const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
    const [selectedPattern, setSelectedPattern] = useState(selectedMaterial.patterns[0]);
  
    return (
        <>
            <div className="flex flex-col w-full max-w-lg">
                <h2 className="text-2xl font-semibold mt-3">Bubbl Name Custom</h2>
                <p className="text-gray-500">Personalize your Bubbl Card with your name and choose from available patterns & colors</p>
                {/* Price */}
                <p className="text-2xl font-bold mt-2">₹ {selectedMaterial.price} <span className="text-gray-500 text-lg">per card</span></p>
                {/* Material Selection */}
                <div className="mt-4">
                    <h3 className="font-semibold ">Card Material:</h3>
                    <div className="flex gap-3 mt-2 ">
                        {materials.map((material) => (
                            <button
                                key={material.id}
                                onClick={() => {
                                    setSelectedMaterial(material);
                                    setSelectedPattern(material.patterns[0]); // Reset pattern on material change
                                }}
                                className={`px-3 py-8 border rounded-md ${selectedMaterial.id === material.id ? "border-[#9C4BFF]" : "border-gray-300"}`}
                            >
                                {material.name}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Pattern Selection */}
                <div className="mt-4">
                    <h3 className="font-semibold ">Select your Pattern</h3>
                    <div className="grid grid-cols-4 gap-x-8 gap-y-4 mt-2  w-full">
                        {selectedMaterial.patterns.map((pattern) => (
                            <button
                                key={pattern}
                                onClick={() => setSelectedPattern(pattern)}
                                className={`w-[100px] h-[80px] border ${selectedPattern === pattern ? "border-[#9C4BFF]" : "border-gray-300"} rounded-md bg-[#EFEFEF]`}
                            >
                                <Image src={`/images/${materials}.png`} alt={pattern} className="w-full h-full object-cover" />
                            </button>
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
            </div>
        </>
    )
}

export default BubblNameCustom
