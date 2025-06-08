"use client";

import React, { useEffect, useState } from 'react';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

interface ToastProps {
  type: ToastType;
  title?: string;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const toastStyles = {
  info: {
    bg: 'bg-blue-500/20 border-blue-500/30',
    icon: 'ℹ️',
    iconColor: 'text-blue-400',
    titleColor: 'text-blue-300'
  },
  success: {
    bg: 'bg-green-500/20 border-green-500/30',
    icon: '✅',
    iconColor: 'text-green-400',
    titleColor: 'text-green-300'
  },
  warning: {
    bg: 'bg-yellow-500/20 border-yellow-500/30',
    icon: '⚠️',
    iconColor: 'text-yellow-400',
    titleColor: 'text-yellow-300'
  },
  error: {
    bg: 'bg-red-500/20 border-red-500/30',
    icon: '🚨',
    iconColor: 'text-red-400',
    titleColor: 'text-red-300'
  }
};

export function Toast({ 
  type, 
  title, 
  message, 
  isVisible, 
  onClose, 
  duration = 5000,
  action 
}: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);
  const style = toastStyles[type];

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 300); // Animation duration
    }, duration);

    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  if (!isVisible && !isExiting) return null;

  return (
    <div 
      className={`
        fixed top-4 right-4 md:bottom-4 md:top-auto md:right-4 z-[1000] 
        transition-all duration-300 ease-in-out transform
        ${isExiting ? 'opacity-0 translate-x-full scale-95' : 'opacity-100 translate-x-0 scale-100'}
      `}
    >
      <div className={`
        ${style.bg} backdrop-blur-lg border rounded-xl p-4 shadow-2xl max-w-sm
        animate-in slide-in-from-right duration-300
      `}>
        <div className="flex items-start space-x-3">
          <span className={`${style.iconColor} text-lg flex-shrink-0 mt-0.5`}>
            {style.icon}
          </span>
          
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className={`${style.titleColor} font-semibold text-sm mb-1`}>
                {title}
              </h4>
            )}
            <p className="text-gray-300 text-sm">
              {message}
            </p>
            
            {action && (
              <button
                onClick={action.onClick}
                className={`${style.iconColor} hover:opacity-80 text-sm font-medium underline mt-2 transition-opacity`}
              >
                {action.label}
              </button>
            )}
          </div>
          
          <button
            onClick={() => {
              setIsExiting(true);
              setTimeout(onClose, 300);
            }}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
            aria-label="Close notification"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 