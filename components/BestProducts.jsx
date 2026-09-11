"use client";

import Image from "next/image";

import Link from "next/link";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { FiHeart, FiShoppingCart, FiStar, FiArrowRight } from "react-icons/fi";
import { isFreeDelivery } from "@/hooks/delivery";

const BestProducts = () => {
  const [clothes, setClothes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const axiosInstance = useAxios();
  const _renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 relative">
          ★
        </span>,
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-dark-gold">
          ★
        </span>,
      );
    }

    return stars;
  };

  useEffect(() => {
    axiosInstance
      .get("/bestclothes")
      .then((response) => setClothes(Array.isArray(response.data) ? response.data : []))
      .catch((error) => {
        console.error("Failed to fetch best clothes:", error);
        setClothes([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 bg-dark-gray-custom">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gold mb-12">
            Best Clothes
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-12">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <ProductCardSkeleton key={`skeleton-${index}`} />
              ))}
          </div>
        </div>
      </section>
    );
  }

  if (clothes.length === 0) return null;

  return (
    <section className="py-16 bg-dark-gray-custom">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-semibold mb-4">
                Featured Products
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gold mb-4">
            Best Clothes
          </h2>
          <p className="text-light-silver max-w-2xl mx-auto">
            Discover our handpicked collection of premium quality clothing items
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-12">
          {clothes.map((product) => (
            <Link
              key={product._id}
              href={`/bestclothes/${product._id}`}
              className="block h-full group"
            >
              <div className="bg-black-custom rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-dark-gold cursor-pointer h-full flex flex-col relative">
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 z-10 bg-linear-to-r from-accent-red to-accent-red text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  {product.discount}% OFF
                </div>
                {isFreeDelivery(product) && (
                  <div className="absolute top-12 left-3 z-10 rounded-full border border-gold/60 bg-black-custom/85 px-3 py-1 text-xs font-bold text-gold backdrop-blur-sm">
                    Free delivery
                  </div>
                )}

                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 z-10 w-8 h-8 bg-black-custom/80 backdrop-blur-sm rounded-full flex items-center justify-center text-light-silver hover:text-accent-red hover:bg-black-custom transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <FiHeart className="w-4 h-4" />
                </button>

                {/* Product Image */}
                <div className="w-full h-48 overflow-hidden relative bg-linear-to-br from-dark-gray-custom to-black-custom">
                  <Image width={500} height={500} unoptimized
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Quick View Button */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button className="bg-linear-to-r from-gold to-dark-gold text-black-custom px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 hover:from-dark-gold hover:to-gold transition-all">
                      <FiShoppingCart className="w-4 h-4" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between p-4">
                  <div>
                    {/* Product Title */}
                    <h3 className="text-sm text-gold font-semibold mb-2 line-clamp-2 leading-5 h-10 group-hover:text-dark-gold transition-colors duration-300">
                      {product.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <FiStar className="w-4 h-4 text-gold fill-gold" />
                        <span className="text-xs font-semibold text-gold ml-1">{product.ratings}</span>
                      </div>
                      <span className="text-light-silver text-xs">
                        ({Math.floor(Math.random() * 50) + 10} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Price Section */}
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
                      <div className="w-2 h-2 bg-dark-gray-custom0 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gold font-medium">
                        In Stock
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/all-clothes"
            className="inline-flex items-center space-x-2 bg-linear-to-r from-gold to-dark-gold text-black-custom px-8 py-3 rounded-lg font-semibold text-lg hover:from-dark-gold hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>View All Products</span>
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestProducts;
