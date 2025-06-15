'use client';

import React, { useState } from 'react';
import { Platform, PLATFORM_LABELS } from '../../../utils/ai_platform_formatter';
import BidirectionalHandleSearch from '../../../components/BidirectionalHandleSearch';

export default function DemoHandleSearchPage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['instagram', 'twitter_x', 'linkedin']);
  const [mentions, setMentions] = useState<Partial<Record<Platform, string[]>>>({});

  const availablePlatforms: Platform[] = [
    'instagram', 'twitter_x', 'linkedin', 'tiktok', 'youtube', 'threads'
  ];

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🎯 Bidirectional Handle Search Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience our crowdsourced handle database that works both ways: 
            type "@elonm" to find "Elon Musk" across all platforms, or search brand names 
            to discover their handles everywhere.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl mb-3">🔄</div>
            <h3 className="font-semibold text-gray-900 mb-2">Bidirectional Search</h3>
            <p className="text-sm text-gray-600">
              Search from handle to brand (@elonm → Elon Musk) or brand to handles (Nike → @nike on all platforms)
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl mb-3">🚫</div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Deduplication</h3>
            <p className="text-sm text-gray-600">
              Advanced algorithms prevent having 150 Elon Musks by normalizing and merging similar entries
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl mb-3">👥</div>
            <h3 className="font-semibold text-gray-900 mb-2">Crowdsourced Data</h3>
            <p className="text-sm text-gray-600">
              Database grows from user submissions and gets smarter with verification and usage tracking
            </p>
          </div>
        </div>

        {/* Platform Selection */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">Select Platforms</h2>
          <div className="flex flex-wrap gap-3">
            {availablePlatforms.map(platform => (
              <button
                key={platform}
                onClick={() => togglePlatform(platform)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  selectedPlatforms.includes(platform)
                    ? 'bg-blue-100 border-blue-300 text-blue-800'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {PLATFORM_LABELS[platform]}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Selected platforms: {selectedPlatforms.length > 0 
              ? selectedPlatforms.map(p => PLATFORM_LABELS[p]).join(', ')
              : 'None'}
          </p>
        </div>

        {/* Main Search Component */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">Smart Handle Search</h2>
          <BidirectionalHandleSearch
            selectedPlatforms={selectedPlatforms}
            onMentionsChange={setMentions}
            initialMentions={mentions}
          />
        </div>

        {/* Test Examples */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">Try These Examples</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Handle → Brand Search</h3>
              <div className="space-y-2">
                <div className="bg-gray-50 p-3 rounded border-l-4 border-blue-400">
                  <code className="text-sm font-mono">@elonm</code>
                  <p className="text-xs text-gray-600 mt-1">Should suggest "Elon Musk" with all platform handles</p>
                </div>
                <div className="bg-gray-50 p-3 rounded border-l-4 border-blue-400">
                  <code className="text-sm font-mono">@nike</code>
                  <p className="text-xs text-gray-600 mt-1">Should suggest "Nike" across all platforms</p>
                </div>
                <div className="bg-gray-50 p-3 rounded border-l-4 border-blue-400">
                  <code className="text-sm font-mono">@apple</code>
                  <p className="text-xs text-gray-600 mt-1">Should find Apple's official accounts</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Brand → Handle Search</h3>
              <div className="space-y-2">
                <div className="bg-gray-50 p-3 rounded border-l-4 border-green-400">
                  <code className="text-sm font-mono">Tesla</code>
                  <p className="text-xs text-gray-600 mt-1">Should show @tesla, @teslamotors, etc.</p>
                </div>
                <div className="bg-gray-50 p-3 rounded border-l-4 border-green-400">
                  <code className="text-sm font-mono">Microsoft</code>
                  <p className="text-xs text-gray-600 mt-1">Should display all Microsoft platform handles</p>
                </div>
                <div className="bg-gray-50 p-3 rounded border-l-4 border-green-400">
                  <code className="text-sm font-mono">Spotify</code>
                  <p className="text-xs text-gray-600 mt-1">Should find Spotify across platforms</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current State Debug */}
        {Object.keys(mentions).length > 0 && (
          <div className="bg-gray-100 p-6 rounded-lg border">
            <h2 className="font-semibold text-gray-900 mb-4">Current Mentions State</h2>
            <pre className="text-sm bg-white p-4 rounded border overflow-x-auto">
              {JSON.stringify(mentions, null, 2)}
            </pre>
          </div>
        )}

        {/* Technical Details */}
        <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="font-semibold text-blue-900 mb-4">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Smart Deduplication</h3>
              <ul className="space-y-1 text-blue-700">
                <li>• Brand name normalization (removes Inc, Corp, etc.)</li>
                <li>• Levenshtein distance similarity matching</li>
                <li>• Jaccard similarity for word-based matching</li>
                <li>• Automatic merging of similar entries</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Bidirectional Search</h3>
              <ul className="space-y-1 text-blue-700">
                <li>• Handle-to-brand suggestions (@elonm → Elon Musk)</li>
                <li>• Brand-to-handle discovery (Nike → all platforms)</li>
                <li>• Cross-platform handle mapping</li>
                <li>• Confidence scoring and verification</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 