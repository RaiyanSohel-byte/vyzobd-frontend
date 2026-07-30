// components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import logoImg from "../../../public/logos/navLogo.png";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu when the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-secondary/90 backdrop-blur-md shadow-sm border-b border-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={logoImg}
                width={120}
                height={120}
                alt="Store Logo"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-semibold tracking-wide uppercase transition-colors duration-300 ${
                    isActive ? "text-accent" : "text-primary hover:text-accent"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Icons / Actions */}
          <div className="flex items-center space-x-5 md:space-x-6">
            <Link
              href="/login"
              className="hidden sm:flex text-primary hover:text-accent transition-colors duration-300 items-center justify-center"
              aria-label="User Account"
            >
              <FiUser className="w-5 h-5 md:w-6 md:h-6" />
            </Link>

            <Link
              href="/cart"
              className="relative text-primary hover:text-accent transition-colors duration-300 flex items-center justify-center group"
              aria-label="Shopping Cart"
            >
              <FiShoppingCart className="w-5 h-5 md:w-6 md:h-6 transform group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1.5 -right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center shadow-md">
                3
              </span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-2 -mr-2 text-primary hover:text-accent transition-colors focus:outline-none"
            >
              {isOpen ?
                <FiX className="w-6 h-6" />
              : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-secondary shadow-xl transition-all duration-300 ease-in-out origin-top ${
          isOpen ?
            "opacity-100 scale-y-100 visible"
          : "opacity-0 scale-y-0 invisible"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col max-h-[calc(100vh-5rem)] overflow-y-auto">
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-4 text-base font-semibold tracking-wide uppercase border-b border-primary/10 transition-colors ${
                  isActive ?
                    "text-accent bg-primary/5"
                  : "text-primary hover:bg-primary/5 hover:text-accent"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          {/* Mobile Login Link (since it's hidden on small screens in the top bar) */}
          <Link
            href="/login"
            className="flex items-center space-x-3 px-4 py-4 text-base font-semibold tracking-wide uppercase text-primary hover:bg-primary/5 hover:text-accent transition-colors mt-2"
          >
            <FiUser className="w-5 h-5" />
            <span>My Account</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
