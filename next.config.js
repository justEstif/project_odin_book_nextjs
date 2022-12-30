/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["loremflickr.com"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
