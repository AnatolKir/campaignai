"use client";

import Link from 'next/link';
import { useLocalizedUrl } from '../utils/localization';
import { ComponentProps } from 'react';

interface LocalizedLinkProps extends Omit<ComponentProps<typeof Link>, 'href'> {
  href: string;
  external?: boolean;
}

/**
 * A Link component that automatically adds locale prefixes to internal links
 */
export function LocalizedLink({ href, external = false, children, ...props }: LocalizedLinkProps) {
  const { createLocalizedUrl } = useLocalizedUrl();

  // If it's an external link or already has a protocol, use as-is
  if (external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  // For internal links, add locale prefix
  const localizedHref = createLocalizedUrl(href);

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
} 