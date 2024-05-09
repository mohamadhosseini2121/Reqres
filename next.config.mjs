/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['reqres.in'],
    remotePatterns: [{protocol: 'https', hostname: 'reqres.in'}],
  },
};

export default nextConfig;
