"use client";

import { dashboardService } from "@/services/dashboard.service";
import { downloadDashboardReport } from "@/utils/downloadDashboardReport";
import React, { useState, useEffect } from "react";
import {
  FiDollarSign,
  FiShoppingBag,
  FiPackage,
  FiUsers,
  FiArrowUpRight,
  FiMoreHorizontal,
} from "react-icons/fi";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await dashboardService.getDashboard();
        // Adjust depending on if axios wraps your response in another 'data' object
        setDashboard(data?.data || data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (isLoading) {
    return (
      <div className="bg-secondary min-h-screen text-primary p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="animate-pulse font-medium tracking-widest uppercase text-primary/50 text-sm">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="bg-secondary min-h-screen text-primary p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="text-accent font-medium">Failed to load data.</div>
      </div>
    );
  }

  // Map your dynamic stats to the UI structure
  const dynamicStats = [
    {
      id: "revenue",
      title: "Total Revenue",
      value: `৳${(dashboard.stats?.totalRevenue || 0).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: FiDollarSign,
    },
    {
      id: "orders",
      title: "Total Orders",
      value: (dashboard.stats?.totalOrders || 0).toLocaleString(),
      icon: FiShoppingBag,
    },
    {
      id: "products",
      title: "Total Products",
      value: (dashboard.stats?.totalProducts || 0).toLocaleString(),
      icon: FiPackage,
    },
    {
      id: "users",
      title: "Total Users",
      value: (dashboard.stats?.totalUsers || 0).toLocaleString(),
      icon: FiUsers,
    },
  ];

  const targetPercentage = dashboard.monthly?.percentage || 0;
  const handleDownloadReport = () => {
    downloadDashboardReport(dashboard);
  };
  return (
    <div className="bg-secondary min-h-screen text-primary p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-primary/10 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
              Dashboard Overview
            </h1>
            <p className="text-sm text-primary/60 font-light">{currentDate}</p>
          </div>
          <button
            onClick={handleDownloadReport}
            className="bg-primary text-white text-xs font-medium px-5 py-2.5 rounded-md hover:bg-primary/90 transition-all shadow-sm"
          >
            Download Report
          </button>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dynamicStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-white p-6 rounded-lg border border-primary/10 shadow-sm flex flex-col justify-between"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-secondary rounded-md flex items-center justify-center border border-primary/5">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-primary/50 mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-bold tracking-tight text-primary">
                    {stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-primary/10 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-primary/10 flex justify-between items-center">
              <h2 className="text-base font-bold tracking-tight">
                Recent Orders
              </h2>
              <button className="text-xs text-primary/60 hover:text-accent font-medium transition-colors">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary/50 text-xs uppercase tracking-wider text-primary/60 border-b border-primary/10">
                    <th className="px-6 py-4 font-semibold">Order ID</th>
                    <th className="px-6 py-4 font-semibold">Customer</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Amount</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-light">
                  {dashboard.recentOrders && dashboard.recentOrders.length > 0 ?
                    dashboard.recentOrders.map((order) => {
                      // Handle Mongoose _id or standard id
                      const orderId = order._id || order.id;
                      const customerName =
                        order.shippingAddress?.name ||
                        order.user?.name ||
                        "Guest";
                      const date = new Date(order.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        },
                      );
                      const amount = (order.total || 0).toFixed(2);
                      const status = order.orderStatus || "Pending";

                      return (
                        <tr
                          key={orderId}
                          className="border-b border-primary/5 hover:bg-secondary/30 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-primary">
                            #{orderId?.toString().slice(-6).toUpperCase()}
                          </td>
                          <td className="px-6 py-4">{customerName}</td>
                          <td className="px-6 py-4 text-primary/60">{date}</td>
                          <td className="px-6 py-4 font-medium">${amount}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                status.toLowerCase() === "delivered" ?
                                  "bg-primary text-white"
                                : status.toLowerCase() === "processing" ?
                                  "bg-secondary border border-primary/20 text-primary"
                                : status.toLowerCase() === "shipped" ?
                                  "bg-primary/10 text-primary"
                                : "bg-accent/10 text-accent"
                              }`}
                            >
                              {status}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  : <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-8 text-center text-primary/50"
                      >
                        No recent orders found.
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Quick Insights / Summary */}
          <div className="lg:col-span-1 space-y-8">
            {/* Sales Target Card */}
            <div className="bg-white p-6 rounded-lg border border-primary/10 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-base font-bold tracking-tight">
                  Monthly Target
                </h2>
                <button className="text-primary/40 hover:text-primary transition-colors">
                  <FiMoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-primary/60">Achieved</span>
                  <span className="font-bold">{targetPercentage}%</span>
                </div>
                {/* Custom Progress Bar matching theme */}
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(targetPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
