# Handle Database System 🎯

Campaign.ai's **Internal Handle Database** is a crowdsourced system that builds and maintains a searchable database of social media handles across platforms, powered by user-submitted Target Account data.

## Overview

When users add Target Accounts via the **Target Accounts** feature (paste list, CSV upload, or TXT upload), Campaign.ai automatically:

1. **Parses and extracts** handles from various URL formats and text inputs
2. **Detects platforms** using intelligent pattern matching  
3. **Normalizes handles** according to platform-specific rules
4. **Stores data** in an internal `handle_database` table
5. **Powers search** for the mention functionality in Create Post

## Key Features

### ✅ **Multi-Platform Support**
- Instagram, Twitter/X, LinkedIn, TikTok, YouTube, Reddit, Discord, Telegram, WhatsApp Business, Threads
- Platform-specific handle validation and normalization
- Cross-platform brand mapping

### ✅ **Intelligent Parsing**
- **URLs**: `instagram.com/nike`, `twitter.com/nike`, `linkedin.com/company/nike`
- **Handle formats**: `@nike`, `nike`, `u/nike` (Reddit)
- **Mixed formats**: `Nike - @nike`, `Nike, instagram.com/nike`
- **CSV support**: Name, Handle/URL columns
- **Confidence scoring**: High/Medium/Low based on detection accuracy

### ✅ **Bidirectional Smart Search** 🆕
- **Handle-to-Brand**: Type `@elonm` → suggests "Elon Musk" with all platform handles
- **Brand-to-Handle**: Search "Nike" → shows @nike across all platforms
- **Smart Deduplication**: Prevents 150 Elon Musks with advanced similarity matching
- **Real-time suggestions**: 300ms debounced search with keyboard navigation
- **Cross-platform completion**: One search adds handles to all selected platforms

### ✅ **Advanced Deduplication** 🆕
- **Brand name normalization**: Removes Inc, Corp, Ltd variations automatically
- **Similarity algorithms**: Levenshtein distance + Jaccard similarity + substring matching
- **Canonical naming**: "elon musk", "Elon R Musk" → unified as "Elon Musk"
- **Smart merging**: Automatically consolidates similar brand entries
- **Confidence scoring**: High/Medium/Low based on multiple factors

### ✅ **Enhanced Search Modes** 🆕
- **Search mode**: General bidirectional search across brands and handles
- **Suggest mode**: Handle-to-brand suggestions with cross-platform mapping
- **Brand mode**: Get all handles for a specific brand across platforms
- **Fuzzy matching**: Finds results even with typos or partial matches
- **Verified prioritization**: Verified handles appear first in results

### ✅ **Data Quality & Privacy**
- **Verification system**: Admin can mark popular handles as "verified"
- **Duplicate prevention**: Advanced algorithms prevent data pollution
- **Privacy-focused**: Internal use only, no data sharing
- **User attribution**: Track who submitted each handle (for analytics)
- **Usage tracking**: Monitor which handles are most frequently added

## Architecture

### Database Schema

```sql
CREATE TABLE handle_database (
  id UUID PRIMARY KEY,
  source_user_id TEXT NOT NULL,           -- User who submitted
  brand_or_person_name TEXT,              -- Extracted/provided name
  platform platform_type NOT NULL,       -- Enum of supported platforms
  handle TEXT NOT NULL,                   -- Normalized handle
  verified BOOLEAN DEFAULT FALSE,         -- Admin verification
  first_seen_at TIMESTAMPTZ,             -- First submission
  last_seen_at TIMESTAMPTZ,              -- Last submission
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
```

### Key Components

#### 1. **Handle Parser** (`/src/utils/handle-parser.ts`)
- Platform detection patterns with regex
- Handle extraction and normalization
- CSV/TXT parsing logic
- Validation functions

#### 2. **Database Operations** (`/src/lib/handle-database.ts`)
- CRUD operations with Supabase
- Search functionality
- Bulk import processing
- Analytics helpers

#### 3. **Target Accounts UI** (`/src/components/TargetAccounts.tsx`)
- File upload with drag & drop
- Preview parsed handles with confidence indicators
- Import results with detailed feedback
- Error handling and validation

#### 4. **Enhanced Mentions** (`/src/components/EnhancedPlatformSpecificMentions.tsx`)
- Real-time search with API integration
- Fallback to static database
- Custom mention creation
- Cross-platform handle mapping

#### 5. **Enhanced Search API** (`/src/app/api/handle-search/route.ts`)
- RESTful endpoint: `GET /api/handle-search?q=nike&limit=10&mode=search|suggest|brand`
- **Bidirectional search modes**: search, suggest (handle→brand), brand (brand→handles)
- Query validation and rate limiting
- JSON response with metadata and confidence scores

#### 6. **Brand Matching System** (`/src/utils/brand-matcher.ts`) 🆕
- Smart brand name normalization and deduplication
- Similarity algorithms: Levenshtein, Jaccard, substring matching
- Canonical brand name resolution
- Duplicate detection with configurable thresholds

#### 7. **Bidirectional Search Component** (`/src/components/BidirectionalHandleSearch.tsx`) 🆕
- Enhanced UI with real-time bidirectional suggestions
- Keyboard navigation (arrow keys, enter, escape)
- Smart completion from partial handles to full brand names
- Cross-platform handle auto-population

## User Workflow

### 1. **Adding Target Accounts**

```
User visits /target-accounts
↓
Chooses input method: Paste List | Upload CSV | Upload TXT
↓
System parses input → extracts handles → shows preview
↓
User reviews confidence scores → clicks "Import to Database"
↓
System validates → normalizes → stores in handle_database
↓
Success feedback with import statistics
```

