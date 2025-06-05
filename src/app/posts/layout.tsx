import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Content Creation & Post Management",
  description: "Manage your AI-generated social media content. Create, schedule, and publish posts across all platforms with intelligent content optimization and brand voice training.",
  keywords: [
    "AI content creation",
    "automated posting",
    "social media content management",
    "AI post generation",
    "content scheduling",
    "social media automation",
    "AI copywriting",
    "content calendar",
    "automated content",
    "social media posts",
    "content strategy",
    "AI writing assistant"
  ],
  openGraph: {
    title: "AI Content Creation & Post Management | Campaign.ai",
    description: "Manage your AI-generated social media content. Create, schedule, and publish posts across all platforms with intelligent optimization.",
    url: "https://campaign.ai/posts",
    siteName: "Campaign.ai",
    images: [
      {
        url: "/og-posts.png",
        width: 1200,
        height: 630,
        alt: "Campaign.ai Post Management Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Content Creation & Post Management",
    description: "Manage your AI-generated social media content. Create, schedule, and publish posts across all platforms.",
    images: ["/twitter-posts.png"],
  },
  alternates: {
    canonical: "https://campaign.ai/posts",
  },
  robots: {
    index: false, // User dashboard should not be indexed
    follow: false,
  },
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 