"use client";

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        {/* Illustration */}
        <div className="text-8xl sm:text-9xl mb-8 opacity-60">
          🤖
        </div>
        
        {/* Error Code */}
        <div className="text-6xl sm:text-8xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          404
        </div>
        
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Our AI Agent Got Lost
        </h1>
        
        {/* Description */}
        <p className="text-gray-300 text-lg text-center mb-8 max-w-2xl">
          The page you're looking for doesn't exist. Let's get you back on track with your social media automation.
        </p>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/en/dashboard"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-center"
          >
            Return to Dashboard
          </Link>
          
          <Link 
            href="/en"
            className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white px-8 py-4 rounded-lg font-semibold transition-all text-center"
          >
            Go to Home
          </Link>
        </div>
        
        {/* Helpful Links */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Try these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/en/posts" className="text-purple-400 hover:text-purple-300 transition-colors">
              Posts
            </Link>
            <Link href="/en/analytics" className="text-purple-400 hover:text-purple-300 transition-colors">
              Analytics
            </Link>
            <Link href="/en/create-post" className="text-purple-400 hover:text-purple-300 transition-colors">
              Create Post
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 