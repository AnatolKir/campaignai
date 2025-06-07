import { createBrowserClient } from '@supabase/ssr';
import { Database } from '../types/supabase';
import { 
  HandleRecord, 
  CreateHandleRecord, 
  UpdateHandleRecord, 
  HandleSearchResult,
  BulkImportResult,
  ParsedHandle
} from '../types/handle-database';
import { normalizeHandle, validateHandle } from '../utils/handle-parser';
import { Platform } from '../utils/ai_platform_formatter';

const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Create a new handle record in the database
 */
export async function createHandleRecord(data: CreateHandleRecord): Promise<HandleRecord | null> {
  try {
    const normalizedHandle = normalizeHandle(data.handle, data.platform);
    
    if (!validateHandle(normalizedHandle, data.platform)) {
      throw new Error(`Invalid handle format for ${data.platform}: ${data.handle}`);
    }

    const now = new Date().toISOString();
    
    const { data: record, error } = await supabase
      .from('handle_database')
      .insert({
        source_user_id: data.source_user_id,
        brand_or_person_name: data.brand_or_person_name,
        platform: data.platform,
        handle: normalizedHandle,
        verified: data.verified || false,
        first_seen_at: now,
        last_seen_at: now,
        created_at: now,
        updated_at: now
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating handle record:', error);
      return null;
    }

    return record as HandleRecord;
  } catch (error) {
    console.error('Error in createHandleRecord:', error);
    return null;
  }
}

/**
 * Update existing handle record or create if doesn't exist
 */
export async function upsertHandleRecord(data: CreateHandleRecord): Promise<HandleRecord | null> {
  try {
    const normalizedHandle = normalizeHandle(data.handle, data.platform);
    
    // Check if handle already exists for this platform
    const { data: existing, error: searchError } = await supabase
      .from('handle_database')
      .select('*')
      .eq('platform', data.platform)
      .eq('handle', normalizedHandle)
      .single();

    if (searchError && searchError.code !== 'PGRST116') {
      console.error('Error searching for existing handle:', searchError);
      return null;
    }

    const now = new Date().toISOString();

    if (existing) {
      // Update existing record
      const { data: updated, error: updateError } = await supabase
        .from('handle_database')
        .update({
          source_user_id: data.source_user_id,
          brand_or_person_name: data.brand_or_person_name || existing.brand_or_person_name,
          last_seen_at: now,
          updated_at: now
        })
        .eq('id', existing.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating handle record:', updateError);
        return null;
      }

      return updated as HandleRecord;
    } else {
      // Create new record
      return await createHandleRecord(data);
    }
  } catch (error) {
    console.error('Error in upsertHandleRecord:', error);
    return null;
  }
}

/**
 * Search handles by brand name or handle
 */
export async function searchHandles(query: string, limit: number = 10): Promise<HandleSearchResult[]> {
  try {
    const searchTerm = `%${query.toLowerCase()}%`;
    
    const { data, error } = await supabase
      .from('handle_database')
      .select('*')
      .or(`brand_or_person_name.ilike.${searchTerm},handle.ilike.${searchTerm}`)
      .order('verified', { ascending: false })
      .order('last_seen_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error searching handles:', error);
      return [];
    }

    // Group results by brand/person name to show cross-platform handles
    const grouped = new Map<string, HandleSearchResult>();
    
    for (const record of data) {
      const key = record.brand_or_person_name || record.handle;
      
      if (grouped.has(key)) {
        const existing = grouped.get(key)!;
        existing.platforms.push(record.platform as Platform);
        existing.all_handles[record.platform as Platform] = record.handle;
        existing.usage_count += 1;
      } else {
        grouped.set(key, {
          id: record.id,
          brand_or_person_name: record.brand_or_person_name,
          platform: record.platform as Platform,
          handle: record.handle,
          verified: record.verified,
          usage_count: 1,
          platforms: [record.platform as Platform],
          all_handles: { [record.platform as Platform]: record.handle } as Record<Platform, string>
        });
      }
    }

    return Array.from(grouped.values());
  } catch (error) {
    console.error('Error in searchHandles:', error);
    return [];
  }
}

/**
 * Get handles for a specific brand across all platforms
 */
