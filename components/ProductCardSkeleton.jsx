"use client";

import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-black-custom rounded-2xl overflow-hidden shadow-md border border-dark-gray-custom h-full flex flex-col relative animate-pulse">
      {/* Discount Badge Skeleton */}
      <div className="absolute top-3 right-3 z-10 bg-dark-gold/40 w-12 h-6 rounded-full"></div>
      
      {/* Product Image Skeleton */}
      <div className="w-full h-40 bg-linear-to-br from-dark-gray-custom to-dark-gold/40"></div>
      
      {/* Product Info Skeleton */}
      <div className="flex-1 flex flex-col justify-between p-4">
        <div>
          {/* Product Title Skeleton */}
          <div className="h-8 mb-2">
            <div className="h-4 bg-dark-gold/40 rounded w-3/4 mb-1"></div>
            <div className="h-4 bg-dark-gold/40 rounded w-1/2"></div>
          </div>
          
          {/* Rating Skeleton */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center bg-dark-gray-custom px-2 py-1 rounded-md">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-dark-gold/40 rounded"></div>
                <div className="w-3 h-3 bg-dark-gold/40 rounded"></div>
                <div className="w-3 h-3 bg-dark-gold/40 rounded"></div>
                <div className="w-3 h-3 bg-dark-gold/40 rounded"></div>
                <div className="w-3 h-3 bg-dark-gold/40 rounded"></div>
              </div>
            </div>
            <div className="w-8 h-3 bg-dark-gold/40 rounded"></div>
          </div>
        </div>
        
        {/* Price Section Skeleton */}
        <div className="space-y-2 pt-2 border-t border-dark-gray-custom">
          <div className="flex items-baseline gap-2">
            <div className="w-16 h-6 bg-dark-gold/40 rounded"></div>
            <div className="w-12 h-4 bg-dark-gold/40 rounded"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-dark-gold/40 rounded-full"></div>
            <div className="w-12 h-3 bg-dark-gold/40 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
