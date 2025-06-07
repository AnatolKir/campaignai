"use client";

import React, { useState } from 'react';
import { CompetitorWithCategory, CompetitorPost } from '../types/competitive-intelligence';

interface CompetitorDetailModalProps {
  competitor: CompetitorWithCategory;
  isOpen: boolean;
  onClose: () => void;
}

// Mock post data
const mockPosts: CompetitorPost[] = [
  {
    id: 'post-1',
    competitor_id: '1',
    platform_post_id: 'ig-123456',
    content: 'Just Do It. The latest collection is here. #justdoit #nike #newcollection',
    media_urls: ['https://example.com/image1.jpg'],
    post_type: 'photo',
    likes_count: 245000,
    comments_count: 3200,
    shares_count: 1800,
    saves_count: 12000,
    views_count: null,
    hashtags: ['#justdoit', '#nike', '#newcollection'],
    mentions: [],
    posted_at: '2024-01-15T09:00:00Z',
    scraped_at: '2024-01-15T10:00:00Z',
    engagement_rate: 4.8,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'post-2',
    competitor_id: '1',
    platform_post_id: 'ig-123457',
    content: 'Behind the scenes of our latest campaign. The dedication is real. 💪',
    media_urls: ['https://example.com/video1.mp4'],
    post_type: 'video',
    likes_count: 189000,
    comments_count: 2100,
    shares_count: 980,
    saves_count: 8500,
    views_count: 850000,
    hashtags: ['#behindthescenes', '#nike', '#dedication'],
    mentions: [],
    posted_at: '2024-01-14T15:30:00Z',
    scraped_at: '2024-01-14T16:00:00Z',
    engagement_rate: 3.9,
    created_at: '2024-01-14T16:00:00Z'
  }
];

const mockAnalytics = {
  weekly_growth: {
    followers: 2.3,
    engagement: 0.8,
    posts: 5
  },
  posting_patterns: {
    best_times: ['9:00 AM', '3:00 PM', '7:00 PM'],
    frequency: 6.2,
    consistency: 85
  },
  top_hashtags: [
    { tag: '#justdoit', usage: 45, engagement_boost: 2.3 },
    { tag: '#nike', usage: 89, engagement_boost: 1.8 },
    { tag: '#fitness', usage: 23, engagement_boost: 2.1 }
  ]
};

