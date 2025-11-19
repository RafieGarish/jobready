import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['imagekit.io'],
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
