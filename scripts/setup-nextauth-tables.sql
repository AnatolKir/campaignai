-- NextAuth.js Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Users table (extends your existing users table)
-- If you already have a users table, you may need to modify this
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified timestamptz;
ALTER TABLE users ADD COLUMN IF NOT EXISTS image text;

-- Accounts table for OAuth providers (if you add them later)
CREATE TABLE IF NOT EXISTS accounts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL,
  provider text NOT NULL,
  provider_account_id text NOT NULL,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(provider, provider_account_id)
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_token text NOT NULL UNIQUE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Verification tokens table (for magic link emails)
CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier text NOT NULL,
  token text NOT NULL,
  expires timestamptz NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(session_token);

-- Enable Row Level Security
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_tokens ENABLE ROW LEVEL SECURITY;

-- RLS Policies for NextAuth tables
CREATE POLICY "Users can view own accounts" ON accounts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own accounts" ON accounts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own accounts" ON accounts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own accounts" ON accounts FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own sessions" ON sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sessions" ON sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sessions" ON sessions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own sessions" ON sessions FOR DELETE USING (auth.uid() = user_id);

-- Verification tokens don't need user-specific policies as they're temporary
CREATE POLICY "Anyone can insert verification tokens" ON verification_tokens FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can select verification tokens" ON verification_tokens FOR SELECT USING (true);
CREATE POLICY "Anyone can delete verification tokens" ON verification_tokens FOR DELETE USING (true); 