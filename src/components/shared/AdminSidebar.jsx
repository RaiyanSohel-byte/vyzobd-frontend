"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiShoppingBag,
  FiLayers,
  FiUsers,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";

const NAV_LINKS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: FiHome },
  { name: "Orders", href: "/admin/orders", icon: FiShoppingBag },
  { name: "Products", href: "/admin/products", icon: FiLayers },
  { name: "Users", href: "/admin/users", icon: FiUsers },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-primary/10">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-8 border-b border-primary/10">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-primary flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-primary text-white flex items-center justify-center rounded-sm">
            <span className="text-lg leading-none mt-0.5">S</span>
          </div>
          Store<span className="font-light">Admin</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2">
        <span className="block px-4 text-xs font-bold uppercase tracking-[0.2em] text-primary/40 mb-4">
          Main Menu
        </span>

        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 group ${
                isActive ?
                  "bg-primary text-white shadow-sm"
                : "text-primary/70 hover:bg-secondary hover:text-primary"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${isActive ? "text-white" : "text-primary/50 group-hover:text-primary transition-colors"}`}
              />
              <span className="text-sm font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-primary/10">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-primary/70 rounded-md hover:bg-accent/10 hover:text-accent transition-colors group">
          <FiLogOut className="w-5 h-5 text-primary/50 group-hover:text-accent transition-colors" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2.5 bg-white border border-primary/10 rounded-md text-primary shadow-sm hover:bg-secondary transition-colors"
        aria-label="Open Menu"
      >
        <FiMenu className="w-5 h-5" />
      </button>

      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden lg:flex flex-col w-64 h-screen fixed top-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <div className="lg:hidden">
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-primary/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            isOpen ?
              "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer Panel */}
        <aside
          className={`fixed top-0 left-0 h-screen w-[280px] z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close Button inside drawer */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-4 p-2 text-primary/50 hover:text-primary transition-colors"
            aria-label="Close Menu"
          >
            <FiX className="w-5 h-5" />
          </button>

          <SidebarContent />
        </aside>
      </div>
    </>
  );
}
