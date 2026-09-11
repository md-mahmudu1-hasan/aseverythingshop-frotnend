"use client";

import Link from "next/link";
import { FiArrowUpRight, FiShoppingBag, FiTruck } from "react-icons/fi";
import HomeStoryPlayer from "./HomeStoryPlayer";

const HomeShowcase = () => {
  return (
    <section className="showcase-wrap px-4 pb-6 pt-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="showcase-hero overflow-hidden rounded-[2rem] lg:grid lg:grid-cols-[1.05fr_.95fr] lg:items-stretch">
          <div className="showcase-copy flex flex-col justify-between p-7 sm:p-10 lg:p-14">
            <div>
              <div className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200/70">
                <span className="h-px w-8 bg-amber-300/70" />
                The everyday edit
              </div>
              <h1 className="max-w-xl text-5xl font-semibold leading-[0.95] text-[#fff8ed] sm:text-6xl lg:text-7xl">
                Good things,
                <span className="block text-amber-200">beautifully chosen.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-7 text-[#dcc9b7] sm:text-lg">
                Watch a look become a bag, an order, then a delivery — then shop the same pieces yourself.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/all-clothes"
                  className="inline-flex w-fit items-center gap-3 rounded-full bg-[#f2d29b] px-6 py-3 text-sm font-bold text-[#2a1713] transition-transform duration-300 hover:-translate-y-1 hover:bg-[#fff0c8]"
                >
                  Shop the collection
                  <FiArrowUpRight className="h-5 w-5" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex w-fit items-center gap-3 rounded-full border border-dark-gold/60 px-6 py-3 text-sm font-semibold text-[#f2d29b] transition hover:border-gold hover:text-[#fff8ed]"
                >
                  See the journey
                </a>
              </div>
            </div>
            <div className="mt-12 flex items-center gap-3 text-sm text-[#d7bda7]">
              <FiTruck className="h-5 w-5 text-amber-200" />
              Curated pieces, delivered with care
            </div>
          </div>

          <div className="showcase-hero-image relative px-5 pb-8 pt-2 lg:px-10 lg:py-10">
            <HomeStoryPlayer />
          </div>
        </div>

        <div className="mt-5 flex flex-col justify-between gap-4 rounded-2xl border border-dark-gold/25 bg-white px-6 py-5 text-light-silver shadow-sm sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-center gap-3">
            <FiShoppingBag className="h-5 w-5 text-dark-gold" />
            <p className="text-sm text-black-custom sm:text-base">One store, many ways to make your day better.</p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-dark-gold">AS / Everything shop</span>
        </div>
      </div>
    </section>
  );
};

export default HomeShowcase;
