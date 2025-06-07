import { Platform } from './ai_platform_formatter';
import { PlatformSpecificMention, MentionSuggestion } from '../types/create-post';

/**
 * Sample database of common brands/people with their platform-specific handles
 * In a real app, this would come from a database or API
 */
export const SAMPLE_MENTION_DATABASE: MentionSuggestion[] = [
  {
    id: 'nike',
    displayName: 'Nike',
    type: 'brand',
    verified: true,
    description: 'Just Do It. Official Nike brand account.',
    followerCount: 300000000,
    handles: {
      instagram: '@nike',
      twitter_x: '@nike',
      linkedin: '@nike',
      tiktok: '@nike',
      youtube: '@nike',
      threads: '@nike'
    }
  },
  {
    id: 'apple',
    displayName: 'Apple',
    type: 'company',
    verified: true,
    description: 'Think different. Official Apple Inc.',
    followerCount: 250000000,
    handles: {
      instagram: '@apple',
      twitter_x: '@apple',
      linkedin: '@apple',
      tiktok: '@apple',
      youtube: '@apple',
      threads: '@apple'
    }
  },
  {
    id: 'tesla',
    displayName: 'Tesla',
    type: 'company',
    verified: true,
    description: 'Electric vehicles, energy storage and solar panels.',
    followerCount: 180000000,
    handles: {
      instagram: '@teslamotors',
      twitter_x: '@tesla',
      linkedin: '@tesla',
      tiktok: '@tesla',
      youtube: '@tesla',
      threads: '@tesla'
    }
  },
  {
    id: 'coca-cola',
    displayName: 'Coca-Cola',
    type: 'brand',
    verified: true,
    description: 'Refresh the world. Make a difference.',
    followerCount: 150000000,
    handles: {
      instagram: '@cocacola',
      twitter_x: '@cocacola',
      linkedin: '@the-coca-cola-company',
      tiktok: '@cocacola',
      youtube: '@cocacola',
      threads: '@cocacola'
    }
  },
  {
    id: 'spotify',
    displayName: 'Spotify',
    type: 'company',
    verified: true,
    description: 'Music for everyone.',
    followerCount: 120000000,
    handles: {
      instagram: '@spotify',
      twitter_x: '@spotify',
      linkedin: '@spotify',
      tiktok: '@spotify',
      youtube: '@spotify',
      threads: '@spotify'
    }
  },
  {
    id: 'netflix',
    displayName: 'Netflix',
    type: 'company',
    verified: true,
    description: 'Watch TV shows & movies anytime, anywhere.',
    followerCount: 200000000,
    handles: {
      instagram: '@netflix',
      twitter_x: '@netflix',
      linkedin: '@netflix',
      tiktok: '@netflix',
      youtube: '@netflix',
      threads: '@netflix'
    }
  },
  {
    id: 'microsoft',
    displayName: 'Microsoft',
    type: 'company',
    verified: true,
    description: 'We empower every person and organization on the planet to achieve more.',
    followerCount: 90000000,
    handles: {
      instagram: '@microsoft',
      twitter_x: '@microsoft',
      linkedin: '@microsoft',
      tiktok: '@microsoft',
      youtube: '@microsoft',
      threads: '@microsoft'
    }
  },
  {
    id: 'starbucks',
    displayName: 'Starbucks',
    type: 'brand',
    verified: true,
    description: 'More than coffee. We inspire and nurture the human spirit.',
    followerCount: 80000000,
    handles: {
      instagram: '@starbucks',
      twitter_x: '@starbucks',
      linkedin: '@starbucks',
      tiktok: '@starbucks',
      youtube: '@starbucks',
      threads: '@starbucks'
    }
  },
  {
    id: 'amazon',
    displayName: 'Amazon',
    type: 'company',
    verified: true,
    description: 'Earth\'s Most Customer-Centric Company',
    followerCount: 100000000,
    handles: {
      instagram: '@amazon',
      twitter_x: '@amazon',
      linkedin: '@amazon',
      tiktok: '@amazon',
      youtube: '@amazon',
      threads: '@amazon'
    }
  },
  {
    id: 'google',
    displayName: 'Google',
    type: 'company',
    verified: true,
    description: 'Our mission is to organize the world\'s information and make it universally accessible.',
    followerCount: 140000000,
    handles: {
      instagram: '@google',
      twitter_x: '@google',
      linkedin: '@google',
      tiktok: '@google',
      youtube: '@google',
      threads: '@google'
    }
  }
];

/**
 * Search mentions by query string
 */
