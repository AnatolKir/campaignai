# Coming Soon Page Implementation Template

## System Prompt for Fresh Chat
```
You are implementing a temporary "Coming Soon" landing page for Campaign AI that will:
1. Replace the current home page until launch
2. Capture early user signups with a "first 1000 users get 3 months free when we launch" offer
3. Include a hidden secure login for investors/team members to preview the actual app
4. Maintain the existing site's look and feel using the current design system

The implementation should use the existing Next.js 14 app structure, authentication system (NextAuth.js), and styling (Tailwind CSS). Ensure all changes are reversible for when the site goes live.
```

## User Prompt Template

### Project Context
**Current home page location**: `src/app/page.tsx` [Confirm/Update]
**Current authentication system**: NextAuth.js [Confirm/Update]
**Database for storing signups**: [PostgreSQL/Supabase/Other: ___________]
**Current deployment platform**: Vercel [Confirm/Update]

### Design Requirements

#### Branding & Copy
**Company Name**: Campaign AI [Confirm/Update]
**Main Headline**: [e.g., "Your AI-Powered Automated Campaign Management Tool"]
**Sub-headline**: [e.g., "Coming Soon - Be Among the First to Experience..."]
**Value Propositions** (list 3-5 key features/benefits):
1. ______________________
2. ______________________
3. ______________________
4. ______________________
5. ______________________

**Call-to-Action Text**: [Sign on to be a beta tester for free unlimited access for 3 months!]
**Success Message**: [Thank you for expressing your interest in our beta program. We will notify you when it is your turn to take it for a 3-month test drive!]
**Email Confirmation**: [Should we send a confirmation email? Y]

#### Visual Design
**Use existing components from**: `src/components/` 
**Hero section style**: [Centered]
**Should include**:
- [ ] Logo/Brand mark
- [ ] Hero image/illustration 
- [ ] Footer with legal links

### Technical Implementation

#### Signup Form Requirements
**Fields to collect**:
- [ ] Email (required)
- [ ] Full Name
- [ ] Company Name
- [ ] Phone Number
- [ ] Role/Title
- [ ] How did you hear about us?
- [ ] Other: ___________

**Signup tracking needs**:
- [ ] Track signup order (for "first 1000")
- [ ] Track referral source/UTM parameters
- [ ] Track signup timestamp
- [ ] Store in database table: `early_access_signups` [Confirm table name]

#### Hidden Investor Login
**Access URL path**: [e.g., `/preview`, `/investor-access`, etc.: _______]
**Authentication method**:
- [ ] Special access code/password

**After investor login, redirect to**: [`/dashboard`]

### Security & Privacy
**Rate limiting for signups**: [max 5 signups per IP per hour]
**GDPR/Privacy compliance**:
- [ ] Privacy policy link required
- [ ] Terms of service link required
- [ ] Explicit consent checkbox for marketing emails
- [ ] Data processing location disclosure

**Secure the investor login with**:
- [ ] Environment variable for access code
- [ ] Database table for authorized emails
- [ ] Audit log for access attempts

### Launch Readiness
**How to switch from coming soon to live site**:
- [ ] Environment variable toggle (COMING_SOON_MODE=true/false)

**What happens to early access signups when site goes live**:
- [ ] Automatic account creation with temporary password
- [ ] Email with special onboarding link

### Additional Features
**Analytics tracking**:
- [ ] Google Analytics

**SEO requirements**:
- **Page title**: AI-Powered Automated Campaign Management Tool
- **Meta description**: AI-Powered Automated Campaign Management Tool"
- **Open Graph image**: "Campaign AI logo on gradient background with 'Coming Soon'
  text" and "Abstract AI visualization with company branding"

**Performance requirements**:
- [ ] Server-side rendered for SEO

### File Structure Preferences
**Where to place new components**: 
- [ ] Create `src/components/ComingSoon/` directory
- [ ] Add to existing `src/components/`

**Where to place utility functions**:
- [ ] `src/lib/early-access/`
- [ ] `src/utils/`

### Testing Requirements
- [ ] Unit tests for signup form validation
- [ ] Integration tests for signup flow
- [ ] E2E tests for investor login
- [ ] Manual QA checklist


---

## Instructions for Use
1. Fill out all sections above, replacing placeholders with actual values
2. For checkboxes, mark with [x] for items you want included
3. Add any additional requirements in the Questions/Concerns section
4. Copy the completed template and system prompt into a fresh chat
5. Paste this filled template as your user prompt

## Example User Prompt Start
"I need to implement a coming soon page based on the following requirements: [paste completed template]"