/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  transpilePackages: ['sanity', 'next-sanity'],

  async headers() {
    return [
      {
        source: "/studio/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.sentry.io",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://cdn.sanity.io https://*.supabase.co https://images.unsplash.com",
              "connect-src 'self' https://*.supabase.co https://*.upstash.io https://api.frankfurter.app https://*.sentry.io https://sandbox.safaricom.co.ke https://api.safaricom.co.ke",
              "frame-src 'self' https://www.google.com https://*.sanity.io",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  // ISR revalidation
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },

  async redirects() {
    return [
      {
        source: '/about',
        destination: '/galore',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
