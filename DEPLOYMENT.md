# 🚀 Deployment Guide: GitHub + Vercel

This guide will help you deploy your Postiz app to Vercel with proper GitHub integration.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier works)
- Database (PostgreSQL) - try [Supabase](https://supabase.com) or [Neon](https://neon.tech)
- Redis instance - try [Upstash](https://upstash.com) (free tier available)

## 🔧 Step 1: Set Up GitHub Repository

### Option A: Fork the Original Repository (Recommended)
1. Go to [https://github.com/gitroomhq/postiz-app](https://github.com/gitroomhq/postiz-app)
2. Click **"Fork"** in the top right
3. This creates a copy in your GitHub account

### Option B: Create New Repository
1. Create a new repository on GitHub
2. Change your remote origin:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

## 🔄 Step 2: Push Your Changes

```bash
# Add all changes
git add .

# Commit your changes
git commit -m "feat: Configure for Vercel deployment"

# Push to GitHub
git push -u origin main
```

## ☁️ Step 3: Deploy to Vercel

### Connect GitHub Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect it's a Next.js project

### Configure Project Settings
1. **Framework Preset**: Next.js
2. **Root Directory**: Leave empty (monorepo detected automatically)
3. **Build & Output Settings**: 
   - Build Command: `cd apps/frontend && pnpm build`
   - Output Directory: `apps/frontend/.next`
   - Install Command: `pnpm install --frozen-lockfile`

## 🔑 Step 4: Configure Environment Variables

In your Vercel dashboard, go to **Settings > Environment Variables** and add:

### Required Variables
```
FRONTEND_URL=https://your-app-name.vercel.app
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
DATABASE_URL=postgresql://user:password@host:port/database
REDIS_URL=redis://user:password@host:port
JWT_SECRET=your-very-long-random-secret-minimum-32-characters
ENCRYPTION_KEY=your-32-character-encryption-key
EMAIL_FROM_ADDRESS=noreply@yourdomain.com
RESEND_API_KEY=re_your-resend-api-key
STORAGE_PROVIDER=local
NEXT_PUBLIC_UPLOAD_STATIC_DIRECTORY=/uploads
```

### Optional but Recommended
```
# For AI features
OPENAI_API_KEY=sk-your-openai-api-key

# For payments
STRIPE_PUBLISHABLE_KEY=pk_test_your-key
STRIPE_SECRET_KEY=sk_test_your-key

# Social media integrations
YOUTUBE_CLIENT_ID=your-client-id
YOUTUBE_CLIENT_SECRET=your-client-secret
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret
```

> 💡 **Tip**: Check `environment-template.md` for the complete list of variables.

## 🛠️ Step 5: Set Up Backend Services

### Database (PostgreSQL)
1. **Supabase** (Recommended):
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Get connection string from Settings > Database
   - Add as `DATABASE_URL`

2. **Neon** (Alternative):
   - Go to [neon.tech](https://neon.tech)
   - Create database
   - Copy PostgreSQL connection string

### Redis
1. **Upstash** (Recommended):
   - Go to [upstash.com](https://upstash.com)
   - Create Redis database
   - Copy connection URL
   - Add as `REDIS_URL`

### Email Service
1. **Resend** (Recommended):
   - Go to [resend.com](https://resend.com)
   - Create account and get API key
   - Add as `RESEND_API_KEY`

## 🏗️ Step 6: Deploy

1. Click **"Deploy"** in Vercel
2. Wait for build to complete (first build might take 3-5 minutes)
3. Your app will be available at `https://your-app-name.vercel.app`

## 🔧 Step 7: Post-Deployment Setup

### Database Migration
Since this is a full-stack app, you'll need to run database migrations:

1. Install Vercel CLI: `npm i -g vercel`
2. Link your project: `vercel link`
3. Run migrations: `vercel env pull && pnpm prisma db push`

### Custom Domain (Optional)
1. In Vercel dashboard, go to **Settings > Domains**
2. Add your custom domain
3. Update `FRONTEND_URL` environment variable

## 🚨 Common Issues & Solutions

### Build Failures
- **pnpm not found**: Vercel should auto-detect pnpm from `package.json`
- **Out of memory**: Contact Vercel support for build timeout increase

### Runtime Errors
- **Environment variables**: Double-check all required variables are set
- **Database connection**: Ensure DATABASE_URL is correct and accessible
- **CORS issues**: Make sure FRONTEND_URL matches your actual domain

### Performance
- **Cold starts**: Consider upgrading to Vercel Pro for better performance
- **Database connections**: Use connection pooling for production

## 📝 Environment Variables Quick Reference

### Minimal Setup (Just to get it running)
```
FRONTEND_URL=https://your-app.vercel.app
NEXT_PUBLIC_BACKEND_URL=https://your-backend.com
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=your-long-secret
STORAGE_PROVIDER=local
```

### Production Ready
- Add all social media API keys
- Configure Stripe for payments
- Set up email service
- Add analytics tracking
- Configure file storage (S3/Cloudflare)

## 🎉 You're Live!

Your Postiz app should now be running on Vercel! 

### Next Steps:
1. Create your first user account
2. Configure social media integrations
3. Set up team collaboration
4. Start scheduling posts!

### Need Help?
- Check the [official docs](https://docs.postiz.com)
- Join the [Discord community](https://discord.postiz.com)
- Review the environment variables in `environment-template.md`

---

**Pro Tip**: Use Vercel's preview deployments to test changes before deploying to production. Every pull request gets its own preview URL! 