"use client";

import {
  FiDollarSign,
  FiShoppingBag,
  FiPercent,
  FiTrendingUp,
  FiArrowUpRight,
  FiArrowDownRight,
  FiMoreHorizontal,
} from "react-icons/fi";

// --- Mock Data ---
const STATS = [
  {
    id: "sales",
    title: "Total Sales",
    value: "$124,500.00",
    trend: "+12.5%",
    isPositive: true,
    icon: FiDollarSign,
  },
  {
    id: "orders",
    title: "Orders Received",
    value: "1,248",
    trend: "+8.2%",
    isPositive: true,
    icon: FiShoppingBag,
  },
  {
    id: "profit",
    title: "Net Profit",
    value: "$84,660.00",
    trend: "+15.3%",
    isPositive: true,
    icon: FiTrendingUp,
  },
  {
    id: "margin",
    title: "Profit Margin",
    value: "68.0%",
    trend: "-1.2%",
    isPositive: false,
    icon: FiPercent,
  },
];

const RECENT_ORDERS = [
  {
    id: "#ORD-7091",
    customer: "Elena Rostova",
    date: "Aug 01, 2026",
    amount: "$320.00",
    status: "Processing",
  },
  {
    id: "#ORD-7090",
    customer: "Marcus Chen",
    date: "Aug 01, 2026",
    amount: "$110.00",
    status: "Shipped",
  },
  {
    id: "#ORD-7089",
    customer: "Sarah Jenkins",
    date: "Jul 31, 2026",
    amount: "$450.00",
    status: "Delivered",
  },
  {
    id: "#ORD-7088",
    customer: "David Miller",
    date: "Jul 31, 2026",
    amount: "$65.00",
    status: "Pending",
  },
];

export default function AdminDashboard() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-secondary min-h-screen text-primary p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-primary/10 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
              Dashboard Overview
            </h1>
            <p className="text-sm text-primary/60 font-light">{currentDate}</p>
          </div>
          <button className="bg-primary text-white text-xs font-medium px-5 py-2.5 rounded-md hover:bg-primary/90 transition-all shadow-sm">
            Download Report
          </button>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => {
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
                  <span
                    className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                      stat.isPositive ?
                        "bg-emerald-50 text-emerald-600"
                      : "bg-accent/10 text-accent"
                    }`}
                  >
                    {stat.isPositive ?
                      <FiArrowUpRight className="w-3 h-3" />
                    : <FiArrowDownRight className="w-3 h-3" />}
                    {stat.trend}
                  </span>
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
          {/* Left Column: Recent Orders (Spans 2 columns on large screens) */}
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
                  {RECENT_ORDERS.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-primary/5 hover:bg-secondary/30 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-primary">
                        {order.id}
                      </td>
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4 text-primary/60">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 font-medium">{order.amount}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            order.status === "Delivered" ?
                              "bg-primary text-white"
                            : order.status === "Processing" ?
                              "bg-secondary border border-primary/20 text-primary"
                            : order.status === "Shipped" ?
                              "bg-primary/10 text-primary"
                            : "bg-accent/10 text-accent"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
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
                  <span className="font-bold">82%</span>
                </div>
                {/* Custom Progress Bar matching theme */}
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: "82%" }}
                  ></div>
                </div>
              </div>
              <p className="text-xs text-primary/60 font-light">
                $25,500 remaining to reach the $150,000 goal for August.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="bg-transparent border border-primary/10 rounded-lg p-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-primary/60 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-md border border-primary/5 hover:border-primary/20 shadow-xs transition-all group">
                  <span className="text-sm font-medium">Add New Product</span>
                  <FiArrowUpRight className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-md border border-primary/5 hover:border-primary/20 shadow-xs transition-all group">
                  <span className="text-sm font-medium">Manage Categories</span>
                  <FiArrowUpRight className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-md border border-primary/5 hover:border-primary/20 shadow-xs transition-all group">
                  <span className="text-sm font-medium">
                    View Abandoned Carts
                  </span>
                  <FiArrowUpRight className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
