"use client";

import React from 'react';

export interface ActivityItem {
  id: string;
  type: 'post' | 'engagement' | 'system' | 'user' | 'ai_action' | 'error' | 'success';
  title: string;
  description: string;
  timestamp: Date;
  user?: string;
  metadata?: {
    platform?: string;
    postId?: string;
    url?: string;
    metrics?: Record<string, any>;
  };
}

interface ActivityItemProps {
  activity: ActivityItem;
  showUser?: boolean;
}

function ActivityItem({ activity, showUser = true }: ActivityItemProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'post': return '📝';
      case 'engagement': return '💬';
      case 'system': return '⚙️';
      case 'user': return '👤';
      case 'ai_action': return '🤖';
      case 'error': return '🚨';
      case 'success': return '✅';
      default: return 'ℹ️';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'post': return 'text-blue-400';
      case 'engagement': return 'text-green-400';
      case 'system': return 'text-gray-400';
      case 'user': return 'text-purple-400';
      case 'ai_action': return 'text-pink-400';
      case 'error': return 'text-red-400';
      case 'success': return 'text-green-400';
      default: return 'text-blue-400';
    }
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex items-start space-x-4 p-4 hover:bg-white/5 transition-colors rounded-lg">
      <div className={`${getActivityColor(activity.type)} text-xl flex-shrink-0 mt-1`}>
        {getActivityIcon(activity.type)}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-medium text-sm">
              {activity.title}
            </h4>
            <p className="text-gray-400 text-sm mt-1">
              {activity.description}
            </p>
            
            {/* Metadata */}
            {activity.metadata && (
              <div className="flex flex-wrap gap-2 mt-2">
                {activity.metadata.platform && (
                  <span className="bg-white/10 text-gray-300 px-2 py-1 rounded text-xs">
                    {activity.metadata.platform}
                  </span>
                )}
                {activity.metadata.metrics && Object.entries(activity.metadata.metrics).map(([key, value]) => (
                  <span key={key} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">
                    {key}: {value}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-end ml-4">
            <span className="text-gray-500 text-xs">
              {formatRelativeTime(activity.timestamp)}
            </span>
            {showUser && activity.user && (
              <span className="text-gray-400 text-xs mt-1">
                {activity.user}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  title?: string;
  showUser?: boolean;
  maxHeight?: string;
  emptyMessage?: string;
  className?: string;
  onActivityClick?: (activity: ActivityItem) => void;
}

export function ActivityFeed({ 
  activities, 
  title = "Activity Feed",
  showUser = true,
  maxHeight = "400px",
  emptyMessage = "No recent activity",
  className = '',
  onActivityClick 
}: ActivityFeedProps) {
  if (activities.length === 0) {
    return (
      <div className={`bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-2 opacity-60">📋</div>
          <p className="text-gray-400">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 ${className}`}>
      <div className="px-6 py-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      
      <div 
        className="overflow-y-auto divide-y divide-white/5"
        style={{ maxHeight }}
      >
        {activities.map((activity) => (
          <div
            key={activity.id}
            onClick={() => onActivityClick?.(activity)}
            className={onActivityClick ? 'cursor-pointer' : ''}
          >
            <ActivityItem 
              activity={activity} 
              showUser={showUser} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Utility functions for creating common activity items
export const createActivityItem = {
  post: (title: string, platform: string, postId?: string): Omit<ActivityItem, 'id' | 'timestamp'> => ({
    type: 'post',
    title,
    description: `Posted to ${platform}`,
    metadata: { platform, postId }
  }),

  engagement: (title: string, platform: string, metrics: Record<string, any>): Omit<ActivityItem, 'id' | 'timestamp'> => ({
    type: 'engagement',
    title,
    description: `Engagement activity on ${platform}`,
    metadata: { platform, metrics }
  }),

  aiAction: (title: string, description: string): Omit<ActivityItem, 'id' | 'timestamp'> => ({
    type: 'ai_action',
    title,
    description
  }),

  systemEvent: (title: string, description: string): Omit<ActivityItem, 'id' | 'timestamp'> => ({
    type: 'system',
    title,
    description
  }),

  error: (title: string, description: string): Omit<ActivityItem, 'id' | 'timestamp'> => ({
    type: 'error',
    title,
    description
  }),

  success: (title: string, description: string): Omit<ActivityItem, 'id' | 'timestamp'> => ({
    type: 'success',
    title,
    description
  })
}; 