// Role/Title options for the dropdown
export const ROLE_OPTIONS = [
  { value: 'owner_founder', label: 'Owner/Founder' },
  { value: 'ceo', label: 'CEO' },
  { value: 'cmo', label: 'CMO/Head of Marketing' },
  { value: 'marketing_director', label: 'Marketing Director' },
  { value: 'marketing_manager', label: 'Marketing Manager' },
  { value: 'social_media_manager', label: 'Social Media Manager' },
  { value: 'digital_marketing_manager', label: 'Digital Marketing Manager' },
  { value: 'content_manager', label: 'Content Manager' },
  { value: 'marketing_coordinator', label: 'Marketing Coordinator' },
  { value: 'junior_marketing_specialist', label: 'Junior Marketing Specialist' },
  { value: 'freelancer_consultant', label: 'Freelancer/Consultant' },
  { value: 'agency_owner', label: 'Agency Owner' },
  { value: 'other', label: 'Other' }
] as const;

export type RoleType = typeof ROLE_OPTIONS[number]['value'];

// Company size options
export const COMPANY_SIZE_OPTIONS = [
  { value: 'solopreneur', label: 'Just me (Solopreneur)' },
  { value: '2-5', label: '2-5 employees' },
  { value: '6-10', label: '6-10 employees' },
  { value: '11-25', label: '11-25 employees' },
  { value: '26-50', label: '26-50 employees' },
  { value: '51-100', label: '51-100 employees' },
  { value: '101-500', label: '101-500 employees' },
  { value: '501+', label: '500+ employees' }
] as const;

export type CompanySizeType = typeof COMPANY_SIZE_OPTIONS[number]['value'];

// Monthly spend on social media tools and staff (not ads)
export const MONTHLY_SPEND_OPTIONS = [
  { value: '0-500', label: '$0 - $500' },
  { value: '501-1000', label: '$501 - $1,000' },
  { value: '1001-2500', label: '$1,001 - $2,500' },
  { value: '2501-5000', label: '$2,501 - $5,000' },
  { value: '5001-10000', label: '$5,001 - $10,000' },
  { value: '10001-25000', label: '$10,001 - $25,000' },
  { value: '25001-50000', label: '$25,001 - $50,000' },
  { value: '50001+', label: '$50,001+' }
] as const;

export type MonthlySpendType = typeof MONTHLY_SPEND_OPTIONS[number]['value'];

// Hours spent on social media management per week
export const WEEKLY_HOURS_OPTIONS = [
  { value: '0-2', label: '0-2 hours' },
  { value: '3-5', label: '3-5 hours' },
  { value: '6-10', label: '6-10 hours' },
  { value: '11-20', label: '11-20 hours' },
  { value: '21-30', label: '21-30 hours' },
  { value: '31-40', label: '31-40 hours' },
  { value: '40+', label: '40+ hours' }
] as const;

export type WeeklyHoursType = typeof WEEKLY_HOURS_OPTIONS[number]['value'];

// Team size dedicated to social media management
export const TEAM_SIZE_OPTIONS = [
  { value: '0', label: 'No dedicated team (I handle it myself)' },
  { value: '1', label: '1 person' },
  { value: '2-3', label: '2-3 people' },
  { value: '4-5', label: '4-5 people' },
  { value: '6-10', label: '6-10 people' },
  { value: '11+', label: '11+ people' }
] as const;

export type TeamSizeType = typeof TEAM_SIZE_OPTIONS[number]['value'];

// Social Media Management Tools - Organized by category
export const SOCIAL_MEDIA_TOOLS = {
  // Established Social Media Management Platforms
  established: [
    'Hootsuite',
    'Buffer',
    'Sprout Social',
    'Later',
    'Agorapulse',
    'SocialBee',
    'CoSchedule',
    'Sendible',
    'Loomly',
    'MeetEdgar'
  ],
  
  // AI-Powered Social Media Tools
  ai_powered: [
    'Jasper (formerly Jarvis)',
    'Copy.ai',
    'Writesonic',
    'Lately',
    'Predis.ai',
    'Flick',
    'Ocoya',
    'Simplified',
    'Publer',
    'SocialPilot AI'
  ],
  
  // Content Creation Tools
  content_creation: [
    'Canva',
    'Adobe Creative Suite',
    'Figma',
    'Unsplash',
    'Pexels',
    'Loom',
    'Animoto',
    'InVideo',
    'Kapwing',
    'Crello'
  ],
  
  // Analytics & Reporting
  analytics: [
    'Google Analytics',
    'Facebook Analytics',
    'Instagram Insights',
    'LinkedIn Analytics',
    'Twitter Analytics',
    'TikTok Analytics',
    'Socialbakers',
    'Brandwatch',
    'Mention',
    'BuzzSumo'
  ],
  
  // Other Options
  other: [
    'In-House Proprietary Tools',
    'Custom Built Solution',
    'Freelancer/Agency Tools',
    'Other (please specify)'
  ]
};

// Form data interfaces
export interface Step1Data {
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  role: RoleType;
  consentedToMarketing: boolean;
}

export interface Step2Data {
  companySize: CompanySizeType;
  monthlySpend: MonthlySpendType;
  weeklyHours: WeeklyHoursType;
  teamSize: TeamSizeType;
  currentTools: string[];
  biggestChallenge: string;
  primaryGoal: string;
}

export interface EarlyAccessSignup {
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  company_name: string;
  role: RoleType;
  company_size: CompanySizeType;
  monthly_marketing_spend: MonthlySpendType;
  weekly_hours_on_social: WeeklyHoursType;
  team_size: TeamSizeType;
  current_tools: string[];
  biggest_challenge: string;
  primary_goal: string;
  consented_to_marketing: boolean;
  signup_order: number;
  source: string;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface EarlyAccessResponse {
  success: boolean;
  signupOrder: number;
  message: string;
} 