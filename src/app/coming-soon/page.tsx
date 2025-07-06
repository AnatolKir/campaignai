'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showFloatingElements, setShowFloatingElements] = useState(false);

  useEffect(() => {
    // Trigger floating elements animation after component mounts
    setTimeout(() => setShowFloatingElements(true), 500);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          consented_to_marketing: true 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage(data.message || `Success! You're #${data.signupOrder} on the waitlist!`);
        setEmail('');
        
        // Track successful signup
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'signup', {
            event_category: 'engagement',
            event_label: 'early_access_waitlist',
            value: data.signupOrder
          });
        }
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Failed to connect. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl transition-all duration-1000 ${showFloatingElements ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
        <div className={`absolute top-40 right-20 w-32 h-32 bg-pink-500/20 rounded-full blur-xl transition-all duration-1000 delay-300 ${showFloatingElements ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
        <div className={`absolute bottom-20 left-20 w-24 h-24 bg-blue-500/20 rounded-full blur-xl transition-all duration-1000 delay-500 ${showFloatingElements ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
        <div className={`absolute bottom-40 right-10 w-16 h-16 bg-green-500/20 rounded-full blur-xl transition-all duration-1000 delay-700 ${showFloatingElements ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-4xl w-full text-center">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <Image 
              src="/logo.png" 
              alt="Campaign AI" 
              width={220} 
              height={66}
              className="mx-auto transition-transform duration-300 hover:scale-105"
            />
          </div>
          
          {/* Hero Content */}
          <div className="mb-12 animate-fade-in-delay">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Your AI-Powered
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Social Media Manager
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join 2,500+ brands using AI to create viral content, engage audiences, and grow followers 24/7 across all platforms.
            </p>
          </div>

          {/* Social Proof Stats */}
          <div className="mb-12 animate-fade-in-delay-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">2,500+</div>
                <div className="text-sm text-gray-400">Active Brands</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">50M+</div>
                <div className="text-sm text-gray-400">Posts Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">300%</div>
                <div className="text-sm text-gray-400">Avg Growth</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-gray-400">AI Automation</div>
              </div>
            </div>
          </div>

          {/* Main Signup Form */}
          {!isSuccess ? (
            <div className="mb-12 animate-fade-in-delay-3">
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your business email"
                      required
                      className="flex-1 px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Joining...
                        </span>
                      ) : (
                        'Get Early Access'
                      )}
                    </button>
                  </div>
                  
                  {/* Limited Time Offer */}
                  <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-yellow-500/30">
                    <p className="text-yellow-200 font-semibold mb-1">
                      🎉 Early Bird Special
                    </p>
                    <p className="text-sm text-yellow-100">
                      First 1,000 users get 6 months free + priority support
                    </p>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="mb-12 animate-fade-in">
              <div className="max-w-lg mx-auto">
                <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/40 rounded-2xl p-8 shadow-2xl">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-green-400 mb-2">
                      Welcome to the Future! 🚀
                    </h3>
                    <p className="text-green-200 text-lg">{message}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="text-white text-sm">
                        <strong>What's Next?</strong> We'll email you exclusive updates, beta access, and your personal onboarding link.
                      </p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setMessage('');
                      }}
                      className="w-full px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-medium transition-all duration-200 border border-white/30"
                    >
                      Add Another Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {message && !isSuccess && (
            <div className="mb-8 animate-fade-in">
              <div className="max-w-lg mx-auto">
                <div className="bg-red-500/20 border border-red-500/40 rounded-xl p-4">
                  <p className="text-red-300">{message}</p>
                </div>
              </div>
            </div>
          )}

          {/* Feature Highlights */}
          <div className="mb-16 animate-fade-in-delay-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purple-500/40">
                  <svg className="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AI Content Creation</h3>
                <p className="text-gray-400">Generate viral posts, stories, and reels that match your brand voice perfectly</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/40">
                  <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Smart Engagement</h3>
                <p className="text-gray-400">Automatically respond to comments and DMs with intelligent, personalized replies</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/30 to-yellow-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-green-500/40">
                  <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Growth Analytics</h3>
                <p className="text-gray-400">Track performance and optimize your strategy with AI-powered insights</p>
              </div>
            </div>
          </div>

          {/* Customer Testimonials */}
          <div className="mb-16 animate-fade-in-delay-5">
            <h2 className="text-3xl font-bold text-white mb-8">Join Industry Leaders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-semibold">Sarah Chen</p>
                    <p className="text-gray-400 text-sm">Marketing Director</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  "Campaign AI increased our engagement by 400% and saved us 20 hours per week. The AI content is indistinguishable from human-created posts."
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-semibold">Marcus Rodriguez</p>
                    <p className="text-gray-400 text-sm">CEO, TechStart</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  "From 500 to 50K followers in 6 months. The AI understands our brand voice perfectly and creates content that converts."
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                    J
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-semibold">Jessica Park</p>
                    <p className="text-gray-400 text-sm">Brand Manager</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  "The ROI is incredible. We're generating 10x more leads from social media with half the effort. Game-changer!"
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center animate-fade-in-delay-6">
            <div className="flex items-center justify-center space-x-6 mb-6">
              <Link href="/en/dashboard" className="text-gray-400 hover:text-gray-300 transition-colors text-sm">
                Team Login →
              </Link>
              <span className="text-gray-500">|</span>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors text-sm">
                Privacy Policy
              </a>
              <span className="text-gray-500">|</span>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors text-sm">
                Terms of Service
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 Campaign AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}