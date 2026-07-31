"use client";

import { useState, useMemo } from "react";
import {
  FiSearch,
  FiFilter,
  FiEye,
  FiMoreVertical,
  FiDownload,
} from "react-icons/fi";

// --- Mock Data ---
const MOCK_ORDERS = [
  {
    _id: "ORD-7091",
    user: { name: "Elena Rostova", email: "elena@example.com" },
    items: [{ title: "Architectural Wool Overcoat", quantity: 1, price: 320 }],
    shippingAddress: "123 Fashion Ave, NY 10001",
    subtotal: 320,
    shippingCost: 0,
    discount: 0,
    total: 320.0,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    orderStatus: "Processing",
    createdAt: "2026-08-01T10:30:00Z",
  },
  {
    _id: "ORD-7090",
    user: { name: "Marcus Chen", email: "marcus@example.com" },
    items: [{ title: "Minimalist Linen Trousers", quantity: 1, price: 110 }],
    shippingAddress: "456 Design Blvd, CA 94103",
    subtotal: 110,
    shippingCost: 15,
    discount: 0,
    total: 125.0,
    paymentMethod: "PayPal",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    createdAt: "2026-08-01T09:15:00Z",
  },
  {
    _id: "ORD-7089",
    user: { name: "Sarah Jenkins", email: "sarah@example.com" },
    items: [{ title: "Heavyweight Boxy Tee", quantity: 2, price: 65 }],
    shippingAddress: "789 Studio Rd, TX 73301",
    subtotal: 130,
    shippingCost: 0,
    discount: 10,
    total: 120.0,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    createdAt: "2026-07-31T14:20:00Z",
  },
  {
    _id: "ORD-7088",
    user: { name: "David Miller", email: "david@example.com" },
    items: [{ title: "Heavyweight Boxy Tee", quantity: 1, price: 65 }],
    shippingAddress: "321 Canvas Ln, FL 33101",
    subtotal: 65,
    shippingCost: 15,
    discount: 0,
    total: 80.0,
    paymentMethod: "Credit Card",
    paymentStatus: "Pending",
    orderStatus: "Processing",
    createdAt: "2026-07-31T11:05:00Z",
  },
  {
    _id: "ORD-7087",
    user: { name: "Amanda Hayes", email: "amanda@example.com" },
    items: [{ title: "Architectural Wool Overcoat", quantity: 1, price: 320 }],
    shippingAddress: "999 Minimal St, WA 98101",
    subtotal: 320,
    shippingCost: 0,
    discount: 0,
    total: 320.0,
    paymentMethod: "Credit Card",
    paymentStatus: "Failed",
    orderStatus: "Cancelled",
    createdAt: "2026-07-30T16:45:00Z",
  },
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter Logic
  const filteredOrders = useMemo(() => {
    return MOCK_ORDERS.filter((order) => {
      const matchesSearch =
        order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || order.orderStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  // Helper for Order Status Badges
  const getOrderStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-primary text-white";
      case "Processing":
        return "bg-secondary border border-primary/20 text-primary";
      case "Shipped":
        return "bg-primary/10 text-primary";
      case "Cancelled":
        return "bg-accent/10 text-accent";
      default:
        return "bg-secondary text-primary";
    }
  };

  // Helper for Payment Status Badges
  const getPaymentStatusStyle = (status) => {
    switch (status) {
      case "Paid":
        return "text-emerald-600 bg-emerald-50 border border-emerald-200";
      case "Pending":
        return "text-amber-600 bg-amber-50 border border-amber-200";
      case "Failed":
        return "text-accent bg-accent/10 border border-accent/20";
      default:
        return "text-primary bg-secondary";
    }
  };

  return (
    <div className="bg-secondary min-h-screen text-primary p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-primary/10 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
              Orders Management
            </h1>
            <p className="text-sm text-primary/60 font-light">
              View, track, and manage all customer orders.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-white text-xs font-medium px-5 py-2.5 rounded-md hover:bg-primary/90 transition-all shadow-sm">
            <FiDownload className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Toolbar: Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg border border-primary/10 shadow-sm">
          {/* Search */}
          <div className="relative w-full sm:w-96">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
            <input
              type="text"
              placeholder="Search by Order ID, Name, or Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary text-primary text-sm pl-10 pr-4 py-2.5 rounded-md border border-primary/10 focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-sm text-primary/60 font-medium">
              <FiFilter className="w-4 h-4" />
              <span className="hidden sm:inline">Status:</span>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto bg-secondary text-primary text-sm px-4 py-2.5 rounded-md border border-primary/10 focus:outline-none focus:border-accent shadow-sm cursor-pointer"
            >
              <option value="All">All Orders</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg border border-primary/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-secondary/50 text-xs uppercase tracking-wider text-primary/60 border-b border-primary/10">
                  <th className="px-6 py-4 font-semibold">Order Details</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Total</th>
                  <th className="px-6 py-4 font-semibold">Payment</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-light">
                {filteredOrders.length === 0 ?
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-primary/50"
                    >
                      No orders found matching your criteria.
                    </td>
                  </tr>
                : filteredOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-primary/5 hover:bg-secondary/30 transition-colors"
                    >
                      {/* Order ID & Items */}
                      <td className="px-6 py-4">
                        <div className="font-medium text-primary mb-1">
                          {order._id}
                        </div>
                        <div className="text-xs text-primary/50 truncate max-w-[150px]">
                          {order.items.length} item
                          {order.items.length !== 1 ? "s" : ""}
                        </div>
                      </td>

                      {/* Customer Info */}
                      <td className="px-6 py-4">
                        <div className="font-medium text-primary mb-1">
                          {order.user.name}
                        </div>
                        <div className="text-xs text-primary/50">
                          {order.user.email}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-primary/70">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      {/* Total Pricing */}
                      <td className="px-6 py-4 font-medium text-primary">
                        ${order.total.toFixed(2)}
                      </td>

                      {/* Payment Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${getPaymentStatusStyle(order.paymentStatus)}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>

                      {/* Order Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getOrderStatusStyle(order.orderStatus)}`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="p-2 text-primary/50 hover:text-primary hover:bg-secondary rounded-md transition-colors"
                            title="View Details"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-primary/50 hover:text-primary hover:bg-secondary rounded-md transition-colors"
                            title="More Actions"
                          >
                            <FiMoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 border-t border-primary/10 flex items-center justify-between text-xs text-primary/60">
            <span>Showing {filteredOrders.length} orders</span>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1.5 border border-primary/10 rounded-md hover:bg-secondary transition-colors disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button
                className="px-3 py-1.5 border border-primary/10 rounded-md hover:bg-secondary transition-colors disabled:opacity-50"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
