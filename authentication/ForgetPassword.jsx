"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMail, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { toast } from "@/components/ui/notify";

const ForgetPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { resetPassword } = useAuth();
  const router = useRouter();

  const onSubmit = async (data) => {
    const email = data?.email;

    try {
      await resetPassword(email);
      setIsEmailSent(true);
      toast.success("Password reset email sent successfully!");
      setError("");
    } catch (err) {
      const errorMessage = err.message.includes("(")
        ? err.message.split("(")[1].split(")")[0]
        : "Failed to send reset email. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-dark-gray-custom via-dark-gray-custom to-dark-gray-custom flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-linear-to-r from-gold to-dark-gold rounded-full flex items-center justify-center mb-6">
            <FiMail className="h-10 w-10 text-black-custom" />
          </div>
          <h2 className="text-3xl font-bold text-gold mb-2">
            Reset Your Password
          </h2>
          <p className="text-light-silver">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-black-custom rounded-2xl shadow-xl border border-dark-gold p-8">
          {!isEmailSent ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    id="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.email ? "border-accent-red" : "border-dark-gold"
                    } rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200 bg-dark-gray-custom text-gold placeholder-light-silver`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-accent-red">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-accent-red/20 border border-accent-red rounded-lg p-3">
                  <p className="text-sm text-accent-red">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black-custom bg-linear-to-r from-gold to-dark-gold hover:from-dark-gold hover:to-dark-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending Reset Email...
                  </div>
                ) : (
                  "Send Reset Email"
                )}
              </button>
            </form>
          ) : (
            /* Success State */
            <div className="text-center space-y-6">
              <div className="mx-auto h-16 w-16 bg-dark-gray-custom/60 rounded-full flex items-center justify-center">
                <FiCheckCircle className="h-8 w-8 text-gold" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-metallic-silver mb-2">
                  Check Your Email
                </h3>
                <p className="text-light-silver mb-4">
                  We've sent a password reset link to your email address. Please
                  check your inbox and follow the instructions to reset your
                  password.
                </p>
                <p className="text-sm text-dark-gray-custom0">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setIsEmailSent(false)}
                  className="w-full py-3 px-4 border border-dark-gold rounded-lg shadow-sm text-sm font-medium text-black-custom bg-gold hover:bg-dark-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-colors"
                >
                  Try Another Email
                </button>
                <button
                  onClick={handleBackToLogin}
                  className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black-custom bg-linear-to-r from-gold to-dark-gold hover:from-dark-gold hover:to-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-all duration-300"
                >
                  <FiArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </button>
              </div>
            </div>
          )}

          {/* Back to Login Link (for initial state) */}
          {!isEmailSent && (
            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="flex items-center justify-center text-sm text-gold hover:text-dark-gold font-medium transition-colors"
              >
                <FiArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="text-center text-sm text-dark-gray-custom0">
          <p>
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-medium text-gold hover:text-dark-gold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
