"use client";

import { useAuth } from "@/hooks/useAuth";
import { userService } from "@/services/user.service";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiPhone, FiCheck, FiLoader } from "react-icons/fi";

export default function ProfileForm({ profile, setProfile }) {
  const [formData, setFormData] = useState({
    name: profile.name || "",
    phone: profile.phone || "",
  });

  const [loading, setLoading] = useState(false);

  const { refreshUser } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await userService.updateProfile(formData);

      setProfile(data.user);

      await refreshUser();

      toast.success("Profile updated.");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Input */}
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest font-semibold text-primary/70 ml-1">
          Full Name
        </label>
        <div className="relative">
          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 w-4 h-4" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-primary/20 bg-transparent py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-primary/40"
          />
        </div>
      </div>

      {/* Email Input (Disabled) */}
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest font-semibold text-primary/70 ml-1">
          Email Address (Read-only)
        </label>
        <div className="relative">
          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 w-4 h-4" />
          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full border border-primary/10 bg-primary/5 py-4 pl-12 pr-4 text-sm text-primary/50 cursor-not-allowed focus:outline-none"
          />
        </div>
      </div>

      {/* Phone Input */}
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest font-semibold text-primary/70 ml-1">
          Phone Number
        </label>
        <div className="relative">
          <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 w-4 h-4" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-primary/20 bg-transparent py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-primary/40"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent font-semibold text-secondary text-sm uppercase tracking-widest py-4 mt-2 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ?
          <>
            <FiLoader className="w-4 h-4 animate-spin" />
            Updating...
          </>
        : <>
            Save Changes
            <FiCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </>
        }
      </button>
    </form>
  );
}
