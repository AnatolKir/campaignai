import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Campaign.ai - AI-Powered Social Media Management",
  description: "Automate your social media growth with AI. Intelligent posting, engagement, competitor analysis, and follower growth - all powered by advanced AI technology.",
  keywords: "AI social media, automated posting, social media management, competitor analysis, follower growth, engagement automation",
  authors: [{ name: "Campaign.ai Team" }],
  icons: {
    icon: [
      { url: '/logo-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' }
    ]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
