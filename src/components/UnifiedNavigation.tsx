"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBrand } from '../contexts/BrandContext';
import { BrandSwitcher } from './BrandSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations, useLocale } from 'next-intl';

interface UnifiedNavigationProps {
  showMobileMenuButton?: boolean;
  onMobileMenuToggle?: () => void;
  variant?: 'default' | 'landing';
}

export function UnifiedNavigation({ showMobileMenuButton = false, onMobileMenuToggle, variant = 'default' }: UnifiedNavigationProps) {
  const { user, isLoading } = useBrand();
  const router = useRouter();
  const locale = useLocale();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations();

  // Helper function to create locale-aware URLs
  const createLocalizedUrl = (path: string) => {
    return `/${locale}${path}`;
  };

  // Prevent background scroll when dropdown is open
  useEffect(() => {
    if (isDropdownOpen || isMobileMenuOpen) {
      // Store original overflow
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isDropdownOpen, isMobileMenuOpen]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen && dropdownButtonRef.current && !dropdownButtonRef.current.contains(event.target as Node)) {
        // Check if the click is not on the dropdown content
        const dropdownContent = document.querySelector('[data-dropdown-content]');
        if (!dropdownContent || !dropdownContent.contains(event.target as Node)) {
          setIsDropdownOpen(false);
        }
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  const handleSignOut = () => {
    // TODO: Implement actual sign out logic
    router.push('/');
  };

  const handleSignIn = () => {
    router.push('/dashboard');
  };

  const shouldShowUpgrade = user && user.subscription_plan !== 'pro';

  // Helper function to check if user is super user
  const isSuperUser = user && user.email === 'rick@campaign.ai'; // TODO: Implement proper super user check

  // Helper function to filter menu items based on user permissions
  const filterMenuItems = (items: any[]) => {
    return items.filter(item => {
      if (item.superUserOnly && !isSuperUser) {
        return false;
      }
      return true;
    });
  };

  // Navigation menu items organized by category
  const menuItems = [
    {
      category: t('unifiedNavigation.categories.coreFeatures'),
      items: [
        { name: t('unifiedNavigation.menuItems.dashboard.name'), href: createLocalizedUrl("/dashboard"), icon: "🏠", description: t('unifiedNavigation.menuItems.dashboard.description') },
        { name: t('unifiedNavigation.menuItems.posts.name'), href: createLocalizedUrl("/posts"), icon: "📝", description: t('unifiedNavigation.menuItems.posts.description') },
        { name: t('unifiedNavigation.menuItems.engagement.name'), href: createLocalizedUrl("/engagement"), icon: "💬", description: t('unifiedNavigation.menuItems.engagement.description') },
        { name: t('unifiedNavigation.menuItems.analytics.name'), href: createLocalizedUrl("/analytics"), icon: "📊", description: t('unifiedNavigation.menuItems.analytics.description') },
        { name: t('unifiedNavigation.menuItems.accounts.name'), href: createLocalizedUrl("/accounts"), icon: "👥", description: t('unifiedNavigation.menuItems.accounts.description') },
        { name: t('unifiedNavigation.menuItems.competitiveIntelligence.name'), href: createLocalizedUrl("/competitive-intelligence"), icon: "🔍", description: t('unifiedNavigation.menuItems.competitiveIntelligence.description') },
        { name: t('unifiedNavigation.menuItems.brandSettings.name'), href: createLocalizedUrl("/brand-settings"), icon: "🏢", description: t('unifiedNavigation.menuItems.brandSettings.description') },
      ]
    },
    {
      category: t('unifiedNavigation.categories.aiAutomation'),
      items: [
        { name: t('unifiedNavigation.menuItems.training.name'), href: createLocalizedUrl("/training"), icon: "🎓", description: t('unifiedNavigation.menuItems.training.description') },
        { name: t('unifiedNavigation.menuItems.agentSettings.name'), href: createLocalizedUrl("/agent-settings"), icon: "🤖", description: t('unifiedNavigation.menuItems.agentSettings.description') },
      ]
    },
    {
      category: t('unifiedNavigation.categories.growthMonetization'),
      items: [
        { name: t('unifiedNavigation.menuItems.monetize.name'), href: createLocalizedUrl("/monetize"), icon: "💰", description: t('unifiedNavigation.menuItems.monetize.description') },
        { name: t('unifiedNavigation.menuItems.advertise.name'), href: createLocalizedUrl("/advertise"), icon: "📢", description: t('unifiedNavigation.menuItems.advertise.description') },
      ]
    },
    {
      category: t('unifiedNavigation.categories.accountSettings'),
      items: [
        { name: t('unifiedNavigation.menuItems.userManagement.name'), href: createLocalizedUrl("/users"), icon: "👤", description: t('unifiedNavigation.menuItems.userManagement.description') },
        { name: t('unifiedNavigation.menuItems.backendAdmin.name'), href: createLocalizedUrl("/backend"), icon: "🔧", description: t('unifiedNavigation.menuItems.backendAdmin.description'), superUserOnly: true },
        { name: t('unifiedNavigation.menuItems.billing.name'), href: createLocalizedUrl("/billing"), icon: "💳", description: t('unifiedNavigation.menuItems.billing.description') },
        { name: t('unifiedNavigation.menuItems.upgrade.name'), href: createLocalizedUrl("/upgrade"), icon: "⭐", description: t('unifiedNavigation.menuItems.upgrade.description') },
      ]
    }
  ];

  

  return (
    <>
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 px-4 sm:px-6 py-4 sticky top-0 z-40">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button for Sidebar */}
            {showMobileMenuButton && (
              <button 
                onClick={onMobileMenuToggle}
                className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}

            {/* Logo */}
            <Link href={createLocalizedUrl("/dashboard")} className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logo-32.png" alt="Campaign.ai" className="w-8 h-8" />
              </div>
              <span className="text-white font-bold text-xl">{t('unifiedNavigation.campaignAi')}</span>
            </Link>

            {/* Brand Switcher - Only show if user is signed in */}
            {user && !isLoading && (
              <div className="hidden md:block">
                <BrandSwitcher />
              </div>
            )}

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {variant === 'landing' ? (
              /* Landing Page Navigation */
              <>
                <Link href="#features" className="text-gray-300 hover:text-white transition-colors font-medium">
                  {t('unifiedNavigation.features')}
                </Link>
                <Link href="#screenshots" className="text-gray-300 hover:text-white transition-colors font-medium">
                  {t('unifiedNavigation.demo')}
                </Link>
                <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors font-medium">
                  {t('unifiedNavigation.pricing')}
                </Link>
                <Link href={createLocalizedUrl("/monetize")} className="text-gray-300 hover:text-white transition-colors font-medium">
                  {t('unifiedNavigation.monetize')}
                </Link>
                <Link href={createLocalizedUrl("/advertise")} className="text-gray-300 hover:text-white transition-colors font-medium">
                  {t('unifiedNavigation.advertise')}
                </Link>
                <div className="h-6 w-px bg-white/20"></div>
                {user ? (
                  <>
                    <Link href={createLocalizedUrl("/dashboard")} className="text-gray-300 hover:text-white transition-colors font-medium">
                      {t('unifiedNavigation.dashboard')}
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="text-gray-300 hover:text-white transition-colors font-medium"
                    >
                      {t('unifiedNavigation.signOut')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link href={createLocalizedUrl("/dashboard")} className="text-gray-300 hover:text-white transition-colors font-medium">
                      {t('unifiedNavigation.signIn')}
                    </Link>
                    <Link href={createLocalizedUrl("/dashboard")} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg">
                      {t('unifiedNavigation.startFreeTrial')}
                    </Link>
                  </>
                )}
              </>
            ) : (
              /* App Navigation - Always show for dashboard/app pages */
              <>
                {/* Dashboard Link */}
                <Link 
                  href={createLocalizedUrl("/dashboard")} 
                  className="text-white hover:text-purple-300 transition-colors font-medium"
                >
                  {t('unifiedNavigation.dashboard')}
                </Link>

                {/* All Pages Dropdown */}
                <div className="relative">
                  <button
                    ref={dropdownButtonRef}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors font-medium"
                  >
                    <span>{t('unifiedNavigation.allPages')}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu - Non-portaled version */}
                  {isDropdownOpen && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-[999998]" 
                        onClick={() => setIsDropdownOpen(false)}
                        onTouchStart={() => setIsDropdownOpen(false)}
                      />
                      
                      {/* Dropdown Content */}
                      <div
                        data-dropdown-content
                        className="absolute top-full right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl max-h-96 overflow-y-auto z-[999999]"
                        onWheel={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                        style={{ touchAction: 'pan-y' }}
                      >
                        <div className="p-4">
                          <div className="text-sm text-gray-400 uppercase tracking-wide font-medium mb-3">
                            {t('unifiedNavigation.allPages')}
                          </div>
                          
                          {menuItems.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="mb-4">
                              <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2 px-2">
                                {category.category}
                              </div>
                              <div className="space-y-1">
                                {filterMenuItems(category.items).map((item, itemIndex) => (
                                  <Link
                                    key={itemIndex}
                                    href={item.href}
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="flex items-start space-x-3 px-3 py-3 hover:bg-white/5 rounded-lg transition-colors group"
                                  >
                                    <span className="text-lg mt-0.5 group-hover:scale-110 transition-transform">
                                      {item.icon}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-white font-medium text-sm group-hover:text-purple-300 transition-colors">
                                        {item.name}
                                      </div>
                                      <div className="text-gray-400 text-xs truncate">
                                        {item.description}
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Upgrade Button - Only show if user exists and not at highest level */}
                {user && shouldShowUpgrade && (
                  <Link 
                    href={createLocalizedUrl("/upgrade")} 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-white font-medium"
                  >
                    {t('unifiedNavigation.menuItems.upgrade.name')}
                  </Link>
                )}

                {/* Sign Out - Only show if user exists */}
                {user ? (
                  <button 
                    onClick={handleSignOut}
                    className="text-gray-300 hover:text-white transition-colors font-medium"
                  >
                    {t('unifiedNavigation.signOut')}
                  </button>
                ) : (
                  <button 
                    onClick={handleSignIn}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-white font-medium"
                  >
                    {t('unifiedNavigation.signIn')}
                  </button>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Brand Switcher */}
            {user && !isLoading && (
              <div className="md:hidden">
                <BrandSwitcher />
              </div>
            )}
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden mt-4 pt-4 border-t border-white/10 max-h-96 overflow-y-auto"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{ touchAction: 'pan-y' }}
          >
            {variant === 'landing' ? (
              /* Landing Page Mobile Menu */
              <div className="flex flex-col space-y-3 pt-4">
                <Link href="#features" className="text-gray-300 hover:text-white transition-colors py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('unifiedNavigation.features')}
                </Link>
                <Link href="#screenshots" className="text-gray-300 hover:text-white transition-colors py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('unifiedNavigation.demo')}
                </Link>
                <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('unifiedNavigation.pricing')}
                </Link>
                <Link href={createLocalizedUrl("/monetize")} className="text-gray-300 hover:text-white transition-colors py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('unifiedNavigation.monetize')}
                </Link>
                <Link href={createLocalizedUrl("/advertise")} className="text-gray-300 hover:text-white transition-colors py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('unifiedNavigation.advertise')}
                </Link>
                <div className="h-px bg-white/10 my-2"></div>
                {user ? (
                  <>
                    <Link href={createLocalizedUrl("/dashboard")} className="text-gray-300 hover:text-white transition-colors py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                      {t('unifiedNavigation.dashboard')}
                    </Link>
                    <button 
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left text-gray-300 hover:text-white transition-colors py-2 font-medium"
                    >
                      {t('unifiedNavigation.signOut')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link href={createLocalizedUrl("/dashboard")} className="text-gray-300 hover:text-white transition-colors py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                      {t('unifiedNavigation.signIn')}
                    </Link>
                    <Link href={createLocalizedUrl("/dashboard")} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-center font-semibold shadow-lg" onClick={() => setIsMobileMenuOpen(false)}>
                      {t('unifiedNavigation.startFreeTrial')}
                    </Link>
                  </>
                )}
              </div>
            ) : (
              /* App Mobile Menu - Always show for dashboard/app pages */
              <div className="space-y-4">
                {/* Dashboard */}
                <Link 
                  href={createLocalizedUrl("/dashboard")} 
                  className="block text-white hover:text-purple-300 transition-colors py-2 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('unifiedNavigation.dashboard')}
                </Link>

                {/* Mobile Menu Categories */}
                {menuItems.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-2">
                    <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                      {category.category}
                    </div>
                    {filterMenuItems(category.items).map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors py-2 pl-4"
                      >
                        <span>{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                ))}

                <div className="pt-4 border-t border-white/10">
                  {/* Mobile Upgrade Button - Only show if user exists */}
                  {user && shouldShowUpgrade && (
                    <Link 
                      href={createLocalizedUrl("/upgrade")} 
                      className="block bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-white font-medium text-center mb-3"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('unifiedNavigation.menuItems.upgrade.name')}
                    </Link>
                  )}

                  {/* Mobile Sign Out/In */}
                  {user ? (
                    <button 
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2 font-medium"
                    >
                      {t('unifiedNavigation.signOut')}
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        handleSignIn();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-white font-medium"
                    >
                      {t('unifiedNavigation.signIn')}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </nav>


    </>
  );
} 