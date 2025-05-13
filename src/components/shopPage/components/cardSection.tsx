"use client";
import React, { useState, useMemo } from "react";
import Cards from "../../common/cards";
import { IoFilter, IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import FullCustomCard from "../../../assets/product/productCardImg/fullCustom.png";
import NameCustomCard from "../../../assets/product/productCardImg/metalCard.png";
import BasicCard from "../../../assets/product/productCardImg/basiccard.png";
import Scoket from "../../../assets/product/productCardImg/socket.png";
import Tile from "../../../assets/product/productCardImg/tile.png";
import Band from "../../../assets/product/productCardImg/band.png";
import Standee from "../../../assets/product/productCardImg/standee.png";
import { searchIcon  } from "../../common/icons";
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

const products = [
  {
    sectionType: "custom_card",
    cards: [
      {
        id: 1,
        name: "Full Custom",
        title: "Bubbl Full Custom",
        price: "Rs.999",
        image: FullCustomCard,
        discount: "18.77%",
        secondaryImage: FullCustomCard,
        colors: [],
      },
      {
        id: 2,
        name: "Name Custom",
        title: "Bubbl Name Custom",
        price: "Rs.799",
        image: NameCustomCard,
        discount: "18.77%",
        secondaryImage: NameCustomCard,
        colors: [],
      },
    ],
  },
  {
    sectionType: "basic_card",
    cards: [
      {
        id: 4,
        name: "Basic Card",
        title: "Bubbl Basic Card",
        price: "Rs.999",
        image: BasicCard,
        discount: "18.77%",
        secondaryImage: BasicCard,
        colors: ["black", "blue", "green", "yellow", "red", "white", "purple"],
      },
      {
        id: 5,
        name: "Socket",
        title: "Bubbl Socket",
        price: "Rs.799",
        image: Scoket,
        discount: "18.77%",
        secondaryImage: Scoket,
        colors: ["black", "blue", "green", "yellow", "red", "white", "purple"],
      },
      {
        id: 6,
        name: "Tile",
        title: "Bubbl Tile",
        price: "Rs.1999",
        image: Tile,
        discount: "18.77%",
        secondaryImage: Tile,
        colors: ["black", "blue", "green", "yellow", "red", "white", "purple"],
      },
    ],
  },
  {
    sectionType: "bubbl_other_product",
    cards: [
      {
        id: 5,
        name: "Band",
        title: "Bubbl Band",
        price: "Rs.1499",
        image: Band,
        discount: "18.77%",
        secondaryImage: Band,
        colors: ["black", "white"],
      },
      {
        id: 6,
        name: "Standee",
        title: "Bubbl Standee",
        price: "Rs.1499",
        image: Standee,
        discount: "18.77%",
        secondaryImage: Standee,
        colors: ["black", "white"],
      },
    ],
  },
];

function CardSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("All products");
  const [searchProduct, setSearchProduct] = useState("");
  const options = ["Category 1", "Category 2"];
  const isOpenSelect = () => {
    setIsOpen(!isOpen);
  };
  const filteredProduct = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) {
      return [];
    }
  
    const search = searchProduct?.toString().trim().toLowerCase();
    if (!search) {
      return products; // Return all if there's no search
    }
  
    return products
      .map(section => {
        const filteredCards = section.cards.filter(card =>
          card?.name?.toLowerCase().includes(search)
        );
        return filteredCards.length > 0
          ? { ...section, cards: filteredCards }
          : null;
      })
      .filter(Boolean); // remove empty sections
  }, [products, searchProduct]);
  return (
    <section className=" min-h-[calc(100vh-13vh)]  max-w-[1300px] mx-auto">
      <div className="py-8 flex flex-col items-center gap-[2vh] px-6">
        <div className="w-full flex justify-between ml-2  gap-4">
          <div className="flex flex-col mb-4 md:mb-0  lg:w-2/5 w-full md:w-3/4 sm:w-3/4 xs:w-3/4">
            <div className="flex items-center w-full  h-12 bg-[#F5F5F5]  rounded-xl  ">
              <span className="px-4 ">
                  {/* <searchIcon /> */}
              </span>
              <input
                type="text"
                onChange={(e:any)=>setSearchProduct(e?.target?.value)}
                className="flex-grow  focus:outline-none bg-[#F5F5F5] rounded-[10px] focus:ring-0 px-2  text-black truncate w-full overflow-hidden   "
                placeholder="Search bubbl product..."
              />
            </div>
            <p className="text-gray-400 pt-2 pl-1 md:pl-4  ml-1 ">
              Result: 21 Products
            </p>
          </div>
          {/* Dropdown */}
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
            {/* Dropdown Menu */}
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
            {/* mobile Dropdown Menu  */}
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
        <Cards title={title} data={filteredProduct} />
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
              <a
                href="/privacyPolicy"
                className="text-gray-600 underline hover:text-purple-500 "
              >
                privacy policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CardSection;
