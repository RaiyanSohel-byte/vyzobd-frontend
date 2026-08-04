"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiLock } from "react-icons/fi";
// Adjust this import path based on your actual folder structure
import { authService } from "@/services/auth.service";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    // 1. Validate that passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      // 2. Call your backend exactly as specified
      await authService.resetPassword(token, { password });

      setMessage("Password successfully reset! Redirecting to login...");

      // 3. Clear form and redirect after a short delay
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to reset password. The link might be expired.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-secondary min-h-screen flex items-center justify-center text-primary selection:bg-accent selection:text-white px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tighter mb-3">
            Reset Password
          </h1>
          <p className="text-sm text-primary/60 leading-relaxed">
            Please enter your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 w-4 h-4" />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              required
              minLength={6} // Optional: enforce a minimum length
              className="w-full border border-primary/20 bg-transparent py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-primary/40"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 w-4 h-4" />
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              minLength={6}
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
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
