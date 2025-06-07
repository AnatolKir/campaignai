'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  parseHandlesFromText, 
  parseHandlesFromCSV,
  validateHandle 
} from '../utils/handle-parser';
import { bulkImportHandles } from '../lib/handle-database';
import { 
  ParsedHandle, 
  BulkImportResult, 
  TargetAccountInput 
} from '../types/handle-database';
import { Platform, PLATFORM_LABELS } from '../utils/ai_platform_formatter';

interface TargetAccountsProps {
  userId: string;
  onImportComplete?: (result: BulkImportResult) => void;
}

export default function TargetAccounts({ userId, onImportComplete }: TargetAccountsProps) {
  const [activeTab, setActiveTab] = useState<'paste' | 'csv' | 'txt'>('paste');
  const [pasteInput, setPasteInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewHandles, setPreviewHandles] = useState<ParsedHandle[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [importResult, setImportResult] = useState<BulkImportResult | null>(null);

  // Handle file drop for CSV/TXT
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const content = await file.text();
    
    let parsedHandles: ParsedHandle[] = [];
    
    if (file.name.endsWith('.csv')) {
      parsedHandles = parseHandlesFromCSV(content);
      setActiveTab('csv');
    } else {
      parsedHandles = parseHandlesFromText(content);
      setActiveTab('txt');
    }

    setPreviewHandles(parsedHandles);
    setShowPreview(true);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'text/plain': ['.txt'],
    },
    multiple: false,
  });

  // Process pasted text
  const handlePasteProcess = () => {
    if (!pasteInput.trim()) return;
    
    const parsedHandles = parseHandlesFromText(pasteInput);
    setPreviewHandles(parsedHandles);
    setShowPreview(true);
  };

  // Import handles to database
  const handleImport = async () => {
    if (previewHandles.length === 0) return;

    setIsProcessing(true);
    try {
      const result = await bulkImportHandles(previewHandles, userId);
      setImportResult(result);
      onImportComplete?.(result);
      
      // Clear preview after successful import
      setPreviewHandles([]);
      setShowPreview(false);
      setPasteInput('');
    } catch (error) {
      console.error('Error importing handles:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Get platform icon/badge
  const getPlatformBadge = (platform: Platform) => {
    const colors: Record<Platform, string> = {
      instagram: 'bg-pink-100 text-pink-800',
      twitter_x: 'bg-black text-white',
      linkedin: 'bg-blue-100 text-blue-800',
      tiktok: 'bg-purple-100 text-purple-800',
      youtube: 'bg-red-100 text-red-800',
      reddit: 'bg-orange-100 text-orange-800',
      discord: 'bg-indigo-100 text-indigo-800',
      telegram: 'bg-sky-100 text-sky-800',
      whatsapp_business: 'bg-green-100 text-green-800',
      threads: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[platform]}`}>
        {PLATFORM_LABELS[platform]}
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Target Accounts</h2>
        <p className="text-gray-600">
          Add your target accounts to build Campaign.ai's internal handle database. 
          Supports Instagram, Twitter/X, LinkedIn, TikTok, YouTube, Reddit, Discord, Telegram, WhatsApp Business, and Threads.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'paste', label: 'Paste List', icon: '📝' },
          { key: 'csv', label: 'Upload CSV', icon: '📊' },
          { key: 'txt', label: 'Upload TXT', icon: '📄' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Paste Tab */}
      {activeTab === 'paste' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="paste-input" className="block text-sm font-medium text-gray-700 mb-2">
              Paste account handles or URLs (one per line)
            </label>
            <textarea
              id="paste-input"
              value={pasteInput}
              onChange={(e) => setPasteInput(e.target.value)}
              placeholder={`Nike - @nike
Apple, https://instagram.com/apple
Tesla | https://twitter.com/tesla
linkedin.com/company/microsoft
@spotify
tiktok.com/@netflix`}
              className="w-full h-48 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            />
          </div>
          <button
            onClick={handlePasteProcess}
            disabled={!pasteInput.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Preview Handles
          </button>
        </div>
      )}

      {/* File Upload Tabs */}
      {(activeTab === 'csv' || activeTab === 'txt') && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-2">
            <div className="text-4xl">
              {activeTab === 'csv' ? '📊' : '📄'}
            </div>
            <p className="text-lg font-medium text-gray-900">
              {isDragActive ? 'Drop your file here' : `Upload ${activeTab.toUpperCase()} file`}
            </p>
            <p className="text-sm text-gray-500">
              {activeTab === 'csv' 
                ? 'CSV format: Name, Handle/URL or Platform, Handle, Name'
                : 'TXT format: One handle/URL per line, optionally with brand names'
              }
            </p>
            <p className="text-xs text-gray-400">
              Click to browse or drag and drop your file here
            </p>
          </div>
        </div>
      )}

      {/* Preview Section */}
      {showPreview && previewHandles.length > 0 && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Preview ({previewHandles.length} handles found)
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPreview(false)}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={isProcessing}
                className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Importing...' : 'Import to Database'}
              </button>
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            <div className="grid gap-2">
              {previewHandles.map((handle, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                  <div className="flex items-center gap-3">
                    {getPlatformBadge(handle.platform)}
                    <span className="font-mono text-sm">@{handle.handle}</span>
                    {handle.brand_or_person_name && (
                      <span className="text-sm text-gray-600">({handle.brand_or_person_name})</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      handle.confidence === 'high' ? 'bg-green-100 text-green-800' :
                      handle.confidence === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {handle.confidence} confidence
                    </span>
                    {validateHandle(handle.handle, handle.platform) ? (
                      <span className="text-green-600 text-sm">✓</span>
                    ) : (
                      <span className="text-red-600 text-sm">⚠</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Import Result */}
      {importResult && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">Import Complete! 🎉</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Total Processed:</span>
              <div className="font-bold text-gray-900">{importResult.total_processed}</div>
            </div>
            <div>
              <span className="text-gray-600">New Records:</span>
              <div className="font-bold text-green-600">{importResult.new_records_created}</div>
            </div>
            <div>
              <span className="text-gray-600">Updated:</span>
              <div className="font-bold text-blue-600">{importResult.duplicates_updated}</div>
            </div>
            <div>
              <span className="text-gray-600">Failed:</span>
              <div className="font-bold text-red-600">{importResult.failed_imports}</div>
            </div>
          </div>
          
          {importResult.errors.length > 0 && (
            <details className="mt-3">
              <summary className="cursor-pointer text-sm text-red-600 hover:text-red-800">
                View Errors ({importResult.errors.length})
              </summary>
              <div className="mt-2 text-xs text-red-700 bg-red-50 p-2 rounded max-h-32 overflow-y-auto">
                {importResult.errors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </div>
            </details>
          )}
        </div>
      )}

      {/* Usage Guidelines */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">📚 Format Guidelines</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p><strong>Paste List:</strong> One handle/URL per line. Format: "Brand Name - @handle" or just "@handle"</p>
          <p><strong>CSV:</strong> Columns: Name, Handle/URL or Platform, Handle, Name</p>
          <p><strong>TXT:</strong> Same as paste list format</p>
          <p><strong>Supported:</strong> Instagram, Twitter/X, LinkedIn, TikTok, YouTube, Reddit, Discord, Telegram, WhatsApp Business, Threads</p>
        </div>
      </div>
    </div>
  );
} 