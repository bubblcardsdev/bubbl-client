import { useState } from "react";

type ParentProps = {
  onDataChange:(value:number) =>void

}

export default function SlideBar({onDataChange} :ParentProps) {
    const [value, setValue] = useState(0); // Start from 0
    const [isDragging, setIsDragging] = useState(false);
  
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(Number(e.target.value));
      // let value =Number(e.target.value) * 50
      //  if (value < 10) value=10

      onDataChange(Number(e.target.value))
    };
  
    return (
      <div className="w-full px-[2%]">
        <div className="relative">
          {/* Background track */}
          <div className="w-[100%] h-2 bg-[linear-gradient(to_right,_#88B294,_#76AB35)] rounded-full overflow-hidden">
            {/* Progress fill - now properly starts from 0 */}
            <div
              className="h-full bg-[#76C535] rounded-full transition-all duration-100 ease-out"
              style={{ width: `${(value / 20) * 100}%` }}
            ></div>
          </div>
          
          {/* Hidden input for slider functionality */}
          <input
            type="range"
            min="0"  
            max="20"
            value={value}
            onChange={handleChange}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="absolute inset-0 w-[100%] h-full opacity-0 cursor-pointer "
          />
          
          {/* Thumb handle */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white border-4 border-[#76C535] rounded-full pointer-events-none shadow-md transition-transform ${
              isDragging ? "scale-125" : "scale-100"
            }`}
            style={{
              left: `${(value / 20) * 100}%`,
              transition: "transform 0.1s ease-out, left 0.1s ease-out",
            }}
          ></div>
        </div>
      </div>
    );
  }