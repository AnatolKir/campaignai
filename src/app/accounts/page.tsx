"use client";

import Link from "next/link";
import { useState } from "react";
import { UnifiedNavigation } from "../../components/UnifiedNavigation";

export default function AccountsPage() {
  const socialPlatforms = [
    {
      id: "twitter",
      name: "Twitter/X",
      icon: "𝕏",
      bgColor: "bg-black",
      status: "active",
      followers: "12.3K",
      engagement: "4.2%"
    },
    {
      id: "instagram", 
      name: "Instagram",
      icon: "📷",
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      status: "active",
      followers: "8.7K",
      engagement: "6.8%"
    },
    {
      id: "linkedin",
      name: "LinkedIn", 
      icon: "in",
      bgColor: "bg-blue-600",
      status: "active",
      followers: "3.2K",
      engagement: "3.1%"
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: "🎵", 
      bgColor: "bg-black",
      status: "disconnected",
      followers: "0",
      engagement: "0%"
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: "▶",
      bgColor: "bg-red-600", 
      status: "disconnected",
      followers: "0",
      engagement: "0%"
    },
    {
      id: "discord",
      name: "Discord",
      icon: "💬",
      bgColor: "bg-indigo-600",
      status: "disconnected", 
      followers: "0",
      engagement: "0%"
    },
    {
      id: "telegram",
      name: "Telegram",
      icon: "✈",
      bgColor: "bg-blue-500",
      status: "disconnected",
      followers: "0", 
      engagement: "0%"
    },
    {
      id: "reddit",
      name: "Reddit", 
      icon: "🤖",
      bgColor: "bg-orange-600",
      status: "disconnected",
      followers: "0",
      engagement: "0%"
    },
    {
      id: "threads",
      name: "Threads",
      icon: "@",
      bgColor: "bg-black",
      status: "disconnected",
      followers: "0",
      engagement: "0%"
    }
  ];

  // State for loading states
  const [isConnecting, setIsConnecting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Handler functions for quick actions
  const handleBulkConnect = async () => {
    setIsConnecting(true);
    try {
      // Simulate connecting multiple accounts
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Bulk connection wizard launched! This would open a modal to connect multiple social media accounts simultaneously.");
    } catch (error) {
      console.error("Error connecting accounts:", error);
      alert("Failed to launch bulk connection wizard. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleImportCompetitors = async () => {
    setIsImporting(true);
    try {
      // Simulate importing competitor data
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert("Competitor import started! This would allow you to analyze competitor accounts and strategies.");
    } catch (error) {
      console.error("Error importing competitors:", error);
      alert("Failed to import competitors. Please try again.");
    } finally {
      setIsImporting(false);
    }
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      alert("Account performance report generated! This would create a comprehensive report of your social media performance.");
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Top Navigation */}
      <UnifiedNavigation />

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Connected Accounts</h1>
            <p className="text-gray-300">Manage your social media accounts and configure AI automation settings</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-300 text-sm">Connected Accounts</h3>
                <span className="text-green-400">🔗</span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">3</div>
              <div className="text-gray-400 text-sm">of 9 platforms</div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-300 text-sm">Total Followers</h3>
                <span className="text-blue-400">👥</span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">24.2K</div>
              <div className="text-green-400 text-sm">+12% this month</div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-300 text-sm">Avg Engagement</h3>
                <span className="text-purple-400">📊</span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">4.7%</div>
              <div className="text-green-400 text-sm">+0.3% this week</div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-300 text-sm">AI Posts Today</h3>
                <span className="text-yellow-400">🤖</span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">8</div>
              <div className="text-gray-400 text-sm">across all platforms</div>
            </div>
          </div>

          {/* Platform Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialPlatforms.map((platform) => (
              <Link
                key={platform.id}
                href={`/accounts/${platform.id}`}
                className="group bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${platform.bgColor} rounded-xl flex items-center justify-center`}>
                      <span className="text-white font-bold text-lg">{platform.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{platform.name}</h3>
                      <p className="text-gray-400 text-sm">{platform.followers} followers</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      platform.status === 'active' 
                        ? 'text-green-400 bg-green-400/20' 
                        : 'text-red-400 bg-red-400/20'
                    }`}>
                      {platform.status === 'active' ? 'Active' : 'Connect'}
                    </span>
                    {platform.status === 'active' && (
                      <span className="text-gray-400 text-xs">{platform.engagement} engagement</span>
                    )}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">
                      {platform.status === 'active' ? 'Manage Account' : 'Connect & Configure'}
                    </span>
                    <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-12 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={handleBulkConnect}
                disabled={isConnecting}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isConnecting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connecting...
                  </>
                ) : (
                  "Bulk Connect Accounts"
                )}
              </button>
              <button 
                onClick={handleImportCompetitors}
                disabled={isImporting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isImporting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Importing...
                  </>
                ) : (
                  "Import Competitors"
                )}
              </button>
              <button 
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  "Generate Report"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 