/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations for PDF serving
  async headers() {
    return [
      {
        // Apply headers to PDF files
        source: '/brochure.pdf',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/pdf',
          },
          {
            key: 'Content-Disposition',
            value: 'inline; filename="Event Brochure.pdf"',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ]
  },
  
  // Optimize for production
  compress: true,
  poweredByHeader: false,
  
  // Ensure proper static file serving
  trailingSlash: false,
  
  // Production build optimizations
  swcMinify: true,
  
  // Image optimization
  images: {
    unoptimized: true, // For static exports if needed
  },
}

module.exports = nextConfig