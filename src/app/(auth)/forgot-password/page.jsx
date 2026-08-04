"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiMail, FiArrowLeft } from "react-icons/fi";
// Adjust this import path based on your actual folder structure
import { authService } from "@/services/auth.service";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      await authService.forgotPassword({ email });
      setMessage("Reset link sent! Please check your email.");
      setEmail(""); // Clear the input on success
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-secondary min-h-screen flex items-center justify-center text-primary selection:bg-accent selection:text-white px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary/50 hover:text-primary transition-colors mb-8"
        >
          <FiArrowLeft className="w-3 h-3" />
          Back to Login
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tighter mb-3">
            Reset Password
          </h1>
          <p className="text-sm text-primary/60 leading-relaxed">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 w-4 h-4" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full border border-primary/20 bg-transparent py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-primary/40"
            />
          </div>

          {/* Minimal status messages matching your typography */}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {message && <p className="text-sm text-green-500">{message}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent font-semibold text-secondary text-sm uppercase tracking-widest py-4 hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
