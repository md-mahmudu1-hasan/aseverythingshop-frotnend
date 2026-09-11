"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const categories = [
  {
    name: "All clothes",
    copy: "Men, women, and kids — one edit.",
    href: "/all-clothes",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80",
    featured: true,
  },
  {
    name: "Electronics",
    copy: "Smart essentials",
    href: "/electronics",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Cosmetics",
    copy: "Everyday glow",
    href: "/cosmetics",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Kitchen",
    copy: "Home classics",
    href: "/kitchen",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Sports",
    copy: "Move freely",
    href: "/sports",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85",
  },
];

const ShopCategories = () => {
  const featured = categories[0];
  const rest = categories.slice(1);

  return (
    <section className="bg-dark-gray-custom px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-block rounded-full bg-gold/15 px-4 py-2 text-sm font-semibold text-dark-gold">
              Shop the store
            </span>
            <h2 className="mt-4 text-4xl font-bold text-dark-gold md:text-5xl">Find your aisle</h2>
            <p className="mt-3 max-w-xl text-light-silver">
              Clothes first, then the rest of daily life — same warm, considered edit.
            </p>
          </div>
          <Link href="/all-clothes" className="inline-flex items-center gap-2 text-sm font-semibold text-dark-gold hover:text-gold">
            Browse everything
            <FiArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <Link href={featured.href} className="group relative min-h-[20rem] overflow-hidden rounded-[1.75rem] bg-[#2a1713] shadow-lg">
            <Image src={featured.image} alt={featured.name} fill unoptimized sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141313] via-[#141313]/25 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{featured.copy}</p>
              <h3 className="mt-2 text-3xl font-semibold text-[#fff8ed]">{featured.name}</h3>
            </div>
          </Link>

          <div className="grid grid-cols-2 gap-4">
            {rest.map((item) => (
              <Link key={item.href} href={item.href} className="group relative min-h-[9.5rem] overflow-hidden rounded-2xl bg-[#2a1713] shadow-md">
                <Image src={item.image} alt={item.name} fill unoptimized sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141313]/90 via-[#141313]/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold/80">{item.copy}</p>
                  <h3 className="mt-1 text-lg font-semibold text-[#fff8ed]">{item.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopCategories;
