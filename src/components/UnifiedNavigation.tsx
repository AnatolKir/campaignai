"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBrand } from '../contexts/BrandContext';
import { BrandSwitcher } from './BrandSwitcher';

interface UnifiedNavigationProps {
  showMobileMenuButton?: boolean;
  onMobileMenuToggle?: () => void;
  variant?: 'default' | 'landing';
}

export function UnifiedNavigation({ showMobileMenuButton = false, onMobileMenuToggle, variant = 'default' }: UnifiedNavigationProps) {
  const { user, isLoading } = useBrand();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

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

  const handleSignOut = () => {
    // TODO: Implement actual sign out logic
    router.push('/');
  };

  const handleSignIn = () => {
    router.push('/dashboard');
  };

  const shouldShowUpgrade = user && user.subscription_plan !== 'pro';

  // Navigation menu items organized by category
  const menuItems = [
    {
      category: "Core Features",
      items: [
        { name: "Dashboard", href: "/dashboard", icon: "🏠", description: "Main dashboard and overview" },
        { name: "Posts", href: "/posts", icon: "📝", description: "Manage and schedule posts" },
        { name: "Engagement", href: "/engagement", icon: "💬", description: "Manage interactions and replies" },
        { name: "Analytics", href: "/analytics", icon: "📊", description: "Performance insights and metrics" },
        { name: "Accounts", href: "/accounts", icon: "👥", description: "Social media account management" },
        { name: "Competitive Intelligence", href: "/competitive-intelligence", icon: "🔍", description: "Monitor competitors and market trends" },
      ]
    },
    {
      category: "AI & Automation",
      items: [
        { name: "Training", href: "/training", icon: "🎓", description: "AI training and customization" },
        { name: "Agent Settings", href: "/agent-settings", icon: "🤖", description: "Customize your AI agent" },
        { name: "Customize Agent", href: "/customize-agent", icon: "⚙️", description: "Advanced agent customization" },
      ]
    },
    {
      category: "Growth & Monetization",
      items: [
        { name: "Monetize", href: "/monetize", icon: "💰", description: "Revenue opportunities and partnerships" },
        { name: "Advertise", href: "/advertise", icon: "📢", description: "Advertising and promotion tools" },
      ]
    },
    {
      category: "Account & Settings",
      items: [
        { name: "Brand Settings", href: "/brand-settings", icon: "🏢", description: "Manage your brands and settings" },
        { name: "User Management", href: "/users", icon: "👤", description: "Manage team members and permissions" },
        { name: "Billing", href: "/billing", icon: "💳", description: "Billing history and management" },
        { name: "Upgrade", href: "/upgrade", icon: "⭐", description: "Upgrade your subscription plan" },
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
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logo-32.png" alt="Campaign.ai" className="w-8 h-8" />
              </div>
              <span className="text-white font-bold text-xl">Campaign.ai</span>
            </Link>

            {/* Brand Switcher - Only show if user is signed in */}
            {user && !isLoading && (
              <div className="hidden md:block">
                <BrandSwitcher />
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {variant === 'landing' ? (
              /* Landing Page Navigation */
              <>
                <Link href="#features" className="text-gray-300 hover:text-white transition-colors font-medium">
                  Features
                </Link>
                <Link href="#screenshots" className="text-gray-300 hover:text-white transition-colors font-medium">
                  Demo
                </Link>
                <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors font-medium">
                  Pricing
                </Link>
                <Link href="/monetize" className="text-gray-300 hover:text-white transition-colors font-medium">
                  Monetize
                </Link>
                <Link href="/advertise" className="text-gray-300 hover:text-white transition-colors font-medium">
                  Advertise
                </Link>
                <div className="h-6 w-px bg-white/20"></div>
                {user ? (
                  <>
                    <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors font-medium">
                      Dashboard
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="text-gray-300 hover:text-white transition-colors font-medium"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors font-medium">
                      Sign In
                    </Link>
                    <Link href="/dashboard" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg">
                      Start Free Trial
                    </Link>
                  </>
                )}
              </>
            ) : (
              /* App Navigation */
              user ? (
                <>
                  {/* Dashboard Link */}
                  <Link 
                    href="/dashboard" 
                    className="text-white hover:text-purple-300 transition-colors font-medium"
                  >
                    Dashboard
                  </Link>

                                  {/* All Pages Dropdown */}
                <div className="relative">
                  <button
                    ref={dropdownButtonRef}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors font-medium"
                  >
                    <span>All Pages</span>
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
                        className="absolute top-full right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl max-h-96 overflow-y-auto z-[999999]"
                        onWheel={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                        style={{ touchAction: 'pan-y' }}
                      >
                        <div className="p-4">
                          <div className="text-sm text-gray-400 uppercase tracking-wide font-medium mb-3">
                            All Pages
                          </div>
                          
                          {menuItems.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="mb-4">
                              <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2 px-2">
                                {category.category}
                              </div>
                              <div className="space-y-1">
                                {category.items.map((item, itemIndex) => (
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

                  {/* Upgrade Button - Only show if not at highest level */}
                  {shouldShowUpgrade && (
                    <Link 
                      href="/upgrade" 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-white font-medium"
                    >
                      Upgrade
                    </Link>
                  )}

                  {/* Sign Out */}
                  <button 
                    onClick={handleSignOut}
                    className="text-gray-300 hover:text-white transition-colors font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                /* Sign In - Only show if user is not signed in */
                <button 
                  onClick={handleSignIn}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-white font-medium"
                >
                  Sign In
                </button>
              )
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
                  Features
                </Link>
                <Link href="#screenshots" className="text-gray-300 hover:text-white transition-colors py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Demo
                </Link>
                <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Pricing
                </Link>
                <Link href="/monetize" className="text-gray-300 hover:text-white transition-colors py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Monetize
                </Link>
                <Link href="/advertise" className="text-gray-300 hover:text-white transition-colors py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Advertise
                </Link>
                <div className="h-px bg-white/10 my-2"></div>
                {user ? (
                  <>
                    <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                      Dashboard
                    </Link>
                    <button 
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left text-gray-300 hover:text-white transition-colors py-2 font-medium"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                    <Link href="/dashboard" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-center font-semibold shadow-lg" onClick={() => setIsMobileMenuOpen(false)}>
                      Start Free Trial
                    </Link>
                  </>
                )}
              </div>
            ) : (
              /* App Mobile Menu */
              user ? (
                <div className="space-y-4">
                  {/* Dashboard */}
                  <Link 
                    href="/dashboard" 
                    className="block text-white hover:text-purple-300 transition-colors py-2 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>

                  {/* Mobile Menu Categories */}
                  {menuItems.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="space-y-2">
                      <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                        {category.category}
                      </div>
                      {category.items.map((item, itemIndex) => (
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
                    {/* Mobile Upgrade Button */}
                    {shouldShowUpgrade && (
                      <Link 
                        href="/upgrade" 
                        className="block bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-white font-medium text-center mb-3"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Upgrade
                      </Link>
                    )}

                    {/* Mobile Sign Out */}
                    <button 
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2 font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-4">
                  <button 
                    onClick={() => {
                      handleSignIn();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-white font-medium"
                  >
                    Sign In
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </nav>


    </>
  );
} 