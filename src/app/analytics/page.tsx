"use client";

import { useState } from "react";
import Link from "next/link";
import { UnifiedNavigation } from "../../components/UnifiedNavigation";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  const tabs = ["Overview", "Growth", "Performance", "Audience", "Content Analysis", "Competitor Insights"];

  const overviewMetrics = [
    { label: "Total Followers", value: "47.2K", change: "+12.5%", positive: true, icon: "👥" },
    { label: "Total Reach", value: "124.8K", change: "+18.3%", positive: true, icon: "📊" },
    { label: "Engagement Rate", value: "4.8%", change: "+0.9%", positive: true, icon: "❤️" },
    { label: "Click-through Rate", value: "2.3%", change: "-0.2%", positive: false, icon: "🔗" }
  ];

  const platformMetrics = [
    { platform: "X", followers: "18.4K", growth: "+8.2%", engagement: "5.2%", color: "bg-black" },
    { platform: "Instagram", followers: "15.7K", growth: "+15.1%", engagement: "6.8%", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { platform: "LinkedIn", followers: "8.9K", growth: "+22.3%", engagement: "3.4%", color: "bg-blue-600" },
    { platform: "TikTok", followers: "4.2K", growth: "+45.7%", engagement: "8.1%", color: "bg-gray-800" }
  ];

  const weeklyData = [
    { day: "Mon", reach: 12400, engagement: 845, clicks: 156 },
    { day: "Tue", reach: 10800, engagement: 721, clicks: 134 },
    { day: "Wed", reach: 15600, engagement: 1203, clicks: 189 },
    { day: "Thu", reach: 13200, engagement: 967, clicks: 167 },
    { day: "Fri", reach: 18900, engagement: 1456, clicks: 234 },
    { day: "Sat", reach: 9800, engagement: 623, clicks: 98 },
    { day: "Sun", reach: 11200, engagement: 789, clicks: 123 }
  ];

  const topPosts = [
    {
      id: 1,
      content: "🚀 Just launched our new AI automation feature! Game-changing results for social media management...",
      platform: "twitter",
      metrics: { likes: 1247, shares: 89, comments: 156, reach: "24.5K" }
    },
    {
      id: 2,
      content: "Behind the scenes: How AI is revolutionizing digital marketing strategies in 2024",
      platform: "linkedin",
      metrics: { likes: 892, shares: 67, comments: 203, reach: "18.2K" }
    },
    {
      id: 3,
      content: "Weekend vibes: Creating content that converts 📈✨ #MarketingTips",
      platform: "instagram",
      metrics: { likes: 2156, shares: 134, comments: 298, reach: "31.7K" }
    }
  ];

  const audienceInsights = [
    { label: "Primary Age Group", value: "25-34 years", percentage: 42 },
    { label: "Top Location", value: "United States", percentage: 35 },
    { label: "Peak Activity", value: "2-4 PM EST", percentage: 68 },
    { label: "Gender Split", value: "52% Male, 48% Female", percentage: 52 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Top Navigation */}
      <UnifiedNavigation />

      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-300">Comprehensive insights into your social media performance</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <select 
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="all">All Platforms</option>
                                <option value="twitter">X</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="tiktok">TikTok</option>
          </select>
          <button className="bg-purple-600 px-4 py-2 rounded-lg text-white hover:bg-purple-700 transition-colors">
            Export Report
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "Overview" && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewMetrics.map((metric, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-gray-300 text-sm">{metric.label}</h3>
                    <span className="text-2xl">{metric.icon}</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                  <div className={`text-sm ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
                    {metric.change} from last period
                  </div>
                </div>
              ))}
            </div>

            {/* Weekly Performance Chart */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Weekly Performance Overview</h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {weeklyData.map((day, index) => {
                  const maxHeight = 200;
                  const reachHeight = (day.reach / 20000) * maxHeight;
                  return (
                    <div key={day.day} className="flex-1 flex flex-col items-center">
                      <div className="w-full relative" style={{ height: `${maxHeight}px` }}>
                        <div 
                          className="absolute bottom-0 w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg"
                          style={{ height: `${reachHeight}px` }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-300">
                            {(day.reach / 1000).toFixed(1)}K
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">{day.day}</div>
                    </div>
                  );
                })}
              </div>
              <div className="text-sm text-gray-300 text-center mt-2">Daily Reach (Thousands)</div>
            </div>

            {/* Platform Performance */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Platform Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {platformMetrics.map((platform, index) => (
                  <div key={index} className="flex items-center p-4 bg-white/5 rounded-lg">
                    <div className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center mr-4`}>
                      <span className="text-white font-bold text-sm">
                        {platform.platform.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{platform.platform}</h4>
                      <div className="flex space-x-4 text-sm text-gray-300">
                        <span>{platform.followers} followers</span>
                        <span className="text-green-400">{platform.growth}</span>
                        <span>{platform.engagement} engagement</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "Growth" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Follower Growth Chart */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Follower Growth Trend</h3>
                <div className="h-64 relative">
                  <svg className="w-full h-full" viewBox="0 0 300 200">
                    <defs>
                      <linearGradient id="growthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1"/>
                      </linearGradient>
                    </defs>
                    <path
                      d="M20 180 L60 160 L100 140 L140 120 L180 100 L220 85 L260 70"
                      stroke="#8b5cf6"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M20 180 L60 160 L100 140 L140 120 L180 100 L220 85 L260 70 L260 200 L20 200 Z"
                      fill="url(#growthGradient)"
                    />
                    {[
                      { x: 20, y: 180, value: "41.2K" },
                      { x: 60, y: 160, value: "42.1K" },
                      { x: 100, y: 140, value: "43.8K" },
                      { x: 140, y: 120, value: "45.2K" },
                      { x: 180, y: 100, value: "46.1K" },
                      { x: 220, y: 85, value: "46.8K" },
                      { x: 260, y: 70, value: "47.2K" }
                    ].map((point, index) => (
                      <g key={index}>
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="4"
                          fill="#8b5cf6"
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                        <text
                          x={point.x}
                          y={point.y - 10}
                          textAnchor="middle"
                          className="text-xs fill-gray-300"
                        >
                          {point.value}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Growth Breakdown */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Growth Sources</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="text-white">Organic Growth</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">2.4K</div>
                      <div className="text-green-400 text-sm">+18%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="text-white">Content Sharing</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">1.8K</div>
                      <div className="text-green-400 text-sm">+25%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                      <span className="text-white">AI Recommendations</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">1.2K</div>
                      <div className="text-green-400 text-sm">+31%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      <span className="text-white">Cross-platform</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">890</div>
                      <div className="text-green-400 text-sm">+12%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Performance" && (
          <div className="space-y-6">
            {/* Top Performing Posts */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Top Performing Posts</h3>
              <div className="space-y-4">
                {topPosts.map((post) => (
                  <div key={post.id} className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        post.platform === 'twitter' ? 'bg-black' :
                        post.platform === 'linkedin' ? 'bg-blue-600' :
                        'bg-gradient-to-r from-purple-500 to-pink-500'
                      }`}>
                        <span className="text-white font-bold text-sm">
                          {post.platform === 'twitter' ? '𝕏' : 
                           post.platform === 'linkedin' ? 'in' : '📷'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm mb-3">{post.content}</p>
                        <div className="grid grid-cols-4 gap-4 text-xs text-gray-300">
                          <div>
                            <div className="text-white font-semibold">{post.metrics.likes}</div>
                            <div>Likes</div>
                          </div>
                          <div>
                            <div className="text-white font-semibold">{post.metrics.shares}</div>
                            <div>Shares</div>
                          </div>
                          <div>
                            <div className="text-white font-semibold">{post.metrics.comments}</div>
                            <div>Comments</div>
                          </div>
                          <div>
                            <div className="text-white font-semibold">{post.metrics.reach}</div>
                            <div>Reach</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "Audience" && (
          <div className="space-y-6">
            {/* Audience Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Audience Demographics</h3>
                <div className="space-y-4">
                  {audienceInsights.map((insight, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-300">{insight.label}</span>
                      <div className="text-right">
                        <div className="text-white font-semibold">{insight.value}</div>
                        <div className="w-20 bg-gray-700 rounded-full h-2 mt-1">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${insight.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Engagement by Time</h3>
                <div className="space-y-3">
                  <div className="text-sm text-gray-300">Best posting times this week:</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                      <span className="text-white">2:00 PM - 4:00 PM</span>
                      <span className="text-green-400">68% engagement</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                      <span className="text-white">7:00 PM - 9:00 PM</span>
                      <span className="text-green-400">52% engagement</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                      <span className="text-white">11:00 AM - 1:00 PM</span>
                      <span className="text-yellow-400">41% engagement</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Content Analysis" && (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Content Performance Analysis</h3>
            <p className="text-gray-300">AI-powered content analysis features coming soon...</p>
          </div>
        )}

        {activeTab === "Competitor Insights" && (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Competitor Analysis</h3>
            <p className="text-gray-300">
              Advanced competitor insights available. 
              <Link href="/dashboard/competitor-intel" className="text-purple-400 hover:text-purple-300 ml-2">
                View detailed competitor analysis →
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 