/**
 * Platform-specific formatting rules loaded from embedded data
 */
export interface PlatformRules {
  characterLimits: Record<string, number>;
  supportedMediaTypes: string[];
  hashtagSupport: {
    maximum?: number;
    recommended?: number;
    format: string;
    notes?: string;
  };
  mentionFormatting: {
    format: string;
    supported: boolean;
    notes?: string;
  };
  lineBreaks: {
    allowed: boolean;
    method?: string;
    bestPractice?: string;
  };
  urlFormatting: {
    clickable: boolean;
    preview?: boolean;
    notes?: string;
  };
  contentRestrictions: string[];
  platformSpecificBestPractices: string[];
  notes: string[];
}

/**
 * Supported social media platforms
 */
export const SUPPORTED_PLATFORMS = [
  'instagram',
  'twitter_x',
  'linkedin',
  'tiktok',
  'youtube',
  'reddit',
  'discord',
  'telegram',
  'whatsapp_business',
  'threads'
] as const;

export type Platform = typeof SUPPORTED_PLATFORMS[number];

/**
 * Human-readable platform labels
 */
export const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: 'Instagram',
  twitter_x: 'X (Twitter)',
  linkedin: 'LinkedIn',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  reddit: 'Reddit',
  discord: 'Discord',
  telegram: 'Telegram',
  whatsapp_business: 'WhatsApp Business',
  threads: 'Threads'
};

/**
 * Input content structure for formatting
 */
export interface PostContent {
  mainContent: string;
  hashtags?: string[];
  mentions?: string[];
  mediaUrls?: string[];
  links?: string[];
}

/**
 * Formatted output for a specific platform
 */
export interface FormattedPost {
  platform: Platform;
  content: string;
  hashtags: string[];
  mentions: string[];
  mediaCount: number;
  characterCount: number;
  warnings: string[];
  suggestions: string[];
}

/**
 * Embedded platform rules data
 */
