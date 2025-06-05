export interface PlatformStats {
  followers: string;
  following: string;
  posts: string;
  engagement: string;
}

export interface PlatformData {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  isConnected: boolean;
  isPaused?: boolean;
  stats?: PlatformStats;
}

export interface CompetitorData {
  id: string;
  username: string;
  displayName: string;
  lastPost: string;
  engagement: string;
  avatar?: string;
}

export interface TargetAccount {
  id: number;
  username: string;
  category: 'competitors' | 'emulate' | 'engagement-targets' | 'potential-customers' | 'industry-leaders' | 'influencers' | 'partners' | 'media';
  status: 'active' | 'paused';
  addedDate: string;
  notes?: string;
}

export interface AccountCategory {
  id: string;
  label: string;
  color: string;
  description: string;
}

export interface PostPerformance {
  id: string;
  content: string;
  likes: number;
  shares: number;
  comments: number;
  engagement: number;
  platform: string;
  timestamp: string;
}

export interface AutomationSettings {
  isEnabled: boolean;
  postingFrequency: '1x daily' | '3x daily' | '5x daily';
  contentTypes: {
    industryInsights: boolean;
    companyUpdates: boolean;
    engagementPosts: boolean;
    trendingTopics: boolean;
  };
  suggestionMode?: {
    method: 'telegram' | 'whatsapp' | 'discord';
    contactInfo: string;
  };
}

export interface PlatformPermissions {
  readPosts: boolean;
  createPosts: boolean;
  followAccounts: boolean;
  accessDMs: boolean;
}

export type PlatformType = 'twitter' | 'instagram' | 'linkedin' | 'tiktok' | 'youtube' | 'discord' | 'telegram' | 'reddit' | 'threads';

export interface ActivityLog {
  id: string;
  type: 'post' | 'engagement' | 'dm' | 'follow' | 'unfollow';
  description: string;
  timestamp: string;
  platform: PlatformType;
  status: 'success' | 'pending' | 'failed';
} 