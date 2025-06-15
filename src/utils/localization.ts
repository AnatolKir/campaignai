import { useLocale } from 'next-intl';

/**
 * Hook to create locale-aware URLs
 */
export function useLocalizedUrl() {
  const locale = useLocale();
  
  const createLocalizedUrl = (path: string) => {
    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${normalizedPath}`;
  };

  return { createLocalizedUrl, locale };
}

/**
 * Utility function to create locale-aware URLs without hooks (for server components)
 */
export function createLocalizedUrl(locale: string, path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${normalizedPath}`;
}

/**
 * Extract locale from pathname
 */
export function getLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  return segments[0] || 'en';
}

/**
 * Remove locale from pathname
 */
export function removeLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0) {
    // Remove first segment (locale)
    segments.shift();
  }
  return '/' + segments.join('/');
} 