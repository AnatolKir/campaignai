import { Platform } from '../utils/ai_platform_formatter';

/**
 * Internal handle database record
 */
export interface HandleRecord {
  id: string;
  source_user_id: string;
  brand_or_person_name: string | null;
  platform: Platform;
  handle: string;
  verified: boolean;
  first_seen_at: string;
  last_seen_at: string;
  created_at: string;
  updated_at: string;
}

/**
 * Input for creating a new handle record
 */
export interface CreateHandleRecord {
  source_user_id: string;
  brand_or_person_name?: string | null;
  platform: Platform;
  handle: string;
  verified?: boolean;
}

/**
 * Update data for existing handle record
 */
export interface UpdateHandleRecord {
  source_user_id?: string;
  brand_or_person_name?: string | null;
  verified?: boolean;
  last_seen_at?: string;
}

/**
 * Parsed handle data from user input
 */
export interface ParsedHandle {
  platform: Platform;
  handle: string;
  original_input: string;
  confidence: 'high' | 'medium' | 'low';
  brand_or_person_name?: string;
}

/**
 * Target account input formats
 */
export interface TargetAccountInput {
  type: 'paste' | 'csv' | 'txt';
  content: string;
  user_id: string;
}

/**
 * Handle search result
 */
export interface HandleSearchResult {
  id: string;
  brand_or_person_name: string | null;
  platform: Platform;
  handle: string;
  verified: boolean;
  usage_count: number; // How many users have submitted this handle
  platforms: Platform[]; // All platforms where this brand/person has handles
  all_handles: Record<Platform, string>; // All handles for this brand across platforms
}

/**
 * Handle verification status
 */
export interface HandleVerificationStatus {
  handle_id: string;
  verified: boolean;
  verified_by?: string;
  verified_at?: string;
  verification_method?: 'manual' | 'multi_user' | 'api_check';
}

/**
 * Platform detection patterns
 */
export interface PlatformPattern {
  platform: Platform;
  patterns: RegExp[];
  extract_handle: (match: string) => string;
  confidence: 'high' | 'medium' | 'low';
}

/**
 * Bulk import result
 */
export interface BulkImportResult {
  total_processed: number;
  successful_imports: number;
  failed_imports: number;
  duplicates_updated: number;
  new_records_created: number;
  errors: string[];
  parsed_handles: ParsedHandle[];
}

/**
 * Handle analytics
 */
export interface HandleAnalytics {
  total_handles: number;
  verified_handles: number;
  platforms_breakdown: Record<Platform, number>;
  top_brands: Array<{
    name: string;
    platform_count: number;
    total_submissions: number;
  }>;
  recent_additions: HandleRecord[];
}

/**
 * Admin dashboard data
 */
export interface AdminHandleData {
  analytics: HandleAnalytics;
  pending_verification: HandleRecord[];
  recent_activity: HandleRecord[];
  search_suggestions: string[];
} 