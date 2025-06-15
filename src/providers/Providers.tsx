'use client';

import { NextIntlClientProvider } from 'next-intl';
import { BrandProvider } from '../contexts/BrandContext';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
  locale: string;
  messages?: any;
}

export default function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <BrandProvider>
        {children}
      </BrandProvider>
    </NextIntlClientProvider>
  );
} 