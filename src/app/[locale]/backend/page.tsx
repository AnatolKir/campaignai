'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface TranslationJob {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  sourceLanguage: string;
  targetLanguage: string;
  content: string;
  translatedContent?: string;
  createdAt: string;
  updatedAt: string;
  progress?: number;
  error?: string;
}

interface SystemHealth {
  apiStatus: 'healthy' | 'degraded' | 'down';
  databaseConnection: 'connected' | 'disconnected';
  translationService: 'available' | 'unavailable';
  lastUpdated: string;
}

export default function BackendPage() {
  const t = useTranslations();
  const [translationJobs, setTranslationJobs] = useState<TranslationJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'jobs' | 'statistics'>('jobs');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    apiStatus: 'healthy',
    databaseConnection: 'connected',
    translationService: 'available',
    lastUpdated: new Date().toLocaleTimeString()
  });

  const fetchTranslationJobs = async () => {
    try {
      const response = await fetch('/api/backend/translation-jobs');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTranslationJobs(Array.isArray(data) ? data : []);
      setError(null);
      setLastUpdated(new Date().toLocaleTimeString());
      
      // Update system health based on API response
      setSystemHealth(prev => ({
        ...prev,
        apiStatus: 'healthy',
        lastUpdated: new Date().toLocaleTimeString()
      }));
    } catch (err) {
      console.error('Error fetching translation jobs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch translation jobs');
      setSystemHealth(prev => ({
        ...prev,
        apiStatus: 'degraded',
        lastUpdated: new Date().toLocaleTimeString()
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTranslationJobs();
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(fetchTranslationJobs, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'processing': return 'text-blue-400';
      case 'pending': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'connected':
      case 'available':
        return 'text-green-400';
      case 'degraded':
        return 'text-yellow-400';
      case 'down':
      case 'disconnected':
      case 'unavailable':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  // Calculate statistics
  const totalJobs = translationJobs.length;
  const completedJobs = translationJobs.filter(job => job.status === 'completed').length;
  const processingJobs = translationJobs.filter(job => job.status === 'processing').length;
  const pendingJobs = translationJobs.filter(job => job.status === 'pending').length;
  const failedJobs = translationJobs.filter(job => job.status === 'failed').length;
  const completionRate = totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 0;

  if (loading && translationJobs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
              <p className="text-gray-300">Loading translation management dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Translation Management Dashboard
          </h1>
          <p className="text-gray-300 mb-4">
            Monitor and manage translation jobs and system performance
          </p>
          
          {/* Controls */}
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
              />
              Auto-refresh (5s)
            </label>
            <button
              onClick={fetchTranslationJobs}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors"
            >
              Refresh Now
            </button>
            {lastUpdated && (
              <span className="text-sm text-gray-400">
                Last updated: {lastUpdated}
              </span>
            )}
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-4">
              <p className="text-red-400 text-sm">Error: {error}</p>
            </div>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold mb-2">Total Jobs</h3>
            <p className="text-3xl font-bold text-purple-400">{totalJobs}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold mb-2">Completed</h3>
            <p className="text-3xl font-bold text-green-400">{completedJobs}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold mb-2">Processing</h3>
            <p className="text-3xl font-bold text-blue-400">{processingJobs}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold mb-2">Pending</h3>
            <p className="text-3xl font-bold text-yellow-400">{pendingJobs}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold mb-2">Failed</h3>
            <p className="text-3xl font-bold text-red-400">{failedJobs}</p>
          </div>
        </div>

        {/* Completion Rate */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
          <h3 className="text-xl font-semibold mb-4">Overall Completion Rate</h3>
          <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <p className="text-right text-lg font-semibold text-purple-400">{completionRate}%</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'jobs'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Translation Jobs
            </button>
            <button
              onClick={() => setActiveTab('statistics')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'statistics'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Statistics
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'jobs' && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Translation Jobs</h2>
              <p className="text-gray-300 mb-6">Monitor active and completed translation tasks</p>
              
              {translationJobs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-gray-400 text-lg">No translation jobs found</p>
                  <p className="text-gray-500 text-sm mt-2">Translation jobs will appear here when they are created</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-3 px-4 font-semibold">ID</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Languages</th>
                        <th className="text-left py-3 px-4 font-semibold">Content Preview</th>
                        <th className="text-left py-3 px-4 font-semibold">Created</th>
                        <th className="text-left py-3 px-4 font-semibold">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {translationJobs.map((job) => (
                        <tr key={job.id} className="border-b border-gray-700/50 hover:bg-white/5">
                          <td className="py-3 px-4 font-mono text-sm">{job.id.slice(0, 8)}...</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeColor(job.status)}`}>
                              {job.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {job.sourceLanguage} → {job.targetLanguage}
                          </td>
                          <td className="py-3 px-4 text-sm max-w-xs truncate">
                            {job.content}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-400">
                            {new Date(job.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            {job.progress !== undefined ? (
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${job.progress}%` }}
                                ></div>
                              </div>
                            ) : (
                              <span className="text-gray-500 text-sm">N/A</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'statistics' && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">System Statistics</h2>
              <p className="text-gray-300 mb-6">System health and performance metrics</p>
              
              {/* System Health */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">API Status</h4>
                  <p className={`text-lg font-bold ${getHealthStatusColor(systemHealth.apiStatus)}`}>
                    {systemHealth.apiStatus}
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Database Connection</h4>
                  <p className={`text-lg font-bold ${getHealthStatusColor(systemHealth.databaseConnection)}`}>
                    {systemHealth.databaseConnection}
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Translation Service</h4>
                  <p className={`text-lg font-bold ${getHealthStatusColor(systemHealth.translationService)}`}>
                    {systemHealth.translationService}
                  </p>
                </div>
              </div>

              {/* Job Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">{totalJobs}</p>
                  <p className="text-sm text-gray-400">Total Jobs</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">{completedJobs}</p>
                  <p className="text-sm text-gray-400">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">{processingJobs}</p>
                  <p className="text-sm text-gray-400">Processing</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-400">{failedJobs}</p>
                  <p className="text-sm text-gray-400">Failed</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}