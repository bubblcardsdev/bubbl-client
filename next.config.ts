import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
    images: {
    domains: ['bubbldev.s3.ap-south-1.amazonaws.com', 'bubbls3.s3.ap-south-1.amazonaws.com'],
  },
};

export default nextConfig;
