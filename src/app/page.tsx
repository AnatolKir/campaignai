"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logo-32.png" alt="Campaign.ai" className="w-8 h-8" />
              </div>
              <span className="text-white font-bold text-xl">Campaign.ai</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-6">
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/upgrade" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/monetize" className="text-gray-300 hover:text-white transition-colors">
                Monetize
              </Link>
              <Link href="/advertise" className="text-gray-300 hover:text-white transition-colors">
                Advertise
              </Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/dashboard" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              className="lg:hidden text-white p-2"
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
              <div className="flex flex-col space-y-4 pt-4">
                <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
                  Features
                </Link>
                <Link href="/upgrade" className="text-gray-300 hover:text-white transition-colors">
                  Pricing
                </Link>
                <Link href="/monetize" className="text-gray-300 hover:text-white transition-colors">
                  Monetize
                </Link>
                <Link href="/advertise" className="text-gray-300 hover:text-white transition-colors">
                  Advertise
                </Link>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link href="/dashboard" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-center">
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              AI-Powered
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}Social Media{" "}
              </span>
              <span className="block sm:inline">Automation</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Grow your social media presence on autopilot. Campaign.ai manages your content, 
              engages with your audience, and analyzes competitors - all powered by advanced AI.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16 px-4">
            <Link href="/dashboard" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Start Free Trial
            </Link>
            <button className="border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto px-4">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">10,000+</div>
              <div className="text-gray-400">Accounts You Can Follow</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">Automated Engagement</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10 sm:col-span-2 md:col-span-1">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">AI-Powered</div>
              <div className="text-gray-400">Content Generation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Everything You Need to 
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}Dominate Social Media
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Our AI handles every aspect of your social media presence, from content creation to competitor analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Automated Posting */}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Smart Automated Posting</h3>
              <p className="text-gray-300 mb-6">
                Choose between fully automated posting or approval-based workflow. Get notifications 
                on WhatsApp or Telegram to approve content before it goes live.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">AI-generated content based on your training</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">WhatsApp & Telegram approval workflow</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Optimal timing for maximum engagement</span>
                </li>
              </ul>
            </div>

            {/* Engagement Automation */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-2-2V10a2 2 0 012-2h2m2-4h6a2 2 0 012 2v6a2 2 0 01-2 2h-6l-4 4V8a2 2 0 012-2z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Intelligent Engagement</h3>
              <p className="text-gray-300 mb-6">
                Follow up to 10,000 accounts and automatically engage with their content. 
                AI crafts intelligent replies designed to boost engagement and grow your following.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Follow and engage with 10,000+ accounts</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Intelligent replies to comments and DMs</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Targeted engagement for follower growth</span>
                </li>
              </ul>
            </div>

            {/* DM Management */}
            <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Automated DM Replies</h3>
              <p className="text-gray-300 mb-6">
                Never miss a message again. Our AI responds to direct messages intelligently, 
                maintaining your brand voice and handling customer inquiries 24/7.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">24/7 automated DM responses</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Maintains your brand voice</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Smart escalation for complex queries</span>
                </li>
              </ul>
            </div>

            {/* Competitor Analysis */}
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Competitor Intelligence</h3>
              <p className="text-gray-300 mb-6">
                Stay ahead of the competition with detailed reports on competitor activity. 
                Get insights delivered at your preferred frequency to inform your strategy.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Track unlimited competitor accounts</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Customizable reporting frequency</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Actionable insights and trends</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section id="pricing" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Simple, Transparent
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}Pricing
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Choose the perfect plan for your social media growth. All plans include our core AI features.
            </p>
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
