"use client";

import React from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiShoppingBag,
  FiUsers,
  FiAward,
  FiTruck,
  FiHeadphones,
  FiHeart,
  FiTarget,
  FiTrendingUp,
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiCheckCircle,
  FiStar,
  FiShield,
  FiGlobe,
} from "react-icons/fi";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-dark-gray-custom py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center mb-6 transition bg-linear-to-r from-gold to-dark-gold text-black-custom rounded-lg p-2"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gold mb-2">
            About AS EVERYTHING SHOP
          </h1>
          <p className="text-lg text-light-silver max-w-3xl">
            আপনার ফ্যাশন ও আস্থার নির্ভরযোগ্য ঠিকানা। অনলাইন ও অফলাইনে মানসম্মত
            পোশাক এবং আধুনিক লাইফস্টাইল পণ্যের নিশ্চয়তা।
          </p>
        </div>

        <div className="bg-black-custom rounded-lg shadow-sm border border-dark-gold p-8 space-y-12">
          {/* Story */}
          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4 flex items-center">
              <FiGlobe className="mr-3 h-6 w-6 text-gold" />
              অনলাইন ও অফলাইনের অনন্য সমন্বয়
            </h2>
            <p className="text-light-silver leading-relaxed">
              আধুনিক কেনাকাটায় বিশ্বাসযোগ্যতা ও স্বাচ্ছন্দ্য নিশ্চিত করতে SM
              সহজ Buy আপনাকে দিচ্ছে অনলাইন সুবিধা ও অফলাইন শোরুমের বাস্তব
              অভিজ্ঞতা। ঘরে বসে অর্ডার করুন অথবা সরাসরি শোরুমে এসে ট্রায়াল দিয়ে
              নিশ্চিন্তে কেনাকাটা করুন।
            </p>
          </section>

          {/* Mission & Vision */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-dark-gray-custom rounded-lg p-6 border border-dark-gold">
              <h3 className="text-xl font-semibold text-gold mb-4 flex items-center">
                <FiTarget className="mr-3 h-6 w-6 text-gold" />
                আমাদের মিশন
              </h3>
              <p className="text-light-silver leading-relaxed">
                নীলফামারী শহরের ভেতরে প্রথম ৪ মাস ফ্রি হোম ডেলিভারি এবং ন্যূনতম
                ১২৫০ টাকার অর্ডারে নিশ্চিত উপহার দিয়ে গ্রাহকের সন্তুষ্টি নিশ্চিত
                করা।
              </p>
            </div>

            <div className="bg-dark-gray-custom rounded-lg p-6 border border-dark-gold">
              <h3 className="text-xl font-semibold text-gold mb-4 flex items-center">
                <FiTrendingUp className="mr-3 h-6 w-6 text-dark-gold" />
                আমাদের ভিশন
              </h3>
              <p className="text-light-silver leading-relaxed">
                অনলাইনের স্বাচ্ছন্দ্য ও অফলাইনের বিশ্বাসযোগ্যতাকে একত্র করে
                বাংলাদেশের অন্যতম নির্ভরযোগ্য ফ্যাশন ব্র্যান্ড হওয়া।
              </p>
            </div>
          </section>

          {/* Core Values */}
          <section>
            <h2 className="text-2xl font-semibold text-gold mb-6 flex items-center">
              <FiHeart className="mr-3 h-6 w-6 text-gold" />
              আমাদের মূল নীতিসমূহ
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <FiHeart />,
                  title: "কাস্টমার সবার আগে",
                  color: "gold",
                  text: "প্রতিটি সিদ্ধান্ত গ্রাহকের সন্তুষ্টিকে গুরুত্ব দিয়ে।",
                },
                {
                  icon: <FiAward />,
                  title: "সেরা মান",
                  color: "dark-gold",
                  text: "মানের সাথে কোনো আপস নয়।",
                },
                {
                  icon: <FiTruck />,
                  title: "নির্ভরযোগ্যতা",
                  color: "gold",
                  text: "সঠিক পণ্য, সঠিক সময়ে।",
                },
                {
                  icon: <FiUsers />,
                  title: "দীর্ঘ সম্পর্ক",
                  color: "dark-gold",
                  text: "গ্রাহকদের সাথে পারিবারিক সম্পর্ক।",
                },
              ].map((item, i) => (
                <div key={i} className="bg-dark-gray-custom rounded-lg p-6 text-center border border-dark-gold">
                  <div
                    className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center bg-${item.color}/10 text-${item.color} text-xl`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-gold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-light-silver text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="bg-dark-gray-custom rounded-lg p-8 border border-dark-gold">
            <h2 className="text-2xl font-semibold text-gold mb-6 flex items-center">
              <FiShield className="mr-3 h-6 w-6 text-gold" />
              কেন আমাদের পছন্দ করবেন?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <FiShoppingBag className="mx-auto text-gold w-10 h-10 mb-4" />
                <h3 className="font-semibold text-gold mb-2">
                  বিশাল কালেকশন
                </h3>
                <p className="text-light-silver">
                  উৎসব ও দৈনন্দিন ব্যবহারের জন্য বিশাল কালেকশন।
                </p>
              </div>

              <div className="text-center">
                <FiTruck className="mx-auto text-dark-gold w-10 h-10 mb-4" />
                <h3 className="font-semibold text-gold mb-2">
                  দ্রুত ডেলিভারি
                </h3>
                <p className="text-light-silver">
                  ৩–৫ কার্যদিবসের মধ্যে পণ্য পৌঁছে দেওয়া।
                </p>
              </div>

              <div className="text-center">
                <FiHeadphones className="mx-auto text-gold w-10 h-10 mb-4" />
                <h3 className="font-semibold text-gold mb-2">
                  ২৪/৭ সাপোর্ট
                </h3>
                <p className="text-light-silver">
                  যেকোনো প্রয়োজনে আমাদের টিম আপনার পাশে।
                </p>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section>
            <h2 className="text-2xl font-semibold text-gold mb-6 flex items-center">
              <FiStar className="mr-3 h-6 w-6 text-gold" />
              আমাদের অর্জন
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl font-bold bg-linear-to-r from-gold to-dark-gold bg-clip-text text-transparent">10K+</p>
                <p className="text-light-silver">সন্তুষ্ট গ্রাহক</p>
              </div>
              <div>
                <p className="text-3xl font-bold bg-linear-to-r from-gold to-dark-gold bg-clip-text text-transparent">500+</p>
                <p className="text-light-silver">পণ্য</p>
              </div>
              <div>
                <p className="text-3xl font-bold bg-linear-to-r from-gold to-dark-gold bg-clip-text text-transparent">50+</p>
                <p className="text-light-silver">ক্যাটাগরি</p>
              </div>
              <div>
                <p className="text-3xl font-bold bg-linear-to-r from-gold to-dark-gold bg-clip-text text-transparent">4.8★</p>
                <p className="text-light-silver">রেটিং</p>
              </div>
            </div>
          </section>

          {/* Outlet Information */}
          {/* <section>
            <h2 className="text-2xl font-semibold text-metallic-silver mb-6 flex items-center">
              <FiMapPin className="mr-3 h-6 w-6 text-gold" />
              আমাদের আউটলেট
            </h2>
            <div className="space-y-4 text-light-silver">
              <p className="mb-4">
                "অনলাইনের স্বাচ্ছন্দ্য আর সরাসরি দেখে কেনার নিশ্চয়তা—সবই
                পাচ্ছেন আমাদের আউটলেটে।"
              </p>
              <div className="bg-dark-gray-custom p-4 rounded-lg space-y-3">
                <p><strong>শোরুমের ঠিকানা:</strong> AS EVERYTHING SHOP Rafi Taders পাঁচমাথা মোড়, নীলফামারী সদর</p>
                <p><strong>সরাসরি কেনাকাটার সুবিধা:</strong> আমাদের শোরুমে এসে আপনি প্রতিটি পোশাকের কাপড় সরাসরি স্পর্শ করে মান যাচাই করতে পারবেন এবং ট্রায়াল দিয়ে নিজের সাইজ নিশ্চিত করে কিনতে পারবেন।</p>
                <p><strong>সময়সূচী:</strong> প্রতিদিন সকাল ১০:০০ টা থেকে রাত ১২:০০ টা পর্যন্ত আমাদের শোরুম খোলা থাকে।</p>
                <p><strong>যোগাযোগ:</strong> 01731965985</p>
                <p><strong>গুগল ম্যাপ লোকেশন:</strong> AS EVERYTHING SHOP Rafi Taders পাঁচমাথা মোড়, নীলফামারী সদর</p>
              </div>
            </div>
          </section> */}

          {/* Team Information */}
          <section>
            {/* <h2 className="text-2xl font-semibold text-metallic-silver mb-6 flex items-center">
              <FiUsers className="mr-3 h-6 w-6 text-gold" />
              আমাদের অনলাইন এবং অফলাইন সেবা টিম
            </h2> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-dark-gray-custom rounded-lg p-6 border border-dark-gold">
                <h3 className="text-xl font-semibold text-gold mb-4">
                  অনলাইন সাপোর্ট/অপারেশনের জন্য
                </h3>
                <div className="space-y-2 text-light-silver">
                  <p>
                    <strong>নাম:</strong> মোঃ আহসানুল হক হামিম
                  </p>
                  <p>
                    <strong>পদবী:</strong> প্রতিষ্ঠাতা
                  </p>
                  <p>
                    <strong>মোবাইল:</strong> 01834189086
                  </p>
                  <p className="text-sm">
                    প্রতিটি অর্ডার নির্ভুলভাবে প্রসেস করা এবং দ্রুততম সময়ে
                    গ্রাহকের হাতে পণ্য পৌঁছে দেওয়া নিশ্চিত করাই আমার কাজ।
                  </p>
                </div>
              </div>
              {/* 
              <div className="bg-dark-gray-custom rounded-lg p-6">
                <h3 className="text-xl font-semibold text-metallic-silver mb-4">অফলাইন সেবাই নিয়োজিত</h3>
                <div className="space-y-2 text-light-silver">
                  <p><strong>নাম:</strong> মোঃ মোসকুদের রহমান</p>
                  <p><strong>পদবী:</strong> প্রতিষ্ঠাতা</p>
                  <p><strong>মোবাইল:</strong> 01731965985</p>
                </div>
              </div> */}
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gold mb-6 flex items-center">
              <FiMail className="mr-3 h-6 w-6 text-gold" />
              যোগাযোগের তথ্য
            </h2>
            <div className="bg-dark-gray-custom p-4 rounded-lg border border-dark-gold">
              <p className="text-light-silver">
                <strong className="text-gold">Email:</strong> aseverythingshop48@gmail.com
              </p>
              <p className="text-light-silver">
                <strong className="text-gold">Phone:</strong> +8801791258144
              </p>
              <p className="text-light-silver">
                <strong className="text-gold">Address:</strong> Nakhargonj, Nageswari, Kurigram
                Rangpur
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-light-silver">
          <p>
            "AS EVERYTHING SHOP-এর সাথে থাকার জন্য ধন্যবাদ। আমরা আপনার আস্থার
            মর্যাদা দিতে প্রতিশ্রুতিবদ্ধ এবং সর্বোত্তম সেবা প্রদানে নিবেদিত।"
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
