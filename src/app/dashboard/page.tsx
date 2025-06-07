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
      <div className="p-6">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Header with Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Intelligence Dashboard
              </h1>
              <p className="text-gray-300 text-xl">
                AI-powered insights for {currentBrand?.name || 'your brand'}
                {currentBrand && (
                  <span className="ml-3 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full text-sm">
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
          <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/30 to-green-900/30 border border-green-500/30 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">AI Agent Status</h3>
                  <p className="text-green-300">Currently learning and optimizing your campaigns</p>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div>
                  <p className="text-green-400 text-2xl font-bold">🟢 Active</p>
                  <p className="text-gray-300 text-sm">Status</p>
                </div>
                <div>
                  <p className="text-white text-2xl font-bold">1,247</p>
                  <p className="text-gray-300 text-sm">Actions Today</p>
                </div>
                <div>
                  <p className="text-green-400 text-2xl font-bold">94.8%</p>
                  <p className="text-gray-300 text-sm">Success Rate</p>
                </div>
                <div>
                  <p className="text-blue-400 text-2xl font-bold">Learning</p>
                  <p className="text-gray-300 text-sm">Audience Patterns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Overview View */}
          {activeView === "overview" && (
            <div className="space-y-8">
              
              {/* Key Performance Indicators - Expanded Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
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

          {/* Other views placeholder */}
          {activeView !== "overview" && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10 text-center">
              <div className="text-8xl mb-6">🚧</div>
              <h2 className="text-3xl font-bold text-white mb-4">Advanced Intelligence Module</h2>
              <p className="text-gray-300 text-lg mb-6">
                {views.find(v => v.id === activeView)?.name} coming soon with even deeper AI insights...
              </p>
              <div className="inline-flex items-center space-x-2 text-purple-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
                <span>Building advanced analytics</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
} 