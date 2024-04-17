/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DOMAIN: process.env.DOMAIN,
    PAYPAL_ID: process.env.PAYPAL_ID,
    PAYPAL_SECRET: process.env.PAYPAL_SECRET,
  },
  images: {
    remotePatterns: [
      { hostname: 'cdn2.cellphones.com.vn' },
      { hostname: 'cdn.tgdd.vn' },
      { hostname: 'images.acer.com' },
      { hostname: 'asus.com' },
      { hostname: 'img.freepik.com' },
      { hostname: 'dlcdnwebimgs.asus.com' },
      { hostname: 'product.hstatic.net' },
      { hostname: '192.168.31.69'},
      { hostname: 'localhost'}
    ]
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig
