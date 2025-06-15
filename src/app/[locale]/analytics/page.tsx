"use client";

import { useTranslations } from 'next-intl';
import { UnifiedNavigation } from '@/components/UnifiedNavigation';

export default function Analytics() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <UnifiedNavigation />
      
      <div className="p-4 sm:p-6 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Analytics
            </h1>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl">
              Performance insights and metrics for your social media presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Engagement Rate */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">📊</span>
                <h3 className="text-lg font-semibold text-white">Engagement Rate</h3>
              </div>
              <div className="text-3xl font-bold text-purple-400 mb-2">4.2%</div>
              <p className="text-green-400 text-sm">+0.8% from last week</p>
            </div>

            {/* Total Reach */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">👥</span>
                <h3 className="text-lg font-semibold text-white">Total Reach</h3>
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-2">12.5K</div>
              <p className="text-green-400 text-sm">+2.1K from last week</p>
            </div>

            {/* Follower Growth */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">📈</span>
                <h3 className="text-lg font-semibold text-white">Follower Growth</h3>
              </div>
              <div className="text-3xl font-bold text-green-400 mb-2">+247</div>
              <p className="text-green-400 text-sm">+15% from last week</p>
            </div>

            {/* Content Score */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">⭐</span>
                <h3 className="text-lg font-semibold text-white">Content Score</h3>
              </div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">8.7/10</div>
              <p className="text-green-400 text-sm">+0.3 from last week</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Performance Overview</h2>
              <div className="h-64 flex items-center justify-center border border-white/10 rounded-lg">
                <p className="text-gray-400">Chart visualization would go here</p>
              </div>
            </div>

            {/* Top Performing Posts */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Top Performing Posts</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">AI-powered content strategy tips</p>
                    <p className="text-gray-400 text-sm">2 days ago</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">1.2K likes</p>
                    <p className="text-gray-400 text-sm">5.8% engagement</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Social media automation guide</p>
                    <p className="text-gray-400 text-sm">4 days ago</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">987 likes</p>
                    <p className="text-gray-400 text-sm">4.2% engagement</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Behind the scenes: AI training</p>
                    <p className="text-gray-400 text-sm">1 week ago</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">756 likes</p>
                    <p className="text-gray-400 text-sm">3.9% engagement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 