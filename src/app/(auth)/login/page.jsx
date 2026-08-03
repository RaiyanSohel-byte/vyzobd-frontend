"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import React from "react";
import Link from "next/link";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const { login } = useAuth();

  const router = useRouter();
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await login(formData);

      router.push("/");
      toast.success("Login Successful");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-secondary min-h-screen flex items-center justify-center text-primary selection:bg-accent selection:text-white px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tighter mb-3">
            Welcome Back
          </h1>
          <p className="text-xs uppercase tracking-widest text-primary/50">
            Sign in to access your dashboard
          </p>
        </div>
        {error === "Please verify your email before logging in." && (
          <Link
            href={`/resend-verification?email=${encodeURIComponent(formData.email)}`}
            className="mt-3 block text-center text-sm text-blue-600 hover:underline"
          >
            Resend verification email
          </Link>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 w-4 h-4" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full border border-primary/20 bg-transparent py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-primary/40"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 w-4 h-4" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full border border-primary/20 bg-transparent py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-primary/40"
            />
          </div>

          <div className="flex justify-end pt-1">
            <Link
              href="/forgot-password"
              className="text-[10px] uppercase tracking-widest text-primary/50 hover:text-primary transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent font-semibold text-secondary text-sm uppercase tracking-widest py-4 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group"
          >
            {loading ? "Signing In..." : "Sign In"}
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center flex flex-col gap-4">
          <Link
            href="/register"
            className="text-xs uppercase tracking-widest text-primary/50 hover:text-primary transition-colors underline underline-offset-4"
          >
            Don't have an account? Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