const PLATFORM_RULES_DATA: Record<Platform, PlatformRules> = {
  instagram: {
    characterLimits: { caption: 2200, bio: 150 },
    supportedMediaTypes: ['JPG', 'PNG', 'GIF', 'MP4', 'MOV'],
    hashtagSupport: { maximum: 30, recommended: 10, format: '#hashtag' },
    mentionFormatting: { format: '@username', supported: true },
    lineBreaks: { allowed: true, bestPractice: 'Use line breaks to improve readability' },
    urlFormatting: { clickable: false, notes: 'URLs in captions are not clickable' },
    contentRestrictions: ['No explicit content', 'Respect copyrights', 'No spam'],
    platformSpecificBestPractices: [
      'Visual-first: High-quality images and videos perform best',
      'Use engaging captions that encourage comments',
      'Stories engagement: Use polls, questions, quizzes'
    ],
    notes: ['Business/Creator accounts have access to analytics', 'Algorithm favors authentic engagement']
  },
  twitter_x: {
    characterLimits: { tweet: 280, bio: 160 },
    supportedMediaTypes: ['JPG', 'PNG', 'GIF', 'MP4', 'MOV'],
    hashtagSupport: { recommended: 2, format: '#hashtag' },
    mentionFormatting: { format: '@username', supported: true },
    lineBreaks: { allowed: true, bestPractice: 'Use line breaks for readability' },
    urlFormatting: { clickable: true, notes: 'URLs are automatically shortened' },
    contentRestrictions: ['No hate speech', 'No harassment', 'No spam'],
    platformSpecificBestPractices: [
      'Real-time: Great for news, updates, and live commentary',
      'Engagement: Ask questions, use polls',
      'Threading: Use threads for longer-form content'
    ],
    notes: ['Algorithm promotes engagement and recency', 'Blue checkmarks available through subscription']
  },
  linkedin: {
    characterLimits: { post: 3000, headline: 220, summary: 2000 },
    supportedMediaTypes: ['JPG', 'PNG', 'GIF', 'MP4', 'AVI', 'PDF', 'DOC'],
    hashtagSupport: { maximum: 30, recommended: 5, format: '#hashtag' },
    mentionFormatting: { format: '@firstname lastname', supported: true },
    lineBreaks: { allowed: true, bestPractice: 'Break up text into digestible paragraphs' },
    urlFormatting: { clickable: true, preview: true },
    contentRestrictions: ['Professional focus required', 'No spam', 'Respectful tone'],
    platformSpecificBestPractices: [
      'Business focus: Share industry insights, professional achievements',
      'Educational content: How-to guides, tips, and tutorials perform well',
      'Thought leadership: Share expertise and insights'
    ],
    notes: ['Algorithm favors content that generates professional discussions', 'Best posting times: Tuesday-Thursday']
  },
  tiktok: {
    characterLimits: { caption: 2200, bio: 80, username: 24 },
    supportedMediaTypes: ['MP4', 'MOV', 'WEBM', 'JPG', 'PNG'],
    hashtagSupport: { recommended: 5, format: '#hashtag' },
    mentionFormatting: { format: '@username', supported: true },
    lineBreaks: { allowed: true, bestPractice: 'Keep captions concise and engaging' },
    urlFormatting: { clickable: false, notes: 'URLs in captions are not clickable' },
    contentRestrictions: ['No hate speech', 'Age-appropriate content', 'Original content'],
    platformSpecificBestPractices: [
      'Vertical video: 9:16 aspect ratio preferred',
      'Hook viewers: First 3 seconds are crucial',
      'Trending sounds: Use popular music and audio clips'
    ],
    notes: ['Algorithm heavily favors engagement and completion rates', 'Requires mobile app for optimal creation']
  },
  youtube: {
    characterLimits: { title: 100, description: 5000, tags: 500 },
    supportedMediaTypes: ['MP4', 'MOV', 'AVI', 'WMV', 'FLV', 'WebM', 'JPG', 'PNG'],
    hashtagSupport: { maximum: 15, format: '#hashtag' },
    mentionFormatting: { format: '@channelname', supported: true },
    lineBreaks: { allowed: true, bestPractice: 'Use chapters and timestamps in descriptions' },
    urlFormatting: { clickable: true, notes: 'Can use cards and end screens' },
    contentRestrictions: ['Community guidelines', 'Copyright compliance', 'Advertiser-friendly'],
    platformSpecificBestPractices: [
      'SEO optimization: Use keywords in titles, descriptions, and tags',
      'Thumbnail design: Eye-catching thumbnails increase click-through rates',
      'Consistent branding: Maintain visual consistency'
    ],
    notes: ['Algorithm prioritizes watch time and audience retention', 'Monetization requires 1,000 subscribers']
  },
  reddit: {
    characterLimits: { title: 300, post: 40000, comment: 10000 },
    supportedMediaTypes: ['JPG', 'PNG', 'GIF', 'MP4', 'MOV'],
    hashtagSupport: { format: 'Not applicable', recommended: 0 },
    mentionFormatting: { format: 'u/username', supported: true },
    lineBreaks: { allowed: true, method: 'Double line break creates paragraph' },
    urlFormatting: { clickable: true, preview: true },
    contentRestrictions: ['Subreddit-specific rules', 'No spam (9:1 rule)', 'No vote manipulation'],
    platformSpecificBestPractices: [
      'Community first: Contribute to discussions before promoting',
      'Authentic engagement: Reddit users value genuine participation',
      'Read rules: Each subreddit has unique rules and culture'
    ],
    notes: ['Karma system rewards quality content', 'Moderators have significant control']
  },
  discord: {
    characterLimits: { message: 2000, username: 32, channel: 100 },
    supportedMediaTypes: ['JPG', 'PNG', 'GIF', 'WEBP', 'MP4', 'MOV', 'AVI'],
    hashtagSupport: { format: 'Not applicable', recommended: 0 },
    mentionFormatting: { format: '@username', supported: true },
    lineBreaks: { allowed: true, method: 'Shift+Enter for line breaks' },
    urlFormatting: { clickable: true, preview: true },
    contentRestrictions: ['Server-specific rules', 'Discord ToS', 'NSFW content restrictions'],
    platformSpecificBestPractices: [
      'Community engagement: Participate in conversations naturally',
      'Bot integration: Use bots for automated posting',
      'Rich embeds: Create formatted messages with embeds'
    ],
    notes: ['Primarily designed for real-time community communication', 'Bot integration allows automation']
  },
  telegram: {
    characterLimits: { message: 4096, caption: 1024, username: 32 },
    supportedMediaTypes: ['JPG', 'PNG', 'GIF', 'WEBP', 'MP4', 'MOV', 'AVI'],
    hashtagSupport: { format: '#hashtag', recommended: 10 },
    mentionFormatting: { format: '@username', supported: true },
    lineBreaks: { allowed: true, method: 'Shift+Enter for line breaks' },
    urlFormatting: { clickable: true, preview: true },
    contentRestrictions: ['Terms of Service compliance', 'Copyright respect', 'Regional restrictions'],
    platformSpecificBestPractices: [
      'Bot integration: Leverage bots for automation',
      'Channel consistency: Regular posting schedule',
      'Media optimization: Use high-quality images and videos'
    ],
    notes: ['Massive file size limits compared to other platforms', 'Strong focus on privacy and security']
  },
  whatsapp_business: {
    characterLimits: { message: 65536, name: 25, description: 139 },
    supportedMediaTypes: ['JPG', 'PNG', 'GIF', 'MP4', 'AVI', 'PDF', 'DOC'],
    hashtagSupport: { format: 'Not applicable', recommended: 0 },
    mentionFormatting: { format: 'Not applicable', supported: false },
    lineBreaks: { allowed: true, method: 'Enter key creates line breaks' },
    urlFormatting: { clickable: true, preview: true },
    contentRestrictions: ['Business policy compliance', '24-hour rule', 'Template message requirements'],
    platformSpecificBestPractices: [
      'Personalization: Tailor messages to individual recipients',
      'Timing: Respect time zones and business hours',
      'Customer service: Focus on providing value and support'
    ],
    notes: ['WhatsApp Business API required for automated messaging', 'End-to-end encryption protects privacy']
  },
  threads: {
    characterLimits: { post: 500, bio: 150, username: 30 },
    supportedMediaTypes: ['JPG', 'PNG', 'GIF', 'MP4', 'MOV'],
    hashtagSupport: { recommended: 5, format: '#hashtag' },
    mentionFormatting: { format: '@username', supported: true },
    lineBreaks: { allowed: true, bestPractice: 'Keep posts concise and engaging' },
    urlFormatting: { clickable: true, preview: true },
    contentRestrictions: ['Similar to Instagram policies', 'No harassment', 'Authentic content'],
    platformSpecificBestPractices: [
      'Text-focused: Emphasis on text content over visual media',
      'Conversation: Designed for discussions and replies',
      'Authentic voice: Personal and authentic content performs well'
    ],
    notes: ['Beta platform launched by Meta in 2023', 'Integration with Instagram for some features']
  }
};

