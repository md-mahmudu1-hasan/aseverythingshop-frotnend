"use client";

import Image from "next/image";

import React from "react";
import Link from "next/link";
import { isFreeDelivery } from "@/hooks/delivery";

const ProductCard = ({ product, name }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) stars.push(<span key={i} className="text-yellow-400">★</span>);
    if (hasHalfStar) stars.push(<span key="half" className="text-yellow-400 relative">★</span>);
    for (let i = 0; i < 5 - Math.ceil(rating); i++) stars.push(<span key={`empty-${i}`} className="text-dark-gold">★</span>);
    return stars;
  };

  const discountPercentage = Math.round(((product.main_price - product.after_discount_price) / product.main_price) * 100);

  return (
    <Link href={`/${name}/${product._id}`} className="block h-full group">
      <div className="bg-black-custom rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-dark-gold cursor-pointer h-full flex flex-col relative">
        <div className="absolute top-3 right-3 z-10 bg-linear-to-r from-accent-red to-accent-red text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {discountPercentage}% OFF
        </div>
        {isFreeDelivery(product) && (
          <div className="absolute top-12 right-3 z-10 rounded-full border border-gold/60 bg-black-custom/85 px-3 py-1 text-xs font-bold text-gold backdrop-blur-sm">
            Free delivery
          </div>
        )}
        <div className="w-full h-40 overflow-hidden relative bg-linear-to-br from-dark-gray-custom to-black-custom">
          <Image width={500} height={500} unoptimized 
            src={product.images[0]} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="flex-1 flex flex-col justify-between p-4">
          <div>
            <h3 className="text-sm text-gold font-semibold mb-2 line-clamp-2 leading-5 h-8 group-hover:text-dark-gold transition-colors duration-300">
              {product.title}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center bg-dark-gray-custom px-2 py-1 rounded-md">
                {renderStars(product.ratings)}
              </div>
              <span className="text-light-silver text-xs font-medium">({product.ratings})</span>
            </div>
          </div>
          <div className="space-y-2 pt-2 border-t border-dark-gold">
            <div className="flex items-baseline gap-2">
              <span className="text-lg lg:text-xl font-bold bg-linear-to-r from-gold to-dark-gold bg-clip-text text-transparent">
                ৳{product.after_discount_price}
              </span>
              <span className="text-sm lg:text-base text-light-silver line-through">
                ৳{product.main_price}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
              <span className="text-xs text-gold font-medium">In Stock</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
