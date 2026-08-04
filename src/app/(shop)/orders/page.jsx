"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiXCircle,
  FiMapPin,
  FiCreditCard,
  FiShoppingBag,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { orderService } from "@/services/order.service";

// Helper component for status badges
const StatusBadge = ({ status = "Pending" }) => {
  const lower = status.toLowerCase();

  if (lower === "delivered") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
        <FiCheckCircle className="w-3.5 h-3.5" />
        Delivered
      </span>
    );
  }
  if (lower === "shipped" || lower === "processing") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
        <FiTruck className="w-3.5 h-3.5" />
        {status}
      </span>
    );
  }
  if (lower === "cancelled") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
        <FiXCircle className="w-3.5 h-3.5" />
        Cancelled
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
      <FiClock className="w-3.5 h-3.5" />
      Pending
    </span>
  );
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await orderService.getMyOrders();

        console.log(data);

        setOrders(data.orders || []);
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  // Loading Skeleton State
  if (isLoading) {
    return (
      <div className="bg-secondary min-h-screen text-primary py-12 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-48 bg-primary/10 rounded animate-pulse mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-32 bg-white rounded-lg border border-primary/10 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty State
  if (orders.length === 0) {
    return (
      <div className="bg-secondary min-h-screen text-primary flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl border border-primary/10 shadow-sm text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/5 mb-4">
            <FiPackage className="h-8 w-8 text-primary/50" />
          </div>
          <h2 className="text-xl font-bold mb-2">No orders found</h2>
          <p className="text-sm text-primary/60 mb-6">
            You haven't placed any orders yet. Start shopping to view your
            orders here!
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-accent text-white text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-md hover:bg-primary/90 transition-all shadow-sm"
          >
            <FiShoppingBag className="w-4 h-4" />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen text-primary selection:bg-accent selection:text-white pb-24 pt-12 lg:pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 border-b border-primary/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-block text-accent text-xs font-bold uppercase tracking-[0.2em] mb-2">
              Account Overview
            </span>
            <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
          </div>
          <div className="text-xs text-primary/60 font-medium bg-white px-3 py-1.5 rounded-full border border-primary/10 self-start sm:self-auto">
            Total Orders: {orders.length}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order._id;
            const formattedDate = new Date(order.createdAt).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              },
            );

            return (
              <div
                key={order._id}
                className="bg-white rounded-lg border border-primary/10 shadow-sm overflow-hidden transition-all hover:border-primary/20"
              >
                {/* Order Summary Header */}
                <div className="p-5 sm:p-6 bg-secondary/30 border-b border-primary/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-primary/60 font-semibold">
                        Order Placed
                      </span>
                      <span className="text-sm font-medium">
                        {formattedDate}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-primary/60 font-semibold">
                        Total
                      </span>
                      <span className="text-sm font-bold">
                        ৳{order.total?.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-primary/60 font-semibold">
                        Order ID
                      </span>
                      <span className="text-sm font-mono text-primary/80">
                        #{order._id}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <StatusBadge status={order.orderStatus} />
                    <button
                      type="button"
                      onClick={() => toggleOrderDetails(order._id)}
                      className="p-1 text-primary/70 hover:text-primary transition-colors flex items-center gap-1 text-xs font-medium"
                    >
                      <span>
                        {isExpanded ? "Hide Details" : "View Details"}
                      </span>
                      {isExpanded ?
                        <FiChevronUp className="w-4 h-4" />
                      : <FiChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Items Preview */}
                <div className="p-5 sm:p-6">
                  <div className="space-y-4">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="relative w-14 h-16 bg-secondary rounded overflow-hidden flex-shrink-0 border border-primary/10">
                          <Image
                            src={
                              item.image ||
                              item.product?.images?.[0] ||
                              "/placeholder.png"
                            }
                            alt={item.title || item.product?.title || "Product"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-primary truncate">
                            {item.title || item.product?.title}
                          </h4>
                          <p className="text-xs text-primary/60 mt-1">
                            Qty: {item.quantity} × ৳{item.price?.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-sm font-bold text-primary">
                          ৳
                          {((item.price || 0) * (item.quantity || 1)).toFixed(
                            2,
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Expanded Order Details */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-primary/10 grid grid-cols-1 md:grid-cols-2 gap-6 bg-secondary/20 p-4 rounded-md">
                      {/* Shipping Address */}
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary/70 mb-3">
                          <FiMapPin className="w-4 h-4 text-accent" />
                          Shipping Address
                        </div>
                        <div className="text-xs text-primary/80 leading-relaxed space-y-1">
                          <p className="font-semibold text-primary">
                            {order.shippingAddress?.name}
                          </p>
                          <p>{order.shippingAddress?.address}</p>
                          <p>
                            {order.shippingAddress?.city},{" "}
                            {order.shippingAddress?.postalCode}
                          </p>
                          <p>{order.shippingAddress?.country}</p>
                          <p className="pt-1 text-primary/60">
                            Phone: {order.shippingAddress?.phone}
                          </p>
                        </div>
                      </div>

                      {/* Payment & Breakdown */}
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary/70 mb-3">
                          <FiCreditCard className="w-4 h-4 text-accent" />
                          Payment & Breakdown
                        </div>
                        <div className="space-y-2 text-xs text-primary/80">
                          <div className="flex justify-between">
                            <span>Payment Method:</span>
                            <span className="font-medium text-primary">
                              {order.paymentMethod || "Cash On Delivery"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>৳{order.subtotal?.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping Fee:</span>
                            <span>৳{order.shippingCost?.toFixed(2)}</span>
                          </div>
                          {order.discount > 0 && (
                            <div className="flex justify-between text-accent">
                              <span>Discount:</span>
                              <span>-৳{order.discount?.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between font-bold text-sm text-primary pt-2 border-t border-primary/10">
                            <span>Total Paid:</span>
                            <span>৳{order.total?.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
