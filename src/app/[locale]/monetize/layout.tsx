import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monetize Your Social Media with AI Automation",
  description: "Turn your social media presence into revenue with Campaign.ai's AI agents. Automate affiliate marketing, sponsorship management, and audience monetization strategies for maximum ROI.",
  keywords: [
    "social media monetization",
    "AI monetization strategies",
    "automated affiliate marketing",
    "social media revenue",
    "influencer monetization",
    "AI marketing automation",
    "social media ROI",
    "automated income",
    "content monetization",
    "social media business",
    "AI revenue generation",
    "digital marketing automation"
  ],
  openGraph: {
    title: "Monetize Your Social Media with AI Automation | Campaign.ai",
    description: "Turn your social media presence into revenue with AI agents. Automate affiliate marketing, sponsorship management, and monetization strategies.",
    url: "https://campaign.ai/monetize",
    siteName: "Campaign.ai",
    images: [
      {
        url: "/og-monetize.png",
        width: 1200,
        height: 630,
        alt: "Campaign.ai Social Media Monetization Features",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monetize Your Social Media with AI Automation",
    description: "Turn your social media presence into revenue with AI agents. Automate affiliate marketing and monetization strategies.",
    images: ["/twitter-monetize.png"],
  },
  alternates: {
    canonical: "https://campaign.ai/monetize",
  },
  robots: {
    index: true, // Public page should be indexed
    follow: true,
  },
};

export default function MonetizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 