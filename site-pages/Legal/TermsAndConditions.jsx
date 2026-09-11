"use client";

import React from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiUser,
  FiMail,
  FiLock,
} from "react-icons/fi";

const TermsAndConditions = () => {
  const lastUpdated = "February 1, 2026";

  return (
    <div className="min-h-screen bg-dark-gray-custom py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center mb-6 transition bg-linear-to-r from-gold to-dark-gold text-black-custom rounded-lg p-2"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gold mb-2">
            Terms & Conditions ( শর্তাবলী )
          </h1>
          <p className="text-light-silver">Last updated: {lastUpdated}</p>
        </div>
        <div className="bg-black-custom rounded-lg shadow-sm border border-dark-gold p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4 flex items-center">
              <FiShield className="mr-3 h-6 w-6 text-gold" />
              সূচনা (Introduction)
            </h2>
            <p className="text-light-silver leading-relaxed">
              AS EVERYTHING SHOP-এ আপনাকে স্বাগতম। এই শর্তাবলি আমাদের ই-কমার্স
              প্ল্যাটফর্ম এবং পরিষেবাগুলোর ব্যবহার নিয়ন্ত্রণ করে। ShopHub
              অ্যাক্সেস বা ব্যবহার করার মাধ্যমে, আপনি এই শর্তাবলি মেনে চলতে
              সম্মত হচ্ছেন। আপনি যদি এই শর্তাবলির কোনো অংশের সাথে একমত না হন,
              তবে অনুগ্রহ করে আমাদের পরিষেবাগুলো ব্যবহার করবেন না।
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4 flex items-center">
              <FiUser className="mr-3 h-6 w-6 text-gold" />
              ইউজার অ্যাকাউন্ট (User Accounts)
            </h2>
            <div className="space-y-3 text-light-silver">
              <p>
                <strong>১. অ্যাকাউন্ট তৈরি:</strong> অ্যাকাউন্ট তৈরি করার সময়
                আপনাকে অবশ্যই সঠিক এবং সম্পূর্ণ তথ্য প্রদান করতে হবে।
              </p>
              <p>
                <strong>২. অ্যাকাউন্টের নিরাপত্তা:</strong> আপনার অ্যাকাউন্টের
                গোপনীয়তা (পাসওয়ার্ড ও অন্যান্য তথ্য) বজায় রাখার দায়িত্ব আপনার।
              </p>
              <p>
                <strong>৩. অ্যাকাউন্টের দায়বদ্ধতা:</strong> আপনার অ্যাকাউন্টের
                অধীনে পরিচালিত সকল কার্যক্রমের জন্য আপনি নিজেই দায়বদ্ধ থাকবেন।
              </p>
              <p>
                <strong>৪. অ্যাকাউন্ট বাতিলকরণ:</strong> এই শর্তাবলি লঙ্ঘন করলে
                আমরা যেকোনো সময় আপনার অ্যাকাউন্ট স্থগিত বা বাতিল করার অধিকার
                সংরক্ষণ করি।
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4 flex items-center">
              <FiTruck className="mr-3 h-6 w-6 text-gold" />
              পণ্য ও সেবা (Products & Services)
            </h2>
            <div className="space-y-3 text-light-silver">
              <p>
                <strong>১. পণ্যের তথ্য:</strong> আমরা পণ্যের সঠিক বিবরণ, মূল্য
                এবং স্টক বা প্রাপ্যতা নিশ্চিত করার সর্বোচ্চ চেষ্টা করি।
              </p>
              <p>
                <strong>২. মূল্য নির্ধারণ:</strong> পণ্যের দাম যেকোনো সময় নোটিশ
                ছাড়াই পরিবর্তিত হতে পারে। যেকোনো ভুল দাম সংশোধন করার অধিকার আমরা
                সংরক্ষণ করি।
              </p>
              <p>
                <strong>৩. পণ্যের প্রাপ্যতা::</strong> সকল পণ্য স্টকের ওপর
                নির্ভরশীল। আমরা চাইলে একক ব্যক্তির ক্ষেত্রে পণ্য ক্রয়ের পরিমাণ
                বা সংখ্যা সীমিত করতে পারি।
              </p>
              <p>
                <strong>৪. অর্ডার গ্রহণ:</strong> যেকোনো কারণে যেকোনো অর্ডার
                প্রত্যাখ্যান বা বাতিল করার পূর্ণ অধিকার আমাদের রয়েছে।
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4 flex items-center">
              <FiLock className="mr-3 h-6 w-6 text-gold" />
              পেমেন্ট ও বিলিং (Payment & Billing)
            </h2>
            <div className="space-y-3 text-light-silver">
              <p>
                <strong>১. পেমেন্ট পদ্ধতি:</strong> বর্তমানে আমরা শুধুমাত্র
                'ক্যাশ অন ডেলিভারি' (Cash on Delivery) সুবিধা প্রদান করছি। পণ্য
                হাতে পেয়ে চেক করে আপনি মূল্য পরিশোধ করতে পারবেন।
              </p>
              <p>
                <strong>২. পেমেন্ট নিরাপত্তা:</strong> ক্যাশ অন ডেলিভারি
                পদ্ধতিতে কোনো আগাম পেমেন্ট বা ব্যাংক তথ্যের প্রয়োজন নেই, যা
                আপনার কেনাকাটাকে করে তোলে শতভাগ নিরাপদ।
              </p>
              <p>
                <strong>৩. বিলিং:</strong> পণ্য অর্ডার করার সময় আপনাকে কোনো টাকা
                দিতে হবে না। ডেলিভারি সম্পন্ন হওয়ার সময় চালানে উল্লেখিত মূল্যের
                সমপরিমাণ টাকা প্রদান করতে হবে।
              </p>
              <p>
                <strong>৪. অর্ডার যাচাইকরণ:</strong> যেকোনো ভুয়া অর্ডার বা
                জালিয়াতি রোধে আমরা অর্ডার নিশ্চিত করার আগে আপনার মোবাইল নম্বরে
                কল করে ভেরিফিকেশন বা যাচাই করতে পারি।
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4 flex items-center">
              <FiTruck className="mr-3 h-6 w-6 text-gold" />
              শিপিং এবং ডেলিভারি (Shipping & Delivery)
            </h2>
            <div className="space-y-3 text-light-silver">
              <p>
                <strong>১. ডেলিভারি সময়:</strong> অর্ডার নিশ্চিত করার পরবর্তী ৩
                থেকে ৫ কার্যদিবসের মধ্যে আপনার কাঙ্ক্ষিত পণ্যটি পৌঁছে দেওয়া হবে।
              </p>
              <p>
                <strong>২. ডেলিভারি খরচ:</strong> আমাদের বিশেষ অফার হিসেবে
                ওয়েবসাইট লঞ্চের প্রথম ৬ মাস সকল অর্ডারে কোনো ডেলিভারি চার্জ
                প্রযোজ্য হবে না।
              </p>
              <p>
                <strong>৩. পণ্য যাচাইয়ের সুবিধা:</strong> পণ্য হাতে পাওয়ার পর
                ডেলিভারি ম্যানের সামনেই পোশাকটি চেক করে দেখে বুঝে নেওয়ার
                সম্পূর্ণ সুব্যবস্থা রয়েছে।
              </p>
              <p>
                <strong>৪. ডেলিভারি ঝুঁকি:</strong> ডেলিভারি সম্পন্ন হওয়ার আগ
                পর্যন্ত পণ্যের নিরাপত্তার দায়িত্ব আমাদের। তবে গ্রাহক পণ্য গ্রহণ
                করার পর কোনো বাহ্যিক ক্ষতির জন্য কর্তৃপক্ষ দায়ী থাকবে না।
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4 flex items-center">
              <FiRefreshCw className="mr-3 h-6 w-6 text-gold" />
              রিটার্ন এবং রিফান্ড (Returns & Refunds)
            </h2>
            <div className="space-y-3 text-light-silver">
              <p>
                <strong>১. 🛡️ চেক করার সুযোগ:</strong> পণ্য গ্রহণের সময় ডেলিভারি
                ম্যানের সামনেই পণ্যটি যাচাই করুন।
              </p>
              <p>
                <strong>২. 📞 তাৎক্ষণিক রিটার্ন:</strong> যদি পণ্যে কোনো ত্রুটি
                থাকে বা ভুল সাইজ ডেলিভারি হয়, তবে ডেলিভারি ম্যান থাকাকালীনই
                আমাদের সাথে যোগাযোগ করুন এবং রিটার্ন দিন।
              </p>
              <p>
                <strong>৩. ⚠️ সতর্কতা:</strong> ডেলিভারি ম্যান চলে যাওয়ার পর
                কোনো রিটার্ন বা এক্সচেঞ্জ প্রযোজ্য হবে না।
              </p>
              <p>
                <strong>৪. অফেরতযোগ্য পণ্য:</strong> পোশাকের ট্যাগ ছেঁড়া থাকলে
                বা ব্যবহার করা হলে এবং ধোয়া হলে সেই পণ্য রিটার্ন বা এক্সচেঞ্জ
                করা যাবে না।
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">
              মেধা স্বত্ব (Intellectual Property)
            </h2>
            <div className="space-y-3 text-light-silver">
              <p>
                <strong>১. কন্টেন্ট মালিকানা:</strong> AS EVERYTHING SHOP-এর সকল
                কন্টেন্ট, লোগো, ইমেজ এবং টেক্সট, AS EVERYTHING SHOP বা তাদের
                লাইসেন্সকারীদের মালিকানাধীন।
              </p>
              <p>
                <strong>২. ব্যবহার সীমাবদ্ধতা:</strong> আমাদের পূর্ব অনুমতি বা
                লিখিত সম্মতি ছাড়া আপনি আমাদের কোনো কন্টেন্ট ব্যবহার করতে পারবেন
                না।
              </p>
              <p>
                <strong>৩. ট্রেডমার্ক:</strong> AS EVERYTHING SHOP এবং সম্পর্কিত
                চিহ্নগুলি AS EVERYTHING SHOP-এর ট্রেডমার্ক।
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4 flex items-center">
              <FiShield className="mr-3 h-6 w-6 text-gold" />
              গোপনীয়তা নীতি (Privacy Policy)
            </h2>
            <div className="space-y-3 text-light-silver">
              <p>
                আপনার গোপনীয়তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। আপনার ব্যক্তিগত
                তথ্যের ব্যবহার আমাদের গোপনীয়তা নীতি (Privacy Policy) দ্বারা
                নিয়ন্ত্রিত।
              </p>
              <p>
                AS EVERYTHING SHOP ব্যবহার করার মাধ্যমে, আপনি আমাদের গোপনীয়তা নীতিতে
                বর্ণিত তথ্যের সংগ্রহ এবং ব্যবহারের বিষয়ে আপনার সম্মতি প্রদান
                করছেন।
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">
              দায়বদ্ধতার সীমাবদ্ধতা (Limitation of Liability)
            </h2>
            <div className="space-y-3 text-light-silver">
              <p>
                <strong>১. পরোক্ষ ক্ষতি:</strong> আমাদের পরিষেবা ব্যবহারের ফলে
                উদ্ভূত কোনো পরোক্ষ, আনুষঙ্গিক বা বিশেষ ক্ষয়ক্ষতির জন্য SM সহজ
                Buy কর্তৃপক্ষ কোনোভাবেই দায়ী থাকবে না।
              </p>
              <p>
                <strong>২. ক্ষতিপূরণের সীমা:</strong> এই শর্তাবলির অধীনে যেকোনো
                দাবির ক্ষেত্রে আমাদের সর্বোচ্চ দায়বদ্ধতা বা ক্ষতিপূরণের পরিমাণ
                কোনোভাবেই আপনার ক্রয়কৃত সংশ্লিষ্ট পণ্যের মূল্যের বেশি হবে না।
              </p>
            </div>
          </section>
          শর্তাবলি পরিবর্তন {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">
              Changes to Terms
            </h2>
            <div className="space-y-3 text-light-silver">
              <p>
                <strong>১. সংশোধনের অধিকার:</strong> আমরা যেকোনো সময় এই
                শর্তাবলি পরিবর্তন, পরিমার্জন বা সংশোধন করার পূর্ণ অধিকার সংরক্ষণ
                করি।
              </p>
              <p>
                <strong>২. কার্যকারিতা:</strong> সংশোধিত শর্তাবলি আমাদের
                ওয়েবসাইটে প্রকাশ করার সাথে সাথেই তা কার্যকর বলে গণ্য হবে।
              </p>
              <p>
                <strong>৩. সম্মতি:</strong> শর্তাবলি পরিবর্তনের পর আপনার
                ওয়েবসাইট ব্যবহার চালিয়ে যাওয়ার অর্থ হলো আপনি পরিবর্তিত নতুন
                শর্তাবলি মেনে নিয়েছেন।
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4 flex items-center">
              <FiMail className="mr-3 h-6 w-6 text-gold" />
              যোগাযোগের তথ্য (Contact Information)
            </h2>
            <div className="space-y-3 text-light-silver">
              <p>
                আমাদের শর্তাবলি বা কোনো অফার (যেমন: প্রথম ১০০০ জনের উপহার)
                সম্পর্কে বিস্তারিত জানতে সরাসরি আমাদের সাথে যোগাযোগ করুন:
              </p>
              <div className="bg-dark-gray-custom p-4 rounded-lg border border-dark-gold">
                <p>
                  <strong>Email:</strong> aseverythingshop48@gmail.com
                </p>
                <p>
                  <strong>Phone:</strong> +8801791258144
                </p>
                <p>
                  <strong>Address:</strong> Nakhargonj, Nageswari, Kurigram,
                  Rangpur
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className="mt-8 text-center text-light-silver">
          <p>
            "AS EVERYTHING SHOP ব্যবহার করার মাধ্যমে, আপনি এটি স্বীকার করছেন যে আপনি
            আমাদের এই শর্তাবলি (Terms & Conditions) পড়েছেন, বুঝেছেন এবং এর
            দ্বারা দায়বদ্ধ থাকতে সম্মত হয়েছেন।"
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
