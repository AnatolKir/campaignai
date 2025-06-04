'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function ControlPanelPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentBrand, setCurrentBrand] = useState('campaign-ai');
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock brand data - in a real app, this would come from your database/API
  const brands = [
    {
      id: 'campaign-ai',
      name: 'Campaign.ai',
      agent: {
        name: 'Brand Ambassador Alex',
        personality: 'Professional • Brand Representative • Active 24/7',
        followingCount: 2847,
        nextPost: '23min'
      },
      logo: '🤖',
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'tech-startup',
      name: 'TechStartup Co.',
      agent: {
        name: 'Innovation Sarah',
        personality: 'Tech Expert • Thought Leader • Always Learning',
        followingCount: 1532,
        nextPost: '1hr 12min'
      },
      logo: '🚀',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'fitness-brand',
      name: 'FitLife Brand',
      agent: {
        name: 'Wellness Coach Mike',
        personality: 'Fitness Enthusiast • Motivational • Health Focused',
        followingCount: 4231,
        nextPost: '45min'
      },
      logo: '💪',
      color: 'from-green-600 to-emerald-600'
    }
  ];

  const currentBrandData = brands.find(brand => brand.id === currentBrand) || brands[0];

  // Click outside handler for dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowBrandDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleBrandSwitch = (brandId: string) => {
    setCurrentBrand(brandId);
    setShowBrandDropdown(false);
  };

  const handleAddBrand = () => {
    setShowBrandDropdown(false);
    setShowAddBrandModal(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' : 'bg-gray-50'}`}>
      {/* Top Navigation Bar */}
      <header className={`border-b sticky top-0 z-50 backdrop-blur-sm transition-colors duration-300 ${isDarkMode ? 'bg-black/20 border-purple-800/50' : 'bg-white/80 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center space-x-3">
                {/* Campaign Logo */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    {/* Campaign Logo - Geometric Pattern */}
                    <svg width="32" height="24" viewBox="0 0 32 24" className={`transition-colors duration-300 ${isDarkMode ? 'fill-white' : 'fill-gray-900'}`}>
                      {/* Left column */}
                      <polygon points="4,6 8,2 12,6 8,10"/>
                      <polygon points="4,14 8,10 12,14 8,18"/>
                      
                      {/* Right column */}
                      <polygon points="20,6 24,2 28,6 24,10"/>
                      <polygon points="20,14 24,10 28,14 24,18"/>
                      
                      {/* Center top */}
                      <polygon points="12,6 16,2 20,6 16,10"/>
                    </svg>
                  </div>
                  <h1 className={`text-2xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Campaign
                  </h1>
                </div>
              </div>
              <nav className="hidden md:ml-8 md:flex md:space-x-8">
                <a href="#dashboard" className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white hover:text-purple-300' : 'text-gray-900 hover:text-purple-600'}`}>Dashboard</a>
                <a href="#posts" className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-purple-200 hover:text-purple-300' : 'text-gray-500 hover:text-purple-600'}`}>Posts</a>
                <a href="#engagement" className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-purple-200 hover:text-purple-300' : 'text-gray-500 hover:text-purple-600'}`}>Engagement</a>
                <a href="#analytics" className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-purple-200 hover:text-purple-300' : 'text-gray-500 hover:text-purple-600'}`}>Analytics</a>
                <a href="#ai-agent" className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-purple-200 hover:text-purple-300' : 'text-gray-500 hover:text-purple-600'}`}>AI Agent</a>
                <a href="#training" className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-purple-200 hover:text-purple-300' : 'text-gray-500 hover:text-purple-600'}`}>Training</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              {/* Dark/Light Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-300 ${isDarkMode ? 'bg-purple-600/20 hover:bg-purple-600/30 text-purple-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
              >
                {isDarkMode ? '🌙' : '☀️'}
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105">
                Upgrade to Pro
              </button>
              <Link 
                href="/auth" 
                className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-purple-200 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Connected Accounts - Responsive: horizontal on mobile, narrow sidebar on desktop */}
        <div className="lg:hidden mb-4">
          <h2 className={`text-xs font-semibold mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Connected Accounts</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {[
              { identifier: 'x', name: 'Twitter/X', status: 'Active' },
              { identifier: 'instagram', name: 'Instagram', status: 'Active' },
              { identifier: 'linkedin', name: 'LinkedIn', status: 'Active' },
              { identifier: 'tiktok', name: 'TikTok', status: 'Connect' },
              { identifier: 'youtube', name: 'YouTube', status: 'Connect' },
              { identifier: 'discord', name: 'Discord', status: 'Connect' },
              { identifier: 'telegram', name: 'Telegram', status: 'Connect' },
              { identifier: 'reddit', name: 'Reddit', status: 'Connect' },
              { identifier: 'mastodon', name: 'Mastodon', status: 'Connect' },
              { identifier: 'threads', name: 'Threads', status: 'Connect' },
            ].map((platform) => (
              <div key={platform.identifier} className={`flex items-center justify-between p-2 rounded-md transition-all duration-300 cursor-pointer ${isDarkMode ? 'bg-gray-800/60 border border-purple-700/50 hover:bg-gray-700/50' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}>
                <div 
                  className="flex-shrink-0"
                  title={platform.name}
                >
                  {platform.identifier === 'youtube' ? (
                    <img
                      src="/icons/platforms/youtube.svg"
                      alt={platform.identifier}
                      className="w-5 h-5"
                    />
                  ) : (
                    <img
                      src={`/icons/platforms/${platform.identifier}.png`}
                      alt={platform.identifier}
                      className="w-5 h-5 rounded-sm"
                    />
                  )}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium transition-colors duration-300 ${platform.status === 'Active' 
                  ? isDarkMode ? 'bg-green-500/20 text-green-300 border border-green-400/30' : 'bg-green-100 text-green-800' 
                  : isDarkMode ? 'bg-red-500/20 text-red-300 border border-red-400/50 hover:bg-red-500/30 hover:text-red-200' : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}>
                  {platform.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-4">
          {/* Social Media Accounts Panel - Desktop only, much narrower */}
          <div className={`hidden lg:block rounded-lg shadow-lg border p-2 transition-all duration-300 ${isDarkMode ? 'bg-gray-800/60 border-purple-700/50 backdrop-blur-sm' : 'bg-white border-gray-200'}`}>
            <h2 className={`text-xs font-semibold mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Connected Accounts</h2>
            <div className="space-y-1.5">
              {[
                { identifier: 'x', name: 'Twitter/X', status: 'Active' },
                { identifier: 'instagram', name: 'Instagram', status: 'Active' },
                { identifier: 'linkedin', name: 'LinkedIn', status: 'Active' },
                { identifier: 'tiktok', name: 'TikTok', status: 'Connect' },
                { identifier: 'youtube', name: 'YouTube', status: 'Connect' },
                { identifier: 'discord', name: 'Discord', status: 'Connect' },
                { identifier: 'telegram', name: 'Telegram', status: 'Connect' },
                { identifier: 'reddit', name: 'Reddit', status: 'Connect' },
                { identifier: 'mastodon', name: 'Mastodon', status: 'Connect' },
                { identifier: 'threads', name: 'Threads', status: 'Connect' },
              ].map((platform) => (
                <div key={platform.identifier} className={`flex items-center justify-between p-1 rounded-md transition-all duration-300 cursor-pointer ${isDarkMode ? 'hover:bg-gray-700/50 hover:border-purple-500/30 border border-transparent' : 'hover:bg-gray-50'}`}>
                  <div 
                    className="flex-shrink-0"
                    title={platform.name}
                  >
                    {platform.identifier === 'youtube' ? (
                      <img
                        src="/icons/platforms/youtube.svg"
                        alt={platform.identifier}
                        className="w-6 h-6"
                      />
                    ) : (
                      <img
                        src={`/icons/platforms/${platform.identifier}.png`}
                        alt={platform.identifier}
                        className="w-6 h-6 rounded-sm"
                      />
                    )}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium transition-colors duration-300 ${platform.status === 'Active' 
                    ? isDarkMode ? 'bg-green-500/20 text-green-300 border border-green-400/30' : 'bg-green-100 text-green-800' 
                    : isDarkMode ? 'bg-red-500/20 text-red-300 border border-red-400/50 hover:bg-red-500/30 hover:text-red-200' : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}>
                    {platform.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Area - Expanded */}
          <div className="lg:col-span-5 space-y-4">
            {/* AI Agent Status with Brand Management - Enhanced */}
            <div className={`bg-gradient-to-r ${currentBrandData.color} rounded-lg p-4 text-white shadow-lg relative`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {/* Brand Selector */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="relative" ref={dropdownRef}>
                      <button 
                        onClick={() => setShowBrandDropdown(!showBrandDropdown)}
                        className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-sm"
                      >
                        <span className="text-lg">{currentBrandData.logo}</span>
                        <span>{currentBrandData.name}</span>
                        <svg className={`w-4 h-4 transition-transform duration-200 ${showBrandDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Brand Dropdown */}
                      {showBrandDropdown && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border z-50 overflow-hidden">
                          <div className="py-2">
                            {brands.map((brand) => (
                              <button
                                key={brand.id}
                                onClick={() => handleBrandSwitch(brand.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                                  currentBrand === brand.id ? 'bg-purple-50 border-l-4 border-purple-500' : ''
                                }`}
                              >
                                <span className="text-lg">{brand.logo}</span>
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900">{brand.name}</div>
                                  <div className="text-sm text-gray-500">{brand.agent.name}</div>
                                </div>
                                {currentBrand === brand.id && (
                                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                )}
                              </button>
                            ))}
                            <div className="border-t border-gray-200 mt-2">
                              <button 
                                onClick={handleAddBrand}
                                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 text-purple-600"
                              >
                                <span className="text-lg">➕</span>
                                <div className="flex-1">
                                  <div className="font-medium">Add New Brand</div>
                                  <div className="text-sm text-gray-500">Create another brand profile</div>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Agent Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-1">AI Agent: "{currentBrandData.agent.name}"</h3>
                    <p className="text-white/80 text-sm">{currentBrandData.agent.personality}</p>
                    <div className="flex items-center mt-2 space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>Online</span>
                      </div>
                      <span>Following {currentBrandData.agent.followingCount.toLocaleString()} accounts</span>
                      <span>Next post in {currentBrandData.agent.nextPost}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right flex flex-col space-y-2">
                  <button className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105">
                    Customize Agent
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border border-white/20">
                    Brand Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats - More Compact */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Posts Today', value: '12', change: '+18%', icon: '📝' },
                { label: 'Engagements', value: '1,247', change: '+23%', icon: '❤️' },
                { label: 'New Followers', value: '89', change: '+41%', icon: '👥' },
                { label: 'DMs Handled', value: '34', change: '+12%', icon: '💬' },
              ].map((stat) => (
                <div key={stat.label} className={`rounded-lg p-3 border shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-black/20 border-purple-700/50 backdrop-blur-sm' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-purple-300' : 'text-gray-600'}`}>{stat.label}</p>
                      <p className={`text-xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                      <p className="text-xs text-green-400">{stat.change}</p>
                    </div>
                    <span className="text-lg">{stat.icon}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Showcase - Compact Tabs */}
            <div className={`rounded-lg shadow-lg border transition-all duration-300 ${isDarkMode ? 'bg-black/20 border-purple-700/50 backdrop-blur-sm' : 'bg-white border-gray-200'}`}>
              <div className={`border-b transition-colors duration-300 ${isDarkMode ? 'border-purple-700/50' : 'border-gray-200'}`}>
                <nav className="flex space-x-6 px-4 py-2" aria-label="Tabs">
                  {[
                    { name: 'Smart Posting', active: true },
                    { name: 'Auto Engagement', active: false },
                    { name: 'DM Management', active: false },
                    { name: 'Competitor Intel', active: false },
                    { name: 'Schedule Manager', active: false },
                  ].map((tab) => (
                    <button
                      key={tab.name}
                      className={`py-2 px-1 border-b-2 font-medium text-xs transition-all duration-300 ${
                        tab.active
                          ? 'border-purple-500 text-purple-400'
                          : isDarkMode 
                            ? 'border-transparent text-purple-200 hover:text-purple-300' 
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* Compact Content */}
              <div className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Pending Posts - Compact */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Pending Posts</h3>
                      <button className="text-purple-400 hover:text-purple-300 text-xs font-medium transition-colors duration-300">View All</button>
                    </div>
                    <div className="space-y-2">
                      {[
                        {
                          content: "Just discovered an amazing new productivity hack that's been game-changing for my workflow! 🚀",
                          platform: "Twitter/X",
                          scheduledFor: "2:30 PM",
                          approval: "WhatsApp"
                        },
                        {
                          content: "Behind the scenes of today's brainstorming session. Sometimes the best ideas come from unexpected places... ✨",
                          platform: "Instagram",
                          scheduledFor: "4:15 PM", 
                          approval: "Auto-approve"
                        },
                        {
                          content: "Sharing insights on how AI is transforming content creation and audience engagement in 2025.",
                          platform: "LinkedIn",
                          scheduledFor: "6:00 PM",
                          approval: "Telegram"
                        }
                      ].map((post, index) => (
                        <div key={index} className={`border rounded-md p-3 transition-all duration-300 ${isDarkMode ? 'border-purple-700/50 hover:bg-purple-800/10 bg-black/10' : 'border-gray-200 hover:bg-gray-50 bg-white'}`}>
                          <p className={`mb-2 text-xs line-clamp-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{post.content}</p>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-3">
                              <span className={`transition-colors duration-300 ${isDarkMode ? 'text-purple-300' : 'text-gray-600'}`}>{post.platform}</span>
                              <span className={`transition-colors duration-300 ${isDarkMode ? 'text-purple-300' : 'text-gray-600'}`}>{post.scheduledFor}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-0.5 rounded-full text-xs transition-colors duration-300 ${post.approval === 'Auto-approve' 
                                ? isDarkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-800'
                                : isDarkMode ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {post.approval}
                              </span>
                              <button className="text-purple-400 hover:text-purple-300 text-xs font-medium transition-colors duration-300">Edit</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Recommendations - Compact */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>AI Recommendations</h3>
                      <button className="text-purple-400 hover:text-purple-300 text-xs font-medium transition-colors duration-300">Refresh</button>
                    </div>
                    <div className="space-y-2">
                      <div className={`border rounded-md p-3 transition-all duration-300 ${isDarkMode ? 'bg-blue-500/10 border-blue-400/30' : 'bg-blue-50 border-blue-200'}`}>
                        <div className="flex items-start space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">AI</div>
                          <div className="flex-1">
                            <h4 className={`font-medium mb-1 text-xs transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Trending Topic Alert</h4>
                            <p className={`text-xs mb-2 transition-colors duration-300 ${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>"Productivity hacks" is trending. Consider creating content.</p>
                            <button className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors duration-300">Create Post</button>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`border rounded-md p-3 transition-all duration-300 ${isDarkMode ? 'bg-green-500/10 border-green-400/30' : 'bg-green-50 border-green-200'}`}>
                        <div className="flex items-start space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">AI</div>
                          <div className="flex-1">
                            <h4 className={`font-medium mb-1 text-xs transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Engagement Opportunity</h4>
                            <p className={`text-xs mb-2 transition-colors duration-300 ${isDarkMode ? 'text-green-200' : 'text-gray-600'}`}>@TechInfluencer posted about AI tools. High engagement potential.</p>
                            <button className="text-green-400 hover:text-green-300 text-xs font-medium transition-colors duration-300">Reply Now</button>
                          </div>
                        </div>
                      </div>

                      <div className={`border rounded-md p-3 transition-all duration-300 ${isDarkMode ? 'bg-purple-500/10 border-purple-400/30' : 'bg-purple-50 border-purple-200'}`}>
                        <div className="flex items-start space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">AI</div>
                          <div className="flex-1">
                            <h4 className={`font-medium mb-1 text-xs transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Competitor Analysis</h4>
                            <p className={`text-xs mb-2 transition-colors duration-300 ${isDarkMode ? 'text-purple-200' : 'text-gray-600'}`}>Competitor launched campaign. Weekly report available.</p>
                            <button className="text-purple-400 hover:text-purple-300 text-xs font-medium transition-colors duration-300">View Report</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Cards - More Compact */}
            <div className="grid grid-cols-3 gap-4">
              {/* AI Agent Customization */}
              <div className={`rounded-lg p-4 border shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${isDarkMode ? 'bg-black/20 border-purple-700/50 backdrop-blur-sm hover:bg-purple-800/10' : 'bg-white border-gray-200 hover:shadow-xl'}`}>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">🤖</span>
                  </div>
                  <div>
                    <h3 className={`text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Customize AI Agent</h3>
                    <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-purple-300' : 'text-gray-600'}`}>Professional Brand Rep</p>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 transform hover:scale-105">
                  Customize Agent
                </button>
              </div>

              {/* Training Center */}
              <div className={`rounded-lg p-4 border shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${isDarkMode ? 'bg-black/20 border-purple-700/50 backdrop-blur-sm hover:bg-purple-800/10' : 'bg-white border-gray-200 hover:shadow-xl'}`}>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">📚</span>
                  </div>
                  <div>
                    <h3 className={`text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Training Center</h3>
                    <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-purple-300' : 'text-gray-600'}`}>12 docs uploaded</p>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 transform hover:scale-105">
                  Add Training Data
                </button>
              </div>

              {/* Analytics & Reports */}
              <div className={`rounded-lg p-4 border shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${isDarkMode ? 'bg-black/20 border-purple-700/50 backdrop-blur-sm hover:bg-purple-800/10' : 'bg-white border-gray-200 hover:shadow-xl'}`}>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">📊</span>
                  </div>
                  <div>
                    <h3 className={`text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Competitor Reports</h3>
                    <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-purple-300' : 'text-gray-600'}`}>Weekly frequency</p>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 transform hover:scale-105">
                  View Reports
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner - Compact */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-center text-white shadow-2xl">
          <h2 className="text-2xl font-bold mb-2">Ready to Activate Your AI Agent?</h2>
          <p className="text-lg text-purple-100 mb-4 max-w-2xl mx-auto">
            This is just a preview! Sign up now to connect your real accounts and start automating your social media growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              href="/auth" 
              className="bg-white text-purple-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Free Trial
            </Link>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105">
              Schedule Demo
            </button>
          </div>
          <p className="text-purple-200 mt-3">No credit card required • Full access for 7 days</p>
        </div>
      </div>

      {/* Add Brand Modal */}
      {showAddBrandModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Brand</h3>
              <button 
                onClick={() => setShowAddBrandModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter brand name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">AI Agent Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter AI agent name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand Personality</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe your brand's personality and tone"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand Icon</label>
                <div className="flex flex-wrap gap-2">
                  {['🏢', '🚀', '💻', '📱', '🎨', '🌟', '⚡', '🔥', '💎', '🎯'].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className="w-10 h-10 text-lg border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddBrandModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                >
                  Create Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 