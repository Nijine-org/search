/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hinez-dev.s3.amazonaws.com',
        pathname: '/**',
      }]
  },
};

export default nextConfig;
