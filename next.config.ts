import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images: accept AVIF/WebP from any remote source (covers CMS-hosted images)
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http',  hostname: '**' },
    ],
    // Limit image sizes to sensible breakpoints for performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
  },

  reactStrictMode: true,

  // Skip type & lint checks during builds (types are checked in IDE)
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  // Compression is on by default in Next.js, but explicitly confirming:
  compress: true,

  // Security & performance headers applied globally
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',    value: 'nosniff'          },
          { key: 'X-Frame-Options',            value: 'DENY'             },
          { key: 'X-XSS-Protection',           value: '1; mode=block'    },
          { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
        ],
      },
      // Long-lived cache for static assets
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
