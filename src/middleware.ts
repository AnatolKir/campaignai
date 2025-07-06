import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'es', 'de', 'fr', 'pt', 'br', 'it', 'ja', 'ko', 'zh', 'ar', 'hi', 'ru'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isComingSoonMode = process.env.NEXT_PUBLIC_COMING_SOON_MODE === 'true';

  // Skip middleware for API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/_vercel/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Skip i18n for coming-soon page
  if (pathname === '/coming-soon') {
    return NextResponse.next();
  }

  // Apply internationalization middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Include all routes except those that should be excluded
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Include root path
    '/',
  ],
};