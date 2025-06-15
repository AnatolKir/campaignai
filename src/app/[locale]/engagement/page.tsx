"use client";

import { useState } from "react";
import Link from "next/link";
import { UnifiedNavigation } from '../../../components/UnifiedNavigation';

export default function EngagementPage() {
  const [activeTab, setActiveTab] = useState("Analytics");
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  const tabs = ["Analytics", "DM Management", "Comments", "Replies", "Auto-Responses"];

  const engagementMetrics = [
    { label: "Total Engagements", value: "14.2K", change: "+23%", positive: true },
    { label: "Response Rate", value: "94%", change: "+8%", positive: true },
    { label: "Avg Response Time", value: "12min", change: "-15min", positive: true },
    { label: "Sentiment Score", value: "8.4/10", change: "+0.6", positive: true }
  ];

  const recentDMs = [
    {
      id: 1,
      sender: "@sarah_marketing",
      message: "Hi! Interested in learning more about your services. Can we schedule a call?",
      time: "2 min ago",
      platform: "twitter",
      status: "pending"
    },
    {
      id: 2,
      sender: "@john_startup",
      message: "Thanks for the follow! Love your content on AI marketing trends.",
      time: "15 min ago",
      platform: "linkedin",
      status: "replied"
    },
    {
      id: 3,
      sender: "@tech_enthusiast",
      message: "Could you explain more about your AI agent capabilities?",
      time: "1 hour ago",
      platform: "twitter",
      status: "auto-replied"
    }
  ];

  const engagementData = [
    { day: "Mon", likes: 245, comments: 67, shares: 23, dms: 12 },
    { day: "Tue", likes: 189, comments: 45, shares: 18, dms: 8 },
    { day: "Wed", likes: 312, comments: 89, shares: 34, dms: 15 },
    { day: "Thu", likes: 278, comments: 71, shares: 28, dms: 11 },
    { day: "Fri", likes: 356, comments: 95, shares: 42, dms: 19 },
    { day: "Sat", likes: 198, comments: 52, shares: 21, dms: 7 },
    { day: "Sun", likes: 267, comments: 63, shares: 25, dms: 10 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <UnifiedNavigation />

      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Engagement Analytics</h1>
          <p className="text-gray-300">Monitor and manage all your social media interactions</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
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
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {engagementMetrics.map((metric, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-gray-300 text-sm mb-2">{metric.label}</h3>
              <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
              <div className={`text-sm ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
                {metric.change} from last period
              </div>
            </div>
          ))}
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
        {activeTab === "Analytics" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Engagement Chart */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Weekly Engagement Overview</h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {engagementData.map((day, index) => {
                  const total = day.likes + day.comments + day.shares + day.dms;
                  const maxHeight = 200;
                  const height = (total / 400) * maxHeight;
                  return (
                    <div key={day.day} className="flex-1 flex flex-col items-center">
                      <div className="w-full relative" style={{ height: `${maxHeight}px` }}>
                        <div 
                          className="absolute bottom-0 w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg"
                          style={{ height: `${height}px` }}
                        >
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-300">
                            {total}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">{day.day}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Engagement Breakdown */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Engagement Types</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-white">Likes</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">8.4K</div>
                    <div className="text-green-400 text-sm">+12%</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-white">Comments</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">2.1K</div>
                    <div className="text-green-400 text-sm">+18%</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-white">Shares</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">1.8K</div>
                    <div className="text-green-400 text-sm">+25%</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <span className="text-white">Direct Messages</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">847</div>
                    <div className="text-green-400 text-sm">+31%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DM Management Tab */}
        {activeTab === "DM Management" && (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Recent Direct Messages</h3>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                Mark All Read
              </button>
            </div>
            <div className="space-y-4">
              {recentDMs.map((dm) => (
                <div key={dm.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        dm.platform === 'twitter' ? 'bg-blue-400' : 
                        dm.platform === 'linkedin' ? 'bg-blue-600' : 'bg-purple-500'
                      }`}></div>
                      <span className="font-semibold text-white">{dm.sender}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        dm.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                        dm.status === 'replied' ? 'bg-green-500/20 text-green-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {dm.status}
                      </span>
                    </div>
                    <span className="text-gray-400 text-sm">{dm.time}</span>
                  </div>
                  <p className="text-gray-300 mb-3">{dm.message}</p>
                  <div className="flex space-x-2">
                    <button className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors">
                      Reply
                    </button>
                    <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors">
                      Archive
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other tabs content */}
        {activeTab !== "Analytics" && activeTab !== "DM Management" && (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">{activeTab}</h3>
            <p className="text-gray-300">Content for {activeTab} tab coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
} 