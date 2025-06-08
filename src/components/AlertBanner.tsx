"use client";

import React from 'react';
import { ToastType } from './Toast';

interface AlertBannerProps {
  type: ToastType;
  message: string;
  onDismiss?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const bannerStyles = {
  info: {
    bg: 'bg-blue-600/90',
    icon: 'ℹ️',
    textColor: 'text-blue-50'
  },
  success: {
    bg: 'bg-green-600/90',
    icon: '✅',
    textColor: 'text-green-50'
  },
  warning: {
    bg: 'bg-yellow-600/90',
    icon: '⚠️',
    textColor: 'text-yellow-50'
  },
  error: {
    bg: 'bg-red-600/90',
    icon: '🚨',
    textColor: 'text-red-50'
  }
};

export function AlertBanner({ 
  type, 
  message, 
  onDismiss, 
  action,
  className = ''
}: AlertBannerProps) {
  const style = bannerStyles[type];

  return (
    <div className={`${style.bg} backdrop-blur-lg ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-lg flex-shrink-0">
              {style.icon}
            </span>
            <p className={`${style.textColor} text-sm font-medium`}>
              {message}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {action && (
              <button
                onClick={action.onClick}
                className={`${style.textColor} hover:opacity-80 text-sm font-medium underline transition-opacity`}
              >
                {action.label}
              </button>
            )}
            
            {onDismiss && (
              <button
                onClick={onDismiss}
                className={`${style.textColor} hover:opacity-80 transition-opacity p-1`}
                aria-label="Dismiss alert"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 