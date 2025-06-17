import Image from "next/image";
export type Product = {
  id: number;
  name: string;
  title: string;
  image: string;
  price: string;
  discount: string;
  colors: string[];
};

type ProductCardProps = {
  card: Product;
  handleCardClick: (id:number) => void;
};

export const ProductCard = ({ card, handleCardClick }:ProductCardProps) => (
  <div
    className="cursor-pointer w-full transition duration-300 ease-in-out"
    onClick={() => handleCardClick(card.id)}
  >
    <div className="bg-[#282828] border border-[#4F4F4F] rounded-[16px] hover:shadow-lg flex flex-col overflow-hidden">
      <div className="flex justify-center items-center p-4 group">
        <Image
          src={card.image}
          alt={card.name}
          width={500}
          height={300}
          className="w-full h-[250px] object-contain transition-transform duration-500 group-hover:scale-[1.2]"
        />
      </div>
      <div className="flex justify-between items-center px-4 pb-3">
        <div className="rounded-lg bg-[#333333] flex items-center justify-center px-3 py-1">
          <p className="text-white text-sm font-medium m-0">{card.name}</p>
        </div>
        {/* {card?.colors?.length > 0 && (
          <div className="flex justify-center items-center">
            <CircleContainer colors={card.colors} />
          </div>
        )} */}
      </div>
    </div>
    <div className="flex justify-between pt-4 px-2">
      <div>
        <h3 className="text-md text-white font-medium">{card.title}</h3>
        <p className="text-white font-semibold text-[18px]">{card.price}</p>
      </div>
      <div>
        <p className="bg-[#9747FF] rounded-md text-white py-0.5 px-2 text-sm">
          {card.discount}
        </p>
      </div>
    </div>
  </div>
);
