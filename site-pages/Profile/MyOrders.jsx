"use client";

import React, { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import useAuth from "@/hooks/useAuth";
import {
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiShoppingCart,
  FiStar,
  FiX,
  FiCalendar,
  FiTrendingUp,
  FiSend,
} from "react-icons/fi";
import toast from "react-hot-toast";
import useAxios from "@/hooks/useAxios";
import Swal from "sweetalert2";
import Link from "next/link";

const MyOrders = ({ data }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewModal, setReviewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: "",
    productId: "" || 0,
  });

  const [submittingReview, setSubmittingReview] = useState(false);
  const axiosInstance = useAxios();
  const { user } = useAuth();

  // Status configuration with colors and icons
  const getStatusConfig = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case "pending":
        return {
          color: "yellow",
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-700",
          borderColor: "border-yellow-200",
          icon: FiClock,
          label: "Pending",
        };
      case "confirmed":
        return {
          color: "gold",
          bgColor: "bg-dark-gray-custom",
          textColor: "text-gold",
          borderColor: "border-dark-gold",
          icon: FiCheckCircle,
          label: "Confirmed",
        };
      case "canceled":
      case "cancelled":
        return {
          color: "red",
          bgColor: "bg-red-50",
          textColor: "text-red-700",
          borderColor: "border-red-200",
          icon: FiXCircle,
          label: "Canceled",
        };
      default:
        return {
          color: "gray",
          bgColor: "bg-dark-gray-custom",
          textColor: "text-light-silver",
          borderColor: "border-dark-gold/40",
          icon: FiPackage,
          label: status || "Unknown",
        };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/orders?email=${user?.email}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleCancelOrder = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    if (!result.isConfirmed) return;

    try {
      // loading alert
      Swal.fire({
        title: "Cancelling...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await axiosInstance.patch(`/orders/${orderId}`, {
        status: "canceled",
      });

      fetchOrders();

      Swal.fire({
        title: "Canceled!",
        text: "Your order has been canceled.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error!",
        text: "Failed to cancel order",
        icon: "error",
      });
    }
  };

  const handleAddReview = (order) => {
    // const productId = order.products.map(item => item.title == )
    setSelectedOrder(order);
    setReviewData({
      rating: 0,
      comment: "",
      productId: "" || 0,
    });
    setReviewModal(true);
  };

  const handleCloseModal = () => {
    setReviewModal(false);
    setSelectedOrder(null);
    setReviewData({
      rating: 0,
      comment: "",
      productId: "" || 0,
    });
  };

  const handleSubmitReview = async () => {
    if (!reviewData.rating || !reviewData.comment.trim()) {
      toast.error("Please provide both rating and comment");
      return;
    }
    try {
      setSubmittingReview(true);
      const selectedProduct =
        selectedOrder?.products?.find(
          (product) => product._id === reviewData.productId,
        ) || selectedOrder?.products?.[0];

      const reviewPayload = {
        orderId: selectedOrder._id,
        productid: selectedOrder?.products[reviewData.productId]?.productId,
        productName: selectedProduct?.title,
        userId: data?._id,
        userName: data?.name,
        rating: reviewData.rating,
        comment: reviewData.comment,
        userEmail: data?.email,
        createdAt: new Date(),
      };
      await axiosInstance.post("/reviews", reviewPayload);
      toast.success("Review submitted successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setSubmittingReview(false);
    }
  };

  const StarRating = ({ rating, onRatingChange }) => {
    return (
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="transition-all duration-200 transform hover:scale-110"
          >
            <FiStar
              className={`w-8 h-8 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-dark-gold hover:text-yellow-200"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-dark-gray-custom py-4 sm:py-8 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gold mb-2 flex items-center">
            <FiPackage className="mr-3 text-gold shrink-0" />
            My Orders
          </h1>
          <p className="text-light-silver">Track and manage your orders</p>
        </div>

        {loading ? (
          <Loader size="large" text="Loading your orders..." />
        ) : (
          <>
            {orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => {
                  const statusConfig = getStatusConfig(order.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div
                      key={order._id}
                      className={`bg-black-custom rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 ${statusConfig.borderColor} overflow-hidden`}
                    >
                      <div className="p-4 sm:p-6">
                        {/* Order Header with Status */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                              <div
                                className={`px-2.5 py-1 rounded-full ${statusConfig.bgColor} ${statusConfig.textColor} text-[10px] sm:text-xs font-bold flex items-center shrink-0 uppercase tracking-tighter sm:tracking-normal`}
                              >
                                <StatusIcon className="mr-1 w-3 sm:w-3.5 h-3 sm:h-3.5" />
                                {statusConfig.label}
                              </div>
                              <span className="text-xs sm:text-sm text-light-silver font-medium whitespace-nowrap">
                                Order #{order._id?.slice(-8)}
                              </span>
                            </div>
                            <div className="flex items-center text-xs sm:text-sm text-light-silver">
                              <FiCalendar className="mr-1.5 w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">
                                Placed on {formatDate(order.createdAt)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3">
                            {order.status?.toLowerCase() === "pending" && (
                              <button
                                onClick={() => handleCancelOrder(order._id)}
                                className="flex-1 sm:flex-none px-4 py-2 text-sm bg-accent-red text-white rounded-lg hover:bg-accent-red/80 transition-all flex items-center justify-center active:scale-95 shadow-sm"
                              >
                                <FiX className="mr-2 w-4 h-4" />
                                Cancel Order
                              </button>
                            )}
                            {order.status?.toLowerCase() === "confirmed" && (
                              <button
                                onClick={() => handleAddReview(order)}
                                className="flex-1 sm:flex-none px-4 py-2 text-sm bg-linear-to-r from-gold to-dark-gold text-black-custom rounded-lg hover:from-dark-gold hover:to-gold transition-all flex items-center justify-center active:scale-95 shadow-sm"
                              >
                                <FiStar className="mr-2 w-4 h-4" />
                                Add Review
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="border-t border-dark-gold pt-4">
                          <h4 className="text-sm font-medium text-gold mb-3 flex items-center">
                            <FiShoppingCart className="mr-2 w-4 h-4" />
                            Order Items ({order.products?.length || 0})
                          </h4>
                          <div className="space-y-4">
                            {order.products?.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-start sm:items-center justify-between p-3 bg-dark-gray-custom/50 hover:bg-dark-gray-custom rounded-xl transition-colors border border-dark-gold/50"
                              >
                                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-black-custom rounded-xl shadow-sm border border-dark-gold flex items-center justify-center shrink-0">
                                    <FiPackage className="w-5 h-5 sm:w-7 sm:h-7 text-light-silver" />
                                  </div>
                                  <div className="min-w-0">
                                    <h4 className="text-xs sm:text-sm font-bold text-gold line-clamp-2 sm:line-clamp-1">
                                      {item.title}
                                    </h4>
                                    <p className="text-[10px] sm:text-xs text-light-silver mt-0.5">
                                      Qty: {item.quantity}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="text-sm sm:text-base font-black text-gold">
                                    ৳{item.price * item.quantity}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-dark-gold mt-4 pt-4">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center text-xs sm:text-sm text-dark-gray-custom0 truncate">
                              <FiTrendingUp className="mr-2 w-4 h-4 shrink-0" />
                              <span className="truncate">Total Amount</span>
                            </div>
                            <div className="text-lg sm:text-xl font-bold text-gold shrink-0">
                              ৳{order.totalAmount}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-20 px-4">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-dark-gray-custom rounded-full flex items-center justify-center mx-auto mb-8 relative">
                  <FiPackage className="w-12 h-12 sm:w-16 sm:h-16 text-light-silver" />
                  <div className="absolute inset-0 border-4 border-dashed border-dark-gold rounded-full animate-[spin_10s_linear_infinite]"></div>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gold mb-3">
                  No orders yet
                </h3>
                <p className="text-light-silver mb-8 max-w-md mx-auto">
                  You haven't placed any orders yet. Start shopping to see your
                  orders here.
                </p>
                <Link
                  href="/all-clothes"
                  className="px-5 py-2 bg-linear-to-r from-gold to-dark-gold text-black-custom rounded-lg font-semibold shadow hover:shadow-md transition active:scale-95 inline-flex items-center"
                >
                  <FiShoppingCart className="mr-2 w-4 h-4" />
                  Start Shopping
                </Link>
              </div>
            )}
          </>
        )}

        {/* Review Modal */}
        <div
          className={`modal ${reviewModal ? "modal-open" : ""} backdrop-blur-sm`}
        >
          <div className="modal-box relative max-w-lg w-full bg-black-custom shadow-2xl p-0 overflow-hidden">
            {/* Modal Header */}
            <div className="bg-linear-to-r from-gold to-dark-gold text-black-custom p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 bg-black-custom/20 backdrop-blur-sm rounded-lg flex items-center justify-center shrink-0">
                    <FiStar className="w-4 h-4 text-black-custom fill-black-custom" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-sm sm:text-base font-bold truncate">
                      Write a Review
                    </h2>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:bg-black-custom/20 transition-colors"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 space-y-4 overflow-x-hidden">
              <div className="bg-dark-gray-custom rounded-lg p-2.5 sm:p-3 border border-dark-gold flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gold truncate">
                    Order #{selectedOrder?._id?.slice(-8)}
                  </p>
                  <p className="text-[10px] text-light-silver font-medium">
                    {selectedOrder?.products?.length || 0} items • ৳
                    {selectedOrder?.totalAmount}
                  </p>
                </div>
                <div className="w-8 h-8 bg-black-custom rounded-lg flex items-center justify-center shrink-0 shadow-sm border border-dark-gold">
                  <FiPackage className="w-4 h-4 text-gold" />
                </div>
              </div>

              <div className="space-y-4">
                {/* Product Selection */}
                {selectedOrder?.products?.length > 1 && (
                  <div className="form-control">
                    <label className="label pt-0 px-1">
                      <span className="label-text font-bold text-light-silver flex items-center text-[10px] sm:text-xs uppercase tracking-wider">
                        <FiShoppingCart className="w-3 h-3 mr-2" />
                        Select Product
                      </span>
                    </label>
                    <select
                      value={reviewData.productId}
                      onChange={(e) =>
                        setReviewData({
                          ...reviewData,
                          productId: e.target.value,
                        })
                      }
                      className="select select-bordered w-full h-9 min-h-0 text-xs border-2 focus:border-gold rounded-lg bg-dark-gray-custom/50 text-light-silver"
                    >
                      {selectedOrder.products.map((product, index) => (
                        <option
                          key={product._id || index}
                          value={product._id || index}
                        >
                          {product.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Star Rating */}
                <div className="form-control">
                  <label className="label px-1">
                    <span className="label-text font-bold text-light-silver flex items-center text-[10px] sm:text-xs uppercase tracking-wider">
                      <FiStar className="w-3 h-3 mr-2" />
                      Your Rating
                    </span>
                  </label>
                  <div className="cursor-pointer bg-dark-gray-custom/50 rounded-xl p-3 sm:p-4 border-2 border-dark-gold hover:border-gold transition-all duration-300 text-center">
                    <StarRating
                      rating={reviewData.rating}
                      onRatingChange={(rating) =>
                        setReviewData({ ...reviewData, rating })
                      }
                    />
                    <p className="text-[10px] sm:text-xs mt-2 text-light-silver">
                      {reviewData.rating === 0
                        ? "Select stars"
                        : `${reviewData.rating} star${reviewData.rating > 1 ? "s" : ""} - Selected`}
                    </p>
                  </div>
                </div>

                {/* Review Comment */}
                <div className="form-control">
                  <label className="label px-1">
                    <span className="label-text font-bold text-light-silver flex items-center text-[10px] sm:text-xs uppercase tracking-wider">
                      <FiSend className="w-3 h-3 mr-2" />
                      Your Review
                    </span>
                  </label>
                  <textarea
                    value={reviewData.comment}
                    onChange={(e) =>
                      setReviewData({ ...reviewData, comment: e.target.value })
                    }
                    placeholder="Tell us about your experience..."
                    className="textarea textarea-bordered h-20 sm:h-24 resize-none border-2 border-dark-gold focus:border-gold rounded-xl text-xs leading-relaxed p-3 bg-dark-gray-custom/50 text-light-silver"
                    maxLength={500}
                  />
                  <div className="flex items-center justify-between mt-2 px-1">
                    <span className="text-xs text-light-silver flex items-center justify-between">
                      💡 Be specific and helpful
                    </span>
                    <span className="text-xs font-medium text-dark-gray-custom0">
                      {reviewData.comment.length}/500
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 bg-dark-gray-custom/80 border-t border-dark-gold flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleCloseModal}
                className="order-2 sm:order-1 flex-1 py-2 text-xs font-bold text-light-silver hover:text-gold rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                disabled={
                  submittingReview ||
                  !reviewData.rating ||
                  !reviewData.comment.trim()
                }
                className="order-1 sm:order-2 flex-2 py-2 bg-linear-to-r from-gold to-dark-gold text-black-custom rounded-lg font-medium shadow-sm hover:shadow-md transition-all text-xs flex items-center justify-center gap-2"
              >
                {submittingReview ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-dark-gold/30 border-t-white rounded-full animate-spin"></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FiSend className="w-3.5 h-3.5" />
                    Submit Review
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
