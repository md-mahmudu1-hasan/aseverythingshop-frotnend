"use client";

import { useState, useEffect } from "react";
import HomeShowcase from "@/components/HomeShowcase";
import ShopCategories from "@/components/ShopCategories";
import BestProducts from "@/components/BestProducts";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import HomePromises from "@/components/HomePromises";
import Loader from "@/components/Loader";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-gray-custom">
        <Loader size="large" text="Loading Your Shopping Experience" />
      </div>
    );
  }

  return (
    <>
      <HomeShowcase />
      <ShopCategories />
      <BestProducts />
      <HowItWorks />
      <Testimonials />
      <HomePromises />
    </>
  );
};

export default Home;
