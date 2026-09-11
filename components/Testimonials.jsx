"use client";

import Image from "next/image";

import React from 'react';
import { FiStar } from 'react-icons/fi';

const Testimonials = () => {
const testimonials = [
    {
      id: 1,
      name: "MD. Kamrul Hasan Sujon",
      role: "Regular Customer",
      comment: "সেরা কোয়ালিটি এবং দারুণ সার্ভিস, ঠিক সময়ে ডেলিভারি দেওয়ার জন্য ধন্যবাদ।",
      rating: 5,
      avatar: "https://i.ibb.co.com/YBbbgjGj/2.jpg"
    },
    {
      id: 2,
      name: "MD. Mahabbat Hossain",
      role: "Premium Member",
      comment: "সেরা কাস্টমার সার্ভিস আর দারুণ সব ডিল—সব মিলিয়ে এটিই আমার প্রিয় অনলাইন শপিং সাইট।",
      rating: 5,
      avatar: "https://i.ibb.co.com/WNsQ5jT2/Image-oszbgoszbgoszbgo.png"
    },
    {
      id: 3,
      name: "MD. Ajmain Adib Shakkor",
      role: "First-time Buyer",
      comment: "অসংখ্য পণ্যের কালেকশন এবং অ্যাপের সহজ ইন্টারফেস—সব মিলিয়ে এটি হাইলি রিকমেন্ডেড!",
      rating: 4,
      avatar: "https://i.ibb.co.com/6cyWBHSQ/Image-l29f97l29f97l29f.png"
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FiStar key={i} className={`w-5 h-5 ${i < rating ? 'text-gold fill-gold' : 'text-light-silver'}`} />
      );
    }
    return stars;
  };

  return (
    <section className="py-16 bg-dark-gray-custom">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-semibold mb-4">
                Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gold mb-4">What Our Users Say</h2>
          <p className="text-light-silver max-w-2xl mx-auto">
                Real feedback from our satisfied customers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="works-card bg-black-custom rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-8 border border-dark-gold relative overflow-hidden group" style={{ animationDelay: `${testimonial.id * 120}ms` }}>
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-gold/10 group-hover:text-gold/20 transition-colors">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                </svg>
              </div>
              
              {/* Rating */}
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              {/* Comment */}
              <p className="text-light-silver italic leading-relaxed mb-6 text-sm">"{testimonial.comment}"</p>
              
              {/* User Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-dark-gold">
                <div className="relative">
                  <Image width={500} height={500} unoptimized 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-gold"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                    <FiStar className="w-3 h-3 text-black-custom fill-black-custom" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gold">{testimonial.name}</h3>
                  <p className="text-light-silver text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
