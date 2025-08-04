"use client";
import React, { useEffect, useState } from "react";
import { FaTruck } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { getCart } from "../../helpers/localStorage";
import { useRouter } from "next/router";
import { CheckoutApi } from "../../services/chechout";
import { CartItem } from "@/src/lib/interface";
import { isEmpty } from "lodash";
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
  const [cart, setCart] = useState<CartItem[]>([]);
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

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //     const { name, value, type, checked } = e.target;
  //     setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });

  // };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = e.target;

    setcheckoutFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? target.checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (isEmpty(cart)) return;
      if (!validate()) return;

      const payload: {
        productData: { productId: string; quantity: number }[];
        shippingFormData: FormData;
      } = {
        productData: cart.map((item) => ({
          productId: item?.productId,
          quantity: item.quantity,
        })),
        shippingFormData: checkoutFormData,
      };
      const response = await CheckoutApi(payload);
      if (response) {
        router.push({
              pathname: "/processPayment",
              query: {
                orderId: response,
                orderType: 2,
                token: btoa(checkoutFormData?.emailId),
              },
            });
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  useEffect(() => {
    const storedCart = getCart();
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
  const subTotal = cart.reduce(
    (acc, item) => acc + item.sellingPrice * item.quantity,
    0
  );
  const orginalPriceTotal = cart.reduce(
    (acc, item) => acc + item.originalPrice * item.quantity,
    0
  );
  const shipping = checkoutFormData?.country
    ? checkoutFormData?.country.trim() === "India"
      ? 0
      : 500
    : 0;

  const discount = orginalPriceTotal - subTotal; // Example: 0% discount
  const total = subTotal + shipping;
  return (
    <div className="max-w-[1300px] mx-auto flex p-6 lg:gap-40 md:gap-14 lg:flex-row md:flex-row sm:flex-col-reverse xs:flex-col-reverse">
      <div className="lg:w-[64%] sm:w-full ">
        <form onSubmit={handleSubmit}>
          <h1 className="text-[26px] font-bold mb-1">
            Checkout <span>{cart.length} items</span>
          </h1>
          <p className="text-[#7F7F7F] mb-6 font-semibold  text-[15px]">
            Your Order, Just a Click Away
          </p>
          <div className="mb-8">
            <h2 className="text-[24px] font-semibold mb-1 ">
              Contact Information
            </h2>
            <p className="text-[#7F7F7F] mb-4 font-semibold  text-[14px]">
              We’ll Notify You Every Step
            </p>
            <div className="space-y-7">
              <div>
                <label className="block text-[14px] font-medium text-[#7F7F7F] ">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={checkoutFormData.emailId}
                  name="emailId"
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#ACACAC] "
                />
                {errors.emailId && (
                  <p className="text-red-500 text-sm">{errors.emailId}</p>
                )}
              </div>
              {/* <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    className="mr-4"
                    checked={checkoutFormData.newsletter}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="newsletter"
                    className="text-sm text-[#7F7F7F]  rounded-lg"
                  >
                    Email me with news and offers
                  </label>
                </div> */}
              <div>
                <label className="block text-[14px] font-medium text-[#7F7F7F] ">
                  Phone number
                </label>
                <input
                  type="tel"
                  placeholder="9000000000"
                  value={checkoutFormData.phoneNumber}
                  name="phoneNumber"
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#ACACAC] "
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                )}
              </div>
            </div>
          </div>
          <div className="mb-8 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-2 ">
                Shipment Information
              </h2>
              <p className="text-[#7F7F7F] mb-0 font-semibold text-[14px]">
                Help Us Get Your Order to the Right Place
              </p>
            </div>

            <div className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-[#7F7F7F] ">
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={checkoutFormData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#ACACAC] placeholder:text-[14px]"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#7F7F7F] ">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    value={checkoutFormData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#ACACAC] placeholder:text-[14px] "
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#7F7F7F] ">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Dear no, street, Locality"
                  value={checkoutFormData.address}
                  onChange={handleChange}
                  name="address"
                  className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#ACACAC] placeholder:text-[14px]"
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
                    className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#ACACAC] placeholder:text-[14px]"
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="Others">Others</option>
                  </select>
                  {errors.city && (
                    <p className="text-red-500 text-sm">{errors.country}</p>
                  )}
                </div>
                <div className="relative w-full space-y-1 ">
                  <label className="block text-sm font-medium text-[#7F7F7F]">
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your state"
                    value={checkoutFormData.state}
                    name="state"
                    onChange={handleChange}
                    className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#ACACAC] placeholder:text-[14px]"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">{errors.state}</p>
                  )}
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-[#7F7F7F] ">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your city"
                    value={checkoutFormData.city}
                    name="city"
                    onChange={handleChange}
                    className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#ACACAC] placeholder:text-[14px]"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city}</p>
                  )}
                </div>
                <div className="relative w-full space-y-1 ">
                  <label className="block text-[14px] font-medium text-[#7F7F7F] ">
                    postalCode
                  </label>
                  <input
                    type="text"
                    placeholder="pincode"
                    value={checkoutFormData.zipcode}
                    name="zipcode"
                    onChange={handleChange}
                    className="mt-1 block w-full bg-[#F5F5F5] rounded-md p-3 outline-none focus:ring-0 text-[#ACACAC] placeholder:text-[14px]"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">{errors.zipcode}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="text-sm text-[#7F7F7F] mb-4">
            <p className=" mb-8">
              Your info will be saved to a Shop account. By continuing, you
              agree to Shop’s Terms of Service and acknowledge the Privacy
              Policy.
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-md text-center"
          >
            Proceed to payment
          </button>
        </form>
      </div>
      <div className="lg:w-[40%] sm:w-full bg-white p-6 xs:p-0 rounded-lg h-fit lg:sticky md:sticky sm:static xs:static top-[125px] ">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[26px] font-semibold ">Review your cart</h2>
          <Link href="/cart" className="underline font-semibold  text-black ">
            Edit
          </Link>
        </div>
        {cart.map((item, index: number) => {
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

          {/* <div className="flex justify-between">
              <span className=" text-[#7F7F7F]">GST 18%</span>
              <span className=" text-[14px]">₹{gst.toFixed(2)}</span>
            </div> */}
        </div>
        <div className=" mt-4 pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span className=" text-[#7F7F7F]">Total</span>
            <span className="">₹{total.toFixed(2)}</span>
          </div>

          <p className="text-sm text-[#7F7F7F] ">(Incl of all taxes)</p>
        </div>
        <div className="mt-6 mb-6 bg-[#F5F5F5] p-3 rounded-lg flex items-center gap-2 ">
          <FaTruck className="text-lg" />
          <span className=" text-[#7F7F7F]">
            Deliver by :
            <span className="font-semibold lg:text-[16px] md:text-[16px] sm:text-lg xs:text-sm inter text-black">
              12 June 2024
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
