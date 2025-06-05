export interface Post {
  id: string;
  content: string;
  platform: 'twitter' | 'instagram' | 'linkedin' | 'tiktok' | 'youtube' | 'discord' | 'telegram' | 'reddit' | 'threads';
  scheduledTime: string;
  status: 'pending' | 'approved' | 'rejected' | 'published' | 'failed' | 'draft';
  type: 'automated' | 'suggested';
  createdAt: string;
  updatedAt: string;
  mediaUrls?: string[];
  hashtags?: string[];
  mentions?: string[];
  engagement?: {
    likes: number;
    shares: number;
    comments: number;
    reach: number;
  };
  aiConfidence?: number;
  category?: 'industry-insights' | 'company-updates' | 'engagement' | 'trending-topics' | 'promotional';
  approvalMethod?: 'whatsapp' | 'telegram' | 'discord' | 'in-app';
  rejectionReason?: string;
}

export interface PostAction {
  id: string;
  postId: string;
  action: 'approve' | 'reject' | 'edit' | 'reschedule' | 'cancel' | 'duplicate' | 'boost';
  userId: string;
  timestamp: string;
  details?: any;
}

export interface PostTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
  variables: string[];
  platforms: string[];
  isActive: boolean;
}

export interface PostAnalytics {
  totalPosts: number;
  pendingPosts: number;
  approvedPosts: number;
  rejectedPosts: number;
  publishedPosts: number;
  avgEngagement: number;
  bestPerformingPost: Post;
  platformBreakdown: Record<string, number>;
  timeSlotPerformance: Record<string, number>;
}

export interface PostFilters {
  status: string[];
  platforms: string[];
  type: string[];
  dateRange: {
    start: string;
    end: string;
  };
  category: string[];
  searchTerm: string;
}

export interface BulkAction {
  action: 'approve' | 'reject' | 'reschedule' | 'cancel' | 'delete';
  postIds: string[];
  details?: {
    newScheduleTime?: string;
    rejectionReason?: string;
  };
} 