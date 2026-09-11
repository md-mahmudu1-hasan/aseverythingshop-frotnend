"use client";

import Image from "next/image";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "@/components/ui/notify";
import useAxios from "@/hooks/useAxios";
import Loader from "@/components/Loader";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import useCart from "@/hooks/useCart";
import useAuth from "@/hooks/useAuth";
import { FaRegStar } from "react-icons/fa";
import { isFreeDelivery } from "@/hooks/delivery";

const MensClothesDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { id } = useParams();
  const [clothesdetails, setClothesdetails] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const { user } = useAuth();

  const axiosInstance = useAxios();
  const router = useRouter();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 relative">
          ★
        </span>,
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-dark-gold">
          ★
        </span>,
      );
    }

    return stars;
  };

  const handleAddToCart = () => {
    if (quantity > clothesdetails.stock) {
      toast.error("Stock limit exceeded");
      return;
    }

    addToCart(clothesdetails, quantity);
    toast.success("Added to Cart");
  };

  const openSlider = (index) => {
    setSelectedImageIndex(index);
    setIsSliderOpen(true);
  };

  const closeSlider = () => {
    setIsSliderOpen(false);
  };

  const nextImage = () => {
    if (clothesdetails?.images) {
      setSelectedImageIndex(
        (prev) => (prev + 1) % clothesdetails.images.length,
      );
    }
  };

  const prevImage = () => {
    if (clothesdetails?.images) {
      setSelectedImageIndex(
        (prev) =>
          (prev - 1 + clothesdetails.images.length) %
          clothesdetails.images.length,
      );
    }
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    axiosInstance
      .get(`/mensclothes/${id}`)
      .then((res) => {
        setClothesdetails(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setReviewsLoading(true);
        const res = await axiosInstance.get(`/reviews`);
        if (res.data) {
          const needdata = res.data.filter((item) => item.productid == id);
          setReviews(needdata);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setReviewsLoading(false);
      }
    };

    if (id) {
      fetchReviews();
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-dark-gray-custom py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link
            href="/"
            className="text-gold hover:text-dark-gold transition-colors"
          >
            Home
          </Link>
          <span className="text-light-silver">/</span>
          <Link
            href="/all-clothes"
            className="text-gold hover:text-dark-gold transition-colors"
          >
            All Clothes
          </Link>
          <span className="text-light-silver">/</span>
          <span className="text-gold font-medium">
            {clothesdetails.title}
          </span>
        </nav>

        {/* Product Details */}
        <div className="bg-black-custom rounded-xl shadow-lg p-4 sm:p-8 mb-8 border border-dark-gold">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg bg-dark-gray-custom relative group">
                <Image width={500} height={500} unoptimized
                  src={clothesdetails.images[selectedImageIndex]}
                  alt={clothesdetails.title}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-105 cursor-pointer rounded-lg"
                  onClick={() => openSlider(selectedImageIndex)}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {clothesdetails.images?.map((image, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 overflow-hidden rounded-lg border-2 cursor-pointer transition-all duration-200 shrink-0 ${
                      selectedImageIndex === index
                        ? "border-gold shadow-lg scale-105"
                        : "border-dark-gold hover:border-gold hover:scale-105"
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <Image width={500} height={500} unoptimized
                      src={image}
                      alt={`${clothesdetails.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gold mb-3">
                  {clothesdetails.title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-dark-gray-custom text-gold px-3 py-1 rounded-full text-sm font-medium">
                    Brand: {clothesdetails.brand}
                  </span>
                  <span className="bg-dark-gray-custom text-metallic-silver px-3 py-1 rounded-full text-sm font-medium">
                    Category: {clothesdetails.category}
                  </span>
                </div>
                {isFreeDelivery(clothesdetails) && (
                  <span className="rounded-full border border-gold/60 bg-gold/10 px-3 py-1 text-sm font-medium text-gold">Free delivery</span>
                )}
                {!isFreeDelivery(clothesdetails) && <span className="rounded-full border border-dark-gold bg-dark-gray-custom px-3 py-1 text-sm font-medium text-light-silver">Cash on delivery</span>}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex">
                  {renderStars(clothesdetails.ratings)}
                </div>
                <span className="text-light-silver font-medium">
                  {clothesdetails.ratings} out of 5
                </span>
                {/* <span className="text-dark-gray-custom0 text-sm">
                  ({clothesdetails.reviews.length} reviews)
                </span> */}
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <div className="text-4xl font-bold bg-linear-to-r from-gold to-dark-gold bg-clip-text text-transparent">
                    ৳{clothesdetails.after_discount_price}
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      clothesdetails.stock > 10
                        ? "bg-dark-gray-custom text-gold"
                        : clothesdetails.stock > 0
                          ? "bg-dark-gray-custom text-metallic-silver"
                          : "bg-dark-gray-custom text-accent-red"
                    }`}
                  >
                    {clothesdetails.stock > 0
                      ? `${clothesdetails.stock} in stock`
                      : "Out of Stock"}
                  </div>
                </div>
                {clothesdetails.stock > 0 && clothesdetails.stock <= 5 && (
                  <div className="text-accent-red text-sm font-medium flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    Only {clothesdetails.stock} left - Order soon!
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gold mb-2">
                  Description
                </h3>
                <p className="text-light-silver leading-relaxed">
                  {clothesdetails.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="quantity"
                    className="text-light-silver font-medium"
                  >
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-dark-gold rounded-lg px-3 py-2 bg-dark-gray-custom text-gold focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    {[...Array(Math.min(10, clothesdetails.stock))].map(
                      (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ),
                    )}
                  </select>
                </div>
                <div className="flex flex-col gap-4 md:flex-row">
                  {/* button1 */}
                  <button
                    onClick={handleAddToCart}
                    disabled={clothesdetails.stock === 0}
                    className={`flex-1 sm:flex-none px-8 py-3 rounded-lg font-semibold transition-all ${
                      clothesdetails.stock > 0
                        ? "bg-linear-to-r from-gold to-dark-gold text-black-custom hover:from-dark-gold hover:to-gold hover:-translate-y-1 shadow-lg"
                        : "bg-dark-gray-custom text-light-silver cursor-not-allowed border border-dark-gold"
                    }`}
                  >
                    {clothesdetails.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>

                  {/* button2 */}

                  <button
                    onClick={() => {
                      if (quantity > clothesdetails.stock) {
                        toast.error("Stock limit exceeded");
                        return;
                      }

                      addToCart(clothesdetails, quantity);
                      toast.success("Added to Cart");
                      router.push("/cart");
                    }}
                    disabled={clothesdetails.stock === 0}
                    className={`flex-1 sm:flex-none px-8 py-3 rounded-lg font-semibold transition-all ${
                      clothesdetails.stock > 0
                        ? "bg-black-custom/50 hover:bg-black-custom/70 hover:-translate-y-1 shadow-lg"
                        : "bg-dark-gray-custom text-light-silver cursor-not-allowed border border-dark-gold"
                    }`}
                  >
                    {clothesdetails.stock > 0 ? "Buy Now" : "Out of Stock"}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-metallic-silver mb-3">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {clothesdetails.key_features.map((data, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-gold font-bold">✓</span>
                      <span className="text-light-silver">{data}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-black-custom rounded-xl shadow-lg p-4 sm:p-8 border border-dark-gold">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <h2 className="text-2xl font-bold text-gold">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-gold to-dark-gold bg-clip-text text-transparent">
                  {reviews.length > 0
                    ? (
                        reviews.reduce((acc, r) => acc + r.rating, 0) /
                        reviews.length
                      ).toFixed(1)
                    : "0.0"}
                </div>
                <div className="text-xs sm:text-sm text-light-silver font-medium">
                  Average Rating
                </div>
              </div>
              <div className="w-px h-10 bg-dark-gold"></div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-metallic-silver">
                  {reviews.length}
                </div>
                <div className="text-xs sm:text-sm text-light-silver font-medium">
                  Total Reviews
                </div>
              </div>
            </div>
          </div>

          {reviewsLoading ? (
            <div className="flex justify-center py-12">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-dark-gold border-t-gold border-r-dark-gold rounded-full animate-spin mb-4"></div>
                <p className="text-light-silver font-medium">
                  Loading amazing reviews...
                </p>
              </div>
            </div>
          ) : (
            <>
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div
                      key={review._id}
                      className="border border-dark-gold rounded-2xl p-4 sm:p-6 bg-linear-to-br from-black-custom to-dark-gray-custom/50 hover:shadow-xl transition-all duration-300 hover:border-gold relative overflow-hidden group"
                    >
                      {/* Review Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-gold to-dark-gold rounded-full flex items-center justify-center text-black-custom font-bold shadow-md text-sm sm:text-base">
                              {review.userName?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                            <div>
                              <h4 className="text-base sm:text-lg font-bold text-gold leading-tight">
                                {review.userName}
                              </h4>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                                <p className="text-xs text-gold font-semibold uppercase tracking-wider">
                                  Verified Buyer
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-xl sm:text-2xl transition-all duration-200 ${
                                    i < review.rating
                                      ? "text-yellow-400 drop-shadow-sm"
                                      : "text-dark-gold/40"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="ml-1 sm:ml-2 px-2 py-0.5 bg-dark-gray-custom text-gold rounded-full text-xs sm:text-sm font-bold">
                              {review.rating}.0
                            </span>
                          </div>
                        </div>
                        <div className="text-xs sm:text-sm text-light-silver font-medium bg-dark-gray-custom/50 px-3 py-1 rounded-full self-start sm:self-auto">
                          {new Date(review.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </div>
                      </div>

                      {/* Review Content */}
                      <div className="relative pl-4 border-l-2 sm:border-l-4 border-gold/30 group-hover:border-gold transition-colors duration-300">
                        <p className="text-light-silver leading-relaxed text-base sm:text-lg">
                          {review.comment}
                        </p>
                      </div>

                      {/* Review Index Badge */}
                      <div className="absolute -top-1 -right-1 w-12 h-12 bg-dark-gray-custom flex items-center justify-center rounded-bl-3xl text-light-silver text-xl font-black group-hover:text-gold transition-colors duration-300 z-0">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-32 h-32 bg-dark-gray-custom rounded-full flex items-center justify-center mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-linear-to-br from-dark-gray-custom to-black-custom rounded-full animate-pulse"></div>
                    <span className="text-6xl text-light-silver relative z-10">
                      <FaRegStar />
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gold mb-3">
                    Be the First to Review!
                  </h3>
                  <p className="text-light-silver mb-8 max-w-md mx-auto">
                    Share your experience with this product and help other
                    customers make informed decisions.
                  </p>
                  <button
                    onClick={() => {
                      if (user) {
                        router.push("/profile");
                      } else {
                        router.push("/login");
                        toast.error("Please login for add review");
                      }
                    }}
                    className="px-8 py-3 bg-linear-to-r from-gold to-dark-gold text-black-custom rounded-lg hover:from-dark-gold hover:to-gold font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                  >
                    <span className="flex items-center gap-2">
                      Write a Review
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Image Slider Modal */}
        {isSliderOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="relative max-w-4xl max-h-[90vh] w-full bg-black-custom rounded-xl shadow-2xl overflow-hidden border border-dark-gold">
              {/* Close Button */}
              <button
                onClick={closeSlider}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-dark-gray-custom/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gold hover:text-dark-gold hover:bg-black-custom transition-all duration-200 shadow-lg"
              >
                <AiOutlineClose size={20} />
              </button>

              {/* Slider Content */}
              <div className="flex flex-col lg:flex-row h-full">
                {/* Main Image */}
                <div className="flex-1 flex items-center justify-center bg-dark-gray-custom p-8">
                  <Image width={500} height={500} unoptimized
                    src={clothesdetails.images[selectedImageIndex]}
                    alt={`${clothesdetails.title} - Image ${selectedImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Thumbnails Sidebar */}
                <div className="lg:w-32 bg-black-custom border-t lg:border-t-0 lg:border-l border-dark-gold p-4">
                  <div className="space-y-3 max-h-[60vh] lg:max-h-[70vh] overflow-y-auto">
                    {clothesdetails.images?.map((image, index) => (
                      <div
                        key={index}
                        className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          selectedImageIndex === index
                            ? "border-gold shadow-lg"
                            : "border-dark-gold hover:border-gold"
                        }`}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <Image width={500} height={500} unoptimized
                          src={image}
                          alt={`${clothesdetails.title} - Thumbnail ${index + 1}`}
                          className="w-full h-20 object-cover"
                        />
                        {selectedImageIndex === index && (
                          <div className="absolute inset-0 bg-gold/20 flex items-center justify-center">
                            <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center text-black-custom">
                              <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414l4 4a1 1 0 001.414 0l8-8z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-dark-gray-custom/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gold hover:text-dark-gold hover:bg-black-custom transition-all duration-200 shadow-lg"
              >
                <AiOutlineLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-dark-gray-custom/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gold hover:text-dark-gold hover:bg-black-custom transition-all duration-200 shadow-lg"
              >
                <AiOutlineRight size={20} />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                {selectedImageIndex + 1} / {clothesdetails.images?.length || 0}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image Slider Modal */}
      {isSliderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full bg-black-custom rounded-xl shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeSlider}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black-custom/90 backdrop-blur-sm rounded-full flex items-center justify-center text-light-silver hover:text-metallic-silver hover:bg-black-custom transition-all duration-200 shadow-lg"
            >
              <AiOutlineClose size={20} />
            </button>

            {/* Slider Content */}
            <div className="flex flex-col lg:flex-row h-full">
              {/* Main Image */}
              <div className="flex-1 flex items-center justify-center bg-dark-gray-custom p-8">
                <Image width={500} height={500} unoptimized
                  src={clothesdetails.images[selectedImageIndex]}
                  alt={`${clothesdetails.title} - Image ${selectedImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Thumbnails Sidebar */}
              <div className="lg:w-32 bg-black-custom border-t lg:border-t-0 lg:border-l border-dark-gold/40 p-4">
                <div className="space-y-3 max-h-[60vh] lg:max-h-[70vh] overflow-y-auto">
                  {clothesdetails.images?.map((image, index) => (
                    <div
                      key={index}
                      className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        selectedImageIndex === index
                          ? "border-gold shadow-lg"
                          : "border-dark-gold/40 hover:border-gold"
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Image width={500} height={500} unoptimized
                        src={image}
                        alt={`${clothesdetails.title} - Thumbnail ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                      {selectedImageIndex === index && (
                        <div className="absolute inset-0 bg-gold/20 flex items-center justify-center">
                          <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414l4 4a1 1 0 001.414 0l8-8z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black-custom/90 backdrop-blur-sm rounded-full flex items-center justify-center text-light-silver hover:text-metallic-silver hover:bg-black-custom transition-all duration-200 shadow-lg"
            >
              <AiOutlineLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black-custom/90 backdrop-blur-sm rounded-full flex items-center justify-center text-light-silver hover:text-metallic-silver hover:bg-black-custom transition-all duration-200 shadow-lg"
            >
              <AiOutlineRight size={20} />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
              {selectedImageIndex + 1} / {clothesdetails.images?.length || 0}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MensClothesDetails;
