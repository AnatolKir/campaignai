import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/analytics/',
          '/engagement/',
          '/posts/',
          '/accounts/',
          '/billing/',
          '/users/',
          '/brand-settings/',
          '/customize-agent/',
          '/agent-settings/',
        ],
      },
    ],
    sitemap: 'https://campaign.ai/sitemap.xml',
  };
} 