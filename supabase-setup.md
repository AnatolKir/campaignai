# 🛢️ Supabase Setup Guide for Postiz

## 📋 Quick Setup Checklist

- [ ] Create Supabase project
- [ ] Copy connection string  
- [ ] Set up authentication (optional)
- [ ] Configure storage (optional)
- [ ] Run database migrations
- [ ] Test connection

## 🚀 Supabase Project Creation

### 1. Create Project
1. Go to [supabase.com](https://supabase.com)
2. Click **"New project"**
3. Fill details:
   - **Name**: `postiz-app`
   - **Database Password**: Generate strong password (SAVE THIS!)
   - **Region**: Choose closest to your location
   - **Plan**: Free tier (fine for development)

### 2. Get Connection Details

Go to **Settings > Database** and copy:

#### Connection String (for Prisma)
```
postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

#### Direct Connection (for migrations)
```
postgresql://postgres.[project-ref]:[password]@db.[project-ref].supabase.co:5432/postgres
```

## 🔑 Environment Variables

Add these to your `.env` file (and later to Vercel):

```bash
# Supabase Database
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# Direct connection for migrations (if needed)
DIRECT_DATABASE_URL="postgresql://postgres.[project-ref]:[password]@db.[project-ref].supabase.co:5432/postgres"

# Supabase API (optional - if using Supabase auth/storage)
NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

## 🏗️ Database Schema Setup

### Option 1: Run Prisma Migrations (Recommended)

1. Install dependencies locally:
```bash
pnpm install
```

2. Generate Prisma client:
```bash
pnpm prisma generate --schema ./libraries/nestjs-libraries/src/database/prisma/schema.prisma
```

3. Push schema to database:
```bash
pnpm prisma db push --schema ./libraries/nestjs-libraries/src/database/prisma/schema.prisma
```

### Option 2: Manual SQL Setup (if migrations fail)

Go to **SQL Editor** in Supabase dashboard and run the schema manually.

## 🔐 Authentication Setup (Optional)

If you want to use Supabase Auth instead of the built-in auth:

1. Go to **Authentication > Settings**
2. Configure:
   - **Site URL**: `http://localhost:4200` (dev) / `https://your-domain.vercel.app` (prod)
   - **Redirect URLs**: Add your frontend URLs
3. Enable providers you want (Email, Google, GitHub, etc.)

## 📁 Storage Setup (Optional)

For file uploads:

1. Go to **Storage**
2. Create a bucket called `postiz-uploads`
3. Set bucket policies:

```sql
-- Allow public read access
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'postiz-uploads');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'postiz-uploads' AND auth.role() = 'authenticated');
```

## 🧪 Test Your Setup

### 1. Test Database Connection

Create a simple test file:

```bash
# Test connection
pnpm prisma db pull --schema ./libraries/nestjs-libraries/src/database/prisma/schema.prisma
```

### 2. View Your Database

In Supabase dashboard:
- Go to **Table Editor**
- You should see your tables after running migrations

## 🚨 Common Issues & Solutions

### Connection Pool Errors
- Use the pooled connection string for your app
- Use direct connection only for migrations

### Migration Timeouts
```bash
# If migrations timeout, try direct connection
DATABASE_URL="direct-connection-string" pnpm prisma db push
```

### Permission Errors
- Make sure you're using the correct password
- Check if your IP is whitelisted (Supabase allows all by default)

## 🎯 Production Considerations

### Security
- [ ] Enable Row Level Security (RLS) on sensitive tables
- [ ] Set up proper database roles
- [ ] Use environment-specific passwords

### Performance
- [ ] Add database indexes for frequently queried columns
- [ ] Set up connection pooling
- [ ] Monitor query performance in Supabase dashboard

### Backup
- [ ] Enable automated backups (available in Pro plan)
- [ ] Test restore procedures

## 📊 Monitoring

Supabase provides built-in monitoring:
- **Database**: Query performance, connections
- **API**: Request logs and analytics
- **Auth**: User analytics
- **Storage**: Usage statistics

## 🔗 Useful Supabase URLs

- **Dashboard**: `https://supabase.com/dashboard/project/[project-ref]`
- **API Docs**: `https://supabase.com/dashboard/project/[project-ref]/api`
- **Database**: `https://supabase.com/dashboard/project/[project-ref]/editor`
- **Storage**: `https://supabase.com/dashboard/project/[project-ref]/storage/buckets`

---

## 🎉 Next Steps

Once Supabase is configured:
1. ✅ Copy your DATABASE_URL
2. ✅ Test local connection
3. ✅ Deploy to Vercel with environment variables
4. ✅ Run migrations on production

Your DATABASE_URL will look like:
```
postgresql://postgres.abcdefgh:[PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

Save this for your Vercel environment variables! 