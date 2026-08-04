"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  FiSearch,
  FiFilter,
  FiEye,
  FiTrash2,
  FiDownload,
  FiAlertTriangle,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { orderService } from "@/services/order.service";
import { exportOrdersToCSV } from "@/utils/exportOrdersToCSV";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    orderId: null,
  });

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await orderService.getAllOrders();
        setOrders(data?.orders || data?.data || data || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Update Order Status
  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order,
        ),
      );
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order status");
    }
  };

  // Update Payment Status
  const handlePaymentStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updatePaymentStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ?
            { ...order, paymentStatus: newStatus }
          : order,
        ),
      );
      toast.success(`Payment status updated to ${newStatus}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update payment status");
    }
  };

  // Trigger Delete Modal
  const promptDelete = (orderId) => {
    setDeleteModal({ isOpen: true, orderId });
  };

  // Cancel Delete
  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, orderId: null });
  };

  // Execute Delete Order
  const confirmDeleteOrder = async () => {
    const { orderId } = deleteModal;
    if (!orderId) return;

    try {
      await orderService.deleteOrder(orderId);
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
      toast.success("Order deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete order");
    } finally {
      setDeleteModal({ isOpen: false, orderId: null });
    }
  };

  // Filter Logic
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchLower = searchQuery.toLowerCase().trim();

      // Extract the exact 6-character string the user sees on the UI
      const visibleOrderId =
        order._id ? `#${order._id.slice(-6).toLowerCase()}` : "";

      // Fallbacks for standard fields
      const fullOrderId = order._id?.toLowerCase() || "";
      const userName = order.user?.name?.toLowerCase() || "";
      const userEmail = order.user?.email?.toLowerCase() || "";

      // Match against the visible ID, the full raw ID, user name, or email
      const matchesSearch =
        !searchLower ||
        visibleOrderId.includes(searchLower) ||
        fullOrderId.includes(searchLower) ||
        userName.includes(searchLower) ||
        userEmail.includes(searchLower);

      const matchesStatus =
        statusFilter === "All" || order.orderStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

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
        return "bg-secondary text-primary border border-primary/10";
    }
  };

  // Helper for Payment Status Badges
  const getPaymentStatusStyle = (status) => {
    switch (status) {
      case "Paid":
        return "text-emerald-600 bg-emerald-50 border border-emerald-200";
      case "Failed":
        return "text-accent bg-accent/10 border border-accent/20";
      default:
        return "text-amber-600 bg-amber-50 border border-amber-200";
    }
  };

  const handleExportCSV = () => {
    exportOrdersToCSV(filteredOrders);
    toast.success("CSV downloaded successfully");
  };

  if (isLoading) {
    return (
      <div className="bg-secondary min-h-screen text-primary p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="animate-pulse font-medium tracking-widest uppercase text-primary/50 text-sm">
          Loading Orders...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen text-primary p-4 sm:p-6 lg:p-8 relative">
      <div className="max-w-5xl mx-auto space-y-8">
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
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-primary text-white text-xs font-medium px-5 py-2.5 rounded-md hover:bg-primary/90 transition-all shadow-sm"
          >
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
              <option value="Pending">Pending</option>
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
                          #{order._id.slice(-6).toUpperCase()}
                        </div>
                        <div className="text-xs text-primary/50 truncate max-w-[150px]">
                          {order.items?.length || 0} item
                          {order.items?.length !== 1 ? "s" : ""}
                        </div>
                      </td>

                      {/* Customer Info */}
                      <td className="px-6 py-4">
                        <div className="font-medium text-primary mb-1">
                          {order.user?.name || "Guest"}
                        </div>
                        <div className="text-xs text-primary/50">
                          {order.user?.email || "N/A"}
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
                        ${(order.total || 0).toFixed(2)}
                      </td>

                      {/* Payment Status (Editable) */}
                      <td className="px-6 py-4">
                        <select
                          value={order.paymentStatus}
                          onChange={(e) =>
                            handlePaymentStatusChange(order._id, e.target.value)
                          }
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider outline-none cursor-pointer ${getPaymentStatusStyle(
                            order.paymentStatus,
                          )}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                        </select>
                      </td>

                      {/* Order Status (Editable) */}
                      <td className="px-6 py-4">
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            handleOrderStatusChange(order._id, e.target.value)
                          }
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider outline-none cursor-pointer ${getOrderStatusStyle(
                            order.orderStatus,
                          )}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
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
                            onClick={() => promptDelete(order._id)}
                            className="p-2 text-primary/50 hover:text-accent hover:bg-accent/10 rounded-md transition-colors"
                            title="Delete Order"
                          >
                            <FiTrash2 className="w-4 h-4" />
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

      {/* Designed Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl border border-primary/10 max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FiAlertTriangle className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  Delete Order?
                </h3>
                <p className="text-sm text-primary/60 mt-1">
                  Are you sure you want to delete order{" "}
                  <span className="font-medium text-primary">
                    #{deleteModal.orderId?.slice(-6).toUpperCase()}
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-8">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm font-medium text-primary bg-secondary border border-primary/10 hover:bg-secondary/70 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteOrder}
                className="px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent/90 rounded-md transition-colors shadow-sm"
              >
                Delete Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
