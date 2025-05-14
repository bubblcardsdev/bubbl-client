import React, { useState } from "react";

const CarouselSize = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [1, 2, 3, 4, 5];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto py-8">
      {/* Fixed height container to prevent layout shift */}
      <div className="flex justify-center gap-4 items-center overflow-hidden h-60">
        {items.map((item, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + items.length) % items.length;
          const isNext = index === (currentIndex + 1) % items.length;

          const baseClasses =
            "transition-all duration-300 flex items-center justify-center rounded-xl shadow-md text-2xl font-semibold";

          let sizeClasses = "w-32 h-32 opacity-50 scale-90";
          if (isActive) sizeClasses = "w-48 h-48 opacity-100 scale-100";
          else if (isPrev || isNext) sizeClasses = "w-40 h-40 opacity-75 scale-95";

          return (
            <div
              key={index}
              className={`${baseClasses} ${sizeClasses} bg-gray-100`}
            >
              {item}
            </div>
          );
        })}
      </div>

      <div className="absolute inset-y-1/2 left-4 transform -translate-y-1/2">
        <button
          onClick={prevSlide}
          className="text-3xl font-bold text-gray-600 hover:text-black"
        >
          ‹
        </button>
      </div>

      <div className="absolute inset-y-1/2 right-4 transform -translate-y-1/2">
        <button
          onClick={nextSlide}
          className="text-3xl font-bold text-gray-600 hover:text-black"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default CarouselSize;
