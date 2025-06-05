import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Agent Dashboard - Social Media Management Control Center",
  description: "Monitor your AI social media agent's 24/7 activity, engagement metrics, content creation, and performance across all platforms. Complete control over your automated social media presence.",
  keywords: [
    "AI agent dashboard",
    "social media dashboard",
    "AI automation control",
    "social media analytics",
    "AI agent monitoring",
    "automated posting dashboard",
    "engagement analytics",
    "social media management dashboard",
    "AI performance tracking",
    "multi-platform dashboard"
  ],
  openGraph: {
    title: "AI Agent Dashboard - Complete Social Media Control | Campaign.ai",
    description: "Monitor your AI social media agent's 24/7 activity, engagement metrics, and performance across all platforms.",
    url: "https://campaign.ai/dashboard",
    siteName: "Campaign.ai",
    images: [
      {
        url: "/og-dashboard.png",
        width: 1200,
        height: 630,
        alt: "Campaign.ai AI Agent Dashboard Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Dashboard - Complete Social Media Control",
    description: "Monitor your AI social media agent's 24/7 activity, engagement metrics, and performance across all platforms.",
    images: ["/twitter-dashboard.png"],
  },
  alternates: {
    canonical: "https://campaign.ai/dashboard",
  },
  robots: {
    index: false, // Dashboard should not be indexed
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 