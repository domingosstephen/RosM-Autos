import type { NextConfig } from 'next'

/**
 * SOP §3.1.4 — Security headers:
 *   X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
 *   Permissions-Policy, X-XSS-Protection.
 *   HSTS is handled at the hosting layer (Vercel / CDN), not Next.js headers.
 */
const securityHeaders = [
  // Prevent MIME-type sniffing
  { key: 'X-Content-Type-Options',  value: 'nosniff' },
  // Block clickjacking
  { key: 'X-Frame-Options',         value: 'SAMEORIGIN' },
  // Enable XSS filter in legacy browsers
  { key: 'X-XSS-Protection',        value: '1; mode=block' },
  // Referrer-Policy — send origin on same-site, nothing cross-site
  { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
  // Permissions-Policy — restrict sensitive browser APIs
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()',
    ].join(', '),
  },
  // DNS prefetch for performance
  { key: 'X-DNS-Prefetch-Control',  value: 'on' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },

  // Security headers on every response (SOP §3.1.4)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
