"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-dark-gray-custom via-dark-gray-custom to-dark-gray-custom flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation Container */}
        <div className="relative mb-12">
          {/* Large 404 Text */}
          <div className="relative z-10">
            <h1 className="text-9xl font-bold bg-linear-to-r from-gold to-accent-red bg-clip-text text-transparent animate-pulse">
              404
            </h1>
          </div>
          
          {/* Shopping Cart Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-black-custom/80 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center animate-bounce">
              <AiOutlineShoppingCart className="text-6xl text-accent-red" />
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-0 left-1/4 w-8 h-8 bg-gold rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-0 right-1/4 w-6 h-6 bg-accent-red rounded-full animate-ping opacity-75" style={{ animationDelay: '500ms' }}></div>
          <div className="absolute bottom-0 left-1/3 w-4 h-4 bg-gold rounded-full animate-ping opacity-75" style={{ animationDelay: '1000ms' }}></div>
          <div className="absolute bottom-0 right-1/3 w-5 h-5 bg-accent-red rounded-full animate-ping opacity-75" style={{ animationDelay: '1500ms' }}></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-metallic-silver mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-light-silver mb-2">
            Looks like you've wandered into the wrong aisle!
          </p>
          <p className="text-dark-gray-custom0">
            The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => router.push('/')}
            className="flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-gold to-accent-red text-white rounded-xl hover:from-dark-gold hover:to-accent-red transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <AiOutlineHome size={20} />
            <span className="font-medium">Go Home</span>
          </button>
          
          <button
            onClick={() => router.push('/all-clothes')}
            className="flex items-center space-x-2 px-6 py-3 bg-black-custom border-2 border-gold text-gold rounded-xl hover:bg-dark-gray-custom transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <AiOutlineShoppingCart size={20} />
            <span className="font-medium">Browse Clothes</span>
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 px-6 py-3 bg-dark-gold/40 text-light-silver rounded-xl hover:bg-dark-gold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Go Back</span>
          </button>
        </div>
        {/* Fun Message */}
        <div className="mt-12 p-6 bg-linear-to-r from-dark-gray-custom/60 to-dark-gray-custom/60 rounded-xl border border-dark-gold/40">
          <p className="text-light-silver font-medium">
            🛍️ While you're here, check out our amazing deals! Your perfect product might be just a click away.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
