"use client";

import React from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        {/* Illustration */}
        <div className="text-8xl sm:text-9xl mb-8 opacity-60">
          ⚠️
        </div>
        
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Something went wrong!
        </h1>
        
        {/* Description */}
        <p className="text-gray-300 text-lg text-center mb-8 max-w-2xl">
          Our AI agents encountered an unexpected error. Don't worry, we're on it!
        </p>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={reset}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Try Again
          </button>
          
          <a
            href="/en"
            className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white px-8 py-4 rounded-lg font-semibold transition-all text-center"
          >
            Go to Home
          </a>
        </div>
        
        {/* Error Details (for development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg max-w-2xl w-full">
            <h3 className="text-red-300 font-semibold mb-2">Error Details:</h3>
            <p className="text-red-200 text-sm font-mono">{error.message}</p>
            {error.digest && (
              <p className="text-red-200 text-xs mt-2">Digest: {error.digest}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 