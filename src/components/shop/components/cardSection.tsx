"use client";
import React, { useState, useEffect } from "react";
import Products from "./products";
import { fetchAllDevices } from "../../../services/alldevicesApi";
import Link from "next/link";
import { toast } from "react-toastify";
import { NewsLetterApi } from "../../../services/newsLetterApi";
import { trackButtonClick } from "@/src/services/seo";

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

export type Card = {
  id: string;
  name: string;
  title: string;
  price: string;
  image: string;
  discount: string;
  secondaryImage: string | null;
  colors: Array<string>;
  material: string;
  cardType: string;
};

export type ProductSection = {
  sectionType: string;
  cards: Array<Card>;
};

const title: Record<string, { title: string; description: string }> = {
  // festiveBundles: {
  //   title: "Special offers! – Light Up Your Networking This Diwali",
  //   description:
  //     "Celebrate this festive season with exclusive Diwali discounts on Bubbl NFC cards. Share your identity with a single tap and make every connection memorable. Limited-time festive offer for individuals and teams.",
  // },
  basic: {
    title: "Bubbl Basics",
    description:
      "Pick from our line of Bubbl- Basics - Affordable, Eco-friendly and perfect for first time users who just want to get the feel of futuristic networking.",
  },
  custom: {
    title: "Bubbl Custom",
    description:
      " Bubbl aims to replace paper business cards with sustainable options. We offer custom branding and bulk orders for corporate clients. Join us today",
  },
  others: {
    title: "Other Products",
    description:
      "Bubbl aims to replace paper business cards with sustainable options. We offer custom branding and bulk orders for corporate clients. Join us today!",
  },
  // bundle_devices: {
  //   title: "Bubbl Bundle Device",
  //   description:
  //     "If you want to get a more than just one bubbl, don't worry, we have fan favourite bundles at great deals. Making new connections has never bees easier!",
  // },
};

function CardSection() {
  const [data, setData] = useState<Record<string, DeviceItem[]>>({});

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const res = await NewsLetterApi(email);
      toast.success(res.message || "Subscribed successfully!");
      setEmail("");
    } catch (error: any) {
      toast.error(error.message || "Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await fetchAllDevices();
        if (devices) {
          setData(devices);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getDevices();
  }, []);

  return (
    <section className="max-w-[1300px] mx-auto">
      <div className="py-8 flex flex-col items-center gap-[2vh] px-6">
        <Products title={title} data={data} />
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex max-w-md px-6 py-2  border border-gray-300 rounded-lg  text-black focus:ring-1 focus:ring-purple-500 focus:border-transparent outline-none"
                  required
                />
                <button
                  id="subscribe"
                  type="submit"
                  onClick={() => {
                    trackButtonClick("subscribe");
                    handleSubscribe}}
                  disabled={loading}
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
