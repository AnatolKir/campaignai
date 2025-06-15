"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { UnifiedNavigation } from '../../../components/UnifiedNavigation';

interface PlatformData {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  isConnected: boolean;
  accountType: string;
  stats?: {
    followers: string;
    posts: string;
    engagement: string;
  };
  isBeta?: boolean;
}

const platformsData: PlatformData[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: "📷",
    bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    isConnected: true,
    accountType: "Business/Creator Required",
    stats: {
      followers: "8.7K",
      posts: "342",
      engagement: "6.8%"
    }
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "📘",
    bgColor: "bg-blue-600",
    isConnected: true,
    accountType: "Business Pages Required",
    stats: {
      followers: "15.2K",
      posts: "256",
      engagement: "5.4%"
    }
  },
  {
    id: "twitter",
    name: "X",
    icon: "𝕏",
    bgColor: "bg-black",
    isConnected: true,
    accountType: "All Account Types",
    stats: {
      followers: "12.3K",
      posts: "1,249",
      engagement: "4.2%"
    }
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "in",
    bgColor: "bg-blue-600",
    isConnected: true,
    accountType: "Company Pages Required",
    stats: {
      followers: "3.2K",
      posts: "89",
      engagement: "3.1%"
    }
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "🎵",
    bgColor: "bg-black",
    isConnected: false,
    accountType: "Business/Creator Required"
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "▶",
    bgColor: "bg-red-600",
    isConnected: false,
    accountType: "All Account Types"
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: "🤖",
    bgColor: "bg-orange-600",
    isConnected: false,
    accountType: "All Account Types"
  },
  {
    id: "discord",
    name: "Discord",
    icon: "💬",
    bgColor: "bg-indigo-600",
    isConnected: false,
    accountType: "Bot Integration"
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: "✈",
    bgColor: "bg-blue-500",
    isConnected: false,
    accountType: "Bot Integration"
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    icon: "📱",
    bgColor: "bg-green-600",
    isConnected: false,
    accountType: "Business Accounts Required"
  },
  {
    id: "threads",
    name: "Threads",
    icon: "@",
    bgColor: "bg-black",
    isConnected: false,
    accountType: "Beta - Limited API",
    isBeta: true
  }
];

