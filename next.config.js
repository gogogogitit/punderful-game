/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v0.dev',
        port: '',
        pathname: '/placeholder.svg/**',
      },
    ],
  },
}

module.exports = nextConfig