/**
 * Loads platform rules from embedded data
 */
export async function loadPlatformRules(platform: Platform): Promise<PlatformRules | null> {
  try {
    return PLATFORM_RULES_DATA[platform] || null;
  } catch (error) {
    console.error(`Failed to load platform rules for ${platform}:`, error);
    return null;
  }
}

/**
 * Formats content for a specific platform using AI-guided rules
 */
export async function formatContentForPlatform(
  content: PostContent,
  platform: Platform
): Promise<FormattedPost> {
  const rules = await loadPlatformRules(platform);
  if (!rules) {
    throw new Error(`Unable to load rules for platform: ${platform}`);
  }

  // Get character limit for the platform
  const characterLimit = rules.characterLimits.post || 
                        rules.characterLimits.message || 
                        rules.characterLimits.caption || 
                        rules.characterLimits.tweet || 
                        1000; // Default fallback

  let formattedContent = content.mainContent;
  const warnings: string[] = [];
  const suggestions: string[] = [];
  
  // Apply platform-specific formatting
  formattedContent = await applyPlatformFormatting(formattedContent, platform, rules);
  
  // Handle hashtags
  let hashtags = content.hashtags || [];
  hashtags = formatHashtags(hashtags, platform, rules);
  
  // Handle mentions
  let mentions = content.mentions || [];
  mentions = formatMentions(mentions, platform, rules);
  
  // Combine content with hashtags for character count
  const fullContent = [
    formattedContent,
    hashtags.length > 0 ? hashtags.join(' ') : '',
    mentions.length > 0 ? mentions.join(' ') : ''
  ].filter(Boolean).join('\n\n');
  
  const characterCount = fullContent.length;
  
  // Check character limits and add warnings
  if (characterCount > characterLimit) {
    warnings.push(`Content exceeds ${platform} character limit (${characterCount}/${characterLimit})`);
    suggestions.push(`Consider shortening your content by ${characterCount - characterLimit} characters`);
  }
  
  // Platform-specific suggestions
  if (platform === 'instagram' && !content.mediaUrls?.length) {
    suggestions.push('Instagram performs better with visual content. Consider adding an image or video.');
  }
  
  if (platform === 'linkedin' && characterCount < 300) {
    suggestions.push('LinkedIn posts with 300+ characters tend to perform better for engagement.');
  }
  
  if (platform === 'twitter_x' && hashtags.length > 2) {
    suggestions.push('Twitter/X posts perform better with 1-2 hashtags rather than many.');
  }

  return {
    platform,
    content: fullContent,
    hashtags,
    mentions,
    mediaCount: content.mediaUrls?.length || 0,
    characterCount,
    warnings,
    suggestions
  };
}

