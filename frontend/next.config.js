/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        DOMAIN: process.env.DOMAIN,
    },
    excludeFile: (str) => str.endsWith('favicon.ico'),
    webpack: (config, {isServer}) => {
        return config;
    },
    images: {
        domains: ['product.hstatic.net'],
    }
}

module.exports = nextConfig
