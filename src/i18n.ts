import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// ALIGNED WITH MIDDLEWARE - exact same order and locales
const locales = ['en', 'es', 'de', 'fr', 'pt', 'br', 'it', 'ja', 'ko', 'zh', 'ar', 'hi', 'ru'];

export default getRequestConfig(async ({ locale }) => {
  console.log('getRequestConfig called with locale:', locale);
  console.log('Type of locale:', typeof locale);
  
  // Handle undefined locale parameter with proper fallback
  if (!locale || !locales.includes(locale)) {
    console.log('Invalid locale:', locale, 'Available locales:', locales);
    locale = 'en';
  }

  console.log('Using locale:', locale);

  try {
    const messages = (await import(`./messages/${locale}.json`)).default;
    console.log('Successfully loaded messages for locale:', locale);
    
    return {
      locale,
      messages,
      // Explicitly set UTC timezone to prevent environment fallback warnings
      timeZone: 'UTC',
      now: new Date(),
      // Additional timezone configuration
      formats: {
        dateTime: {
          short: {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC'
          }
        }
      }
    };
  } catch (error) {
    console.error('Failed to load messages for locale:', locale, error);
    // Fallback to English if message loading fails
    const messages = (await import(`./messages/en.json`)).default;
    return {
      locale: 'en',
      messages,
      // Ensure UTC timezone in fallback as well
      timeZone: 'UTC',
      now: new Date(),
      formats: {
        dateTime: {
          short: {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC'
          }
        }
      }
    };
  }
}); 