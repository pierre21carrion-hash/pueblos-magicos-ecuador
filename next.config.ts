import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF first (best compression), then WebP, then original
    formats: ["image/avif", "image/webp"],

    // Break points that Next.js generates optimized images for
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],

    // Quality defaults — 85 is visually indistinguishable from 100 at half the size
    qualities: [40, 60, 75, 80, 85, 90],

    // Enable sharp for faster local image optimization
    // (sharp is installed by Next.js automatically)
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year for production
  },
};

export default nextConfig;
