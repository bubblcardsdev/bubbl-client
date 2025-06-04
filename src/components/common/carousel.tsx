// components/ProductCarousel.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export const ProductCarousel = ({ 
  items,
  renderItem,
}: {
  items: any[];
  renderItem: (item: any) => React.ReactNode;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="xs:block sm:hidden relative px-4"> {/* Added px-8 for side padding */}
  <div className="overflow-hidden">
    <div 
      className="flex transition-transform duration-300"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {items.map((item, index) => (
        <div key={index} className="w-full flex-shrink-0 px-1">
          {renderItem(item)}
        </div>
      ))}
    </div>
  </div>
  
  {/* Left arrow positioned outside */}
  <button 
    onClick={prevSlide}
    className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
  >
    <ChevronLeft />
  </button>
  
  {/* Right arrow positioned outside */}
  <button 
    onClick={nextSlide}
    className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
  >
    <ChevronRight />
  </button>
</div>
  );
};