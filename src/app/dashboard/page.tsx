"use client";

import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Smart Posting");
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);

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
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Buttons */}
            <button 
              onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logo-32.png" alt="Campaign.ai" className="w-8 h-8" />
              </div>
              <span className="text-white font-bold text-xl">Campaign.ai</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-4">
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

          {/* Mobile Action Buttons */}
          <div className="xl:hidden flex items-center space-x-2">
            <button 
              onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            <button 
              onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Main Menu */}
        {isMainMenuOpen && (
          <div className="xl:hidden mt-4 pt-4 border-t border-white/10">
            <div className="grid grid-cols-2 gap-4">
              <Link href="/dashboard" className="text-white hover:text-purple-300 transition-colors p-2">
                Dashboard
              </Link>
              <Link href="/accounts" className="text-gray-300 hover:text-white transition-colors p-2">
                Accounts
              </Link>
              <Link href="/posts" className="text-gray-300 hover:text-white transition-colors p-2">
                Posts
              </Link>
              <Link href="/engagement" className="text-gray-300 hover:text-white transition-colors p-2">
                Engagement
              </Link>
              <Link href="/analytics" className="text-gray-300 hover:text-white transition-colors p-2">
                Analytics
              </Link>
              <Link href="/monetize" className="text-gray-300 hover:text-white transition-colors p-2">
                Monetize
              </Link>
              <Link href="/advertise" className="text-gray-300 hover:text-white transition-colors p-2">
                Advertise
              </Link>
              <Link href="/training" className="text-gray-300 hover:text-white transition-colors p-2">
                Training
              </Link>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <Link href="/upgrade" className="block bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-white text-center font-semibold">
                Upgrade to Pro
              </Link>
            </div>
          </div>
        )}
      </nav>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Sidebar - Connected Accounts */}
        <div className={`${
          isLeftSidebarOpen ? 'block' : 'hidden'
        } lg:block w-full lg:w-64 bg-black/20 backdrop-blur-lg border-b lg:border-r lg:border-b-0 border-white/10 p-4 lg:p-6 order-1 lg:order-none`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-semibold">Connected Accounts</h3>
            <button 
              onClick={() => setIsLeftSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4">
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

            {/* Show only first 6 on mobile, expand on larger screens */}
            <div className="lg:contents">
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
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto order-2 lg:order-none">
          {/* AI Agent Header */}
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-2xl lg:rounded-3xl p-4 sm:p-6 border border-white/10 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">🤖</span>
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">AI Agent: "Brand Ambassador Alex"</h2>
                  <p className="text-gray-300 text-sm sm:text-base">Professional • Brand Representative • Active 24/7</p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-300">Online</span>
                    </div>
                    <span className="text-sm text-gray-300">Following 2,847 accounts</span>
                    <span className="text-sm text-gray-300">Next post in 23min</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Link href="/agent-settings" className="block w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 px-4 sm:px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-center text-sm sm:text-base">
                  Customize Agent for Brand
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-gray-300 text-xs sm:text-sm">Posts Today</h3>
                <span className="text-yellow-400 text-lg sm:text-xl">📝</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">12</div>
              <div className="text-green-400 text-xs sm:text-sm">+18%</div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-gray-300 text-xs sm:text-sm">Engagements</h3>
                <span className="text-red-400 text-lg sm:text-xl">❤️</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">1,247</div>
              <div className="text-green-400 text-xs sm:text-sm">+23%</div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-gray-300 text-xs sm:text-sm">New Followers</h3>
                <span className="text-blue-400 text-lg sm:text-xl">👥</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">89</div>
              <div className="text-green-400 text-xs sm:text-sm">+41%</div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-gray-300 text-xs sm:text-sm">DMs Handled</h3>
                <span className="text-purple-400 text-lg sm:text-xl">💬</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">34</div>
              <div className="text-green-400 text-xs sm:text-sm">+12%</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-1 mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              tab === "Competitor Intel" ? (
                <Link
                  key={tab}
                  href="/dashboard/competitor-intel"
                  className="px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white whitespace-nowrap text-sm sm:text-base"
                >
                  {tab}
                </Link>
              ) : (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base ${
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
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                <h3 className="text-xl sm:text-2xl font-bold text-white">Activity Analytics</h3>
                <Link href="/posts" className="text-purple-400 hover:text-purple-300 transition-colors text-sm sm:text-base">
                  Manage Posts
                </Link>
              </div>

              {/* Activity Graphs */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Daily Activity Chart */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Daily Activity Overview</h4>
                  <div className="h-48 sm:h-64 flex items-end justify-between space-x-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                      const heights = [120, 85, 140, 95, 160, 75, 110];
                      return (
                        <div key={day} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg relative"
                            style={{ height: `${heights[index]}px` }}
                          >
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-300">
                              {Math.floor(heights[index] * 0.8)}
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 mt-2">{day}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 text-sm text-gray-300 text-center">
                    Posts Created per Day
                  </div>
                </div>

                {/* Platform Distribution */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Platform Activity Distribution</h4>
                  <div className="flex items-center justify-center h-48 sm:h-64">
                    <div className="relative w-32 h-32 sm:w-48 sm:h-48">
                      {/* Simplified donut chart representation */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/40 border-4 sm:border-8 border-blue-500 transform rotate-45"></div>
                      <div className="absolute inset-1 sm:inset-2 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/40 border-4 sm:border-8 border-purple-500 transform rotate-90"></div>
                      <div className="absolute inset-2 sm:inset-4 rounded-full bg-gradient-to-br from-pink-500/20 to-pink-600/40 border-4 sm:border-8 border-pink-500 transform rotate-180"></div>
                      <div className="absolute inset-3 sm:inset-6 rounded-full bg-gradient-to-br from-slate-900 to-purple-900"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xl sm:text-2xl font-bold text-white">847</div>
                          <div className="text-xs text-gray-400">Total Posts</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-1">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-gray-300">Twitter</span>
                      </div>
                      <div className="text-sm font-semibold text-white">45%</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-1">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-xs text-gray-300">LinkedIn</span>
                      </div>
                      <div className="text-sm font-semibold text-white">32%</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-1">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-500 rounded-full"></div>
                        <span className="text-xs text-gray-300">Instagram</span>
                      </div>
                      <div className="text-sm font-semibold text-white">23%</div>
                    </div>
                  </div>
                </div>

                {/* Engagement Trends */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Engagement Trends</h4>
                  <div className="h-48 sm:h-64 relative">
                    {/* Simplified line chart */}
                    <svg className="w-full h-full" viewBox="0 0 300 200">
                      <defs>
                        <linearGradient id="engagementGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1"/>
                        </linearGradient>
                      </defs>
                      <path
                        d="M20 160 L60 140 L100 120 L140 100 L180 80 L220 90 L260 70"
                        stroke="#8b5cf6"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M20 160 L60 140 L100 120 L140 100 L180 80 L220 90 L260 70 L260 200 L20 200 Z"
                        fill="url(#engagementGradient)"
                      />
                      {/* Data points */}
                      {[
                        { x: 20, y: 160 },
                        { x: 60, y: 140 },
                        { x: 100, y: 120 },
                        { x: 140, y: 100 },
                        { x: 180, y: 80 },
                        { x: 220, y: 90 },
                        { x: 260, y: 70 }
                      ].map((point, index) => (
                        <circle
                          key={index}
                          cx={point.x}
                          cy={point.y}
                          r="4"
                          fill="#8b5cf6"
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                      ))}
                    </svg>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Week 1</span>
                    <span>Week 2</span>
                    <span>Week 3</span>
                    <span>Week 4</span>
                  </div>
                </div>

                {/* AI Performance Metrics */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-4">AI Performance Metrics</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-300">Content Approval Rate</span>
                        <span className="text-sm font-semibold text-green-400">87%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-300">Engagement Accuracy</span>
                        <span className="text-sm font-semibold text-blue-400">92%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-300">Response Time</span>
                        <span className="text-sm font-semibold text-purple-400">94%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-300">Content Quality Score</span>
                        <span className="text-sm font-semibold text-pink-400">89%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-pink-500 to-pink-400 h-2 rounded-full" style={{ width: '89%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Insights */}
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Today's Quick Insights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">+23%</div>
                    <div className="text-sm text-gray-300">Engagement increased vs yesterday</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">3.2K</div>
                    <div className="text-sm text-gray-300">New followers gained today</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">12</div>
                    <div className="text-sm text-gray-300">Posts scheduled for tomorrow</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - AI Recommendations */}
        <div className={`${
          isRightSidebarOpen ? 'block' : 'hidden'
        } lg:block w-full lg:w-80 bg-black/20 backdrop-blur-lg border-t lg:border-l lg:border-t-0 border-white/10 p-4 lg:p-6 order-3 lg:order-none`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-semibold">AI Recommendations</h3>
            <div className="flex items-center space-x-2">
              <button className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
                Refresh
              </button>
              <button 
                onClick={() => setIsRightSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Trending Topic Alert */}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">AI</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-white font-medium mb-1">Trending Topic Alert</h5>
                  <p className="text-gray-300 text-sm mb-2">
                    "#AIRevolution" is trending in your industry. Consider creating content around this topic.
                  </p>
                  <button className="text-purple-400 text-sm hover:text-purple-300 transition-colors">
                    Create Post →
                  </button>
                </div>
              </div>
            </div>

            {/* Content Suggestion */}
            <div className="bg-gradient-to-br from-blue-900/30 to-green-900/30 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">📝</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-white font-medium mb-1">Content Suggestion</h5>
                  <p className="text-gray-300 text-sm mb-2">
                    Your engagement is highest on Tuesday mornings. Schedule your next big announcement then.
                  </p>
                  <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                    Schedule Now →
                  </button>
                </div>
              </div>
            </div>

            {/* Competitor Insight */}
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">👁</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-white font-medium mb-1">Competitor Insight</h5>
                  <p className="text-gray-300 text-sm mb-2">
                    @TechCompany posted about AI automation 3x this week. Consider joining the conversation.
                  </p>
                  <button className="text-orange-400 text-sm hover:text-orange-300 transition-colors">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 