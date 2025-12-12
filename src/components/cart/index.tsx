"use client";
import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { getAccessToken, getCart, setCart } from "../../helpers/localStorage";
import { isEmpty } from "lodash";
import { CartItem } from "@/src/lib/interface";
import { fetchAllDevices } from "@/src/services/alldevicesApi";
import { UserContext } from "@/src/context/userContext";
import { CART } from "@/src/context/action";
import { Minus, Plus } from "lucide-react";
import { applyPromoCode } from "@/src/services/chechout";
import { trackButtonClick, trackCheckout } from "@/src/services/seo";

interface PromoDetails {
  promo: {
    code: string;
    discountApplied: number;
  };
}

const Cart = () => {
  // const [hoverImage, setHoverImage] = useState<any>("");
  const router = useRouter();

  const { state, dispatch }: any = useContext(UserContext);
  const [coupon, setCoupon] = useState<string>("");
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [promo, setPromo] = useState<PromoDetails | null>(null);

  const { cart: cards } = state;

  const handleBuyNow = () => {
    if (!isEmpty(cards)) {
      router.push(`/checkout${coupon ? `?coupon=${coupon}` : ""}`);
    }
  };

  const getUpdatedCart = async (cartData: string) => {
    const token = getAccessToken();
    const storedCart = JSON.parse(cartData);

    if (token) {
      return;
    } else {
      const devices = await fetchAllDevices();
      const combined = [...devices.custom, ...devices.basic, ...devices.others];
      const updatedCart = storedCart.map((item: CartItem) => {
        const product = combined.find(
          (prod) => prod.productId === item.productId
        );
        if (product) {
          return {
            ...item,
            name: product.productName,
            imageUrl: product.primaryImage,
            sellingPrice: product.sellingPrice,
            originalPrice: product.price,
            deviceType: product.productType,
            availability: product.availability,
          };
        }
        return item;
      });
      dispatch({ type: CART, payload: updatedCart });
    }
  };
  useEffect(() => {
    const storedCart = getCart();
    if (storedCart) {
      getUpdatedCart(storedCart);
    }
  }, []);

  const handleIncrease = (productId: string) => {
    const updatedCards = !isEmpty(cards)
      ? cards.map((card: any) => {
          if (card.productId === productId) {
            return {
              ...card,
              quantity: card.quantity < 100 ? card.quantity + 1 : 10,
            };
          }
          return card;
        })
      : [];
    dispatch({ type: CART, payload: updatedCards });
    if (typeof window !== "undefined") {
      setCart(JSON.stringify(updatedCards));
    }
    if (couponApplied) {
      applyCoupon(updatedCards);
    }
  };

  const handleDecrease = (productId: string) => {
    const updatedCards = !isEmpty(cards)
      ? cards
          .map((card: any) => {
            if (card.productId === productId) {
              const newQuantity = card.quantity - 1;
              return newQuantity > 0
                ? { ...card, quantity: newQuantity }
                : card;
            }
            return card;
          })
          .filter((card: any): card is CartItem => card !== null)
      : []; // Remove null entries

    dispatch({ type: CART, payload: updatedCards });
    if (typeof window !== "undefined") {
      setCart(JSON.stringify(updatedCards));
    }
    if (couponApplied) {
      applyCoupon(updatedCards);
    }
  };

  const handleRemove = (productId: string) => {
    const updatedCards = !isEmpty(cards)
      ? cards.filter((card: any) => card.productId !== productId)
      : [];
    dispatch({ type: CART, payload: updatedCards });
    if (typeof window !== "undefined") {
      setCart(JSON.stringify(updatedCards));
    }
  };

  const subTotal = !isEmpty(cards)
    ? cards.reduce(
        (acc: number, item: any) => acc + item.sellingPrice * item.quantity,
        0
      )
    : 0;
  const orginalPriceTotal = !isEmpty(cards)
    ? cards.reduce(
        (acc: number, item: any) => acc + item.originalPrice * item.quantity,
        0
      )
    : 0;
  const discount = orginalPriceTotal - subTotal;
  const shipping = 0; // Example fixed shipping cost
  const total = subTotal + shipping - (promo?.promo?.discountApplied || 0);

  const applyCoupon = async (cards: any) => {
    try {
      if (!coupon) {
        removeCoupon();
        return;
      }
      const response = await applyPromoCode({
        promoCode: coupon,
        productData: cards.map((item: CartItem) => ({
          productId: item?.productId,
          quantity: item.quantity,
        })),
      });
      if (response) {
        setCouponApplied(true);
        setPromo(response);
      } else {
        removeCoupon();
      }
    } catch (err) {
      console.error("Error applying coupon:", err);
    }
  };

  const removeCoupon = () => {
    setCoupon("");
    setCouponApplied(false);
    setPromo(null);
  };

  return (
    <div className="max-w-[1300px] mx-auto min-h-[70vh] pt-[50px] md:pt-[100px] mb-4 p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start lg:gap-20 md:gap-[60px]">
        <div className="w-full md:w-[60%] flex flex-col gap-1">
          {/* Shopping Cart */}
          <h2 className="text-xl sm:text-2xl font-bold  text-[#333333]">
            Shopping cart ({cards && cards.length})
          </h2>
          <p className="text-[#7F7F7F] text-sm sm:text-base  font-bold py-0">
            Cart it, Love it, Own it.
          </p>
          <div className="flex flex-col gap-6 p-4 md:p-6 bg-[#F5F5F5] rounded-xl mt-[20px]">
            {!isEmpty(cards) ? (
              cards.map((value: CartItem) => {
                const {
                  quantity,
                  productId,
                  imageUrl,
                  sellingPrice,
                  originalPrice,
                  name,
                  deviceType,
                  discountPercentage,
                } = value;
                return (
                  <div
                    key={productId}
                    className="flex w-full items-center gap-6"
                  >
                    <button
                      onClick={() => router.push(`/product/${productId}`)}
                      className="rounded-[8px] w-[90px] h-[75px] shrink-0 flex items-center justify-center  box-border bg-[#E5E5E5]"
                    >
                      <Image
                        src={imageUrl}
                        alt="card"
                        className="box-border w-full h-full"
                        height={100}
                        width={100}
                      />
                    </button>
                    <div className="flex flex-col gap-1 flex-1">
                      <p className="text-xs text-[#7F7F7F]">{deviceType}</p>
                      <p className="text-black font-bold text-nowrap">{name}</p>
                      <div className="flex items-center gap-3">
                        {Number(discountPercentage) > 0 && (
                          <p className="text-[#7F7F7F] text-sm line-through">
                            ₹{quantity * originalPrice}
                          </p>
                        )}

                        {Number(discountPercentage) > 0 && (
                          <p className="text-[#9747FF] text-sm">
                            {Number(discountPercentage).toFixed(2)}% off
                          </p>
                        )}
                      </div>
                      <p className="font-bold text-nowrap leading-[20px]">
                        ₹{quantity * sellingPrice}/-
                      </p>
                      <div className="flex gap-6 mt-2">
                        <div className="flex rounded-[8px] items-center border border-black gap-x-4 h-fit px-2 text-sm">
                          <button
                            className=" m-0 p-0 cursor-pointer"
                            onClick={() => handleDecrease(productId)}
                          >
                            <Minus size={14} />
                          </button>
                          <p className="m-0 p-0">{quantity}</p>
                          <button
                            className=" m-0 p-0 cursor-pointer"
                            onClick={() => handleIncrease(productId)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          className="underline text-sm"
                          onClick={() => handleRemove(productId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-lg text-black">No Data here</p>
            )}
          </div>
        </div>
        <div className="w-full md:w-[40%] md:sticky top-[100px] flex flex-col gap-3 sm:mt-[20px] xs:mt-[20px]">
          <div className="w-full flex flex-col gap-8 xs:px-0 sticky top-0 ">
            <h2 className="text-xl sm:text-2xl font-bold">Order Summary</h2>
            <div className="flex items-center justify-between w-full p-3 px-4 bg-gray-100 rounded-[10px] ">
              <input
                type="text"
                placeholder="Discount code"
                value={coupon}
                onChange={(e) =>
                  setCoupon(
                    e?.target?.value ? e.target.value.toUpperCase() : ""
                  )
                }
                className="w-full bg-transparent outline-none placeholder-gray-400 text-[#ACACAC] "
              />
              {couponApplied ? (
                <button
                id="removeCoupon"
                  className=" text-purple-600 font-[500]"
                  onClick={removeCoupon}
                >
                  Remove
                </button>
              ) : (
                <button
                id="applyCoupon"
                  className=" text-purple-600 font-[500]"
                  onClick={() => applyCoupon(cards)}
                >
                  Apply
                </button>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-sm sm:text-base">
                <p className=" text-[#7F7F7F]">
                  SubTotal ({(cards && cards.length) || 0} items)
                </p>
                <p>₹{subTotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <p className=" text-[#7F7F7F]">Shipping</p>
                <p>₹{shipping.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <p className=" text-[#7F7F7F]">Discount</p>
                <p> ₹{discount.toFixed(2)}</p>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-sm sm:text-base">
                  <span>
                    <p className=" text-[#7F7F7F]">Coupon Applied</p>
                    <p className=" text-[#7F7F7F] text-xs">
                      ( {promo?.promo?.code} )
                    </p>
                  </span>
                  <p>- ₹{promo?.promo?.discountApplied}</p>
                </div>
              )}
              <div className="flex justify-between font-semibold text-sm sm:text-base">
                <p>
                  Total <br />
                  <span className="text-[#7F7F7F] text-sm font-thin">
                    ( Incl of all Taxes )
                  </span>
                </p>
                <p>₹{total.toFixed(2)}</p>
              </div>
            </div>
            <button
              id="buyNow"
              className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300 ease-in-out"
              // onClick={handleBuyNow}
              onClick={() => {
                trackCheckout(total);
                trackButtonClick("Buy Now");
                handleBuyNow();
              }}
              disabled={isEmpty(cards)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
