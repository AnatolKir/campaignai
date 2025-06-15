# 🚀 Vercel Environment Variables Setup

## 📋 **Required Environment Variables**

Add these to your Vercel project settings:

### **Anthropic Claude API**
```
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
```

### **Cloudinary API**
```
CLOUDINARY_CLOUD_NAME=dhkt9iulh
CLOUDINARY_API_KEY=119161354195747
CLOUDINARY_API_SECRET=your-actual-secret-from-dashboard
```

## 🔧 **How to Add in Vercel:**

1. **Go to Vercel Dashboard**
   - Navigate to your project
   - Click "Settings" tab
   - Click "Environment Variables" in sidebar

2. **Add Each Variable:**
   - Click "Add New"
   - Enter Name (e.g., `ANTHROPIC_API_KEY`)
   - Enter Value (your actual API key)
   - Select environments: **Production** and **Preview**
   - Click "Save"

3. **Repeat for all 4 variables**

## 🎯 **Environment Selection:**
- ✅ **Production**: For your live site
- ✅ **Preview**: For preview deployments (recommended)
- ❌ **Development**: Not needed (uses your local `.env.local`)

## 🔄 **After Adding Variables:**
1. **Redeploy**: Trigger a new deployment for changes to take effect
2. **Test**: Verify API calls work in production

## 🛡️ **Security Notes:**
- ✅ These are **server-side only** - never exposed to browser
- ✅ Vercel encrypts all environment variables
- ✅ Only your server-side API routes can access them
- ❌ Never commit `.env.local` to git

## 🧪 **Testing Production:**
After deployment, test:
1. Upload an image → click "Auto-resize" (tests Cloudinary)
2. Add content → click "AI Optimize" (tests Anthropic)
3. Check browser console for any errors

## 💡 **Pro Tips:**
- Use the same values from your local `.env.local`
- Copy-paste to avoid typos
- Test in Preview environment first
- Keep API keys secure and rotate them periodically

## 🆘 **Troubleshooting:**
- **API calls failing?** Check variable names match exactly
- **Still using mock data?** Verify variables are set in correct environment
- **Deployment issues?** Check Vercel function logs for errors
