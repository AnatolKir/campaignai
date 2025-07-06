# Coming Soon Page Optimization - Chat Prompts

## System Prompt

You are helping optimize a coming soon page for Campaign AI to maximize email signups and conversions. The page is already live and working at soon.campaign.ai.

CONTEXT:
- Campaign AI is an AI-powered social media management platform
- Target audience: Social media managers, marketing agencies, small businesses
- Current promise: "Be among the first 1,000 users to get 3 months free"
- The page currently has a simple design with email signup

TECHNICAL DETAILS:
- Built with Next.js 14, TypeScript, and Tailwind CSS
- Supabase for database (early_access_signups table)
- Resend for sending thank you emails
- Deployed on Vercel
- Repository: https://github.com/AnatolKir/campaignai-coming-soon
- Local path: /Users/ricklatona/Desktop/campaignainew/coming-soon-site/

OPTIMIZATION GOALS:
1. Increase email signup conversion rate
2. Better communicate the product value proposition
3. Build trust and credibility
4. Create urgency without being pushy
5. Ensure mobile optimization

AVAILABLE FOR ENHANCEMENTS:
- Full design control with Tailwind CSS
- Can add animations, gradients, effects
- Can modify copy and messaging
- Can add social proof elements
- Can integrate analytics (GA, Mixpanel, etc.)
- Can add countdown timers or progress bars
- Can A/B test different versions

## User Prompt

I have a working coming soon page for Campaign AI at soon.campaign.ai. It's currently a simple page with an email signup form. I want to optimize it for better conversions.

Current page elements:
- Heading: "Campaign AI - Coming Soon"
- Subheading: "AI-powered social media management that works 24/7 to grow your brand"
- Email input with "Join Waitlist" button
- Text: "Be among the first 1,000 users to get 3 months free!"
- Success state shows position in waitlist
- Purple/pink gradient background

Here are some ideas I'm considering:
1. Add social proof (e.g., "Join 500+ marketers already on the waitlist")
2. List key benefits/features that will be available
3. Add urgency elements (countdown, limited spots)
4. Include testimonials or logos of interested companies
5. Add animations or interactive elements
6. Improve the value proposition messaging
7. Add FAQ section
8. Include founder/team credibility markers

The code is at: /Users/ricklatona/Desktop/campaignainew/coming-soon-site/src/app/page.tsx

Can you help me implement changes that will maximize conversions? I'm open to any suggestions based on conversion optimization best practices.

## Additional Context for Assistant

Key files to modify:
- `/src/app/page.tsx` - Main page component
- `/src/app/globals.css` - Global styles
- `/src/app/api/early-access/route.ts` - API endpoint (if we need to track additional data)

Current tech stack:
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Supabase for database
- Resend for emails

The assistant should:
1. Suggest specific conversion optimization improvements
2. Implement changes with clean, maintainable code
3. Ensure all changes are mobile-responsive
4. Consider page load speed
5. Maintain the existing functionality while enhancing it
6. Test that email signups still work after changes