/**
 * Next.js configuration file (JavaScript version for Heroku compatibility)
 * For more info: https://nextjs.org/docs/pages/api-reference/next-config-js
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // CDN and Performance Optimizations
  outputFileTracingRoot: __dirname,
  
  // Enable static exports and CDN-ready features
  trailingSlash: false,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Compression and caching
  compress: true,
  
  // Security headers for CDN
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      // Cache static assets
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=86400',
          },
        ],
      },
      {
        source: '/(.*)\\.(css|js|ico|png|svg|jpg|jpeg|gif|webp|avif|woff|woff2|ttf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
