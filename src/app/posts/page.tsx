"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Post, PostFilters, BulkAction } from "@/types/posts";
import { UnifiedNavigation } from "../../components/UnifiedNavigation";

export default function PostsPage() {
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
  }, []);

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
    { key: 'all', label: 'All Posts', count: posts.length },
    { key: 'pending', label: 'Pending', count: posts.filter(p => p.status === 'pending').length },
    { key: 'approved', label: 'Approved', count: posts.filter(p => p.status === 'approved').length },
    { key: 'rejected', label: 'Rejected', count: posts.filter(p => p.status === 'rejected').length },
    { key: 'published', label: 'Published', count: posts.filter(p => p.status === 'published').length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Top Navigation */}
      <UnifiedNavigation />

      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Posts Management</h1>
            <p className="text-gray-300">Manage your automated and suggested posts across all platforms</p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
              Create Post
            </button>
            <button className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all">
              Bulk Actions
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
        <div className="flex space-x-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search posts..."
                value={filters.searchTerm}
                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
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
                <option value="">All Platforms</option>
                <option value="twitter">Twitter/X</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="tiktok">TikTok</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
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
                <option value="">All Types</option>
                <option value="automated">Automated</option>
                <option value="suggested">Suggested</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
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
                <option value="">All Categories</option>
                <option value="industry-insights">Industry Insights</option>
                <option value="company-updates">Company Updates</option>
                <option value="engagement">Engagement</option>
                <option value="trending-topics">Trending Topics</option>
                <option value="promotional">Promotional</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedPosts.length > 0 && (
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-4 border border-purple-500/30 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-white">{selectedPosts.length} posts selected</span>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleBulkAction({ action: 'approve', postIds: selectedPosts })}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Approve All
                </button>
                <button
                  onClick={() => handleBulkAction({ action: 'reject', postIds: selectedPosts, details: { rejectionReason: 'Bulk rejection' } })}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={() => setSelectedPosts([])}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
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
                    className="mt-1 w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getPlatformIcon(post.platform)}</span>
                        <span className="text-sm text-gray-300 capitalize">{post.platform}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(post.status)}`}>
                        {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        post.type === 'automated' 
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30' 
                          : 'bg-purple-500/20 text-purple-400 border border-purple-400/30'
                      }`}>
                        {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                      </span>
                      {post.category && (
                        <span className="px-3 py-1 rounded-full text-xs bg-gray-500/20 text-gray-400 border border-gray-400/30">
                          {post.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-white mb-3 leading-relaxed">{post.content}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-300">
                      <span>Scheduled: {new Date(post.scheduledTime).toLocaleString()}</span>
                      {post.aiConfidence && (
                        <span>AI Confidence: {Math.round(post.aiConfidence * 100)}%</span>
                      )}
                      {post.approvalMethod && (
                        <span>Approval: {post.approvalMethod}</span>
                      )}
                    </div>
                    
                    {post.rejectionReason && (
                      <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-red-400 text-sm">
                          <strong>Rejection Reason:</strong> {post.rejectionReason}
                        </p>
                      </div>
                    )}
                    
                    {post.engagement && (
                      <div className="mt-3 grid grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-white">{post.engagement.likes}</div>
                          <div className="text-xs text-gray-400">Likes</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-white">{post.engagement.shares}</div>
                          <div className="text-xs text-gray-400">Shares</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-white">{post.engagement.comments}</div>
                          <div className="text-xs text-gray-400">Comments</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-white">{post.engagement.reach}</div>
                          <div className="text-xs text-gray-400">Reach</div>
                        </div>
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
                        Approve
                      </button>
                      <button
                        onClick={() => handlePostAction(post.id, 'reject', { reason: 'Manual rejection' })}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Edit
                  </button>
                  
                  {post.status !== 'published' && (
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                      Reschedule
                    </button>
                  )}
                  
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                    Duplicate
                  </button>
                  
                  {post.status === 'published' && (
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                      Boost
                    </button>
                  )}
                  
                  {post.approvalMethod === 'whatsapp' && (
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm">
                      WhatsApp
                    </button>
                  )}
                  
                  {post.approvalMethod === 'telegram' && (
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                      Telegram
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No posts found matching your criteria</div>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
              Create Your First Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 