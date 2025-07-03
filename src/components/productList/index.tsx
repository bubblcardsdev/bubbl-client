import React, { useState, useEffect, useMemo } from "react";
import Footer from "../footerPage/index";
import Image from "next/image";
import BubblCard from "./components/bubblCards";
import { setCart, getCart } from "../../helpers/localStorage";
import { useRouter } from "next/router";
import BreadCrumbs from "../common/BreadCrumbs";
import axios from "axios";

// =======================
// Types Section
// =======================
interface SelectedOptionType {
  id: string;
  name: string;
  imageUrl: string;
}

interface ProductDetailType {
  productId: string;
  name: string;
  price: number;
}

interface ProductListResponse {
  productDetail: ProductDetailType;
  discount: string;
  color: SelectedOptionType[];
  material: SelectedOptionType[];
  patterns: SelectedOptionType[];
}

interface CartItemType {
  id: number;
  productId: string;
  productType: string;
  productName: string;
  price: number;
  discount: string;
  image: string;
  sellingPrice: number;
  quantity: number;
  color: SelectedOptionType | null;
  material: SelectedOptionType | null;
  pattern: SelectedOptionType | null;
}

interface CircleContainerProp {
  colors: string[];
}

// =======================
// Component Starts
// =======================
const CircleContainer = ({ colors }: CircleContainerProp) => (
  <div className="relative max-w-[300px] z-10">
    {colors.map((color, index) => (
      <div
        key={index}
        className="absolute w-[15px] h-[15px] rounded-full transition-all ease-in-out duration-500 bottom-[-6px]"
        style={{
          backgroundColor: color,
          right: `${10 + index * 3}px`,
          transform: `translateX(-${15 * index}px)`,
        }}
      />
    ))}
  </div>
);

const steps = [
  { id: 1, image: "/bubbl_product.png", title: "Order your bubbl right now" },
  { id: 2, image: "/mobileProfile.png", title: "Setup your digital business card through our website, no additional app needed" },
  { id: 3, image: "/QR_scan.png", title: "Once delivered, scan QR and set up your profile details" },
  { id: 4, image: "/networking.png", title: "Network like a pro" },
];

