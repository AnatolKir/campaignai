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

          {/* Mobile Right Menu Button */}
          <button 
            onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </nav>

      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <div className={`${isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static z-30 w-64 bg-black/20 backdrop-blur-lg border-r border-white/10 transition-transform duration-300 ease-in-out h-full`}>
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Dashboard</h2>
            
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <Link href="/agent-settings" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center space-x-2">
                <span>⚙️</span>
                <span>Agent Settings</span>
              </Link>
              <Link href="/brand-settings" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2">
                <span>🎨</span>
                <span>Brand Settings</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome to Campaign.ai</h1>
              <p className="text-gray-300">Manage your AI-powered social media campaigns and engagement</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Total Posts</p>
                    <p className="text-2xl font-bold text-white">1,247</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📝</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-400">↗ +12%</span>
                  <span className="text-gray-300 ml-2">from last week</span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Engagement Rate</p>
                    <p className="text-2xl font-bold text-white">4.8%</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">💬</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-400">↗ +0.3%</span>
                  <span className="text-gray-300 ml-2">from last week</span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Followers</p>
                    <p className="text-2xl font-bold text-white">24.6K</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">👥</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-400">↗ +156</span>
                  <span className="text-gray-300 ml-2">from last week</span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">AI Agent Status</p>
                    <p className="text-2xl font-bold text-green-400">Active</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🤖</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-blue-400">⚡ Running</span>
                  <span className="text-gray-300 ml-2">24/7 automation</span>
                </div>
              </div>
            </div>

            {/* Active Tab Content */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6">{activeTab}</h2>
              
              {activeTab === "Smart Posting" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-xl p-4">
                      <h3 className="text-white font-semibold mb-3">Recent Posts</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-white text-sm">🚀 Excited to share our latest AI breakthrough...</p>
                            <p className="text-gray-400 text-xs">Posted 2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-white text-sm">💡 5 tips for better social media engagement...</p>
                            <p className="text-gray-400 text-xs">Posted 4 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4">
                      <h3 className="text-white font-semibold mb-3">Upcoming Posts</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-white text-sm">📈 Weekly analytics report ready...</p>
                            <p className="text-gray-400 text-xs">Scheduled for 6 PM today</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-white text-sm">🎯 Behind the scenes: Our AI development process...</p>
                            <p className="text-gray-400 text-xs">Scheduled for tomorrow 9 AM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Auto Engagement" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-4">
                      <h3 className="text-white font-semibold mb-2">Comments Today</h3>
                      <p className="text-2xl font-bold text-green-400">47</p>
                      <p className="text-gray-300 text-sm">Auto-replied to mentions</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4">
                      <h3 className="text-white font-semibold mb-2">Likes Given</h3>
                      <p className="text-2xl font-bold text-blue-400">189</p>
                      <p className="text-gray-300 text-sm">Relevant content liked</p>
                    </div>
                    <div className="bg-gradient-to-r from-pink-900/30 to-red-900/30 rounded-xl p-4">
                      <h3 className="text-white font-semibold mb-2">New Follows</h3>
                      <p className="text-2xl font-bold text-pink-400">23</p>
                      <p className="text-gray-300 text-sm">Strategic connections made</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "DM Management" && (
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <h3 className="text-white font-semibold mb-4">Recent Messages</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-white font-medium">@techstartupco</p>
                          <p className="text-gray-300 text-sm">Hi! Interested in your AI solution for our team...</p>
                          <p className="text-gray-400 text-xs">5 minutes ago</p>
                        </div>
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">New</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Competitor Intel" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-xl p-4">
                      <h3 className="text-white font-semibold mb-3">Trending Topics</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">#AIAutomation</span>
                          <span className="text-green-400">+25%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">#SocialMediaTips</span>
                          <span className="text-blue-400">+18%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <h3 className="text-white font-semibold mb-3">Competitor Activity</h3>
                      <div className="space-y-2">
                        <div className="text-gray-300 text-sm">TechRival posted 3 times today</div>
                        <div className="text-gray-300 text-sm">StartupX launched new campaign</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Schedule Manager" && (
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <h3 className="text-white font-semibold mb-4">Today's Schedule</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                        <div className="w-12 text-center">
                          <div className="text-white font-bold">9:00</div>
                          <div className="text-gray-400 text-xs">AM</div>
                        </div>
                        <div className="flex-1">
                          <p className="text-white">Morning motivation post</p>
                          <p className="text-gray-400 text-sm">Twitter, LinkedIn</p>
                        </div>
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Scheduled</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className={`${isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 fixed lg:static z-30 right-0 w-80 bg-black/20 backdrop-blur-lg border-l border-white/10 transition-transform duration-300 ease-in-out h-full`}>
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
            
            <div className="space-y-4">
              <Link href="/posts" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center space-x-2">
                <span>✍️</span>
                <span>Create Post</span>
              </Link>
              
              <Link href="/analytics" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center space-x-2">
                <span>📊</span>
                <span>View Analytics</span>
              </Link>
              
              <Link href="/engagement" className="w-full bg-gradient-to-r from-pink-600 to-red-600 text-white px-4 py-3 rounded-lg hover:from-pink-700 hover:to-red-700 transition-all flex items-center space-x-2">
                <span>💬</span>
                <span>Manage Engagement</span>
              </Link>
            </div>

            <div className="mt-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-4 border border-white/10">
              <h4 className="text-white font-semibold mb-3">AI Agent Status</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm">Status</span>
                  <span className="text-green-400 text-sm">🟢 Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm">Uptime</span>
                  <span className="text-white text-sm">99.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm">Last Action</span>
                  <span className="text-white text-sm">2 min ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {(isLeftSidebarOpen || isRightSidebarOpen) && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => {
            setIsLeftSidebarOpen(false);
            setIsRightSidebarOpen(false);
          }}
        />
      )}
    </div>
  );
} 