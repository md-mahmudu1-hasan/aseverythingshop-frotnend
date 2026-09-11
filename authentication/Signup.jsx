"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAdditionalUserInfo } from "firebase/auth";
import {
  FiMail,
  FiLock,
  FiUser,
  FiPhone,
  FiMapPin,
  FiShield,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { toast } from "@/components/ui/notify";
import useAxios from "@/hooks/useAxios";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const axiosInstance = useAxios();

  const { googleSignIn } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const password = watch("password");

  const onSubmit = async (data) => {
    const { name, email, phone, address, password } = data;

    try {
      await axiosInstance.post("/signup", { email, password });
      sessionStorage.setItem(
        "as-wear-verification",
        JSON.stringify({ name, email, phone, address, password }),
      );
      router.push("/verify-email");

      toast.success("Verify Your Email");
    } catch (err) {
      toast.error("Somthing went wrong!Please try again.");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      if (!googleSignIn) return;
      const result = await googleSignIn();
      const { isNewUser } = getAdditionalUserInfo(result);

      if (isNewUser) {
        await axiosInstance.post("/userinfo", {
          email: result?.user?.email,
          name: result?.user?.displayName,
          phone: "",
          address: "",
        });
        toast.success("Welcome! Please complete your profile.");
        router.push("/complete-profile");
      } else {
        toast.success("Login Success!");
        router.push("/");
      }
    } catch (err) {
      const errorMessage = err.message.includes("(")
        ? err.message.split("(")[1].split(")")[0]
        : err.message;
      setError(errorMessage);
      console.error("Google Sign-in Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black-custom flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gold mb-2">
            Create Account
          </h2>
          <p className="text-light-silver">
            Join AS Everything shop for exclusive deals and offers
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-black-custom rounded-2xl shadow-xl p-8 border border-dark-gold">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gold mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-dark-gold" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${
                    errors.name ? "border-accent-red" : "border-dark-gold"
                  } placeholder-light-silver text-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold focus:z-10 sm:text-sm transition-colors bg-dark-gray-custom`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-accent-red">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gold mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-dark-gold" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${
                    errors.email ? "border-accent-red" : "border-dark-gold"
                  } placeholder-light-silver text-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold focus:z-10 sm:text-sm transition-colors bg-dark-gray-custom`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-accent-red">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone Number Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gold mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-dark-gold" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[+]?[\d\s\-\(\)]+$/,
                      message: "Invalid phone number",
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number must be at least 10 digits",
                    },
                  })}
                  className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${
                    errors.phone ? "border-accent-red" : "border-dark-gold"
                  } placeholder-light-silver text-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold focus:z-10 sm:text-sm transition-colors bg-dark-gray-custom`}
                  placeholder="Enter your phone number"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-accent-red">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Address Field */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gold mb-2"
              >
                Delivery Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-start pt-3 pointer-events-none">
                  <FiMapPin className="h-5 w-5 text-dark-gold" />
                </div>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  {...register("address", {
                    required: "Delivery address is required",
                    minLength: {
                      value: 10,
                      message: "Please enter a complete address",
                    },
                  })}
                  className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${
                    errors.address ? "border-accent-red" : "border-dark-gold"
                  } placeholder-light-silver text-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold focus:z-10 sm:text-sm transition-colors resize-none bg-dark-gray-custom`}
                  placeholder="Enter your delivery address"
                />
              </div>
              {errors.address && (
                <p className="mt-1 text-sm text-accent-red">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gold mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-dark-gold" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`appearance-none relative block w-full pl-10 pr-12 py-3 border ${
                    errors.password ? "border-accent-red" : "border-dark-gold"
                  } placeholder-light-silver text-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold focus:z-10 sm:text-sm transition-colors bg-dark-gray-custom`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-dark-gold hover:text-gold transition-colors cursor-pointer" />
                  ) : (
                    <FiEye className="h-5 w-5 text-dark-gold hover:text-gold transition-colors cursor-pointer" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-accent-red">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gold mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiShield className="h-5 w-5 text-dark-gold" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className={`appearance-none relative block w-full pl-10 pr-12 py-3 border ${
                    errors.confirmPassword
                      ? "border-accent-red"
                      : "border-dark-gold"
                  } placeholder-light-silver text-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold focus:z-10 sm:text-sm transition-colors bg-dark-gray-custom`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="h-5 w-5 text-dark-gold hover:text-gold transition-colors cursor-pointer" />
                  ) : (
                    <FiEye className="h-5 w-5 text-dark-gold hover:text-gold transition-colors cursor-pointer" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-accent-red">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-gold focus:ring-gold border-dark-gold rounded"
                {...register("terms", {
                  required: "You must accept the terms and conditions",
                })}
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-light-silver"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-gold hover:text-dark-gold font-medium"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="mt-1 text-sm text-accent-red">
                {errors.terms.message}
              </p>
            )}
            {error && (
              <p className="mt-1 text-sm text-accent-red">
                {error == "auth/email-already-in-use"
                  ? "Email already registered"
                  : error || "something went wrong"}
              </p>
            )}

            {/* Signup Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-black-custom bg-linear-to-r from-gold to-dark-gold hover:from-dark-gold hover:to-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-gold" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black-custom text-light-silver">
                  Or sign up with
                </span>
              </div>
            </div>

            {/* Google Signup Button */}
            <div>
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="w-full flex items-center justify-center px-4 py-3 border border-dark-gold rounded-lg shadow-sm text-sm font-medium text-gold bg-black-custom hover:bg-dark-gray-custom focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-all duration-300 transform hover:scale-105"
              >
                <FcGoogle className="w-5 h-5 mr-2" />
                Continue with Google
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-light-silver">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-gold hover:text-dark-gold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-light-silver">
          <p>
            &copy; {new Date().getFullYear()} AS EVERYTHING SHOP. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
