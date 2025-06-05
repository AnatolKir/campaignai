"use client";

import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Smart Posting");

  const tabs = [
    "Smart Posting",
    "Auto Engagement", 
    "DM Management",
    "Competitor Intel",
    "Schedule Manager"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Top Navigation */}
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-white font-bold text-xl">Campaign.ai</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-white hover:text-purple-300 transition-colors">
              Dashboard
            </Link>
            <Link href="/accounts" className="text-gray-300 hover:text-white transition-colors">
              Accounts
            </Link>
            <Link href="/posts" className="text-gray-300 hover:text-white transition-colors">
              Posts
            </Link>
            <Link href="/engagement" className="text-gray-300 hover:text-white transition-colors">
              Engagement
            </Link>
            <Link href="/analytics" className="text-gray-300 hover:text-white transition-colors">
              Analytics
            </Link>
            <Link href="/monetize" className="text-gray-300 hover:text-white transition-colors">
              Monetize
            </Link>
            <Link href="/advertise" className="text-gray-300 hover:text-white transition-colors">
              Advertise
            </Link>
            <Link href="/training" className="text-gray-300 hover:text-white transition-colors">
              Training
            </Link>
            <Link href="/upgrade" className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-white">
              Upgrade to Pro
            </Link>
            <button className="text-gray-300 hover:text-white transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <div className="flex h-screen">
        {/* Left Sidebar - Connected Accounts */}
        <div className="w-64 bg-black/20 backdrop-blur-lg border-r border-white/10 p-6">
          <h3 className="text-white font-semibold mb-6">Connected Accounts</h3>
          
          <div className="space-y-4">
            {/* Twitter/X */}
            <Link href="/accounts/twitter" className="group">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">𝕏</span>
                  </div>
                  <span className="text-white text-sm">Twitter/X</span>
                </div>
                <span className="text-green-400 text-xs bg-green-400/20 px-2 py-1 rounded">Active</span>
              </div>
            </Link>

            {/* Instagram */}
            <Link href="/accounts/instagram" className="group">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">📷</span>
                  </div>
                  <span className="text-white text-sm">Instagram</span>
                </div>
                <span className="text-green-400 text-xs bg-green-400/20 px-2 py-1 rounded">Active</span>
              </div>
            </Link>

            {/* LinkedIn */}
            <Link href="/accounts/linkedin" className="group">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">in</span>
                  </div>
                  <span className="text-white text-sm">LinkedIn</span>
                </div>
                <span className="text-green-400 text-xs bg-green-400/20 px-2 py-1 rounded">Active</span>
              </div>
            </Link>

            {/* TikTok */}
            <Link href="/accounts/tiktok" className="group">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">🎵</span>
                  </div>
                  <span className="text-white text-sm">TikTok</span>
                </div>
                <span className="text-red-400 text-xs bg-red-400/20 px-2 py-1 rounded">Connect</span>
              </div>
            </Link>

            {/* YouTube */}
            <Link href="/accounts/youtube" className="group">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">▶</span>
                  </div>
                  <span className="text-white text-sm">YouTube</span>
                </div>
                <span className="text-red-400 text-xs bg-red-400/20 px-2 py-1 rounded">Connect</span>
              </div>
            </Link>

            {/* Discord */}
            <Link href="/accounts/discord" className="group">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">💬</span>
                  </div>
                  <span className="text-white text-sm">Discord</span>
                </div>
                <span className="text-red-400 text-xs bg-red-400/20 px-2 py-1 rounded">Connect</span>
              </div>
            </Link>

            {/* Telegram */}
            <Link href="/accounts/telegram" className="group">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">✈</span>
                  </div>
                  <span className="text-white text-sm">Telegram</span>
                </div>
                <span className="text-red-400 text-xs bg-red-400/20 px-2 py-1 rounded">Connect</span>
              </div>
            </Link>

            {/* Reddit */}
            <Link href="/accounts/reddit" className="group">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">🤖</span>
                  </div>
                  <span className="text-white text-sm">Reddit</span>
                </div>
                <span className="text-red-400 text-xs bg-red-400/20 px-2 py-1 rounded">Connect</span>
              </div>
            </Link>

            {/* Threads */}
            <Link href="/accounts/threads" className="group">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">@</span>
                  </div>
                  <span className="text-white text-sm">Threads</span>
                </div>
                <span className="text-red-400 text-xs bg-red-400/20 px-2 py-1 rounded">Connect</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* AI Agent Header */}
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-3xl p-6 border border-white/10 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🤖</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">AI Agent: "Brand Ambassador Alex"</h2>
                  <p className="text-gray-300">Professional • Brand Representative • Active 24/7</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-300">Online</span>
                    </div>
                    <span className="text-sm text-gray-300">Following 2,847 accounts</span>
                    <span className="text-sm text-gray-300">Next post in 23min</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <Link href="/agent-settings" className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                  Customize Agent for Brand
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-300 text-sm">Posts Today</h3>
                <span className="text-yellow-400">📝</span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">12</div>
              <div className="text-green-400 text-sm">+18%</div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-300 text-sm">Engagements</h3>
                <span className="text-red-400">❤️</span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">1,247</div>
              <div className="text-green-400 text-sm">+23%</div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-300 text-sm">New Followers</h3>
                <span className="text-blue-400">👥</span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">89</div>
              <div className="text-green-400 text-sm">+41%</div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-300 text-sm">DMs Handled</h3>
                <span className="text-purple-400">💬</span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">34</div>
              <div className="text-green-400 text-sm">+12%</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            {tabs.map((tab) => (
              tab === "Competitor Intel" ? (
                <Link
                  key={tab}
                  href="/dashboard/competitor-intel"
                  className="px-6 py-3 rounded-lg font-medium transition-all bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  {tab}
                </Link>
              ) : (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              )
            ))}
          </div>

          {/* Content based on active tab */}
          {activeTab === "Smart Posting" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white">Pending Posts</h3>
                <button className="text-purple-400 hover:text-purple-300 transition-colors">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <p className="text-white mb-2">
                        "Just discovered an amazing new productivity hack that's been game-changing for my workflow! 🚀"
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-300">
                        <span>Twitter/X</span>
                        <span>2:30 PM</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-700 transition-colors">
                        WhatsApp
                      </button>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <p className="text-white mb-2">
                        "Behind the scenes of today's brainstorming session. Sometimes the best ideas come from unexpected places. 💡"
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-300">
                        <span>Instagram</span>
                        <span>4:15 PM</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        Auto-approve
                      </button>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <p className="text-white mb-2">
                        "Sharing insights on how AI is transforming content creation and audience engagement in 2025."
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-300">
                        <span>LinkedIn</span>
                        <span>6:00 PM</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                        Telegram
                      </button>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - AI Recommendations */}
        <div className="w-80 bg-black/20 backdrop-blur-lg border-l border-white/10 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-semibold">AI Recommendations</h3>
            <button className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
              Refresh
            </button>
          </div>

          <div className="space-y-4">
            {/* Trending Topic Alert */}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">AI</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm mb-1">Trending Topic Alert</h4>
                  <p className="text-gray-300 text-xs mb-3">
                    "Productivity hacks" is trending. Consider creating content.
                  </p>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors text-xs">
                    Create Post
                  </button>
                </div>
              </div>
            </div>

            {/* Engagement Opportunity */}
            <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">AI</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm mb-1">Engagement Opportunity</h4>
                  <p className="text-gray-300 text-xs mb-3">
                    @TechInfluencer posted about AI tools. High engagement potential.
                  </p>
                  <button className="text-green-400 hover:text-green-300 transition-colors text-xs">
                    Reply Now
                  </button>
                </div>
              </div>
            </div>

            {/* Competitor Analysis */}
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">AI</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm mb-1">Competitor Analysis</h4>
                  <p className="text-gray-300 text-xs mb-3">
                    Competitor launched campaign. Weekly report available.
                  </p>
                  <button className="text-orange-400 hover:text-orange-300 transition-colors text-xs">
                    View Report
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h4 className="text-white font-semibold mb-4">Quick Actions</h4>
            <div className="space-y-3">
              <Link href="/agent-settings" className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-center">
                Customize Agent for Brand
              </Link>
              <Link href="/training" className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-center">
                Training Center
              </Link>
              <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all">
                Competitor Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 