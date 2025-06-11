import { useState } from "react";

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
              right:`${10 + index * 3}px`,
              transform: hovered ? `translateX(-${15 * index}px)` : "none",
            }}
            onClick={() => setHovered(false)}
          />
        ))}
    </div>
  );
};

export default CircleContainer;