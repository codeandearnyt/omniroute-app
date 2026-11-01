/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // TypeScript path aliases
  async rewrites() {
    return [];
  },
  // Configure webpack if needed
  webpack: (config) => {
    // Fixes npm packages that depend on "browser" module
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": "./src",
      "@omniroute": "./src",
      "@omniroute/open-sse": "./open-sse",
    };
    // Handle .node binaries - ignore warnings for wreq-js platform mismatch
    config.ignoreWarnings = [
      { module: /\.node$/ },
      { module: /wreq-js/ },
    ];
    // Add fallback configuration
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      tls: false,
      fs: false,
    };
    return config;
  },
};

export default nextConfig;