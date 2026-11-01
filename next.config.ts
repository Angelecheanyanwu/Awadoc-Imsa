import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Hides the round Next.js badge that shows in the corner while running `npm run dev`.
  devIndicators: false,
  // Set NEXT_DIST_DIR to build somewhere else (for checks) without touching the .next folder a running
  // dev server is using.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
