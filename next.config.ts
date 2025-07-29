import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimized for Vercel deployment
  experimental: {
    optimizePackageImports: ["react", "react-dom"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
};

export default nextConfig;
