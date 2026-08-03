import React from "react";
import Link from "next/link";
import { FiMail, FiArrowLeft, FiRefreshCw } from "react-icons/fi";

export default function ResendVerificationPage() {
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
            Resend Code
          </h1>
          <p className="text-sm text-primary/60 leading-relaxed">
            Didn't receive your verification email? Enter your email address
            below and we'll send a new 6-digit code your way.
          </p>
        </div>

        <form className="space-y-5">
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 w-4 h-4" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full border border-primary/20 bg-transparent py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-primary/40"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent font-semibold text-secondary text-sm uppercase tracking-widest py-4 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group"
          >
            <FiRefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Resend Email
          </button>
        </form>
      </div>
    </div>
  );
}
