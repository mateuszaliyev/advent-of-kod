import type { NextConfig } from "next";

import "@/environment";

const nextConfig: NextConfig = {
  experimental: { dynamicIO: true },
  logging: { fetches: { fullUrl: process.env.NODE_ENV === "development" } },
  redirects: async () => [
    {
      destination: "/:event?day=:day",
      permanent: true,
      source: "/:event/:day",
    },
  ],
};

export default nextConfig;
