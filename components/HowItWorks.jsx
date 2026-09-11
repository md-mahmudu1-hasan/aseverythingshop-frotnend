"use client";

import React from 'react';
import { FiSearch, FiShoppingCart, FiCheckCircle, FiTruck } from 'react-icons/fi';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Browse Products",
      description: "Explore our wide range of products across various categories",
      icon: <FiSearch className="w-8 h-8" />
    },
    {
      id: 2,
      title: "Add to Cart",
      description: "Select your favorite products and add them to your shopping cart",
      icon: <FiShoppingCart className="w-8 h-8" />
    },
    {
      id: 3,
      title: "Confirm Order",
      description: "Confirm your order and check your email for order confirmation",
      icon: <FiCheckCircle className="w-8 h-8" />
    },
    {
      id: 4,
      title: "Fast Delivery",
      description: "Receive your products at your doorstep with our fast delivery service",
      icon: <FiTruck className="w-8 h-8" />
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-dark-gray-custom">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-semibold mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gold mb-4">How It Works</h2>
          <p className="text-light-silver max-w-2xl mx-auto">
            The same path as the hero story: browse, bag, confirm, and receive.
          </p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="works-line pointer-events-none absolute left-[12%] right-[12%] top-10 hidden h-px bg-linear-to-r from-gold/0 via-gold/60 to-gold/0 lg:block" />
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="works-card text-center p-6 bg-black-custom rounded-2xl hover:bg-dark-gray-custom transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-dark-gold relative group"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-linear-to-r from-gold to-dark-gold text-black-custom rounded-full flex items-center justify-center font-bold text-sm shadow-lg group-hover:scale-110 transition-transform">
                {index + 1}
              </div>
              <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-dark-gray-custom to-black-custom rounded-2xl flex items-center justify-center text-gold border border-dark-gold group-hover:border-gold group-hover:from-gold/10 group-hover:to-dark-gold/10 transition-all duration-300">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold text-gold mb-2">{step.title}</h3>
              <p className="text-light-silver text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
