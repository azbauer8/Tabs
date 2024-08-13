import { fileURLToPath } from "node:url";
import createJiti from "jiti";

const jiti = createJiti(fileURLToPath(import.meta.url));
jiti("./src/utils/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
