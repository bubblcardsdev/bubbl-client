"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  applyPromoCode,
  createOrder,
  recordPaymentFailure,
} from "../../services/chechout";
import { CartItem } from "@/src/lib/interface";
import { isEmpty } from "lodash";
import ProceedToCheckout from "@/src/helpers/razorPayScript";
import { UserContext } from "@/src/context/userContext";
import { getToken } from "@/src/utils/utils";
interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailId: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}

const CheckoutPage = () => {
  const router = useRouter();
  const [order, setOrder] = useState<any>();
  const [checkoutFormData, setcheckoutFormData] = useState<FormData>({
    emailId: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [promo, setPromo] = useState<any>(null);

  const {
    state: { cart },
  }: any = useContext(UserContext);

  const coupon = router.query.coupon as string | undefined;
  const validate = () => {
    const newErrors: Partial<FormData> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!checkoutFormData.emailId) {
      newErrors.emailId = "Email is required";
    } else if (!emailRegex.test(checkoutFormData.emailId)) {
      newErrors.emailId = "Invalid email format";
    }
    if (!checkoutFormData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(checkoutFormData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format";
    }
    if (!checkoutFormData.firstName)
      newErrors.firstName = "First name is required";
    if (!checkoutFormData.lastName)
      newErrors.lastName = "Last name is required";
    if (!checkoutFormData.address) newErrors.address = "Address is required";
    if (!checkoutFormData.city) newErrors.city = "City is required";
    if (!checkoutFormData.state) newErrors.state = "State is required";
    if (!checkoutFormData.zipcode)
      newErrors.zipcode = "Postal code is required";
    if (!checkoutFormData.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = e.target;

    setcheckoutFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? target.checked : value,
    }));

    //  Clear error for the current field as user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    try {
      e.preventDefault();
      if (loading) return;
      if (!validate()) return;
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }
      const payload: {
        productData: { productId: string; quantity: number }[];
        shippingFormData: FormData;
        promoCode?: string;
      } = {
        productData: cart.map((item: CartItem) => ({
          productId: item?.productId,
          quantity: item.quantity,
        })),
        shippingFormData: checkoutFormData,
        promoCode: coupon || undefined,
      };
      const response = await createOrder(payload);
      console.log(response, "?");
      setOrder(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessResponse = async (res: any) => {
    router.push(
      `/order-confirmation?razorpay_payment_id=${res.razorpay_payment_id}&razorpay_order_id=${res.razorpay_order_id}&razorpay_signature=${res.razorpay_signature}`
    );
  };
  const handleFailureResponse = async (res: any) => {
    try {
      const paymentId = res?.error?.metadata?.payment_id || "";
      const orderId = res?.error?.metadata?.order_id || "";
      const reason =
        res?.error?.description || res?.error?.reason || "Payment failed";

      await recordPaymentFailure(paymentId, orderId, reason);
    } catch (err) {
      console.error("Error handling payment failure:", err);
    }
  };

  const subTotal = !isEmpty(cart)
    ? cart.reduce(
        (acc: number, item: CartItem) =>
          acc + item.sellingPrice * item.quantity,
        0
      )
    : 0;

  const orginalPriceTotal = !isEmpty(cart)
    ? cart.reduce(
        (acc: number, item: CartItem) =>
          acc + item.originalPrice * item.quantity,
        0
      )
    : 0;

  const shipping = checkoutFormData?.country
    ? checkoutFormData?.country.trim() === "India"
      ? 0
      : 500
    : 0;

  const discount = orginalPriceTotal - subTotal; // Example: 0% discount
  const total = subTotal + shipping - (promo?.promo?.discountApplied || 0);
console.log(coupon, "coupon");
  const applyCoupon = async (cards: any) => {
    try {
      if (!coupon) return;
      const response = await applyPromoCode({
        promoCode: coupon,
        productData: cards.map((item: CartItem) => ({
          productId: item?.productId,
          quantity: item.quantity,
        })),
      },  false);
      if (response) {
        setPromo(response);
      }
    } catch (err) {
      console.error("Error applying coupon:", err);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      applyCoupon(cart);
    }
  }, [cart, coupon]);
  return (
    <div className="max-w-[1300px] mx-auto flex p-6 lg:gap-40 md:gap-14 lg:flex-row md:flex-row sm:flex-col-reverse xs:flex-col-reverse md:mb-20">
      <div className="lg:w-[64%] sm:w-full ">
        <form onSubmit={handleSubmit}>
          <h1 className="text-[26px] font-bold mb-1">
            Checkout <span>{cart.length} items</span>
          </h1>
          <p className="text-[#7F7F7F] mb-6 font-semibold text-[15px]">
            Your Order, Just a Click Away
          </p>

          <div className="mb-8">
            <h2 className="text-[24px] font-semibold mb-1">
              Contact Information
            </h2>
            <p className="text-[#7F7F7F] mb-4 font-semibold text-[14px]">
              We’ll Notify You Every Step
            </p>

            <div className="space-y-7">
              <div>
                <label className="block text-[14px] font-medium text-[#7F7F7F]">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={checkoutFormData.emailId}
                  name="emailId"
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#333333] placeholder:text-[#9E9E9E]"
                />
                {errors.emailId && (
                  <p className="text-red-500 text-sm">{errors.emailId}</p>
                )}
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#7F7F7F]">
                  Phone number
                </label>
                <input
                  type="tel"
                  placeholder="9000000000"
                  value={checkoutFormData.phoneNumber}
                  name="phoneNumber"
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#333333] placeholder:text-[#9E9E9E]"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-8 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Shipment Information
              </h2>
              <p className="text-[#7F7F7F] mb-0 font-semibold text-[14px]">
                Help Us Get Your Order to the Right Place
              </p>
            </div>

            <div className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-[#7F7F7F]">
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={checkoutFormData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#333333] placeholder:text-[#9E9E9E]"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#7F7F7F]">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    value={checkoutFormData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#333333] placeholder:text-[#9E9E9E]"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#7F7F7F]">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Door no, Street, Locality"
                  value={checkoutFormData.address}
                  onChange={handleChange}
                  name="address"
                  className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#333333] placeholder:text-[#9E9E9E]"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address}</p>
                )}
              </div>

              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#7F7F7F]">
                    Country
                  </label>
                  <select
                    value={checkoutFormData.country}
                    name="country"
                    onChange={handleChange}
                    className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#333333] placeholder:text-[#9E9E9E]"
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="Others">Others</option>
                  </select>
                  {errors.country && (
                    <p className="text-red-500 text-sm">{errors.country}</p>
                  )}
                </div>

                <div className="relative w-full space-y-1">
                  <label className="block text-sm font-medium text-[#7F7F7F]">
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your state"
                    value={checkoutFormData.state}
                    name="state"
                    onChange={handleChange}
                    className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#333333] placeholder:text-[#9E9E9E]"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm">{errors.state}</p>
                  )}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-[#7F7F7F]">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your city"
                    value={checkoutFormData.city}
                    name="city"
                    onChange={handleChange}
                    className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#333333] placeholder:text-[#9E9E9E]"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city}</p>
                  )}
                </div>

                <div className="relative w-full space-y-1">
                  <label className="block text-[14px] font-medium text-[#7F7F7F]">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={checkoutFormData.zipcode}
                    name="zipcode"
                    onChange={handleChange}
                    className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#333333] placeholder:text-[#9E9E9E]"
                  />
                  {errors.zipcode && (
                    <p className="text-red-500 text-sm">{errors.zipcode}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-[#7F7F7F] mb-4">
            <p className="mb-8">
              Your info will be saved to a Shop account. By continuing, you
              agree to Shop’s Terms of Service and acknowledge the Privacy
              Policy.
            </p>
          </div>

          {!order ? (
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-md text-center"
            >
              Proceed to payment
            </button>
          ) : (
            <ProceedToCheckout
              order={order}
              prefill={{
                name: `${checkoutFormData.firstName} ${checkoutFormData.lastName}`,
                email: checkoutFormData.emailId,
                contact: checkoutFormData.phoneNumber,
              }}
              onSuccess={handleSuccessResponse}
              onFailure={handleFailureResponse}
            />
          )}
        </form>
      </div>
      <div className="lg:w-[40%] sm:w-full bg-white p-6 xs:p-0 rounded-lg h-fit lg:sticky md:sticky sm:static xs:static top-[125px] ">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[26px] font-semibold ">Review your cart</h2>
          <Link href="/cart" className="underline font-semibold  text-black ">
            Edit
          </Link>
        </div>
        {cart.map((item: CartItem, index: number) => {
          const { quantity, imageUrl, sellingPrice, name, deviceType } = item;
          return (
            <div
              key={index}
              className="flex lg:items-center md:items-center sm:items-center xs:items-start lg:gap-4 md:gap-6 sm:gap-16 xs:gap-1 pb-4 mb-4 lg:flex-row md:flex-row sm:flex-row xs:flex-row "
            >
              <div className=" w-[90px] h-[65px] rounded-[8px] flex justify-center items-center bg-[#F3F3F3]">
                <Image src={imageUrl} alt={name} width={500} height={300} />
              </div>
              <div className="flex items-center justify-between w-full">
                <div>
                  <p className="text-gray-500 text-sm p-0 m-0 ">{deviceType}</p>
                  <p className="font-semibold">
                    {name}{" "}
                    <span className="text-[#7F7F7F] text-xs">x{quantity}</span>
                  </p>
                </div>
                <p className="ml-auto font-bold text-[18px]">
                  ₹{sellingPrice * quantity}/-
                </p>
              </div>
            </div>
          );
        })}

        <div className="text-gray-600 space-y-2">
          <div className="flex justify-between">
            <span className=" text-[#7F7F7F]">
              Subtotal ({cart.length} items)
            </span>
            <span className=" text-[14px]">₹{subTotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className=" text-[#7F7F7F]">Shipping</span>
            <span className=" text-[14px]">₹{shipping.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className=" text-[#7F7F7F]">Discount</span>
            <span className=" text-[14px]">-₹{discount.toFixed(2)}</span>
          </div>

          {promo?.promo && <div className="flex justify-between text-sm sm:text-base">
                  <span>
                    <p className=" text-[#7F7F7F]">Coupon Applied</p>
                    <p className=" text-[#7F7F7F] text-xs">
                      ( {promo?.promo?.code} )
                    </p>
                  </span>
                  <p>- ₹{promo?.promo?.discountApplied}</p>
                </div>}
        </div>
        <div className=" mt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span className=" text-[#7F7F7F]">Total</span>
            <span className="">₹{total.toFixed(2)}</span>
          </div>

          <p className="text-sm text-[#7F7F7F] ">(Incl of all taxes)</p>
        </div>
        {/* <div className="mt-6 mb-6 bg-[#F5F5F5] p-3 rounded-lg flex items-center gap-2 ">
          <FaTruck className="text-lg" />
          <span className=" text-[#7F7F7F]">
            Deliver by :
            <span className="font-semibold lg:text-[16px] md:text-[16px] sm:text-lg xs:text-sm inter text-black">
              12 June 2024
            </span>
          </span>
        </div> */}
      </div>
    </div>
  );
};
export default CheckoutPage;
