import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Campaign.ai",
  description: "AI-powered social media management dashboard with real-time insights and automation.",
  robots: {
    index: false,
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