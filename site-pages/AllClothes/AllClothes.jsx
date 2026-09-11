"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { FiPackage } from "react-icons/fi";
import useAxios from "@/hooks/useAxios";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import ProductCard from "./ProductCard";

const ClothesSection = ({ title, subtitle, products, name, isLoading, error, totalPages, currentPage, onPageChange, accent }) => {
  return (
    <section id={name} className="clothes-section scroll-mt-28 pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 border-b border-dark-gold/40 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-3">
            <span className={`mt-1 h-10 w-1 rounded-full ${accent}`} />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-dark-gold">Curated collection</p>
              <h2 className="mt-1 text-2xl font-semibold text-metallic-silver sm:text-3xl">{title}</h2>
              <p className="mt-1 text-sm text-light-silver">{subtitle}</p>
            </div>
          </div>
          <span className="w-fit rounded-full border border-dark-gold/60 bg-black-custom px-3 py-1.5 text-xs font-semibold text-gold">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </span>
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 10 }, (_, index) => <ProductCardSkeleton key={`skeleton-${index}`} />)}
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-2xl border border-accent-red/40 bg-black-custom p-10 text-center">
            <p className="font-semibold text-metallic-silver">Could not load this collection</p>
            <p className="mt-2 text-sm text-light-silver">Please refresh and try again.</p>
          </div>
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-dark-gold bg-black-custom px-6 py-12 text-center shadow-inner">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-dark-gold/70 bg-dark-gray-custom text-gold">
              <FiPackage className="h-6 w-6" />
            </div>
            <p className="mt-5 text-lg font-semibold text-metallic-silver">No products available yet</p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-light-silver">New {title.toLowerCase()} products will be added soon. Please check back later.</p>
          </div>
        )}

        {!isLoading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {products.map((product) => <ProductCard key={product._id} product={product} name={name} />)}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
            <div className="mt-7 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                onClick={() => onPageChange(idx + 1)}
                className={`min-w-9 rounded-full border px-3 py-1.5 text-sm transition ${currentPage === idx + 1 ? "border-gold bg-gold font-bold text-black-custom" : "border-dark-gold bg-black-custom text-light-silver hover:border-gold hover:text-gold"}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const AllClothes = () => {
  const [kids, setKids] = useState([]);
  const [men, setMen] = useState([]);
  const [women, setWomen] = useState([]);

  const [kidsLoading, setKidsLoading] = useState(true);
  const [menLoading, setMenLoading] = useState(true);
  const [womenLoading, setWomenLoading] = useState(true);
  const [kidsError, setKidsError] = useState(false);
  const [menError, setMenError] = useState(false);
  const [womenError, setWomenError] = useState(false);

  const [kidsPage, setKidsPage] = useState(1);
  const [menPage, setMenPage] = useState(1);
  const [womenPage, setWomenPage] = useState(1);

  const [kidsTotalPages, setKidsTotalPages] = useState(1);
  const [menTotalPages, setMenTotalPages] = useState(1);
  const [womenTotalPages, setWomenTotalPages] = useState(1);

  const axiosInstance = useAxios();
  const limit = 10;

  const fetchClothes = async (type, page, setData, setLoading, setTotalPages, setError) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/${type}?page=${page}&limit=${limit}`);
      setData(Array.isArray(res.data?.data) ? res.data.data : []);
      setTotalPages(res.data.totalPages);
      setError(false);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClothes("kidsclothes", kidsPage, setKids, setKidsLoading, setKidsTotalPages, setKidsError);
  }, [kidsPage]);

  useEffect(() => {
    fetchClothes("mensclothes", menPage, setMen, setMenLoading, setMenTotalPages, setMenError);
  }, [menPage]);

  useEffect(() => {
    fetchClothes("womensclothes", womenPage, setWomen, setWomenLoading, setWomenTotalPages, setWomenError);
  }, [womenPage]);

  return (
    <div className="all-clothes-page min-h-screen bg-dark-gray-custom">

      <nav className="clothes-jump-nav sticky top-0 z-20 border-y border-dark-gold/40 bg-black-custom/90 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto">
          {[{ label: "Kids", href: "#kidsclothes" }, { label: "Men", href: "#mensclothes" }, { label: "Women", href: "#womensclothes" }].map((item) => <Link key={item.href} href={item.href} className="shrink-0 rounded-full border border-dark-gold px-4 py-2 text-xs font-semibold text-light-silver transition hover:border-gold hover:text-gold">{item.label}</Link>)}
          <span className="ml-auto hidden items-center gap-2 text-xs text-light-silver sm:flex"><FiArrowUpRight className="text-gold" /> Shop by collection</span>
        </div>
      </nav>

      <div className="space-y-4 py-10 sm:py-14">
      <ClothesSection
        title="Kids Clothes"
        subtitle="Playful layers and everyday comfort"
        products={kids}
        name="kidsclothes"
        isLoading={kidsLoading}
        error={kidsError}
        totalPages={kidsTotalPages}
        currentPage={kidsPage}
        onPageChange={setKidsPage}
        accent="bg-amber-300"
      />
      <ClothesSection
        subtitle="Polished staples for every day"
        title="Men's Clothes"
        products={men}
        name="mensclothes"
        isLoading={menLoading}
        error={menError}
        totalPages={menTotalPages}
        currentPage={menPage}
        onPageChange={setMenPage}
        accent="bg-orange-400"
      />
      <ClothesSection
        subtitle="Soft tailoring, expressive details"
        title="Women's Clothes"
        products={women}
        name="womensclothes"
        isLoading={womenLoading}
        error={womenError}
        totalPages={womenTotalPages}
        currentPage={womenPage}
        onPageChange={setWomenPage}
        accent="bg-rose-300"
      />
      </div>
    </div>
  );
};

export default AllClothes;
