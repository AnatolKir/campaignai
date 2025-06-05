"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

interface CompetitorAccount {
  id: string;
  username: string;
  platform: string;
  followers?: number;
  verified?: boolean;
  dateAdded: Date;
}

type SocialPlatform = 
  | "twitter" 
  | "instagram" 
  | "linkedin" 
  | "tiktok" 
  | "youtube" 
  | "discord" 
  | "telegram" 
  | "reddit" 
  | "threads";

interface PlatformConfig {
  name: string;
  icon: string;
  color: string;
  placeholder: string;
  patterns: RegExp[];
}

const PLATFORM_CONFIGS: Record<SocialPlatform, PlatformConfig> = {
  twitter: {
    name: "Twitter/X",
    icon: "𝕏",
    color: "bg-black",
    placeholder: "@username, https://x.com/username, username",
    patterns: [
      /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)/g,
      /@([a-zA-Z0-9_]+)/g,
      /^([a-zA-Z0-9_]+)$/g
    ]
  },
  instagram: {
    name: "Instagram",
    icon: "📷",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    placeholder: "@username, https://instagram.com/username, username",
    patterns: [
      /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9_.]+)/g,
      /@([a-zA-Z0-9_.]+)/g,
      /^([a-zA-Z0-9_.]+)$/g
    ]
  },
  linkedin: {
    name: "LinkedIn",
    icon: "in",
    color: "bg-blue-600",
    placeholder: "https://linkedin.com/in/username, linkedin.com/company/company",
    patterns: [
      /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:in|company)\/([a-zA-Z0-9-]+)/g,
      /^([a-zA-Z0-9-]+)$/g
    ]
  },
  tiktok: {
    name: "TikTok",
    icon: "🎵",
    color: "bg-black",
    placeholder: "@username, https://tiktok.com/@username, username",
    patterns: [
      /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@([a-zA-Z0-9_.]+)/g,
      /@([a-zA-Z0-9_.]+)/g,
      /^([a-zA-Z0-9_.]+)$/g
    ]
  },
  youtube: {
    name: "YouTube",
    icon: "▶",
    color: "bg-red-600",
    placeholder: "https://youtube.com/@username, @username, channel-name",
    patterns: [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:@|c\/|channel\/)([a-zA-Z0-9_-]+)/g,
      /@([a-zA-Z0-9_-]+)/g,
      /^([a-zA-Z0-9_-]+)$/g
    ]
  },
  discord: {
    name: "Discord",
    icon: "💬",
    color: "bg-indigo-600",
    placeholder: "username#1234, user-id",
    patterns: [
      /([a-zA-Z0-9_]+)#(\d{4})/g,
      /^(\d{17,19})$/g
    ]
  },
  telegram: {
    name: "Telegram",
    icon: "✈",
    color: "bg-blue-500",
    placeholder: "@username, https://t.me/username, username",
    patterns: [
      /(?:https?:\/\/)?(?:www\.)?t\.me\/([a-zA-Z0-9_]+)/g,
      /@([a-zA-Z0-9_]+)/g,
      /^([a-zA-Z0-9_]+)$/g
    ]
  },
  reddit: {
    name: "Reddit",
    icon: "🤖",
    color: "bg-orange-600",
    placeholder: "u/username, https://reddit.com/u/username, username",
    patterns: [
      /(?:https?:\/\/)?(?:www\.)?reddit\.com\/u\/([a-zA-Z0-9_-]+)/g,
      /u\/([a-zA-Z0-9_-]+)/g,
      /^([a-zA-Z0-9_-]+)$/g
    ]
  },
  threads: {
    name: "Threads",
    icon: "@",
    color: "bg-black",
    placeholder: "@username, https://threads.net/@username, username",
    patterns: [
      /(?:https?:\/\/)?(?:www\.)?threads\.net\/@([a-zA-Z0-9_.]+)/g,
      /@([a-zA-Z0-9_.]+)/g,
      /^([a-zA-Z0-9_.]+)$/g
    ]
  }
};

