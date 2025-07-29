"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/terms", label: "Terms" },
  { href: "/policy", label: "Privacy" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav aria-label="Main navigation" className="relative">
      {/* Hamburger for mobile */}
      <button
        className="sm:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="main-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={`block w-6 h-0.5 bg-gray-600 mb-1 transition-all duration-200 ${
            open ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-gray-600 mb-1 transition-all duration-200 ${
            open ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-gray-600 transition-all duration-200 ${
            open ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></span>
      </button>

      {/* Desktop nav */}
      <ul className="hidden sm:flex gap-8 text-base font-medium items-center">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:text-emerald-600 hover:bg-gray-50 ${
                pathname === link.href
                  ? "text-emerald-600 bg-emerald-50"
                  : "text-gray-700"
              }`}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile nav dropdown */}
      {open && (
        <ul
          id="main-menu"
          className="absolute right-0 top-12 z-50 flex flex-col gap-1 bg-white shadow-xl rounded-xl p-4 w-48 border border-gray-200 sm:hidden animate-fade-in"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:text-emerald-600 hover:bg-gray-50 ${
                  pathname === link.href
                    ? "text-emerald-600 bg-emerald-50 font-medium"
                    : "text-gray-700"
                }`}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
