import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaign.ai Pricing Plans - Affordable AI Social Media Management",
  description: "Choose the perfect Campaign.ai plan for your business. Affordable AI social media automation starting at $99/month. Free trial available. No setup fees, cancel anytime.",
  keywords: [
    "Campaign.ai pricing",
    "AI social media pricing",
    "social media automation cost",
    "AI agent pricing",
    "social media management plans",
    "automated posting pricing",
    "AI marketing pricing",
    "social media automation plans",
    "affordable AI tools",
    "social media software pricing",
    "AI content creation pricing",
    "social media ROI"
  ],
  openGraph: {
    title: "Campaign.ai Pricing Plans - Affordable AI Social Media Management",
    description: "Choose the perfect AI social media automation plan for your business. Starting at $99/month with free trial available.",
    url: "https://campaign.ai/upgrade",
    siteName: "Campaign.ai",
    images: [
      {
        url: "/og-pricing.png",
        width: 1200,
        height: 630,
        alt: "Campaign.ai Pricing Plans and Features",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Campaign.ai Pricing Plans - Affordable AI Social Media Management",
    description: "Choose the perfect AI social media automation plan for your business. Starting at $99/month with free trial.",
    images: ["/twitter-pricing.png"],
  },
  alternates: {
    canonical: "https://campaign.ai/upgrade",
  },
  robots: {
    index: true, // Pricing page should be indexed
    follow: true,
  },
};

export default function UpgradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 