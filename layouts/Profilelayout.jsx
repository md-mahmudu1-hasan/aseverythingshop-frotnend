"use client";

import React, { useEffect, useState } from "react";
import { toast } from "@/components/ui/notify";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { GiTalk } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import MyProfile from "@/site-pages/Profile/MyProfile";
import MyOrders from "@/site-pages/Profile/MyOrders";
import MyReviews from "@/site-pages/Profile/MyReviews";
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import Loader from "@/components/Loader";

const Profilelayout = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [data, setData] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);
  const { SignOut, user, loading: authLoading } = useAuth();
  const router = useRouter();
  const axiosInstance = useAxios();

useEffect(() => {
  if (!authLoading && !user) {
    router.replace("/login");
  }
}, [authLoading, router, user]);

useEffect(() => {
  if (!user?.email) return;

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(
        `/userInfo/by-email/${user.email}`
      );
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setProfileLoading(false);
    }
  };

  fetchData();
}, [axiosInstance, user?.email]);

  if (authLoading || !user || profileLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-dark-gray-custom">
        <Loader size="large" text="Checking your account..." />
      </div>
    );
  }

  const handleLogout = () => {
    SignOut();
    router.push("/");
    toast.success("Logout Successfully");
  };

  const menuItems = [
    { id: "profile", label: "My Profile", icon: <CgProfile /> },
    {
      id: "orders",
      label: "My Orders",
      icon: <MdOutlineProductionQuantityLimits />,
    },
    { id: "reviews", label: "My Reviews", icon: <GiTalk /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <MyProfile data={data} />;
      case "orders":
        return <MyOrders data={data}/>;
      case "reviews":
        return <MyReviews />;
      default:
        return <MyProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-dark-gray-custom to-black-custom">
      {/* Navbar */}
      <nav className="bg-black-custom shadow-lg border-b border-dark-gold sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Profile Title */}
            <div className="flex items-center space-x-3">
              <h1 className="text-xl lg:text-2xl font-bold bg-linear-to-r from-gold to-dark-gold bg-clip-text text-transparent">
                My Account
              </h1>
            </div>

            {/* Home button */}
            <button
              onClick={() => router.push("/")}
              className="flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-gold to-dark-gold text-black-custom rounded-lg hover:from-dark-gold hover:to-gold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <AiOutlineHome size={18} />
              <span className="hidden sm:inline font-medium">Home</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info Card */}
        <div className="bg-black-custom rounded-2xl shadow-xl border border-dark-gold p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-linear-to-br from-gold to-dark-gold rounded-full flex items-center justify-center text-black-custom font-bold text-2xl">
              {user?.displayName?.charAt(0) || data?.name?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gold">
                {user?.displayName || data?.name}
              </h2>
              <p className="text-sm text-light-silver">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-black-custom rounded-2xl shadow-xl border border-dark-gold overflow-hidden mb-6">
          <div className="flex border-b border-dark-gold overflow-x-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`
                  flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-300 whitespace-nowrap
                  ${
                    activeSection === item.id
                      ? "bg-linear-to-r from-gold to-dark-gold text-black-custom"
                      : "text-light-silver hover:bg-dark-gray-custom hover:text-gold"
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-black-custom rounded-2xl shadow-xl border border-dark-gold overflow-hidden">
          <div className="p-6">
            {renderContent()}
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-8 py-3 bg-linear-to-r from-accent-red to-accent-red text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profilelayout;
