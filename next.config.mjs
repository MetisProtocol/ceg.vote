import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/c/:path*",
        destination: "https://forum.ceg.vote/c/:path*",
        permanent: true,
        basePath: false,
      },
      {
        source: "/t/:path*",
        destination: "https://forum.ceg.vote/t/:path*",
        permanent: true,
        basePath: false,
      },
    ];
  },
};

export default withMDX(nextConfig);
