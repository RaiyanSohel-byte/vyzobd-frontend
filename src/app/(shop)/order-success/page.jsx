"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiCheckCircle, FiShoppingBag, FiList } from "react-icons/fi";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="bg-secondary min-h-screen text-primary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl border border-primary/10 shadow-sm text-center">
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
          <FiCheckCircle className="h-10 w-10 text-green-600" />
        </div>

        {/* Header */}
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Order placed successfully!
        </h2>
        <p className="text-sm text-primary/70 mb-8">
          Thank you for your purchase. We've received your order and are
          currently processing it.
        </p>

        {/* Order ID Box */}
        {orderId && (
          <div className="bg-secondary border border-primary/10 rounded-lg p-4 mb-8">
            <span className="block text-xs uppercase tracking-widest font-semibold text-primary/60 mb-1">
              Order Reference
            </span>
            <span className="text-lg font-mono font-medium text-primary">
              #{orderId}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/products"
            className="w-full bg-accent text-white text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-md hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2 group"
          >
            <FiShoppingBag className="w-4 h-4" />
            Continue Shopping
          </Link>

          <Link
            href="/orders"
            className="w-full bg-white text-primary border border-primary/20 text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-md hover:bg-secondary transition-all shadow-sm flex items-center justify-center gap-2 group"
          >
            <FiList className="w-4 h-4" />
            View Order Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-secondary flex items-center justify-center text-primary animate-pulse">
          Loading...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
