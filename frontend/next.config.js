/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        DOMAIN: process.env.DOMAIN,
    },
    images: {
        domains: ['product.hstatic.net'],
    }
}

module.exports = nextConfig
