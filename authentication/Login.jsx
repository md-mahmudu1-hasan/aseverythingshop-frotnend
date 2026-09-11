"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { toast } from "@/components/ui/notify";
import { getAdditionalUserInfo } from "firebase/auth";
import useAxios from "@/hooks/useAxios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const email = watch("email");

  const { signIn, googleSignIn } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
    const email = data?.email;
    const password = data?.password;

    try {
      await signIn(email, password);
      router.push("/");
      toast.success("Login Success");
    } catch (err) {
      setError(err.message.split("(")[1].split(")")[0]);
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
            Welcome Back
          </h2>
          <p className="text-light-silver">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-black-custom rounded-2xl shadow-xl p-8 border border-dark-gold">
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
                  autoComplete="current-password"
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
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-dark-gold hover:text-gold transition-colors" />
                  ) : (
                    <FiEye className="h-5 w-5 text-dark-gold hover:text-gold transition-colors" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-accent-red">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-gold focus:ring-gold border-dark-gold rounded"
                  {...register("terms", {
                    required: "You must accept the terms and conditions",
                  })}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-light-silver"
                >
                  <Link
                    href="/terms"
                    className="text-gold hover:text-dark-gold font-medium"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>

              <div className="text-sm">
                <Link
                  state={{ email }}
                  href="/forgot-password"
                  className="font-medium text-gold hover:text-dark-gold transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            {errors.terms && (
              <p className="mt-1 text-sm text-accent-red">
                {errors.terms.message}
              </p>
            )}
            {error && (
              <p className="mt-1 text-sm text-accent-red">
                {error == "auth/invalid-credential"
                  ? "Invalid email or password"
                  : error}
              </p>
            )}

            {/* Sign In Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-black-custom bg-linear-to-r from-gold to-dark-gold hover:from-dark-gold hover:to-dark-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-gold" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black-custom text-light-silver">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login Button */}
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

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-light-silver">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-gold hover:text-dark-gold transition-colors"
              >
                Sign up for free
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

export default Login;