export function searchMentions(query: string): MentionSuggestion[] {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase();
  return SAMPLE_MENTION_DATABASE.filter(mention => 
    mention.displayName.toLowerCase().includes(searchTerm) ||
    Object.values(mention.handles).some(handle => 
      handle?.toLowerCase().includes(searchTerm)
    )
  ).slice(0, 10); // Limit to 10 results
}

/**
 * Get mention by ID
 */
export function getMentionById(id: string): MentionSuggestion | undefined {
  return SAMPLE_MENTION_DATABASE.find(mention => mention.id === id);
}

/**
 * Convert MentionSuggestion to PlatformSpecificMention
 */
export function convertToPlatformSpecificMention(suggestion: MentionSuggestion): PlatformSpecificMention {
  return {
    id: suggestion.id,
    displayName: suggestion.displayName,
    handles: suggestion.handles,
    type: suggestion.type,
    verified: suggestion.verified,
    notes: suggestion.description
  };
}

/**
 * Get the correct handle for a mention on a specific platform
 */
export function getMentionForPlatform(mention: PlatformSpecificMention, platform: Platform): string {
  const handle = mention.handles[platform];
  if (handle) {
    return handle;
  }
  
  // Fallback logic - try to construct a reasonable handle
  const fallbackHandle = `@${mention.displayName.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  
  // Platform-specific formatting
  switch (platform) {
    case 'reddit':
      return `u/${mention.displayName.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    case 'discord':
    case 'whatsapp_business':
      return mention.displayName; // These don't use traditional mentions
    default:
      return fallbackHandle;
  }
}

/**
 * Validate if a handle exists on a platform (mock function)
 * In a real app, this would check against platform APIs
 */
export async function validateHandleOnPlatform(handle: string, platform: Platform): Promise<{
  exists: boolean;
  verified?: boolean;
  suggestion?: string;
}> {
  // Mock validation - in real app would call platform APIs
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
  
  // Simple mock logic
  const cleanHandle = handle.replace('@', '').toLowerCase();
  const exists = cleanHandle.length >= 3 && !cleanHandle.includes(' ');
  
  return {
    exists,
    verified: exists && SAMPLE_MENTION_DATABASE.some(mention => 
      Object.values(mention.handles).some(h => 
        h?.replace('@', '').toLowerCase() === cleanHandle
      )
    ),
    suggestion: !exists ? `@${cleanHandle.replace(/[^a-z0-9]/g, '')}` : undefined
  };
}

/**
 * Get platform-specific mention warnings
 */
export function getMentionWarnings(mention: PlatformSpecificMention, platforms: Platform[]): string[] {
  const warnings: string[] = [];
  
  for (const platform of platforms) {
    if (!mention.handles[platform]) {
      warnings.push(`No ${platform} handle specified for ${mention.displayName}`);
    }
  }
  
  return warnings;
}

/**
 * Auto-suggest handles for missing platforms based on existing handles
 */
export function suggestHandlesForMissingPlatforms(mention: PlatformSpecificMention): Partial<Record<Platform, string>> {
  const suggestions: Partial<Record<Platform, string>> = {};
  const existingHandles = Object.values(mention.handles).filter(Boolean);
  
  if (existingHandles.length === 0) {
    // If no handles exist, suggest based on display name
    const baseHandle = mention.displayName.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    return {
      instagram: `@${baseHandle}`,
      twitter_x: `@${baseHandle}`,
      linkedin: `@${baseHandle}`,
      tiktok: `@${baseHandle}`,
      youtube: `@${baseHandle}`,
      threads: `@${baseHandle}`,
      telegram: `@${baseHandle}`,
      discord: mention.displayName,
      reddit: `u/${baseHandle}`,
      whatsapp_business: mention.displayName
    };
  }
  
  // Use the most common handle pattern
  const mostCommonHandle = existingHandles[0];
  const baseHandle = mostCommonHandle?.replace('@', '') || mention.displayName.toLowerCase();
  
  // Suggest for platforms that don't have handles
  const allPlatforms: Platform[] = ['instagram', 'twitter_x', 'linkedin', 'tiktok', 'youtube', 'reddit', 'discord', 'telegram', 'whatsapp_business', 'threads'];
  
  for (const platform of allPlatforms) {
    if (!mention.handles[platform]) {
      switch (platform) {
        case 'reddit':
          suggestions[platform] = `u/${baseHandle}`;
          break;
        case 'discord':
        case 'whatsapp_business':
          suggestions[platform] = mention.displayName;
          break;
        default:
          suggestions[platform] = `@${baseHandle}`;
          break;
      }
    }
  }
  
  return suggestions;
} 