import type { NextConfig } from 'next';
import { networkInterfaces } from 'node:os';

function isPrivateIpv4(address: string): boolean {
  const [first, second] = address.split('.').map(Number);

  return (
    first === 10 ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168)
  );
}

function getPrivateNetworkOrigins(): string[] {
  return Object.values(networkInterfaces())
    .flatMap((addresses) => addresses ?? [])
    .filter(
      ({ address, family, internal }) =>
        family === 'IPv4' && !internal && isPrivateIpv4(address),
    )
    .map(({ address }) => address);
}

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',

  // Hide the Next.js development indicator
  devIndicators: false,

  allowedDevOrigins:
    process.env.NODE_ENV === 'development' ? getPrivateNetworkOrigins() : [],

  experimental: {
    agentFeedback: true,
  },

  cacheComponents: true,
  partialPrefetching: true,

  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
