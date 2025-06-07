"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UnifiedNavigation } from "../../components/UnifiedNavigation";
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
} from '../../types/competitive-intelligence';
import { CompetitorDetailModal } from '../../components/CompetitorDetailModal';
import { ReportConfigModal } from '../../components/ReportConfigModal';

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

export default function CompetitiveIntelligencePage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'competitors' | 'reports' | 'insights' | 'alerts'>('dashboard');
  const [competitors, setCompetitors] = useState<CompetitorWithCategory[]>(mockCompetitors);
  const [categories, setCategories] = useState<CompetitorCategory[]>(mockCategories);
  const [stats, setStats] = useState<DashboardStats>(mockStats);
  const [alerts, setAlerts] = useState<EngagementAlert[]>(mockAlerts);
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
      {/* Stats Cards */}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.586 3L3 10.586V21h7.414L18 13.414V3h-7.414zM5 19v-5.586L10.586 8H16v5.414L10.414 19H5z" />
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Recent Alerts</h3>
        <div className="space-y-3">
          {alerts.slice(0, 5).map((alert) => (
            <div key={alert.id} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                alert.alert_type === 'high_engagement' ? 'bg-green-400' :
                alert.alert_type === 'viral_potential' ? 'bg-yellow-400' : 'bg-blue-400'
              }`} />
              <div className="flex-1">
                <p className="text-white text-sm">{alert.message}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {new Date(alert.created_at).toLocaleDateString()} at {new Date(alert.created_at).toLocaleTimeString()}
                </p>
              </div>
              {!alert.is_read && (
                <span className="text-blue-400 text-xs bg-blue-500/20 px-2 py-1 rounded">New</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Trending Hashtags */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Trending Hashtags</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockTrendingHashtags.map((hashtag) => (
            <div key={hashtag.hashtag} className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-400 font-medium">{hashtag.hashtag}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  hashtag.trend_direction === 'rising' ? 'bg-green-500/20 text-green-400' :
                  hashtag.trend_direction === 'declining' ? 'bg-red-500/20 text-red-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {hashtag.trend_direction}
                </span>
              </div>
              <p className="text-gray-300 text-sm mb-1">Used {hashtag.usage_count} times</p>
              <p className="text-gray-400 text-xs">+{hashtag.engagement_boost}x engagement boost</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {hashtag.competitors_using.slice(0, 2).map((competitor) => (
                  <span key={competitor} className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                    {competitor}
                  </span>
                ))}
                {hashtag.competitors_using.length > 2 && (
                  <span className="text-xs text-gray-400">+{hashtag.competitors_using.length - 2} more</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CompetitorsTab = () => (
    <div className="space-y-6">
      {/* Header with search and filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Competitors</h2>
          <p className="text-gray-400">Monitor and analyze your competition</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowPlatformSelector(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold"
          >
            Add Competitors
          </button>
          <div className="text-gray-400 text-sm">
            Choose platform → Use <span className="text-purple-400 font-medium">Target Accounts tool</span> with pre-selected "Competitors" category
          </div>
        </div>
      </div>

      {/* Categorization Guide */}
      <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-orange-400 text-lg">🏷️</span>
          <div>
            <h4 className="text-orange-400 font-medium mb-1">Organize Your Competitors</h4>
            <p className="text-gray-300 text-sm mb-2">
              Categorize competitors for better analysis. Use the dropdown in each card or select multiple for bulk changes.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-gray-300">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Search, Filters, and Bulk Actions */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search competitors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id} className="bg-slate-800">
                {category.name} ({category.competitor_count})
              </option>
            ))}
          </select>
          
          {filteredCompetitors.length > 0 && (
            <div className="flex space-x-2">
              <button
                onClick={selectAllCompetitors}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm transition-colors"
              >
                Select All
              </button>
              {selectedCompetitors.size > 0 && (
                <button
                  onClick={clearSelection}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-white text-sm transition-colors"
                >
                  Clear ({selectedCompetitors.size})
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bulk Actions Bar */}
        {showBulkActions && (
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-purple-300 font-medium">
                  {selectedCompetitors.size} competitor{selectedCompetitors.size > 1 ? 's' : ''} selected
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm">Change category to:</span>
                  <select
                    value={bulkCategory}
                    onChange={(e) => setBulkCategory(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded px-3 py-1 text-white text-sm focus:border-purple-500 focus:outline-none"
                  >
                    <option value="">Choose category...</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id} className="bg-slate-800">
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={applyBulkCategoryChange}
                    disabled={!bulkCategory}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-1 rounded text-white text-sm transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
              <button
                onClick={clearSelection}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all ${
            selectedCategory === '' 
              ? 'bg-white/20 border-white/30 text-white' 
              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
          }`}
        >
          <span className="text-sm font-medium">All Categories</span>
          <span className="text-gray-400 text-xs">({competitors.length})</span>
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all ${
              selectedCategory === category.id 
                ? 'bg-white/20 border-white/30 text-white' 
                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span className="text-sm font-medium">{category.name}</span>
            <span className="text-gray-400 text-xs">({category.competitor_count})</span>
          </button>
        ))}
      </div>

      {/* Target Accounts Tool Instructions - Always Visible */}
      {(selectedCategory === '' || selectedCategory) && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">🎯</div>
            <div className="flex-1">
              <h3 className="text-purple-400 font-bold text-lg mb-2">
                {selectedCategory === '' 
                  ? 'Add More Competitors Across All Categories'
                  : `Add More ${categories.find(cat => cat.id === selectedCategory)?.name || 'Competitors'}`
                }
              </h3>
              <p className="text-gray-300 mb-3">
                Use the <span className="text-purple-400 font-medium underline">Target Accounts tool</span> to add competitors for analysis
              </p>
              <div className="bg-white/5 rounded-lg p-4 mb-4">
                <div className="text-purple-400 font-medium text-sm mb-2">📍 Quick Steps:</div>
                <ol className="text-gray-300 text-sm space-y-1">
                  <li>1. Click "Add Competitors" button above</li>
                  <li>2. Choose your platform (X, Instagram, etc.)</li>
                  <li>3. Add competitor handles in Target Accounts tool</li>
                  <li>4. Return here to categorize them (Direct, Market Leaders, etc.)</li>
                  <li>5. Get insights, reports, and competitive analysis!</li>
                </ol>
              </div>
              <button 
                onClick={() => setShowPlatformSelector(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold"
              >
                Add Competitors Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Competitors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompetitors.length === 0 ? (
          <div className="col-span-full bg-white/5 backdrop-blur-xl rounded-xl p-8 border border-white/10 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2">No Competitors Added Yet</h3>
            <p className="text-gray-400 mb-4">
              Use the <button onClick={() => setShowPlatformSelector(true)} className="text-purple-400 hover:text-purple-300 font-medium underline cursor-pointer">Target Accounts tool</button> to add competitors for analysis
            </p>
            <div className="bg-white/5 rounded-lg p-4 text-left max-w-md mx-auto mb-4">
              <div className="text-white font-medium text-sm mb-2">📍 Quick Steps:</div>
              <ol className="text-gray-300 text-sm space-y-1">
                <li>1. Click "Add Competitors" button above</li>
                <li>2. Choose your platform (X, Instagram, etc.)</li>
                <li>3. Add competitor handles in Target Accounts tool</li>
                <li>4. Return here to categorize them (Direct, Market Leaders, etc.)</li>
                <li>5. Get insights, reports, and competitive analysis!</li>
              </ol>
            </div>
            <button 
              onClick={() => setShowPlatformSelector(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold"
            >
              Add Competitors Now
            </button>
          </div>
        ) : (
          filteredCompetitors.map((competitor) => (
          <div key={competitor.id} className={`bg-white/5 backdrop-blur-xl rounded-xl p-6 border transition-all ${
            selectedCompetitors.has(competitor.id) 
              ? 'border-purple-500 bg-purple-500/10' 
              : 'border-white/10 hover:border-white/20'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selectedCompetitors.has(competitor.id)}
                    onChange={() => toggleCompetitorSelection(competitor.id)}
                    className="absolute top-0 left-0 w-4 h-4 text-purple-600 rounded focus:ring-purple-500 focus:ring-2 bg-white/10 border-white/30"
                  />
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-lg ml-6">
                    {competitor.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{competitor.name}</h3>
                  <p className="text-gray-400 text-sm">{competitor.handle}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${competitor.is_active ? 'bg-green-400' : 'bg-gray-400'}`} />
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded capitalize">
                  {competitor.platform}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Followers</span>
                <span className="text-white font-semibold">{formatNumber(competitor.followers_count || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Posts</span>
                <span className="text-white font-semibold">{formatNumber(competitor.posts_count || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Engagement Rate</span>
                <span className="text-green-400 font-semibold">{getEngagementRate(competitor).toFixed(1)}%</span>
              </div>
            </div>

            {/* Enhanced Category Selection */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Competitor Type:</span>
                <select
                  value={competitor.category_id || ''}
                  onChange={(e) => updateCompetitorCategory(competitor.id, e.target.value)}
                  className="bg-white/5 border border-white/10 rounded px-3 py-1 text-white text-sm focus:border-purple-500 focus:outline-none hover:bg-white/10 transition-colors"
                >
                  <option value="" className="bg-slate-800">Choose type...</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id} className="bg-slate-800">
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {competitor.category && (
                <div className="flex items-center space-x-2 mt-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: competitor.category.color }}
                  />
                  <span className="text-gray-300 text-xs">{competitor.category.name}</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex space-x-2">
              <button 
                onClick={() => setSelectedCompetitor(competitor)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 px-3 rounded-lg text-sm transition-colors"
              >
                View Details
              </button>
              <button 
                onClick={() => setSelectedCompetitor(competitor)}
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-lg text-sm transition-colors"
              >
                Analyze
              </button>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );

  // Mock data for existing reports
  const mockReports: (ReportConfiguration & { last_report?: any })[] = [
    {
      id: 'report-1',
      brand_id: 'brand-1',
      name: 'Weekly Competitor Analysis',
      description: 'Comprehensive weekly analysis of direct competitors',
      competitor_ids: ['1', '2'],
      category_ids: ['cat-1'],
      include_recent_posts: true,
      include_post_frequency: true,
      include_engagement_metrics: true,
      include_top_posts: true,
      include_follower_growth: false,
      include_posting_patterns: true,
      include_hashtag_analysis: false,
      include_keyword_mentions: false,
      include_sentiment_analysis: false,
      frequency: 'weekly',
      delivery_methods: ['dashboard', 'email'],
      email_recipients: ['team@company.com'],
      enable_instant_alerts: true,
      alert_on_new_post: true,
      alert_on_high_engagement: true,
      engagement_threshold: 50000,
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-15T10:30:00Z',
      last_report: {
        id: 'gen-1',
        status: 'completed',
        generated_at: '2024-01-15T09:00:00Z'
      }
    },
    {
      id: 'report-2',
      brand_id: 'brand-1',
      name: 'Market Leaders Monthly Deep Dive',
      description: 'Monthly comprehensive analysis of market leaders',
      competitor_ids: [],
      category_ids: ['cat-2'],
      include_recent_posts: true,
      include_post_frequency: true,
      include_engagement_metrics: true,
      include_top_posts: true,
      include_follower_growth: true,
      include_posting_patterns: true,
      include_hashtag_analysis: true,
      include_keyword_mentions: true,
      include_sentiment_analysis: true,
      frequency: 'monthly',
      delivery_methods: ['dashboard', 'email', 'slack'],
      email_recipients: ['leadership@company.com'],
      slack_webhook: 'https://hooks.slack.com/services/...',
      enable_instant_alerts: false,
      alert_on_new_post: false,
      alert_on_high_engagement: false,
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-10T15:20:00Z'
    }
  ];

  const [reports, setReports] = useState(mockReports);

  const handleSaveReport = (reportData: ReportConfigFormData) => {
    const newReport: ReportConfiguration & { last_report?: any } = {
      id: `report-${Date.now()}`,
      brand_id: 'brand-1',
      ...reportData,
      frequency: reportData.frequency as 'realtime' | 'daily' | 'weekly' | 'monthly',
      delivery_methods: reportData.delivery_methods as ('dashboard' | 'email' | 'telegram' | 'whatsapp' | 'slack')[],
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setReports([...reports, newReport]);
  };

  const toggleReportStatus = (reportId: string) => {
    setReports(reports.map(report => 
      report.id === reportId 
        ? { ...report, is_active: !report.is_active, updated_at: new Date().toISOString() }
        : report
    ));
  };

  const deleteReport = (reportId: string) => {
    setReports(reports.filter(report => report.id !== reportId));
  };

  const getReportDataOptionsCount = (report: ReportConfiguration) => {
    const options = [
      'include_recent_posts', 'include_post_frequency', 'include_engagement_metrics',
      'include_top_posts', 'include_follower_growth', 'include_posting_patterns',
      'include_hashtag_analysis', 'include_keyword_mentions', 'include_sentiment_analysis'
    ];
    return options.filter(option => report[option as keyof ReportConfiguration]).length;
  };

  const getFrequencyLabel = (frequency: string) => {
    const labels = {
      'realtime': 'Real-time',
      'daily': 'Daily',
      'weekly': 'Weekly',
      'monthly': 'Monthly'
    };
    return labels[frequency as keyof typeof labels] || frequency;
  };

  const getDeliveryMethodIcons = (methods: string[]) => {
    const icons = {
      'dashboard': '📊',
      'email': '📧',
      'slack': '💬',
      'telegram': '✈️',
      'whatsapp': '📱'
    };
    return methods.map(method => icons[method as keyof typeof icons] || '📤').join(' ');
  };

  const ReportsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Reports</h2>
          <p className="text-gray-400">Configure automated competitive intelligence reports</p>
        </div>
        <button 
          onClick={() => setShowReportConfig(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold"
        >
          Create Report
        </button>
      </div>

      {competitors.length === 0 ? (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <span className="text-blue-400 text-lg">💡</span>
            <div>
              <h4 className="text-blue-400 font-medium mb-1">Add Competitors First</h4>
              <p className="text-gray-300 text-sm">
                Before creating reports, add competitors using the <button onClick={() => setShowPlatformSelector(true)} className="text-blue-400 hover:text-blue-300 font-medium underline cursor-pointer">Target Accounts tool</button>. 
                Choose your platform → Target Accounts → "Competitors" category auto-selected.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <span className="text-green-400 text-lg">✅</span>
            <div>
              <h4 className="text-green-400 font-medium mb-1">Ready to Create Reports</h4>
              <p className="text-gray-300 text-sm">
                You have {competitors.length} competitors across {categories.length} categories. 
                Click "Create Report" to set up automated competitive intelligence reports.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Reports Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Reports</p>
              <p className="text-2xl font-bold text-white">{reports.length}</p>
            </div>
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-blue-400">📋</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Reports</p>
              <p className="text-2xl font-bold text-white">{reports.filter(r => r.is_active).length}</p>
            </div>
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-green-400">✅</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Instant Alerts</p>
              <p className="text-2xl font-bold text-white">{reports.filter(r => r.enable_instant_alerts).length}</p>
            </div>
            <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <span className="text-yellow-400">⚡</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Delivery Methods</p>
              <p className="text-2xl font-bold text-white">{Array.from(new Set(reports.flatMap(r => r.delivery_methods))).length}</p>
            </div>
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <span className="text-purple-400">📤</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-8 border border-white/10 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-2">No Reports Configured</h3>
            <p className="text-gray-400 mb-4">
              Create your first competitive intelligence report to start monitoring your competition automatically.
            </p>
            <button 
              onClick={() => setShowReportConfig(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold"
            >
              Create Your First Report
            </button>
          </div>
        ) : (
          reports.map((report) => (
            <div key={report.id} className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{report.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      report.is_active 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {report.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                      {getFrequencyLabel(report.frequency)}
                    </span>
                  </div>
                  
                  {report.description && (
                    <p className="text-gray-400 text-sm mb-3">{report.description}</p>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Competitors:</span>
                      <div className="text-white mt-1">
                        {report.competitor_ids.length > 0 && (
                          <span>{report.competitor_ids.length} individual</span>
                        )}
                        {report.category_ids.length > 0 && (
                          <span className={report.competitor_ids.length > 0 ? 'ml-2' : ''}>
                            {report.category_ids.length} categories
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-400">Data Points:</span>
                      <div className="text-white mt-1">
                        {getReportDataOptionsCount(report)} selected
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-400">Delivery:</span>
                      <div className="text-white mt-1">
                        {getDeliveryMethodIcons(report.delivery_methods)} {report.delivery_methods.length} methods
                      </div>
                    </div>
                  </div>
                  
                  {report.enable_instant_alerts && (
                    <div className="mt-3 flex items-center space-x-2">
                      <span className="text-yellow-400 text-sm">⚡</span>
                      <span className="text-yellow-400 text-sm">
                        Instant alerts enabled
                        {report.engagement_threshold && ` (threshold: ${formatNumber(report.engagement_threshold)})`}
                      </span>
                    </div>
                  )}
                  
                  {report.last_report && (
                    <div className="mt-3 text-xs text-gray-400">
                      Last generated: {new Date(report.last_report.generated_at).toLocaleDateString()} at {new Date(report.last_report.generated_at).toLocaleTimeString()}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleReportStatus(report.id)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      report.is_active
                        ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                        : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                    }`}
                  >
                    {report.is_active ? 'Pause' : 'Activate'}
                  </button>
                  
                  <button
                    className="px-3 py-1 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded text-sm font-medium transition-colors"
                  >
                    View Report
                  </button>
                  
                  <div className="relative group">
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                    <div className="absolute right-0 top-8 bg-slate-800 border border-white/10 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-10">
                      <div className="p-2 space-y-1">
                        <button className="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded">
                          Edit Report
                        </button>
                        <button className="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded">
                          Duplicate
                        </button>
                        <button className="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded">
                          Export Settings
                        </button>
                        <hr className="border-white/10" />
                        <button 
                          onClick={() => deleteReport(report.id)}
                          className="block w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded"
                        >
                          Delete Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Setup Templates */}
      {reports.length === 0 && competitors.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Quick Setup Templates</h3>
          <p className="text-gray-400 mb-6">Get started quickly with pre-configured report templates for common use cases.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: 'Weekly Competitive Overview',
                description: 'Basic weekly analysis of competitor activity',
                icon: '📊',
                features: ['Recent Posts', 'Engagement Metrics', 'Top Posts'],
                frequency: 'weekly'
              },
              {
                name: 'Daily Social Monitoring',
                description: 'Daily alerts and competitor post tracking',
                icon: '👀',
                features: ['New Post Alerts', 'High Engagement', 'Real-time Updates'],
                frequency: 'daily'
              },
              {
                name: 'Monthly Deep Dive',
                description: 'Comprehensive monthly competitive analysis',
                icon: '🔍',
                features: ['All Data Points', 'Trends', 'Sentiment Analysis'],
                frequency: 'monthly'
              }
            ].map((template) => (
              <div key={template.name} className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <div className="text-2xl mb-2">{template.icon}</div>
                <h4 className="text-white font-medium mb-2">{template.name}</h4>
                <p className="text-gray-400 text-sm mb-3">{template.description}</p>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature) => (
                      <span key={feature} className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-400">
                    {template.frequency} reports
                  </div>
                </div>
                <button 
                  onClick={() => setShowReportConfig(true)}
                  className="w-full mt-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 py-2 rounded text-sm transition-colors"
                >
                  Use Template
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const InsightsTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Insights & Analytics</h2>
        <p className="text-gray-400">AI-powered competitive intelligence insights</p>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <span className="text-blue-400 text-lg">🎯</span>
          <div>
            <h4 className="text-blue-400 font-medium mb-1">Insights Based on Your Competitors</h4>
            <p className="text-gray-300 text-sm">
              These insights are generated from competitors you've added via the <button onClick={() => setShowPlatformSelector(true)} className="text-blue-400 hover:text-blue-300 font-medium underline cursor-pointer">Target Accounts tool</button>. 
              Add more competitors to get richer insights and comparisons.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Comparison */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Performance Comparison</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Engagement Rate</span>
                <span className="text-green-400">+0.8%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">You: 3.2% vs Avg Competitor: 2.4%</p>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Posting Frequency</span>
                <span className="text-red-400">-2 posts/week</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">You: 5 posts/week vs Avg Competitor: 7 posts/week</p>
            </div>
          </div>
        </div>

        {/* Content Themes */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Trending Content Themes</h3>
          <div className="space-y-3">
            {[
              { theme: 'Sustainability', posts: 45, engagement: 4.2, trend: 'rising' },
              { theme: 'User Generated Content', posts: 32, engagement: 3.8, trend: 'stable' },
              { theme: 'Behind the Scenes', posts: 28, engagement: 3.4, trend: 'rising' },
              { theme: 'Product Launches', posts: 22, engagement: 5.1, trend: 'stable' }
            ].map((theme) => (
              <div key={theme.theme} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white font-medium text-sm">{theme.theme}</p>
                  <p className="text-gray-400 text-xs">{theme.posts} posts • {theme.engagement}% avg engagement</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  theme.trend === 'rising' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {theme.trend}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Posting Patterns */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 lg:col-span-2">
          <h3 className="text-xl font-bold text-white mb-4">Optimal Posting Times</h3>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={day} className="text-center">
                <p className="text-gray-400 text-xs mb-2">{day}</p>
                <div className="space-y-1">
                  {[9, 12, 15, 18, 21].map((hour) => {
                    const intensity = Math.random();
                    return (
                      <div 
                        key={hour}
                        className={`h-6 rounded text-xs flex items-center justify-center ${
                          intensity > 0.7 ? 'bg-green-500 text-white' :
                          intensity > 0.4 ? 'bg-yellow-500 text-black' :
                          'bg-gray-700 text-gray-400'
                        }`}
                      >
                        {hour}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-4 mt-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-400">High Activity</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-gray-400">Medium Activity</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-700 rounded"></div>
              <span className="text-gray-400">Low Activity</span>
            </div>
          </div>
        </div>
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
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold">
          Configure Alerts
        </button>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <span className="text-blue-400 text-lg">🔔</span>
          <div>
            <h4 className="text-blue-400 font-medium mb-1">Alerts Monitor Your Competitors</h4>
            <p className="text-gray-300 text-sm">
              Alerts are generated based on competitor activity. Add competitors using the <button onClick={() => setShowPlatformSelector(true)} className="text-blue-400 hover:text-blue-300 font-medium underline cursor-pointer">Target Accounts tool</button> 
              to start receiving notifications about their posts, engagement spikes, and trending content.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`w-3 h-3 rounded-full mt-2 ${
                  alert.alert_type === 'high_engagement' ? 'bg-green-400' :
                  alert.alert_type === 'viral_potential' ? 'bg-yellow-400' : 'bg-blue-400'
                }`} />
                <div>
                  <h3 className="text-white font-semibold mb-1">{alert.message}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{new Date(alert.created_at).toLocaleDateString()}</span>
                    <span>{new Date(alert.created_at).toLocaleTimeString()}</span>
                    <span className="capitalize">{alert.alert_type.replace('_', ' ')}</span>
                  </div>
                  {alert.threshold_value && (
                    <p className="text-xs text-gray-500 mt-1">
                      Threshold: {formatNumber(alert.threshold_value)} | Actual: {formatNumber(alert.actual_value)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!alert.is_read && (
                  <span className="text-blue-400 text-xs bg-blue-500/20 px-2 py-1 rounded">New</span>
                )}
                <button className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top Navigation */}
      <UnifiedNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Competitive Intelligence</h1>
          <p className="text-gray-300">Monitor, analyze, and stay ahead of your competition</p>
        </div>

        {/* Navigation Tabs */}
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
              {tab.id === 'alerts' && alerts.filter(a => !a.is_read).length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {alerts.filter(a => !a.is_read).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'competitors' && <CompetitorsTab />}
          {activeTab === 'reports' && <ReportsTab />}
          {activeTab === 'insights' && <InsightsTab />}
          {activeTab === 'alerts' && <AlertsTab />}
        </div>

        {/* Modals */}
        <PlatformSelectorModal />
        
        <ReportConfigModal
          isOpen={showReportConfig}
          onClose={() => setShowReportConfig(false)}
          competitors={competitors}
          categories={categories}
          onSave={handleSaveReport}
        />

        {selectedCompetitor && (
          <CompetitorDetailModal
            competitor={selectedCompetitor}
            isOpen={!!selectedCompetitor}
            onClose={() => setSelectedCompetitor(null)}
          />
        )}
      </div>
    </div>
  );
} 