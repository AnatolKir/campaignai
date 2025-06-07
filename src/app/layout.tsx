import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BrandProvider } from "../contexts/BrandContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Campaign.ai - AI-Powered Social Media Management Platform",
    template: "%s | Campaign.ai"
  },
  description: "Automate your social media growth with AI agents that create content, engage audiences, manage DMs, analyze competitors, and grow your following across all platforms. Join 1,200+ brands using Campaign.ai for 24/7 social media automation.",
  keywords: [
    "AI social media management",
    "automated posting",
    "social media automation", 
    "AI content creation",
    "competitor analysis",
    "follower growth",
    "engagement automation",
    "social media AI",
    "Instagram automation",
    "Twitter automation",
    "LinkedIn automation",
    "TikTok automation",
    "social media analytics",
    "AI chatbot",
    "DM automation",
    "social media scheduling",
    "brand management",
    "influencer marketing"
  ],
  authors: [{ name: "Campaign.ai Team", url: "https://campaign.ai" }],
  creator: "Campaign.ai",
  publisher: "Campaign.ai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://campaign.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://campaign.ai",
    siteName: "Campaign.ai",
    title: "Campaign.ai - AI-Powered Social Media Management Platform",
    description: "Automate your social media growth with AI agents that create content, engage audiences, manage DMs, analyze competitors, and grow your following across all platforms.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Campaign.ai - AI-Powered Social Media Management Platform",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@campaignai",
    creator: "@campaignai",
    title: "Campaign.ai - AI-Powered Social Media Management Platform",
    description: "Automate your social media growth with AI agents that create content, engage audiences, manage DMs, analyze competitors, and grow your following across all platforms.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#8b5cf6"
      }
    ]
  },
  manifest: "/site.webmanifest",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Campaign.ai",
    "application-name": "Campaign.ai",
    "msapplication-TileColor": "#8b5cf6",
    "theme-color": "#8b5cf6",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8b5cf6" },
    { media: "(prefers-color-scheme: dark)", color: "#8b5cf6" }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Campaign.ai",
              "description": "AI-powered social media management platform that automates content creation, engagement, DM management, and competitor analysis across all social platforms.",
              "url": "https://campaign.ai",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free trial available"
              },
              "author": {
                "@type": "Organization",
                "name": "Campaign.ai"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1200"
              },
              "featureList": [
                "AI Content Creation",
                "Smart Engagement",
                "DM Automation", 
                "Competitor Analysis",
                "Multi-platform Support",
                "24/7 AI Agent Activity",
                "Advanced Analytics",
                "Brand Voice Training"
              ]
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        <BrandProvider>
          {children}
        </BrandProvider>
      </body>
    </html>
  );
}
