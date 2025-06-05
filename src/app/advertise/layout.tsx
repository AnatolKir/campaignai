import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Powered Social Media Advertising & Campaign Management",
  description: "Automate your social media advertising with Campaign.ai's AI agents. Optimize ad campaigns, manage budgets, and maximize ROAS across all social platforms with intelligent automation.",
  keywords: [
    "AI social media advertising",
    "automated ad campaigns",
    "social media ad management",
    "AI advertising optimization",
    "automated marketing campaigns",
    "social media ads automation",
    "AI ad targeting",
    "programmatic advertising",
    "social media marketing automation",
    "AI campaign management",
    "automated ad optimization",
    "social media ROAS"
  ],
  openGraph: {
    title: "AI-Powered Social Media Advertising & Campaign Management | Campaign.ai",
    description: "Automate your social media advertising with AI agents. Optimize ad campaigns, manage budgets, and maximize ROAS across all platforms.",
    url: "https://campaign.ai/advertise",
    siteName: "Campaign.ai",
    images: [
      {
        url: "/og-advertise.png",
        width: 1200,
        height: 630,
        alt: "Campaign.ai AI Advertising Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered Social Media Advertising & Campaign Management",
    description: "Automate your social media advertising with AI agents. Optimize ad campaigns and maximize ROAS across all platforms.",
    images: ["/twitter-advertise.png"],
  },
  alternates: {
    canonical: "https://campaign.ai/advertise",
  },
  robots: {
    index: true, // Public page should be indexed
    follow: true,
  },
};

export default function AdvertiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 