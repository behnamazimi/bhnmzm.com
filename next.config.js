/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    APP_URL: process.env.APP_URL,
    SECURE_TOKEN: process.env.SECURE_TOKEN,
  },
}

module.exports = nextConfig
