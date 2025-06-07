import { Platform } from './ai_platform_formatter';
import { ParsedHandle, PlatformPattern } from '../types/handle-database';

/**
 * Platform detection patterns with extraction logic
 */
const PLATFORM_PATTERNS: PlatformPattern[] = [
  // Instagram
  {
    platform: 'instagram',
    patterns: [
      /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9._]+)\/?/i,
      /(?:^|\s)@([a-zA-Z0-9._]+)(?:\s|$)/i, // @username format
    ],
    extract_handle: (match: string) => {
      const urlMatch = match.match(/instagram\.com\/([a-zA-Z0-9._]+)/i);
      if (urlMatch) return urlMatch[1];
      const atMatch = match.match(/@([a-zA-Z0-9._]+)/i);
      if (atMatch) return atMatch[1];
      return match.replace(/[^a-zA-Z0-9._]/g, '');
    },
    confidence: 'high'
  },

  // Twitter/X
  {
    platform: 'twitter_x',
    patterns: [
      /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)\/?/i,
      /(?:^|\s)@([a-zA-Z0-9_]+)(?:\s|$)/i,
    ],
    extract_handle: (match: string) => {
      const urlMatch = match.match(/(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)/i);
      if (urlMatch) return urlMatch[1];
      const atMatch = match.match(/@([a-zA-Z0-9_]+)/i);
      if (atMatch) return atMatch[1];
      return match.replace(/[^a-zA-Z0-9_]/g, '');
    },
    confidence: 'high'
  },

  // LinkedIn
  {
    platform: 'linkedin',
    patterns: [
      /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/company\/([a-zA-Z0-9-]+)\/?/i,
      /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9-]+)\/?/i,
      /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/school\/([a-zA-Z0-9-]+)\/?/i,
    ],
    extract_handle: (match: string) => {
      const companyMatch = match.match(/linkedin\.com\/company\/([a-zA-Z0-9-]+)/i);
      if (companyMatch) return companyMatch[1];
      const profileMatch = match.match(/linkedin\.com\/in\/([a-zA-Z0-9-]+)/i);
      if (profileMatch) return profileMatch[1];
      const schoolMatch = match.match(/linkedin\.com\/school\/([a-zA-Z0-9-]+)/i);
      if (schoolMatch) return schoolMatch[1];
      return match.replace(/[^a-zA-Z0-9-]/g, '');
    },
    confidence: 'high'
  },

  // TikTok
  {
    platform: 'tiktok',
    patterns: [
      /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@([a-zA-Z0-9._]+)\/?/i,
      /(?:^|\s)@([a-zA-Z0-9._]+)(?:\s|$)/i,
    ],
    extract_handle: (match: string) => {
      const urlMatch = match.match(/tiktok\.com\/@([a-zA-Z0-9._]+)/i);
      if (urlMatch) return urlMatch[1];
      const atMatch = match.match(/@([a-zA-Z0-9._]+)/i);
      if (atMatch) return atMatch[1];
      return match.replace(/[^a-zA-Z0-9._]/g, '');
    },
    confidence: 'high'
  },

  // YouTube
  {
    platform: 'youtube',
    patterns: [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/channel\/([a-zA-Z0-9_-]+)\/?/i,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/c\/([a-zA-Z0-9_-]+)\/?/i,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/user\/([a-zA-Z0-9_-]+)\/?/i,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/@([a-zA-Z0-9_-]+)\/?/i,
    ],
    extract_handle: (match: string) => {
      const channelMatch = match.match(/youtube\.com\/channel\/([a-zA-Z0-9_-]+)/i);
      if (channelMatch) return channelMatch[1];
      const cMatch = match.match(/youtube\.com\/c\/([a-zA-Z0-9_-]+)/i);
      if (cMatch) return cMatch[1];
      const userMatch = match.match(/youtube\.com\/user\/([a-zA-Z0-9_-]+)/i);
      if (userMatch) return userMatch[1];
      const atMatch = match.match(/youtube\.com\/@([a-zA-Z0-9_-]+)/i);
      if (atMatch) return atMatch[1];
      return match.replace(/[^a-zA-Z0-9_-]/g, '');
    },
    confidence: 'high'
  },

  // Reddit
  {
    platform: 'reddit',
    patterns: [
      /(?:https?:\/\/)?(?:www\.)?reddit\.com\/u\/([a-zA-Z0-9_-]+)\/?/i,
      /(?:https?:\/\/)?(?:www\.)?reddit\.com\/user\/([a-zA-Z0-9_-]+)\/?/i,
      /(?:^|\s)u\/([a-zA-Z0-9_-]+)(?:\s|$)/i,
    ],
    extract_handle: (match: string) => {
      const urlMatch = match.match(/reddit\.com\/(?:u|user)\/([a-zA-Z0-9_-]+)/i);
      if (urlMatch) return urlMatch[1];
      const uMatch = match.match(/u\/([a-zA-Z0-9_-]+)/i);
      if (uMatch) return uMatch[1];
      return match.replace(/[^a-zA-Z0-9_-]/g, '');
    },
    confidence: 'high'
  },

  // Telegram
  {
    platform: 'telegram',
    patterns: [
      /(?:https?:\/\/)?t\.me\/([a-zA-Z0-9_]+)\/?/i,
      /(?:^|\s)@([a-zA-Z0-9_]+)(?:\s|$)/i,
    ],
    extract_handle: (match: string) => {
      const urlMatch = match.match(/t\.me\/([a-zA-Z0-9_]+)/i);
      if (urlMatch) return urlMatch[1];
      const atMatch = match.match(/@([a-zA-Z0-9_]+)/i);
      if (atMatch) return atMatch[1];
      return match.replace(/[^a-zA-Z0-9_]/g, '');
    },
    confidence: 'high'
  },

  // Threads
  {
    platform: 'threads',
    patterns: [
      /(?:https?:\/\/)?(?:www\.)?threads\.net\/@([a-zA-Z0-9._]+)\/?/i,
      /(?:^|\s)@([a-zA-Z0-9._]+)(?:\s|$)/i,
    ],
    extract_handle: (match: string) => {
      const urlMatch = match.match(/threads\.net\/@([a-zA-Z0-9._]+)/i);
      if (urlMatch) return urlMatch[1];
      const atMatch = match.match(/@([a-zA-Z0-9._]+)/i);
      if (atMatch) return atMatch[1];
      return match.replace(/[^a-zA-Z0-9._]/g, '');
    },
    confidence: 'high'
  },

  // WhatsApp Business
  {
    platform: 'whatsapp_business',
    patterns: [
      /(?:https?:\/\/)?wa\.me\/([0-9]+)\/?/i,
      /(?:https?:\/\/)?api\.whatsapp\.com\/send\?phone=([0-9]+)/i,
      /(?:\+?[0-9]{1,4}[-.\s]?)?(?:[0-9]{3,4}[-.\s]?[0-9]{3,4}[-.\s]?[0-9]{3,4})/i,
    ],
    extract_handle: (match: string) => {
      const waMatch = match.match(/wa\.me\/([0-9]+)/i);
      if (waMatch) return waMatch[1];
      const apiMatch = match.match(/phone=([0-9]+)/i);
      if (apiMatch) return apiMatch[1];
      return match.replace(/[^0-9]/g, '');
    },
    confidence: 'medium'
  },

  // Discord (Note: Discord server invites are not user handles)
  {
    platform: 'discord',
    patterns: [
      /([a-zA-Z0-9._]+)#([0-9]{4})/i, // username#1234 format
    ],
    extract_handle: (match: string) => {
      const discordMatch = match.match(/([a-zA-Z0-9._]+)#([0-9]{4})/i);
      if (discordMatch) return `${discordMatch[1]}#${discordMatch[2]}`;
      return match;
    },
    confidence: 'low'
  }
];

