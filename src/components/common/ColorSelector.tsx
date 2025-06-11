import { ColorSelectorProps, Mode } from "@/src/lib/interface";

export const ColorSelector = <T extends string>({
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
            className={`md:w-7 md:h-7 xs:w-5 xs:h-5 ${
              item.color
            } rounded-full hover:scale-110 transition-all duration-200 xs: ${
              item.name === selected 
                ? `ring-2 ring-offset-2 ${console.log(item)} ring-white shadow-lg scale-110`
                : "hover:shadow-md"
            }`}
            onClick={() => setSelected(item.name)}
          />
        ))}
      </div>
    </div>
  );
  


export const ModeColorSelector = <T extends Mode>({
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
  className={`md:w-7 md:h-7 xs:w-5 xs:h-5 ${
    item.color
  } rounded-full hover:scale-110 transition-all duration-200 ${
    item.name === selected
      ? `ring-offset-2 shadow-lg scale-110 ${
          item.name === "Black" 
            ? "ring-1 ring-white" // Thinner ring for high contrast
            : item.name === "White" 
              ? "ring-2 ring-black" // Darker gray for better visibility
              : "ring-2 ring-red-400" // Default for other colors
        }`
      : "hover:shadow-md"
  }`}
  onClick={() => setSelected(item.name)}
/>
      ))}
    </div>
  </div>
);