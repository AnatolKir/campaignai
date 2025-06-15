'use client';

import React, { ChangeEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Extract current locale from pathname
  const segments = pathname.split('/');
  const currentLocale = segments[1]; // first path segment

  const supportedLocales = ['en', 'es', 'de', 'fr', 'br', 'it', 'ja', 'zh'];

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;

    // Replace locale in pathname
    const newPathname = '/' + [newLocale, ...segments.slice(2)].join('/');

    router.push(newPathname);
  };

  return (
    <select
      onChange={handleChange}
      value={currentLocale}
      className="language-switcher bg-gray-800 text-white px-2 py-1 rounded"
    >
      {supportedLocales.map((loc) => (
        <option key={loc} value={loc}>
          {loc.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;