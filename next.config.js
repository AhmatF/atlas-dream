const { withPayload } = require('@payloadcms/next/withPayload')

// Build remote image patterns dynamically to support Vercel and custom domains
const computeRemotePatterns = () => {
  const patterns = [
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '3000',
      pathname: '/api/media/**',
    },
    {
      protocol: 'https',
      hostname: 'localhost',
      port: '3000',
      pathname: '/api/media/**',
    },
    {
      protocol: 'https',
      hostname: '*.supabase.co',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: '*.vercel.app',
      pathname: '/api/media/**',
    },
  ]

  const { VERCEL_URL, NEXT_PUBLIC_URL } = process.env
  if (VERCEL_URL) {
    patterns.push({ protocol: 'https', hostname: VERCEL_URL, pathname: '/api/media/**' })
  }
  if (NEXT_PUBLIC_URL) {
    try {
      const { hostname } = new URL(NEXT_PUBLIC_URL)
      if (hostname) {
        patterns.push({ protocol: 'https', hostname, pathname: '/api/media/**' })
      }
    } catch {}
  }

  return patterns
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // i18n routing for App Router (Next.js 15+)
  // Note: i18n is now handled via middleware in App Router
  // See: https://nextjs.org/docs/app/building-your-application/routing/internationalization

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: computeRemotePatterns(),
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ],
      },
    ]
  },

  // Webpack configuration
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    return config
  },

}

module.exports = withPayload(nextConfig)
