"use client";

import React, { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import useAxios from "@/hooks/useAxios";
import useAuth from "@/hooks/useAuth";
import { toast, confirmAction, showBusy, closeBusy } from "@/components/ui/notify";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";
import Link from "next/link";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({
    rating: 0,
    comment: "",
  });
  const axiosInstance = useAxios();
  const { user } = useAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/reviews?email=${user?.email}`);
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast.error("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchReviews();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleDeleteReview = async (reviewId) => {
    const confirmed = await confirmAction({
      title: "Delete this review?",
      description: "This review will be permanently deleted.",
      confirmText: "Yes, delete it",
      cancelText: "Keep it",
      tone: "danger",
    });

    if (!confirmed) return;

    try {
      showBusy("Deleting...");
      await axiosInstance.delete(`/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((review) => review._id !== reviewId));
      closeBusy();
      toast.success("Review deleted", {
        description: "It has been removed from your profile.",
      });
    } catch (error) {
      console.error("Error deleting review:", error);
      closeBusy();
      toast.error("Could not delete review");
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setEditData({
      rating: review.rating,
      comment: review.comment,
    });
    setEditModal(true);
  };

  const handleUpdateReview = async () => {
    if (!editData.rating || !editData.comment.trim()) {
      toast.error("Please provide both rating and comment");
      return;
    }
    try {
      axiosInstance.patch(`/reviews/${editingReview._id}`, {
        rating: editData.rating,
        comment: editData.comment,
      });
      toast.success("Review updated successfully");
      setReviews(
        reviews.map((review) =>
          review._id === editingReview._id
            ? { ...review, rating: editData.rating, comment: editData.comment }
            : review,
        ),
      );
      setEditModal(false);
      setEditingReview(null);
      setEditData({ rating: 0, comment: "" });
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review");
    }
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`${i <= rating ? "text-yellow-400" : "text-dark-gold"} ${interactive ? "cursor-pointer hover:text-yellow-500" : ""}`}
          onClick={interactive ? () => onRatingChange(i) : undefined}
        >
          ★
        </span>,
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 lg:p-8 bg-dark-gray-custom min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gold mb-2">My Reviews</h1>
        <p className="text-light-silver">Manage your product reviews and ratings</p>
      </div>

      {loading ? (
        <Loader size="large" text="Loading your reviews..." />
      ) : (
        <>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-black-custom border border-dark-gold rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gold">
                        {review.productName}
                      </h3>
                    </div>

                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-light-silver">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>

                    <p className="text-light-silver mb-4">{review.comment}</p>

                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleEditReview(review)}
                        className="flex items-center text-gold hover:text-dark-gold font-medium text-sm transition-colors"
                      >
                        <FiEdit2 className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="flex items-center text-accent-red hover:text-accent-red/80 font-medium text-sm transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {reviews.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-dark-gray-custom rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl"><FaRegStar /></span>
              </div>
              <h3 className="text-lg font-medium text-gold mb-2">
                No reviews yet
              </h3>
              <p className="text-light-silver mb-6">
                You haven't written any product reviews yet.
              </p>
              <Link href="/all-clothes" className="px-6 py-2 bg-linear-to-r from-gold to-dark-gold text-black-custom rounded-lg hover:from-dark-gold hover:to-gold transition-colors">
                Browse Products
              </Link>
            </div>
          )}

          {/* Edit Modal */}
          {editModal && (
            <div className="modal modal-open">
              <div className="modal-box relative max-w-lg w-full bg-black-custom shadow-2xl">
                {/* Modal Header */}
                <div className="bg-linear-to-r from-gold to-dark-gold text-black-custom p-5 rounded-t-2xl -m-5 mb-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-black-custom/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <FiEdit2 className="w-5 h-5 text-black-custom" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Edit Review</h2>
                        <p className="text-light-silver text-xs">
                          Update your review
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setEditModal(false)}
                      className="btn btn-xs btn-circle btn-ghost text-black-custom hover:bg-black-custom/20 border-dark-gold/20"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="space-y-4">
                  {/* Product Info */}
                  <div className="bg-dark-gray-custom rounded-lg p-3">
                    <p className="text-sm font-medium text-light-silver">Product</p>
                    <p className="text-base text-gold">
                      {editingReview?.productName}
                    </p>
                  </div>

                  {/* Star Rating */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-light-silver text-sm">
                        Your Rating
                      </span>
                    </label>
                    <div className="bg-dark-gray-custom rounded-lg p-4 border-2 border-dark-gold hover:border-gold transition-colors cursor-pointer">
                      {renderStars(editData.rating, true, (rating) =>
                        setEditData({ ...editData, rating }),
                      )}
                      <p className="text-xs text-center mt-3 text-light-silver">
                        {editData.rating === 0
                          ? "Click on stars to rate"
                          : `${editData.rating} star${editData.rating > 1 ? "s" : ""} selected`}
                      </p>
                    </div>
                  </div>

                  {/* Review Comment */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-light-silver text-sm">
                        Your Review
                      </span>
                    </label>
                    <textarea
                      value={editData.comment}
                      onChange={(e) =>
                        setEditData({ ...editData, comment: e.target.value })
                      }
                      placeholder="Update your review..."
                      className="textarea textarea-bordered textarea-sm h-24 resize-none border-2 border-gold text-light-silver bg-dark-gray-custom"
                      maxLength={500}
                    />
                    <label className="label">
                      <span className="label-text-alt text-light-silver flex items-center justify-between text-xs">
                        <span>💡 Be specific and helpful</span>
                        <span className="font-medium">
                          {editData.comment.length}/500
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="modal-action bg-dark-gray-custom -mx-5 -mb-5 p-4 rounded-b-2xl">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditModal(false)}
                      className="btn btn-outline btn-primary btn-sm flex-1"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateReview}
                      disabled={!editData.rating || !editData.comment.trim()}
                      className="btn btn-primary btn-sm flex-1 bg-linear-to-r from-gold to-dark-gold border-0 hover:from-dark-gold hover:to-gold text-black-custom"
                    >
                      Update Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Review Stats */}
          {reviews.length > 0 && (
            <div className="mt-8 bg-dark-gray-custom rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gold mb-4">
                Review Statistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold">
                    {reviews.length}
                  </div>
                  <div className="text-sm text-light-silver">Total Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold">
                    {(
                      reviews.reduce((acc, r) => acc + r.rating, 0) /
                      reviews.length
                    ).toFixed(1)}
                  </div>
                  <div className="text-sm text-light-silver">Average Rating</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyReviews;
