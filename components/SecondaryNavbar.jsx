"use client";

import React from 'react';
import Link from 'next/link';

const SecondaryNavbar = () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "All Clothes", href: "/all-clothes" },
    { name: "Electronics", href: "/electronics" },
    { name: "Cosmetics", href: "/cosmetics" },
    { name: "Kitchen", href: "/kitchen" },
    { name: "Sports", href: "/sports" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "About Us", href: "/about" }
  ];

  return (
    <nav className="category-nav text-gold w-full border-b border-dark-gold/30">
      <div className="mx-auto max-w-7xl px-0 sm:px-4">
        <div className="category-scroll flex min-h-10 items-center overflow-x-auto overscroll-x-contain px-2 sm:h-10 sm:justify-center sm:overflow-visible sm:px-0">
          <div className="flex min-w-max items-center gap-1.5 py-1 sm:gap-6 sm:py-0">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="category-link shrink-0 text-light-silver hover:text-dark-gold hover:bg-gold/10 px-2 py-2 sm:px-3 sm:py-2 rounded text-[11px] sm:text-sm font-medium transition-all duration-200 whitespace-nowrap relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SecondaryNavbar;
