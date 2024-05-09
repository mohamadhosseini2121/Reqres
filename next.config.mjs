/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{protocol: 'https', hostname: 'reqres.in'}],
  },
};

export default nextConfig;
