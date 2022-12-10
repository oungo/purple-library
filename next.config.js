const { withSentryConfig } = require('@sentry/nextjs');

const sentryConfig = {
  sentry: {
    hideSourceMaps: true,
  },
};

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shopping-phinf.pstatic.net',
      },
    ],
  },
  ...sentryConfig,
};

const sentryWebpackPluginOptions = { silent: true };

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