/**
 * Applies platform-specific content formatting using AI rules
 */
async function applyPlatformFormatting(
  content: string,
  platform: Platform,
  rules: PlatformRules
): Promise<string> {
  let formattedContent = content;
  
  // Apply platform-specific formatting rules
  switch (platform) {
    case 'linkedin':
      // LinkedIn prefers professional tone and paragraph breaks
      formattedContent = content.replace(/\n/g, '\n\n');
      break;
      
    case 'twitter_x':
      // Twitter/X benefits from concise, punchy content
      if (content.length > 200) {
        // Suggest breaking into thread format
        const sentences = content.split('. ');
        if (sentences.length > 2) {
          formattedContent = sentences.slice(0, 2).join('. ') + '... 🧵';
        }
      }
      break;
      
    case 'instagram':
      // Instagram can use more creative formatting with emojis
      formattedContent = content.replace(/\n/g, '\n•\n');
      break;
      
    case 'reddit':
      // Reddit prefers detailed, informative content
      if (!content.includes('\n\n')) {
        formattedContent = content.replace(/\. /g, '.\n\n');
      }
      break;
      
    case 'tiktok':
      // TikTok prefers short, engaging captions
      if (content.length > 100) {
        const firstSentence = content.split('.')[0];
        formattedContent = firstSentence + '! 🎥';
      }
      break;
      
    default:
      // Keep original formatting for other platforms
      break;
  }
  
  return formattedContent;
}

/**
 * Formats hashtags according to platform rules
 */
