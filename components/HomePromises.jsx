"use client";

import Link from "next/link";
import { FiArrowUpRight, FiShield, FiRefreshCw, FiTruck } from "react-icons/fi";

const promises = [
  {
    title: "Packed with care",
    copy: "Orders leave the studio checked, wrapped, and ready for the road.",
    icon: FiTruck,
  },
  {
    title: "Secure checkout",
    copy: "Pay with confidence — your cart becomes a confirmed order in a few taps.",
    icon: FiShield,
  },
  {
    title: "Easy next step",
    copy: "Need a different size or look? Support stays as considered as the edit.",
    icon: FiRefreshCw,
  },
];

const HomePromises = () => {
  return (
    <section className="bg-dark-gray-custom px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] border border-dark-gold/30 bg-white p-8 shadow-[0_20px_60px_rgba(28,24,22,0.08)] sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-dark-gold">Why AS Wear</span>
              <h2 className="mt-4 text-4xl font-bold text-black-custom md:text-5xl">
                From the rack to your door, without the rush.
              </h2>
              <p className="mt-4 max-w-md text-base leading-7 text-light-silver">
                The same pieces you see in the hero story are the ones we actually stock — browse, bag, order, arrive.
              </p>
              <Link
                href="/all-clothes"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#f2d29b] px-6 py-3 text-sm font-bold text-[#2a1713] transition-transform duration-300 hover:-translate-y-1"
              >
                Start shopping
                <FiArrowUpRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {promises.map((item) => (
                <div key={item.title} className="flex gap-4 rounded-2xl border border-dark-gold/20 bg-[#f6f1e8] p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-light-silver">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePromises;
