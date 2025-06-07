export interface Competitor {
  id: string
  brand_id: string
  name: string
  handle: string
  platform: 'instagram' | 'twitter' | 'linkedin' | 'tiktok' | 'youtube' | 'facebook'
  profile_url: string
  avatar_url?: string | null
  followers_count?: number | null
  following_count?: number | null
  posts_count?: number | null
  bio?: string | null
  category_id?: string | null
  is_active: boolean
  last_scraped_at?: string | null
  created_at: string
  updated_at: string
}

export interface CompetitorCategory {
  id: string
  brand_id: string
  name: string
  description?: string | null
  color: string
  competitor_count: number
  created_at: string
  updated_at: string
}

export interface CompetitorWithCategory extends Competitor {
  category?: CompetitorCategory | null
}

export interface CompetitorPost {
  id: string
  competitor_id: string
  platform_post_id: string
  content: string
  media_urls: string[]
  post_type: 'photo' | 'video' | 'carousel' | 'story' | 'reel' | 'text'
  likes_count: number
  comments_count: number
  shares_count: number
  saves_count?: number | null
  views_count?: number | null
  hashtags: string[]
  mentions: string[]
  posted_at: string
  scraped_at: string
  engagement_rate: number
  created_at: string
}

export interface ReportConfiguration {
  id: string
  brand_id: string
  name: string
  description?: string | null
  competitor_ids: string[]
  category_ids: string[]
  
  // Data to include
  include_recent_posts: boolean
  include_post_frequency: boolean
  include_engagement_metrics: boolean
  include_top_posts: boolean
  include_follower_growth: boolean
  include_posting_patterns: boolean
  include_hashtag_analysis: boolean
  include_keyword_mentions: boolean
  include_sentiment_analysis: boolean
  
  // Frequency settings
  frequency: 'realtime' | 'daily' | 'weekly' | 'monthly'
  custom_schedule?: string | null // cron expression for custom scheduling
  
  // Delivery settings
  delivery_methods: ('dashboard' | 'email' | 'telegram' | 'whatsapp' | 'slack')[]
  email_recipients?: string[]
  telegram_chat_id?: string | null
  whatsapp_number?: string | null
  slack_webhook?: string | null
  
  // Alert settings
  enable_instant_alerts: boolean
  alert_on_new_post: boolean
  alert_on_high_engagement: boolean
  engagement_threshold?: number | null
  
  is_active: boolean
  last_generated_at?: string | null
  created_at: string
  updated_at: string
}

export interface GeneratedReport {
  id: string
  report_config_id: string
  period_start: string
  period_end: string
  report_data: Json
  status: 'generating' | 'completed' | 'failed'
  error_message?: string | null
  generated_at: string
  created_at: string
}

export interface CompetitorAnalytics {
  competitor_id: string
  date: string
  followers_count: number
  following_count: number
  posts_count: number
  avg_engagement_rate: number
  total_likes: number
  total_comments: number
  total_shares: number
  posts_published: number
  top_hashtags: string[]
  created_at: string
}

export interface CompetitorInsight {
  id: string
  competitor_id: string
  insight_type: 'trending_hashtag' | 'viral_post' | 'engagement_spike' | 'posting_pattern' | 'audience_growth'
  title: string
  description: string
  data: Json
  importance_score: number
  detected_at: string
  created_at: string
}

export interface CompetitorComparison {
  metric: string
  your_brand: number
  competitors: {
    competitor_id: string
    name: string
    value: number
  }[]
  period: string
  improvement_suggestion?: string
}

export interface PostingPattern {
  competitor_id: string
  hour_distribution: number[] // 24 hours
  day_distribution: number[] // 7 days
  optimal_times: string[]
  posting_frequency: number
  consistency_score: number
}

export interface TrendingHashtag {
  hashtag: string
  usage_count: number
  competitors_using: string[]
  engagement_boost: number
  trend_direction: 'rising' | 'stable' | 'declining'
}

export interface ContentTheme {
  theme: string
  description: string
  post_count: number
  competitors: string[]
  avg_engagement: number
  trend_score: number
}

export interface EngagementAlert {
  id: string
  competitor_id: string
  post_id: string
  alert_type: 'new_post' | 'high_engagement' | 'viral_potential'
  threshold_value?: number
  actual_value: number
  message: string
  is_read: boolean
  created_at: string
}

// Analysis result types
export interface CompetitorAnalysisResult {
  competitor: CompetitorWithCategory
  recent_posts: CompetitorPost[]
  analytics: CompetitorAnalytics[]
  insights: CompetitorInsight[]
  posting_patterns: PostingPattern
  top_hashtags: TrendingHashtag[]
  engagement_trends: {
    date: string
    engagement_rate: number
    followers_growth: number
  }[]
}

export interface CompetitiveReport {
  id: string
  config: ReportConfiguration
  period: {
    start: string
    end: string
  }
  competitors: CompetitorAnalysisResult[]
  comparisons: CompetitorComparison[]
  trending_hashtags: TrendingHashtag[]
  content_themes: ContentTheme[]
  key_insights: string[]
  recommendations: string[]
  generated_at: string
}

// Filter and search types
export interface CompetitorFilter {
  categories?: string[]
  platforms?: string[]
  follower_range?: {
    min: number
    max: number
  }
  engagement_range?: {
    min: number
    max: number
  }
  last_active?: string
  search_query?: string
}

export interface ReportFilter {
  frequency?: string[]
  status?: string[]
  date_range?: {
    start: string
    end: string
  }
  search_query?: string
}

// API response types
export interface CompetitorListResponse {
  competitors: CompetitorWithCategory[]
  categories: CompetitorCategory[]
  total_count: number
  page: number
  per_page: number
}

export interface ReportListResponse {
  reports: (ReportConfiguration & { last_report?: GeneratedReport })[]
  total_count: number
  page: number
  per_page: number
}

// Form types
export interface CompetitorFormData {
  name: string
  handle: string
  platform: string
  profile_url: string
  category_id?: string
}

export interface CategoryFormData {
  name: string
  description?: string
  color: string
}

export interface ReportConfigFormData {
  name: string
  description?: string
  competitor_ids: string[]
  category_ids: string[]
  include_recent_posts: boolean
  include_post_frequency: boolean
  include_engagement_metrics: boolean
  include_top_posts: boolean
  include_follower_growth: boolean
  include_posting_patterns: boolean
  include_hashtag_analysis: boolean
  include_keyword_mentions: boolean
  include_sentiment_analysis: boolean
  frequency: string
  custom_schedule?: string
  delivery_methods: string[]
  email_recipients?: string[]
  telegram_chat_id?: string
  whatsapp_number?: string
  slack_webhook?: string
  enable_instant_alerts: boolean
  alert_on_new_post: boolean
  alert_on_high_engagement: boolean
  engagement_threshold?: number
}

// Utility types
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface DashboardStats {
  total_competitors: number
  active_reports: number
  unread_alerts: number
  insights_this_week: number
  top_performing_competitor: {
    name: string
    engagement_rate: number
  }
  trending_hashtags_count: number
} 