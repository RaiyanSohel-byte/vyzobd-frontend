"use client";

import { useState, useMemo, useEffect } from "react";
import {
  FiSearch,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiUserPlus,
  FiMail,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { adminUserService } from "@/services/adminUser.service";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await adminUserService.getUsers();
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await adminUserService.updateRole(id, role);
      setUsers((prev) =>
        prev.map((user) => (user._id === id ? { ...user, role } : user)),
      );
      toast.success("Role updated");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await adminUserService.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // Filter Logic
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user._id?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "All" || user.role === roleFilter;

      const status = user.isVerified ? "Active" : "Inactive";
      const matchesStatus = statusFilter === "All" || status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  // Helper for Status Badges
  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "text-emerald-600 bg-emerald-50 border border-emerald-200";
      case "Inactive":
        return "text-amber-600 bg-amber-50 border border-amber-200";
      default:
        return "text-primary bg-secondary";
    }
  };

  // Helper for Avatar Initials
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="bg-secondary min-h-screen text-primary p-4 sm:p-6 lg:p-8 flex justify-center items-center">
        <div className="animate-pulse font-medium tracking-widest uppercase text-primary/50 text-sm">
          Loading users...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen text-primary p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
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
                <option value="user">Customer</option>
                <option value="admin">Admin</option>
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
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(user._id, e.target.value)
                          }
                          className={`text-xs font-medium px-2 py-1 rounded border shadow-sm focus:outline-none focus:border-accent cursor-pointer ${
                            user.role === "admin" ?
                              "bg-primary/5 border-primary/20 text-primary"
                            : "bg-secondary text-primary/70 border-primary/10"
                          }`}
                        >
                          <option value="user">Customer</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(
                            user.isVerified ? "Active" : "Inactive",
                          )}`}
                        >
                          {user.isVerified ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Lifetime Value (Orders & Total Spent) */}
                      <td className="px-6 py-4">
                        <div className="font-medium text-primary mb-1">
                          {" "}
                          ${user.totalSpent.toFixed(2)}
                        </div>
                        <div className="text-xs text-primary/50">
                          {user.ordersCount} Orders
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
                            onClick={() =>
                              (window.location.href = `mailto:${user.email}`)
                            }
                            className="p-2 text-primary/50 hover:text-primary hover:bg-secondary rounded-md transition-colors"
                            title="Email User"
                          >
                            <FiMail className="w-4 h-4" />
                          </button>

                          {user.role !== "admin" && (
                            <button
                              onClick={() => handleDelete(user._id)}
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
