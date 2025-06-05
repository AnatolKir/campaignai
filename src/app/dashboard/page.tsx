"use client";

import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Smart Posting");
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);

  const tabs = [
    "Smart Posting",
    "Auto Engagement", 
    "DM Management",
    "Competitor Intel",
    "Schedule Manager"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Top Navigation */}
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Buttons */}
            <button 
              onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logo-32.png" alt="Campaign.ai" className="w-8 h-8" />
              </div>
              <span className="text-white font-bold text-xl">Campaign.ai</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-4">
            <Link href="/dashboard" className="text-white hover:text-purple-300 transition-colors">
              Dashboard
            </Link>
            <Link href="/accounts" className="text-gray-300 hover:text-white transition-colors">
              Accounts
            </Link>
            <Link href="/posts" className="text-gray-300 hover:text-white transition-colors">
              Posts
            </Link>
            <Link href="/engagement" className="text-gray-300 hover:text-white transition-colors">
              Engagement
            </Link>
            <Link href="/analytics" className="text-gray-300 hover:text-white transition-colors">
              Analytics
            </Link>
            <Link href="/monetize" className="text-gray-300 hover:text-white transition-colors">
              Monetize
            </Link>
            <Link href="/advertise" className="text-gray-300 hover:text-white transition-colors">
              Advertise
            </Link>
            <Link href="/training" className="text-gray-300 hover:text-white transition-colors">
              Training
            </Link>
            <Link href="/upgrade" className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-white">
              Upgrade to Pro
            </Link>
            <button className="text-gray-300 hover:text-white transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
} 