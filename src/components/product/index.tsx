import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import ProductInfo from "./components/productInfo";
import { setCart, getCart } from "../../helpers/localStorage";
import { useRouter } from "next/router";
import BreadCrumbs from "../common/BreadCrumbs";
import { toast } from "react-toastify";
import { ProductDetailMapper } from "@/src/lib/mapper";
import { fetchProductDetails } from "@/src/services/productDetailsApi";
import { UserContext } from "@/src/context/userContext";
import { CART } from "@/src/context/action";
import MonoColorLoader from "../common/monoColorLoader";

interface ColorType {
  name: string;
  colorName: string;
  colorCode: string;
  imageUrl?: string;
}

interface PatternType {
  productId: string;
  patternName: string;
  imageUrl: string;
}

interface MaterialType {
  productId: string;
  materialName: string;
  imageUrl: string;
}

interface CartItemType {
  productId: string;
  productType: string;
  productName: string;
  price: number;
  discount: string;
  image: string;
  sellingPrice: number;
  quantity: number;
  color?: ColorType | null;
  material?: MaterialType | null;
  patterns?: PatternType | null;
}

const steps = [
  { id: 1, image: "/bubbl_product.png", title: "Order your bubbl right now" },
  {
    id: 2,
    image: "/mobileProfile.png",
    title:
      "Setup your digital business card through our website, no additional app needed",
  },
  {
    id: 3,
    image: "/QR_scan.png",
    title: "Once delivered, scan QR and set up your profile details",
  },
  { id: 4, image: "/networking.png", title: "Network like a pro" },
];

const ProductList: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState<"front" | "back">("front");

  const { dispatch }:any = useContext(UserContext);


  const getProductDetail = async () => {
    setLoading(true);
    try {
      const response = await fetchProductDetails(id as string);
      setData(response);
      const layout = document.getElementById("siteLayout");
      console.log(layout);
      if (layout) {
        layout.scrollTo({ top: 0, behavior: "smooth" });
      }
      // window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
    setLoading(false);
  };



  const {
    primaryImage,
    secondaryImage,
    sellingPrice,
    originalPrice,
    discountPercentage,
    name,
    deviceTypeId,
    deviceType,
    availability,
  } = ProductDetailMapper(data?.productDetail);

  useEffect(() => {
    if (id) {
      getProductDetail();
    }
  }, [id]);

  const flipImage = (view: "front" | "back") => {
    setCurrentImage(view);
  };

  const addToCart = () => {
    const cart = getCart() || "[]"
    const cartItems: CartItemType[] = JSON.parse(cart);

    const isAlreadyInCart = cartItems.some((item) => item.productId === id);

    const updatedCart = isAlreadyInCart
      ? cartItems.map((item) =>
        item.productId === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      : [
        ...cartItems,
        {
          quantity: 1,
          productId: id,
          customName: null,
          fontId: null,
          imageUrl: primaryImage,
          sellingPrice,
          originalPrice,
          discountPercentage,
          name,
          deviceTypeId,
          deviceType,
        },
      ];

    setCart(JSON.stringify(updatedCart));
    dispatch({ type: CART, payload: updatedCart });
    toast.success("Item added to cart!");
  };

  const handleBuyNow = ()=>{
    addToCart()
    router.push("/cart")
  }


  const productImage =
    (currentImage === "front"
      ? primaryImage
      : secondaryImage || primaryImage)
  return(
    <div className="max-w-[1300px] mx-auto pt-12 p-6 mb-4">
      {loading && <MonoColorLoader containerClassName="bg-white/90"/>}
      <div className="flex flex-col md:flex-row items-center md:items-start lg:gap-20 md:gap-[60px]">
        {/* Left Section - Image */}
        <div className="w-full md:w-[45%] md:sticky top-[85px] flex flex-col gap-3">
          <BreadCrumbs value={data?.productDetail?.name || ""} />
          <div className="relative bg-[#EFEFEF] rounded-2xl lg:p-4 w-full">
            <Image
              src={productImage}
              alt="Bubbl Card"
              width={400}
              height={400}
              priority
              className="rounded-md object-fill w-full max-w-[380px] mx-auto"
            />
            <div className="flex justify-center mt-2">
              <div
                role="button"
                onClick={() => flipImage("front")}
                className={`h-1 w-12 mb-2 ${currentImage === "front" ? "bg-purple-500" : "bg-gray-300"
                  } rounded-full mr-2 p-1`}
              />
              <div
                role="button"
                onClick={() => flipImage("back")}
                className={`h-1 w-12 ${currentImage === "back" ? "bg-purple-500" : "bg-gray-300"
                  } rounded-full mr-2 p-1`}
              />
            </div>
          </div>
          <p className="text-center text-sm mt-2 capitalize">
            ( {currentImage} View )
          </p>
          {availability ? <div className="xs:hidden mt-6 md:flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={addToCart}
              className="border border-black w-full md:max-w-[200px] h-[40px] rounded-md hover:border-[#9747FF] hover:bg-[#9747FF] hover:text-white"
            >
              Add to cart
            </button>
            <button onClick={()=>handleBuyNow()} className="bg-black w-full md:max-w-[200px] h-[40px] text-white rounded-md hover:opacity-80">
              Buy now
            </button>
          </div> : <p className="text-red-600 xs:hidden md:block font-semibold text-center mt-6">Currently Unavailable</p>}
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[55%] mt-[24px]">
          <ProductInfo details={data || null} addToCart={addToCart} />
        </div>
      </div>

      {/* How it works section */}
      <section className="py-14 bg-[#F5F5F5] rounded-2xl mt-[70px]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works:</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex flex-col items-center text-center"
              >
                <div className="w-40 h-40 flex items-center justify-center">
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={400}
                    height={400}
                  />
                </div>
                <h3 className="text-lg font-bold mt-4">{step.id}</h3>
                <p className="text-gray-600 w-4/5">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductList;
