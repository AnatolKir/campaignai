"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { UnifiedNavigation } from '../../../components/UnifiedNavigation';
import { Post, PostFilters, BulkAction } from "@/types/posts";

export default function PostsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [filters, setFilters] = useState<PostFilters>({
    status: [],
    platforms: [],
    type: [],
    dateRange: { start: "", end: "" },
    category: [],
    searchTerm: ""
  });
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'published'>('all');
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Helper function to create locale-aware URLs
  const createLocalizedUrl = (path: string) => {
    return `/${locale}${path}`;
  };

  // Mock data - in real app, this would come from an API
  const mockPosts: Post[] = [
    {
      id: "1",
      content: "Just discovered an amazing new productivity hack that's been game-changing for my workflow! 🚀 #ProductivityTips #WorkSmart",
      platform: "twitter",
      scheduledTime: "2024-01-15T14:30:00Z",
      status: "pending",
      type: "automated",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      hashtags: ["ProductivityTips", "WorkSmart"],
      aiConfidence: 0.85,
      category: "industry-insights",
      approvalMethod: "whatsapp"
    },
    {
      id: "2",
      content: "Behind the scenes of today's brainstorming session. Sometimes the best ideas come from unexpected places. 💡",
      platform: "instagram",
      scheduledTime: "2024-01-15T16:15:00Z",
      status: "pending",
      type: "suggested",
      createdAt: "2024-01-15T11:30:00Z",
      updatedAt: "2024-01-15T11:30:00Z",
      mediaUrls: ["https://example.com/image1.jpg"],
      aiConfidence: 0.92,
      category: "company-updates",
      approvalMethod: "telegram"
    },
    {
      id: "3",
      content: "Sharing insights on how AI is transforming content creation and audience engagement in 2025. What trends are you watching?",
      platform: "linkedin",
      scheduledTime: "2024-01-15T18:00:00Z",
      status: "approved",
      type: "automated",
      createdAt: "2024-01-15T12:00:00Z",
      updatedAt: "2024-01-15T13:00:00Z",
      aiConfidence: 0.88,
      category: "trending-topics",
      approvalMethod: "in-app"
    },
    {
      id: "4",
      content: "Customer success story: How @TechCorp increased their social engagement by 300% using our platform! 📈",
      platform: "twitter",
      scheduledTime: "2024-01-15T20:00:00Z",
      status: "rejected",
      type: "suggested",
      createdAt: "2024-01-15T09:00:00Z",
      updatedAt: "2024-01-15T14:00:00Z",
      mentions: ["TechCorp"],
      aiConfidence: 0.75,
      category: "promotional",
      approvalMethod: "whatsapp",
      rejectionReason: "Too promotional for current audience"
    },
    {
      id: "5",
      content: "The future of social media automation is here. Our latest feature update brings even more intelligent posting capabilities.",
      platform: "linkedin",
      scheduledTime: "2024-01-14T15:00:00Z",
      status: "published",
      type: "automated",
      createdAt: "2024-01-14T10:00:00Z",
      updatedAt: "2024-01-14T10:00:00Z",
      engagement: {
        likes: 142,
        shares: 23,
        comments: 18,
        reach: 2841
      },
      aiConfidence: 0.94,
      category: "company-updates"
    }
  ];

  useEffect(() => {
    // In real app, fetch posts from API
    setPosts(mockPosts);
  }, [mockPosts]);

  const filteredPosts = posts.filter(post => {
    // Apply tab filter
    if (activeTab !== 'all' && post.status !== activeTab) return false;
    
    // Apply other filters
    if (filters.status.length > 0 && !filters.status.includes(post.status)) return false;
    if (filters.platforms.length > 0 && !filters.platforms.includes(post.platform)) return false;
    if (filters.type.length > 0 && !filters.type.includes(post.type)) return false;
    if (filters.category.length > 0 && post.category && !filters.category.includes(post.category)) return false;
    if (filters.searchTerm && !post.content.toLowerCase().includes(filters.searchTerm.toLowerCase())) return false;
    
    return true;
  });

  const handlePostAction = (postId: string, action: string, details?: any) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : post.status,
            updatedAt: new Date().toISOString(),
            rejectionReason: action === 'reject' ? details?.reason : undefined
          }
        : post
    ));
  };

  const handleBulkAction = (action: BulkAction) => {
    const { action: actionType, postIds, details } = action;
    
    setPosts(prev => prev.map(post => 
      postIds.includes(post.id)
        ? {
            ...post,
            status: actionType === 'approve' ? 'approved' : 
                   actionType === 'reject' ? 'rejected' : post.status,
            scheduledTime: details?.newScheduleTime || post.scheduledTime,
            updatedAt: new Date().toISOString(),
            rejectionReason: actionType === 'reject' ? details?.rejectionReason : undefined
          }
        : post
    ));
    
    setSelectedPosts([]);
    setShowBulkActions(false);
  };

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      twitter: "𝕏",
      instagram: "📷",
      linkedin: "💼",
      tiktok: "🎵",
      youtube: "▶️",
      discord: "💬",
      telegram: "✈️",
      reddit: "🤖",
      threads: "@"
    };
    return icons[platform] || "📱";
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-400/30",
      approved: "bg-green-500/20 text-green-400 border-green-400/30",
      rejected: "bg-red-500/20 text-red-400 border-red-400/30",
      published: "bg-blue-500/20 text-blue-400 border-blue-400/30",
      draft: "bg-gray-500/20 text-gray-400 border-gray-400/30",
      failed: "bg-red-500/20 text-red-400 border-red-400/30"
    };
    return colors[status] || "bg-gray-500/20 text-gray-400 border-gray-400/30";
  };

  const tabs = [
    { key: 'all', label: t('posts.all_posts'), count: posts.length },
    { key: 'pending', label: t('posts.pending'), count: posts.filter(p => p.status === 'pending').length },
    { key: 'approved', label: t('posts.approved'), count: posts.filter(p => p.status === 'approved').length },
    { key: 'rejected', label: t('posts.rejected'), count: posts.filter(p => p.status === 'rejected').length },
    { key: 'published', label: t('posts.published'), count: posts.filter(p => p.status === 'published').length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <UnifiedNavigation />
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{t('posts.management')}</h1>
            <p className="text-gray-300">{t('posts.description')}</p>
          </div>
          <div className="flex space-x-4">
            <Link href={createLocalizedUrl("/create-post")} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
              {t('posts.create_post')}
            </Link>
            <button className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all">
              {t('posts.bulk_actions')}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {tabs.map((tab) => (
            <div key={tab.key} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">{tab.count}</div>
              <div className="text-gray-300 text-sm">{tab.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-white/5 backdrop-blur-lg rounded-2xl p-2 border border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{t('posts.search_posts')}</label>
              <input
                type="text"
                placeholder="Type to search..."
                value={filters.searchTerm}
                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{t('posts.platform')}</label>
              <select 
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(e) => {
                  const value = e.target.value;
                  setFilters(prev => ({
                    ...prev,
                    platforms: value ? [value] : []
                  }));
                }}
              >
                <option value="">{t('posts.all_platforms')}</option>
                <option value="twitter">{t('posts.platforms.twitter')}</option>
                <option value="instagram">{t('posts.platforms.instagram')}</option>
                <option value="linkedin">{t('posts.platforms.linkedin')}</option>
                <option value="tiktok">{t('posts.platforms.tiktok')}</option>
                <option value="youtube">{t('posts.platforms.youtube')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{t('posts.type')}</label>
              <select 
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(e) => {
                  const value = e.target.value;
                  setFilters(prev => ({
                    ...prev,
                    type: value ? [value] : []
                  }));
                }}
              >
                <option value="">{t('posts.all_types')}</option>
                <option value="automated">{t('posts.automated')}</option>
                <option value="suggested">{t('posts.suggested')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{t('posts.category')}</label>
              <select 
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(e) => {
                  const value = e.target.value;
                  setFilters(prev => ({
                    ...prev,
                    category: value ? [value] : []
                  }));
                }}
              >
                <option value="">{t('posts.all_categories')}</option>
                <option value="industry-insights">{t('posts.categories.industry_insights')}</option>
                <option value="company-updates">{t('posts.categories.company_updates')}</option>
                <option value="engagement">{t('posts.categories.engagement')}</option>
                <option value="trending-topics">{t('posts.categories.trending_topics')}</option>
                <option value="promotional">{t('posts.categories.promotional')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedPosts.length > 0 && (
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-4 border border-purple-500/30 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-white">{t('posts.x_posts_selected', { count: selectedPosts.length })}</span>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleBulkAction({ action: 'approve', postIds: selectedPosts })}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  {t('posts.approve_all')}
                </button>
                <button
                  onClick={() => handleBulkAction({ action: 'reject', postIds: selectedPosts, details: { rejectionReason: 'Bulk rejection' } })}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  {t('posts.reject_all')}
                </button>
                <button
                  onClick={() => setSelectedPosts([])}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {t('posts.clear_selection')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={selectedPosts.includes(post.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPosts(prev => [...prev, post.id]);
                    } else {
                      setSelectedPosts(prev => prev.filter(id => id !== post.id));
                    }
                  }}
                  className="mt-2 w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                />
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getPlatformIcon(post.platform)}</span>
                      <span className="text-sm text-gray-300 capitalize">{t(`posts.platforms.${post.platform}`)}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(post.status)}`}>
                      {t(`posts.${post.status}`)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      post.type === 'automated' 
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30' 
                        : 'bg-purple-500/20 text-purple-400 border border-purple-400/30'
                    }`}>
                      {t(`posts.${post.type}`)}
                    </span>
                    {post.category && (
                      <span className="px-3 py-1 rounded-full text-xs bg-gray-500/20 text-gray-400 border border-gray-400/30">
                        {t(`posts.categories.${post.category.replace('-', '_')}`)}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-white mb-3 leading-relaxed">{post.content}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span>{t('posts.scheduled')}: {new Date(post.scheduledTime).toLocaleString()}</span>
                      {post.aiConfidence && (
                        <span>{t('posts.ai_confidence')}: {Math.round(post.aiConfidence * 100)}%</span>
                      )}
                    </div>
                    
                    {post.engagement && (
                      <div className="flex items-center space-x-4">
                        <span>{t('posts.likes')}: {post.engagement.likes}</span>
                        <span>{t('posts.shares')}: {post.engagement.shares}</span>
                        <span>{t('posts.comments')}: {post.engagement.comments}</span>
                        <span>{t('posts.reach')}: {post.engagement.reach}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  {post.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handlePostAction(post.id, 'approve')}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        {t('posts.approve')}
                      </button>
                      <button
                        onClick={() => handlePostAction(post.id, 'reject', { reason: 'Manual rejection' })}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        {t('posts.reject')}
                      </button>
                    </>
                  )}
                  
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    {t('posts.edit')}
                  </button>
                  
                  {post.status !== 'published' && (
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                      {t('posts.reschedule')}
                    </button>
                  )}
                  
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                    {t('posts.duplicate')}
                  </button>
                  
                  {post.status === 'published' && (
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                      {t('posts.boost')}
                    </button>
                  )}
                  
                  {post.approvalMethod === 'whatsapp' && (
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm">
                      {t('posts.whatsapp')}
                    </button>
                  )}
                  
                  {post.approvalMethod === 'telegram' && (
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                      {t('posts.telegram')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">{t('posts.no_posts_found')}</div>
            <Link href={createLocalizedUrl("/create-post")} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
              {t('posts.create_first_post')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 