export interface Advertiser {
  name: string;
  logo: string;
  verified: boolean;
  rating?: number;
  totalCampaigns?: number;
}

export interface Campaign {
  title: string;
  description: string;
  requirements: string[];
  content: string;
  hashtags?: string[];
  mentions?: string[];
}

export interface Payment {
  amount: number;
  currency: string;
  paymentMethod?: 'per_post' | 'per_engagement' | 'flat_rate';
  bonusConditions?: string[];
}

export interface Schedule {
  postDate: string;
  postTime: string;
  timezone?: string;
  flexibility?: 'exact' | 'within_hour' | 'within_day';
}

export interface Offer {
  id: string;
  advertiser: Advertiser;
  campaign: Campaign;
  payment: Payment;
  schedule: Schedule;
  deadline: string;
  platforms: string[];
  category: string;
  targetAudience?: string[];
  estimatedReach?: number;
  status?: 'available' | 'pending' | 'accepted' | 'declined' | 'expired';
  createdAt?: string;
  updatedAt?: string;
}

export interface Earning {
  id: string;
  date: string;
  advertiser: string;
  campaign: string;
  amount: number;
  status: 'completed' | 'pending' | 'scheduled' | 'cancelled';
  platform: string;
  postId?: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    views?: number;
  };
  payoutDate?: string;
  transactionId?: string;
}

export interface PayoutSettings {
  method: 'paypal' | 'bank_transfer' | 'stripe' | 'crypto';
  frequency: 'weekly' | 'bi_weekly' | 'monthly';
  minimumAmount: number;
  currency: string;
  accountDetails: {
    accountNumber?: string;
    routingNumber?: string;
    email?: string;
    walletAddress?: string;
  };
  taxInformation?: {
    taxId: string;
    w9Submitted: boolean;
    country: string;
  };
}

export interface EarningsReport {
  dateRange: {
    start: string;
    end: string;
  };
  totalEarnings: number;
  platformBreakdown: Record<string, number>;
  categoryBreakdown: Record<string, number>;
  topAdvertisers: Array<{
    name: string;
    earnings: number;
    campaigns: number;
  }>;
  averageRatePerPost: number;
  completionRate: number;
  trends: {
    daily: Array<{ date: string; amount: number }>;
    weekly: Array<{ week: string; amount: number }>;
    monthly: Array<{ month: string; amount: number }>;
  };
}

export interface MonetizationMetrics {
  totalOffers: number;
  acceptedOffers: number;
  declinedOffers: number;
  pendingOffers: number;
  averageOfferValue: number;
  totalEarnings: number;
  pendingEarnings: number;
  completedEarnings: number;
  acceptanceRate: number;
  averageCompletionTime: number;
}

// Advertiser-specific types

export interface CreatorProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  verified: boolean;
  followers: Record<string, number>; // platform -> follower count
  engagementRate: Record<string, number>; // platform -> engagement rate
  categories: string[];
  location?: string;
  languages: string[];
  averageRate: number;
  completedCampaigns: number;
  rating: number;
  responseTime: string; // e.g., "2-4 hours"
  platforms: string[];
  demographics: {
    ageRange: string;
    genderSplit: Record<string, number>;
    topLocations: string[];
  };
  recentPosts: Array<{
    platform: string;
    content: string;
    engagement: number;
    date: string;
  }>;
  isOptedIn: boolean;
}

export interface CampaignDraft {
  id: string;
  title: string;
  description: string;
  content: string;
  requirements: string[];
  platforms: string[];
  category: string;
  budget: {
    total: number;
    perCreator: number;
    currency: string;
  };
  targeting: {
    minFollowers: Record<string, number>; // platform -> min followers
    maxFollowers?: Record<string, number>;
    categories: string[];
    locations?: string[];
    languages?: string[];
    minEngagementRate?: number;
    demographics?: {
      ageRange?: string;
      genders?: string[];
    };
  };
  schedule: {
    startDate: string;
    endDate: string;
    postTiming: 'flexible' | 'specific';
    specificTimes?: Array<{
      date: string;
      time: string;
    }>;
  };
  deliverables: {
    postCount: number;
    contentType: string[];
    hashtagsRequired: string[];
    mentionsRequired: string[];
    additionalRequirements?: string[];
  };
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface CampaignApplication {
  id: string;
  campaignId: string;
  creatorId: string;
  creatorProfile: CreatorProfile;
  proposedRate: number;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  appliedAt: string;
  respondedAt?: string;
}

export interface AdvertiserMetrics {
  totalCampaigns: number;
  activeCampaigns: number;
  completedCampaigns: number;
  totalSpent: number;
  averageCampaignCost: number;
  totalReach: number;
  totalEngagements: number;
  averageEngagementRate: number;
  completionRate: number;
  averageCreatorRating: number;
  topPerformingCategories: Array<{
    category: string;
    campaigns: number;
    avgEngagement: number;
  }>;
  platformBreakdown: Record<string, {
    campaigns: number;
    spent: number;
    reach: number;
    engagement: number;
  }>;
}

export interface AdvertiserPaymentSettings {
  method: 'credit_card' | 'bank_transfer' | 'paypal' | 'stripe';
  autoPayEnabled: boolean;
  spendingLimit: {
    daily?: number;
    weekly?: number;
    monthly?: number;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  taxInformation: {
    businessName?: string;
    taxId?: string;
    vatNumber?: string;
  };
  paymentHistory: Array<{
    id: string;
    amount: number;
    date: string;
    campaignId: string;
    status: 'completed' | 'pending' | 'failed';
  }>;
}

export interface CreatorSearchFilters {
  platforms?: string[];
  categories?: string[];
  minFollowers?: Record<string, number>;
  maxFollowers?: Record<string, number>;
  minEngagementRate?: number;
  locations?: string[];
  languages?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  completedCampaigns?: number;
  responseTime?: string;
  verified?: boolean;
} 