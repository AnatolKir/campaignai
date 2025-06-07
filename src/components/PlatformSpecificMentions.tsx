"use client";

import React, { useState, useEffect, useRef } from 'react';
import { PlatformSpecificMention, MentionSuggestion } from '../types/create-post';
import { Platform, getPlatformInfo, SUPPORTED_PLATFORMS } from '../utils/ai_platform_formatter';
import { 
  searchMentions, 
  convertToPlatformSpecificMention,
  getMentionWarnings,
  suggestHandlesForMissingPlatforms 
} from '../utils/platform-mentions';

interface PlatformSpecificMentionsProps {
  mentions: PlatformSpecificMention[];
  selectedPlatforms: Platform[];
  onChange: (mentions: PlatformSpecificMention[]) => void;
}

export function PlatformSpecificMentions({ mentions, selectedPlatforms, onChange }: PlatformSpecificMentionsProps) {
  const [mentionInput, setMentionInput] = useState('');
  const [suggestions, setSuggestions] = useState<MentionSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [editingMention, setEditingMention] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Search for mentions when input changes
  useEffect(() => {
    if (mentionInput.trim().length > 0) {
      const results = searchMentions(mentionInput);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [mentionInput]);

  // Handle clicking outside suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addMentionFromSuggestion = (suggestion: MentionSuggestion) => {
    const newMention = convertToPlatformSpecificMention(suggestion);
    onChange([...mentions, newMention]);
    setMentionInput('');
    setShowSuggestions(false);
  };

  const addCustomMention = () => {
    if (!mentionInput.trim()) return;

    const customMention: PlatformSpecificMention = {
      id: `custom-${Date.now()}`,
      displayName: mentionInput,
      handles: {},
      type: 'person'
    };

    // Auto-suggest handles for all platforms
    const suggestions = suggestHandlesForMissingPlatforms(customMention);
    customMention.handles = suggestions;

    onChange([...mentions, customMention]);
    setMentionInput('');
    setShowSuggestions(false);
    
    // Automatically start editing the newly added mention
    setEditingMention(customMention.id);
  };

  const removeMention = (mentionId: string) => {
    onChange(mentions.filter(m => m.id !== mentionId));
  };

  const updateMentionHandle = (mentionId: string, platform: Platform, handle: string) => {
    const updatedMentions = mentions.map(mention => 
      mention.id === mentionId 
        ? { ...mention, handles: { ...mention.handles, [platform]: handle } }
        : mention
    );
    onChange(updatedMentions);
  };

  const getMentionTypeIcon = (type: 'person' | 'company' | 'brand') => {
    switch (type) {
      case 'person': return '👤';
      case 'company': return '🏢';
      case 'brand': return '🏷️';
      default: return '👤';
    }
  };

  const getHandlePlaceholder = (platform: Platform) => {
    switch (platform) {
      case 'reddit':
        return 'u/username';
      case 'discord':
      case 'whatsapp_business':
        return 'Display name';
      case 'linkedin':
        return '@company-name or @firstname-lastname';
      default:
        return '@username';
    }
  };

  return (
    <div className="space-y-4">
      {/* Mention Input with Autocomplete */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Mentions
        </label>
        
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={mentionInput}
              onChange={(e) => setMentionInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !showSuggestions && (e.preventDefault(), addCustomMention())}
              placeholder="Search popular brands/people or type any name to add manually..."
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            
            {/* Autocomplete Suggestions */}
            {showSuggestions && (
              <div 
                ref={suggestionsRef}
                className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-600 rounded-lg mt-1 max-h-60 overflow-y-auto z-10 shadow-xl"
              >
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      onClick={() => addMentionFromSuggestion(suggestion)}
                      className="px-4 py-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getMentionTypeIcon(suggestion.type)}</span>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-white">{suggestion.displayName}</span>
                            {suggestion.verified && (
                              <span className="text-blue-400 text-sm">✓</span>
                            )}
                            <span className="text-xs text-gray-400 capitalize">({suggestion.type})</span>
                          </div>
                          <p className="text-sm text-gray-400 truncate">{suggestion.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500">
                              {suggestion.followerCount?.toLocaleString()} followers
                            </span>
                            <div className="flex space-x-1">
                              {Object.entries(suggestion.handles).slice(0, 3).map(([platform, handle]) => {
                                const info = getPlatformInfo(platform as Platform);
                                return (
                                  <span key={platform} className="text-xs" title={`${info.name}: ${handle}`}>
                                    {info.icon}
                                  </span>
                                );
                              })}
                              {Object.keys(suggestion.handles).length > 3 && (
                                <span className="text-xs text-gray-500">+{Object.keys(suggestion.handles).length - 3}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  mentionInput.trim().length > 0 && (
                    <div className="px-4 py-3">
                      <div className="text-center">
                        <div className="text-2xl mb-2">✏️</div>
                        <p className="text-gray-300 text-sm mb-2">No matches found in our database</p>
                        <button
                          onClick={addCustomMention}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Add "{mentionInput}" manually
                        </button>
                        <p className="text-xs text-gray-400 mt-2">
                          You'll be able to set platform handles after adding
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
          
          <button
            type="button"
            onClick={addCustomMention}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Existing Mentions */}
      {mentions.length > 0 && (
        <div className="space-y-4">
          {mentions.map((mention) => {
            const warnings = getMentionWarnings(mention, selectedPlatforms);
            
            return (
              <div key={mention.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{getMentionTypeIcon(mention.type)}</span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-white">{mention.displayName}</h4>
                        {mention.verified && (
                          <span className="text-blue-400 text-sm">✓</span>
                        )}
                        <span className="text-xs text-gray-400 capitalize">({mention.type})</span>
                      </div>
                      {mention.notes && (
                        <p className="text-sm text-gray-400">{mention.notes}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setEditingMention(editingMention === mention.id ? null : mention.id)}
                      className="text-xs bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
                    >
                      {editingMention === mention.id ? 'Done' : 'Edit Handles'}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeMention(mention.id)}
                      className="text-red-400 hover:text-red-200 font-bold"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Warnings */}
                {warnings.length > 0 && (
                  <div className="mb-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <h5 className="text-sm font-medium text-yellow-400 mb-1">⚠️ Missing Handles:</h5>
                    <ul className="text-sm text-yellow-300 space-y-1">
                      {warnings.map((warning, index) => (
                        <li key={index}>• {warning}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Platform Handles - Show all platforms when editing, selected platforms when viewing */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {(editingMention === mention.id ? SUPPORTED_PLATFORMS : selectedPlatforms).map((platform) => {
                    const info = getPlatformInfo(platform);
                    const handle = mention.handles[platform] || '';
                    const hasHandle = Boolean(handle);
                    const isSelectedPlatform = selectedPlatforms.includes(platform);
                    
                    return (
                      <div key={platform} className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{info.icon}</span>
                          <span className={`text-sm ${isSelectedPlatform ? 'text-white font-medium' : 'text-gray-400'}`}>
                            {info.name}
                          </span>
                          {editingMention !== mention.id && !hasHandle && isSelectedPlatform && (
                            <span className="text-xs text-red-400">Missing</span>
                          )}
                          {editingMention !== mention.id && !isSelectedPlatform && hasHandle && (
                            <span className="text-xs text-blue-400">Available</span>
                          )}
                        </div>
                        
                        {editingMention === mention.id ? (
                          <input
                            type="text"
                            value={handle}
                            onChange={(e) => updateMentionHandle(mention.id, platform, e.target.value)}
                            placeholder={getHandlePlaceholder(platform)}
                            className="w-full bg-white/10 border border-white/20 rounded px-3 py-1 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        ) : (
                          <div className={`text-sm px-3 py-1 rounded border ${
                            hasHandle 
                              ? isSelectedPlatform 
                                ? 'bg-green-500/10 border-green-500/20 text-green-300' 
                                : 'bg-blue-500/10 border-blue-500/20 text-blue-300'
                              : isSelectedPlatform
                              ? 'bg-red-500/10 border-red-500/20 text-red-300'
                              : 'bg-gray-500/10 border-gray-500/20 text-gray-400'
                          }`}>
                            {handle || 'Not specified'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Notes */}
                {editingMention === mention.id && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400">
                        💡 <strong>Tip:</strong> Set handles for all platforms now - you can use them in future posts even if not selected today.
                      </p>
                      <p className="text-xs text-gray-400">
                        📝 <strong>Handle formats vary:</strong> Twitter uses @username, Reddit uses u/username, LinkedIn can use company names.
                      </p>
                      <p className="text-xs text-gray-400">
                        🔍 <strong>Can't find someone?</strong> Leave fields blank for platforms where they don't exist.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Help Text */}
      {mentions.length === 0 && (
        <div className="text-center py-6 border-2 border-dashed border-white/10 rounded-lg">
          <div className="text-4xl mb-2">👥</div>
          <p className="text-gray-400 text-sm mb-3">
            Add mentions to tag people or brands in your posts.<br/>
            We'll automatically format them correctly for each platform.
          </p>
          <div className="text-xs text-gray-500 space-y-1">
            <p>🔍 <strong>Search</strong> for popular brands and public figures</p>
            <p>✏️ <strong>Type any name</strong> to add custom mentions manually</p>
            <p>🌐 <strong>Set platform handles</strong> for accurate tagging</p>
          </div>
        </div>
      )}

      {/* Instructions for using mentions */}
      {mentions.length > 0 && (
        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-xs text-blue-300">
            💡 <strong>Pro tip:</strong> Click "Edit Handles" to set usernames for all platforms. 
            Handles you set now will be saved for future posts, even for platforms not selected today.
          </p>
        </div>
      )}
    </div>
  );
} 