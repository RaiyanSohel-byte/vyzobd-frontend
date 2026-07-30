// components/home/Newsletter.tsx
"use client";

import { useState } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="block text-accent font-semibold text-xs md:text-sm uppercase tracking-[0.2em] mb-4">
          Join The Club
        </span>

        <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tight mb-6">
          Get Updates
        </h2>

        <p className="text-primary/70 text-base md:text-lg mb-10 max-w-xl mx-auto font-light">
          Subscribe to receive updates, access to exclusive deals, and more. We
          respect your privacy.
        </p>

        <form
          onSubmit={handleSubmit}
          className="relative max-w-md mx-auto flex items-center border-b-2 border-primary/20 focus-within:border-primary transition-colors duration-300 pb-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            disabled={status === "success" || status === "loading"}
            className="w-full bg-transparent border-none outline-none text-primary placeholder:text-primary/40 font-medium px-2 disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={status === "success" || status === "loading"}
            aria-label="Subscribe to newsletter"
            className="absolute right-0 p-2 text-primary hover:text-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {status === "success" ?
              <FiCheck className="w-6 h-6 text-green-500 transition-all scale-100" />
            : <FiArrowRight
                className={`w-6 h-6 transition-all ${status === "loading" ? "animate-pulse" : "group-hover:translate-x-1"}`}
              />
            }
          </button>
        </form>

        {/* Success Message */}
        <div
          className={`mt-4 h-6 transition-all duration-500 ${status === "success" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <p className="text-sm font-semibold text-green-600 tracking-wide uppercase">
            Welcome to the club. Check your inbox.
          </p>
        </div>
      </div>
    </section>
  );
}
