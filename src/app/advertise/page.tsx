"use client";

import { useState } from "react";
import Link from "next/link";
import { CampaignDraft, CreatorProfile, AdvertiserMetrics } from "@/types/monetization";

export default function AdvertisePage() {
  const [activeSection, setActiveSection] = useState("campaigns");

  // Mock data for campaigns
  const campaigns: CampaignDraft[] = [
    {
      id: "1",
      title: "Holiday Tech Product Launch",
      description: "Promote our new smartwatch to tech enthusiasts",
      content: "Experience the future on your wrist! Our new smartwatch combines cutting-edge technology with sleek design. #TechInnovation #SmartWatch #FutureTech",
      requirements: ["Tech/Gadget content creator", "Professional content quality", "Minimum 10K followers"],
      platforms: ["Instagram", "Twitter/X", "TikTok"],
      category: "Technology",
      budget: {
        total: 5000,
        perCreator: 500,
        currency: "USD"
      },
      targeting: {
        minFollowers: { "Instagram": 10000, "Twitter/X": 5000, "TikTok": 15000 },
        categories: ["Technology", "Gadgets", "Lifestyle"],
        minEngagementRate: 3.0
      },
      schedule: {
        startDate: "2024-12-28",
        endDate: "2025-01-15",
        postTiming: "flexible"
      },
      deliverables: {
        postCount: 2,
        contentType: ["Photo", "Story", "Reel"],
        hashtagsRequired: ["#TechInnovation", "#SmartWatch"],
        mentionsRequired: ["@TechCorpOfficial"]
      },
      status: "active",
      createdAt: "2024-12-20",
      updatedAt: "2024-12-20"
    }
  ];

  // Mock creator profiles
  const creators: CreatorProfile[] = [
    {
      id: "1",
      username: "@techguru_sarah",
      displayName: "Sarah Tech",
      avatar: "👩‍💻",
      verified: true,
      followers: { "Instagram": 85000, "Twitter/X": 45000, "TikTok": 120000 },
      engagementRate: { "Instagram": 4.2, "Twitter/X": 3.8, "TikTok": 5.1 },
      categories: ["Technology", "Gadgets", "Reviews"],
      location: "San Francisco, CA",
      languages: ["English"],
      averageRate: 750,
      completedCampaigns: 42,
      rating: 4.9,
      responseTime: "2-4 hours",
      platforms: ["Instagram", "Twitter/X", "TikTok"],
      demographics: {
        ageRange: "25-34",
        genderSplit: { "Male": 60, "Female": 40 },
        topLocations: ["US", "Canada", "UK"]
      },
      recentPosts: [],
      isOptedIn: true
    }
  ];

  const metrics: AdvertiserMetrics = {
    totalCampaigns: 15,
    activeCampaigns: 3,
    completedCampaigns: 12,
    totalSpent: 45000,
    averageCampaignCost: 3000,
    totalReach: 2500000,
    totalEngagements: 125000,
    averageEngagementRate: 4.2,
    completionRate: 95,
    averageCreatorRating: 4.7,
    topPerformingCategories: [
      { category: "Technology", campaigns: 8, avgEngagement: 4.5 },
      { category: "Lifestyle", campaigns: 4, avgEngagement: 3.8 },
      { category: "Fashion", campaigns: 3, avgEngagement: 4.1 }
    ],
    platformBreakdown: {
      "Instagram": { campaigns: 12, spent: 25000, reach: 1500000, engagement: 75000 },
      "TikTok": { campaigns: 8, spent: 15000, reach: 800000, engagement: 40000 },
      "Twitter/X": { campaigns: 6, spent: 5000, reach: 200000, engagement: 10000 }
    }
  };

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
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
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
            <Link href="/advertise" className="text-white hover:text-purple-300 transition-colors">
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
        {/* Left Sidebar - Advertiser Menu */}
        <div className="w-64 bg-black/20 backdrop-blur-lg border-r border-white/10 p-6">
          <h3 className="text-white font-semibold mb-6">Advertiser Hub</h3>
          
          <div className="space-y-2">
            <button
              onClick={() => setActiveSection("campaigns")}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                activeSection === "campaigns"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">📋</span>
                <span>My Campaigns</span>
              </div>
            </button>

            <button
              onClick={() => setActiveSection("create")}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                activeSection === "create"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">✨</span>
                <span>Create Campaign</span>
              </div>
            </button>

            <button
              onClick={() => setActiveSection("creators")}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                activeSection === "creators"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">🔍</span>
                <span>Find Creators</span>
              </div>
            </button>

            <button
              onClick={() => setActiveSection("analytics")}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                activeSection === "analytics"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">📊</span>
                <span>Analytics</span>
              </div>
            </button>

            <button
              onClick={() => setActiveSection("billing")}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                activeSection === "billing"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">💳</span>
                <span>Billing & Payments</span>
              </div>
            </button>
          </div>

          {/* Budget Overview */}
          <div className="mt-8 bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
            <div className="text-center">
              <div className="text-sm text-gray-300 mb-1">Monthly Budget</div>
              <div className="text-2xl font-bold text-white">${metrics.totalSpent.toLocaleString()}</div>
              <div className="text-xs text-blue-400 mt-1">Used this month</div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {activeSection === "campaigns" && "My Campaigns"}
                {activeSection === "create" && "Create New Campaign"}
                {activeSection === "creators" && "Find Creators"}
                {activeSection === "analytics" && "Campaign Analytics"}
                {activeSection === "billing" && "Billing & Payments"}
              </h1>
              <p className="text-gray-300">
                {activeSection === "campaigns" && "Manage your active and completed campaigns"}
                {activeSection === "create" && "Create a new influencer marketing campaign"}
                {activeSection === "creators" && "Search and connect with content creators"}
                {activeSection === "analytics" && "Track your campaign performance and ROI"}
                {activeSection === "billing" && "Manage payments and billing settings"}
              </p>
            </div>
            {activeSection === "campaigns" && (
              <button 
                onClick={() => setActiveSection("create")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
              >
                Create Campaign
              </button>
            )}
          </div>

          {/* Campaigns Section */}
          {activeSection === "campaigns" && (
            <div className="space-y-6">
              {/* Campaign Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-700/30 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
                  <h3 className="text-blue-300 text-sm mb-2">Active Campaigns</h3>
                  <div className="text-3xl font-bold text-white">{metrics.activeCampaigns}</div>
                  <div className="text-blue-400 text-sm">Currently running</div>
                </div>
                <div className="bg-gradient-to-br from-green-900/30 to-green-700/30 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30">
                  <h3 className="text-green-300 text-sm mb-2">Total Reach</h3>
                  <div className="text-3xl font-bold text-white">{(metrics.totalReach / 1000000).toFixed(1)}M</div>
                  <div className="text-green-400 text-sm">Impressions</div>
                </div>
                <div className="bg-gradient-to-br from-purple-900/30 to-purple-700/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
                  <h3 className="text-purple-300 text-sm mb-2">Engagement Rate</h3>
                  <div className="text-3xl font-bold text-white">{metrics.averageEngagementRate}%</div>
                  <div className="text-purple-400 text-sm">Average</div>
                </div>
                <div className="bg-gradient-to-br from-orange-900/30 to-orange-700/30 backdrop-blur-lg rounded-2xl p-6 border border-orange-500/30">
                  <h3 className="text-orange-300 text-sm mb-2">Completion Rate</h3>
                  <div className="text-3xl font-bold text-white">{metrics.completionRate}%</div>
                  <div className="text-orange-400 text-sm">Success rate</div>
                </div>
              </div>

              {/* Campaign List */}
              <div className="space-y-6">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{campaign.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            campaign.status === 'active' ? 'bg-green-500/20 text-green-300' :
                            campaign.status === 'draft' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-gray-500/20 text-gray-300'
                          }`}>
                            {campaign.status}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-3">{campaign.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Budget:</span>
                            <div className="text-white font-medium">${campaign.budget.total.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-gray-400">Per Creator:</span>
                            <div className="text-white font-medium">${campaign.budget.perCreator}</div>
                          </div>
                          <div>
                            <span className="text-gray-400">Platforms:</span>
                            <div className="text-white font-medium">{campaign.platforms.length} platforms</div>
                          </div>
                          <div>
                            <span className="text-gray-400">End Date:</span>
                            <div className="text-white font-medium">{campaign.schedule.endDate}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          View Applications
                        </button>
                        <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                          Edit
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        {campaign.platforms.map((platform) => (
                          <span key={platform} className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-xs">
                            {platform}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-gray-400">
                        Created {campaign.createdAt}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Create Campaign Section */}
          {activeSection === "create" && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Campaign Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Campaign Title</label>
                    <input 
                      type="text" 
                      placeholder="Enter campaign title"
                      className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Category</label>
                    <select className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 focus:border-purple-500 focus:outline-none">
                      <option>Technology</option>
                      <option>Fashion</option>
                      <option>Beauty</option>
                      <option>Fitness</option>
                      <option>Food</option>
                      <option>Travel</option>
                      <option>Lifestyle</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
                    <textarea 
                      placeholder="Describe your campaign objectives and target audience"
                      className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 focus:border-purple-500 focus:outline-none h-24"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 text-sm font-medium mb-2">Proposed Content</label>
                    <textarea 
                      placeholder="Suggest the content you'd like creators to post"
                      className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 focus:border-purple-500 focus:outline-none h-20"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Budget & Targeting</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Total Budget</label>
                    <input 
                      type="number" 
                      placeholder="5000"
                      className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Per Creator Budget</label>
                    <input 
                      type="number" 
                      placeholder="500"
                      className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Target Creators</label>
                    <input 
                      type="number" 
                      placeholder="10"
                      className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Min Followers (Instagram)</label>
                    <input 
                      type="number" 
                      placeholder="10000"
                      className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Min Engagement Rate</label>
                    <input 
                      type="number" 
                      step="0.1"
                      placeholder="3.0"
                      className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Platforms</label>
                    <select multiple className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 focus:border-purple-500 focus:outline-none">
                      <option>Instagram</option>
                      <option>TikTok</option>
                      <option>Twitter/X</option>
                      <option>LinkedIn</option>
                      <option>YouTube</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Campaign Timeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Start Date</label>
                    <input 
                      type="date" 
                      className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">End Date</label>
                    <input 
                      type="date" 
                      className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                  Save as Draft
                </button>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105">
                  Launch Campaign
                </button>
              </div>
            </div>
          )}

          {/* Find Creators Section */}
          {activeSection === "creators" && (
            <div className="space-y-6">
              {/* Search Filters */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Search Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Platform</label>
                    <select className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20">
                      <option>All Platforms</option>
                      <option>Instagram</option>
                      <option>TikTok</option>
                      <option>Twitter/X</option>
                      <option>YouTube</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Category</label>
                    <select className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20">
                      <option>All Categories</option>
                      <option>Technology</option>
                      <option>Fashion</option>
                      <option>Beauty</option>
                      <option>Fitness</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Followers Range</label>
                    <select className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20">
                      <option>Any Size</option>
                      <option>1K - 10K</option>
                      <option>10K - 100K</option>
                      <option>100K - 1M</option>
                      <option>1M+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Price Range</label>
                    <select className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20">
                      <option>Any Price</option>
                      <option>$100 - $500</option>
                      <option>$500 - $1000</option>
                      <option>$1000+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Creator Results */}
              <div className="space-y-6">
                {creators.map((creator) => (
                  <div key={creator.id} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-3xl">
                          {creator.avatar}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-xl font-bold text-white">{creator.displayName}</h3>
                            {creator.verified && (
                              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">✓ Verified</span>
                            )}
                          </div>
                          <p className="text-gray-300">{creator.username}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-yellow-400">⭐ {creator.rating}</span>
                            <span className="text-sm text-gray-400">{creator.completedCampaigns} campaigns</span>
                            <span className="text-sm text-gray-400">Responds in {creator.responseTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">${creator.averageRate}</div>
                        <div className="text-sm text-gray-300">Average rate</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                      <div>
                        <h4 className="text-white font-semibold mb-2">Followers</h4>
                        <div className="space-y-1">
                          {Object.entries(creator.followers).map(([platform, count]) => (
                            <div key={platform} className="flex justify-between text-sm">
                              <span className="text-gray-400">{platform}:</span>
                              <span className="text-white">{(count / 1000).toFixed(0)}K</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-semibold mb-2">Engagement Rates</h4>
                        <div className="space-y-1">
                          {Object.entries(creator.engagementRate).map(([platform, rate]) => (
                            <div key={platform} className="flex justify-between text-sm">
                              <span className="text-gray-400">{platform}:</span>
                              <span className="text-white">{rate}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-semibold mb-2">Categories</h4>
                        <div className="flex flex-wrap gap-1">
                          {creator.categories.map((category) => (
                            <span key={category} className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs">
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        {creator.platforms.map((platform) => (
                          <span key={platform} className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs">
                            {platform}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-3">
                        <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                          View Profile
                        </button>
                        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105">
                          Send Invite
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Section */}
          {activeSection === "analytics" && (
            <div className="space-y-6">
              {/* Performance Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-700/30 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
                  <h3 className="text-blue-300 text-sm mb-2">Total Spend</h3>
                  <div className="text-3xl font-bold text-white">${metrics.totalSpent.toLocaleString()}</div>
                  <div className="text-blue-400 text-sm">All campaigns</div>
                </div>
                <div className="bg-gradient-to-br from-green-900/30 to-green-700/30 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30">
                  <h3 className="text-green-300 text-sm mb-2">Total Reach</h3>
                  <div className="text-3xl font-bold text-white">{(metrics.totalReach / 1000000).toFixed(1)}M</div>
                  <div className="text-green-400 text-sm">People reached</div>
                </div>
                <div className="bg-gradient-to-br from-purple-900/30 to-purple-700/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
                  <h3 className="text-purple-300 text-sm mb-2">Engagements</h3>
                  <div className="text-3xl font-bold text-white">{(metrics.totalEngagements / 1000).toFixed(0)}K</div>
                  <div className="text-purple-400 text-sm">Total interactions</div>
                </div>
                <div className="bg-gradient-to-br from-orange-900/30 to-orange-700/30 backdrop-blur-lg rounded-2xl p-6 border border-orange-500/30">
                  <h3 className="text-orange-300 text-sm mb-2">Avg Cost per Engagement</h3>
                  <div className="text-3xl font-bold text-white">${(metrics.totalSpent / metrics.totalEngagements).toFixed(2)}</div>
                  <div className="text-orange-400 text-sm">CPE</div>
                </div>
              </div>

              {/* Platform Performance */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Platform Performance</h3>
                <div className="space-y-4">
                  {Object.entries(metrics.platformBreakdown).map(([platform, data]) => (
                    <div key={platform} className="bg-white/5 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-white font-medium">{platform}</h4>
                        <span className="text-gray-400">{data.campaigns} campaigns</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Spent:</span>
                          <div className="text-white font-medium">${data.spent.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Reach:</span>
                          <div className="text-white font-medium">{(data.reach / 1000).toFixed(0)}K</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Engagement:</span>
                          <div className="text-white font-medium">{(data.engagement / 1000).toFixed(0)}K</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Billing Section */}
          {activeSection === "billing" && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Primary Payment Method</label>
                    <select className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20">
                      <option>Credit Card</option>
                      <option>PayPal</option>
                      <option>Bank Transfer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Auto-pay</label>
                    <select className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20">
                      <option>Enabled</option>
                      <option>Disabled</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Recent Payments</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-white">Holiday Tech Campaign</div>
                      <div className="text-gray-300 text-sm">December 20, 2024</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">$2,500.00</div>
                      <div className="text-green-400 text-xs">Completed</div>
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