import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
    // minimumCacheTTL: 2_678_400,
  },
  reactStrictMode: true,
  // cacheComponents: true,
  serverExternalPackages: ["twoslash", "typescript"],
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
