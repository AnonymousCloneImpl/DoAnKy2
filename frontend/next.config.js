/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        DOMAIN: process.env.DOMAIN,
    },
    webpack: (config, {isServer}) => {
        return config;
    },
    images: {
        domains: ['product.hstatic.net'],
    }
}

module.exports = nextConfig