export function CompetitorDetailModal({ competitor, isOpen, onClose }: CompetitorDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'analytics' | 'insights'>('overview');

  if (!isOpen) return null;

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 p-6 bg-white/5 rounded-lg">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
          {competitor.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">{competitor.name}</h3>
          <p className="text-gray-400">{competitor.handle}</p>
          <p className="text-gray-300 text-sm mt-1">{competitor.bio}</p>
        </div>
        <div className="text-right">
          <span className={`inline-block w-3 h-3 rounded-full ${competitor.is_active ? 'bg-green-400' : 'bg-gray-400'} mr-2`} />
          <span className="text-sm text-gray-400 capitalize">{competitor.platform}</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-white">{formatNumber(competitor.followers_count || 0)}</p>
          <p className="text-gray-400 text-sm">Followers</p>
          <p className="text-green-400 text-xs mt-1">+{mockAnalytics.weekly_growth.followers}% this week</p>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-white">{formatNumber(competitor.posts_count || 0)}</p>
          <p className="text-gray-400 text-sm">Posts</p>
          <p className="text-blue-400 text-xs mt-1">{mockAnalytics.weekly_growth.posts} this week</p>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-white">{(Math.random() * 5 + 1).toFixed(1)}%</p>
          <p className="text-gray-400 text-sm">Engagement Rate</p>
          <p className="text-green-400 text-xs mt-1">+{mockAnalytics.weekly_growth.engagement}% this week</p>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-white">{mockAnalytics.posting_patterns.frequency}</p>
          <p className="text-gray-400 text-sm">Posts/Week</p>
          <p className="text-purple-400 text-xs mt-1">{mockAnalytics.posting_patterns.consistency}% consistent</p>
        </div>
      </div>

      {/* Category & Last Scraped */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {competitor.category && (
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">Category</h4>
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: competitor.category.color }}
              />
              <span className="text-gray-300">{competitor.category.name}</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">{competitor.category.description}</p>
          </div>
        )}
        
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2">Last Updated</h4>
          <p className="text-gray-300">{competitor.last_scraped_at ? formatDate(competitor.last_scraped_at) : 'Never'}</p>
          <p className="text-gray-400 text-sm mt-1">Data freshness indicator</p>
        </div>
      </div>

      {/* Top Hashtags */}
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-3">Top Hashtags</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {mockAnalytics.top_hashtags.map((hashtag) => (
            <div key={hashtag.tag} className="bg-white/5 rounded p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-blue-400 font-medium">{hashtag.tag}</span>
                <span className="text-xs text-gray-400">{hashtag.usage} uses</span>
              </div>
              <p className="text-xs text-green-400">+{hashtag.engagement_boost}x engagement</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PostsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Recent Posts</h3>
        <span className="text-sm text-gray-400">{mockPosts.length} posts analyzed</span>
      </div>
      
      {mockPosts.map((post) => (
        <div key={post.id} className="bg-white/5 rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <p className="text-white text-sm leading-relaxed">{post.content}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {post.hashtags.map((hashtag) => (
                  <span key={hashtag} className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>
            <div className="ml-4 text-right">
              <span className={`text-xs px-2 py-1 rounded capitalize ${
                post.post_type === 'video' ? 'bg-red-500/20 text-red-400' :
                post.post_type === 'photo' ? 'bg-green-500/20 text-green-400' :
                'bg-purple-500/20 text-purple-400'
              }`}>
                {post.post_type}
              </span>
              <p className="text-xs text-gray-400 mt-1">{formatDate(post.posted_at)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-white font-semibold">{formatNumber(post.likes_count)}</p>
              <p className="text-gray-400 text-xs">Likes</p>
            </div>
            <div>
              <p className="text-white font-semibold">{formatNumber(post.comments_count)}</p>
              <p className="text-gray-400 text-xs">Comments</p>
            </div>
            <div>
              <p className="text-white font-semibold">{formatNumber(post.shares_count)}</p>
              <p className="text-gray-400 text-xs">Shares</p>
            </div>
            <div>
              <p className="text-green-400 font-semibold">{post.engagement_rate.toFixed(1)}%</p>
              <p className="text-gray-400 text-xs">Engagement</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const AnalyticsTab = () => (
    <div className="space-y-6">
      {/* Posting Pattern Heatmap */}
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-4">Posting Patterns</h4>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={day} className="text-center">
              <p className="text-gray-400 text-xs mb-2">{day}</p>
              <div className="space-y-1">
                {[9, 12, 15, 18, 21].map((hour) => {
                  const intensity = Math.random();
                  return (
                    <div 
                      key={hour}
                      className={`h-4 rounded text-xs flex items-center justify-center ${
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
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-white font-semibold">{mockAnalytics.posting_patterns.frequency} posts/week</p>
            <p className="text-gray-400 text-xs">Average Frequency</p>
          </div>
          <div>
            <p className="text-white font-semibold">{mockAnalytics.posting_patterns.consistency}%</p>
            <p className="text-gray-400 text-xs">Consistency Score</p>
          </div>
          <div>
            <p className="text-white font-semibold">{mockAnalytics.posting_patterns.best_times.length}</p>
            <p className="text-gray-400 text-xs">Optimal Times</p>
          </div>
        </div>
      </div>

      {/* Best Posting Times */}
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-3">Optimal Posting Times</h4>
        <div className="flex flex-wrap gap-2">
          {mockAnalytics.posting_patterns.best_times.map((time) => (
            <span key={time} className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm">
              {time}
            </span>
          ))}
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-400">+{mockAnalytics.weekly_growth.followers}%</p>
          <p className="text-gray-400 text-sm">Follower Growth</p>
          <p className="text-xs text-gray-500 mt-1">This week</p>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">+{mockAnalytics.weekly_growth.engagement}%</p>
          <p className="text-gray-400 text-sm">Engagement Growth</p>
          <p className="text-xs text-gray-500 mt-1">This week</p>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-purple-400">{mockAnalytics.weekly_growth.posts}</p>
          <p className="text-gray-400 text-sm">Posts Published</p>
          <p className="text-xs text-gray-500 mt-1">This week</p>
        </div>
      </div>
    </div>
  );

  const InsightsTab = () => (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-3">AI-Generated Insights</h4>
        <div className="space-y-3">
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <span className="text-green-400 text-sm">💡</span>
              <div>
                <h5 className="text-green-400 font-medium text-sm">Strong Engagement Pattern</h5>
                <p className="text-gray-300 text-sm mt-1">
                  {competitor.name} consistently posts during high-engagement hours (9 AM, 3 PM, 7 PM) 
                  resulting in 23% higher engagement than industry average.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <span className="text-blue-400 text-sm">📈</span>
              <div>
                <h5 className="text-blue-400 font-medium text-sm">Content Strategy Success</h5>
                <p className="text-gray-300 text-sm mt-1">
                  Behind-the-scenes content generates 2.1x more engagement than product posts. 
                  Consider incorporating more BTS content in your strategy.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-400 text-sm">⚠️</span>
              <div>
                <h5 className="text-yellow-400 font-medium text-sm">Hashtag Opportunity</h5>
                <p className="text-gray-300 text-sm mt-1">
                  {competitor.name} is underutilizing trending hashtags like #sustainability and #wellness 
                  which show 40% higher engagement in your industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-3">Competitive Recommendations</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <p>• Adopt their optimal posting times: {mockAnalytics.posting_patterns.best_times.join(', ')}</p>
          <p>• Increase behind-the-scenes content frequency</p>
          <p>• Experiment with their top-performing hashtags: {mockAnalytics.top_hashtags.map(h => h.tag).join(', ')}</p>
          <p>• Match their posting consistency of {mockAnalytics.posting_patterns.frequency} posts per week</p>
          <p>• Focus on engagement-driven content rather than just reach</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000000] flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-lg rounded-3xl border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white">{competitor.name} Analytics</h2>
            <p className="text-gray-400">{competitor.handle} • {competitor.platform}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 px-6 pt-4 border-b border-white/10">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'posts', label: 'Recent Posts', icon: '📝' },
            { id: 'analytics', label: 'Analytics', icon: '📈' },
            { id: 'insights', label: 'AI Insights', icon: '🧠' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white/10 text-white border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'posts' && <PostsTab />}
          {activeTab === 'analytics' && <AnalyticsTab />}
          {activeTab === 'insights' && <InsightsTab />}
        </div>
      </div>
    </div>
  );
} 