"use client";

import { useState } from "react";
import { UnifiedNavigation } from "../../components/UnifiedNavigation";
import { useBrand } from "../../contexts/BrandContext";

export default function Dashboard() {
  const { currentBrand, isLoading } = useBrand();
  const [activeView, setActiveView] = useState("overview");
  const [timeRange, setTimeRange] = useState("7d");

  const views = [
    { id: "overview", name: "Intelligence Overview", icon: "🧠" },
    { id: "performance", name: "Performance Deep Dive", icon: "📈" },
    { id: "audience", name: "Audience Intelligence", icon: "👥" },
    { id: "content", name: "Content Intelligence", icon: "✨" },
    { id: "competitors", name: "Competitive Intelligence", icon: "🔍" },
    { id: "predictions", name: "AI Predictions", icon: "🤖" }
  ];

  const timeRanges = [
    { value: "24h", label: "Last 24 Hours" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-300">Loading intelligence dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Top Navigation */}
      <UnifiedNavigation />

      {/* Full Width Intelligence Dashboard */}
      <div className="p-4 sm:p-6 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Header with Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 sm:mb-8 space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Intelligence Dashboard
              </h1>
              <p className="text-gray-300 text-base sm:text-lg md:text-xl">
                AI-powered insights for {currentBrand?.name || 'your brand'}
                {currentBrand && (
                  <span className="ml-3 px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full text-xs sm:text-sm">
                    @{currentBrand.handle || currentBrand.name}
                  </span>
                )}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Time Range Selector */}
              <div className="flex items-center space-x-3">
                <label className="text-gray-300 font-medium">Time Range:</label>
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-lg"
                >
                  {timeRanges.map((range) => (
                    <option key={range.value} value={range.value} className="bg-slate-800">
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Selector */}
              <div className="flex items-center space-x-2">
                {views.map((view) => (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                      activeView === view.id
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    <span>{view.icon}</span>
                    <span className="hidden lg:inline">{view.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Agent Status Banner */}
          <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/30 to-green-900/30 border border-green-500/30 rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-xl sm:text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">AI Agent Status</h3>
                  <p className="text-green-300 text-sm sm:text-base">Currently learning and optimizing your campaigns</p>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center w-full lg:w-auto">
                <div>
                  <p className="text-green-400 text-lg sm:text-2xl font-bold">🟢 Active</p>
                  <p className="text-gray-300 text-xs sm:text-sm">Status</p>
                </div>
                <div>
                  <p className="text-white text-lg sm:text-2xl font-bold">1,247</p>
                  <p className="text-gray-300 text-xs sm:text-sm">Actions Today</p>
                </div>
                <div>
                  <p className="text-green-400 text-lg sm:text-2xl font-bold">94.8%</p>
                  <p className="text-gray-300 text-xs sm:text-sm">Success Rate</p>
                </div>
                <div>
                  <p className="text-blue-400 text-lg sm:text-2xl font-bold">Learning</p>
                  <p className="text-gray-300 text-xs sm:text-sm">Audience Patterns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Overview View */}
          {activeView === "overview" && (
            <div className="space-y-8">
              
              {/* Key Performance Indicators - Expanded Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Engagement Score</p>
                      <p className="text-4xl font-bold text-white">94.8</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">💯</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-green-400">↗ +12.4%</span>
                    <span className="text-gray-300 ml-2">vs last {timeRange}</span>
                  </div>
                  <div className="bg-white/5 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '94.8%'}}></div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Total Reach</p>
                      <p className="text-4xl font-bold text-white">2.4M</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">📈</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-blue-400">↗ +847K</span>
                    <span className="text-gray-300 ml-2">organic growth</span>
                  </div>
                  <div className="text-xs text-gray-400">AI timing optimization +18%</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-pink-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Content Score</p>
                      <p className="text-4xl font-bold text-white">8.4</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">⭐</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-pink-400">AI Rated</span>
                    <span className="text-gray-300 ml-2">vs 6.2 avg</span>
                  </div>
                  <div className="text-xs text-gray-400">Top 5% in tech industry</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-yellow-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Revenue Impact</p>
                      <p className="text-4xl font-bold text-white">$156K</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">💰</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-yellow-400">↗ +31.2%</span>
                    <span className="text-gray-300 ml-2">attributed</span>
                  </div>
                  <div className="text-xs text-gray-400">ROI: 1,247% on ad spend</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Followers</p>
                      <p className="text-4xl font-bold text-white">47.2K</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">👥</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-cyan-400">↗ +2,847</span>
                    <span className="text-gray-300 ml-2">this {timeRange}</span>
                  </div>
                  <div className="text-xs text-gray-400">94% organic growth</div>
                </div>
              </div>

              {/* AI Insights & Intelligence Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* AI Insights - Takes up 2 columns */}
                <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                    <span className="text-3xl">🧠</span>
                    <span>AI Intelligence Center</span>
                  </h3>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-xl p-6 border border-green-500/30">
                      <div className="flex items-start space-x-4">
                        <span className="text-green-400 text-2xl flex-shrink-0">🎯</span>
                        <div className="flex-1">
                          <h4 className="text-white font-bold text-lg mb-2">Optimal Posting Time Discovered</h4>
                          <p className="text-gray-300 mb-3">Your audience shows 43% higher engagement on Tuesdays at 2:30 PM EST. AI has automatically adjusted your posting schedule to maximize reach.</p>
                          <div className="flex items-center justify-between">
                            <span className="text-green-400 text-sm font-medium">Predicted Impact: +18% engagement</span>
                            <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs">Auto-Applied</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-xl p-6 border border-blue-500/30">
                      <div className="flex items-start space-x-4">
                        <span className="text-blue-400 text-2xl flex-shrink-0">📊</span>
                        <div className="flex-1">
                          <h4 className="text-white font-bold text-lg mb-2">Content Theme Analysis</h4>
                          <p className="text-gray-300 mb-3">"Behind-the-scenes" content generates 67% higher engagement than industry posts. AI recommends increasing this content type by 25%.</p>
                          <div className="flex items-center justify-between">
                            <span className="text-blue-400 text-sm font-medium">Confidence: 94% • Based on 1,247 data points</span>
                            <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs">Ready to Apply</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 rounded-xl p-6 border border-yellow-500/30">
                      <div className="flex items-start space-x-4">
                        <span className="text-yellow-400 text-2xl flex-shrink-0">⚠️</span>
                        <div className="flex-1">
                          <h4 className="text-white font-bold text-lg mb-2">Competitor Movement Alert</h4>
                          <p className="text-gray-300 mb-3">TechRival launched a similar campaign 2 hours ago. AI has prepared a differentiation strategy and counter-narrative to maintain your competitive edge.</p>
                          <div className="flex items-center justify-between">
                            <span className="text-yellow-400 text-sm font-medium">Action: Counter-strategy ready for review</span>
                            <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs">Urgent</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Wins & Actions */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                    <span className="text-3xl">🚀</span>
                    <span>Quick Wins</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-xl p-4 border border-green-500/20">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-medium">Hashtag Optimization</span>
                        <span className="text-green-400 text-sm font-bold">+12% reach</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">AI discovered 3 underused hashtags in your niche with high engagement potential.</p>
                      <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:from-green-700 hover:to-emerald-700 transition-all">
                        Apply Suggestions
                      </button>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-4 border border-blue-500/20">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-medium">Caption Length</span>
                        <span className="text-blue-400 text-sm font-bold">+8% engagement</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">Optimal range: 125-150 characters for your audience demographic.</p>
                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
                        Auto-Optimize
                      </button>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4 border border-purple-500/20">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-medium">Post Frequency</span>
                        <span className="text-purple-400 text-sm font-bold">+15% followers</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">Increase to 2.3 posts/day during peak engagement season.</p>
                      <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all">
                        Schedule Posts
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Visualization */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">Engagement Trends</h3>
                  <div className="h-80 bg-gradient-to-t from-purple-900/20 to-transparent rounded-xl flex items-end justify-between p-6">
                    {[65, 72, 58, 84, 91, 88, 95].map((height, i) => (
                      <div key={i} className="flex flex-col items-center space-y-3">
                        <div className="bg-white/5 px-2 py-1 rounded text-white text-xs">
                          {Math.round(height * 1.2)}%
                        </div>
                        <div 
                          className="bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg w-8 hover:from-purple-400 hover:to-pink-400 transition-all cursor-pointer"
                          style={{height: `${height}%`}}
                        ></div>
                        <span className="text-gray-400 text-sm font-medium">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
                    <span className="text-gray-300">Weekly Average: 76.2%</span>
                    <span className="text-green-400 font-medium">↗ +14.8% improvement</span>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">Audience Growth</h3>
                  <div className="h-80 bg-gradient-to-t from-blue-900/20 to-transparent rounded-xl flex items-end justify-between p-6">
                    {[45, 52, 48, 67, 73, 69, 82].map((height, i) => (
                      <div key={i} className="flex flex-col items-center space-y-3">
                        <div className="bg-white/5 px-2 py-1 rounded text-white text-xs">
                          +{Math.round(height * 42)}
                        </div>
                        <div 
                          className="bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-lg w-8 hover:from-blue-400 hover:to-cyan-400 transition-all cursor-pointer"
                          style={{height: `${height}%`}}
                        ></div>
                        <span className="text-gray-400 text-sm font-medium">
                          W{i + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
                    <span className="text-gray-300">7-Week Growth: +2,847 followers</span>
                    <span className="text-blue-400 font-medium">94% organic</span>
                  </div>
                </div>
              </div>

              {/* Real-time Activity Feed */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                  <span className="text-3xl">⚡</span>
                  <span>Real-time Intelligence Feed</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-4 border border-green-500/20">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-green-400">🎯</span>
                      <span className="text-green-300 text-sm font-medium">2 minutes ago</span>
                    </div>
                    <p className="text-white font-medium">High-value prospect engaged</p>
                    <p className="text-gray-300 text-sm">CEO of TechCorp liked and shared your AI automation post</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4 border border-blue-500/20">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-blue-400">📈</span>
                      <span className="text-blue-300 text-sm font-medium">5 minutes ago</span>
                    </div>
                    <p className="text-white font-medium">Viral content detected</p>
                    <p className="text-gray-300 text-sm">Your latest post is trending +347% above normal engagement</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-4 border border-yellow-500/20">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-yellow-400">🤖</span>
                      <span className="text-yellow-300 text-sm font-medium">8 minutes ago</span>
                    </div>
                    <p className="text-white font-medium">AI optimization complete</p>
                    <p className="text-gray-300 text-sm">Posting schedule updated for next 7 days based on new data</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Performance View */}
          {activeView === "performance" && (
            <div className="space-y-8">
              
              {/* Performance Overview Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-green-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Avg Engagement Rate</p>
                      <p className="text-4xl font-bold text-white">8.7%</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">📈</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-green-400">↗ +2.3%</span>
                    <span className="text-gray-300 ml-2">vs industry avg (6.4%)</span>
                  </div>
                  <div className="text-xs text-gray-400">Top 8% in tech sector</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Click-Through Rate</p>
                      <p className="text-4xl font-bold text-white">4.2%</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">🎯</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-blue-400">↗ +1.8%</span>
                    <span className="text-gray-300 ml-2">this {timeRange}</span>
                  </div>
                  <div className="text-xs text-gray-400">47% above benchmark</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-pink-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Conversion Rate</p>
                      <p className="text-4xl font-bold text-white">2.8%</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">💎</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-pink-400">↗ +0.7%</span>
                    <span className="text-gray-300 ml-2">last {timeRange}</span>
                  </div>
                  <div className="text-xs text-gray-400">$247 avg order value</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-yellow-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">ROI</p>
                      <p className="text-4xl font-bold text-white">847%</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">💰</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-yellow-400">↗ +127%</span>
                    <span className="text-gray-300 ml-2">this quarter</span>
                  </div>
                  <div className="text-xs text-gray-400">$8.47 per $1 spent</div>
                </div>
              </div>

              {/* Top Performing Content & Revenue Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">🏆 Top Performing Content</h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-4 border border-green-500/20">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xl">🚀</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-bold mb-2">"5 AI Tools That Changed Everything"</h4>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-300">Views</p>
                              <p className="text-white font-bold">1.2M</p>
                            </div>
                            <div>
                              <p className="text-gray-300">Engagement</p>
                              <p className="text-green-400 font-bold">12.4%</p>
                            </div>
                            <div>
                              <p className="text-gray-300">Revenue</p>
                              <p className="text-yellow-400 font-bold">$34K</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4 border border-blue-500/20">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xl">💡</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-bold mb-2">"Behind Our AI Development Process"</h4>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-300">Views</p>
                              <p className="text-white font-bold">890K</p>
                            </div>
                            <div>
                              <p className="text-gray-300">Engagement</p>
                              <p className="text-blue-400 font-bold">9.8%</p>
                            </div>
                            <div>
                              <p className="text-gray-300">Revenue</p>
                              <p className="text-yellow-400 font-bold">$28K</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-pink-900/30 to-red-900/30 rounded-xl p-4 border border-pink-500/20">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xl">🎯</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-bold mb-2">"Startup Founder's Guide to AI"</h4>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-300">Views</p>
                              <p className="text-white font-bold">673K</p>
                            </div>
                            <div>
                              <p className="text-gray-300">Engagement</p>
                              <p className="text-pink-400 font-bold">11.2%</p>
                            </div>
                            <div>
                              <p className="text-gray-300">Revenue</p>
                              <p className="text-yellow-400 font-bold">$19K</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">💰 Revenue Attribution</h3>
                  <div className="text-center mb-6">
                    <p className="text-5xl font-bold text-green-400 mb-2">$156,247</p>
                    <p className="text-gray-300 text-lg">Total attributed revenue</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Direct Conversions</span>
                        <span className="text-white font-bold">$94,680</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '61%'}}></div>
                      </div>
                      <p className="text-green-400 text-xs mt-1">61% of total revenue</p>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Influenced Sales</span>
                        <span className="text-white font-bold">$61,567</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: '39%'}}></div>
                      </div>
                      <p className="text-blue-400 text-xs mt-1">39% of total revenue</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-300">Avg Deal Size</p>
                        <p className="text-white font-bold">$247</p>
                      </div>
                      <div>
                        <p className="text-gray-300">Customer LTV</p>
                        <p className="text-white font-bold">$892</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Engagement Breakdown & Performance Trends */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">📊 Engagement Breakdown</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Likes</span>
                        <span className="text-white font-bold">85%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3">
                        <div className="bg-gradient-to-r from-pink-500 to-red-500 h-3 rounded-full" style={{width: '85%'}}></div>
                      </div>
                      <p className="text-pink-400 text-xs mt-1">127K total likes this {timeRange}</p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Comments</span>
                        <span className="text-white font-bold">72%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style={{width: '72%'}}></div>
                      </div>
                      <p className="text-blue-400 text-xs mt-1">18.4K meaningful conversations</p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Shares</span>
                        <span className="text-white font-bold">91%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{width: '91%'}}></div>
                      </div>
                      <p className="text-green-400 text-xs mt-1">34.7K shares & reposts</p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Saves</span>
                        <span className="text-white font-bold">67%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full" style={{width: '67%'}}></div>
                      </div>
                      <p className="text-yellow-400 text-xs mt-1">12.3K content saves</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">📈 Performance Trends</h3>
                  <div className="h-64 bg-gradient-to-t from-purple-900/20 to-transparent rounded-xl flex items-end justify-between p-4">
                    {[78, 85, 72, 94, 89, 96, 87, 91, 83, 97, 92, 88, 95, 89].map((height, i) => (
                      <div 
                        key={i}
                        className="flex flex-col items-center space-y-2"
                      >
                        <div className="bg-white/5 px-1 py-1 rounded text-white text-xs">
                          {height}%
                        </div>
                        <div 
                          className="bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-sm w-4 hover:from-purple-400 hover:to-pink-400 transition-all cursor-pointer"
                          style={{height: `${height}%`}}
                        ></div>
                        <span className="text-gray-400 text-xs">
                          D{i + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
                    <span className="text-gray-300">14-Day Average: 87.3%</span>
                    <span className="text-green-400 font-medium">↗ +12.8% trending up</span>
                  </div>
                </div>
              </div>

              {/* Content Type Performance */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">🎨 Content Type Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/20">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">📊</span>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2">Industry Insights</h4>
                      <p className="text-blue-400 text-2xl font-bold mb-2">8.9%</p>
                      <p className="text-gray-300 text-sm">Avg Engagement</p>
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-xs text-gray-400">47 posts • $67K revenue</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-6 border border-green-500/20">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">🎬</span>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2">Behind-the-Scenes</h4>
                      <p className="text-green-400 text-2xl font-bold mb-2">11.7%</p>
                      <p className="text-gray-300 text-sm">Avg Engagement</p>
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-xs text-gray-400">23 posts • $41K revenue</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-900/30 to-red-900/30 rounded-xl p-6 border border-pink-500/30">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">💡</span>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2">Educational</h4>
                      <p className="text-pink-400 text-2xl font-bold mb-2">7.4%</p>
                      <p className="text-gray-300 text-sm">Avg Engagement</p>
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-xs text-gray-400">31 posts • $29K revenue</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-6 border border-yellow-500/20">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">🚀</span>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2">Product Updates</h4>
                      <p className="text-yellow-400 text-2xl font-bold mb-2">6.8%</p>
                      <p className="text-gray-300 text-sm">Avg Engagement</p>
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-xs text-gray-400">19 posts • $19K revenue</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Audience Intelligence View */}
          {activeView === "audience" && (
            <div className="space-y-8">
              
              {/* Audience Overview Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Total Audience</p>
                      <p className="text-4xl font-bold text-white">47.2K</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">👥</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-cyan-400">↗ +2,847</span>
                    <span className="text-gray-300 ml-2">this {timeRange}</span>
                  </div>
                  <div className="text-xs text-gray-400">94% organic growth</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Active Engagement</p>
                      <p className="text-4xl font-bold text-white">31.4K</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">⚡</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-purple-400">66.5%</span>
                    <span className="text-gray-300 ml-2">engagement rate</span>
                  </div>
                  <div className="text-xs text-gray-400">Above 45% industry avg</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-green-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Growth Rate</p>
                      <p className="text-4xl font-bold text-white">+24%</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">📈</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-green-400">Monthly</span>
                    <span className="text-gray-300 ml-2">compound growth</span>
                  </div>
                  <div className="text-xs text-gray-400">Accelerating trend</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-yellow-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Quality Score</p>
                      <p className="text-4xl font-bold text-white">9.2</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">⭐</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-yellow-400">Premium</span>
                    <span className="text-gray-300 ml-2">audience quality</span>
                  </div>
                  <div className="text-xs text-gray-400">High conversion potential</div>
                </div>
              </div>

              {/* Demographics & Behavior Patterns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">👤 Audience Demographics</h3>
                  
                  {/* Age Distribution */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Age Distribution</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">25-34</span>
                        <div className="flex items-center space-x-3 flex-1 mx-4">
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: '42%'}}></div>
                          </div>
                          <span className="text-white text-sm font-medium">42%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">35-44</span>
                        <div className="flex items-center space-x-3 flex-1 mx-4">
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '28%'}}></div>
                          </div>
                          <span className="text-white text-sm font-medium">28%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">18-24</span>
                        <div className="flex items-center space-x-3 flex-1 mx-4">
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full" style={{width: '18%'}}></div>
                          </div>
                          <span className="text-white text-sm font-medium">18%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">45+</span>
                        <div className="flex items-center space-x-3 flex-1 mx-4">
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{width: '12%'}}></div>
                          </div>
                          <span className="text-white text-sm font-medium">12%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gender & Location */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-semibold mb-3">Gender Split</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Male</span>
                          <span className="text-blue-400 font-medium">64%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Female</span>
                          <span className="text-pink-400 font-medium">34%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Other</span>
                          <span className="text-purple-400 font-medium">2%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-3">Top Locations</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">🇺🇸 US</span>
                          <span className="text-white font-medium">47%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">🇬🇧 UK</span>
                          <span className="text-white font-medium">18%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">🇨🇦 CA</span>
                          <span className="text-white font-medium">12%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">🇦🇺 AU</span>
                          <span className="text-white font-medium">8%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">🧠 Behavior Patterns</h3>
                  
                  {/* Peak Activity Times */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Peak Activity Times</h4>
                    <div className="grid grid-cols-7 gap-1 mb-3">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                        <div key={day} className="text-center">
                          <div className="text-gray-400 text-xs mb-1">{day}</div>
                          <div className="h-16 bg-white/5 rounded relative">
                            {[65, 78, 72, 85, 68, 45, 52][i] && (
                              <div 
                                className="bg-gradient-to-t from-purple-500 to-pink-500 rounded absolute bottom-0 w-full"
                                style={{height: `${[65, 78, 72, 85, 68, 45, 52][i]}%`}}
                              ></div>
                            )}
                          </div>
                          <div className="text-white text-xs mt-1 font-medium">
                            {[65, 78, 72, 85, 68, 45, 52][i]}%
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm">Thursday shows highest engagement at 2:30 PM EST</p>
                  </div>

                  {/* Content Preferences */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Content Preferences</h4>
                    <div className="space-y-3">
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-300">Educational Content</span>
                          <span className="text-blue-400 font-medium">89%</span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-1">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full" style={{width: '89%'}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-300">Behind-the-Scenes</span>
                          <span className="text-green-400 font-medium">76%</span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-1">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-1 rounded-full" style={{width: '76%'}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-300">Industry News</span>
                          <span className="text-yellow-400 font-medium">64%</span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-1">
                          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-1 rounded-full" style={{width: '64%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audience Segments & Growth Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">🎯 Audience Segments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-xl p-6 border border-blue-500/30">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <span className="text-white">👨‍💼</span>
                        </div>
                        <div>
                          <h4 className="text-white font-bold">Tech Executives</h4>
                          <p className="text-blue-300 text-sm">12.4K followers</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Engagement Rate</span>
                          <span className="text-blue-400 font-medium">11.7%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Conv. Potential</span>
                          <span className="text-green-400 font-medium">High</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Growth</span>
                          <span className="text-yellow-400 font-medium">+18%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-xl p-6 border border-green-500/30">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                          <span className="text-white">🚀</span>
                        </div>
                        <div>
                          <h4 className="text-white font-bold">Startup Founders</h4>
                          <p className="text-green-300 text-sm">8.7K followers</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Engagement Rate</span>
                          <span className="text-green-400 font-medium">14.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Conv. Potential</span>
                          <span className="text-green-400 font-medium">Very High</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Growth</span>
                          <span className="text-yellow-400 font-medium">+31%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-pink-900/40 to-red-900/40 rounded-xl p-6 border border-pink-500/30">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
                          <span className="text-white">👩‍💻</span>
                        </div>
                        <div>
                          <h4 className="text-white font-bold">Developers</h4>
                          <p className="text-pink-300 text-sm">16.8K followers</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Engagement Rate</span>
                          <span className="text-pink-400 font-medium">9.4%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Conv. Potential</span>
                          <span className="text-yellow-400 font-medium">Medium</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Growth</span>
                          <span className="text-green-400 font-medium">+22%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 rounded-xl p-6 border border-yellow-500/30">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                          <span className="text-white">📈</span>
                        </div>
                        <div>
                          <h4 className="text-white font-bold">Marketers</h4>
                          <p className="text-yellow-300 text-sm">9.3K followers</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Engagement Rate</span>
                          <span className="text-yellow-400 font-medium">8.1%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Conv. Potential</span>
                          <span className="text-blue-400 font-medium">Medium</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Growth</span>
                          <span className="text-green-400 font-medium">+15%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">📊 Growth Analysis</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-white font-semibold mb-3">30-Day Growth</h4>
                      <div className="h-32 bg-gradient-to-t from-green-900/20 to-transparent rounded-lg flex items-end justify-between p-2">
                        {[45, 52, 48, 67, 73, 69, 82].map((height, i) => (
                          <div 
                            key={i}
                            className="bg-gradient-to-t from-green-500 to-emerald-500 rounded-t-sm w-2"
                            style={{height: `${height}%`}}
                          ></div>
                        ))}
                      </div>
                      <p className="text-green-400 text-sm mt-2">+2,847 new followers</p>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-3">Acquisition Sources</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Organic Search</span>
                          <span className="text-green-400 font-medium">34%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Direct</span>
                          <span className="text-blue-400 font-medium">28%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Referrals</span>
                          <span className="text-purple-400 font-medium">23%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Social</span>
                          <span className="text-pink-400 font-medium">15%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-4 border border-blue-500/20">
                      <h5 className="text-blue-300 font-medium mb-2">Quality Score</h5>
                      <p className="text-white text-2xl font-bold mb-1">9.2/10</p>
                      <p className="text-gray-300 text-xs">Premium audience with high engagement & conversion potential</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Engagement Patterns */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">⚡ Engagement Patterns</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-white font-semibold mb-4">Daily Activity Heatmap</h4>
                    <div className="grid grid-cols-24 gap-1">
                      {Array.from({length: 24}, (_, hour) => {
                        const intensity = Math.sin((hour - 8) * Math.PI / 12) * 0.5 + 0.5;
                        const opacity = Math.max(0.1, intensity);
                        return (
                          <div 
                            key={hour}
                            className="h-4 rounded-sm bg-gradient-to-t from-purple-500 to-pink-500"
                            style={{opacity}}
                            title={`${hour}:00 - ${Math.round(intensity * 100)}% activity`}
                          ></div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <span>12AM</span>
                      <span>6AM</span>
                      <span>12PM</span>
                      <span>6PM</span>
                      <span>12AM</span>
                    </div>
                    <p className="text-purple-400 text-sm mt-2">Peak: 2-4 PM EST</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-4">Response Times</h4>
                    <div className="space-y-3">
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-300">Comments</span>
                          <span className="text-blue-400 font-medium">2.3 min</span>
                        </div>
                        <p className="text-xs text-gray-400">Average response time</p>
                      </div>
                      
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-300">Shares</span>
                          <span className="text-green-400 font-medium">47 sec</span>
                        </div>
                        <p className="text-xs text-gray-400">Time to share after viewing</p>
                      </div>
                      
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-300">Likes</span>
                          <span className="text-pink-400 font-medium">12 sec</span>
                        </div>
                        <p className="text-xs text-gray-400">Immediate engagement</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-4">Loyalty Metrics</h4>
                    <div className="space-y-3">
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-300">Return Rate</span>
                          <span className="text-green-400 font-medium">76%</span>
                        </div>
                        <p className="text-xs text-gray-400">Weekly active users</p>
                      </div>
                      
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-300">Avg Session</span>
                          <span className="text-blue-400 font-medium">4.7 min</span>
                        </div>
                        <p className="text-xs text-gray-400">Time spent per visit</p>
                      </div>
                      
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-300">Advocacy Score</span>
                          <span className="text-purple-400 font-medium">8.9/10</span>
                        </div>
                        <p className="text-xs text-gray-400">Likelihood to recommend</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Intelligence View */}
          {activeView === "content" && (
            <div className="space-y-8">
              
              {/* Content Overview Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Content Score</p>
                      <p className="text-4xl font-bold text-white">8.7</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">✨</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-purple-400">AI Rated</span>
                    <span className="text-gray-300 ml-2">vs 6.2 industry avg</span>
                  </div>
                  <div className="text-xs text-gray-400">Top 5% in tech content</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Viral Potential</p>
                      <p className="text-4xl font-bold text-white">94%</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">🚀</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-blue-400">High</span>
                    <span className="text-gray-300 ml-2">shareability score</span>
                  </div>
                  <div className="text-xs text-gray-400">3.4x above benchmark</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Optimization Score</p>
                      <p className="text-4xl font-bold text-white">91%</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">🎯</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-green-400">Excellent</span>
                    <span className="text-gray-300 ml-2">SEO & engagement</span>
                  </div>
                  <div className="text-xs text-gray-400">AI-optimized content</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Content ROI</p>
                      <p className="text-4xl font-bold text-white">347%</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">💎</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-yellow-400">$3.47</span>
                    <span className="text-gray-300 ml-2">per $1 invested</span>
                  </div>
                  <div className="text-xs text-gray-400">Above 200% target</div>
                </div>
              </div>

              {/* Content Themes & Performance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">🎨 Content Theme Analysis</h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-xl p-6 border border-blue-500/30">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-bold flex items-center space-x-2">
                          <span>📚</span>
                          <span>Educational Content</span>
                        </h4>
                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">Trending ↗</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-300">Posts</p>
                          <p className="text-white font-bold">47</p>
                        </div>
                        <div>
                          <p className="text-gray-300">Avg Engagement</p>
                          <p className="text-blue-400 font-bold">9.8%</p>
                        </div>
                        <div>
                          <p className="text-gray-300">Performance</p>
                          <p className="text-green-400 font-bold">+23%</p>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-white/5 rounded-lg">
                        <p className="text-gray-300 text-sm">AI Insight: Educational content performs 23% better on Tuesday afternoons. Consider scheduling more how-to guides during this window.</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-xl p-6 border border-green-500/30">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-bold flex items-center space-x-2">
                          <span>🎬</span>
                          <span>Behind-the-Scenes</span>
                        </h4>
                        <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">High Engagement</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-300">Posts</p>
                          <p className="text-white font-bold">23</p>
                        </div>
                        <div>
                          <p className="text-gray-300">Avg Engagement</p>
                          <p className="text-green-400 font-bold">12.4%</p>
                        </div>
                        <div>
                          <p className="text-gray-300">Performance</p>
                          <p className="text-green-400 font-bold">+67%</p>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-white/5 rounded-lg">
                        <p className="text-gray-300 text-sm">AI Insight: Behind-the-scenes content has highest viral potential. Recommend increasing frequency by 40% for maximum impact.</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-pink-900/40 to-red-900/40 rounded-xl p-6 border border-pink-500/30">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-bold flex items-center space-x-2">
                          <span>🚀</span>
                          <span>Product Updates</span>
                        </h4>
                        <span className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-sm">Conversion Focus</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-300">Posts</p>
                          <p className="text-white font-bold">19</p>
                        </div>
                        <div>
                          <p className="text-gray-300">Avg Engagement</p>
                          <p className="text-pink-400 font-bold">7.2%</p>
                        </div>
                        <div>
                          <p className="text-gray-300">Conversions</p>
                          <p className="text-green-400 font-bold">4.8%</p>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-white/5 rounded-lg">
                        <p className="text-gray-300 text-sm">AI Insight: Product updates drive highest conversion rates. Optimize with more visual elements and customer testimonials.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">📊 Content Performance Matrix</h3>
                  
                  {/* Performance Chart */}
                  <div className="mb-6">
                    <div className="h-64 bg-gradient-to-t from-purple-900/20 to-transparent rounded-xl p-4 relative">
                      <div className="absolute inset-4 grid grid-cols-4 gap-2">
                        {/* Quadrant Labels */}
                        <div className="col-span-2 text-center text-xs text-gray-400 mb-2">Low Effort</div>
                        <div className="col-span-2 text-center text-xs text-gray-400 mb-2">High Effort</div>
                        
                        {/* Content bubbles positioned in quadrants */}
                        <div className="relative h-24">
                          <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">📱</span>
                          </div>
                          <span className="absolute bottom-0 left-0 text-xs text-green-400">Quick Tips</span>
                        </div>
                        
                        <div className="relative h-24">
                          <div className="absolute top-8 right-8 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">🎬</span>
                          </div>
                          <span className="absolute top-2 right-0 text-xs text-blue-400">BTS Videos</span>
                        </div>
                        
                        <div className="relative h-24">
                          <div className="absolute bottom-8 left-8 w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">📰</span>
                          </div>
                          <span className="absolute bottom-4 left-0 text-xs text-yellow-400">News</span>
                        </div>
                        
                        <div className="relative h-24">
                          <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white">📚</span>
                          </div>
                          <span className="absolute top-0 right-0 text-xs text-pink-400">Tutorials</span>
                        </div>
                      </div>
                      
                      {/* Axis Labels */}
                      <div className="absolute left-0 top-1/2 transform -rotate-90 text-xs text-gray-400">High Impact</div>
                      <div className="absolute left-0 bottom-4 transform -rotate-90 text-xs text-gray-400">Low Impact</div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">Effort →</div>
                    </div>
                  </div>

                  {/* Content Recommendations */}
                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg p-4 border border-green-500/20">
                      <h5 className="text-green-300 font-medium mb-1">🎯 Quick Wins</h5>
                      <p className="text-gray-300 text-sm">Focus on quick tips and social media carousels for maximum impact with minimal effort.</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-4 border border-blue-500/20">
                      <h5 className="text-blue-300 font-medium mb-1">💎 Premium Content</h5>
                      <p className="text-gray-300 text-sm">Invest in comprehensive tutorials and behind-the-scenes videos for maximum engagement.</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-500/20">
                      <h5 className="text-yellow-300 font-medium mb-1">⚠️ Optimize</h5>
                      <p className="text-gray-300 text-sm">News content needs improvement - add personal insights to increase engagement.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Calendar & AI Suggestions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">📅 AI-Optimized Content Calendar</h3>
                  
                  {/* Weekly Calendar View */}
                  <div className="grid grid-cols-7 gap-2 mb-6">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                      <div key={day} className="text-center">
                        <div className="text-gray-400 text-sm font-medium mb-2">{day}</div>
                        <div className="space-y-2">
                          {/* Morning slot */}
                          <div className={`h-16 rounded-lg p-2 text-xs ${
                            i === 1 ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30' :
                            i === 3 ? 'bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-500/30' :
                            i === 4 ? 'bg-gradient-to-r from-pink-900/40 to-red-900/40 border border-pink-500/30' :
                            'bg-white/5'
                          }`}>
                            {i === 1 && <div className="text-blue-300">📚 Tutorial<br/>9:00 AM</div>}
                            {i === 3 && <div className="text-green-300">🎬 BTS<br/>10:30 AM</div>}
                            {i === 4 && <div className="text-pink-300">🚀 Update<br/>9:15 AM</div>}
                          </div>
                          
                          {/* Evening slot */}
                          <div className={`h-16 rounded-lg p-2 text-xs ${
                            i === 0 ? 'bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border border-yellow-500/30' :
                            i === 2 ? 'bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30' :
                            i === 5 ? 'bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/30' :
                            'bg-white/5'
                          }`}>
                            {i === 0 && <div className="text-yellow-300">💡 Tips<br/>2:30 PM</div>}
                            {i === 2 && <div className="text-purple-300">📊 Insights<br/>3:45 PM</div>}
                            {i === 5 && <div className="text-cyan-300">🎯 Poll<br/>1:00 PM</div>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Content Queue */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">📋 Content Queue (Next 7 Days)</h4>
                    <div className="space-y-3">
                      <div className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          <div>
                            <p className="text-white font-medium">5 AI Tools Every Startup Needs</p>
                            <p className="text-gray-400 text-sm">Educational • Scheduled for Tue 9:00 AM</p>
                          </div>
                        </div>
                        <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">Ready</span>
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                          <div>
                            <p className="text-white font-medium">Behind Our Product Development</p>
                            <p className="text-gray-400 text-sm">BTS Video • Scheduled for Thu 10:30 AM</p>
                          </div>
                        </div>
                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">In Review</span>
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div>
                            <p className="text-white font-medium">Weekly Feature Update</p>
                            <p className="text-gray-400 text-sm">Product Update • Scheduled for Fri 9:15 AM</p>
                          </div>
                        </div>
                        <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">Draft</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">🤖 AI Content Suggestions</h3>
                  
                  <div className="space-y-6">
                    {/* Trending Topics */}
                    <div>
                      <h4 className="text-white font-semibold mb-3">🔥 Trending Topics</h4>
                      <div className="space-y-2">
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white text-sm">#AIAutomation</span>
                            <span className="text-green-400 text-xs">+34%</span>
                          </div>
                          <p className="text-gray-400 text-xs">Peak engagement window: 2-4 PM</p>
                        </div>
                        
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white text-sm">#StartupTips</span>
                            <span className="text-blue-400 text-xs">+28%</span>
                          </div>
                          <p className="text-gray-400 text-xs">High shareability score</p>
                        </div>
                        
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white text-sm">#TechInnovation</span>
                            <span className="text-purple-400 text-xs">+22%</span>
                          </div>
                          <p className="text-gray-400 text-xs">Growing momentum</p>
                        </div>
                      </div>
                    </div>

                    {/* Content Ideas */}
                    <div>
                      <h4 className="text-white font-semibold mb-3">💡 AI-Generated Ideas</h4>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg p-4 border border-green-500/20">
                          <h5 className="text-green-300 font-medium mb-2">Tutorial Series</h5>
                          <p className="text-gray-300 text-sm mb-2">"Building AI Workflows in 5 Minutes"</p>
                          <div className="flex items-center space-x-2">
                            <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">High Potential</span>
                            <span className="text-gray-400 text-xs">Est. 12.4% engagement</span>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-4 border border-blue-500/20">
                          <h5 className="text-blue-300 font-medium mb-2">Case Study</h5>
                          <p className="text-gray-300 text-sm mb-2">"How We Scaled to 10K Users with AI"</p>
                          <div className="flex items-center space-x-2">
                            <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">Viral Potential</span>
                            <span className="text-gray-400 text-xs">Est. 15.7% engagement</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Optimization Tips */}
                    <div>
                      <h4 className="text-white font-semibold mb-3">⚡ Quick Optimizations</h4>
                      <div className="space-y-2">
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="text-white text-sm font-medium">Caption Length</p>
                          <p className="text-gray-400 text-xs">Optimal: 125-150 chars for your audience</p>
                        </div>
                        
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="text-white text-sm font-medium">Hashtag Mix</p>
                          <p className="text-gray-400 text-xs">3 trending + 2 niche + 1 branded</p>
                        </div>
                        
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="text-white text-sm font-medium">Post Timing</p>
                          <p className="text-gray-400 text-xs">Tuesday 2:30 PM shows +43% engagement</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Performance Insights */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">📈 Content Performance Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/20">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">🎯</span>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2">Targeting Accuracy</h4>
                      <p className="text-blue-400 text-3xl font-bold mb-2">94.7%</p>
                      <p className="text-gray-300 text-sm">Content-audience alignment</p>
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-xs text-gray-400">+12% from AI optimization</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-6 border border-green-500/20">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">⚡</span>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2">Engagement Velocity</h4>
                      <p className="text-green-400 text-3xl font-bold mb-2">2.3x</p>
                      <p className="text-gray-300 text-sm">Faster than industry avg</p>
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-xs text-gray-400">Peak in first 2 hours</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-900/30 to-red-900/30 rounded-xl p-6 border border-pink-500/20">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">🔄</span>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2">Share Rate</h4>
                      <p className="text-pink-400 text-3xl font-bold mb-2">8.9%</p>
                      <p className="text-gray-300 text-sm">Content virality score</p>
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-xs text-gray-400">BTS content leads at 15.2%</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-6 border border-yellow-500/20">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">💬</span>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2">Comment Quality</h4>
                      <p className="text-yellow-400 text-3xl font-bold mb-2">9.1</p>
                      <p className="text-gray-300 text-sm">Meaningful interactions</p>
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-xs text-gray-400">78% positive sentiment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Competitive Intelligence View */}
          {activeView === "competitors" && (
            <div className="space-y-8">
              
              {/* Competitive Overview Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-green-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Market Position</p>
                      <p className="text-4xl font-bold text-white">#3</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">🏆</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-green-400">↗ +1</span>
                    <span className="text-gray-300 ml-2">this {timeRange}</span>
                  </div>
                  <div className="text-xs text-gray-400">In AI automation space</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Competitive Advantage</p>
                      <p className="text-4xl font-bold text-white">87%</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">💪</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-blue-400">Strong</span>
                    <span className="text-gray-300 ml-2">differentiation</span>
                  </div>
                  <div className="text-xs text-gray-400">Above industry leaders</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-yellow-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Share of Voice</p>
                      <p className="text-4xl font-bold text-white">23%</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">📢</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-yellow-400">↗ +4.2%</span>
                    <span className="text-gray-300 ml-2">market share</span>
                  </div>
                  <div className="text-xs text-gray-400">Gaining momentum</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-red-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Threat Level</p>
                      <p className="text-4xl font-bold text-white">Low</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">🛡️</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-green-400">Stable</span>
                    <span className="text-gray-300 ml-2">competitive moat</span>
                  </div>
                  <div className="text-xs text-gray-400">Strong product differentiation</div>
                </div>
              </div>

              {/* Competitor Analysis & Market Map */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">🎯 Key Competitors</h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-red-900/40 to-pink-900/40 rounded-xl p-6 border border-red-500/30">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">TR</span>
                          </div>
                          <div>
                            <h4 className="text-white font-bold">TechRival</h4>
                            <p className="text-red-300 text-sm">Primary Competitor</p>
                          </div>
                        </div>
                        <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm">Threat: High</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-300">Followers</p>
                          <p className="text-white font-bold">89.2K</p>
                        </div>
                        <div>
                          <p className="text-gray-300">Engagement</p>
                          <p className="text-red-400 font-bold">6.8%</p>
                        </div>
                        <div>
                          <p className="text-gray-300">Growth</p>
                          <p className="text-yellow-400 font-bold">+18%</p>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-white/5 rounded-lg">
                        <p className="text-gray-300 text-sm">🚨 Alert: Launched new AI tool 2 hours ago. Counter-strategy prepared.</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-xl p-6 border border-blue-500/30">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">AI</span>
                          </div>
                          <div>
                            <h4 className="text-white font-bold">AIStartup Co</h4>
                            <p className="text-blue-300 text-sm">Emerging Threat</p>
                          </div>
                        </div>
                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">Threat: Medium</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-300">Followers</p>
                          <p className="text-white font-bold">34.7K</p>
                        </div>
                        <div>
                          <p className="text-gray-300">Engagement</p>
                          <p className="text-blue-400 font-bold">9.2%</p>
                        </div>
                        <div>
                          <p className="text-gray-300">Growth</p>
                          <p className="text-green-400 font-bold">+47%</p>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-white/5 rounded-lg">
                        <p className="text-gray-300 text-sm">📈 Fast-growing with strong technical content. Monitor closely.</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-xl p-6 border border-green-500/30">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">BC</span>
                          </div>
                          <div>
                            <h4 className="text-white font-bold">BigCorp AI</h4>
                            <p className="text-green-300 text-sm">Legacy Player</p>
                          </div>
                        </div>
                        <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">Threat: Low</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-300">Followers</p>
                          <p className="text-white font-bold">156K</p>
                        </div>
                        <div>
                          <p className="text-gray-300">Engagement</p>
                          <p className="text-green-400 font-bold">3.4%</p>
                        </div>
                        <div>
                          <p className="text-gray-300">Growth</p>
                          <p className="text-gray-400 font-bold">+2%</p>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-white/5 rounded-lg">
                        <p className="text-gray-300 text-sm">😴 Slow innovation cycle. Low threat but large audience.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">🗺️ Competitive Landscape</h3>
                  
                  {/* Market Positioning Chart */}
                  <div className="mb-6">
                    <div className="h-64 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-xl p-4 relative">
                      {/* Quadrant Labels */}
                      <div className="absolute top-2 left-2 text-xs text-gray-400">High Innovation</div>
                      <div className="absolute bottom-2 left-2 text-xs text-gray-400">Low Innovation</div>
                      <div className="absolute top-2 right-2 text-xs text-gray-400">High Market Share</div>
                      <div className="absolute bottom-2 right-2 text-xs text-gray-400">Low Market Share</div>
                      
                      {/* Axis Lines */}
                      <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20"></div>
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20"></div>
                      
                      {/* Competitor Bubbles */}
                      <div className="absolute top-16 right-20 w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">TR</span>
                      </div>
                      <span className="absolute top-12 right-16 text-xs text-red-400">TechRival</span>
                      
                      <div className="absolute top-20 left-16 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">AI</span>
                      </div>
                      <span className="absolute top-16 left-12 text-xs text-blue-400">AIStartup</span>
                      
                      <div className="absolute bottom-20 right-12 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">BC</span>
                      </div>
                      <span className="absolute bottom-16 right-8 text-xs text-green-400">BigCorp</span>
                      
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-2 border-white">
                        <span className="text-white text-sm font-bold">US</span>
                      </div>
                      <span className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs text-purple-400">Campaign.ai</span>
                    </div>
                  </div>

                  {/* Competitive Insights */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-500/20">
                      <h5 className="text-purple-300 font-medium mb-2">🎯 Your Position</h5>
                      <p className="text-gray-300 text-sm">High innovation, moderate market share. Perfect positioning for rapid growth in emerging AI automation market.</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-red-900/30 to-pink-900/30 rounded-lg p-4 border border-red-500/20">
                      <h5 className="text-red-300 font-medium mb-2">⚠️ Key Threat</h5>
                      <p className="text-gray-300 text-sm">TechRival's established market position and recent AI tool launch requires immediate strategic response.</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg p-4 border border-green-500/20">
                      <h5 className="text-green-300 font-medium mb-2">💡 Opportunity</h5>
                      <p className="text-gray-300 text-sm">Gap exists in user-friendly AI automation. Your superior UX is key differentiator.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Competitive Intelligence & Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">📊 Competitive Analysis</h3>
                  
                  {/* Feature Comparison */}
                  <div className="mb-8">
                    <h4 className="text-white font-semibold mb-4">🔥 Feature Comparison Matrix</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left text-gray-300 py-3">Feature</th>
                            <th className="text-center text-purple-400 py-3">Campaign.ai</th>
                            <th className="text-center text-red-400 py-3">TechRival</th>
                            <th className="text-center text-blue-400 py-3">AIStartup</th>
                            <th className="text-center text-green-400 py-3">BigCorp</th>
                          </tr>
                        </thead>
                        <tbody className="space-y-2">
                          <tr className="border-b border-white/5">
                            <td className="text-gray-300 py-3">AI Content Generation</td>
                            <td className="text-center py-3">
                              <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">Excellent</span>
                            </td>
                            <td className="text-center py-3">
                              <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs">Good</span>
                            </td>
                            <td className="text-center py-3">
                              <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">Very Good</span>
                            </td>
                            <td className="text-center py-3">
                              <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs">Basic</span>
                            </td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="text-gray-300 py-3">User Experience</td>
                            <td className="text-center py-3">
                              <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">Excellent</span>
                            </td>
                            <td className="text-center py-3">
                              <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs">Good</span>
                            </td>
                            <td className="text-center py-3">
                              <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs">Good</span>
                            </td>
                            <td className="text-center py-3">
                              <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs">Poor</span>
                            </td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="text-gray-300 py-3">Analytics Depth</td>
                            <td className="text-center py-3">
                              <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">Very Good</span>
                            </td>
                            <td className="text-center py-3">
                              <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">Excellent</span>
                            </td>
                            <td className="text-center py-3">
                              <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs">Good</span>
                            </td>
                            <td className="text-center py-3">
                              <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">Very Good</span>
                            </td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="text-gray-300 py-3">Pricing</td>
                            <td className="text-center py-3">
                              <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">Competitive</span>
                            </td>
                            <td className="text-center py-3">
                              <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs">Expensive</span>
                            </td>
                            <td className="text-center py-3">
                              <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">Competitive</span>
                            </td>
                            <td className="text-center py-3">
                              <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs">Premium</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Market Share Trends */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">📈 Market Share Evolution</h4>
                    <div className="h-40 bg-gradient-to-t from-purple-900/20 to-transparent rounded-xl flex items-end justify-between p-4">
                      {['Q1', 'Q2', 'Q3', 'Q4'].map((quarter, i) => (
                        <div key={quarter} className="flex flex-col items-center space-y-2 flex-1">
                          <div className="text-gray-400 text-xs mb-2">{quarter}</div>
                          <div className="w-full space-y-1">
                            {/* Your company */}
                            <div 
                              className="bg-gradient-to-t from-purple-500 to-pink-500 rounded-sm"
                              style={{height: `${[18, 21, 23, 28][i]}px`}}
                            ></div>
                            {/* TechRival */}
                            <div 
                              className="bg-gradient-to-t from-red-500 to-pink-500 rounded-sm"
                              style={{height: `${[32, 30, 29, 27][i]}px`}}
                            ></div>
                            {/* Others */}
                            <div 
                              className="bg-gradient-to-t from-gray-500 to-gray-400 rounded-sm"
                              style={{height: `${[50, 49, 48, 45][i]}px`}}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-center space-x-6 mt-4 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                        <span className="text-purple-400">Campaign.ai</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded"></div>
                        <span className="text-red-400">TechRival</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-gray-500 to-gray-400 rounded"></div>
                        <span className="text-gray-400">Others</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">🚨 Real-time Alerts</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-red-900/40 to-pink-900/40 rounded-xl p-4 border border-red-500/30">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-red-400 text-lg">🚨</span>
                        <div>
                          <p className="text-red-300 font-medium">High Priority</p>
                          <p className="text-gray-400 text-xs">2 minutes ago</p>
                        </div>
                      </div>
                      <p className="text-white text-sm font-medium mb-2">TechRival Product Launch</p>
                      <p className="text-gray-300 text-sm">Launched "AI AutoPost 3.0" with similar features to your core offering. Monitoring sentiment and user adoption.</p>
                      <button className="mt-3 bg-red-500/20 text-red-300 px-3 py-1 rounded-lg text-xs hover:bg-red-500/30 transition-all">
                        View Strategy
                      </button>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 rounded-xl p-4 border border-yellow-500/30">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-yellow-400 text-lg">⚠️</span>
                        <div>
                          <p className="text-yellow-300 font-medium">Medium Priority</p>
                          <p className="text-gray-400 text-xs">47 minutes ago</p>
                        </div>
                      </div>
                      <p className="text-white text-sm font-medium mb-2">Market Trend Shift</p>
                      <p className="text-gray-300 text-sm">AIStartup Co gained 12% engagement boost with video content strategy. Consider adapting approach.</p>
                      <button className="mt-3 bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-lg text-xs hover:bg-yellow-500/30 transition-all">
                        Analyze Trend
                      </button>
                    </div>

                    <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-xl p-4 border border-blue-500/30">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-blue-400 text-lg">📊</span>
                        <div>
                          <p className="text-blue-300 font-medium">Intelligence Update</p>
                          <p className="text-gray-400 text-xs">2 hours ago</p>
                        </div>
                      </div>
                      <p className="text-white text-sm font-medium mb-2">BigCorp Acquisition Rumor</p>
                      <p className="text-gray-300 text-sm">Market rumors suggest BigCorp AI considering acquisition of smaller AI companies. Monitor developments.</p>
                      <button className="mt-3 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-lg text-xs hover:bg-blue-500/30 transition-all">
                        Full Report
                      </button>
                    </div>

                    <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-xl p-4 border border-green-500/30">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-green-400 text-lg">✅</span>
                        <div>
                          <p className="text-green-300 font-medium">Opportunity</p>
                          <p className="text-gray-400 text-xs">4 hours ago</p>
                        </div>
                      </div>
                      <p className="text-white text-sm font-medium mb-2">Content Gap Identified</p>
                      <p className="text-gray-300 text-sm">None of your competitors are addressing "AI ethics in automation" - potential thought leadership opportunity.</p>
                      <button className="mt-3 bg-green-500/20 text-green-300 px-3 py-1 rounded-lg text-xs hover:bg-green-500/30 transition-all">
                        Create Content
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strategic Recommendations */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">🎯 Strategic Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-red-900/30 to-pink-900/30 rounded-xl p-6 border border-red-500/20">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">⚔️</span>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2">Defensive Strategy</h4>
                      <p className="text-red-400 text-sm mb-3">Counter TechRival's Launch</p>
                      <p className="text-gray-300 text-sm mb-4">Accelerate premium feature release and launch comparison campaign highlighting superior UX and pricing.</p>
                      <button className="bg-red-500/20 text-red-300 px-4 py-2 rounded-lg text-sm hover:bg-red-500/30 transition-all">
                        Execute Plan
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/20">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">🚀</span>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2">Growth Strategy</h4>
                      <p className="text-blue-400 text-sm mb-3">Capitalize on Video Trend</p>
                      <p className="text-gray-300 text-sm mb-4">Follow AIStartup's video content success. Implement behind-the-scenes video strategy with 40% frequency increase.</p>
                      <button className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg text-sm hover:bg-blue-500/30 transition-all">
                        Start Campaign
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-6 border border-green-500/20">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">💡</span>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2">Innovation Strategy</h4>
                      <p className="text-green-400 text-sm mb-3">Lead AI Ethics Conversation</p>
                      <p className="text-gray-300 text-sm mb-4">Establish thought leadership in underserved "AI ethics" space. Create content series and position as industry authority.</p>
                      <button className="bg-green-500/20 text-green-300 px-4 py-2 rounded-lg text-sm hover:bg-green-500/30 transition-all">
                        Begin Series
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Predictions View */}
          {activeView === "predictions" && (
            <div className="space-y-8">
              
              {/* AI Predictions Overview Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Prediction Accuracy</p>
                      <p className="text-4xl font-bold text-white">94.7%</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">🎯</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-purple-400">↗ +3.2%</span>
                    <span className="text-gray-300 ml-2">model improvement</span>
                  </div>
                  <div className="text-xs text-gray-400">Based on 10,000+ predictions</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Next Week Forecast</p>
                      <p className="text-4xl font-bold text-white">+18%</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">🔮</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-blue-400">Growth</span>
                    <span className="text-gray-300 ml-2">engagement predicted</span>
                  </div>
                  <div className="text-xs text-gray-400">Confidence: 87%</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-green-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Revenue Forecast</p>
                      <p className="text-4xl font-bold text-white">$89K</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">💰</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-green-400">Next 30 days</span>
                    <span className="text-gray-300 ml-2">predicted revenue</span>
                  </div>
                  <div className="text-xs text-gray-400">+34% vs current month</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-yellow-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Trend Score</p>
                      <p className="text-4xl font-bold text-white">8.9</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">📊</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-yellow-400">Strong</span>
                    <span className="text-gray-300 ml-2">upward momentum</span>
                  </div>
                  <div className="text-xs text-gray-400">Market sentiment positive</div>
                </div>
              </div>

              {/* AI Learning & Future Predictions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">🧠 AI Learning Insights</h3>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl p-6 border border-purple-500/30">
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-purple-400 text-2xl">🔍</span>
                        <div>
                          <h4 className="text-white font-bold">Pattern Recognition</h4>
                          <p className="text-purple-300 text-sm">Latest discoveries</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="text-white text-sm font-medium">Optimal Post Timing Pattern</p>
                          <p className="text-gray-300 text-xs">AI identified Tuesday 2:30 PM as 43% more effective based on audience behavior analysis</p>
                          <div className="mt-2 flex items-center space-x-2">
                            <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">Applied</span>
                            <span className="text-gray-400 text-xs">Confidence: 94%</span>
                          </div>
                        </div>
                        
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="text-white text-sm font-medium">Content Emotion Correlation</p>
                          <p className="text-gray-300 text-xs">Inspirational content generates 67% more shares than educational during 6-8 PM window</p>
                          <div className="mt-2 flex items-center space-x-2">
                            <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">Testing</span>
                            <span className="text-gray-400 text-xs">Confidence: 87%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 rounded-xl p-6 border border-blue-500/30">
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-blue-400 text-2xl">🚀</span>
                        <div>
                          <h4 className="text-white font-bold">Model Performance</h4>
                          <p className="text-blue-300 text-sm">Continuous improvement</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-blue-400 text-2xl font-bold">94.7%</p>
                          <p className="text-gray-300 text-xs">Accuracy Rate</p>
                        </div>
                        <div className="text-center">
                          <p className="text-cyan-400 text-2xl font-bold">247</p>
                          <p className="text-gray-300 text-xs">Models Trained</p>
                        </div>
                        <div className="text-center">
                          <p className="text-blue-400 text-2xl font-bold">1.2M</p>
                          <p className="text-gray-300 text-xs">Data Points</p>
                        </div>
                        <div className="text-center">
                          <p className="text-cyan-400 text-2xl font-bold">24/7</p>
                          <p className="text-gray-300 text-xs">Learning</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">🔮 Future Predictions</h3>
                  
                  {/* Prediction Timeline */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white font-medium">Next 7 Days</span>
                          <span className="text-green-400 text-sm">87% confidence</span>
                        </div>
                        <p className="text-gray-300 text-sm">+18% engagement growth predicted. Optimal content: behind-the-scenes videos and educational carousels.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white font-medium">Next 30 Days</span>
                          <span className="text-blue-400 text-sm">82% confidence</span>
                        </div>
                        <p className="text-gray-300 text-sm">Revenue forecast: $89K (+34%). New follower acquisition: +3,200. Peak growth window: Days 15-22.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white font-medium">Next Quarter</span>
                          <span className="text-purple-400 text-sm">76% confidence</span>
                        </div>
                        <p className="text-gray-300 text-sm">Market position improvement to #2. Competitive landscape shift expected as AIStartup gains momentum.</p>
                      </div>
                    </div>
                  </div>

                  {/* Prediction Accuracy Trend */}
                  <div className="bg-gradient-to-r from-gray-900/40 to-slate-900/40 rounded-xl p-4 border border-gray-500/20">
                    <h5 className="text-gray-300 font-medium mb-3">Model Accuracy Over Time</h5>
                    <div className="h-24 bg-gradient-to-t from-purple-900/20 to-transparent rounded-lg flex items-end justify-between p-2">
                      {[78, 82, 85, 88, 91, 93, 94.7].map((accuracy, i) => (
                        <div key={i} className="flex flex-col items-center space-y-1">
                          <div 
                            className="bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-sm w-3"
                            style={{height: `${(accuracy - 70) * 2}px`}}
                          ></div>
                          <span className="text-gray-400 text-xs">W{i + 1}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-center text-purple-400 text-sm mt-2">+16.7% improvement in 7 weeks</p>
                  </div>
                </div>
              </div>

              {/* Advanced AI Analytics & Recommendations */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">📈 Predictive Analytics Dashboard</h3>
                  
                  {/* Engagement Prediction Chart */}
                  <div className="mb-8">
                    <h4 className="text-white font-semibold mb-4">Next 14 Days - Engagement Forecast</h4>
                    <div className="h-48 bg-gradient-to-t from-purple-900/20 to-transparent rounded-xl flex items-end justify-between p-4 relative">
                      {/* Historical data (solid) */}
                      {[87, 92, 85, 94, 89, 91, 88].map((height, i) => (
                        <div key={i} className="flex flex-col items-center space-y-1">
                          <div className="bg-white/5 px-1 py-1 rounded text-white text-xs">
                            {height}%
                          </div>
                          <div 
                            className="bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-sm w-4"
                            style={{height: `${height}%`}}
                          ></div>
                          <span className="text-gray-400 text-xs">D{i + 1}</span>
                        </div>
                      ))}
                      
                      {/* Vertical separator */}
                      <div className="absolute left-1/2 top-0 bottom-8 w-px bg-white/30"></div>
                      <div className="absolute left-1/2 bottom-4 text-xs text-gray-400 transform -translate-x-1/2">Today</div>
                      
                      {/* Predicted data (dashed/transparent) */}
                      {[95, 97, 93, 98, 101, 96, 103].map((height, i) => (
                        <div key={i} className="flex flex-col items-center space-y-1">
                          <div className="bg-white/5 px-1 py-1 rounded text-cyan-300 text-xs">
                            {height}%
                          </div>
                          <div 
                            className="bg-gradient-to-t from-cyan-500/70 to-blue-500/70 rounded-t-sm w-4 border-2 border-dashed border-cyan-400"
                            style={{height: `${Math.min(height, 100)}%`}}
                          ></div>
                          <span className="text-gray-400 text-xs">D{i + 8}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-center space-x-6 mt-4 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                        <span className="text-purple-400">Historical</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded border border-cyan-400"></div>
                        <span className="text-cyan-400">Predicted</span>
                      </div>
                    </div>
                  </div>

                  {/* AI-Generated Insights */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">🤖 AI-Generated Strategic Insights</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg p-4 border border-green-500/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-green-400">📊</span>
                          <span className="text-green-300 font-medium">Growth Opportunity</span>
                        </div>
                        <p className="text-gray-300 text-sm">Video content shows 340% higher engagement potential during evening hours (6-8 PM). Recommend shifting 60% of video posts to this window.</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-green-400 text-xs">Impact: +23% engagement</span>
                          <button className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs hover:bg-green-500/30 transition-all">
                            Apply
                          </button>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-4 border border-blue-500/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-blue-400">🎯</span>
                          <span className="text-blue-300 font-medium">Content Optimization</span>
                        </div>
                        <p className="text-gray-300 text-sm">Educational content performs 187% better when paired with visual infographics. Current text-only posts are underperforming.</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-blue-400 text-xs">Impact: +31% shareability</span>
                          <button className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs hover:bg-blue-500/30 transition-all">
                            Generate
                          </button>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-500/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-yellow-400">⚡</span>
                          <span className="text-yellow-300 font-medium">Trend Prediction</span>
                        </div>
                        <p className="text-gray-300 text-sm">"AI Ethics" topic predicted to trend +400% in next 3 weeks. Early content creation could establish thought leadership position.</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-yellow-400 text-xs">Confidence: 91%</span>
                          <button className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs hover:bg-yellow-500/30 transition-all">
                            Plan
                          </button>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-pink-900/30 to-red-900/30 rounded-lg p-4 border border-pink-500/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-pink-400">🚀</span>
                          <span className="text-pink-300 font-medium">Viral Potential</span>
                        </div>
                        <p className="text-gray-300 text-sm">Next Tuesday's planned "Behind AI Development" post has 78% viral probability. Consider boosting with paid promotion for maximum reach.</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-pink-400 text-xs">Potential reach: 2.4M</span>
                          <button className="bg-pink-500/20 text-pink-300 px-2 py-1 rounded text-xs hover:bg-pink-500/30 transition-all">
                            Boost
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">🎯 AI Recommendations</h3>
                  
                  <div className="space-y-6">
                    {/* Priority Actions */}
                    <div>
                      <h4 className="text-white font-semibold mb-4">🔥 Priority Actions</h4>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-red-900/40 to-pink-900/40 rounded-lg p-4 border border-red-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-red-300 font-medium">High Impact</span>
                            <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs">Urgent</span>
                          </div>
                          <p className="text-white text-sm font-medium mb-1">Optimize Video Timing</p>
                          <p className="text-gray-300 text-xs">Shift video posts to 6-8 PM for +23% engagement boost</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-lg p-4 border border-blue-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-blue-300 font-medium">Medium Impact</span>
                            <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">This Week</span>
                          </div>
                          <p className="text-white text-sm font-medium mb-1">Create AI Ethics Content</p>
                          <p className="text-gray-300 text-xs">Capitalize on predicted +400% trend growth</p>
                        </div>

                        <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-lg p-4 border border-green-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-green-300 font-medium">Growth Opportunity</span>
                            <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">Strategic</span>
                          </div>
                          <p className="text-white text-sm font-medium mb-1">Boost Viral Post</p>
                          <p className="text-gray-300 text-xs">Tuesday's post has 78% viral potential</p>
                        </div>
                      </div>
                    </div>

                    {/* Learning Progress */}
                    <div>
                      <h4 className="text-white font-semibold mb-4">🧠 AI Learning Progress</h4>
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300">Audience Behavior</span>
                            <span className="text-green-400 font-medium">97%</span>
                          </div>
                          <div className="w-full bg-white/5 rounded-full h-2">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '97%'}}></div>
                          </div>
                        </div>

                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300">Content Optimization</span>
                            <span className="text-blue-400 font-medium">89%</span>
                          </div>
                          <div className="w-full bg-white/5 rounded-full h-2">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: '89%'}}></div>
                          </div>
                        </div>

                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300">Market Trends</span>
                            <span className="text-yellow-400 font-medium">84%</span>
                          </div>
                          <div className="w-full bg-white/5 rounded-full h-2">
                            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{width: '84%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Model Status */}
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-500/20">
                      <h5 className="text-purple-300 font-medium mb-3">🤖 Model Status</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Training Status</span>
                          <span className="text-green-400">Active</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Last Update</span>
                          <span className="text-white">3 min ago</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Next Prediction</span>
                          <span className="text-blue-400">2 hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Data Points Today</span>
                          <span className="text-white">2,847</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Future Roadmap & Predictions */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">🗺️ AI-Powered Strategic Roadmap</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-6 border border-green-500/20">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">📅</span>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2">Next 30 Days</h4>
                      <p className="text-green-400 text-sm mb-4">Growth Acceleration Phase</p>
                      <div className="space-y-2 text-sm text-left">
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          <span className="text-gray-300">+3,200 new followers predicted</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          <span className="text-gray-300">$89K revenue forecast (+34%)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          <span className="text-gray-300">AI Ethics content opportunity</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          <span className="text-gray-300">Video strategy optimization</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/20">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">🎯</span>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2">Next Quarter</h4>
                      <p className="text-blue-400 text-sm mb-4">Market Leadership Phase</p>
                      <div className="space-y-2 text-sm text-left">
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          <span className="text-gray-300">Market position #2 achievable</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          <span className="text-gray-300">Thought leadership in AI ethics</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          <span className="text-gray-300">Competitive advantage expansion</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          <span className="text-gray-300">Premium tier launch optimal</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-500/20">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">🚀</span>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2">Next Year</h4>
                      <p className="text-purple-400 text-sm mb-4">Market Domination Phase</p>
                      <div className="space-y-2 text-sm text-left">
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                          <span className="text-gray-300">Market leader position likely</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                          <span className="text-gray-300">International expansion ready</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                          <span className="text-gray-300">AI model industry benchmark</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                          <span className="text-gray-300">Platform ecosystem maturity</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          

        </div>
      </div>
    </div>
  );
} 