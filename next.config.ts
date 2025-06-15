import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  // Use the new serverExternalPackages instead of experimental.serverComponentsExternalPackages
  serverExternalPackages: [],
  // Configure next-intl with UTC timezone
  env: {
    NEXT_INTL_TIMEZONE: 'UTC',
    TZ: 'UTC',
  },
};

export default withNextIntl(nextConfig);
