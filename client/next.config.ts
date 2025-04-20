
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'images.unsplash.com', 
    ],
  },
  reactStrictMode: true, 
};

export default nextConfig;
