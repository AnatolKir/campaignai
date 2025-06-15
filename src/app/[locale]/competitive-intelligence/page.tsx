"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UnifiedNavigation } from '../../../components/UnifiedNavigation';
import { 
  CompetitorWithCategory, 
  CompetitorCategory, 
  ReportConfiguration,
  ReportConfigFormData,
  DashboardStats,
  CompetitorFilter,
  EngagementAlert,
  TrendingHashtag,
  CompetitorComparison
} from '../../../types/competitive-intelligence';
import { CompetitorDetailModal } from '../../../components/CompetitorDetailModal';
import { ReportConfigModal } from '../../../components/ReportConfigModal';
import { useTranslations } from 'next-intl';

// Mock data for demonstration - in real app, this would come from API
const mockStats: DashboardStats = {
  total_competitors: 24,
  active_reports: 8,
  unread_alerts: 12,
  insights_this_week: 47,
  top_performing_competitor: {
    name: "@nike",
    engagement_rate: 4.8
  },
  trending_hashtags_count: 156
};

const mockCompetitors: CompetitorWithCategory[] = [
  {
    id: '1',
    brand_id: 'brand-1',
    name: 'Nike',
    handle: '@nike',
    platform: 'instagram',
    profile_url: 'https://instagram.com/nike',
    avatar_url: null,
    followers_count: 304000000,
    following_count: 147,
    posts_count: 1205,
    bio: 'Just Do It ✓',
    category_id: 'cat-1',
    is_active: true,
    last_scraped_at: '2024-01-15T10:30:00Z',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T10:30:00Z',
    category: {
      id: 'cat-1',
      brand_id: 'brand-1',
      name: 'Direct Competitors',
      description: 'Main competitors in our space',
      color: '#ef4444',
      competitor_count: 5,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  },
  {
    id: '2',
    brand_id: 'brand-1',
    name: 'Adidas',
    handle: '@adidas',
    platform: 'instagram',
    profile_url: 'https://instagram.com/adidas',
    avatar_url: null,
    followers_count: 25700000,
    following_count: 789,
    posts_count: 2145,
    bio: 'Impossible is Nothing',
    category_id: 'cat-1',
    is_active: true,
    last_scraped_at: '2024-01-15T10:25:00Z',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T10:25:00Z',
    category: {
      id: 'cat-1',
      brand_id: 'brand-1',
      name: 'Direct Competitors',
      description: 'Main competitors in our space',
      color: '#ef4444',
      competitor_count: 5,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  }
];

const mockCategories: CompetitorCategory[] = [
  {
    id: 'cat-1',
    brand_id: 'brand-1',
    name: 'Direct Competitors',
    description: 'Main competitors in our space',
    color: '#ef4444',
    competitor_count: 5,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-2',
    brand_id: 'brand-1',
    name: 'Market Leaders',
    description: 'Industry leaders we benchmark against',
    color: '#3b82f6',
    competitor_count: 3,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-3',
    brand_id: 'brand-1',
    name: 'Emerging Brands',
    description: 'New players gaining traction',
    color: '#10b981',
    competitor_count: 8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

const mockAlerts: EngagementAlert[] = [
  {
    id: '1',
    competitor_id: '1',
    post_id: 'post-1',
    alert_type: 'high_engagement',
    threshold_value: 100000,
    actual_value: 245000,
    message: 'Nike\'s latest post exceeded engagement threshold by 145%',
    is_read: false,
    created_at: '2024-01-15T09:30:00Z'
  },
  {
    id: '2',
    competitor_id: '2',
    post_id: 'post-2',
    alert_type: 'viral_potential',
    actual_value: 89000,
    message: 'Adidas post showing viral potential - 89K engagements in 2 hours',
    is_read: false,
    created_at: '2024-01-15T08:15:00Z'
  }
];

const mockTrendingHashtags: TrendingHashtag[] = [
  { hashtag: '#justdoit', usage_count: 45, competitors_using: ['Nike', 'Under Armour'], engagement_boost: 2.3, trend_direction: 'rising' },
  { hashtag: '#impossible', usage_count: 32, competitors_using: ['Adidas'], engagement_boost: 1.8, trend_direction: 'stable' },
  { hashtag: '#fitness', usage_count: 156, competitors_using: ['Nike', 'Adidas', 'Reebok'], engagement_boost: 1.4, trend_direction: 'rising' }
];

const mockReports: ReportConfiguration[] = [
  {
    id: 'report-1',
    brand_id: 'brand-1',
    name: 'Weekly Competitor Analysis',
    description: 'Comprehensive weekly analysis of all competitors',
    competitor_ids: ['1', '2'],
    category_ids: ['cat-1'],
    frequency: 'weekly',
    delivery_methods: ['email', 'dashboard'],
    include_recent_posts: true,
    include_post_frequency: true,
    include_engagement_metrics: true,
    include_top_posts: true,
    include_follower_growth: false,
    include_posting_patterns: true,
    include_hashtag_analysis: false,
    include_keyword_mentions: false,
    include_sentiment_analysis: false,
    enable_instant_alerts: true,
    alert_on_new_post: true,
    alert_on_high_engagement: true,
    engagement_threshold: 10000,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  }
];

export default function CompetitiveIntelligencePage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'competitors' | 'reports' | 'insights' | 'alerts'>('dashboard');
  const [competitors, setCompetitors] = useState<CompetitorWithCategory[]>(mockCompetitors);
  const [categories, setCategories] = useState<CompetitorCategory[]>(mockCategories);
  const [stats, setStats] = useState<DashboardStats>(mockStats);
  const [alerts, setAlerts] = useState<EngagementAlert[]>(mockAlerts);
  const [reports, setReports] = useState<ReportConfiguration[]>(mockReports);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [showReportConfig, setShowReportConfig] = useState(false);
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorWithCategory | null>(null);
  const [showPlatformSelector, setShowPlatformSelector] = useState(false);

  // Bulk actions state
  const [selectedCompetitors, setSelectedCompetitors] = useState<Set<string>>(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [bulkCategory, setBulkCategory] = useState('');

  // Available platforms for competitor management
  const platforms = [
    { id: 'twitter', name: 'X', icon: '𝕏', color: 'bg-black' },
    { id: 'instagram', name: 'Instagram', icon: '📷', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'in', color: 'bg-blue-600' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'bg-black' },
    { id: 'youtube', name: 'YouTube', icon: '▶', color: 'bg-red-600' },
  ];

  const t = useTranslations();

  // Filter competitors based on search and category
  const filteredCompetitors = competitors.filter(competitor => {
    const matchesSearch = competitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         competitor.handle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || competitor.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getEngagementRate = (competitor: CompetitorWithCategory): number => {
    // Mock calculation - in real app would be calculated from actual engagement data
    return Math.random() * 5 + 1;
  };

  // Competitor management functions
  const updateCompetitorCategory = (competitorId: string, newCategoryId: string) => {
    setCompetitors(competitors.map(comp => 
      comp.id === competitorId 
        ? { ...comp, category_id: newCategoryId, category: categories.find(cat => cat.id === newCategoryId) }
        : comp
    ));
  };

  const toggleCompetitorSelection = (competitorId: string) => {
    const newSelected = new Set(selectedCompetitors);
    if (newSelected.has(competitorId)) {
      newSelected.delete(competitorId);
    } else {
      newSelected.add(competitorId);
    }
    setSelectedCompetitors(newSelected);
    setShowBulkActions(newSelected.size > 0);
  };

  const selectAllCompetitors = () => {
    const allIds = new Set(filteredCompetitors.map(comp => comp.id));
    setSelectedCompetitors(allIds);
    setShowBulkActions(true);
  };

  const clearSelection = () => {
    setSelectedCompetitors(new Set());
    setShowBulkActions(false);
  };

  const applyBulkCategoryChange = () => {
    if (bulkCategory) {
      selectedCompetitors.forEach(competitorId => {
        updateCompetitorCategory(competitorId, bulkCategory);
      });
      clearSelection();
      setBulkCategory('');
    }
  };

  // Platform Selector Modal Component
  const PlatformSelectorModal = () => (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 ${showPlatformSelector ? '' : 'hidden'}`}>
      <div className="bg-slate-900 rounded-2xl p-8 max-w-2xl w-full mx-4 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Add Competitors</h3>
            <p className="text-gray-400 mt-1">Choose a platform to add your competitors to</p>
          </div>
          <button 
            onClick={() => setShowPlatformSelector(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {platforms.map((platform) => (
            <Link
              key={platform.id}
              href={`/accounts/${platform.id}?tab=targets&category=competitors&focus=true`}
              onClick={() => setShowPlatformSelector(false)}
              className="group p-6 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center text-white font-bold text-xl`}>
                  {platform.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold group-hover:text-purple-300 transition-colors">
                    {platform.name}
                  </h4>
                  <p className="text-gray-400 text-sm mt-1">
                    Add competitors to {platform.name.toLowerCase()}
                  </p>
                </div>
                <div className="text-gray-400 group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <span className="text-blue-400 text-lg">💡</span>
            <div>
              <h4 className="text-blue-400 font-medium mb-1">What happens next?</h4>
              <p className="text-gray-300 text-sm">
                You'll be taken directly to the Target Accounts tool with the "Competitors" category pre-selected. 
                Just paste, upload, or manually add your competitor handles and you're done!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DashboardTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Competitors</p>
              <p className="text-2xl font-bold text-white">{stats.total_competitors}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Reports</p>
              <p className="text-2xl font-bold text-white">{stats.active_reports}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Unread Alerts</p>
              <p className="text-2xl font-bold text-white">{stats.unread_alerts}</p>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Insights This Week</p>
              <p className="text-2xl font-bold text-white">{stats.insights_this_week}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <span className="text-blue-400 text-lg">🚀</span>
          <div>
            <h4 className="text-blue-400 font-medium mb-1">Get Started with Competitive Intelligence</h4>
            <p className="text-gray-300 text-sm mb-4">
              Monitor your competitors across social media platforms, track their performance, and get actionable insights to stay ahead.
            </p>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">• Add competitors from your Target Accounts</p>
              <p className="text-gray-300 text-sm">• Set up automated reports and alerts</p>
              <p className="text-gray-300 text-sm">• Get AI-powered insights and recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CompetitorsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Competitors</h2>
          <p className="text-gray-400">Manage and monitor your competition</p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-8 border border-white/10 text-center">
        <div className="text-6xl mb-4">👥</div>
        <h3 className="text-xl font-bold text-white mb-2">No Competitors Added Yet</h3>
        <p className="text-gray-400 mb-4">
          Add competitors using the Target Accounts tool to start monitoring their activity.
        </p>
      </div>
    </div>
  );

  const ReportsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Reports</h2>
          <p className="text-gray-400">Configure automated competitive intelligence reports</p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-8 border border-white/10 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-bold text-white mb-2">No Reports Configured</h3>
        <p className="text-gray-400 mb-4">
          Create your first competitive intelligence report to start monitoring your competition automatically.
        </p>
      </div>
    </div>
  );

  const InsightsTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Insights & Analytics</h2>
        <p className="text-gray-400">AI-powered competitive intelligence insights</p>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-8 border border-white/10 text-center">
        <div className="text-6xl mb-4">💡</div>
        <h3 className="text-xl font-bold text-white mb-2">Insights Coming Soon</h3>
        <p className="text-gray-400 mb-4">
          Add competitors and configure reports to start generating AI-powered insights.
        </p>
      </div>
    </div>
  );

  const AlertsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Alerts & Notifications</h2>
          <p className="text-gray-400">Real-time competitive intelligence alerts</p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-8 border border-white/10 text-center">
        <div className="text-6xl mb-4">🔔</div>
        <h3 className="text-xl font-bold text-white mb-2">No Alerts Yet</h3>
        <p className="text-gray-400 mb-4">
          Set up reports with instant alerts to get notified about competitor activity.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <UnifiedNavigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Competitive Intelligence</h1>
          <p className="text-gray-300">Monitor, analyze, and stay ahead of your competition</p>
        </div>

        <div className="flex flex-wrap space-x-1 mb-8 bg-white/5 p-1 rounded-xl border border-white/10">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'competitors', label: 'Competitors', icon: '👥' },
            { id: 'reports', label: 'Reports', icon: '📋' },
            { id: 'insights', label: 'Insights', icon: '💡' },
            { id: 'alerts', label: 'Alerts', icon: '🔔' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div>
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'competitors' && <CompetitorsTab />}
          {activeTab === 'reports' && <ReportsTab />}
          {activeTab === 'insights' && <InsightsTab />}
          {activeTab === 'alerts' && <AlertsTab />}
        </div>
      </div>
    </div>
  );
} 