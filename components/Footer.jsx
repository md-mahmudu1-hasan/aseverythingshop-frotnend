"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiTwitter, FiInstagram, FiSend } from 'react-icons/fi';
import { toast } from "@/components/ui/notify";

const Footer = () => {
  const [email, setEmail] = useState('');

  const _handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!');
      setEmail('');
    } else {
      toast.error('Please enter your email');
    }
  };

  return (
    <footer className="site-footer border-t border-dark-gold">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-linear-to-r from-gold to-dark-gold rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-black-custom">AS</span>
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-gold to-dark-gold bg-clip-text text-transparent">EVERYTHINGS SHOP</span>
            </div>
            <p className="text-light-silver leading-relaxed text-sm">
              Your trusted online shopping destination for quality products at great prices. Experience premium shopping with us.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-dark-gray-custom hover:bg-gold hover:text-black-custom border border-dark-gold rounded-full flex items-center justify-center transition-all duration-300 text-gold">
                <FiFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-dark-gray-custom hover:bg-gold hover:text-black-custom border border-dark-gold rounded-full flex items-center justify-center transition-all duration-300 text-gold">
                <FiTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-dark-gray-custom hover:bg-gold hover:text-black-custom border border-dark-gold rounded-full flex items-center justify-center transition-all duration-300 text-gold">
                <FiInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-linear-to-r from-gold to-dark-gold"></span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-light-silver hover:text-gold transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-dark-gold rounded-full mr-3 group-hover:bg-gold transition-colors"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/all-clothes" className="text-light-silver hover:text-gold transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-dark-gold rounded-full mr-3 group-hover:bg-gold transition-colors"></span>
                  All Clothes
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-light-silver hover:text-gold transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-dark-gold rounded-full mr-3 group-hover:bg-gold transition-colors"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-light-silver hover:text-gold transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-dark-gold rounded-full mr-3 group-hover:bg-gold transition-colors"></span>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gold mb-6 relative inline-block">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-linear-to-r from-gold to-dark-gold"></span>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-dark-gray-custom border border-dark-gold rounded-lg flex items-center justify-center text-gold group-hover:border-gold group-hover:bg-gold group-hover:text-black-custom transition-all duration-300">
                  <FiMapPin size={18} />
                </div>
                <div>
                  <p className="text-light-silver text-sm leading-relaxed">
                    <span className="font-semibold text-gold">Address:</span><br />
                    Nakhargonj, Nageswari, Kurigram<br />
                    Rangpur
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-dark-gray-custom border border-dark-gold rounded-lg flex items-center justify-center text-gold group-hover:border-gold group-hover:bg-gold group-hover:text-black-custom transition-all duration-300">
                  <FiPhone size={18} />
                </div>
                <div>
                  <p className="text-light-silver text-sm">
                    <span className="font-semibold text-gold">Phone:</span><br />
                    +8801791258144
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-dark-gray-custom border border-dark-gold rounded-lg flex items-center justify-center text-gold group-hover:border-gold group-hover:bg-gold group-hover:text-black-custom transition-all duration-300">
                  <FiMail size={18} />
                </div>
                <div>
                  <p className="text-light-silver text-sm">
                    <span className="font-semibold text-gold">Email:</span><br />
                    aseverythingshop48@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-dark-gold pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-light-silver text-sm">
              &copy; {new Date().getFullYear()} AS EVERYTHING SHOP. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-light-silver hover:text-gold transition-colors duration-300">Privacy Policy</Link>
              <Link href="/terms" className="text-light-silver hover:text-gold transition-colors duration-300">Terms of Service</Link>
              <Link href="/refund" className="text-light-silver hover:text-gold transition-colors duration-300">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