const ProductList: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState<ProductListResponse | null>(null);
  const [itemId, setItemId] = useState<number>(1);
  const [currentImage, setCurrentImage] = useState<"front" | "back">("front");
  const [selectedColor, setSelectedColor] = useState<SelectedOptionType | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<SelectedOptionType | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<SelectedOptionType | null>(null);

  useEffect(() => {
    if (data) {
      setSelectedColor(data.color?.[0] || null);
      setSelectedMaterial(data.material?.[0] || null);
      setSelectedPattern(data.patterns?.[0] || null);
    }
  }, [data]);

  useEffect(() => {
    if (id) {
      axios
        .post("http://devapii.bubbl.cards/api/cart/productDetails", { productId: id })
        .then((res) => {
          setData(res?.data?.data);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  useEffect(() => {
    const cartItems: CartItemType[] = JSON.parse(getCart() ?? "[]");
    if (cartItems.length > 0) {
      setItemId(cartItems[cartItems.length - 1].id + 1);
    }
  }, []);

  const payLoad: CartItemType = useMemo(() => {
    return {
      id: itemId,
      productId: data?.productDetail?.productId ?? "",
      productType: data?.productDetail?.name ?? "",
      productName: data?.productDetail?.name ?? "",
      price: Number(data?.productDetail?.price ?? 0),
      discount: data?.discount ?? "",
      image:
        (data?.color?.length && selectedColor?.imageUrl) ||
        (data?.patterns?.length && selectedPattern?.imageUrl) ||
        selectedMaterial?.imageUrl ||
        "",
      sellingPrice: Number(data?.productDetail?.price ?? 0),
      quantity: 1,
      color: selectedColor,
      material: selectedMaterial,
      pattern: selectedPattern,
    };
  }, [data, selectedColor, selectedMaterial, selectedPattern, itemId]);

  const flipImage = (view: "front" | "back") => {
    setCurrentImage(view);
  };

  const addToCart = () => {
    const cartItems: CartItemType[] = JSON.parse(getCart() ?? "[]");
    const isAlreadyInCart = cartItems.some(
      (item) => item.productId === payLoad.productId
    );

    const updatedCart = isAlreadyInCart
      ? cartItems.map((item) =>
          item.productId === payLoad.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cartItems, payLoad];

    setItemId(itemId + 1);
    setCart(JSON.stringify(updatedCart));
  };

  const primaryImage =
    (data?.color?.length && selectedColor?.imageUrl) ||
    (data?.patterns?.length && selectedPattern?.imageUrl) ||
    selectedMaterial?.imageUrl ||
    "";

  const flippedImage = primaryImage;

  const Products = [
    {
      id: 1,
      name: "Full Custom",
      title: "Bubbl Full Custom",
      price: "Rs.999",
      image: "/purple.png",
      discount: "18.77%",
      colors: ["red", "blue", "green", "yellow", "purple"],
    },
    {
      id: 2,
      name: "Name Custom",
      title: "Bubbl Name Custom",
      price: "Rs.799",
      image: "/purple.png",
      discount: "18.77%",
      colors: ["red", "blue", "green", "yellow", "purple"],
    },
    {
      id: 3,
      name: "Tile v2",
      title: "Bubbl Tile",
      price: "Rs.1999",
      image: "/purple.png",
      discount: "18.77%",
      colors: ["red", "blue", "green", "yellow", "purple"],
    },
  ];

  return (
    <>
      <div className="py-3 h-screen">
        <div className="max-w-[1300px] mx-auto pt-12 mb-4">
          <div className="flex flex-col md:flex-row items-center md:items-start lg:gap-20 md:gap-[60px] p-4">
            {/* Left Section - Image */}
            <div className="w-full md:w-1/2 md:sticky top-[85px] flex flex-col gap-3">
              <BreadCrumbs value={data?.productDetail?.name || ""} />
              <div className="relative bg-[#EFEFEF] rounded-2xl lg:p-4 w-full">
                <Image
                  src={flippedImage}
                  alt="Bubbl Card"
                  width={400}
                  height={400}
                  className="rounded-md h-[300px] md:h-[350px] object-fill w-full"
                />
                <div className="flex justify-center mt-2">
                  <div
                    role="button"
                    onClick={() => flipImage("front")}
                    className={`h-1 w-12 mb-2 ${
                      currentImage === "front" ? "bg-purple-500" : "bg-gray-300"
                    } rounded-full mr-2 p-1`}
                  />
                  <div
                    role="button"
                    onClick={() => flipImage("back")}
                    className={`h-1 w-12 ${
                      currentImage === "back" ? "bg-purple-500" : "bg-gray-300"
                    } rounded-full mr-2 p-1`}
                  />
                </div>
              </div>
              <p className="text-center text-sm mt-2 capitalize">( {currentImage} View )</p>
              <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
                <button
                  onClick={addToCart}
                  className="border border-black lg:px-20 md:px-12 sm:px-8 xs:px-10 lg:py-2 md:py-2 sm:py-2 xs:py-2 rounded-md hover:bg-[#9747FF] hover:text-white"
                >
                  Add to cart
                </button>
                <button className="bg-black text-white lg:px-20 md:px-12 sm:px-10 xs:px-10 lg:py-2 md:py-2 sm:py-2 xs:py-2 rounded-md hover:opacity-80">
                  Buy now
                </button>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/2 mt-[24px] overflow-y-auto">
              <BubblCard
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedCard={data?.productDetail?.name || ""}
                selectedMaterial={selectedMaterial}
                setSelectedMaterial={setSelectedMaterial}
                selectedPattern={selectedPattern}
                setSelectedPattern={setSelectedPattern}
                materials={data?.material}
                details={data}
                patterns={data?.patterns}
              />
            </div>
          </div>

          {/* How it works section */}
          <section className="py-14 bg-[#F5F5F5] rounded-2xl mt-[70px]">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">How It Works:</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
                {steps.map((step) => (
                  <div key={step.id} className="flex flex-col items-center text-center">
                    <div className="w-40 h-40 flex items-center justify-center">
                      <Image src={step.image} alt={step.title} width={400} height={400} />
                    </div>
                    <h3 className="text-lg font-bold mt-4">{step.id}</h3>
                    <p className="text-gray-600 w-4/5">{step.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Similar items section */}
          <div className="w-full mt-10 pl-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#333333] py-6">
              Similar Items You Might Also Like
            </h2>
            <div className="grid grid-flow-col auto-cols-[80%] sm:auto-cols-[45%] md:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide pb-4">
              {Products.map((product) => (
                <div key={product.id} className="snap-start rounded-lg transition duration-300 ease-in-out">
                  <div className="relative mt-4 bg-[#F3F3F3] rounded-[10px] flex flex-col gap-2 pb-2">
                    <div className="flex justify-center items-center px-2 py-2">
                      <Image src={product.image} alt={product.name} width={400} height={400} />
                    </div>
                    <div className="px-2 flex justify-between items-center">
                      <div className="border rounded-lg bg-white px-2 py-[4px]">
                        <p className="text-[#8C8C8C] text-sm">{product.name}</p>
                      </div>
                      {product.colors.length > 0 && <CircleContainer colors={product.colors} />}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 px-2">
                    <div>
                      <h3 className="text-sm text-[#9F9F9F]">{product.title}</h3>
                      <p className="text-black font-semibold text-lg">{product.price}</p>
                    </div>
                    <p className="bg-[#AC6CFF] rounded-md text-white py-0.5 px-2 text-sm">{product.discount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-black mt-[65px]">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ProductList;
