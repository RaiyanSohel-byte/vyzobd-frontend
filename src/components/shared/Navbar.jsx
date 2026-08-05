// components/layout/Navbar.jsx
"use client";

import { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import logoImg from "../../../public/logos/logo.svg";

import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useCart } from "@/hooks/useCart";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart();
  // Consume the real user state and logout function from AuthContext
  const { user, logout, isAdmin } = useAuth();

  // Close menus when the route changes
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
      setIsOpen(false);
      toast.success("Logged Out");
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-secondary/90 backdrop-blur-md shadow-sm border-b border-primary/10">
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
          <div className="hidden md:flex space-x-8 items-center">
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
            {isAdmin && (
              <Link
                href={"/admin"}
                className="text-sm font-semibold tracking-wide uppercase transition-colors duration-300 text-primary hover:text-accent"
              >
                Admin Dashboard
              </Link>
            )}
          </div>

          {/* Icons / Actions */}
          <div className="flex items-center space-x-5 md:space-x-6 relative">
            {/* Desktop User Menu */}
            {user ?
              <>
                <div className="hidden sm:block relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-primary hover:text-primary/70 transition-colors focus:outline-none cursor-pointer"
                  >
                    {user?.name?.split(" ")[0]} {/* Shows first name safely */}
                    <FiChevronDown
                      className={`cursor-pointer w-4 h-4 transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-6 w-48 bg-secondary border border-primary/20 shadow-xl flex flex-col z-50">
                      <Link
                        href="/profile"
                        className="px-4 py-4 text-xs uppercase tracking-widest text-primary border-b border-primary/10 hover:bg-accent hover:text-secondary transition-colors"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="px-4 py-4 text-xs uppercase tracking-widest text-primary border-b border-primary/10 hover:bg-accent hover:text-secondary transition-colors"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-4 text-xs uppercase tracking-widest text-primary hover:bg-accent hover:text-secondary transition-colors cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>{" "}
              </>
            : <>
                <Link
                  href="/cart"
                  className="relative text-primary hover:text-accent transition-colors duration-300 flex items-center justify-center group"
                  aria-label="Shopping Cart"
                >
                  <FiShoppingCart className="w-8 h-8 md:w-6 md:h-6 transform group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1.5 -right-2 bg-accent text-white text-[12px] font-bold w-6 h-6 md:w-5 md:h-5 rounded-full flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                </Link>{" "}
                <Link
                  href="/login"
                  className="hidden sm:flex text-primary hover:text-accent transition-colors duration-300 items-center justify-center gap-2"
                  aria-label="User Login"
                >
                  <FiUser className="w-5 h-5 md:w-6 md:h-6" />{" "}
                  <h3 className="font-semibold">Login</h3>
                </Link>
              </>
            }

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
        className={`md:hidden absolute top-20 left-0 w-full bg-secondary shadow-xl transition-all duration-300 ease-in-out origin-top border-b border-primary/10 ${
          isOpen ?
            "opacity-100 scale-y-100 visible"
          : "opacity-0 scale-y-0 invisible"
        }`}
      >
        <div className="flex flex-col max-h-[calc(100vh-5rem)] overflow-y-auto">
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-6 py-5 text-sm font-semibold tracking-widest uppercase border-b border-primary/5 transition-colors ${
                  isActive ?
                    "text-accent bg-primary/5"
                  : "text-primary hover:bg-primary/5 hover:text-accent"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          {/* Mobile User Section */}
          <div className="bg-primary/5 mt-auto">
            {user ?
              <>
                <div className="px-6 py-4 text-[10px] uppercase tracking-widest text-primary/50 border-b border-primary/5">
                  Logged in as{" "}
                  <span className="font-bold text-primary">{user?.name}</span>
                </div>
                <Link
                  href="/profile"
                  className="block px-6 py-5 text-sm font-semibold tracking-widest uppercase text-primary border-b border-primary/5 hover:bg-primary/10 transition-colors"
                >
                  Profile
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="block px-6 py-5 text-sm font-semibold tracking-widest uppercase text-primary border-b border-primary/5 hover:bg-primary/10 transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  href="/orders"
                  className="block px-6 py-5 text-sm font-semibold tracking-widest uppercase text-primary border-b border-primary/5 hover:bg-primary/10 transition-colors"
                >
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-6 py-5 text-sm font-semibold tracking-widest uppercase text-primary hover:bg-primary/10 transition-colors"
                >
                  Logout
                </button>
              </>
            : <Link
                href="/login"
                className="flex items-center space-x-3 px-6 py-5 text-sm font-semibold tracking-widest uppercase text-primary hover:bg-primary/10 transition-colors"
              >
                <FiUser className="w-5 h-5" />
                <span>Login / Register</span>
              </Link>
            }
          </div>
        </div>
      </div>
    </nav>
  );
}