### 2. **Using Mentions in Create Post**

```
User creates post → selects platforms → adds mentions
↓
Types in search box → API calls /api/handle-search
↓
Results show from handle_database + static fallback
↓
User selects suggestion → auto-fills platform-specific handles
↓
Or creates custom mention with manual handle entry
```

## Examples

### Input Formats Supported

```text
# Paste List Format
Nike - @nike
Apple, https://instagram.com/apple  
Tesla | https://twitter.com/tesla
linkedin.com/company/microsoft
@spotify
tiktok.com/@netflix

# CSV Format
Name,Handle,Platform
Nike,@nike,Instagram
Apple,https://twitter.com/Apple,Twitter
Tesla,tesla-motors,LinkedIn

# TXT Format (same as paste)
Nike - @nike
Apple - https://instagram.com/apple
```

### Enhanced API Response Examples

#### Bidirectional Search (mode=search)
```json
{
  "query": "nike",
  "type": "search_results",
  "mode": "search",
  "count": 3,
  "results": [
    {
      "id": "uuid-123",
      "brand_or_person_name": "Nike",
      "platform": "instagram", 
      "handle": "nike",
      "verified": true,
      "usage_count": 15,
      "platforms": ["instagram", "twitter_x", "linkedin", "tiktok"],
      "all_handles": {
        "instagram": "nike",
        "twitter_x": "Nike",
        "linkedin": "nike", 
        "tiktok": "nike"
      }
    }
  ]
}
```

#### Handle-to-Brand Suggestions (mode=suggest)
```json
{
  "query": "@elonm",
  "type": "brand_suggestions",
  "mode": "suggest", 
  "count": 2,
  "message": "Found 2 brand suggestions for '@elonm'",
  "results": [
    {
      "id": "uuid-456",
      "brand_or_person_name": "Elon Musk",
      "verified": true,
      "usage_count": 42,
      "platforms": ["twitter_x", "instagram", "linkedin"],
      "all_handles": {
        "twitter_x": "elonmusk",
        "instagram": "elonmusk", 
        "linkedin": "elon-musk"
      },
      "isComplete": true,
      "confidence": "high"
    }
  ]
}
```

#### Brand-to-Handles Query (mode=brand)
```json
{
  "query": "Tesla",
  "type": "brand_handles",
  "mode": "brand",
  "count": 4,
  "results": {
    "instagram": "teslamotors",
    "twitter_x": "Tesla",
    "linkedin": "tesla-motors",
    "youtube": "tesla"
  }
}
```

## Setup Instructions

### 1. **Database Migration**
Run the SQL migration in your Supabase dashboard:
```bash
# Copy and execute the contents of:
migrations/001_create_handle_database.sql
```

### 2. **Environment Variables**
Ensure these are set in `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. **Navigation**
Add Target Accounts to your navigation:
```jsx
<Link href="/target-accounts">Target Accounts</Link>
```

### 4. **Use Bidirectional Handle Search** 🆕
Replace existing mention component with the new bidirectional search:
```jsx
import BidirectionalHandleSearch from '../components/BidirectionalHandleSearch';

// In your Create Post form
<BidirectionalHandleSearch
  selectedPlatforms={selectedPlatforms}
  onMentionsChange={setMentions}
  initialMentions={mentions}
/>
```

### 5. **Demo the System**
Visit the demo page to test bidirectional functionality:
```bash
# Navigate to the demo page
/demo-handle-search
```

Key features to test:
- Type `@elonm` → should suggest "Elon Musk" with cross-platform handles
- Search `Nike` → should show @nike across all platforms  
- Keyboard navigation with ↑↓ arrows, Enter to select
- Smart deduplication prevents duplicate brand entries

## Data Privacy & Ethics

### **Internal Use Only**
- All submitted handles are used exclusively within Campaign.ai
- No data sharing with other users or third parties
- Used to improve mention suggestions and competitor analysis

### **User Control**
- Users contribute handles voluntarily through Target Accounts
- Clear privacy notices and usage explanations
- Future: Opt-in for contributing to global knowledge base

### **Data Quality**
- Verification system for popular handles  
- Usage count tracking for credibility
- Admin controls for moderation

## Future Roadmap

### **Short Term**
- [ ] Admin dashboard for handle verification
- [ ] Enhanced search with typo tolerance
- [ ] Handle popularity scoring algorithm
- [ ] Export functionality for user's own data

### **Medium Term**
- [ ] Background job to validate handle existence
- [ ] Preferred platform per brand/person
- [ ] Integration with competitor analysis features
- [ ] Bulk verification via social media APIs

### **Long Term**
- [ ] Machine learning for automatic verification
- [ ] Real-time handle availability checking
- [ ] Community contribution and voting system
- [ ] Industry-specific handle collections

## FAQ

**Q: What happens to duplicate handles?**
A: System automatically detects duplicates and updates `last_seen_at` instead of creating duplicates.

**Q: How is data used?**
A: Internally for mention suggestions, competitor tracking, and AI training. Never shared externally.

**Q: Can I delete submitted handles?**
A: Currently admin-only. Future versions will allow users to manage their submissions.

**Q: What if a handle format isn't detected?**
A: Manual entry is always available. Our parsing improves over time based on submissions.

**Q: Are handles validated for existence?**
A: Currently no real-time validation. Planned for future versions with background jobs.

## Contributing

To improve handle detection:

1. **Add new platform patterns** in `handle-parser.ts`
2. **Update validation rules** for platform-specific formats  
3. **Test with various input formats** 
4. **Submit feedback** on missed handles or incorrect parsing

---

This crowdsourced handle database will become a significant competitive advantage for Campaign.ai, improving user experience while building valuable market intelligence data. 