export default function AccountsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [filter, setFilter] = useState<'all' | 'connected' | 'disconnected'>('all');
  const [platforms, setPlatforms] = useState<PlatformData[]>(platformsData);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  // Load saved order from localStorage on component mount
  useEffect(() => {
    const savedOrder = localStorage.getItem('platformOrder');
    if (savedOrder) {
      try {
        const orderArray = JSON.parse(savedOrder);
        const reorderedPlatforms = orderArray.map((id: string) => 
          platformsData.find(p => p.id === id)
        ).filter(Boolean);
        
        // Add any new platforms that weren't in the saved order
        const newPlatforms = platformsData.filter(p => 
          !orderArray.includes(p.id)
        );
        
        setPlatforms([...reorderedPlatforms, ...newPlatforms]);
      } catch (error) {
        console.error('Error loading platform order:', error);
        setPlatforms(platformsData);
      }
    }
  }, []);

  // Save order to localStorage whenever platforms array changes
  useEffect(() => {
    if (platforms.length > 0) {
      const orderArray = platforms.map(p => p.id);
      localStorage.setItem('platformOrder', JSON.stringify(orderArray));
    }
  }, [platforms]);

  const connectedPlatforms = platforms.filter(p => p.isConnected);
  const disconnectedPlatforms = platforms.filter(p => !p.isConnected);

  const getFilteredPlatforms = () => {
    switch (filter) {
      case 'connected':
        return connectedPlatforms;
      case 'disconnected':
        return disconnectedPlatforms;
      default:
        return platforms;
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, platformId: string) => {
    console.log('Drag started for:', platformId); // Debug log
    setDraggedItem(platformId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', platformId);
    
    // Add visual feedback
    if (e.target instanceof HTMLElement) {
      e.target.style.opacity = '0.5';
    }
    document.body.style.cursor = 'grabbing';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    console.log('Drag ended'); // Debug log
    setDraggedItem(null);
    document.body.style.cursor = '';
    
    // Reset visual feedback
    if (e.target instanceof HTMLElement) {
      e.target.style.opacity = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent, targetPlatformId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const draggedPlatformId = e.dataTransfer.getData('text/plain');
    
    if (!draggedPlatformId || draggedPlatformId === targetPlatformId) {
      setDraggedItem(null);
      return;
    }

    const newPlatforms = [...platforms];
    const draggedIndex = newPlatforms.findIndex(p => p.id === draggedPlatformId);
    const targetIndex = newPlatforms.findIndex(p => p.id === targetPlatformId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      // Remove the dragged item
      const [draggedPlatform] = newPlatforms.splice(draggedIndex, 1);
      // Insert it at the target position
      newPlatforms.splice(targetIndex, 0, draggedPlatform);
      setPlatforms(newPlatforms);
    }
    
    setDraggedItem(null);
    document.body.style.cursor = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <UnifiedNavigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Social Media Accounts</h1>
            <p className="text-gray-400 mt-2">
              Manage your connected social media platforms and AI automation settings
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  filter === 'all' ? 'bg-violet-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                All ({platformsData.length})
              </button>
              <button
                onClick={() => setFilter('connected')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  filter === 'connected' ? 'bg-green-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Connected ({connectedPlatforms.length})
              </button>
              <button
                onClick={() => setFilter('disconnected')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  filter === 'disconnected' ? 'bg-gray-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Available ({disconnectedPlatforms.length})
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Connected Platforms</p>
                <p className="text-2xl font-bold text-white">{connectedPlatforms.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <span className="text-green-400 text-xl">✓</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Followers</p>
                <p className="text-2xl font-bold text-white">24.2K</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <span className="text-blue-400 text-xl">👥</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Engagement</p>
                <p className="text-2xl font-bold text-white">4.7%</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <span className="text-purple-400 text-xl">📈</span>
              </div>
            </div>
          </div>
        </div>

        {/* Platforms Grid */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            💡 Tip: Click and drag any card to reorder them by priority. Click to open platform settings.
          </p>
          <button 
            onClick={() => {
              setPlatforms(platformsData);
              localStorage.removeItem('platformOrder');
            }}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Reset order
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredPlatforms().map((platform) => (
            <div
              key={platform.id}
              className={`group relative transition-all duration-300 cursor-grab active:cursor-grabbing select-none ${
                draggedItem === platform.id 
                  ? 'opacity-50 scale-95 z-50' 
                  : draggedItem 
                    ? 'opacity-70' 
                    : ''
              }`}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, platform.id)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, platform.id)}
              onDragEnter={handleDragEnter}
              onClick={(e) => {
                // Navigate to platform settings
                if (!draggedItem) {
                  window.location.href = `/${locale}/accounts/${platform.id}`;
                }
              }}
            >
              {/* Drag Indicator */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                <div className="bg-white/20 rounded-md p-1.5 backdrop-blur-sm">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                  </svg>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 relative">
                {/* Platform Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${platform.bgColor} rounded-xl flex items-center justify-center text-white text-xl font-bold`}>
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
                      <p className="text-gray-400 text-sm">{platform.accountType}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {platform.isBeta && (
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">
                        Beta
                      </span>
                    )}
                    <div className={`w-3 h-3 rounded-full ${
                      platform.isConnected ? 'bg-green-400' : 'bg-gray-400'
                    }`}></div>
                  </div>
                </div>

                {/* Platform Capabilities */}
                <div className="mb-4">
                  {platform.id === 'instagram' && (
                    <div className="space-y-1 text-xs text-gray-300">
                      <div>✅ Auto-post photos, videos, carousels, stories</div>
                      <div>✅ Schedule posts with advanced timing</div>
                      <div>✅ Analytics and engagement metrics</div>
                      <div>✅ Direct auto-posting (no Facebook Page needed)</div>
                      <div className="text-red-300">❌ Personal accounts no longer supported</div>
                    </div>
                  )}
                  {platform.id === 'facebook' && (
                    <div className="space-y-1 text-xs text-gray-300">
                      <div>✅ Auto-post text, images, videos, links</div>
                      <div>✅ Schedule posts and events</div>
                      <div>✅ Page insights and analytics</div>
                      <div>✅ Audience targeting and boosting</div>
                      <div className="text-red-300">❌ Personal profiles cannot be automated</div>
                      <div className="text-red-300">❌ Groups posting deprecated</div>
                    </div>
                  )}
                  {platform.id === 'twitter' && (
                    <div className="space-y-1 text-xs text-gray-300">
                      <div>✅ Auto-post tweets, threads, media</div>
                      <div>✅ Schedule posts and replies</div>
                      <div>✅ Analytics for all account types</div>
                      <div>✅ Personal and business accounts</div>
                      <div>✅ API access for verified accounts</div>
                    </div>
                  )}
                  {platform.id === 'linkedin' && (
                    <div className="space-y-1 text-xs text-gray-300">
                      <div>✅ Auto-post articles, updates, media</div>
                      <div>✅ Employee advocacy features</div>
                      <div>✅ Company analytics and insights</div>
                      <div className="text-yellow-300">⚠️ Personal profiles limited to basic posting</div>
                    </div>
                  )}
                  {platform.id === 'tiktok' && (
                    <div className="space-y-1 text-xs text-gray-300">
                      <div className="text-yellow-300">⚠️ Business/Creator accounts required</div>
                      <div>✅ Auto-upload videos with metadata</div>
                      <div>✅ Schedule video releases</div>
                      <div>✅ Analytics and performance tracking</div>
                    </div>
                  )}
                  {platform.id === 'youtube' && (
                    <div className="space-y-1 text-xs text-gray-300">
                      <div>✅ Auto-upload videos with metadata</div>
                      <div>✅ Schedule video releases</div>
                      <div>✅ Analytics and performance data</div>
                      <div>✅ Personal and brand channels</div>
                    </div>
                  )}
                  {platform.id === 'reddit' && (
                    <div className="space-y-1 text-xs text-gray-300">
                      <div>✅ Auto-post to subreddits</div>
                      <div>✅ Comment automation</div>
                      <div>✅ Upvote and engagement tracking</div>
                      <div className="text-yellow-300">⚠️ Subject to subreddit rules</div>
                    </div>
                  )}
                  {platform.id === 'discord' && (
                    <div className="space-y-1 text-xs text-gray-300">
                      <div>✅ Bot integration for servers</div>
                      <div>✅ Automated messaging and responses</div>
                      <div>✅ Event and announcement posting</div>
                      <div>✅ Custom command creation</div>
                    </div>
                  )}
                  {platform.id === 'telegram' && (
                    <div className="space-y-1 text-xs text-gray-300">
                      <div>✅ Bot integration for channels</div>
                      <div>✅ Automated messaging</div>
                      <div>✅ Broadcast to multiple channels</div>
                      <div>✅ File and media sharing</div>
                    </div>
                  )}
                  {platform.id === 'whatsapp' && (
                    <div className="space-y-1 text-xs text-gray-300">
                      <div>✅ Automated messaging and responses</div>
                      <div>✅ Broadcast lists and templates</div>
                      <div>✅ Business catalog integration</div>
                      <div className="text-red-300">❌ Personal WhatsApp not supported</div>
                    </div>
                  )}
                  {platform.id === 'threads' && (
                    <div className="space-y-1 text-xs text-gray-300">
                      <div className="text-yellow-300">⚠️ Limited API access (Beta)</div>
                      <div className="text-yellow-300">⚠️ Basic posting capabilities</div>
                      <div>🔄 Full integration coming soon</div>
                    </div>
                  )}
                </div>

                {/* Platform Stats */}
                {platform.isConnected && platform.stats && (
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{platform.stats.followers}</div>
                      <div className="text-gray-400 text-xs">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{platform.stats.posts}</div>
                      <div className="text-gray-400 text-xs">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{platform.stats.engagement}</div>
                      <div className="text-gray-400 text-xs">Engagement</div>
                    </div>
                  </div>
                )}

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    platform.isConnected
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {platform.isConnected ? 'Connected' : 'Available'}
                  </span>
                  
                  <span className="text-violet-400 text-sm group-hover:text-violet-300 transition-colors">
                    {platform.isConnected ? 'Manage →' : 'Connect →'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>




      </div>
    </div>
  );
} 