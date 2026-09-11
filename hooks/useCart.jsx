"use client";

import { use } from "react";
import { CartContext } from "@/context/CartProvider";


const useCart = () => {
  const cartinfo = use(CartContext);
  return cartinfo;
};
export default useCart;
