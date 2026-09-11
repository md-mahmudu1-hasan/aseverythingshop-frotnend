"use client";

import { createContext, useEffect, useState } from "react";
import { toast, confirmAction } from "@/components/ui/notify";

export const CartContext = createContext();

const getCartFromLocalStorage = () => {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getCartFromLocalStorage());

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart
  const addToCart = (product, qty = 1) => {
    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + qty }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: qty }]);
    }
  };

  // Remove item
  const removeFromCart = async (id) => {
    const confirmed = await confirmAction({
      title: "Remove this item?",
      description: "It will be taken out of your cart. You can add it again anytime.",
      confirmText: "Yes, remove it",
      cancelText: "Keep it",
      tone: "danger",
    });

    if (!confirmed) return;

    setCart(cart.filter((item) => item._id !== id));
    toast.success("Removed from cart", {
      description: "The item is no longer in your bag.",
    });
  };

  // Increase quantity
const increaseQty = (id, maxQty = 10) => {
  setCart(
    cart.map((item) => {
      if (item._id === id) {
        if (item.quantity >= maxQty) {
          toast.error(`You can’t add more than ${maxQty} items`);
          return item;
        }
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    })
  );
};


  // Decrease quantity
  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item,
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        getCartCount: () => cart.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
