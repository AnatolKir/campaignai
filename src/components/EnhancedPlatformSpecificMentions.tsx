'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Platform, PLATFORM_LABELS } from '../utils/ai_platform_formatter';
import { HandleSearchResult } from '../types/handle-database';

// Original static mention database (fallback)
interface PlatformSpecificMention {
  name: string;
  handles: Partial<Record<Platform, string>>;
}

const MENTION_DATABASE: PlatformSpecificMention[] = [
  {
    name: 'Nike',
    handles: {
      instagram: 'nike',
      twitter_x: 'Nike',
      linkedin: 'nike',
      tiktok: 'nike',
      youtube: 'nike',
      threads: 'nike'
    }
  },
  {
    name: 'Apple',
    handles: {
      instagram: 'apple',
      twitter_x: 'Apple',
      linkedin: 'apple',
      tiktok: 'apple',
      youtube: 'Apple',
      threads: 'apple'
    }
  },
  {
    name: 'Tesla',
    handles: {
      instagram: 'teslamotors',
      twitter_x: 'Tesla',
      linkedin: 'tesla-motors',
      tiktok: 'tesla',
      youtube: 'tesla',
      threads: 'tesla'
    }
  }
];

interface EnhancedPlatformSpecificMentionsProps {
  selectedPlatforms: Platform[];
  onMentionsChange: (mentions: Partial<Record<Platform, string[]>>) => void;
  initialMentions?: Partial<Record<Platform, string[]>>;
}

