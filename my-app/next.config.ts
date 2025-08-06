/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["placehold.co"], // ✅ allow external image domain
  },
};

module.exports = nextConfig;