export async function getBrandHandles(brandName: string): Promise<Record<Platform, string>> {
  try {
    const { data, error } = await supabase
      .from('handle_database')
      .select('platform, handle')
      .ilike('brand_or_person_name', `%${brandName}%`)
      .order('verified', { ascending: false });

    if (error) {
      console.error('Error getting brand handles:', error);
      return {} as Record<Platform, string>;
    }

    const handles: Record<Platform, string> = {} as Record<Platform, string>;
    
    for (const record of data) {
      handles[record.platform as Platform] = record.handle;
    }

    return handles;
  } catch (error) {
    console.error('Error in getBrandHandles:', error);
    return {} as Record<Platform, string>;
  }
}

/**
 * Bulk import parsed handles
 */
export async function bulkImportHandles(
  parsedHandles: ParsedHandle[],
  userId: string
): Promise<BulkImportResult> {
  const result: BulkImportResult = {
    total_processed: parsedHandles.length,
    successful_imports: 0,
    failed_imports: 0,
    duplicates_updated: 0,
    new_records_created: 0,
    errors: [],
    parsed_handles: parsedHandles
  };

  for (const parsed of parsedHandles) {
    try {
      const handleData: CreateHandleRecord = {
        source_user_id: userId,
        brand_or_person_name: parsed.brand_or_person_name,
        platform: parsed.platform,
        handle: parsed.handle,
        verified: false
      };

      // Check if this is an update or new record
      const normalizedHandle = normalizeHandle(parsed.handle, parsed.platform);
      const { data: existing } = await supabase
        .from('handle_database')
        .select('id')
        .eq('platform', parsed.platform)
        .eq('handle', normalizedHandle)
        .single();

      const record = await upsertHandleRecord(handleData);
      
      if (record) {
        result.successful_imports++;
        if (existing) {
          result.duplicates_updated++;
        } else {
          result.new_records_created++;
        }
      } else {
        result.failed_imports++;
        result.errors.push(`Failed to import: ${parsed.original_input}`);
      }
    } catch (error) {
      result.failed_imports++;
      result.errors.push(`Error importing ${parsed.original_input}: ${error}`);
    }
  }

  return result;
}

/**
 * Mark a handle as verified
 */
export async function verifyHandle(handleId: string, verifiedBy: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('handle_database')
      .update({
        verified: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', handleId);

    if (error) {
      console.error('Error verifying handle:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in verifyHandle:', error);
    return false;
  }
}

/**
 * Get popular handles (most frequently submitted)
 */
export async function getPopularHandles(limit: number = 20): Promise<HandleSearchResult[]> {
  try {
    // Simplified version - get most recently used verified handles first
    const { data, error } = await supabase
      .from('handle_database')
      .select('*')
      .order('verified', { ascending: false })
      .order('last_seen_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error getting popular handles:', error);
      return [];
    }

    return data.map((record: any) => ({
      id: record.id,
      brand_or_person_name: record.brand_or_person_name,
      platform: record.platform as Platform,
      handle: record.handle,
      verified: record.verified,
      usage_count: 1, // TODO: Implement proper usage counting
      platforms: [record.platform as Platform],
      all_handles: { [record.platform as Platform]: record.handle } as Record<Platform, string>
    }));
  } catch (error) {
    console.error('Error in getPopularHandles:', error);
    return [];
  }
}

/**
 * Get handles by platform
 */
export async function getHandlesByPlatform(platform: Platform, limit: number = 50): Promise<HandleRecord[]> {
  try {
    const { data, error } = await supabase
      .from('handle_database')
      .select('*')
      .eq('platform', platform)
      .order('verified', { ascending: false })
      .order('last_seen_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error getting handles by platform:', error);
      return [];
    }

    return data as HandleRecord[];
  } catch (error) {
    console.error('Error in getHandlesByPlatform:', error);
    return [];
  }
}

/**
 * Delete a handle record (admin only)
 */
export async function deleteHandleRecord(handleId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('handle_database')
      .delete()
      .eq('id', handleId);

    if (error) {
      console.error('Error deleting handle record:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteHandleRecord:', error);
    return false;
  }
}

// TODO: Add periodic background job to validate handles (check if they still exist / are active)
// TODO: Support "preferred platform" per handle when multiple handles exist for same brand
// TODO: Add admin dashboard view of full handle database
// TODO: Enable user opt-in to contribute handles to global knowledge base 