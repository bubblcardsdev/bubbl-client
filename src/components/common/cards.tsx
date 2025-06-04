"use client";
import React from "react";

import { useRouter } from "next/router";
import FadeInSection from "./fadeInSection";
import { PRODUCTS } from "@/src/lib/constant";
import { ProductCard } from "./productCardXS";
import { ProductCarousel } from "./carousel";


function CardsReusable() {
  const router = useRouter();

  const handleCardClick = (id: number) => {
    router.push(`/productList/${id}`);
  };

  return (
    <div className="bg-black text-white">
     {/* Mobile (xs) Carousel */}
      <ProductCarousel
        items={PRODUCTS}
        renderItem={(card) => (
       
            <ProductCard card={card} handleCardClick={handleCardClick} />
         
        )}
      />

      {/* Larger screens grid */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mx-auto xs:py-0 sm:py-10">
        {PRODUCTS.map((card) => (
          <FadeInSection key={card.id}>
            <ProductCard card={card} handleCardClick={handleCardClick} />
          </FadeInSection>
        ))}
      </div>
    </div>
  );
}

export default CardsReusable;