-- Migration: Create handle_database table for Campaign.ai
-- Description: Stores user-submitted social media handles for internal use
-- Run this in your Supabase SQL editor

-- Create enum for platforms
CREATE TYPE platform_type AS ENUM (
  'instagram',
  'twitter_x', 
  'linkedin',
  'tiktok',
  'youtube',
  'reddit',
  'discord',
  'telegram',
  'whatsapp_business',
  'threads'
);

-- Create handle_database table
CREATE TABLE handle_database (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_user_id TEXT NOT NULL,
  brand_or_person_name TEXT,
  platform platform_type NOT NULL,
  handle TEXT NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_handle_database_platform_handle ON handle_database(platform, handle);
CREATE INDEX idx_handle_database_brand_name ON handle_database(brand_or_person_name);
CREATE INDEX idx_handle_database_source_user ON handle_database(source_user_id);
CREATE INDEX idx_handle_database_verified ON handle_database(verified);
CREATE INDEX idx_handle_database_last_seen ON handle_database(last_seen_at DESC);

-- Create unique constraint on platform + handle combination
CREATE UNIQUE INDEX idx_handle_database_platform_handle_unique ON handle_database(platform, LOWER(handle));

-- Add text search index for brand names
CREATE INDEX idx_handle_database_brand_search ON handle_database USING gin(to_tsvector('english', brand_or_person_name));

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_handle_database_updated_at
  BEFORE UPDATE ON handle_database
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add Row Level Security (RLS) policies
ALTER TABLE handle_database ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert their own handle submissions
CREATE POLICY "Users can insert their own handle submissions" ON handle_database
  FOR INSERT WITH CHECK (true); -- Allow all authenticated users to insert

-- Policy: Users can view all handle records (for search functionality)
CREATE POLICY "Users can view all handle records" ON handle_database
  FOR SELECT USING (true); -- Allow all authenticated users to read

-- Policy: Users can update records they submitted
CREATE POLICY "Users can update their own submissions" ON handle_database
  FOR UPDATE USING (auth.uid()::text = source_user_id);

-- Policy: Only authenticated users can delete (admin functionality)
CREATE POLICY "Authenticated users can delete" ON handle_database
  FOR DELETE USING (auth.role() = 'authenticated');

-- Insert some seed data for testing
INSERT INTO handle_database (source_user_id, brand_or_person_name, platform, handle, verified) VALUES
  ('system', 'Nike', 'instagram', 'nike', true),
  ('system', 'Nike', 'twitter_x', 'Nike', true),
  ('system', 'Nike', 'linkedin', 'nike', true),
  ('system', 'Nike', 'tiktok', 'nike', true),
  ('system', 'Nike', 'youtube', 'nike', true),
  ('system', 'Nike', 'threads', 'nike', true),
  
  ('system', 'Apple', 'instagram', 'apple', true),
  ('system', 'Apple', 'twitter_x', 'Apple', true),
  ('system', 'Apple', 'linkedin', 'apple', true),
  ('system', 'Apple', 'tiktok', 'apple', true),
  ('system', 'Apple', 'youtube', 'Apple', true),
  ('system', 'Apple', 'threads', 'apple', true),
  
  ('system', 'Tesla', 'instagram', 'teslamotors', true),
  ('system', 'Tesla', 'twitter_x', 'Tesla', true),
  ('system', 'Tesla', 'linkedin', 'tesla-motors', true),
  ('system', 'Tesla', 'tiktok', 'tesla', true),
  ('system', 'Tesla', 'youtube', 'tesla', true),
  ('system', 'Tesla', 'threads', 'tesla', true),
  
  ('system', 'Microsoft', 'instagram', 'microsoft', true),
  ('system', 'Microsoft', 'twitter_x', 'Microsoft', true),
  ('system', 'Microsoft', 'linkedin', 'microsoft', true),
  ('system', 'Microsoft', 'tiktok', 'microsoft', true),
  ('system', 'Microsoft', 'youtube', 'Microsoft', true),
  ('system', 'Microsoft', 'threads', 'microsoft', true),
  
  ('system', 'Google', 'instagram', 'google', true),
  ('system', 'Google', 'twitter_x', 'Google', true),
  ('system', 'Google', 'linkedin', 'google', true),
  ('system', 'Google', 'tiktok', 'google', true),
  ('system', 'Google', 'youtube', 'Google', true),
  ('system', 'Google', 'threads', 'google', true);

-- Create a view for analytics
CREATE VIEW handle_database_analytics AS
SELECT 
  COUNT(*) as total_handles,
  COUNT(*) FILTER (WHERE verified = true) as verified_handles,
  COUNT(DISTINCT brand_or_person_name) as unique_brands,
  COUNT(DISTINCT source_user_id) as contributing_users,
  platform,
  COUNT(*) as platform_count
FROM handle_database 
GROUP BY platform;

-- Grant permissions for the analytics view
GRANT SELECT ON handle_database_analytics TO authenticated;

-- Create function for fuzzy search
CREATE OR REPLACE FUNCTION search_handles(search_query TEXT, result_limit INTEGER DEFAULT 10)
RETURNS TABLE (
  id UUID,
  brand_or_person_name TEXT,
  platform platform_type,
  handle TEXT,
  verified BOOLEAN,
  usage_count BIGINT,
  similarity_score REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    h.id,
    h.brand_or_person_name,
    h.platform,
    h.handle,
    h.verified,
    COUNT(*) OVER (PARTITION BY h.brand_or_person_name) as usage_count,
    GREATEST(
      similarity(LOWER(h.brand_or_person_name), LOWER(search_query)),
      similarity(LOWER(h.handle), LOWER(search_query))
    ) as similarity_score
  FROM handle_database h
  WHERE 
    h.brand_or_person_name ILIKE '%' || search_query || '%'
    OR h.handle ILIKE '%' || search_query || '%'
    OR to_tsvector('english', h.brand_or_person_name) @@ plainto_tsquery('english', search_query)
  ORDER BY 
    h.verified DESC,
    similarity_score DESC,
    h.last_seen_at DESC
  LIMIT result_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the search function
GRANT EXECUTE ON FUNCTION search_handles TO authenticated;

-- Add comments for documentation
COMMENT ON TABLE handle_database IS 'Stores user-submitted social media handles for internal Campaign.ai use';
COMMENT ON COLUMN handle_database.source_user_id IS 'ID of the user who submitted this handle';
COMMENT ON COLUMN handle_database.brand_or_person_name IS 'Name of the brand or person (nullable)';
COMMENT ON COLUMN handle_database.platform IS 'Social media platform enum';
COMMENT ON COLUMN handle_database.handle IS 'Normalized handle without @ symbol';
COMMENT ON COLUMN handle_database.verified IS 'Whether this handle has been manually verified';
COMMENT ON COLUMN handle_database.first_seen_at IS 'When this handle was first submitted';
COMMENT ON COLUMN handle_database.last_seen_at IS 'When this handle was last seen/updated';

-- TODO: Add periodic background job to validate handles (check if they still exist / are active)
-- TODO: Support "preferred platform" per handle when multiple handles exist for same brand  
-- TODO: Add admin dashboard view of full handle database
-- TODO: Enable user opt-in to contribute handles to global knowledge base 