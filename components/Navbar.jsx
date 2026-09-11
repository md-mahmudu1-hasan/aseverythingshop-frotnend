"use client";

import Image from "next/image";

import React, { useState } from "react";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { RiLoginBoxLine } from "react-icons/ri";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";
import useAxios from "@/hooks/useAxios";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user } = useAuth();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const axiosInstance = useAxios();

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  const router = useRouter();

  const handleSearch = async (value) => {
    setQuery(value);

    if (!value) {
      setResults([]);
      return;
    }

    try {
      const res = await axiosInstance.get(`/search?q=${value}`);
      setResults(res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <nav className="main-nav sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image width={120} height={72} priority loading="eager" src="/logo.png" alt="AS Everything Shop logo" style={{ width: "auto", height: "auto" }} className="w-20 px-1 sm:w-28 sm:px-2" />
          </Link>

          {/* Desktop Search Box */}
          <div className="hidden md:flex">
            <div className="relative w-125">
              <div className="flex items-center bg-dark-gray-custom/90 backdrop-blur rounded-lg overflow-hidden border border-dark-gold">
                <input
                  type="text"
                  placeholder="Search for Clothes..."
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="flex-1 px-4 py-3 bg-transparent outline-none text-gold placeholder-light-silver"
                />
                <button className="px-6 py-3 bg-linear-to-r from-gold to-dark-gold text-black-custom font-medium hover:from-dark-gold hover:to-dark-gold transition-all">
                  Search
                </button>
              </div>

              {/* Search Results Dropdown */}
              {results.length > 0 && (
                <div className="absolute w-full bg-black-custom shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-50 border border-dark-gold">
                  {results.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => {
                        router.push(`/${item.type}/${item._id}`);
                        setResults([]);
                        setQuery("");
                      }}
                      className="px-4 py-2 hover:bg-dark-gray-custom cursor-pointer text-light-silver"
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/cart"
              className="flex flex-col items-center p-2 text-light-silver hover:text-gold transition-colors relative"
            >
              <IoCartOutline size={28} />
              <span className="text-xs mt-1">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-5">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
            <Link
              href="/login"
              className={`flex flex-col items-center p-2 text-light-silver hover:text-gold transition-colors ${user && "hidden"}`}
            >
              <RiLoginBoxLine size={24} />
              <span className="text-xs mt-1">Login</span>
            </Link>
            <Link
              href="/profile"
              className={`flex flex-col items-center p-2 text-light-silver hover:text-gold transition-colors ${!user && "hidden"}`}
            >
              <FiUser size={24} />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>

          {/* Mobile Menu Icons */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              href="/cart"
              className="p-2 text-light-silver hover:text-gold transition-colors flex items-center relative"
            >
              <IoCartOutline size={28} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-5">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
            <Link
              href="/login"
              className={`p-2 text-light-silver hover:text-gold transition-colors flex items-center ${user && "hidden"}`}
            >
              <RiLoginBoxLine size={24} />
            </Link>
            <Link
              href="/profile"
              className={`p-2 text-light-silver hover:text-gold transition-colors flex items-center ${!user && "hidden"}`}
            >
              <FiUser size={24} />
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3 relative">
          <div className="flex items-center bg-dark-gray-custom/90 backdrop-blur rounded-lg overflow-hidden border border-dark-gold">
            <input
              type="text"
              placeholder="Search for Clothes..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-gold"
            />
            <button className="px-4 py-2 bg-linear-to-r from-gold to-dark-gold text-black-custom hover:from-dark-gold hover:to-dark-gold transition-all">
              Search
            </button>
          </div>

          {/* Mobile Search Results */}
          {results.length > 0 && (
            <div className="absolute w-full bg-black-custom shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-50 border border-dark-gold">
              {results.map((item) => (
                <div
                  key={item._id}
                  onClick={() => {
                    router.push(`/${item.type}/${item._id}`);
                    setResults([]);
                    setQuery("");
                  }}
                  className="px-4 py-2 hover:bg-dark-gray-custom cursor-pointer text-light-silver"
                >
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