function formatHashtags(hashtags: string[], platform: Platform, rules: PlatformRules): string[] {
  if (!hashtags.length) return [];
  
  // Ensure hashtags start with #
  let formattedHashtags = hashtags.map(tag => 
    tag.startsWith('#') ? tag : `#${tag}`
  );
  
  // Apply platform-specific hashtag rules
  const maxHashtags = rules.hashtagSupport.maximum || rules.hashtagSupport.recommended || 30;
  
  if (formattedHashtags.length > maxHashtags) {
    formattedHashtags = formattedHashtags.slice(0, maxHashtags);
  }
  
  // Platform-specific hashtag formatting
  switch (platform) {
    case 'linkedin':
      // LinkedIn hashtags can have spaces
      formattedHashtags = formattedHashtags.map(tag => 
        tag.replace(/([A-Z])/g, ' $1').trim()
      );
      break;
      
    case 'reddit':
    case 'discord':
    case 'whatsapp_business':
      // These platforms don't use hashtags
      return [];
      
    default:
      // Remove spaces and special characters for other platforms
      formattedHashtags = formattedHashtags.map(tag =>
        tag.replace(/[^a-zA-Z0-9_#]/g, '')
      );
      break;
  }
  
  return formattedHashtags;
}

/**
 * Formats mentions according to platform rules
 */
function formatMentions(mentions: string[], platform: Platform, rules: PlatformRules): string[] {
  if (!mentions.length) return [];
  
  // Ensure mentions start with @
  let formattedMentions = mentions.map(mention => 
    mention.startsWith('@') ? mention : `@${mention}`
  );
  
  // Platform-specific mention formatting
  switch (platform) {
    case 'reddit':
      // Reddit uses u/ for user mentions
      formattedMentions = formattedMentions.map(mention =>
        mention.replace('@', 'u/')
      );
      break;
      
    case 'whatsapp_business':
      // WhatsApp doesn't use traditional mentions
      return [];
      
    default:
      // Keep @ format for other platforms
      break;
  }
  
  return formattedMentions;
}

/**
 * Gets platform display information
 */
export function getPlatformInfo(platform: Platform) {
  const platformInfo = {
    instagram: {
      name: 'Instagram',
      icon: '📷',
      color: 'from-pink-500 to-purple-600',
      description: 'Visual content with captions up to 2,200 characters'
    },
    twitter_x: {
      name: 'X (Twitter)',
      icon: '𝕏',
      color: 'from-black to-gray-800',
      description: 'Short-form content up to 280 characters'
    },
    linkedin: {
      name: 'LinkedIn',
      icon: '💼',
      color: 'from-blue-600 to-blue-800',
      description: 'Professional content up to 3,000 characters'
    },
    tiktok: {
      name: 'TikTok',
      icon: '🎵',
      color: 'from-red-500 to-pink-600',
      description: 'Video content with captions up to 2,200 characters'
    },
    youtube: {
      name: 'YouTube',
      icon: '▶️',
      color: 'from-red-600 to-red-800',
      description: 'Video titles up to 100 characters, descriptions up to 5,000'
    },
    reddit: {
      name: 'Reddit',
      icon: '🤖',
      color: 'from-orange-500 to-red-600',
      description: 'Discussion posts up to 40,000 characters'
    },
    discord: {
      name: 'Discord',
      icon: '💬',
      color: 'from-indigo-500 to-purple-600',
      description: 'Community messages up to 2,000 characters'
    },
    telegram: {
      name: 'Telegram',
      icon: '✈️',
      color: 'from-blue-500 to-cyan-600',
      description: 'Messages up to 4,096 characters'
    },
    whatsapp_business: {
      name: 'WhatsApp Business',
      icon: '💚',
      color: 'from-green-500 to-teal-600',
      description: 'Business messages up to 65,536 characters'
    },
    threads: {
      name: 'Threads',
      icon: '@',
      color: 'from-purple-500 to-pink-600',
      description: 'Text-focused posts up to 500 characters'
    }
  };

  return platformInfo[platform];
}

/**
 * Batch format content for multiple platforms
 */
export async function formatContentForAllPlatforms(
  content: PostContent,
  selectedPlatforms: Platform[]
): Promise<FormattedPost[]> {
  const formattedPosts = await Promise.all(
    selectedPlatforms.map(platform => 
      formatContentForPlatform(content, platform)
    )
  );

  return formattedPosts;
} 