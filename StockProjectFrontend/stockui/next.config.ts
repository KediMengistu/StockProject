import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // WARNING: This will let builds pass even with lint errors
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [{ source: "/", destination: "/start", permanent: false }];
  },
};

export default nextConfig;
