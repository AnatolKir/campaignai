import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '../types/supabase'

// Client-side Supabase client for use in Client Components
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
  )
} 