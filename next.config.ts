import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ["id.sky.com"], // ✅ allow external image domain
  },
};

export default nextConfig;
