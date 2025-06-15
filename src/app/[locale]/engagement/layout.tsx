import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Smart Engagement & Automated Interactions",
  description: "Manage your AI agent's intelligent engagement strategy. Follow up to 10,000 accounts, automate comments and likes, and build authentic relationships that grow your following organically.",
  keywords: [
    "AI engagement automation",
    "smart social media engagement",
    "automated commenting",
    "AI follower growth",
    "social media automation",
    "engagement bot",
    "automated likes",
    "social media interactions",
    "AI relationship building",
    "organic follower growth",
    "engagement strategy",
    "automated social engagement"
  ],
  openGraph: {
    title: "AI Smart Engagement & Automated Interactions | Campaign.ai",
    description: "Manage your AI agent's intelligent engagement strategy. Follow up to 10,000 accounts and automate interactions for organic growth.",
    url: "https://campaign.ai/engagement",
    siteName: "Campaign.ai",
    images: [
      {
        url: "/og-engagement.png",
        width: 1200,
        height: 630,
        alt: "Campaign.ai Engagement Management Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Smart Engagement & Automated Interactions",
    description: "Manage your AI agent's intelligent engagement strategy. Follow up to 10,000 accounts and automate interactions for organic growth.",
    images: ["/twitter-engagement.png"],
  },
  alternates: {
    canonical: "https://campaign.ai/engagement",
  },
  robots: {
    index: false, // User dashboard should not be indexed
    follow: false,
  },
};

export default function EngagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 