export default function EnhancedPlatformSpecificMentions({
  selectedPlatforms,
  onMentionsChange,
  initialMentions = {}
}: EnhancedPlatformSpecificMentionsProps) {
  const [platformMentions, setPlatformMentions] = useState<Partial<Record<Platform, string[]>>>(initialMentions);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<HandleSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [editingMention, setEditingMention] = useState<{
    mention: string;
    handles: Partial<Record<Platform, string>>;
  } | null>(null);

  // Search internal handle database
  const searchHandleDatabase = useCallback(async (query: string): Promise<HandleSearchResult[]> => {
    if (!query || query.length < 2) return [];

    try {
      const response = await fetch(`/api/handle-search?q=${encodeURIComponent(query)}&limit=8`);
      if (!response.ok) return [];
      
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error searching handle database:', error);
      return [];
    }
  }, []);

  // Combined search: database + static fallback
  const performSearch = useCallback(async (query: string) => {
    setIsSearching(true);
    
    // Search internal database
    const databaseResults = await searchHandleDatabase(query);
    
    // Search static database as fallback
    const staticResults = MENTION_DATABASE
      .filter(mention => 
        mention.name.toLowerCase().includes(query.toLowerCase())
      )
      .map(mention => ({
        id: `static_${mention.name}`,
        brand_or_person_name: mention.name,
        platform: selectedPlatforms[0], // Just pick first platform for display
        handle: mention.handles[selectedPlatforms[0]] || '',
        verified: false,
        usage_count: 1,
        platforms: Object.keys(mention.handles) as Platform[],
        all_handles: mention.handles as Record<Platform, string>
      }));

    // Combine and deduplicate results
    const allResults = [...databaseResults, ...staticResults];
    const uniqueResults = allResults.filter((result, index, self) => 
      index === self.findIndex(r => r.brand_or_person_name === result.brand_or_person_name)
    );

    setSearchResults(uniqueResults);
    setIsSearching(false);
  }, [searchHandleDatabase, selectedPlatforms]);

  // Handle search input changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.length >= 2) {
        performSearch(searchQuery);
        setShowSuggestions(true);
      } else {
        setSearchResults([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, performSearch]);

  // Add mention from search result
  const addMentionFromResult = (result: HandleSearchResult) => {
    const newMentions = { ...platformMentions };
    
    selectedPlatforms.forEach(platform => {
      const handle = result.all_handles[platform];
      if (handle) {
        if (!newMentions[platform]) {
          newMentions[platform] = [];
        }
        if (!newMentions[platform]!.includes(`@${handle}`)) {
          newMentions[platform]!.push(`@${handle}`);
        }
      }
    });

    setPlatformMentions(newMentions);
    onMentionsChange(newMentions);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  // Add custom mention manually
  const addCustomMention = () => {
    if (!searchQuery.trim()) return;

    const mentionName = searchQuery.trim();
    const handles: Partial<Record<Platform, string>> = {};
    
    // Initialize with empty handles for selected platforms
    selectedPlatforms.forEach(platform => {
      handles[platform] = '';
    });

    setEditingMention({
      mention: mentionName,
      handles
    });
    setSearchQuery('');
    setShowSuggestions(false);
  };

  // Save custom mention
  const saveCustomMention = () => {
    if (!editingMention) return;

    const newMentions = { ...platformMentions };
    
    Object.entries(editingMention.handles).forEach(([platform, handle]) => {
      if (handle?.trim()) {
        const platformKey = platform as Platform;
        if (!newMentions[platformKey]) {
          newMentions[platformKey] = [];
        }
        const formattedHandle = handle.startsWith('@') ? handle : `@${handle}`;
        if (!newMentions[platformKey]!.includes(formattedHandle)) {
          newMentions[platformKey]!.push(formattedHandle);
        }
      }
    });

    setPlatformMentions(newMentions);
    onMentionsChange(newMentions);
    setEditingMention(null);
  };

  // Remove mention
  const removeMention = (platform: Platform, mention: string) => {
    const newMentions = { ...platformMentions };
    if (newMentions[platform]) {
      newMentions[platform] = newMentions[platform]!.filter(m => m !== mention);
      if (newMentions[platform]!.length === 0) {
        delete newMentions[platform];
      }
    }
    setPlatformMentions(newMentions);
    onMentionsChange(newMentions);
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for brands, influencers, or companies..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {isSearching && (
            <div className="absolute right-3 top-3.5">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showSuggestions && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => addMentionFromResult(result)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">
                        {result.brand_or_person_name || result.handle}
                        {result.verified && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        Available on: {result.platforms.map(p => PLATFORM_LABELS[p]).join(', ')}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {result.usage_count} submissions
                    </div>
                  </div>
                </button>
              ))
            ) : searchQuery.length >= 2 ? (
              <div className="px-4 py-3 text-gray-500">
                <div className="mb-2">No matches found in our database.</div>
                <button
                  onClick={addCustomMention}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Add "{searchQuery}" manually →
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Custom Mention Editor */}
      {editingMention && (
        <div className="p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">
              Set handles for "{editingMention.mention}"
            </h4>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingMention(null)}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={saveCustomMention}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedPlatforms.map(platform => (
              <div key={platform}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {PLATFORM_LABELS[platform]}
                </label>
                <input
                  type="text"
                  value={editingMention.handles[platform] || ''}
                  onChange={(e) => setEditingMention({
                    ...editingMention,
                    handles: {
                      ...editingMention.handles,
                      [platform]: e.target.value
                    }
                  })}
                  placeholder={`@handle_for_${platform}`}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Mentions by Platform */}
      {selectedPlatforms.map(platform => {
        const mentions = platformMentions[platform] || [];
        if (mentions.length === 0) return null;

        return (
          <div key={platform} className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">
              {PLATFORM_LABELS[platform]} Mentions
            </h4>
            <div className="flex flex-wrap gap-2">
              {mentions.map((mention, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded-full text-sm"
                >
                  {mention}
                  <button
                    onClick={() => removeMention(platform, mention)}
                    className="text-gray-400 hover:text-red-500 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        );
      })}

      {/* Help Text */}
      {selectedPlatforms.length > 0 && Object.keys(platformMentions).length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-lg mb-2">🎯</div>
          <p className="text-sm">
            Search for brands or influencers to mention in your posts.
            <br />
            Our database includes {searchResults.length > 0 ? 'verified' : 'popular'} handles across all platforms.
          </p>
        </div>
      )}
    </div>
  );
} 