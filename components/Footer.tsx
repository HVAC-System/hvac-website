import React from "react";

const Footer = () => (
  <footer className="w-full bg-gray-50 mt-16 pt-12 pb-8 px-6 flex flex-col items-center border-t border-gray-200">
    <div className="mb-6 text-center">
      <span className="text-xl font-semibold text-gray-900">
        HVAC & Lighting Design Tool
      </span>
      <p className="text-gray-600 mt-2">
        Energy-efficient building design for a sustainable future
      </p>
    </div>

    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
      <span>
        &copy; {new Date().getFullYear()} HVAC Design Tool. All rights reserved.
      </span>
      <span className="text-gray-400 select-none" aria-hidden="true">
        &bull;
      </span>
      <a
        href="/about"
        className="hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
      >
        About Us
      </a>
      <span className="text-gray-400 select-none" aria-hidden="true">
        &bull;
      </span>
      <a
        href="/policy"
        className="hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
      >
        Privacy Policy
      </a>
      <span className="text-gray-400 select-none" aria-hidden="true">
        &bull;
      </span>
      <a
        href="/terms"
        className="hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
      >
        Terms of Service
      </a>
    </div>
  </footer>
);

export default Footer;
