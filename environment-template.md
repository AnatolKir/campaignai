# Environment Variables Guide for Vercel Deployment

Copy these environment variables to your Vercel dashboard:

## Core Configuration (Required)
```
FRONTEND_URL=https://your-domain.vercel.app
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
NOT_SECURED=false
```

## Database (Required)
```
DATABASE_URL=postgresql://user:password@host:port/database
```

## Redis (Required)
```
REDIS_URL=redis://user:password@host:port
```

## JWT & Security (Required)
```
JWT_SECRET=your-very-long-random-jwt-secret
ENCRYPTION_KEY=your-32-character-encryption-key
```

## Email Service (Required for user management)
```
EMAIL_FROM_ADDRESS=noreply@yourdomain.com
RESEND_API_KEY=re_your-resend-api-key
```

## Social Media Integrations (Optional)
```
# YouTube/Google
YOUTUBE_CLIENT_ID=your-youtube-client-id
YOUTUBE_CLIENT_SECRET=your-youtube-client-secret

# GitHub
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Farcaster
NEYNAR_SECRET_KEY=your-neynar-secret-key
NEYNAR_CLIENT_ID=your-neynar-client-id

# Telegram
TELEGRAM_BOT_NAME=your-bot-name
```

## Payment Processing (Optional)
```
STRIPE_PUBLISHABLE_KEY=pk_live_or_pk_test_...
STRIPE_SECRET_KEY=sk_live_or_sk_test_...
STRIPE_SIGNING_KEY=whsec_...
```

## Storage Configuration
```
STORAGE_PROVIDER=local
NEXT_PUBLIC_UPLOAD_STATIC_DIRECTORY=/uploads
```

## AI Services (Optional)
```
OPENAI_API_KEY=sk-your-openai-api-key
NEXT_PUBLIC_POLOTNO=your-polotno-key
```

## Analytics & Tracking (Optional)
```
NEXT_PUBLIC_TOLT=your-tolt-id
NEXT_PUBLIC_FACEBOOK_PIXEL=your-pixel-id
```

## Development Settings
```
IS_GENERAL=false
DISABLE_REGISTRATION=false
DISABLE_IMAGE_COMPRESSION=false
```

## Support
```
NEXT_PUBLIC_DISCORD_SUPPORT=https://discord.gg/your-server
``` 