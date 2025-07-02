"use client";
import React, { useState, useMemo, useEffect } from "react";
import { IoFilter, IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { SearchIcon } from "../../common/icons";
import Products from "./products";
import { fetchAllDevices } from "../../../services/alldevicesApi";
import Link from "next/link";
// TYPES
interface DeviceItem {
  productId: string;
  productName: string;
  sellingPrice: number;
  primaryImage: string;
  secondaryImage?: string;
  discount?: number;
  colors?: string[];
  material?: string;
}

interface DevicesData {
  basic?: DeviceItem[];
  custom?: DeviceItem[];
  others?: DeviceItem[];
}

interface FilteredSection {
  sectionType: string;
  cards: {
    id: string;
    name: string;
    title: string;
    price: string;
    image: string;
    discount: string;
    secondaryImage?: string;
    colors?: string[];
    material?: string;
    cardType: string;
  }[];
}
const title: Record<string, { title: string; description: string }> = {
  custom_card: {
    title: "Bubbl Custom Card",
    description:
      " Bubbl aims to replace paper business cards with sustainable options. We offer custom branding and bulk orders for corporate clients. Join us today",
  },
  basic_card: {
    title: "Bubbl Basic Card",
    description:
      "Pick from our line of Bubbl- Basics - Affordable, Eco-friendly and perfect for first time users who just want to get the feel of futuristic networking.",
  },
  bubbl_other_product: {
    title: "Bubbl  other product",
    description:
      "Bubbl aims to replace paper business cards with sustainable options. We offer custom branding and bulk orders for corporate clients. Join us today!",
  },
  bundle_devices: {
    title: "Bubbl Bundle Device",
    description:
      "If you want to get a more than just one bubbl, don't worry, we have fan favourite bundles at great deals. Making new connections has never bees easier!",
  },
};
const sectionTypes = [
  {
    title: "basic_card",
    type: "basic",
  },
  {
    title: "custom_card",
    type: "custom",
  },
  {
    title: "bubbl_other_product",
    type: "others",
  },
];
function CardSection() {
  const [data, setData] = useState<any>({});
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("All products");
  const [searchProduct, setSearchProduct] = useState("");
  const options = ["Category 1", "Category 2"];
  const isOpenSelect = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await fetchAllDevices();
        if(devices){
          setData(devices);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getDevices();
  }, []);
  const filteredProduct = useMemo(() => {
    const lowerCaseTerm = searchProduct.toLowerCase();

    return sectionTypes
      .map(({ title, type }) => {
        const cards = (data[type] || [])
          .filter((item: any) =>
            item.productName.toLowerCase().includes(lowerCaseTerm)
          )
          .map((item: any, index: number) => ({
            id: item.productId,
            name: item.productName,
            title: `${item.productName}`,
            price: `Rs.${item.sellingPrice}`,
            image: item.primaryImage,
            discount: item.discount ? `${item.discount}%` : "0%",
            secondaryImage: item.secondaryImage,
            colors: item.colors || [],
            material: item.material,
            cardType: type,
          }));

        return {
          sectionType: title,
          cards,
        };
      })

      .filter((section) => section.cards.length > 0);
  }, [data, sectionTypes, searchProduct]);

  return (
    <section className=" min-h-[calc(100vh-13vh)]  max-w-[1300px] mx-auto">
      <div className="py-8 flex flex-col items-center gap-[2vh] px-6">
        <div className="w-full flex justify-between ml-2  gap-4">
          <div className="flex flex-col mb-4 md:mb-0  lg:w-2/5 w-full md:w-3/4 sm:w-3/4 xs:w-3/4">
            <div className="flex items-center w-full  h-12 bg-[#F5F5F5]  rounded-xl  ">
              <span className="px-4 ">
                <SearchIcon />
              </span>
              <input
                type="text"
                onChange={(e: any) => setSearchProduct(e?.target?.value)}
                className="flex-grow  focus:outline-none bg-[#F5F5F5] rounded-[10px] focus:ring-0 px-2  text-black truncate w-full overflow-hidden"
                placeholder="Search bubbl product..."
              />
            </div>
            <p className="text-gray-400 pt-2 pl-1 md:pl-4  ml-1 ">
              Result: 21 Products
            </p>
          </div>
          <div className="relative w-12 md:w-48">
            <button
              className="w-full px-4 py-3 text-black bg-[#F5F5F5] rounded-xl flex justify-between items-center"
              onClick={isOpenSelect}
            >
              <span className="hidden md:block"> {selected}</span>
              <span className="md:hidden text-lg -pr-4 ">
                <IoFilter size={20} className="" />
              </span>
              <span className="hidden md:block">
                <IoIosArrowDown />
              </span>
            </button>
            {isOpen && (
              <ul className="absolute w-full mt-2 bg-[#F5F5F5] border border-gray-300 rounded-lg shadow-lg lg:block md:block sm:hidden xs:hidden">
                {options.map((option, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-purple-600 hover:text-white"
                    onClick={() => {
                      setSelected(option);
                      setIsOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
            {isOpen && (
              <div className="absolute right-0 mt-2 bg-[#F5F5F5] border border-gray-300 rounded-lg shadow-lg sm:hidden w-48 p-2">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <span className="text-lg font-semibold">
                    Select an Option
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-600 hover:text-black"
                  >
                    <IoClose size={20} />
                  </button>
                </div>

                <ul className="text-left">
                  {options.map((option, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-purple-600 hover:text-white"
                      onClick={() => {
                        setSelected(option);
                        setIsOpen(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <Products
          // sectionTypes={sectionTypes}
          title={title}
          data={filteredProduct}
        />
        <div className="p-12 bg-[#F3F3F3]  rounded-lg mt-16  w-full ">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 ">
              Still thinking about it?
            </h2>
            <p className="text-gray-600 ">
              Sign up for our newsletter and get 10% off your next purchase.
            </p>
            <form className="mt-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <input
                  type="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex max-w-md px-6 py-2  border border-gray-300 rounded-lg  text-black focus:ring-1 focus:ring-purple-500 focus:border-transparent outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors duration-200 "
                >
                  Subscribe
                </button>
              </div>
            </form>
            <p className="text-sm text-gray-500 ">
              We care about your data in our{" "}
              <Link
                href="/privacyPolicy"
                className="text-gray-600 underline hover:text-purple-500 "
              >
                privacy policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CardSection;
