-- First, let's see what views depend on the table
-- SELECT * FROM information_schema.views WHERE table_name = 'early_access_signups';

-- Drop the table and all dependent objects (views, etc.)
DROP TABLE IF EXISTS early_access_signups CASCADE;

-- Create the new table with the correct structure
CREATE TABLE early_access_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN (
    'owner_founder', 'ceo', 'cmo', 'marketing_director', 'marketing_manager',
    'social_media_manager', 'digital_marketing_manager', 'content_manager',
    'marketing_coordinator', 'junior_marketing_specialist', 'freelancer_consultant',
    'agency_owner', 'other'
  )),
  company_size VARCHAR(20) NOT NULL CHECK (company_size IN (
    'solopreneur', '2-5', '6-10', '11-25', '26-50', '51-100', '101-500', '501+'
  )),
  monthly_marketing_spend VARCHAR(20) NOT NULL CHECK (monthly_marketing_spend IN (
    '0-500', '501-1000', '1001-2500', '2501-5000', '5001-10000', 
    '10001-25000', '25001-50000', '50001+'
  )),
  weekly_hours_on_social VARCHAR(10) NOT NULL CHECK (weekly_hours_on_social IN (
    '0-2', '3-5', '6-10', '11-20', '21-30', '31-40', '40+'
  )),
  team_size VARCHAR(10) NOT NULL CHECK (team_size IN (
    '0', '1', '2-3', '4-5', '6-10', '11+'
  )),
  current_tools TEXT[] DEFAULT '{}',
  biggest_challenge TEXT NOT NULL,
  primary_goal TEXT NOT NULL,
  consented_to_marketing BOOLEAN NOT NULL DEFAULT false,
  signup_order INTEGER NOT NULL,
  source VARCHAR(50) NOT NULL DEFAULT 'coming_soon_page',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recreate the stats view that was likely dropped
CREATE OR REPLACE VIEW early_access_stats AS
SELECT 
  COUNT(*) as total_signups,
  COUNT(CASE WHEN consented_to_marketing = true THEN 1 END) as consented_signups,
  COUNT(CASE WHEN created_at >= NOW() - INTERVAL '24 hours' THEN 1 END) as signups_last_24h,
  COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as signups_last_7d,
  COUNT(CASE WHEN created_at >= NOW() - INTERVAL '30 days' THEN 1 END) as signups_last_30d,
  -- Role distribution
  COUNT(CASE WHEN role = 'owner_founder' THEN 1 END) as owner_founders,
  COUNT(CASE WHEN role = 'ceo' THEN 1 END) as ceos,
  COUNT(CASE WHEN role = 'cmo' THEN 1 END) as cmos,
  COUNT(CASE WHEN role = 'marketing_manager' THEN 1 END) as marketing_managers,
  COUNT(CASE WHEN role = 'social_media_manager' THEN 1 END) as social_media_managers,
  -- Company size distribution
  COUNT(CASE WHEN company_size = 'solopreneur' THEN 1 END) as solopreneurs,
  COUNT(CASE WHEN company_size = '2-5' THEN 1 END) as small_companies,
  COUNT(CASE WHEN company_size = '6-10' THEN 1 END) as medium_companies,
  COUNT(CASE WHEN company_size = '11-25' THEN 1 END) as larger_companies,
  COUNT(CASE WHEN company_size = '26-50' THEN 1 END) as big_companies,
  COUNT(CASE WHEN company_size = '51-100' THEN 1 END) as enterprise_companies,
  COUNT(CASE WHEN company_size = '101-500' THEN 1 END) as large_enterprise,
  COUNT(CASE WHEN company_size = '501+' THEN 1 END) as major_enterprise,
  -- Marketing spend distribution
  COUNT(CASE WHEN monthly_marketing_spend = '0-500' THEN 1 END) as low_spend,
  COUNT(CASE WHEN monthly_marketing_spend = '501-1000' THEN 1 END) as low_mid_spend,
  COUNT(CASE WHEN monthly_marketing_spend = '1001-2500' THEN 1 END) as mid_spend,
  COUNT(CASE WHEN monthly_marketing_spend = '2501-5000' THEN 1 END) as high_mid_spend,
  COUNT(CASE WHEN monthly_marketing_spend = '5001-10000' THEN 1 END) as high_spend,
  COUNT(CASE WHEN monthly_marketing_spend = '10001-25000' THEN 1 END) as very_high_spend,
  COUNT(CASE WHEN monthly_marketing_spend = '25001-50000' THEN 1 END) as premium_spend,
  COUNT(CASE WHEN monthly_marketing_spend = '50001+' THEN 1 END) as enterprise_spend
FROM early_access_signups;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_early_access_signups_email ON early_access_signups(email);
CREATE INDEX IF NOT EXISTS idx_early_access_signups_signup_order ON early_access_signups(signup_order);
CREATE INDEX IF NOT EXISTS idx_early_access_signups_created_at ON early_access_signups(created_at);
CREATE INDEX IF NOT EXISTS idx_early_access_signups_role ON early_access_signups(role);
CREATE INDEX IF NOT EXISTS idx_early_access_signups_company_size ON early_access_signups(company_size);
CREATE INDEX IF NOT EXISTS idx_early_access_signups_monthly_spend ON early_access_signups(monthly_marketing_spend);
CREATE INDEX IF NOT EXISTS idx_early_access_signups_consented ON early_access_signups(consented_to_marketing);

-- Create or replace the update function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS update_early_access_signups_updated_at ON early_access_signups;
CREATE TRIGGER update_early_access_signups_updated_at
    BEFORE UPDATE ON early_access_signups
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert a comment about the table purpose
COMMENT ON TABLE early_access_signups IS 'Stores early access signup data for Campaign AI coming soon page with comprehensive marketing data for CRM integration';

-- Verify the table and view were created correctly
SELECT 'Table and view created successfully' as status;

-- Show the new table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'early_access_signups'
ORDER BY ordinal_position; 