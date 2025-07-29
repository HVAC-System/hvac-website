import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.nikela.app",
      },
      // add other allowed remote patterns here if needed
    ],
  },
  // Allow cross-origin requests in development
  allowedDevOrigins: ["192.168.100.184", "localhost", "127.0.0.1"],
};

export default nextConfig;
