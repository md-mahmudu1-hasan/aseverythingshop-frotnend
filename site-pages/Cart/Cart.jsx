"use client";

import Image from "next/image";

import React, { useEffect, useState } from "react";
import {
  FiShoppingCart,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiArrowLeft,
  FiEdit2,
  FiMapPin,
} from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/useCart";
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import Loader from "@/components/Loader";
import { toast } from "@/components/ui/notify";
import { getCartDelivery } from "@/hooks/delivery";

const Cart = () => {
  const { cart,removeFromCart, increaseQty, decreaseQty } = useCart();
  const [userAddress, setUserAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderLoading, _setOrderLoading] = useState(false);
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const router = useRouter();
  
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true);

        if (user?.email) {
          const res = await axiosInstance.get(
            `/userInfo/by-email/${user.email}`,
          );
          setUserAddress(res?.data || {});
        } else {
          setUserAddress(null);
        }
      } catch (error) {
        console.error(error);
        setUserAddress(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [user]);

  const OrderSubmit = async () => {
    if (!userAddress) {
      return toast.error("Please add delivery address");
    }
    toast.success("Redirecting to payment page");
    router.push("/payment");
  };

  const getSubtotal = () => {
    return cart.reduce(
      (total, item) => total + item.after_discount_price * item.quantity,
      0,
    );
  };

  const getOriginalTotal = () => {
    return cart.reduce(
      (total, item) => total + item.main_price * item.quantity,
      0,
    );
  };

  const getDiscountAmount = () => {
    return getOriginalTotal() - getSubtotal();
  };

  const delivery = getCartDelivery(cart);

  if (loading) return <Loader />;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-dark-gray-custom py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="w-32 h-32 bg-dark-gray-custom rounded-full flex items-center justify-center mx-auto mb-6">
              <FiShoppingCart className="w-16 h-16 text-light-silver" />
            </div>
            <h2 className="text-3xl font-bold text-gold mb-4">
              Your cart is empty
            </h2>
            <p className="text-light-silver mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-linear-to-r from-gold to-dark-gold text-black-custom rounded-lg hover:from-dark-gold hover:to-gold transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-gray-custom py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gold mb-2">
            Shopping Cart
          </h1>
          <p className="text-light-silver">
            {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-black-custom rounded-lg shadow-sm border border-dark-gold p-6"
              >
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-dark-gray-custom rounded-lg overflow-hidden shrink-0">
                    <Image width={500} height={500} unoptimized
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gold mb-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl font-bold bg-linear-to-r from-gold to-dark-gold bg-clip-text text-transparent">
                        ৳{item.after_discount_price}
                      </span>
                      <span className="text-lg text-light-silver line-through">
                        ৳{item.main_price}
                      </span>
                      <span className="bg-dark-gray-custom text-accent-red px-2 py-1 rounded-full text-xs font-semibold">
                        {item.discount}% OFF
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => decreaseQty(item._id)}
                          className="w-8 h-8 rounded-full border border-dark-gold flex items-center justify-center hover:bg-dark-gray-custom transition-colors text-gold"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold text-gold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(item._id, item.stock)}
                          className="w-8 h-8 rounded-full border border-dark-gold flex items-center justify-center hover:bg-dark-gray-custom transition-colors text-gold"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-accent-red hover:text-accent-red/80 transition-colors"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-black-custom rounded-lg shadow-sm border border-dark-gold p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gold mb-4">
                Order Summary
              </h2>

              {/* Delivery Address Section */}
              <div className="mb-6 p-4 bg-dark-gray-custom rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <FiMapPin className="w-4 h-4 text-gold" />
                    <h3 className="text-sm font-semibold text-light-silver">
                      Delivery Address
                    </h3>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-1 text-gold hover:text-dark-gold transition-colors text-sm"
                  >
                    <FiEdit2 className="w-3 h-3" />
                    <span>{userAddress ? "Edit" : "Add Address"}</span>
                  </Link>
                </div>
                {userAddress ? (
                  <p className="text-sm text-light-silver">
                    {userAddress?.address}
                    <br />
                    Phone: {userAddress?.phone}
                  </p>
                ) : (
                  <p className="text-sm text-accent-red font-medium">
                    Please add your delivery address
                  </p>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-light-silver">
                  <span>
                    Subtotal ({cart.length}
                    items)
                  </span>
                  <span>৳{getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gold">
                  <span>Discount</span>
                  <span>-৳{getDiscountAmount().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-light-silver">
                  <span>Delivery Fee</span>
                  <span className="text-gold">
                    {delivery.isFreeDelivery ? "FREE" : `৳${delivery.deliveryFee}`}
                  </span>
                </div>
                <div className="rounded-lg border border-dark-gold/50 bg-dark-gray-custom px-3 py-2 text-xs leading-5 text-light-silver">
                  {delivery.isFreeDelivery
                    ? "Free delivery: full payment is required before order confirmation."
                    : `Cash on delivery: pay ৳${delivery.deliveryFee} now; ৳${delivery.remainingAmount.toFixed(2)} is payable after delivery.`}
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold text-gold">
                    <span>Total</span>
                    <span>৳{delivery.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={OrderSubmit}
                  disabled={orderLoading || !user}
                  className="w-full px-6 py-3 bg-linear-to-r from-gold to-dark-gold text-black-custom rounded-lg hover:from-dark-gold hover:to-gold transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-gold disabled:hover:to-dark-gold flex items-center justify-center space-x-2"
                >
                  {orderLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>{user ? "Confirm Order" : "Add Your Adress to Confirm Order"}</span>
                  )}
                </button>
                <Link
                  href="/"
                  className="w-full px-6 py-3 border border-dark-gold text-light-silver rounded-lg hover:bg-dark-gray-custom transition-colors font-semibold text-center block"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Security Badge */}
              {/* <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-dark-gray-custom0">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Secure Checkout</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
