# Campaign AI Domain Setup Guide

## Overview

We're separating the coming soon page from the main app:
- **campaignai.com** → Redirects to soon.campaignai.com
- **soon.campaignai.com** → Simple coming soon page
- **dev.campaignai.com** → Full application (password protected)

## Step 1: Deploy the Coming Soon Site

1. Initialize git in the coming-soon-site folder:
```bash
cd coming-soon-site
git init
git add .
git commit -m "Initial commit - simple coming soon page"
```

2. Create a new GitHub repository for the coming soon site
3. Push to GitHub:
```bash
git remote add origin https://github.com/AnatolKir/campaignai-coming-soon.git
git push -u origin main
```

4. Deploy to Vercel:
   - Go to vercel.com
   - Click "New Project"
   - Import the campaignai-coming-soon repository
   - Add environment variables:
     - NEXT_PUBLIC_SUPABASE_URL
     - SUPABASE_SERVICE_ROLE_KEY
   - Deploy

## Step 2: DNS Configuration

### In your DNS provider (e.g., Cloudflare, GoDaddy):

1. Add CNAME records:
   ```
   Type: CNAME
   Name: soon
   Target: cname.vercel-dns.com
   
   Type: CNAME
   Name: dev
   Target: cname.vercel-dns.com
   ```

2. Update root domain A record:
   ```
   Type: A
   Name: @
   Target: 76.76.21.21
   ```

## Step 3: Vercel Domain Configuration

### For the Coming Soon Site:
1. Go to your coming soon project in Vercel
2. Go to Settings → Domains
3. Add domain: `soon.campaignai.com`
4. Add domain: `campaignai.com`
5. Set up redirect from campaignai.com to soon.campaignai.com

### For the Main App:
1. Go to your main app project in Vercel
2. Go to Settings → Domains
3. Remove `campaignai.com` if it's there
4. Add domain: `dev.campaignai.com`

## Step 4: Password Protection for Dev Site

### Option 1: Vercel Password Protection (Pro plan required)
1. In Vercel project settings for main app
2. Go to Settings → Security
3. Enable Password Protection
4. Set a password

### Option 2: Basic Auth Middleware (Free)
Create `middleware.ts` in your main app:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get('authorization');
  const url = request.nextUrl;

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (user === 'admin' && pwd === 'your-secure-password') {
      return NextResponse.next();
    }
  }

  url.pathname = '/api/auth';
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};
```

And create `/app/api/auth/route.ts`:

```typescript
export async function GET() {
  return new Response('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
```

## Step 5: Environment Variables

### For Coming Soon Site (soon.campaignai.com):
- NEXT_PUBLIC_SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

### For Main App (dev.campaignai.com):
- All existing environment variables
- Remove NEXT_PUBLIC_COMING_SOON_MODE

## Step 6: Testing

1. Wait for DNS propagation (5-30 minutes)
2. Test domains:
   - `campaignai.com` → Should redirect to `soon.campaignai.com`
   - `soon.campaignai.com` → Should show coming soon page
   - `dev.campaignai.com` → Should show password prompt, then main app

## Benefits of This Approach

1. **Clean Separation**: Coming soon page is completely isolated
2. **No Build Conflicts**: Simple page won't be affected by complex app issues
3. **Easy Updates**: Can update either site independently
4. **Better Performance**: Coming soon page loads instantly
5. **Proper Dev Environment**: Password-protected dev site for testing

## Migration Path

When ready to launch:
1. Remove password protection from dev site
2. Update DNS to point campaignai.com to main app
3. Archive or redirect soon.campaignai.com