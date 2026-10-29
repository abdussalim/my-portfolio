import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Keeps the existing /portfolio/ URL shape.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
