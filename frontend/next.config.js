/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        DOMAIN: process.env.DOMAIN,
    },
    images: {
        domains: ['cdn2.cellphones.com.vn', 'cdn.tgdd.vn', 'images.acer.com', 'asus.com', 'img.freepik.com', 'dlcdnwebimgs.asus.com', 'product.hstatic.net']
    },
    experimental: {
        scrollRestoration: true,
    },
}

module.exports = nextConfig
