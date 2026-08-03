"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiMail, FiArrowRight } from "react-icons/fi";

function CheckEmailContent() {
  const params = useSearchParams();
  const email = params.get("email");

  return (
    <div className="w-full max-w-sm text-center">
      {/* Icon Box */}
      <div className="w-16 h-16 border border-primary/20 flex items-center justify-center mx-auto mb-8 bg-primary/5">
        <FiMail className="w-8 h-8 text-primary" />
      </div>

      <h1 className="text-3xl font-bold tracking-tighter mb-4">
        Verify Your Email
      </h1>

      <p className="text-sm text-primary/60 mb-10 leading-relaxed">
        We have sent a verification link to
        <br />
        <span className="font-medium text-primary block mt-2 text-base">
          {email || "your email address"}
        </span>
      </p>

      <Link
        href="/login"
        className="w-full bg-accent font-semibold text-secondary text-sm uppercase tracking-widest py-4 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group mb-8"
      >
        Return to Login
        <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>

      <div className="text-xs uppercase tracking-widest text-primary/50 flex flex-col gap-2">
        <span>Didn't receive the email?</span>
        <Link
          href={`/resend-verification${email ? `?email=${email}` : ""}`}
          className="text-accent font-semibold hover:text-primary/70 transition-colors underline underline-offset-4"
        >
          Resend Verification Link
        </Link>
      </div>
    </div>
  );
}

export default function CheckEmailPage() {
  return (
    <div className="bg-secondary min-h-screen flex items-center justify-center text-primary selection:bg-accent selection:text-white px-4 py-12">
      {/* Suspense is required in Next.js when using useSearchParams in a Client Component */}
      <Suspense
        fallback={
          <div className="w-full max-w-sm h-64 border border-primary/10 animate-pulse bg-primary/5" />
        }
      >
        <CheckEmailContent />
      </Suspense>
    </div>
  );
}
