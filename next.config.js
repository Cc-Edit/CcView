/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['echarts', 'zrender']);
const nextConfig = withTM({
  eslint: {
    dirs: ['src/'] // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.vercel.com',
        port: '',
        pathname: '/image/upload/**'
      }
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    });
    return config;
  },
  devIndicators: {
    buildActivity: false
  }
});

module.exports = nextConfig;
