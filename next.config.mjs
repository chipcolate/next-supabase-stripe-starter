import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      { hostname: 'files.stripe.com' },
      { hostname: 'd1wqzb5bdbcre6.cloudfront.net' },
      { hostname: '*.blob.vercel-storage.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default withNextIntl(nextConfig);
