import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Social Media Analytics & Performance Insights",
  description: "Track your AI agent's social media performance with detailed analytics, engagement metrics, follower growth, and ROI insights. Advanced reporting for data-driven social media strategies.",
  keywords: [
    "social media analytics",
    "AI performance metrics",
    "engagement analytics", 
    "follower growth tracking",
    "social media ROI",
    "AI agent analytics",
    "social media insights",
    "performance dashboard",
    "social media reporting",
    "engagement tracking",
    "social media metrics",
    "AI automation analytics"
  ],
  openGraph: {
    title: "AI Social Media Analytics & Performance Insights | Campaign.ai",
    description: "Track your AI agent's social media performance with detailed analytics, engagement metrics, and ROI insights.",
    url: "https://campaign.ai/analytics",
    siteName: "Campaign.ai",
    images: [
      {
        url: "/og-analytics.png",
        width: 1200,
        height: 630,
        alt: "Campaign.ai Analytics Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Social Media Analytics & Performance Insights",
    description: "Track your AI agent's social media performance with detailed analytics, engagement metrics, and ROI insights.",
    images: ["/twitter-analytics.png"],
  },
  alternates: {
    canonical: "https://campaign.ai/analytics",
  },
  robots: {
    index: false, // Analytics should not be indexed (user dashboard)
    follow: false,
  },
};

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 