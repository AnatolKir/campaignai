# Campaign AI - Coming Soon Page

This is a simple, standalone coming soon page for Campaign AI.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env.local` and add your Supabase credentials

3. Run the development server:
```bash
npm run dev
```

## Deployment

This site should be deployed to:
- **soon.campaignai.com** - The coming soon page
- **campaignai.com** - Should redirect to soon.campaignai.com

## DNS Setup

### In your DNS provider:

1. Create CNAME records:
   - `soon` → `cname.vercel-dns.com`
   - `dev` → `cname.vercel-dns.com`

2. Update A record for root domain:
   - `@` → Vercel IP (76.76.21.21)

### In Vercel:

1. Deploy this project to Vercel
2. Add custom domain: `soon.campaignai.com`
3. For the main app, add custom domain: `dev.campaignai.com`
4. Set up redirects in the main app to redirect root to soon.campaignai.com