# 🚀 Complete Setup Guide

## ✅ Current Status
Your social media tool is **fully functional right now** with:
- ✅ Realistic platform previews (Twitter, Instagram, LinkedIn, Facebook)
- ✅ Client-side image resizing and optimization  
- ✅ Manual text editing for each platform
- ✅ Media upload with drag & drop
- ✅ Mock AI optimization (platform-specific content adaptation)
- ✅ Revert functionality for all optimizations

## 🔧 API Integration Setup

### 1. Anthropic Claude (Text Optimization)

#### Get Your API Key:
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up/login and create an API key
3. Copy your API key

#### Add to Environment:
1. Open `.env.local` (already created for you)
2. Replace `your_anthropic_api_key_here` with your actual key:
```bash
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
```

#### Cost: ~$0.01-0.03 per optimization (very affordable!)

### 2. Cloudinary (Advanced Media Processing)

#### Get Your Credentials:
1. Sign up at [Cloudinary](https://cloudinary.com/) (free tier available)
2. Go to your Dashboard
3. Copy: Cloud Name, API Key, API Secret

#### Setup Upload Preset:
1. In Cloudinary Dashboard → Settings → Upload
2. Click "Add upload preset"
3. Set Mode to "Unsigned"
4. Name it: `unsigned_preset`
5. Under "Allowed formats" add: `jpg,png,gif,mp4,mov,avi,webm`
6. Save

#### Add to Environment:
Replace the placeholders in `.env.local`:
```bash
CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your-actual-secret
```

#### What Cloudinary Adds:
- ✨ Professional image optimization and compression
- 🎥 Video transcoding and compression
- 📱 Automatic format conversion (WebP, AVIF)
- ⚡ CDN delivery for fast loading
- 🎯 Platform-specific sizing and cropping

### 3. Install Required Packages

Try these commands (if they fail due to dependency conflicts, the system will still work with fallbacks):

```bash
# For Anthropic (if npm install fails, the API will use fetch directly)
npm install @anthropic-ai/sdk

# For Cloudinary (optional - we use direct API calls)
npm install cloudinary
```

**Don't worry if these fail!** The system is designed to work without the SDKs using direct API calls.

## 🎯 Testing Your Setup

### Test Anthropic Integration:
1. Add your API key to `.env.local`
2. Restart your dev server: `npm run dev`
3. Go to create-post page
4. Add some content and click "AI Optimize" on any platform
5. You should see improved, platform-specific content

### Test Cloudinary Integration:
1. Add your credentials to `.env.local`
2. Create the unsigned upload preset (see above)
3. Upload an image and click "Auto-resize"
4. Images will be professionally optimized and resized

## 🔄 Restart Required

After adding API keys to `.env.local`, restart your development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## 💡 Pro Tips

1. **Start with Anthropic** - It provides the biggest immediate value for content optimization
2. **Cloudinary is optional** - Your current client-side image processing already works great
3. **Free tiers available** - Both services offer generous free usage
4. **Gradual setup** - Add one service at a time and test

## 🆘 Troubleshooting

### If npm install fails:
- Don't worry! The APIs work with direct fetch calls
- Your system will automatically fall back to mock/client-side processing

### If API calls fail:
- Check your API keys are correct in `.env.local`
- Restart your dev server after adding keys
- Check the browser console for error messages

### Environment variables not working:
- Make sure `.env.local` is in your project root (same level as `package.json`)
- Restart your dev server after changes
- Don't commit `.env.local` to git (it's already in `.gitignore`)

## 🎉 You're All Set!

Your social media management tool will now have:
- 🤖 **Real AI optimization** with Anthropic Claude
- 🖼️ **Professional media processing** with Cloudinary
- 📱 **Perfect platform previews** showing exactly how posts will look
- ⚡ **Lightning-fast performance** with smart fallbacks

Enjoy your professional-grade social media management system! 🚀 