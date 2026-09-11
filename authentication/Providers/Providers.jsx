"use client";

import React from "react";
import AuthProvider from "@/authentication/Context/AuthProvider";
import CartProvider from "@/context/CartProvider";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
};

export default Providers;
