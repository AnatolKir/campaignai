import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Campaign.ai - Create Post',
  description: 'Easily create, schedule, and publish AI-powered posts optimized for every social media platform.',
  keywords: [
    'social media posting',
    'AI content creation', 
    'multi-platform posting',
    'social media automation',
    'content scheduling',
    'Instagram posts',
    'Twitter posts',
    'LinkedIn posts',
    'TikTok posts',
    'YouTube posts'
  ],
  openGraph: {
    title: 'Campaign.ai - Create Post',
    description: 'Easily create, schedule, and publish AI-powered posts optimized for every social media platform.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Campaign.ai - Create Post',
    description: 'Easily create, schedule, and publish AI-powered posts optimized for every social media platform.',
  },
};

export default function CreatePostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 