"use client";

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useBrand } from '../contexts/BrandContext';
import Link from 'next/link';

export function BrandSwitcher() {
  const { currentBrand, availableBrands, isLoading, switchBrand, canCreateBrand } = useBrand();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Calculate dropdown position when it opens
  useEffect(() => {
    if (isDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8, // 8px gap
        left: rect.left + window.scrollX
      });
    }
  }, [isDropdownOpen]);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 bg-white/5 rounded-lg animate-pulse">
        <div className="w-6 h-6 bg-white/20 rounded"></div>
        <div className="w-20 h-4 bg-white/20 rounded"></div>
        <div className="w-4 h-4 bg-white/20 rounded"></div>
      </div>
    );
  }

  if (!currentBrand) {
    return null;
  }

  const handleBrandSwitch = async (brandId: string) => {
    await switchBrand(brandId);
    setIsDropdownOpen(false);
  };

  const handleCreateBrand = () => {
    if (canCreateBrand()) {
      setShowCreateModal(true);
    } else {
      // This will redirect to upgrade page
      // The redirect logic is handled in the BrandContext
    }
    setIsDropdownOpen(false);
  };

  // Dropdown component that will be portaled
  const DropdownMenu = () => (
    <div
      className="fixed w-64 bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl"
      style={{
        top: `${dropdownPosition.top}px`,
        left: `${dropdownPosition.left}px`,
        zIndex: 999999
      }}
    >
      <div className="p-3">
        {/* Current Brand Section */}
        <div className="px-3 py-2 text-xs text-gray-400 uppercase tracking-wide font-medium">
          Current Brand
        </div>
        <div className="flex items-center space-x-3 px-3 py-3 bg-white/10 rounded-lg mb-3 border border-white/5">
          <div 
            className="w-8 h-8 rounded flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: currentBrand.primary_color }}
          >
            {currentBrand.logo_url ? (
              <img 
                src={currentBrand.logo_url} 
                alt={currentBrand.name} 
                className="w-8 h-8 rounded object-cover"
              />
            ) : (
              currentBrand.name.charAt(0).toUpperCase()
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-medium truncate">{currentBrand.name}</div>
            {currentBrand.handle && (
              <div className="text-gray-400 text-sm truncate">{currentBrand.handle}</div>
            )}
          </div>
          <div className="text-green-400 text-xs">✓</div>
        </div>

        {/* Other Brands Section */}
        {availableBrands.filter(brand => brand.id !== currentBrand.id).length > 0 && (
          <>
            <div className="px-3 py-2 text-xs text-gray-400 uppercase tracking-wide border-t border-white/10 mt-2 pt-4 font-medium">
              Switch To
            </div>
            {availableBrands
              .filter(brand => brand.id !== currentBrand.id)
              .map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => handleBrandSwitch(brand.id)}
                  className="w-full flex items-center space-x-3 px-3 py-3 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <div 
                    className="w-8 h-8 rounded flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: brand.primary_color }}
                  >
                    {brand.logo_url ? (
                      <img 
                        src={brand.logo_url} 
                        alt={brand.name} 
                        className="w-8 h-8 rounded object-cover"
                      />
                    ) : (
                      brand.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="text-white font-medium truncate">{brand.name}</div>
                    {brand.handle && (
                      <div className="text-gray-400 text-sm truncate">{brand.handle}</div>
                    )}
                  </div>
                </button>
              ))}
          </>
        )}

        {/* Management Actions */}
        <div className="border-t border-white/10 mt-3 pt-3 space-y-1">
          <Link
            href="/brand-settings"
            className="w-full flex items-center space-x-3 px-3 py-3 hover:bg-white/5 rounded-lg transition-colors text-left"
          >
            <div className="w-8 h-8 rounded flex items-center justify-center border border-white/20">
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-white font-medium text-sm">Manage Brands</div>
              <div className="text-gray-400 text-xs">View all brands and settings</div>
            </div>
          </Link>
          
          <button
            onClick={handleCreateBrand}
            className="w-full flex items-center space-x-3 px-3 py-3 hover:bg-white/5 rounded-lg transition-colors text-left"
          >
            <div className="w-8 h-8 rounded border-2 border-dashed border-white/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-white font-medium text-sm">
                {canCreateBrand() ? 'Create New Brand' : 'Upgrade to Add Brands'}
              </div>
              <div className="text-gray-400 text-xs">
                {canCreateBrand() 
                  ? 'Set up a new brand profile' 
                  : 'Upgrade your plan for more brands'
                }
              </div>
            </div>
            {!canCreateBrand() && (
              <div className="text-purple-400 text-xs bg-purple-500/20 px-2 py-1 rounded">
                PRO
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
        >
          {/* Brand Logo/Avatar */}
          <div 
            className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: currentBrand.primary_color }}
          >
            {currentBrand.logo_url ? (
              <img 
                src={currentBrand.logo_url} 
                alt={currentBrand.name} 
                className="w-6 h-6 rounded object-cover"
              />
            ) : (
              currentBrand.name.charAt(0).toUpperCase()
            )}
          </div>
          
          {/* Brand Name */}
          <span className="text-white font-medium text-sm max-w-32 truncate">
            {currentBrand.name}
          </span>
          
          {/* Dropdown Arrow */}
          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Portal the dropdown to document body */}
      {isDropdownOpen && typeof window !== 'undefined' && createPortal(
        <>
          {/* Backdrop to close dropdown */}
          <div 
            className="fixed inset-0 z-[999998]" 
            onClick={() => setIsDropdownOpen(false)}
          />
          <DropdownMenu />
        </>,
        document.body
      )}

      {/* Create Brand Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000000] flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-lg rounded-3xl p-8 border border-white/10 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Create New Brand</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-300 mb-4">Brand creation functionality will be implemented here.</p>
            <button
              onClick={() => setShowCreateModal(false)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
} 