/**
 * Parse handles from raw text input
 */
export function parseHandlesFromText(input: string): ParsedHandle[] {
  const results: ParsedHandle[] = [];
  const lines = input.split('\n').map(line => line.trim()).filter(Boolean);

  for (const line of lines) {
    // Try to extract brand/person name if format is "Name, URL" or "Name - URL"
    const nameMatch = line.match(/^([^,\-\|]+)[\,\-\|]\s*(.+)$/);
    const brandName = nameMatch ? nameMatch[1].trim() : null;
    const handleText = nameMatch ? nameMatch[2].trim() : line;

    // Test against all platform patterns
    for (const pattern of PLATFORM_PATTERNS) {
      for (const regex of pattern.patterns) {
        const match = handleText.match(regex);
        if (match) {
          try {
            const extractedHandle = pattern.extract_handle(handleText);
            if (extractedHandle && extractedHandle.length > 0) {
              results.push({
                platform: pattern.platform,
                handle: extractedHandle,
                original_input: line,
                confidence: pattern.confidence,
                brand_or_person_name: brandName || undefined
              });
              break; // Don't check other patterns for this platform
            }
          } catch (error) {
            console.warn(`Error extracting handle for ${pattern.platform}:`, error);
          }
        }
      }
    }
  }

  return results;
}

/**
 * Parse handles from CSV content
 */
