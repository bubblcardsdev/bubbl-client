import { useState } from "react";
import Image from "next/image";
// import profileCardImg from "@/src/assets/HomePageIcons/profileCard.png"
import { useRouter } from "next/router";
import {
  Color,
  ColorItem,
  ColorSelectorProps,
  Mode,
  Size,
} from "@/src/lib/interface";
import { imageObj } from "../../../lib/constant";
import useWindowSize from "@/src/hooks/useWindowSize";

export default function ProfileCard() {
  const router = useRouter();
  const size: Size = useWindowSize();
  const [selectedColor, setSelectedColor] = useState<Color>("Blue");
  const [selectedMode, setSelectedMode] = useState<Mode>("Black");

  const colors: ColorItem<Color>[] = [
    { name: "Blue", color: "bg-blue-500" },
    { name: "Pink", color: "bg-pink-500" },
    { name: "Orange", color: "bg-orange-500" },
    { name: "LightBlue", color: "bg-[#00BCB6]" },
    { name: "Green", color: "bg-green-500" },
    { name: "Purple", color: "bg-purple-500" },
    { name: "Gray", color: "bg-gray-500" },
  ];

  const mode: ColorItem<Mode>[] = [
    { name: "Black", color: "bg-black" },
    { name: "White", color: "bg-white" },
  ];

  const ColorSelector = <T extends string>({
    title,
    items,
    selected,
    setSelected,
  }: ColorSelectorProps<T>) => (
    <div className="flex flex-col items-center mb-6">
      <h1 className="mb-3 font-semibold text-white">{title}</h1>
      <div className="flex gap-3 flex-wrap justify-center p-2">
        {items.map((item) => (
          <button
            key={item.name}
            aria-label={`Select ${item.name}`}
            className={`w-7 h-7 ${
              item.color
            } rounded-full hover:scale-110 transition-all duration-200 ${
              item.name === selected
                ? "ring-2 ring-offset-2 ring-white shadow-lg scale-110"
                : "hover:shadow-md"
            }`}
            onClick={() => setSelected(item.name)}
          />
        ))}
      </div>
    </div>
  );
  return (
    <section className="bg-[#ffffff]">
    <div className="rounded-b-[3rem] bg-gradient-to-b from-[#000000] via-[#000000] via-50% to-[#9746FF] w-full px-8 py-12 min-h-[100vh] flex">
      <div className="w-full max-w-[1300px] m-auto">
        <h4 className="text-white text-center text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight mb-5">
          Customize your Profile
        </h4>
        <h3 className="text-center mb-16 text-[#828282] text-xs sm:text-sm md:text-base font-semibold leading-relaxed">
          Customize every element to reflect your style, personality, and
          purpose.{(size?.width || 0) >= 576 && <br />} Make your profile as unique as
          you are!
        </h3>

        <div className="flex justify-center mb-8">
          <Image
            src={imageObj[selectedMode][selectedColor]}
            alt="profile"
            height={500}
            width={270}
            className="w-[80%] max-w-[270px] h-auto"
            priority
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <ColorSelector
            title="Mode"
            items={mode}
            selected={selectedMode}
            setSelected={setSelectedMode}
          />
          <ColorSelector
            title="Template Colour"
            items={colors}
            selected={selectedColor}
            setSelected={setSelectedColor}
          />
        </div>
        <div className="flex justify-center mt-3">
          <button
            className="px-4 sm:px-6 md:px-8 py-2 bg-[#9747FF] text-white text-sm sm:text-base rounded-[10px] hover:bg-purple-500 transition-colors"
            onClick={() => router.push("/shop")}
          >
            Explore more
          </button>
        </div>
      </div>
    </div>
    </section>
  );
}
