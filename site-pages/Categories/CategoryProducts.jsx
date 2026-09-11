"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiPackage, FiRefreshCw } from "react-icons/fi";
import useAxios from "@/hooks/useAxios";
import ProductCard from "@/site-pages/AllClothes/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

const categoryDetails = {
  electronics: { title: "Electronics", description: "Smart devices and everyday tech for modern living." },
  cosmetics: { title: "Cosmetics", description: "Beauty essentials for your everyday routine." },
  kitchen: { title: "Kitchen", description: "Useful kitchen pieces for a warmer, easier home." },
  sports: { title: "Sports", description: "Active essentials for your next move." },
};

export default function CategoryProducts({ category }) {
  const axiosInstance = useAxios();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const details = categoryDetails[category] || categoryDetails.electronics;

  const loadProducts = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axiosInstance.get(`/${category}`);
      setProducts(Array.isArray(response.data) ? response.data : response.data.data || []);
    } catch (requestError) {
      console.error(`Failed to fetch ${category}:`, requestError);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [category]);

  return (
    <main className="min-h-screen bg-dark-gray-custom px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-light-silver hover:text-gold">
          <FiArrowLeft /> Back home
        </Link>
        <header className="mb-10 border-b border-dark-gold/50 pb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">AS / Category collection</p>
          <h1 className="mt-3 text-4xl font-semibold text-metallic-silver sm:text-5xl">{details.title}</h1>
          <p className="mt-3 max-w-xl text-light-silver">{details.description}</p>
        </header>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-light-silver">{products.length} products</p>
          <button onClick={loadProducts} className="inline-flex items-center gap-2 rounded-full border border-dark-gold px-4 py-2 text-sm text-light-silver hover:border-gold hover:text-gold">
            <FiRefreshCw className="h-4 w-4" /> Refresh
          </button>
        </div>

        {loading && <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">{Array.from({ length: 10 }, (_, index) => <ProductCardSkeleton key={index} />)}</div>}
        {!loading && error && <div className="rounded-2xl border border-accent-red/50 bg-black-custom p-12 text-center text-light-silver">Could not load this collection. Please try again.</div>}
        {!loading && !error && products.length === 0 && <div className="rounded-2xl border border-dark-gold/60 bg-black-custom p-12 text-center"><FiPackage className="mx-auto h-10 w-10 text-gold" /><h2 className="mt-4 text-2xl font-semibold text-metallic-silver">Coming soon</h2><p className="mt-2 text-light-silver">No products have been added to this collection yet.</p></div>}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {products.map((product) => <ProductCard key={product._id} product={{ ...product, images: product.images?.length ? product.images : [product.image], main_price: product.main_price ?? product.price ?? 0, after_discount_price: product.after_discount_price ?? product.price ?? 0, ratings: product.ratings ?? 0 }} name={category} />)}
          </div>
        )}
      </div>
    </main>
  );
}
