'use client';

import React from 'react';
// import TargetAccounts from '../../../components/TargetAccounts';
import Link from 'next/link';

export default function TargetAccountsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                Campaign.ai
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/posts" className="text-gray-600 hover:text-gray-900">
                Posts
              </Link>
              <Link href="/create-post" className="text-gray-600 hover:text-gray-900">
                Create Post
              </Link>
              <Link href="/target-accounts" className="text-blue-600 font-medium">
                Target Accounts
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold leading-7 text-gray-900 sm:text-4xl sm:truncate">
                Target Accounts
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Build Campaign.ai's handle database by adding your target accounts. 
                This data helps improve our mention suggestions and competitor tracking features.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Target Accounts Management</h2>
          <p className="text-gray-600 mb-6">
            This page is currently being restored. The full target accounts functionality will be available shortly.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              <strong>Coming Soon:</strong> Upload CSV files, paste account lists, and manage your target accounts database.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Better Mention Suggestions
            </h3>
            <p className="text-gray-600">
              Your submitted handles help improve our AI's ability to suggest relevant mentions when creating posts across platforms.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Competitor Tracking
            </h3>
            <p className="text-gray-600">
              Build a comprehensive database of competitor accounts and influencers in your industry for better market intelligence.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Cross-Platform Insights
            </h3>
            <p className="text-gray-600">
              Discover how brands maintain consistent messaging and handle formats across different social media platforms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 