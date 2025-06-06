import { Metadata } from "next";
import { BrandProvider } from "../../contexts/BrandContext";

export const metadata: Metadata = {
  title: "Brand Management - Campaign.ai",
  description: "Manage your brands, settings, and team access across all your social media campaigns.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BrandSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BrandProvider>
      {children}
    </BrandProvider>
  );
} 