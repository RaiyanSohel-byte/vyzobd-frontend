"use client";

import { useState, useMemo } from "react";
import {
  FiSearch,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiUserPlus,
  FiMail,
  FiShield,
} from "react-icons/fi";

// --- Mock Data (Standard E-commerce User Schema) ---
const MOCK_USERS = [
  {
    _id: "USR-001",
    name: "Elena Rostova",
    email: "elena@example.com",
    role: "Customer",
    status: "Active",
    ordersCount: 4,
    totalSpent: 1250.0,
    createdAt: "2025-11-12T10:30:00Z",
  },
  {
    _id: "USR-002",
    name: "System Administrator",
    email: "admin@store.com",
    role: "Admin",
    status: "Active",
    ordersCount: 0,
    totalSpent: 0.0,
    createdAt: "2025-01-01T00:00:00Z",
  },
  {
    _id: "USR-003",
    name: "Marcus Chen",
    email: "marcus@example.com",
    role: "Customer",
    status: "Active",
    ordersCount: 1,
    totalSpent: 110.0,
    createdAt: "2026-08-01T09:00:00Z",
  },
  {
    _id: "USR-004",
    name: "Sarah Jenkins",
    email: "sarah@example.com",
    role: "Customer",
    status: "Inactive",
    ordersCount: 2,
    totalSpent: 185.0,
    createdAt: "2026-02-15T14:20:00Z",
  },
  {
    _id: "USR-005",
    name: "David Miller",
    email: "david@example.com",
    role: "Customer",
    status: "Suspended",
    ordersCount: 3,
    totalSpent: 420.0,
    createdAt: "2026-03-22T11:05:00Z",
  },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter Logic
  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user._id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchQuery, roleFilter, statusFilter]);

  // Helper for Status Badges
  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "text-emerald-600 bg-emerald-50 border border-emerald-200";
      case "Inactive":
        return "text-amber-600 bg-amber-50 border border-amber-200";
      case "Suspended":
        return "text-accent bg-accent/10 border border-accent/20";
      default:
        return "text-primary bg-secondary";
    }
  };

  // Helper for Avatar Initials
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="bg-secondary min-h-screen text-primary p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-primary/10 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
              User Management
            </h1>
            <p className="text-sm text-primary/60 font-light">
              Manage customer accounts, view purchase history, and control admin
              privileges.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-white text-xs font-medium px-5 py-2.5 rounded-md hover:bg-primary/90 transition-all shadow-sm">
            <FiUserPlus className="w-4 h-4" />
            Add New User
          </button>
        </div>

        {/* Toolbar: Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg border border-primary/10 shadow-sm">
          {/* Search */}
          <div className="relative w-full sm:flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
            <input
              type="text"
              placeholder="Search by Name, Email, or User ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary text-primary text-sm pl-10 pr-4 py-2.5 rounded-md border border-primary/10 focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Filters Wrapper */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <FiFilter className="w-4 h-4 text-primary/60 hidden sm:block" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full sm:w-auto bg-secondary text-primary text-sm px-4 py-2.5 rounded-md border border-primary/10 focus:outline-none focus:border-accent shadow-sm cursor-pointer"
              >
                <option value="All">All Roles</option>
                <option value="Customer">Customer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto bg-secondary text-primary text-sm px-4 py-2.5 rounded-md border border-primary/10 focus:outline-none focus:border-accent shadow-sm cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg border border-primary/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-secondary/50 text-xs uppercase tracking-wider text-primary/60 border-b border-primary/10">
                  <th className="px-6 py-4 font-semibold">User Details</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Lifetime Value</th>
                  <th className="px-6 py-4 font-semibold">Joined Date</th>
                  <th className="px-6 py-4 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-light">
                {filteredUsers.length === 0 ?
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-primary/50"
                    >
                      No users found matching your criteria.
                    </td>
                  </tr>
                : filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-primary/5 hover:bg-secondary/30 transition-colors"
                    >
                      {/* User Details (Avatar, Name, Email) */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border border-primary/10 flex-shrink-0">
                            <span className="text-xs font-bold tracking-wider text-primary">
                              {getInitials(user.name)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-primary mb-0.5">
                              {user.name}
                            </div>
                            <div className="text-xs text-primary/50 flex items-center gap-1">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        {user.role === "Admin" ?
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                            <FiShield className="w-3.5 h-3.5 text-primary/60" />
                            Administrator
                          </span>
                        : <span className="text-primary/70">Customer</span>}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(user.status)}`}
                        >
                          {user.status}
                        </span>
                      </td>

                      {/* Lifetime Value (Orders & Total Spent) */}
                      <td className="px-6 py-4">
                        <div className="font-medium text-primary mb-1">
                          ${user.totalSpent.toFixed(2)}
                        </div>
                        <div className="text-xs text-primary/50">
                          {user.ordersCount}{" "}
                          {user.ordersCount === 1 ? "Order" : "Orders"}
                        </div>
                      </td>

                      {/* Joined Date */}
                      <td className="px-6 py-4 text-primary/70">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="p-2 text-primary/50 hover:text-primary hover:bg-secondary rounded-md transition-colors"
                            title="Email User"
                          >
                            <FiMail className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-primary/50 hover:text-primary hover:bg-secondary rounded-md transition-colors"
                            title="Edit User"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          {user.role !== "Admin" && (
                            <button
                              className="p-2 text-primary/50 hover:text-accent hover:bg-accent/10 rounded-md transition-colors"
                              title="Delete User"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          )}
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
            <span>Showing {filteredUsers.length} users</span>
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
