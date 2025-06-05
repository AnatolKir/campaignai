import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Agent Training & Brand Voice Customization",
  description: "Train your Campaign.ai agent with your unique brand voice, content examples, and preferences. Customize AI behavior for authentic, on-brand social media automation that matches your style.",
  keywords: [
    "AI agent training",
    "brand voice AI",
    "AI customization",
    "AI personality training",
    "brand voice automation",
    "AI content training",
    "custom AI agent",
    "AI behavior customization",
    "brand-specific AI",
    "AI learning platform",
    "social media AI training",
    "personalized AI automation"
  ],
  openGraph: {
    title: "AI Agent Training & Brand Voice Customization | Campaign.ai",
    description: "Train your AI agent with your unique brand voice and preferences. Customize AI behavior for authentic, on-brand social media automation.",
    url: "https://campaign.ai/training",
    siteName: "Campaign.ai",
    images: [
      {
        url: "/og-training.png",
        width: 1200,
        height: 630,
        alt: "Campaign.ai AI Agent Training Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Training & Brand Voice Customization",
    description: "Train your AI agent with your unique brand voice and preferences. Customize AI behavior for authentic social media automation.",
    images: ["/twitter-training.png"],
  },
  alternates: {
    canonical: "https://campaign.ai/training",
  },
  robots: {
    index: true, // Public page should be indexed
    follow: true,
  },
};

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 