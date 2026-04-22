import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images in production
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Minify output
  poweredByHeader: false,

  // Strict mode for development
  reactStrictMode: true,
};

export default nextConfig;
