"use client";

import React from 'react';
import { UnifiedNavigation } from '../components/UnifiedNavigation';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <UnifiedNavigation />
      
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6">
        {/* Illustration */}
        <div className="text-8xl sm:text-9xl mb-8 opacity-60">
          🤖💥
        </div>
        
        {/* Error Code */}
        <div className="text-6xl sm:text-8xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-4">
          500
        </div>
        
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          AI Agent Encountered an Error
        </h1>
        
        {/* Description */}
        <p className="text-gray-300 text-lg text-center mb-8 max-w-2xl">
          Oops! Something went wrong on our end. Our AI agents are working to fix this issue. 
          Please try again in a few moments.
        </p>
        
        {/* Development Error Details */}
        {isDevelopment && error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mb-8 max-w-2xl w-full">
            <h3 className="text-red-300 font-bold mb-2">Development Error Details:</h3>
            <p className="text-red-200 text-sm mb-2">{error.message}</p>
            {error.digest && (
              <p className="text-red-300 text-xs">Error ID: {error.digest}</p>
            )}
          </div>
        )}
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={reset}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Try Again
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white px-8 py-4 rounded-lg font-semibold transition-all"
          >
            Reload Page
          </button>
        </div>
        
        {/* Support Information */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            If this problem persists, please contact our support team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="mailto:support@campaign.ai" 
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              support@campaign.ai
            </a>
            <a 
              href="/dashboard" 
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Return to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 