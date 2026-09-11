"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiShoppingBag } from "react-icons/fi";
import useAxios from "@/hooks/useAxios";
import useCart from "@/hooks/useCart";
import { isFreeDelivery } from "@/hooks/delivery";

export default function CategoryProductDetails({ category }) {
  const { id } = useParams();
  const router = useRouter();
  const axiosInstance = useAxios();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`/${category}/${id}`).then((response) => setProduct(response.data)).catch(console.error).finally(() => setLoading(false));
  }, [category, id]);

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-dark-gray-custom text-gold">Loading product...</div>;
  if (!product) return <div className="flex min-h-screen items-center justify-center bg-dark-gray-custom text-light-silver">Product not found.</div>;

  const image = product.images?.[0] || product.image;
  const price = product.after_discount_price ?? product.price ?? 0;

  return (
    <main className="min-h-screen bg-dark-gray-custom px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <button onClick={() => router.back()} className="mb-8 inline-flex items-center gap-2 text-sm text-light-silver hover:text-gold"><FiArrowLeft /> Back</button>
        <div className="grid overflow-hidden rounded-3xl border border-dark-gold bg-black-custom lg:grid-cols-2">
          <div className="relative min-h-[25rem] bg-dark-gray-custom"><Image src={image} alt={product.title || "Product"} fill unoptimized className="object-contain p-8" sizes="(max-width: 1024px) 100vw, 50vw" /></div>
          <div className="p-7 sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">AS / {category}</p>
            <h1 className="mt-4 text-3xl font-semibold text-metallic-silver sm:text-5xl">{product.title || "Untitled product"}</h1>
            <p className="mt-5 leading-7 text-light-silver">{product.description || "A carefully selected product from our collection."}</p>
            <div className="mt-6 flex flex-wrap gap-2"><span className="rounded-full border border-dark-gold px-3 py-1 text-sm text-light-silver">{isFreeDelivery(product) ? "Free delivery" : "Cash on delivery"}</span></div>
            <div className="mt-8 border-t border-dark-gold pt-6"><span className="text-3xl font-bold text-gold">৳{price}</span></div>
            <button onClick={() => addToCart({ ...product, after_discount_price: price })} className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold px-6 py-3 font-bold text-black-custom hover:bg-metallic-silver"><FiShoppingBag /> Add to cart</button>
            <Link href={`/${category}`} className="mt-4 block text-center text-sm text-light-silver hover:text-gold">Browse more {category}</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
