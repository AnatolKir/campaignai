import { redirect } from 'next/navigation';

export default function RootPage() {
  // Check if coming soon mode is enabled
  if (process.env.NEXT_PUBLIC_COMING_SOON_MODE === 'true') {
    redirect('/coming-soon');
  }
  
  // Otherwise redirect to the default locale
  redirect('/en');
}