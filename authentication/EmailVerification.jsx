"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiMail,
  FiArrowLeft,
  FiCheckCircle,
  FiRefreshCw,
} from "react-icons/fi";
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { toast } from "@/components/ui/notify";

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const verificationData =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("as-wear-verification") || "{}")
      : {};
  const { createUser } = useAuth();
  const axiosInstance = useAxios();

  const handleInputChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Check if pasted content is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setVerificationCode(digits);
      document.getElementById(`code-input-5`)?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = verificationCode.join("");

    if (code.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }
    try {
      const response = await axiosInstance.post("/verify-otp", {
        email: verificationData.email,
        otp: code,
      });

      if (response.status === 200) {
        setIsVerified(true);
        await createUser(verificationData.email, verificationData.password);
        await axiosInstance.post("/userinfo", {
          email: verificationData.email,
          name: verificationData.name,
          phone: verificationData.phone,
          address: verificationData.address,
        });
        toast.success("Email verified successfully!");
        sessionStorage.removeItem("as-wear-verification");
        router.push("/");
      }
    } catch (err) {
      setError("Invalid or expired code. Please try again.");
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-dark-gray-custom flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-black-custom rounded-2xl shadow-xl border border-dark-gold p-8 text-center">
            <div className="mx-auto h-20 w-20 bg-linear-to-r from-gold to-dark-gold rounded-full flex items-center justify-center mb-6">
              <FiCheckCircle className="h-10 w-10 text-black-custom" />
            </div>
            <h2 className="text-2xl font-bold text-gold mb-2">
              Email Verified!
            </h2>
            <p className="text-light-silver mb-6">
              Your email has been successfully verified. Redirecting to home
              page...
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-gray-custom flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-linear-to-r from-gold to-dark-gold rounded-full flex items-center justify-center mb-6">
            <FiMail className="h-10 w-10 text-black-custom" />
          </div>
          <h2 className="text-3xl font-bold text-gold mb-2">
            Verify Your Email
          </h2>
          <p className="text-light-silver">
            We've sent a 6-digit verification code to your email address
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-black-custom rounded-2xl shadow-xl border border-dark-gold p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 6-Digit Code Input */}
            <div>
              <label className="block text-sm font-medium text-gold mb-4 text-center">
                Enter Verification Code
              </label>
              <div className="flex justify-center space-x-2">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-input-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className={`w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-200 bg-dark-gray-custom ${
                      error
                        ? "border-accent-red text-accent-red"
                        : "border-dark-gold text-gold"
                    }`}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                ))}
              </div>
              {error && (
                <p className="mt-2 text-sm text-accent-red text-center">{error}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black-custom bg-linear-to-r from-gold to-dark-gold hover:from-dark-gold hover:to-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-all duration-300 transform hover:scale-105"
            >
              Verify Email
            </button>
          </form>

          {/* Resend Code */}
          <div className="mt-6 text-center">
            <p className="text-sm text-light-silver mb-2">
              Check in spam folder first. Didn't receive the code?
            </p>
          </div>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="flex items-center justify-center text-sm text-gold hover:text-dark-gold font-medium transition-colors"
            >
              <FiArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
