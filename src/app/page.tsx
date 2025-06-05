"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src="/logo-32.png" alt="Campaign.ai" className="w-10 h-10" />
              </div>
              <span className="text-white font-bold text-xl">Campaign.ai</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors font-medium">
                Features
              </Link>
              <Link href="#screenshots" className="text-gray-300 hover:text-white transition-colors font-medium">
                Demo
              </Link>
              <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors font-medium">
                Pricing
              </Link>
              <Link href="/monetize" className="text-gray-300 hover:text-white transition-colors font-medium">
                Monetize
              </Link>
              <Link href="/advertise" className="text-gray-300 hover:text-white transition-colors font-medium">
                Advertise
              </Link>
              <div className="h-6 w-px bg-white/20"></div>
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors font-medium">
                Sign In
              </Link>
              <Link href="/dashboard" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg">
                Start Free Trial
              </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-white/10">
              <div className="flex flex-col space-y-3 pt-4">
                <Link href="#features" className="text-gray-300 hover:text-white transition-colors py-2 font-medium">
                  Features
                </Link>
                <Link href="#screenshots" className="text-gray-300 hover:text-white transition-colors py-2 font-medium">
                  Demo
                </Link>
                <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors py-2 font-medium">
                  Pricing
                </Link>
                <Link href="/monetize" className="text-gray-300 hover:text-white transition-colors py-2 font-medium">
                  Monetize
                </Link>
                <Link href="/advertise" className="text-gray-300 hover:text-white transition-colors py-2 font-medium">
                  Advertise
                </Link>
                <div className="h-px bg-white/10 my-2"></div>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors py-2 font-medium">
                  Sign In
                </Link>
                <Link href="/dashboard" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-center font-semibold shadow-lg">
                  Start Free Trial
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
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
              <div className="text-2xl sm:text-4xl font-bold text-white mb-2">9+</div>
              <div className="text-gray-300 text-sm">Social Platforms</div>
            </div>
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="text-2xl sm:text-4xl font-bold text-white mb-2">∞</div>
              <div className="text-gray-300 text-sm">Competitor Tracking</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Screenshots Section */}
      <section id="screenshots" className="py-16 sm:py-20 px-4 sm:px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              See Your AI Team in
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}Action
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Get a behind-the-scenes look at how Campaign.ai's AI agents manage your social media presence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Dashboard Overview */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/20">
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl relative overflow-hidden">
                  <div className="absolute inset-4">
                    {/* Mock Dashboard UI */}
                    <div className="bg-white/5 rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
                        <div>
                          <div className="h-2 bg-white/30 rounded w-24 mb-1"></div>
                          <div className="h-1 bg-white/20 rounded w-16"></div>
                        </div>
                        <div className="ml-auto">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="bg-white/10 rounded p-2">
                          <div className="h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded mb-1"></div>
                          <div className="h-1 bg-white/20 rounded"></div>
                        </div>
                        <div className="bg-white/10 rounded p-2">
                          <div className="h-6 bg-gradient-to-r from-red-400 to-pink-400 rounded mb-1"></div>
                          <div className="h-1 bg-white/20 rounded"></div>
                        </div>
                        <div className="bg-white/10 rounded p-2">
                          <div className="h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded mb-1"></div>
                          <div className="h-1 bg-white/20 rounded"></div>
                        </div>
                        <div className="bg-white/10 rounded p-2">
                          <div className="h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded mb-1"></div>
                          <div className="h-1 bg-white/20 rounded"></div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/5 rounded p-2">
                        <div className="h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded mb-2"></div>
                        <div className="h-1 bg-white/20 rounded mb-1"></div>
                        <div className="h-1 bg-white/20 rounded w-3/4"></div>
                      </div>
                      <div className="bg-white/5 rounded p-2">
                        <div className="h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded mb-2"></div>
                        <div className="h-1 bg-white/20 rounded mb-1"></div>
                        <div className="h-1 bg-white/20 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mt-6 mb-3">AI Agent Dashboard</h3>
                <p className="text-gray-300 text-sm">
                  Monitor your AI agent's activity, engagement metrics, and real-time performance across all platforms.
                </p>
              </div>
            </div>

            {/* Content Creation */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/20">
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl relative overflow-hidden">
                  <div className="absolute inset-4">
                    {/* Mock Content Creation UI */}
                    <div className="bg-white/5 rounded-lg p-3 mb-3">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-6 h-6 bg-blue-500 rounded"></div>
                        <div className="h-1.5 bg-white/30 rounded w-20"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-white/20 rounded"></div>
                        <div className="h-2 bg-white/20 rounded w-4/5"></div>
                        <div className="h-2 bg-white/20 rounded w-3/5"></div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 mb-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-purple-500 rounded"></div>
                        <div className="h-1.5 bg-white/30 rounded w-16"></div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded h-8 mb-2"></div>
                      <div className="h-1 bg-white/20 rounded w-full mb-1"></div>
                      <div className="h-1 bg-white/20 rounded w-3/4"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="bg-green-500/20 rounded px-2 py-1">
                        <div className="h-1 bg-green-400 rounded w-8"></div>
                      </div>
                      <div className="bg-blue-500/20 rounded px-2 py-1">
                        <div className="h-1 bg-blue-400 rounded w-6"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mt-6 mb-3">Smart Content Creation</h3>
                <p className="text-gray-300 text-sm">
                  AI generates, schedules, and publishes content tailored to your brand voice and audience preferences.
                </p>
              </div>
            </div>

            {/* Analytics */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-900/40 to-blue-900/40 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/20">
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl relative overflow-hidden">
                  <div className="absolute inset-4">
                    {/* Mock Analytics UI */}
                    <div className="bg-white/5 rounded-lg p-3 mb-3">
                      <div className="flex justify-between items-center mb-3">
                        <div className="h-2 bg-white/30 rounded w-16"></div>
                        <div className="h-1.5 bg-green-400 rounded w-8"></div>
                      </div>
                      <div className="h-16 bg-gradient-to-t from-green-500/10 to-green-500/30 rounded relative">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50">
                          <path d="M10 40 L30 25 L50 30 L70 15 L90 20" stroke="#10b981" strokeWidth="2" fill="none"/>
                        </svg>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white/5 rounded p-2 text-center">
                        <div className="h-1 bg-blue-400 rounded w-full mb-1"></div>
                        <div className="h-0.5 bg-white/20 rounded w-3/4 mx-auto"></div>
                      </div>
                      <div className="bg-white/5 rounded p-2 text-center">
                        <div className="h-1 bg-purple-400 rounded w-full mb-1"></div>
                        <div className="h-0.5 bg-white/20 rounded w-3/4 mx-auto"></div>
                      </div>
                      <div className="bg-white/5 rounded p-2 text-center">
                        <div className="h-1 bg-pink-400 rounded w-full mb-1"></div>
                        <div className="h-0.5 bg-white/20 rounded w-3/4 mx-auto"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mt-6 mb-3">Advanced Analytics</h3>
                <p className="text-gray-300 text-sm">
                  Track growth, engagement rates, competitor performance, and ROI with detailed insights and reports.
                </p>
              </div>
            </div>

            {/* Training Interface */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/20">
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl relative overflow-hidden">
                  <div className="absolute inset-4">
                    {/* Mock Training UI */}
                    <div className="bg-white/5 rounded-lg p-3 mb-3">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                        <div className="h-2 bg-white/30 rounded w-24"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div className="h-1.5 bg-white/20 rounded w-16"></div>
                          <div className="h-1.5 bg-orange-400 rounded w-8"></div>
                        </div>
                        <div className="h-2 bg-white/10 rounded">
                          <div className="h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/5 rounded p-2">
                        <div className="h-2 bg-purple-400 rounded mb-2"></div>
                        <div className="h-1 bg-white/20 rounded mb-1"></div>
                        <div className="h-1 bg-white/20 rounded w-2/3"></div>
                      </div>
                      <div className="bg-white/5 rounded p-2">
                        <div className="h-2 bg-blue-400 rounded mb-2"></div>
                        <div className="h-1 bg-white/20 rounded mb-1"></div>
                        <div className="h-1 bg-white/20 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mt-6 mb-3">AI Agent Training</h3>
                <p className="text-gray-300 text-sm">
                  Train your AI agent with your content, brand voice, and preferences for personalized automation.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/dashboard" className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
              Try the Dashboard Free
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Complete AI-Powered 
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}Social Media Suite
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto px-4">
              From content creation to competitor analysis, our AI agents handle every aspect of your social media presence with human-like intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {/* AI Content Generation */}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">AI Content Creation</h3>
              <p className="text-gray-300 mb-6">
                Train your AI agent with your brand voice, content examples, and preferences. Get unique, on-brand content generated 24/7.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Custom AI training with your content</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">WhatsApp/Telegram approval workflow</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Multi-platform content optimization</span>
                </li>
              </ul>
            </div>

            {/* Smart Engagement */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Intelligent Engagement</h3>
              <p className="text-gray-300 mb-6">
                Follow up to 10,000 accounts per brand. AI engages with their content naturally to build relationships and grow your following.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">10,000+ targeted account following</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Contextual AI replies and comments</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Organic follower growth strategies</span>
                </li>
              </ul>
            </div>

            {/* DM Automation */}
            <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">DM Management</h3>
              <p className="text-gray-300 mb-6">
                AI handles all direct messages with human-like responses. Perfect for customer service, lead generation, and relationship building.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">24/7 intelligent DM responses</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Lead qualification and nurturing</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Smart escalation to humans</span>
                </li>
              </ul>
            </div>

            {/* Competitor Intelligence */}
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Competitor Intelligence</h3>
              <p className="text-gray-300 mb-6">
                Track unlimited competitors with detailed analytics. Get actionable insights delivered on your schedule.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Unlimited competitor tracking</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Custom reporting schedules</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Trend analysis and insights</span>
                </li>
              </ul>
            </div>

            {/* Analytics & Reporting */}
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Advanced Analytics</h3>
              <p className="text-gray-300 mb-6">
                Deep insights into your social media performance with AI-powered recommendations for growth optimization.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Real-time performance tracking</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">AI-powered growth recommendations</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Custom dashboard and reports</span>
                </li>
              </ul>
            </div>

            {/* Multi-Platform Support */}
            <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">9+ Platform Support</h3>
              <p className="text-gray-300 mb-6">
                Manage all your social platforms from one dashboard. Twitter, Instagram, LinkedIn, TikTok, YouTube, and more.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Twitter/X, Instagram, LinkedIn</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">TikTok, YouTube, Discord</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Telegram, Reddit, Threads</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="mt-16 bg-gradient-to-br from-slate-900/50 to-purple-900/30 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-white/10">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Why Brands Choose Campaign.ai</h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Join 1,200+ brands already using AI agents to scale their social media presence without the overhead.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Save 90% on Social Media Costs</h4>
                <p className="text-gray-300 text-sm">Replace expensive agencies and freelancers with AI</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">10x Faster Content Creation</h4>
                <p className="text-gray-300 text-sm">AI generates content in seconds, not hours</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">24/7 Brand Consistency</h4>
                <p className="text-gray-300 text-sm">Never miss an engagement opportunity</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Data-Driven Growth</h4>
                <p className="text-gray-300 text-sm">AI optimizes for maximum engagement and ROI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section id="pricing" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Replace Your Social Media Team
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}with AI
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto px-4 mb-8">
              Save 90% on social media costs while getting 10x better results. All plans include unlimited AI content generation, engagement automation, and competitor intelligence.
            </p>
            <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-green-400 text-sm font-medium">Free 14-day trial • No credit card required</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-8 sm:mb-12">
            {/* Standard Plan */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Standard</h3>
                <p className="text-gray-400 mb-4">Great for small businesses</p>
                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-bold text-white">$99</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">3 Brands</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Basic automation</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Email support</span>
                </li>
              </ul>
              <button className="w-full py-3 px-6 rounded-full font-semibold bg-white/10 text-white hover:bg-white/20 transition-all duration-300">
                Get Started
              </button>
            </div>

            {/* Pro Plan - Most Popular */}
            <div className="relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-purple-500/50 ring-2 ring-purple-500/30 transform scale-100 lg:scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </div>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Pro</h3>
                <p className="text-gray-400 mb-4">Perfect for growing teams</p>
                <div className="mb-2">
                  <span className="text-3xl sm:text-4xl font-bold text-white">$399</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-sm text-purple-300">+$20/per extra user</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">10 Brands</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Advanced automation</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">DM Management</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Phone & email support</span>
                </li>
              </ul>
              <button className="w-full py-3 px-6 rounded-full font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                Start Pro Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 md:col-span-2 lg:col-span-1">
              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Enterprise</h3>
                <p className="text-gray-400 mb-4">For large teams</p>
                <div className="mb-2">
                  <span className="text-3xl sm:text-4xl font-bold text-white">$1999</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-sm text-purple-300">+$20/per extra user</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Unlimited Brands</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Full automation suite</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">API Access</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Enterprise support</span>
                </li>
              </ul>
              <button className="w-full py-3 px-6 rounded-full font-semibold bg-white/10 text-white hover:bg-white/20 transition-all duration-300">
                Contact Sales
              </button>
            </div>
          </div>

          <div className="text-center">
            <Link href="/upgrade" className="inline-flex items-center text-purple-400 hover:text-purple-300 font-semibold text-lg transition-colors">
              View all plans and features
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-white/10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Social Media?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of creators and businesses who are growing their social media presence 
              with AI-powered automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Start Your Free Trial
              </Link>
              <button className="border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logo-32.png" alt="Campaign.ai" className="w-8 h-8" />
              </div>
              <span className="text-white font-bold text-xl">Campaign.ai</span>
            </div>
            <div className="flex flex-wrap justify-center space-x-6 sm:space-x-8 text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Campaign.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
