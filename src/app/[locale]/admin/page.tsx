"use client";

import { useState, useEffect } from 'react';
import { UnifiedNavigation } from '../../../components/UnifiedNavigation';

interface APIKey {
  id: string;
  provider: 'openai' | 'anthropic' | 'google' | 'azure';
  name: string;
  key: string;
  isActive: boolean;
  createdAt: string;
}

interface TranslationJob {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  totalFiles: number;
  completedFiles: number;
  startedAt: string;
  completedAt?: string;
  error?: string;
  currentLanguage?: string;
  totalKeys?: number;
  processedKeys?: number;
  errors?: string[];
  rateLimitHits?: number;
  apiCallsCount?: number;
  currentFile?: string;
  currentKey?: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'keys' | 'translations' | 'settings'>('keys');
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [translationJobs, setTranslationJobs] = useState<TranslationJob[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load data on component mount and set up polling
  useEffect(() => {
    loadAPIKeys();
    loadTranslationJobs();
    
    // TEMPORARILY DISABLED: Poll for translation job updates every 3 seconds
    // const interval = setInterval(() => {
    //   loadTranslationJobs();
    // }, 3000);
    
    // return () => clearInterval(interval);
  }, []);

  const loadAPIKeys = async () => {
    try {
      const response = await fetch('/api/admin/api-keys');
      if (response.ok) {
        const keys = await response.json();
        setApiKeys(keys);
      }
    } catch (error) {
      console.error('Failed to load API keys:', error);
    }
  };

  const loadTranslationJobs = async () => {
    try {
      const response = await fetch('/api/admin/translation-jobs');
      if (response.ok) {
        const jobs = await response.json();
        setTranslationJobs(jobs);
      }
    } catch (error) {
      console.error('Failed to load translation jobs:', error);
    }
  };

  const startTranslation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/translate-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const job = await response.json();
        setTranslationJobs(prev => [job, ...prev]);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start translation');
      }
    } catch (error) {
      console.error('Translation failed:', error);
      alert(`Failed to start translation: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Find the most recent running job (not just the first one)
  const runningJob = translationJobs
    .filter(job => job.status === 'running')
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <UnifiedNavigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">Manage API keys, translations, and system settings</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8">
          {[
            { id: 'keys', label: 'API Keys', icon: '🔑' },
            { id: 'translations', label: 'Translations', icon: '🌍' },
            { id: 'settings', label: 'Settings', icon: '⚙️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* API Keys Tab */}
        {activeTab === 'keys' && (
          <APIKeysSection 
            apiKeys={apiKeys} 
            onKeysUpdate={loadAPIKeys}
          />
        )}

        {/* Translations Tab */}
        {activeTab === 'translations' && (
          <TranslationsSection 
            translationJobs={translationJobs}
            onStartTranslation={startTranslation}
            isLoading={isLoading}
          />
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <SettingsSection />
        )}
      </div>
    </div>
  );
}

// API Keys Section Component
function APIKeysSection({ apiKeys, onKeysUpdate }: { 
  apiKeys: APIKey[], 
  onKeysUpdate: () => void 
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newKey, setNewKey] = useState({
    provider: 'openai' as const,
    name: '',
    key: ''
  });

  const addAPIKey = async () => {
    try {
      const response = await fetch('/api/admin/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newKey),
      });

      if (response.ok) {
        setNewKey({ provider: 'openai', name: '', key: '' });
        setShowAddForm(false);
        onKeysUpdate();
      }
    } catch (error) {
      console.error('Failed to add API key:', error);
    }
  };

  const toggleKeyStatus = async (keyId: string) => {
    try {
      const response = await fetch(`/api/admin/api-keys/${keyId}/toggle`, {
        method: 'POST',
      });

      if (response.ok) {
        onKeysUpdate();
      }
    } catch (error) {
      console.error('Failed to toggle API key:', error);
    }
  };

  const deleteAPIKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to delete this API key?')) return;
    
    try {
      const response = await fetch(`/api/admin/api-keys/${keyId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onKeysUpdate();
      }
    } catch (error) {
      console.error('Failed to delete API key:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">API Key Management</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          + Add API Key
        </button>
      </div>

      {/* Add API Key Form */}
      {showAddForm && (
        <div className="bg-slate-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Add New API Key</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Provider</label>
              <select
                value={newKey.provider}
                onChange={(e) => setNewKey(prev => ({ ...prev, provider: e.target.value as any }))}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
              >
                <option value="openai">OpenAI</option>
                <option value="anthropic">Anthropic</option>
                <option value="google">Google</option>
                <option value="azure">Azure</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={newKey.name}
                onChange={(e) => setNewKey(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Main Translation Key"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">API Key</label>
              <input
                type="password"
                value={newKey.key}
                onChange={(e) => setNewKey(prev => ({ ...prev, key: e.target.value }))}
                placeholder="sk-..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={addAPIKey}
              disabled={!newKey.name || !newKey.key}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Add Key
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* API Keys List */}
      <div className="space-y-3">
        {apiKeys.map((key) => (
          <div key={key.id} className="bg-slate-800 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${key.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
              <div>
                <div className="font-medium">{key.name}</div>
                <div className="text-sm text-gray-400">
                  {key.provider.toUpperCase()} • {key.key.substring(0, 8)}...
                </div>
                <div className="text-xs text-gray-500">
                  Added {new Date(key.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => toggleKeyStatus(key.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  key.isActive 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {key.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button
                onClick={() => deleteAPIKey(key.id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {apiKeys.length === 0 && (
          <div className="bg-slate-800 p-8 rounded-lg text-center">
            <p className="text-gray-400">No API keys configured yet.</p>
            <p className="text-sm text-gray-500 mt-2">Add an API key to enable automatic translations.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Translations Section Component
function TranslationsSection({ 
  translationJobs, 
  onStartTranslation, 
  isLoading 
}: { 
  translationJobs: TranslationJob[], 
  onStartTranslation: () => void,
  isLoading: boolean
}) {
  // Find the most recent running job (not just the first one)
  const runningJob = translationJobs
    .filter(job => job.status === 'running')
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())[0];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Translation Management</h2>
        <div className="flex space-x-3">
          <button
            onClick={onStartTranslation}
            disabled={isLoading || !!runningJob}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Starting...</span>
              </>
            ) : runningJob ? (
              <>
                <span>🔄</span>
                <span>Translation Running</span>
              </>
            ) : (
              <>
                <span>🌍</span>
                <span>Translate All Pages Now</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Active Translation Status */}
      {runningJob && (
        <div className="bg-blue-900/50 border border-blue-600 p-6 rounded-lg space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
              <span>Translation in Progress</span>
            </h3>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-400">
                {runningJob.progress}%
              </div>
              <div className="text-xs text-gray-400">Overall Progress</div>
            </div>
          </div>
          
          {/* Language-Level Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium text-blue-300">Language Progress</h4>
              <div className="text-sm text-gray-300">
                {runningJob.completedFiles} of {runningJob.totalFiles} languages completed
              </div>
            </div>
            
            <div className="w-full bg-slate-700 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500 ease-out flex items-center justify-center"
                style={{ width: `${Math.max(5, (runningJob.completedFiles / runningJob.totalFiles) * 100)}%` }}
              >
                {runningJob.completedFiles > 0 && (
                  <span className="text-xs font-medium text-white px-2">
                    {runningJob.completedFiles}/{runningJob.totalFiles}
                  </span>
                )}
              </div>
            </div>
            
            {runningJob.currentLanguage && (
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-400">Currently processing:</span>
                <span className="bg-blue-600 px-2 py-1 rounded text-blue-100 font-medium">
                  {runningJob.currentLanguage.toUpperCase()}
                </span>
                <div className="animate-pulse">
                  <span className="text-blue-400">●</span>
                </div>
              </div>
            )}
          </div>
          
          {/* File/Element Progress (Detailed) */}
          {runningJob.totalKeys && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium text-purple-300">File & Element Progress</h4>
                <div className="text-sm text-gray-300">
                  {runningJob.processedKeys || 0} of {runningJob.totalKeys} elements translated
                </div>
              </div>
              
              <div className="w-full bg-slate-700 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-300 ease-out flex items-center justify-center"
                  style={{ width: `${Math.max(2, ((runningJob.processedKeys || 0) / runningJob.totalKeys) * 100)}%` }}
                >
                  {(runningJob.processedKeys || 0) > 0 && (
                    <span className="text-xs font-medium text-white px-2">
                      {Math.round(((runningJob.processedKeys || 0) / runningJob.totalKeys) * 100)}%
                    </span>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="bg-slate-800/50 p-2 rounded">
                  <div className="text-gray-400 text-xs">Elements Done</div>
                  <div className="font-semibold text-purple-300">
                    {runningJob.processedKeys || 0}
                  </div>
                </div>
                <div className="bg-slate-800/50 p-2 rounded">
                  <div className="text-gray-400 text-xs">Total Elements</div>
                  <div className="font-semibold text-purple-300">
                    {runningJob.totalKeys}
                  </div>
                </div>
                <div className="bg-slate-800/50 p-2 rounded">
                  <div className="flex items-center space-x-2">
                    <div>
                      <div className="text-gray-400 text-xs">API Calls</div>
                      <div className="font-semibold text-blue-300">
                        {runningJob.apiCallsCount || 0}
                      </div>
                    </div>
                    <div className="relative group">
                      <div className="tooltip-trigger tooltip-trigger-blue">
                        <span className="tooltip-icon tooltip-icon-blue">?</span>
                      </div>
                      <div className="tooltip-content">
                        <div className="space-y-2">
                          <div className="tooltip-header tooltip-header-blue">
                            <span className="tooltip-dot tooltip-dot-blue"></span>
                            <span>API Calls: {runningJob.apiCallsCount || 0}</span>
                          </div>
                          <div className="tooltip-text">Low numbers are good! The system batches translations efficiently to minimize API costs and avoid rate limits.</div>
                        </div>
                        <div className="tooltip-arrow"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800/50 p-2 rounded">
                  <div className="flex items-center space-x-2">
                    <div>
                      <div className="text-gray-400 text-xs">Rate Limits</div>
                      <div className="font-semibold text-yellow-300">
                        {runningJob.rateLimitHits || 0}
                      </div>
                    </div>
                    <div className="relative group">
                      <div className="tooltip-trigger tooltip-trigger-green">
                        <span className="tooltip-icon tooltip-icon-green">?</span>
                      </div>
                      <div className="tooltip-content">
                        <div className="space-y-2">
                          <div className="tooltip-header tooltip-header-green">
                            <span className="tooltip-dot tooltip-dot-green"></span>
                            <span>Rate Limit Hits: {runningJob.rateLimitHits || 0}</span>
                          </div>
                          <div className="tooltip-text">Zero is perfect! This means no API rate limiting issues. The system paces requests at 2-second intervals to stay within limits.</div>
                        </div>
                        <div className="tooltip-arrow"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {runningJob.currentFile && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-400">Current file:</span>
                    <span className="bg-purple-600 px-2 py-1 rounded text-purple-100 font-mono text-xs">
                      {runningJob.currentFile}
                    </span>
                    <div className="animate-pulse">
                      <span className="text-purple-400">●</span>
                    </div>
                  </div>
                  
                  {runningJob.currentKey && (
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-400">Translating:</span>
                      <span className="bg-pink-600 px-2 py-1 rounded text-pink-100 font-mono text-xs max-w-md truncate">
                        {runningJob.currentKey}
                      </span>
                      <div className="relative group">
                        <div className="tooltip-trigger tooltip-trigger-purple">
                          <span className="tooltip-icon tooltip-icon-purple">?</span>
                        </div>
                        <div className="tooltip-content">
                          <div className="space-y-2">
                            <div className="tooltip-header tooltip-header-purple">
                              <span className="tooltip-dot tooltip-dot-purple"></span>
                              <span>Current Translation Key</span>
                            </div>
                            <div className="tooltip-text">This shows the specific UI element or page content currently being translated. Keys like "dashboard.title" represent the dashboard page title.</div>
                          </div>
                          <div className="tooltip-arrow"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Detailed Progress Information */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-gray-800/50 p-3 rounded">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">API Calls:</span>
                <span className="text-white font-mono">{runningJob.apiCallsCount || 0}</span>
                <div className="relative group">
                  <div className="tooltip-trigger tooltip-trigger-blue">
                    <span className="tooltip-icon tooltip-icon-blue">?</span>
                  </div>
                  <div className="tooltip-content">
                    <div className="space-y-2">
                      <div className="tooltip-header tooltip-header-blue">
                        <span className="tooltip-dot tooltip-dot-blue"></span>
                        <span>API Calls: {runningJob.apiCallsCount || 0}</span>
                      </div>
                      <div className="tooltip-text">Low numbers are good! The system batches translations efficiently to minimize API costs and avoid rate limits.</div>
                    </div>
                    <div className="tooltip-arrow"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-3 rounded">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Rate Limits:</span>
                <span className="text-white font-mono">{runningJob.rateLimitHits || 0}</span>
                <div className="relative group">
                  <div className="tooltip-trigger tooltip-trigger-green">
                    <span className="tooltip-icon tooltip-icon-green">?</span>
                  </div>
                  <div className="tooltip-content">
                    <div className="space-y-2">
                      <div className="tooltip-header tooltip-header-green">
                        <span className="tooltip-dot tooltip-dot-green"></span>
                        <span>Rate Limit Hits: {runningJob.rateLimitHits || 0}</span>
                      </div>
                      <div className="tooltip-text">Zero is perfect! This means no API rate limiting issues. The system paces requests at 2-second intervals to stay within limits.</div>
                    </div>
                    <div className="tooltip-arrow"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-3 rounded">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Current File:</span>
                <span className="text-white font-mono text-xs">{runningJob.currentFile || 'Processing...'}</span>
                <div className="relative group">
                  <div className="tooltip-trigger tooltip-trigger-purple">
                    <span className="tooltip-icon tooltip-icon-purple">?</span>
                  </div>
                  <div className="tooltip-content">
                    <div className="space-y-2">
                      <div className="tooltip-header tooltip-header-purple">
                        <span className="tooltip-dot tooltip-dot-purple"></span>
                        <span>Current File: {runningJob.currentFile || 'Processing...'}</span>
                      </div>
                      <div className="tooltip-text">Shows which language file is currently being translated. Each file contains all the text for one language.</div>
                    </div>
                    <div className="tooltip-arrow"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-3 rounded">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Errors:</span>
                <span className={`font-mono ${(runningJob.errors?.length || 0) > 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {runningJob.errors?.length || 0}
                </span>
                <div className="relative group">
                  <div className={`tooltip-trigger ${(runningJob.errors?.length || 0) > 0 ? 'tooltip-trigger-red' : 'tooltip-trigger-green'}`}>
                    <span className={`tooltip-icon ${(runningJob.errors?.length || 0) > 0 ? 'tooltip-icon-red' : 'tooltip-icon-green'}`}>?</span>
                  </div>
                  <div className="tooltip-content">
                    <div className="space-y-2">
                      <div className={`tooltip-header ${(runningJob.errors?.length || 0) > 0 ? 'tooltip-header-red' : 'tooltip-header-green'}`}>
                        <span className={`tooltip-dot ${(runningJob.errors?.length || 0) > 0 ? 'tooltip-dot-red' : 'tooltip-dot-green'}`}></span>
                        <span>Errors: {runningJob.errors?.length || 0}</span>
                      </div>
                      <div className="tooltip-text">{(runningJob.errors?.length || 0) === 0 
                        ? 'Excellent! No errors encountered during translation.' 
                        : 'Some translation errors occurred. Check the error log below for details.'
                      }</div>
                    </div>
                    <div className="tooltip-arrow"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Status Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-slate-800/50 p-3 rounded">
              <div className="text-gray-400">Overall Status</div>
              <div className="text-lg font-semibold capitalize text-blue-300">
                {runningJob.status}
              </div>
              <div className="text-xs text-gray-500">
                Started {new Date(runningJob.startedAt).toLocaleTimeString()}
              </div>
            </div>
            
            <div className="bg-slate-800/50 p-3 rounded">
              <div className="text-gray-400">Performance</div>
              <div className="text-lg font-semibold text-green-300">
                {runningJob.rateLimitHits && runningJob.rateLimitHits > 0 ? 'Throttled' : 'Normal'}
              </div>
              <div className="text-xs text-gray-500">
                {runningJob.rateLimitHits && runningJob.rateLimitHits > 0 
                  ? `${runningJob.rateLimitHits} rate limit hits` 
                  : 'No rate limiting'
                }
              </div>
            </div>
            
            <div className="bg-slate-800/50 p-3 rounded">
              <div className="text-gray-400">Quality</div>
              <div className="text-lg font-semibold text-purple-300">
                GPT-4
              </div>
              <div className="text-xs text-gray-500">
                Context-aware prompts
              </div>
            </div>
          </div>
          
          {/* Rate Limiting Info */}
          {runningJob.rateLimitHits && runningJob.rateLimitHits > 0 && (
            <div className="p-3 bg-yellow-900/50 border border-yellow-600 rounded">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">⚠️</span>
                <span className="text-sm">
                  Rate limiting detected ({runningJob.rateLimitHits} hits) - automatically slowing down requests to prevent failures
                </span>
              </div>
            </div>
          )}
          
          {/* Errors */}
          {runningJob.errors && runningJob.errors.length > 0 && (
            <div className="p-3 bg-red-900/50 border border-red-600 rounded">
              <div className="text-red-400 font-medium mb-2">Recent Errors:</div>
              <div className="space-y-1 text-sm">
                {runningJob.errors.slice(-3).map((error, index) => (
                  <div key={index} className="text-red-300">• {error}</div>
                ))}
                {runningJob.errors.length > 3 && (
                  <div className="text-red-400 text-xs">
                    ... and {runningJob.errors.length - 3} more errors
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Translation Info */}
      <div className="bg-slate-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Automatic Translation System</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Supported Languages (12 total)</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <div>🇺🇸 English (en) - Source</div>
              <div>🇪🇸 Spanish (es)</div>
              <div>🇫🇷 French (fr)</div>
              <div>🇩🇪 German (de)</div>
              <div>🇮🇹 Italian (it)</div>
              <div>🇵🇹 Portuguese (pt)</div>
              <div>🇧🇷 Portuguese Brazil (br)</div>
              <div>🇯🇵 Japanese (ja)</div>
              <div>🇰🇷 Korean (ko)</div>
              <div>🇨🇳 Chinese (zh)</div>
              <div>🇸🇦 Arabic (ar)</div>
              <div>🇮🇳 Hindi (hi)</div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Features</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <div>✅ Automatic page scanning</div>
              <div>✅ Context-aware translations</div>
              <div>✅ Preserves existing translations</div>
              <div>✅ Real-time progress tracking</div>
              <div>✅ Error handling & recovery</div>
              <div>✅ Rate limiting protection</div>
              <div>✅ GPT-4 powered quality</div>
            </div>
          </div>
        </div>
      </div>

      {/* Translation Jobs History */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Translation Job History</h3>
        {translationJobs.map((job) => (
          <div key={job.id} className="bg-slate-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  job.status === 'completed' ? 'bg-green-600 text-green-100' :
                  job.status === 'running' ? 'bg-blue-600 text-blue-100' :
                  job.status === 'failed' ? 'bg-red-600 text-red-100' : 'bg-gray-600 text-gray-100'
                }`}>
                  {job.status.toUpperCase()}
                </span>
                <span className="text-sm text-gray-400">
                  Started {new Date(job.startedAt).toLocaleString()}
                </span>
                {job.completedAt && (
                  <span className="text-sm text-gray-400">
                    • Completed {new Date(job.completedAt).toLocaleString()}
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">{job.progress}%</div>
                <div className="text-sm text-gray-400">
                  {job.completedFiles}/{job.totalFiles} languages
                </div>
              </div>
            </div>
            
            {job.status === 'running' && (
              <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${job.progress}%` }}
                ></div>
              </div>
            )}
            
            {job.error && (
              <div className="text-red-400 text-sm mt-2 p-2 bg-red-900/20 rounded">
                <strong>Error:</strong> {job.error}
              </div>
            )}
            
            {job.errors && job.errors.length > 0 && (
              <div className="text-yellow-400 text-sm mt-2 p-2 bg-yellow-900/20 rounded">
                <strong>Warnings:</strong> {job.errors.length} issues encountered during translation
              </div>
            )}
          </div>
        ))}
        {translationJobs.length === 0 && (
          <div className="bg-slate-800 p-8 rounded-lg text-center">
            <p className="text-gray-400">No translation jobs yet.</p>
            <p className="text-sm text-gray-500 mt-2">Click "Translate All Pages Now" to start your first translation job.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Settings Section Component
function SettingsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      
      <div className="bg-slate-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Translation Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Default Translation Provider</label>
            <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2">
              <option value="openai">OpenAI GPT-4</option>
              <option value="anthropic">Anthropic Claude</option>
              <option value="google">Google Translate</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Rate Limiting</label>
            <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2">
              <option value="conservative">Conservative (1 req/sec)</option>
              <option value="moderate">Moderate (2 req/sec)</option>
              <option value="aggressive">Aggressive (5 req/sec)</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">
              Conservative mode reduces API rate limiting but takes longer
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Auto-translate new content</label>
            <input type="checkbox" className="rounded" />
            <span className="ml-2 text-sm text-gray-400">
              Automatically translate new pages and content when added
            </span>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Translation Quality</label>
            <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2">
              <option value="high">High Quality (Slower)</option>
              <option value="balanced">Balanced</option>
              <option value="fast">Fast (Lower Quality)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">System Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Version:</span>
            <span>1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Last Updated:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Translation Engine:</span>
            <span>GPT-4 Turbo</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Supported Languages:</span>
            <span>12 languages</span>
          </div>
        </div>
      </div>
    </div>
  );
}