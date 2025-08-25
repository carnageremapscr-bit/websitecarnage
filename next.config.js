/**
 * Next.js configuration file (JavaScript version for Heroku compatibility)
 * For more info: https://nextjs.org/docs/pages/api-reference/next-config-js
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // config options here
  outputFileTracingRoot: __dirname,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
