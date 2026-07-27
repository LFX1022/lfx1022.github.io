import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/archives/triumph-daytona-archive",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
