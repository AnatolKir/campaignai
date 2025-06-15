"use client";

import { useState } from "react";
import { useBrand } from '../../../contexts/BrandContext';
import { useTranslations } from 'next-intl';
import { UnifiedNavigation } from '../../../components/UnifiedNavigation';

export default function Dashboard() {
  const t = useTranslations();
  const { currentBrand, isLoading } = useBrand();
  const [activeView, setActiveView] = useState("overview");
  const [timeRange, setTimeRange] = useState("7d");

  const views = [
    { id: 'intelligence_overview', name: t('dashboard.views.intelligence_overview'), icon: '🧠' },
    { id: 'performance_deep_dive', name: t('dashboard.views.performance_deep_dive'), icon: '📊' },
    { id: 'audience_intelligence', name: t('dashboard.views.audience_intelligence'), icon: '👥' },
    { id: 'content_intelligence', name: t('dashboard.views.content_intelligence'), icon: '📝' },
    { id: 'competitive_intelligence', name: t('dashboard.views.competitive_intelligence'), icon: '🔍' },
    { id: 'ai_predictions', name: t('dashboard.views.ai_predictions'), icon: '🔮' }
  ];

  const timeRanges = [
    { value: 'last_24_hours', label: t('last_24_hours') },
    { value: 'last_7_days', label: t('last_7_days') },
    { value: 'last_30_days', label: t('last_30_days') },
    { value: 'last_90_days', label: t('last_90_days') }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-300">{t('loading_intelligence_dashboard')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <UnifiedNavigation />
      
      {/* Full Width Intelligence Dashboard */}
      <div className="p-4 sm:p-6 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Header with Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 sm:mb-8 space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                {t('intelligence_dashboard')}
              </h1>
              <p className="text-gray-300 text-base sm:text-lg md:text-xl">
                {t('ai_powered_insights', { brand: currentBrand?.name || t('your_brand') })}
                {currentBrand && (
                  <span className="ml-3 px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full text-xs sm:text-sm">
                    @{currentBrand.handle || currentBrand.name}
                  </span>
                )}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Time Range Selector */}
              <div className="flex items-center space-x-3">
                <label className="text-gray-300 font-medium">{t('time_range')}:</label>
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-lg"
                >
                  {timeRanges.map((range) => (
                    <option key={range.value} value={range.value} className="bg-slate-800">
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Selector */}
              <div className="flex items-center space-x-2">
                {views.map((view) => (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                      activeView === view.id
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    <span>{view.icon}</span>
                    <span className="hidden lg:inline">{view.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Agent Status Banner */}
          <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/30 to-green-900/30 border border-green-500/30 rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-xl sm:text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{t('ai_agent_status')}</h3>
                  <p className="text-green-300 text-sm sm:text-base">{t('currently_learning')}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center w-full lg:w-auto">
                <div>
                  <p className="text-green-400 text-lg sm:text-2xl font-bold">🟢 {t('active')}</p>
                  <p className="text-gray-300 text-xs sm:text-sm">{t('status')}</p>
                </div>
                <div>
                  <p className="text-white text-lg sm:text-2xl font-bold">1,247</p>
                  <p className="text-gray-300 text-xs sm:text-sm">{t('actions_today')}</p>
                </div>
                <div>
                  <p className="text-green-400 text-lg sm:text-2xl font-bold">94.8%</p>
                  <p className="text-gray-300 text-xs sm:text-sm">{t('success_rate')}</p>
                </div>
                <div>
                  <p className="text-blue-400 text-lg sm:text-2xl font-bold">{t('learning')}</p>
                  <p className="text-gray-300 text-xs sm:text-sm">{t('audience_patterns')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Overview View */}
          {activeView === "overview" && (
            <div className="space-y-8">
              
              {/* Key Performance Indicators - Expanded Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">{t('engagement_score')}</p>
                      <p className="text-4xl font-bold text-white">94.8</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">💯</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-green-400">↗ +12.4%</span>
                    <span className="text-gray-300 ml-2">{t('vs_last', { timeRange })}</span>
                  </div>
                  <div className="bg-white/5 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '94.8%'}}></div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">{t('total_reach')}</p>
                      <p className="text-4xl font-bold text-white">2.4M</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">📈</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-blue-400">↗ +847K</span>
                    <span className="text-gray-300 ml-2">{t('organic_growth')}</span>
                  </div>
                  <div className="text-xs text-gray-400">{t('ai_timing_optimization')}</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-pink-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">{t('content_score')}</p>
                      <p className="text-4xl font-bold text-white">8.4</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">⭐</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-pink-400">{t('ai_rated')}</span>
                    <span className="text-gray-300 ml-2">{t('vs_avg')}</span>
                  </div>
                  <div className="text-xs text-gray-400">{t('top_5_percent')}</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-yellow-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">{t('revenue_impact')}</p>
                      <p className="text-4xl font-bold text-white">$156K</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">💰</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-yellow-400">↗ +$47K</span>
                    <span className="text-gray-300 ml-2">{t('attributed_revenue')}</span>
                  </div>
                  <div className="text-xs text-gray-400">{t('ai_conversion_tracking')}</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">{t('follower_growth')}</p>
                      <p className="text-4xl font-bold text-white">+2.8K</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">👥</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-cyan-400">↗ +847</span>
                    <span className="text-gray-300 ml-2">{t('this_week')}</span>
                  </div>
                  <div className="text-xs text-gray-400">{t('organic_followers_only')}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 