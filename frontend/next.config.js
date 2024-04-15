/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DOMAIN: process.env.DOMAIN,
  },
  images: {
    remotePatterns: [
      { hostname: 'cdn2.cellphones.com.vn' },
      { hostname: 'cdn.tgdd.vn' },
      { hostname: 'images.acer.com' },
      { hostname: 'asus.com' },
      { hostname: 'img.freepik.com' },
      { hostname: 'dlcdnwebimgs.asus.com' },
      { hostname: 'product.hstatic.net' }
    ]
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig
