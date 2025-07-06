# 🚀 Coming Soon Mode Deployment Guide

## 🎯 **QUICK FIX: Why You're Not Seeing Coming Soon Page**

The coming soon page exists but `NEXT_PUBLIC_COMING_SOON_MODE` is not set to `'true'` in production.

## 📋 **REQUIRED ENVIRONMENT VARIABLES**

Set these in your Vercel deployment:

```bash
# CRITICAL: Enable coming soon mode
NEXT_PUBLIC_COMING_SOON_MODE=true

# Investor access (change this!)
INVESTOR_MASTER_CODE=YOUR_SECURE_CODE_HERE

# Email configuration
EMAIL_FROM=noreply@campaign.ai
RESEND_API_KEY=your_resend_api_key

# Supabase (required for early access signups)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional: Error tracking
SENTRY_DSN=your_sentry_dsn
SENTRY_ENVIRONMENT=production
```

## 🏗️ **DEPLOYMENT SETUP**

### **Domain Configuration:**
- `soon.campaign.ai` → Deploy this repository
- `campaign.ai` → Redirect to `soon.campaign.ai`
- `dev.campaign.ai` → Main Campaign AI application

### **Vercel Setup:**
1. Deploy this repository to Vercel
2. Configure custom domain: `soon.campaign.ai`
3. Set environment variables (above)
4. Configure `campaign.ai` to redirect to `soon.campaign.ai`

## 💾 **DATABASE SETUP**

Run this in your Supabase SQL editor:

```sql
-- Create early access signups table
CREATE TABLE IF NOT EXISTS early_access_signups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source VARCHAR(100) DEFAULT 'coming-soon',
    metadata JSONB DEFAULT '{}'
);

-- Add investor access table
CREATE TABLE IF NOT EXISTS investor_access (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    access_code VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_used_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE
);

-- Add RLS policies
ALTER TABLE early_access_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_access ENABLE ROW LEVEL SECURITY;

-- Allow inserts for early access signups
CREATE POLICY "Allow anonymous early access signups" ON early_access_signups
    FOR INSERT WITH CHECK (true);

-- Allow selects for investor access
CREATE POLICY "Allow investor access lookup" ON investor_access
    FOR SELECT USING (true);
```

## 🔧 **TESTING LOCALLY**

```bash
# 1. Clone this repository
git clone https://github.com/AnatolKir/campaign-ai-coming-soon.git
cd campaign-ai-coming-soon

# 2. Install dependencies
npm install

# 3. Create .env.local (copy from .env.coming-soon.example)
cp .env.coming-soon.example .env.local

# 4. Edit .env.local with your values
# Set NEXT_PUBLIC_COMING_SOON_MODE=true

# 5. Start development server
npm run dev
```

## 🔄 **TOGGLE MODES**

**Enable Coming Soon Mode:**
```
NEXT_PUBLIC_COMING_SOON_MODE=true
```

**Disable Coming Soon Mode (show main site):**
```
NEXT_PUBLIC_COMING_SOON_MODE=false
```

## ⚠️ **IMPORTANT NOTES**

1. **Railway Integration**: Check if `campaignai-production.up.railway.app` is still needed
2. **Copy Update**: Main site currently says "Campaign Management" - should be "Social Media Management"
3. **Port Management**: Fixed in this repository (removed hardcoded ports)
4. **Twenty CRM**: Ready to integrate after coming soon deployment

## 🆘 **TROUBLESHOOTING**

**Issue**: Still seeing main site instead of coming soon page
**Solution**: Verify `NEXT_PUBLIC_COMING_SOON_MODE=true` is set in production environment

**Issue**: Database errors
**Solution**: Run the SQL setup script in Supabase

**Issue**: Email confirmations not working
**Solution**: Configure `RESEND_API_KEY` and `EMAIL_FROM`

## 📞 **NEXT STEPS**

1. Set environment variables in Vercel
2. Deploy to `soon.campaign.ai`
3. Configure `campaign.ai` redirect
4. Test the coming soon page
5. Update main site copy ("Social Media Management")
6. Integrate Twenty CRM when ready 