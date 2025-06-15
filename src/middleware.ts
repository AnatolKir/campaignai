import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es', 'de', 'fr', 'pt', 'br', 'it', 'ja', 'ko', 'zh', 'ar', 'hi', 'ru'],
  
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Always use locale prefix
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames, but exclude API routes and static files
  matcher: [
    // Exclude all API routes and static files
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
    // Include root path
    '/', 
    // Include localized paths
    '/(de|en|es|fr|pt|br|it|ja|ko|zh|ar|hi|ru)/:path*'
  ]
}; 