export function parseHandlesFromCSV(csvContent: string): ParsedHandle[] {
  const results: ParsedHandle[] = [];
  const lines = csvContent.split('\n').map(line => line.trim()).filter(Boolean);
  
  // Skip header if present
  const dataLines = lines[0].toLowerCase().includes('name') || lines[0].toLowerCase().includes('platform') 
    ? lines.slice(1) 
    : lines;

  for (const line of dataLines) {
    // Simple CSV parsing (handles basic comma separation)
    const columns = line.split(',').map(col => col.trim().replace(/^["']|["']$/g, ''));
    
    if (columns.length >= 2) {
      // Assume format: Name, Handle/URL or Platform, Handle
      const [first, second, third] = columns;
      
      // Try to determine if first column is platform or name
      const platformFromFirst = PLATFORM_PATTERNS.find(p => 
        p.platform.toLowerCase() === first.toLowerCase() ||
        first.toLowerCase().includes(p.platform.replace('_', ''))
      );

      if (platformFromFirst && second) {
        // Format: Platform, Handle
        const handle = platformFromFirst.extract_handle(second);
        if (handle) {
          results.push({
            platform: platformFromFirst.platform,
            handle,
            original_input: line,
            confidence: 'medium',
            brand_or_person_name: third || undefined
          });
        }
      } else {
        // Format: Name, Handle/URL - parse URL to determine platform
        const parsed = parseHandlesFromText(`${first}, ${second}`);
        results.push(...parsed);
      }
    } else if (columns.length === 1) {
      // Single column - treat as handle/URL
      const parsed = parseHandlesFromText(columns[0]);
      results.push(...parsed);
    }
  }

  return results;
}

/**
 * Normalize handle format for storage
 */
export function normalizeHandle(handle: string, platform: Platform): string {
  switch (platform) {
    case 'instagram':
    case 'twitter_x':
    case 'tiktok':
    case 'threads':
    case 'telegram':
      return handle.replace(/^@/, '').toLowerCase();
    
    case 'linkedin':
      return handle.toLowerCase();
    
    case 'youtube':
      return handle; // Keep original case for YouTube
    
    case 'reddit':
      return handle.replace(/^u\//, '').toLowerCase();
    
    case 'discord':
      return handle; // Keep original format with #tag
    
    case 'whatsapp_business':
      return handle.replace(/[^0-9]/g, ''); // Only numbers
    
    default:
      return handle.toLowerCase();
  }
}

/**
 * Validate handle format for platform
 */
export function validateHandle(handle: string, platform: Platform): boolean {
  const normalized = normalizeHandle(handle, platform);
  
  switch (platform) {
    case 'instagram':
    case 'tiktok':
    case 'threads':
      return /^[a-zA-Z0-9._]{1,30}$/.test(normalized);
    
    case 'twitter_x':
      return /^[a-zA-Z0-9_]{1,15}$/.test(normalized);
    
    case 'linkedin':
      return /^[a-zA-Z0-9-]{3,100}$/.test(normalized);
    
    case 'youtube':
      return normalized.length >= 3 && normalized.length <= 100;
    
    case 'reddit':
      return /^[a-zA-Z0-9_-]{3,20}$/.test(normalized);
    
    case 'telegram':
      return /^[a-zA-Z0-9_]{5,32}$/.test(normalized);
    
    case 'discord':
      return /^[a-zA-Z0-9._]{2,32}#[0-9]{4}$/.test(handle);
    
    case 'whatsapp_business':
      return /^[0-9]{8,15}$/.test(normalized);
    
    default:
      return normalized.length > 0;
  }
}

/**
 * Extract brand/person name from common formats
 */
export function extractBrandName(input: string): string | null {
  // Common patterns: "Nike - @nike", "Nike, instagram.com/nike", "Nike | @nike"
  const patterns = [
    /^([^,\-\|@]+)[\,\-\|]/,
    /^([^@]+)@/,
    /^([^h]+)https?:\/\//,
  ];

  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) {
      const name = match[1].trim();
      if (name.length > 1 && name.length < 100) {
        return name;
      }
    }
  }

  return null;
}

/**
 * Get platform-specific URL for handle
 */
export function getHandleURL(handle: string, platform: Platform): string {
  const normalized = normalizeHandle(handle, platform);
  
  switch (platform) {
    case 'instagram':
      return `https://instagram.com/${normalized}`;
    case 'twitter_x':
      return `https://x.com/${normalized}`;
    case 'linkedin':
      return `https://linkedin.com/company/${normalized}`;
    case 'tiktok':
      return `https://tiktok.com/@${normalized}`;
    case 'youtube':
      return `https://youtube.com/@${normalized}`;
    case 'reddit':
      return `https://reddit.com/u/${normalized}`;
    case 'telegram':
      return `https://t.me/${normalized}`;
    case 'threads':
      return `https://threads.net/@${normalized}`;
    case 'whatsapp_business':
      return `https://wa.me/${normalized}`;
    case 'discord':
      return handle; // Discord doesn't have direct URLs for users
    default:
      return handle;
  }
}

/**
 * Detect platform from URL or handle format
 */
export function detectPlatform(input: string): Platform | null {
  for (const pattern of PLATFORM_PATTERNS) {
    for (const regex of pattern.patterns) {
      if (regex.test(input)) {
        return pattern.platform;
      }
    }
  }
  return null;
} 