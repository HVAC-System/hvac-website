"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/our-story", label: "Our Story" },
  { href: "/contact-us", label: "Contact Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav aria-label="Main navigation" className="relative">
      {/* Hamburger for mobile */}
      <button
        className="sm:hidden p-2 rounded focus:outline-none "
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="main-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="block w-6 h-0.5 bg-[#E54E1E] mb-1"></span>
        <span className="block w-6 h-0.5 bg-[#E54E1E] mb-1"></span>
        <span className="block w-6 h-0.5 bg-[#E54E1E]"></span>
      </button>
      {/* Desktop nav */}
      <ul className="hidden sm:flex gap-6 text-base font-semibold items-center">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`px-2 py-1 rounded transition-colors focus:outline-none  hover:text-[#E54E1E] hover:bg-[#F8F8F8] ${
                pathname === link.href ? "text-[#E54E1E]" : "text-[#222]"
              }`}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={() => (window.location.href = "/download")}
            className="ml-4 px-4 py-2 bg-[#E54E1E] text-white font-bold hover:bg-[#c43d13] focus:outline-none rounded transition-colors"
            aria-label="Download Nikela app"
          >
            Download
          </button>
        </li>
      </ul>
      {/* Mobile nav dropdown */}
      {open && (
        <ul
          id="main-menu"
          className="absolute right-0 top-12 z-50 flex flex-col gap-2 bg-white shadow-lg rounded p-4 w-44 border border-[#E0E0E0] sm:hidden animate-fade-in"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block px-3 py-2 rounded transition-colors focus:outline-none  hover:text-[#E54E1E] hover:bg-[#F8F8F8] ${
                  pathname === link.href
                    ? "text-[#E54E1E] underline underline-offset-4"
                    : "text-[#222]"
                }`}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                window.location.href = "/download";
              }}
              className="block mt-2 px-4 py-2 bg-[#E54E1E] text-white font-bold hover:bg-[#c43d13] focus:outline-none rounded-lg transition-colors text-center"
              aria-label="Download Nikela app"
            >
              Download
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
