/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: {}
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig
