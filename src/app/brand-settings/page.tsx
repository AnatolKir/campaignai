"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useBrand } from '../../contexts/BrandContext';
import { UnifiedNavigation } from '../../components/UnifiedNavigation';
import { CreateBrandModal } from '../../components/CreateBrandModal';

export default function BrandSettingsPage() {
  const { availableBrands, currentBrand, switchBrand, user, canCreateBrand } = useBrand();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState<string | null>(null);

  const brandLimits = {
    free: 1,
    standard: 3,
    pro: 999,
  };

  const handleCreateBrand = () => {
    if (canCreateBrand()) {
      setShowCreateModal(true);
    }
  };

  const getBrandUsageInfo = () => {
    if (!user) return { current: 0, limit: 1 };
    return {
      current: availableBrands.length,
      limit: brandLimits[user.subscription_plan]
    };
  };

  const usage = getBrandUsageInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <UnifiedNavigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Brand Management</h1>
              <p className="text-gray-300">Manage your brands, settings, and team access</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Brands Used</div>
              <div className="text-3xl font-bold text-white">
                {usage.current} / {usage.limit === 999 ? '∞' : usage.limit}
              </div>
              <div className="text-gray-300 text-sm">
                {user?.subscription_plan === 'free' ? 'Free Plan' : 
                 user?.subscription_plan === 'standard' ? 'Standard Plan' : 'Pro Plan'}
              </div>
            </div>
          </div>
        </div>

        {/* Usage Bar */}
        {usage.limit !== 999 && (
          <div className="mb-8 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-medium">Brand Usage</span>
              <span className="text-gray-300 text-sm">{usage.current} of {usage.limit} brands</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: `${Math.min((usage.current / usage.limit) * 100, 100)}%` }}
              />
            </div>
            {usage.current >= usage.limit && (
              <p className="text-amber-400 text-sm mt-2">
                You've reached your brand limit. <Link href="/upgrade" className="underline hover:text-amber-300">Upgrade to add more brands</Link>.
              </p>
            )}
          </div>
        )}

        {/* Action Bar */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex space-x-4">
            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-1 border border-white/10">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm">
                All Brands
              </button>
              <button className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Active
              </button>
              <button className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Inactive
              </button>
            </div>
          </div>
          <button 
            onClick={handleCreateBrand}
            disabled={!canCreateBrand()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {canCreateBrand() ? '+ Create Brand' : 'Upgrade to Add More'}
          </button>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {availableBrands.map((brand) => (
            <div 
              key={brand.id} 
              className={`bg-white/5 backdrop-blur-lg rounded-2xl p-6 border transition-all hover:bg-white/10 ${
                currentBrand?.id === brand.id 
                  ? 'border-purple-500 ring-2 ring-purple-500/30' 
                  : 'border-white/10'
              }`}
            >
              {/* Brand Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg font-bold"
                    style={{ backgroundColor: brand.primary_color }}
                  >
                    {brand.logo_url ? (
                      <img 
                        src={brand.logo_url} 
                        alt={brand.name} 
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      brand.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-lg truncate">{brand.name}</h3>
                    {brand.handle && (
                      <p className="text-gray-400 text-sm truncate">{brand.handle}</p>
                    )}
                  </div>
                </div>
                {currentBrand?.id === brand.id && (
                  <div className="text-green-400 text-xs bg-green-500/20 px-2 py-1 rounded">
                    ACTIVE
                  </div>
                )}
              </div>

              {/* Brand Info */}
              <div className="space-y-2 mb-4">
                {brand.description && (
                  <p className="text-gray-300 text-sm line-clamp-2">{brand.description}</p>
                )}
                {brand.industry && (
                  <div className="text-gray-400 text-xs bg-white/5 px-2 py-1 rounded inline-block">
                    {brand.industry}
                  </div>
                )}
              </div>

              {/* Brand Colors */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-gray-400 text-xs">Colors:</div>
                <div 
                  className="w-4 h-4 rounded" 
                  style={{ backgroundColor: brand.primary_color }}
                  title={brand.primary_color}
                />
                <div 
                  className="w-4 h-4 rounded" 
                  style={{ backgroundColor: brand.secondary_color }}
                  title={brand.secondary_color}
                />
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                {currentBrand?.id !== brand.id && (
                  <button 
                    onClick={() => switchBrand(brand.id)}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    Switch To
                  </button>
                )}
                <button 
                  onClick={() => setEditingBrand(brand.id)}
                  className="flex-1 bg-white/10 text-white px-3 py-2 rounded-lg text-sm hover:bg-white/20 transition-colors"
                >
                  Edit
                </button>
                <Link 
                  href={`/agent-settings?brand=${brand.id}`}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-2 rounded-lg text-sm hover:from-green-700 hover:to-emerald-700 transition-all text-center"
                >
                  Configure AI
                </Link>
              </div>
            </div>
          ))}

          {/* Create New Brand Card */}
          {canCreateBrand() && (
            <div 
              onClick={handleCreateBrand}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-dashed border-white/20 hover:border-white/40 transition-colors cursor-pointer flex flex-col items-center justify-center text-center min-h-[280px]"
            >
              <div className="w-16 h-16 rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Create New Brand</h3>
              <p className="text-gray-400 text-sm">Set up a new brand profile with AI configuration</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300 text-sm">Total Brands</h3>
              <span className="text-blue-400">🏢</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{availableBrands.length}</div>
            <div className="text-gray-400 text-sm">
              {usage.limit === 999 ? 'Unlimited' : `${usage.limit - usage.current} remaining`}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300 text-sm">Active Brand</h3>
              <span className="text-green-400">✅</span>
            </div>
            <div className="text-xl font-bold text-white mb-2 truncate">
              {currentBrand?.name || 'None'}
            </div>
            <div className="text-gray-400 text-sm">
              {currentBrand?.handle || 'No handle set'}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300 text-sm">Plan Status</h3>
              <span className="text-purple-400">⭐</span>
            </div>
            <div className="text-xl font-bold text-white mb-2 capitalize">
              {user?.subscription_plan || 'Free'}
            </div>
            <div className="text-gray-400 text-sm">
              {user?.subscription_plan === 'free' ? (
                <Link href="/upgrade" className="text-purple-400 hover:text-purple-300 underline">
                  Upgrade for more brands
                </Link>
              ) : (
                'Premium features enabled'
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Brand Modal */}
      <CreateBrandModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
    </div>
  );
} 