export default function CompetitorIntel() {
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>("twitter");
  const [accounts, setAccounts] = useState<CompetitorAccount[]>([]);
  const [textInput, setTextInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [showAccountList, setShowAccountList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"username" | "dateAdded" | "followers">("dateAdded");
  const [filterPlatform, setFilterPlatform] = useState<SocialPlatform | "all">("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extractUsernames = useCallback((text: string, platform: SocialPlatform): string[] => {
    const config = PLATFORM_CONFIGS[platform];
    const usernames = new Set<string>();
    
    config.patterns.forEach(pattern => {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        if (match[1]) {
          usernames.add(match[1].toLowerCase());
        }
      }
    });

    // Also try splitting by common separators
    const separators = /[,\n\r\t\s;|]+/;
    const parts = text.split(separators).filter(part => part.trim());
    
    parts.forEach(part => {
      const trimmed = part.trim();
      if (trimmed) {
        config.patterns.forEach(pattern => {
          const match = trimmed.match(pattern);
          if (match && match[1]) {
            usernames.add(match[1].toLowerCase());
          }
        });
      }
    });

    return Array.from(usernames);
  }, []);

  const addAccounts = useCallback((usernames: string[], platform: SocialPlatform) => {
    const newAccounts: CompetitorAccount[] = usernames
      .filter(username => 
        username && 
        !accounts.some(acc => 
          acc.username.toLowerCase() === username.toLowerCase() && 
          acc.platform === platform
        )
      )
      .slice(0, 10000 - accounts.length) // Respect the 10k limit
      .map(username => ({
        id: `${platform}-${username}-${Date.now()}-${Math.random()}`,
        username: username,
        platform: platform,
        dateAdded: new Date()
      }));

    setAccounts(prev => [...prev, ...newAccounts]);
    return newAccounts.length;
  }, [accounts]);

  const handleTextSubmit = () => {
    if (!textInput.trim()) return;
    
    const usernames = extractUsernames(textInput, selectedPlatform);
    const added = addAccounts(usernames, selectedPlatform);
    
    if (added > 0) {
      setTextInput("");
      alert(`Successfully added ${added} accounts!`);
    } else {
      alert("No new accounts found or limit reached.");
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const usernames = extractUsernames(content, selectedPlatform);
      const added = addAccounts(usernames, selectedPlatform);
      
      if (added > 0) {
        alert(`Successfully imported ${added} accounts from ${file.name}!`);
      } else {
        alert("No new accounts found in file or limit reached.");
      }
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      if (file.type === "text/plain" || file.type === "text/csv" || file.name.endsWith('.txt') || file.name.endsWith('.csv')) {
        handleFileUpload(file);
      }
    });
  };

  const removeAccount = (id: string) => {
    setAccounts(prev => prev.filter(acc => acc.id !== id));
  };

  const downloadAccountList = () => {
    const csvContent = [
      "Username,Platform,Date Added",
      ...accounts.map(acc => `${acc.username},${acc.platform},${acc.dateAdded.toISOString()}`)
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `competitor-accounts-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredAccounts = accounts
    .filter(acc => 
      (searchQuery === "" || 
       acc.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
       acc.platform.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterPlatform === "all" || acc.platform === filterPlatform)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "username":
          return a.username.localeCompare(b.username);
        case "followers":
          return (b.followers || 0) - (a.followers || 0);
        case "dateAdded":
        default:
          return b.dateAdded.getTime() - a.dateAdded.getTime();
      }
    });

  const currentPlatformConfig = PLATFORM_CONFIGS[selectedPlatform];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Top Navigation */}
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-white font-bold text-xl">Campaign.ai</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
              Dashboard
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
            <Link href="/training" className="text-gray-300 hover:text-white transition-colors">
              Training
            </Link>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
              Upgrade to Pro
            </button>
            <button className="text-gray-300 hover:text-white transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <div className="p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-3xl p-6 border border-white/10 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">🔍</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Competitor Intelligence</h1>
                <p className="text-gray-300">Monitor and analyze competitor accounts across social platforms</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-gray-300">Tracking {accounts.length}/10,000 accounts</span>
                  <span className="text-sm text-gray-300">
                    {Object.keys(PLATFORM_CONFIGS).filter(platform => 
                      accounts.some(acc => acc.platform === platform)
                    ).length} platforms active
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowAccountList(!showAccountList)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                {showAccountList ? "Hide" : "View"} Account List ({accounts.length})
              </button>
              {accounts.length > 0 && (
                <button
                  onClick={downloadAccountList}
                  className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-2 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all"
                >
                  Download List
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Import Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Platform Selection */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Select Social Media Platform</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(PLATFORM_CONFIGS).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPlatform(key as SocialPlatform)}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                      selectedPlatform === key
                        ? "border-purple-500 bg-purple-500/20"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className={`w-8 h-8 ${config.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">{config.icon}</span>
                    </div>
                    <span className="text-white text-sm">{config.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Text Input */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Paste Account List</h3>
              <p className="text-gray-300 text-sm mb-4">
                Paste usernames, URLs, or handles. We'll automatically detect and extract valid accounts for {currentPlatformConfig.name}.
              </p>
              <div className="space-y-4">
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder={currentPlatformConfig.placeholder}
                  className="w-full h-32 bg-black/20 border border-white/10 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {extractUsernames(textInput, selectedPlatform).length} accounts detected
                  </span>
                  <button
                    onClick={handleTextSubmit}
                    disabled={!textInput.trim()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Accounts
                  </button>
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Upload File</h3>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  isDragging 
                    ? "border-purple-500 bg-purple-500/10" 
                    : "border-white/20 hover:border-white/40"
                }`}
              >
                <div className="space-y-4">
                  <div className="text-4xl">📁</div>
                  <div>
                    <p className="text-white font-medium">Drop files here or click to browse</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Supports .txt, .csv files with account lists
                    </p>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    Choose Files
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".txt,.csv"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      files.forEach(handleFileUpload);
                    }}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Platform Breakdown</h3>
              <div className="space-y-3">
                {Object.entries(PLATFORM_CONFIGS).map(([key, config]) => {
                  const count = accounts.filter(acc => acc.platform === key).length;
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 ${config.color} rounded-lg flex items-center justify-center`}>
                          <span className="text-white text-xs">{config.icon}</span>
                        </div>
                        <span className="text-gray-300 text-sm">{config.name}</span>
                      </div>
                      <span className="text-white font-medium">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Accounts</span>
                  <span className="text-white font-bold">{accounts.length.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Remaining Slots</span>
                  <span className="text-white font-bold">{(10000 - accounts.length).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Active Platforms</span>
                  <span className="text-white font-bold">
                    {Object.keys(PLATFORM_CONFIGS).filter(platform => 
                      accounts.some(acc => acc.platform === platform)
                    ).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account List Modal/Section */}
        {showAccountList && (
          <div className="mt-6 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Account List ({accounts.length})</h3>
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Search accounts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <select
                  value={filterPlatform}
                  onChange={(e) => setFilterPlatform(e.target.value as SocialPlatform | "all")}
                  className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="all">All Platforms</option>
                  {Object.entries(PLATFORM_CONFIGS).map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.name}
                    </option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="dateAdded">Sort by Date Added</option>
                  <option value="username">Sort by Username</option>
                  <option value="followers">Sort by Followers</option>
                </select>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-2">
              {filteredAccounts.map((account) => {
                const config = PLATFORM_CONFIGS[account.platform as SocialPlatform];
                return (
                  <div key={account.id} className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${config.color} rounded-lg flex items-center justify-center`}>
                        <span className="text-white text-xs">{config.icon}</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">@{account.username}</div>
                        <div className="text-gray-400 text-sm">{config.name} • Added {account.dateAdded.toLocaleDateString()}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeAccount(account.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
              {filteredAccounts.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  {searchQuery ? "No accounts match your search." : "No accounts added yet."}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 