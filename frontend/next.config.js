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
        remotePatterns: [
            {
                protocol: "https",
                hostname: "hanoicomputer.net",
            },
            {
                protocol: "https",
                hostname: "hanoicomputercdn.com",
            }
        ]
    }
}

module.exports = nextConfig
