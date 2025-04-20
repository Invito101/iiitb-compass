
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'images.unsplash.com', // Required for Unsplash images in TeamPage.tsx
    ],
  },
  reactStrictMode: true, // Enables React Strict Mode for better error reporting
};

export default nextConfig;
