import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.externals = config.externals || [];
    config.externals.push({
      '@yaacovcr/transform': 'commonjs @yaacovcr/transform',
    });
    return config;
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'id.sky.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.skyassets.com',
      },
    ],
  },
};

export default nextConfig;
