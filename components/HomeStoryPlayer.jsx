"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiCheck, FiMapPin, FiShoppingBag, FiTruck } from "react-icons/fi";
import useAxios from "@/hooks/useAxios";

const scenes = [
  { id: "look", label: "Discover" },
  { id: "cart", label: "Add to cart" },
  { id: "order", label: "Place order" },
  { id: "deliver", label: "On the way" },
];

const fallbackProduct = {
  title: "New season look",
  after_discount_price: 2490,
  main_price: 3200,
  images: [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85",
  ],
};

const SCENE_MS = 4200;

const HomeStoryPlayer = () => {
  const axiosInstance = useAxios();
  const [scene, setScene] = useState(0);
  const [product, setProduct] = useState(fallbackProduct);
  const [added, setAdded] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/bestclothes")
      .then((response) => {
        const first = Array.isArray(response.data) ? response.data[0] : null;
        if (first?.images?.[0]) setProduct(first);
      })
      .catch(() => {});
  }, [axiosInstance]);

  useEffect(() => {
    if (paused) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const id = setInterval(() => setScene((current) => (current + 1) % scenes.length), SCENE_MS);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    setAdded(false);
    if (scene !== 1) return undefined;
    const id = setTimeout(() => setAdded(true), 900);
    return () => clearTimeout(id);
  }, [scene]);

  const price = product.after_discount_price ?? product.main_price ?? 2490;
  const image = product.images?.[0] || fallbackProduct.images[0];

  return (
    <div
      className="story-stage relative mx-auto w-full max-w-[380px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute -left-6 top-10 hidden h-28 w-28 rounded-full bg-gold/20 blur-3xl lg:block" />
      <div className="absolute -right-4 bottom-16 hidden h-24 w-24 rounded-full bg-accent-red/20 blur-3xl lg:block" />

      <div className="relative overflow-hidden rounded-[2rem] border border-dark-gold/50 bg-[#1a1514] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-between px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200/70">
          <span>AS Wear live</span>
          <span>{paused ? "Paused" : "Playing"}</span>
        </div>

        <div className="relative h-[28rem] overflow-hidden sm:h-[32rem]">
          {scene === 0 && (
            <div key="look" className="story-scene absolute inset-0">
              <Image src={image} alt={product.title} fill unoptimized className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1514] via-[#1a1514]/20 to-transparent" />
              <div className="absolute bottom-6 left-5 right-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">New season / 2026</p>
                <h3 className="mt-2 text-2xl font-semibold text-[#fff8ed]">{product.title}</h3>
                <p className="mt-2 text-sm text-[#dcc9b7]">Tap through looks, then take one home.</p>
              </div>
            </div>
          )}

          {scene === 1 && (
            <div key="cart" className="story-scene absolute inset-0 flex flex-col bg-[#211e1d] p-5">
              <div className="flex items-center justify-between text-xs text-light-silver">
                <span>Product</span>
                <span className={`rounded-full px-2 py-1 ${added ? "bg-gold text-black-custom" : "border border-dark-gold text-gold"}`}>
                  Cart {added ? "1" : "0"}
                </span>
              </div>
              <div className="mt-4 overflow-hidden rounded-2xl border border-dark-gold/40">
                <Image src={image} alt={product.title} width={640} height={360} unoptimized className="h-40 w-full object-cover" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="line-clamp-2 text-sm font-semibold text-gold">{product.title}</p>
                  <p className="mt-1 text-lg font-bold text-[#fff8ed]">৳{price}</p>
                </div>
                <FiShoppingBag className={`h-6 w-6 text-gold ${added ? "story-bag-pop" : ""}`} />
              </div>
              <button
                type="button"
                className={`mt-auto rounded-full py-3 text-sm font-bold transition-all ${
                  added
                    ? "bg-dark-gray-custom text-gold ring-1 ring-gold"
                    : "bg-linear-to-r from-gold to-dark-gold text-black-custom"
                }`}
              >
                {added ? "Added to cart" : "Add to cart"}
              </button>
            </div>
          )}

          {scene === 2 && (
            <div key="order" className="story-scene absolute inset-0 flex flex-col bg-[#141313] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">Checkout</p>
              <div className="mt-5 rounded-2xl border border-dark-gold/50 bg-black-custom p-4">
                <div className="flex items-center justify-between text-sm text-light-silver">
                  <span>Look</span>
                  <span>৳{price}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-light-silver">
                  <span>Delivery</span>
                  <span className="text-gold">Free</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-dark-gold/40 pt-3 text-base font-semibold text-[#fff8ed]">
                  <span>Total</span>
                  <span>৳{price}</span>
                </div>
              </div>
              <div className="mt-auto rounded-2xl border border-gold/40 bg-gold/10 p-5 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-gold to-dark-gold text-black-custom">
                  <FiCheck className="h-6 w-6" />
                </div>
                <p className="text-lg font-semibold text-gold">Order confirmed</p>
                <p className="mt-1 text-xs text-light-silver">AS-2026 · paid securely</p>
              </div>
            </div>
          )}

          {scene === 3 && (
            <div key="deliver" className="story-scene absolute inset-0 overflow-hidden bg-[#1a1514] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">Delivery</p>
              <div className="relative mt-8 h-40 overflow-hidden rounded-2xl border border-dark-gold/40 bg-[radial-gradient(circle_at_20%_20%,rgba(215,173,98,0.16),transparent_42%)]">
                <div className="story-route absolute left-4 right-4 top-1/2 h-px bg-gold/40" />
                <FiMapPin className="absolute right-5 top-8 h-5 w-5 text-accent-red" />
                <div className="story-truck absolute top-1/2 -translate-y-1/2 text-gold">
                  <FiTruck className="h-8 w-8" />
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-semibold text-[#fff8ed]">On the way</h3>
                <p className="mt-2 text-sm leading-6 text-[#dcc9b7]">
                  Your order leaves the studio packed with care and lands at your door.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3 px-5 pb-5">
          <div className="h-1 overflow-hidden rounded-full bg-dark-gold/30">
            <div key={scene} className="story-progress h-full bg-linear-to-r from-gold to-dark-gold" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {scenes.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setScene(index)}
                className={`rounded-full px-1 py-1.5 text-[10px] font-semibold uppercase tracking-wide transition ${
                  scene === index ? "bg-gold text-black-custom" : "text-light-silver hover:text-gold"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeStoryPlayer;
