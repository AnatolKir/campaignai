'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Platform, PLATFORM_LABELS } from '../utils/ai_platform_formatter';
import { HandleSearchResult } from '../types/handle-database';
import { extractBrandFromHandle } from '../utils/brand-matcher';

interface BidirectionalHandleSearchProps {
  selectedPlatforms: Platform[];
  onMentionsChange: (mentions: Partial<Record<Platform, string[]>>) => void;
  initialMentions?: Partial<Record<Platform, string[]>>;
}

interface BrandSuggestion extends HandleSearchResult {
  isComplete: boolean; // Whether this is a complete brand match vs partial
  confidence: 'high' | 'medium' | 'low';
}

export default function BidirectionalHandleSearch({
  selectedPlatforms,
  onMentionsChange,
  initialMentions = {}
}: BidirectionalHandleSearchProps) {
  const [platformMentions, setPlatformMentions] = useState<Partial<Record<Platform, string[]>>>(initialMentions);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<BrandSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [searchMode, setSearchMode] = useState<'typing' | 'brand_complete'>('typing');
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Enhanced search that detects whether user is typing a handle or brand name
  const performBidirectionalSearch = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    
    try {
      const trimmedQuery = query.trim();
      const startsWithAt = trimmedQuery.startsWith('@');
      
      // Determine search strategy based on input pattern
      const searchPromises: Promise<any>[] = [];
      
      if (startsWithAt) {
        // Handle-first search: @elonm -> suggest "Elon Musk" + all platforms
        searchPromises.push(
          fetch(`/api/handle-search?q=${encodeURIComponent(trimmedQuery)}&mode=suggest&limit=5`)
            .then(res => res.json())
            .then(data => ({ type: 'handle_to_brand', ...data }))
        );
      }
      
      // Always do general search as fallback
      searchPromises.push(
        fetch(`/api/handle-search?q=${encodeURIComponent(trimmedQuery)}&mode=search&limit=8`)
          .then(res => res.json())
          .then(data => ({ type: 'general', ...data }))
      );

      const results = await Promise.all(searchPromises);
      
      // Process and combine results
      const combinedSuggestions: BrandSuggestion[] = [];
      
      for (const result of results) {
        if (result.results && Array.isArray(result.results)) {
          for (const item of result.results) {
            const suggestion: BrandSuggestion = {
              ...item,
              isComplete: result.type === 'handle_to_brand',
              confidence: result.type === 'handle_to_brand' ? 'high' : 
                         item.verified ? 'high' : 
                         item.platforms?.length > 2 ? 'medium' : 'low'
            };
            
            // Avoid duplicates
            if (!combinedSuggestions.find(s => 
              s.brand_or_person_name === suggestion.brand_or_person_name
            )) {
              combinedSuggestions.push(suggestion);
            }
          }
        }
      }

      // Sort suggestions by relevance
      combinedSuggestions.sort((a, b) => {
        // Prioritize complete brand matches from handle suggestions
        if (a.isComplete !== b.isComplete) return a.isComplete ? -1 : 1;
        
        // Then by confidence
        const confidenceScore = { high: 3, medium: 2, low: 1 };
        if (a.confidence !== b.confidence) {
          return confidenceScore[b.confidence] - confidenceScore[a.confidence];
        }
        
        // Then by verification status
        if (a.verified !== b.verified) return a.verified ? -1 : 1;
        
        // Finally by platform count
        return (b.platforms?.length || 0) - (a.platforms?.length || 0);
      });

      setSuggestions(combinedSuggestions.slice(0, 6));
      setSelectedSuggestionIndex(-1);
      
    } catch (error) {
      console.error('Error in bidirectional search:', error);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (searchQuery.length >= 2) {
        performBidirectionalSearch(searchQuery);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchQuery, performBidirectionalSearch]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          addMentionFromSuggestion(suggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  // Add mention from suggestion (bidirectional: adds to all relevant platforms)
  const addMentionFromSuggestion = (suggestion: BrandSuggestion) => {
    const newMentions = { ...platformMentions };
    
    selectedPlatforms.forEach(platform => {
      const handle = suggestion.all_handles?.[platform];
      if (handle) {
        if (!newMentions[platform]) {
          newMentions[platform] = [];
        }
        const formattedHandle = handle.startsWith('@') ? handle : `@${handle}`;
        if (!newMentions[platform]!.includes(formattedHandle)) {
          newMentions[platform]!.push(formattedHandle);
        }
      }
    });

    setPlatformMentions(newMentions);
    onMentionsChange(newMentions);
    setSearchQuery('');
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
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
      {/* Enhanced Search Input */}
      <div className="relative">
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type @elonm for Elon Musk, or search brands like 'Nike'..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
          />
          {isSearching && (
            <div className="absolute right-3 top-3.5">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            </div>
          )}
          {!isSearching && searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setShowSuggestions(false);
              }}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>

        {/* Smart Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.id}-${index}`}
                onClick={() => addMentionFromSuggestion(suggestion)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0 ${
                  index === selectedSuggestionIndex ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {suggestion.brand_or_person_name || extractBrandFromHandle(suggestion.handle)}
                      </span>
                      
                      {/* Confidence & Status Indicators */}
                      <div className="flex gap-1">
                        {suggestion.verified && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            ✓ Verified
                          </span>
                        )}
                        {suggestion.isComplete && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            🎯 Perfect Match
                          </span>
                        )}
                        {suggestion.confidence === 'high' && !suggestion.verified && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                            High Confidence
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 mt-1">
                      Available on: {suggestion.platforms?.map(p => PLATFORM_LABELS[p]).join(', ')}
                    </div>
                    
                    {/* Show actual handles for selected platforms */}
                    <div className="text-xs text-gray-500 mt-1">
                      {selectedPlatforms
                        .filter(platform => suggestion.all_handles?.[platform])
                        .map(platform => `${PLATFORM_LABELS[platform]}: @${suggestion.all_handles[platform]}`)
                        .join(' • ')
                      }
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400 ml-4">
                    {suggestion.usage_count} submission{suggestion.usage_count !== 1 ? 's' : ''}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* No Results State */}
        {showSuggestions && suggestions.length === 0 && searchQuery.length >= 2 && !isSearching && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
            <div className="px-4 py-3 text-gray-500">
              <div className="mb-2">
                No matches found for "{searchQuery}"
              </div>
              <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                Would you like to add this manually? →
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
        <div className="font-medium mb-1">💡 Smart Search Tips:</div>
        <ul className="space-y-1 text-xs">
          <li>• Type <code className="bg-white px-1 rounded">@elonm</code> to find "Elon Musk" across all platforms</li>
          <li>• Search brand names like <code className="bg-white px-1 rounded">Nike</code> to see all their handles</li>
          <li>• Use ↑↓ arrows to navigate, Enter to select, Esc to close</li>
        </ul>
      </div>

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
                    title="Remove mention"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        );
      })}

      {/* Empty State */}
      {selectedPlatforms.length > 0 && Object.keys(platformMentions).length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-3">🎯</div>
          <p className="text-lg font-medium mb-2">Smart Handle Discovery</p>
          <p className="text-sm">
            Our bidirectional search learns from crowdsourced data.
            <br />
            Start typing a handle or brand name to see intelligent suggestions.
          </p>
        </div>
      )}
    </div>
  );
} 