// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      // any other hosts you pull images from:
      // 'res.cloudinary.com',
      // 'lh3.googleusercontent.com',
    ],
  },
  // ...other Next.js settings
};

export default nextConfig;
