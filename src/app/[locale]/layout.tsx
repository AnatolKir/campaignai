import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Inter } from "next/font/google";
import { getMessages } from 'next-intl/server';
import Providers from '@/providers/Providers';
import { getLanguageConfig } from '@/lib/languages';
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const locales = ['en', 'es', 'de', 'fr', 'pt', 'br', 'it', 'ja', 'ko', 'zh', 'ar', 'hi', 'ru'];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    notFound();
  }

  // Get messages for the locale - explicitly pass the locale
  const messages = await getMessages({ locale });
  
  // Get language configuration for proper text direction and styling
  const languageConfig = getLanguageConfig(locale);

  return (
    <html lang={locale} dir={languageConfig.direction}>
      <body className={`${inter.variable} antialiased`}>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}