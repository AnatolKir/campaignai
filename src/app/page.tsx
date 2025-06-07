"use client";

import Link from "next/link";
import { UnifiedNavigation } from "../components/UnifiedNavigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <UnifiedNavigation variant="landing" />

      {/* Hero Section */}
      <section className="pt-16 sm:pt-20 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300 font-medium">AI Agents Working 24/7 for 1,200+ Brands</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Your AI-Powered
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent block sm:inline">
                {" "}Social Media Team
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4 mb-8">
              Complete social media automation with AI agents that create content, engage audiences, 
              manage DMs, analyze competitors, and grow your following across all platforms.
            </p>
            
            {/* Key Features List */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12 px-4">
              <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-lg rounded-full px-4 py-2 border border-white/10">
                <span className="text-green-400">✓</span>
                <span className="text-sm text-gray-300">AI Content Creation</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-lg rounded-full px-4 py-2 border border-white/10">
                <span className="text-green-400">✓</span>
                <span className="text-sm text-gray-300">Smart Engagement</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-lg rounded-full px-4 py-2 border border-white/10">
                <span className="text-green-400">✓</span>
                <span className="text-sm text-gray-300">DM Automation</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-lg rounded-full px-4 py-2 border border-white/10">
                <span className="text-green-400">✓</span>
                <span className="text-sm text-gray-300">Competitor Intel</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 sm:mb-20 px-4">
            <Link href="/dashboard" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Start Free Trial - No Credit Card Required
            </Link>
            <a href="#screenshots" className="border-2 border-white/30 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300">
              See Live Dashboard
            </a>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto px-4">
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="text-2xl sm:text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-300 text-sm">Accounts to Follow & Engage</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="text-2xl sm:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-300 text-sm">AI Agent Activity</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="text-2xl sm:text-4xl font-bold text-white mb-2">10+</div>
              <div className="text-gray-300 text-sm">Social Platforms</div>
            </div>
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="text-2xl sm:text-4xl font-bold text-white mb-2">∞</div>
              <div className="text-gray-300 text-sm">Competitor Tracking</div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Preview Section */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Your AI Agent Is Ready
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              See how your AI agent will represent your brand across social media
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Agent Character */}
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full px-6 py-3 mb-6">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-semibold">AI Agent Active</span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Meet Your Brand's AI Representative
                  </h3>
                  <p className="text-gray-300 text-lg mb-6">
                    Professionally trained, brand-aligned, and ready to engage your audience with authentic conversations that drive real results.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                      <div className="text-2xl mb-2">🎯</div>
                      <div className="text-white font-semibold">Smart Targeting</div>
                      <div className="text-gray-400 text-sm">Finds your ideal audience</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                      <div className="text-2xl mb-2">🗣️</div>
                      <div className="text-white font-semibold">Brand Voice</div>
                      <div className="text-gray-400 text-sm">Matches your tone perfectly</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                      <div className="text-2xl mb-2">⚡</div>
                      <div className="text-white font-semibold">Instant Response</div>
                      <div className="text-gray-400 text-sm">Never misses an opportunity</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                      <div className="text-2xl mb-2">📈</div>
                      <div className="text-white font-semibold">Growth Focused</div>
                      <div className="text-gray-400 text-sm">Optimized for engagement</div>
                    </div>
                  </div>
                </div>

                {/* Agent Preview Panel */}
                <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">AI</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Your AI Agent</h4>
                      <p className="text-gray-400 text-sm">Configured & Ready</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h5 className="text-white font-medium mb-3">Current Configuration</h5>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#8B5CF6' }}></div>
                            <span className="text-gray-300 text-sm">Brand Color</span>
                          </div>
                          <span className="text-purple-300 text-sm">#8B5CF6</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">Brand Voice</span>
                          <span className="text-purple-300 text-sm">Professional</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">Enthusiasm</span>
                          <span className="text-purple-300 text-sm">Moderate</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">Response Speed</span>
                          <span className="text-purple-300 text-sm">Quick</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">Content Style</span>
                          <span className="text-purple-300 text-sm">Engaging</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg p-4 border border-green-500/30">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-300 font-medium text-sm">Status: Active & Learning</span>
                      </div>
                      <p className="text-green-100 text-xs">
                        Your AI agent is analyzing your brand and preparing personalized content strategies.
                      </p>
                    </div>

                    <Link href="/agent-settings" className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold">
                      Customize Your Agent
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
