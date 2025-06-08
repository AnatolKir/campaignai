"use client";

import React from 'react';
import { ToastType } from './Toast';

interface NotificationCardProps {
  type: ToastType;
  title: string;
  message: string;
  onDismiss?: () => void;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  }>;
  className?: string;
}

const cardStyles = {
  info: {
    bg: 'bg-blue-500/10 border-blue-500/30',
    icon: 'ℹ️',
    iconColor: 'text-blue-400',
    titleColor: 'text-blue-300'
  },
  success: {
    bg: 'bg-green-500/10 border-green-500/30',
    icon: '✅',
    iconColor: 'text-green-400',
    titleColor: 'text-green-300'
  },
  warning: {
    bg: 'bg-yellow-500/10 border-yellow-500/30',
    icon: '⚠️',
    iconColor: 'text-yellow-400',
    titleColor: 'text-yellow-300'
  },
  error: {
    bg: 'bg-red-500/10 border-red-500/30',
    icon: '🚨',
    iconColor: 'text-red-400',
    titleColor: 'text-red-300'
  }
};

export function NotificationCard({ 
  type, 
  title, 
  message, 
  onDismiss, 
  actions = [],
  className = ''
}: NotificationCardProps) {
  const style = cardStyles[type];

  return (
    <div className={`${style.bg} backdrop-blur-lg border rounded-xl p-6 ${className}`}>
      <div className="flex items-start space-x-4">
        <span className={`${style.iconColor} text-2xl flex-shrink-0 mt-1`}>
          {style.icon}
        </span>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h4 className={`${style.titleColor} font-bold text-lg`}>
              {title}
            </h4>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded ml-4"
                aria-label="Dismiss notification"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          <p className="text-gray-300 mb-4 leading-relaxed">
            {message}
          </p>
          
          {actions.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-all
                    ${action.variant === 'primary' 
                      ? `bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white`
                      : `${style.iconColor} bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30`
                    }
                  `}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 