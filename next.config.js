/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  env: {
    SENDGRID: process.env.NEXT_PUBLIC_SENDGRID,
  },
};

module.exports = nextConfig;
