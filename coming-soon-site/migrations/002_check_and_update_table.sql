-- First, let's check if the table exists and what columns it has
-- Run this query first to see the current structure:
-- SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'early_access_signups';

-- Drop the existing table if it exists (BE CAREFUL - this will delete existing data!)
-- Only run this if you're okay with losing existing signup data
DROP TABLE IF EXISTS early_access_signups;

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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_early_access_signups_email ON early_access_signups(email);
CREATE INDEX IF NOT EXISTS idx_early_access_signups_signup_order ON early_access_signups(signup_order);
CREATE INDEX IF NOT EXISTS idx_early_access_signups_created_at ON early_access_signups(created_at);
CREATE INDEX IF NOT EXISTS idx_early_access_signups_role ON early_access_signups(role);
CREATE INDEX IF NOT EXISTS idx_early_access_signups_company_size ON early_access_signups(company_size);

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

-- Verify the table was created correctly
SELECT 'Table created successfully' as status; 