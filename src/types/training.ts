export interface TrainingPost {
  id: string;
  content: string;
  platform: 'twitter' | 'instagram' | 'linkedin' | 'tiktok' | 'youtube' | 'discord' | 'telegram' | 'reddit' | 'threads';
  type: 'automated' | 'suggested';
  status: 'posted' | 'pending' | 'rejected' | 'approved';
  createdAt: string;
  scheduledFor?: string;
  postedAt?: string;
  engagement?: {
    likes: number;
    shares: number;
    comments: number;
    views: number;
  };
  aiConfidence: number; // 0-100
  feedback?: PostFeedback;
}

export interface TrainingReply {
  id: string;
  content: string;
  platform: 'twitter' | 'instagram' | 'linkedin' | 'tiktok' | 'youtube' | 'discord' | 'telegram' | 'reddit' | 'threads';
  type: 'automated' | 'suggested';
  status: 'sent' | 'pending' | 'rejected' | 'approved';
  originalPost: {
    id: string;
    content: string;
    author: string;
  };
  createdAt: string;
  sentAt?: string;
  aiConfidence: number; // 0-100
  feedback?: PostFeedback;
}

export interface PostFeedback {
  id: string;
  postId: string;
  rating: 'like' | 'dislike';
  improvementSuggestion?: string;
  betterVersion?: string;
  whatWorked?: string; // For positive feedback
  categories: FeedbackCategory[];
  createdAt: string;
}

export type FeedbackCategory = 
  | 'tone' 
  | 'relevance' 
  | 'timing' 
  | 'hashtags' 
  | 'engagement' 
  | 'brand-voice' 
  | 'grammar' 
  | 'length' 
  | 'call-to-action' 
  | 'other';

export interface TrainingInsights {
  totalPosts: number;
  totalReplies: number;
  approvalRate: number;
  averageEngagement: number;
  topPerformingContent: TrainingPost[];
  improvementAreas: {
    category: FeedbackCategory;
    frequency: number;
    suggestion: string;
  }[];
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface TrainingFilters {
  dateRange: DateRange;
  platforms: string[];
  type: 'all' | 'automated' | 'suggested';
  status: 'all' | 'posted' | 'pending' | 'rejected' | 'approved';
  hasContent: 'all' | 'posts' | 'replies';
} 