"use client";

import React, { useState } from "react";
import useAxios from "@/hooks/useAxios";
import {
  FiUser,
  FiMail,
  FiMapPin,
  FiPhone,
  FiEdit3,
  FiCheck,
  FiX,
  FiInfo,
  FiMap,
} from "react-icons/fi";

const MyProfile = ({ data }) => {
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [personalData] = useState({
    name: data?.name,
    email: data?.email,
  });

  const axiosInstance = useAxios();
  const [addressData, setAddressData] = useState({
    address: data?.address || "",
    phone: data?.phone || "",
  });

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setIsEditingAddress(false);
    let { address, phone } = addressData;
    await axiosInstance.patch("/userinfo", {
      email: data?.email,
      phone: phone,
      address: address,
    });
  };

  return (
    <div className="min-h-screen bg-dark-gray-custom py-4 sm:py-8 lg:py-12 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex w-12 h-12 bg-dark-gray-custom rounded-2xl items-center justify-center text-gold shadow-sm border border-dark-gold">
              <FiUser className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gold tracking-tight">
                My Profile
              </h1>
              <p className="text-sm sm:text-base text-light-silver font-medium">
                Manage your personal information and address
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Sidebar / Profile Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-black-custom rounded-3xl shadow-sm border border-dark-gold overflow-hidden relative group">
              {/* Header Gradient */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-br from-gold to-dark-gold"></div>

              <div className="relative pt-12 pb-8 px-6 flex flex-col items-center">
                {/* Avatar */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-black-custom rounded-full p-1.5 shadow-xl mb-4 relative z-10 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full bg-linear-to-br from-dark-gray-custom to-black-custom rounded-full flex items-center justify-center text-gold border border-dark-gold">
                    <span className="text-4xl font-black uppercase tracking-tighter">
                      {personalData.name?.charAt(0) || "U"}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gold mb-1">
                  {personalData.name}
                </h3>
                <p className="text-sm text-dark-gray-custom0 font-medium mb-6 uppercase tracking-widest">
                  {data?.role || "Customer"}
                </p>

                <div className="w-full space-y-3 pt-6 border-t border-dark-gold">
                  <div className="flex items-center gap-3 p-3 bg-dark-gray-custom/50 rounded-xl">
                    <div className="w-8 h-8 bg-black-custom rounded-lg flex items-center justify-center text-light-silver shadow-sm">
                      <FiMail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-light-silver">
                        Email Address
                      </p>
                      <p className="text-sm font-semibold text-gold truncate">
                        {personalData.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            {/* Delivery Address Card */}
            <div className="bg-black-custom rounded-3xl shadow-sm border border-dark-gold overflow-hidden">
              <div className="px-6 py-5 border-b border-dark-gold flex items-center justify-between bg-dark-gray-custom/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black-custom rounded-xl flex items-center justify-center text-gold shadow-sm">
                    <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-gold">
                    Delivery Address
                  </h2>
                </div>

                {!isEditingAddress ? (
                  <button
                    onClick={() => setIsEditingAddress(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-black-custom text-gold border border-dark-gold rounded-xl hover:bg-dark-gray-custom hover:border-gold transition-all font-bold text-sm shadow-sm active:scale-95"
                  >
                    <FiEdit3 className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {addressData.address || addressData.phone
                        ? "Edit"
                        : "Add"}
                    </span>
                    <span className="sm:hidden">
                      {addressData.address || addressData.phone
                        ? "Edit"
                        : "Add"}
                    </span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsEditingAddress(false)}
                      className="px-4 py-2 text-light-silver hover:text-gold font-bold text-sm transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddressSubmit}
                      className="flex items-center gap-2 px-5 py-2 bg-linear-to-r from-gold to-dark-gold text-black-custom rounded-xl hover:from-dark-gold hover:to-gold transition-all font-bold text-sm shadow-lg shadow-gold/20 active:scale-95"
                    >
                      <FiCheck className="w-4 h-4" />
                      Save
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8">
                {isEditingAddress ? (
                  <form
                    onSubmit={handleAddressSubmit}
                    className="space-y-6 max-w-2xl"
                  >
                    <div className="group">
                      <label className="block text-xs font-black uppercase tracking-widest text-light-silver mb-2 px-1 group-focus-within:text-gold transition-colors">
                        Full Delivery Address
                      </label>
                      <div className="relative">
                        <textarea
                          value={addressData.address}
                          name="address"
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              address: e.target.value,
                            })
                          }
                          placeholder="House, Road, Area, City..."
                          className="w-full px-5 py-4 bg-dark-gray-custom border-2 border-dark-gold rounded-2xl focus:bg-black-custom focus:border-gold outline-none transition-all resize-none text-sm leading-relaxed text-light-silver"
                          rows="4"
                        />
                      </div>
                    </div>
                    <div className="group">
                      <label className="block text-xs font-black uppercase tracking-widest text-light-silver mb-2 px-1 group-focus-within:text-gold transition-colors">
                        Primary Contact Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={addressData.phone}
                          name="phone"
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              phone: e.target.value,
                            })
                          }
                          placeholder="+880 1XXX-XXXXXX"
                          className="w-full px-5 py-3.5 bg-dark-gray-custom border-2 border-dark-gold rounded-2xl focus:bg-black-custom focus:border-gold outline-none transition-all text-sm font-medium text-light-silver"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-light-silver">
                          <FiPhone className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addressData.address || addressData.phone ? (
                      <>
                        <div className="bg-dark-gray-custom/50 p-6 rounded-3xl border border-dark-gold hover:border-gold transition-colors group">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-black-custom rounded-lg flex items-center justify-center text-gold shadow-sm border border-dark-gold">
                              <FiMap className="w-4 h-4" />
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-light-silver">
                              Your Address
                            </h4>
                          </div>
                          <p className="text-gold font-bold leading-relaxed">
                            {addressData.address || "No address provided"}
                          </p>
                        </div>

                        <div className="bg-dark-gray-custom/50 p-6 rounded-3xl border border-dark-gold hover:border-gold transition-colors group">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-black-custom rounded-lg flex items-center justify-center text-gold shadow-sm border border-dark-gold">
                              <FiPhone className="w-4 h-4" />
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-light-silver">
                              Mobile Number
                            </h4>
                          </div>
                          <p className="text-gold font-black text-lg tracking-tight">
                            {addressData.phone || "No phone provided"}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-dark-gray-custom rounded-full flex items-center justify-center mb-6 border-2 border-dashed border-dark-gold">
                          <FiMapPin className="w-8 h-8 text-gold" />
                        </div>
                        <h3 className="text-lg font-bold text-gold mb-2">
                          Ready to ship?
                        </h3>
                        <p className="text-sm text-dark-gray-custom0 max-w-xs mx-auto mb-8 font-medium">
                          Please add your delivery address for a faster and
                          smoother checkout experience.
                        </p>
                        <button
                          onClick={() => setIsEditingAddress(true)}
                          className="px-8 py-3 bg-linear-to-r from-gold to-dark-gold text-black-custom rounded-2xl font-black text-sm hover:translate-y-[-2px] transition-all shadow-lg shadow-gold/20 active:scale-95"
                        >
                          Add Address Now
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
