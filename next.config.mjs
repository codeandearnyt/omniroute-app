import createNextIntlPlugin from "next-intl/plugin";

// Wire next-intl request config (locale resolution + messages loading).
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next.js 16: Turbopack is the default bundler. This config makes it
  // explicit and prevents the "webpack config without turbopack config"
  // hard error. Path aliases (@/*, @omniroute/...) come from tsconfig paths.
  turbopack: {},
  // Native/optional modules are loaded dynamically at runtime (try/catch),
  // so keep them external instead of trying to bundle them.
  serverExternalPackages: ["keytar", "wreq-js"],
  async rewrites() {
    return [];
  },
  // Configure webpack if needed (legacy; Turbopack is now the default)
  webpack: (config) => {
    // Fixes npm packages that depend on "browser" module
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": "./src",
      "@omniroute": "./src",
      "@omniroute/open-sse": "./open-sse",
    };
    // Handle .node binaries - ignore warnings for wreq-js platform mismatch
    config.ignoreWarnings = [{ module: /\.node$/ }, { module: /wreq-js/ }];
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

export default withNextIntl(nextConfig);
