"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { TimezoneOption } from '../types/create-post';
import { TIMEZONE_REGIONS, POPULAR_TIMEZONES, getCurrentOffset, getTimezoneInfo } from '../utils/timezones';

interface TimezoneSelectorProps {
  value: string;
  onChange: (timezone: string) => void;
  className?: string;
}

export function TimezoneSelector({ value, onChange, className = '' }: TimezoneSelectorProps) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTimezones, setFilteredTimezones] = useState(TIMEZONE_REGIONS);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selectedTimezone = getTimezoneInfo(value);

  // Filter timezones based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTimezones(TIMEZONE_REGIONS);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = TIMEZONE_REGIONS.map(region => ({
      ...region,
      timezones: region.timezones.filter(tz => 
        tz.label.toLowerCase().includes(searchLower) ||
        tz.city.toLowerCase().includes(searchLower) ||
        tz.country.toLowerCase().includes(searchLower) ||
        tz.offset.toLowerCase().includes(searchLower)
      )
    })).filter(region => region.timezones.length > 0);

    setFilteredTimezones(filtered);
  }, [searchTerm]);

  // Handle clicking outside dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSelect = (timezone: TimezoneOption) => {
    onChange(timezone.value);
    setIsOpen(false);
    setSearchTerm('');
  };

  const getCurrentTime = (timezoneValue: string) => {
    try {
      return new Date().toLocaleTimeString('en-US', {
        timeZone: timezoneValue,
        hour12: true,
        hour: 'numeric',
        minute: '2-digit'
      });
    } catch (error) {
      return '';
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selected Timezone Display */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <span className="text-lg">🌍</span>
          <div className="text-left">
            <div className="font-medium">
              {selectedTimezone?.label || t('dropdowns.select_timezone')}
            </div>
            {selectedTimezone && (
              <div className="text-sm text-gray-300">
                {selectedTimezone.city}, {selectedTimezone.country} • {getCurrentTime(selectedTimezone.value)}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {selectedTimezone && (
            <span className="text-sm text-gray-400">{getCurrentOffset(selectedTimezone.value)}</span>
          )}
          <svg
            className={`w-5 h-5 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-white/20 rounded-lg shadow-2xl max-h-96 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-white/10">
            <input
              ref={searchRef}
              type="text"
              placeholder={t('dropdowns.search_timezones')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Timezone List */}
          <div className="overflow-y-auto max-h-80">
            {filteredTimezones.map((region) => (
              <div key={region.name}>
                <div className="px-3 py-2 text-xs font-semibold text-gray-400 bg-gray-700/50 sticky top-0">
                  {region.name}
                </div>
                {region.timezones.map((timezone) => (
                  <button
                    key={timezone.value}
                    onClick={() => handleSelect(timezone)}
                    className="w-full px-3 py-2 text-left hover:bg-white/10 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex-1">
                      <div className="text-white font-medium">{timezone.label}</div>
                      <div className="text-sm text-gray-400">
                        {timezone.city}, {timezone.country}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 group-hover:text-white">
                      {getCurrentTime(timezone.value)}
                    </div>
                  </button>
                ))}
              </div>
            ))}
            
            {filteredTimezones.length === 0 && (
              <div className="px-3 py-8 text-center text-gray-400">
                {t('messages.no_results_found')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function getRegionIcon(regionName: string): string {
  const icons: Record<string, string> = {
    'North America': '🇺🇸',
    'Europe': '🇪🇺',
    'Asia Pacific': '🌏',
    'South America': '🇧🇷',
    'Africa & Middle East': '🌍'
  };
  return icons[regionName] || '🌍';
}