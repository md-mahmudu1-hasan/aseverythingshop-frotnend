"use client";

import React from "react";

const Loader = ({ size = "medium", text = "Loading..." }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  const containerSizeClasses = {
    small: "w-32 h-32",
    medium: "w-40 h-40",
    large: "w-48 h-48",
  };

  const textSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  return (
    <div className="flex flex-col bg-dark-gray-custom items-center justify-center p-8 space-y-8">
      {/* Premium E-commerce Loader */}
      <div className="relative">
        {/* Outer rotating ring with gradient */}
        <div
          className={`${containerSizeClasses[size]} relative flex items-center justify-center`}
        >
          {/* Multiple rotating rings */}
          <div
            className={`absolute inset-2 ${sizeClasses[size]} rounded-full border-4 border-transparent border-t-gold border-r-dark-gold animate-spin`}
          ></div>
          <div
            className={`absolute inset-4 ${sizeClasses[size] === "w-8 h-8" ? "w-6 h-6" : sizeClasses[size] === "w-12 h-12" ? "w-8 h-8" : "w-10 h-10"} rounded-full border-4 border-transparent border-b-dark-gold border-l-gold animate-spin`}
            style={{ animationDirection: "reverse" }}
          ></div>

          {/* Central shopping bag with glow effect */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Glow effect */}
            <div
              className={`absolute inset-0 ${sizeClasses[size]} bg-linear-to-r from-gold to-dark-gold rounded-xl blur-xl opacity-50 animate-pulse`}
            ></div>

            {/* Shopping bag container */}
            <div
              className={`${sizeClasses[size]} bg-linear-to-r from-gold to-dark-gold rounded-xl flex items-center justify-center shadow-2xl relative overflow-hidden`}
            >
              {/* Shopping bag icon */}
              <svg
                className="text-white relative z-10"
                fill="currentColor"
                viewBox="0 0 24 24"
                style={{ width: "65%", height: "65%" }}
              >
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>

              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></div>
            </div>

            {/* Floating price tags */}
            <div
              className="absolute -top-3 -right-3 w-6 h-6 bg-accent-red rounded-full flex items-center justify-center shadow-lg animate-bounce"
              style={{ animationDelay: "0ms" }}
            >
              <span className="text-white text-xs font-bold">$</span>
            </div>
            <div
              className="absolute -top-2 -left-3 w-5 h-5 bg-gold rounded-full flex items-center justify-center shadow-lg animate-bounce"
              style={{ animationDelay: "200ms" }}
            >
              <span className="text-white text-xs">%</span>
            </div>
            <div
              className="absolute -bottom-2 right-2 w-4 h-4 bg-accent-red rounded-full flex items-center justify-center shadow-lg animate-bounce"
              style={{ animationDelay: "400ms" }}
            >
              <span className="text-white text-xs">!</span>
            </div>
          </div>
        </div>

        {/* Orbiting particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gold rounded-full animate-ping shadow-lg"></div>
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-accent-red rounded-full animate-ping shadow-lg"
            style={{ animationDelay: "500ms" }}
          ></div>
          <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gold rounded-full animate-ping shadow-lg"
            style={{ animationDelay: "1000ms" }}
          ></div>
          <div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-accent-red rounded-full animate-ping shadow-lg"
            style={{ animationDelay: "1500ms" }}
          ></div>

          {/* Additional corner particles */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-metallic-silver rounded-full animate-pulse"></div>
          <div
            className="absolute top-4 right-4 w-2 h-2 bg-light-silver rounded-full animate-pulse"
            style={{ animationDelay: "300ms" }}
          ></div>
          <div
            className="absolute bottom-4 left-4 w-2 h-2 bg-light-silver rounded-full animate-pulse"
            style={{ animationDelay: "600ms" }}
          ></div>
          <div
            className="absolute bottom-4 right-4 w-2 h-2 bg-metallic-silver rounded-full animate-pulse"
            style={{ animationDelay: "900ms" }}
          ></div>
        </div>
      </div>

      {/* Enhanced Loading Text */}
      <div className="text-center">
        <p
          className={`${textSizeClasses[size]} font-bold text-gold animate-pulse`}
        >
          {text}
        </p>

        {/* Premium loading dots with effects */}
        <div className="flex justify-center space-x-3 mt-4">
          <div className="relative">
            <div
              className="w-3 h-3 bg-linear-to-r from-gold to-dark-gold rounded-full animate-bounce shadow-lg"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div className="absolute inset-0 w-3 h-3 bg-metallic-silver rounded-full animate-ping"></div>
          </div>
          <div className="relative">
            <div
              className="w-3 h-3 bg-linear-to-r from-accent-red to-accent-red rounded-full animate-bounce shadow-lg"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="absolute inset-0 w-3 h-3 bg-light-silver rounded-full animate-ping"
              style={{ animationDelay: "150ms" }}
            ></div>
          </div>
          <div className="relative">
            <div
              className="w-3 h-3 bg-linear-to-r from-gold to-dark-gold rounded-full animate-bounce shadow-lg"
              style={{ animationDelay: "300ms" }}
            ></div>
            <div
              className="absolute inset-0 w-3 h-3 bg-metallic-silver rounded-full animate-ping"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>

        {/* E-commerce themed subtext with icon */}
        <div className="flex items-center justify-center space-x-2 mt-4">
          <svg
            className="w-4 h-4 text-gold animate-pulse"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <p className="text-sm text-light-silver font-medium italic">
            {size === "large" &&
              "Preparing your premium shopping experience..."}
            {size === "medium" && "Curating your personalized content..."}
            {size === "small" && "Loading magic..."}
          </p>
          <svg
            className="w-4 h-4 text-accent-red animate-pulse"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>

        {/* Progress indicator */}
        <div className="w-full max-w-xs mx-auto mt-4">
          <div className="h-1 bg-dark-gold rounded-full overflow-hidden">
            <div className="h-full bg-linear-to-r from-gold to-dark-gold rounded-full animate-progress"></div>
          </div>
        </div>
      </div>

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes progress {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;
