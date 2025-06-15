"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { UnifiedNavigation } from '../../../../components/UnifiedNavigation';
import { useTranslations } from 'next-intl';

interface PlatformData {
  name: string;
  icon: string;
  bgColor: string;
  isConnected: boolean;
  accountType: string;
  capabilities: string[];
  limitations: string | null;
  isBeta?: boolean;
  stats?: {
    followers: string;
    following: string;
    posts: string;
    engagement: string;
  };
}

interface TargetAccount {
  id: number;
  username: string;
  category: string;
  status: "active" | "paused" | "inactive";
  addedDate: string;
  notes?: string;
}

const platformsData: Record<string, PlatformData> = {
  instagram: {
    name: "Instagram",
    icon: "📷",
    bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    isConnected: true,
    stats: {
      followers: "8.7K",
      following: "652",
      posts: "342",
      engagement: "6.8%"
    },
    accountType: "Business/Creator Only",
    capabilities: ["Post content", "Manage comments", "Manage DMs", "Analytics"],
    limitations: "Personal accounts not supported"
  },
  twitter: {
    name: "X",
    icon: "𝕏",
    bgColor: "bg-black",
    isConnected: true,
    stats: {
      followers: "12.3K",
      following: "847",
      posts: "1,249",
      engagement: "4.2%"
    },
    accountType: "All Account Types",
    capabilities: ["Post content", "Manage comments/replies", "Manage DMs", "Analytics"],
    limitations: null
  },
  linkedin: {
    name: "LinkedIn",
    icon: "in",
    bgColor: "bg-blue-600",
    isConnected: true,
    stats: {
      followers: "3.2K",
      following: "428",
      posts: "89",
      engagement: "3.1%"
    },
    accountType: "Company Pages Only",
    capabilities: ["Post content", "Manage comments", "Analytics"],
    limitations: "Personal profiles not supported"
  },
  tiktok: {
    name: "TikTok",
    icon: "🎵",
    bgColor: "bg-black",
    isConnected: false,
    accountType: "Business/Creator Only",
    capabilities: ["Post content", "Manage comments", "Analytics"],
    limitations: "Personal accounts not supported"
  },
  youtube: {
    name: "YouTube",
    icon: "▶",
    bgColor: "bg-red-600",
    isConnected: false,
    accountType: "All Account Types",
    capabilities: ["Post videos", "Manage comments", "Analytics"],
    limitations: null
  },
  reddit: {
    name: "Reddit",
    icon: "🤖",
    bgColor: "bg-orange-600",
    isConnected: false,
    accountType: "All Account Types",
    capabilities: ["Post to Subreddits", "Manage comments", "Analytics"],
    limitations: null
  },
  discord: {
    name: "Discord",
    icon: "💬",
    bgColor: "bg-indigo-600",
    isConnected: false,
    accountType: "Bot Integration",
    capabilities: ["Send/receive messages", "Manage server content"],
    limitations: "Server-based only, not personal DMs"
  },
  telegram: {
    name: "Telegram",
    icon: "✈",
    bgColor: "bg-blue-500",
    isConnected: false,
    accountType: "Bot Integration",
    capabilities: ["Send/receive messages", "Manage channel content"],
    limitations: "Public channels/groups only, not personal DMs"
  },
  whatsapp: {
    name: "WhatsApp Business",
    icon: "📱",
    bgColor: "bg-green-600",
    isConnected: false,
    accountType: "Business Accounts Only",
    capabilities: ["Send messages", "Manage conversations", "Broadcast messages", "Analytics"],
    limitations: "Business accounts only, personal WhatsApp not supported"
  },
  threads: {
    name: "Threads",
    icon: "@",
    bgColor: "bg-black",
    isConnected: false,
    accountType: "Beta - Limited API",
    capabilities: ["Basic posting (limited)"],
    limitations: "Beta status - API functionality may be limited",
    isBeta: true
  }
};

export default function PlatformPage() {
  const t = useTranslations();
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const platform = params.platform as string;
  const platformData = platformsData[platform];

  const [activeTab, setActiveTab] = useState("overview");
  const [isAutomationEnabled, setIsAutomationEnabled] = useState(false);
  const [postingSchedule, setPostingSchedule] = useState("3x daily");
  const [suggestionMethod, setSuggestionMethod] = useState("email");
  const [contactInfo, setContactInfo] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  
  // Target Accounts Management
  const [importMethod, setImportMethod] = useState("paste");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pastedAccounts, setPastedAccounts] = useState("");
  const [targetAccounts, setTargetAccounts] = useState<TargetAccount[]>([
    { id: 1, username: "@TechGuru", category: "emulate", status: "active", addedDate: "2024-01-15", notes: "Great content strategy" },
    { id: 2, username: "@StartupFounder", category: "potential-customers", status: "active", addedDate: "2024-01-14" },
    { id: 3, username: "@InnovationHub", category: "engagement-targets", status: "active", addedDate: "2024-01-13" },
    { id: 4, username: "@DigitalMarketer", category: "industry-leaders", status: "paused", addedDate: "2024-01-12" },
  ]);
  const [filterCategory, setFilterCategory] = useState("all");
  const [manualUsername, setManualUsername] = useState("");

  // Handle URL parameters for direct linking from competitive intelligence
  useEffect(() => {
    const tab = searchParams.get('tab');
    const category = searchParams.get('category');
    const focus = searchParams.get('focus');

    if (tab === 'targets') {
      setActiveTab('targets');
    }
    
    if (category === 'competitors') {
      setSelectedCategory('competitors');
    }

    // Auto-scroll and highlight the competitors section if focus=true
    if (focus === 'true' && category === 'competitors') {
      setTimeout(() => {
        const element = document.querySelector('[data-competitors-highlight]');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  }, [searchParams]);

  // Account categories for targeting
  const accountCategories = [
    { id: "emulate", name: "Emulate", description: "Accounts to learn from and emulate their style", color: "bg-blue-500" },
    { id: "potential-customers", name: "Potential Customers", description: "Accounts that might be interested in your products/services", color: "bg-green-500" },
    { id: "engagement-targets", name: "Engagement Targets", description: "Accounts to actively engage with", color: "bg-purple-500" },
    { id: "industry-leaders", name: "Industry Leaders", description: "Key influencers and thought leaders in your industry", color: "bg-orange-500" },
    { id: "competitors", name: "Competitors", description: "Direct competitors to monitor and analyze", color: "bg-red-500" },
    { id: "partners", name: "Partners", description: "Potential collaboration partners", color: "bg-teal-500" },
    { id: "customers", name: "Existing Customers", description: "Current customers to maintain relationships with", color: "bg-indigo-500" }
  ];

  if (!platformData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <UnifiedNavigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Platform Not Found</h1>
            <p className="text-gray-400 mb-8">The platform "{platform}" is not supported.</p>
            <Link href="/accounts" className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-lg transition-colors">
              Back to Accounts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        processCSVData(text);
      };
      reader.readAsText(file);
    }
  };

  const processCSVData = (csvText: string) => {
    const lines = csvText.split('\n').filter(line => line.trim());
    const newAccounts: TargetAccount[] = [];
    
    lines.forEach((line, index) => {
      if (index === 0 && line.toLowerCase().includes('username')) return; // Skip header
      
      const [username, category, notes] = line.split(',').map(item => item.trim());
      if (username && username.startsWith('@')) {
        newAccounts.push({
          id: Date.now() + index,
          username,
          category: category || selectedCategory || 'engagement-targets',
          notes: notes || '',
          status: 'active',
          addedDate: new Date().toISOString().split('T')[0]
        });
      }
    });

    if (newAccounts.length > 0) {
      setTargetAccounts(prev => [...prev, ...newAccounts]);
      alert(`Successfully imported ${newAccounts.length} accounts!`);
    } else {
      alert('No valid accounts found in the uploaded file. Make sure usernames start with @');
    }
  };

  const handlePasteAccounts = () => {
    if (!pastedAccounts.trim()) return;
    
    const lines = pastedAccounts.split('\n').filter(line => line.trim());
    const newAccounts: TargetAccount[] = [];
    
    lines.forEach((line, index) => {
      const username = line.trim();
      if (username && (username.startsWith('@') || username.includes('/'))) {
        // Handle both @username and full URLs
        const cleanUsername = username.startsWith('@') ? username : '@' + username.split('/').pop();
        newAccounts.push({
          id: Date.now() + index,
          username: cleanUsername,
          category: selectedCategory || 'engagement-targets',
          status: 'active',
          addedDate: new Date().toISOString().split('T')[0]
        });
      }
    });

    if (newAccounts.length > 0) {
      setTargetAccounts(prev => [...prev, ...newAccounts]);
      setPastedAccounts('');
      alert(`Successfully added ${newAccounts.length} accounts!`);
    } else {
      alert('No valid accounts found. Make sure to include usernames or profile URLs.');
    }
  };

  const handleManualAdd = () => {
    if (!manualUsername.trim()) return;
    
    let username = manualUsername.trim();
    if (!username.startsWith('@')) {
      username = '@' + username;
    }

    const newAccount: TargetAccount = {
      id: Date.now(),
      username,
      category: selectedCategory || 'engagement-targets',
      status: 'active',
      addedDate: new Date().toISOString().split('T')[0]
    };

    setTargetAccounts(prev => [...prev, newAccount]);
    setManualUsername('');
  };

  const updateAccountCategory = (accountId: number, newCategory: string) => {
    setTargetAccounts(prev => 
      prev.map(account => 
        account.id === accountId ? { ...account, category: newCategory } : account
      )
    );
  };

  const removeAccount = (accountId: number) => {
    setTargetAccounts(prev => prev.filter(account => account.id !== accountId));
  };

  const getFilteredAccounts = () => {
    return filterCategory === 'all' 
      ? targetAccounts 
      : targetAccounts.filter(account => account.category === filterCategory);
  };

  const getCategoryColor = (categoryId: string) => {
    return accountCategories.find(cat => cat.id === categoryId)?.color || 'bg-gray-500';
  };

  const downloadAdvancedTemplate = () => {
    const csvContent = `Username,Category,Notes,Priority,Tags,Contact Info,Last Interaction,Engagement Score,Follower Count,Industry,Location,Bio Keywords,Content Themes,Posting Frequency,Best Engagement Times,Collaboration History,Relationship Status,Next Action,Internal Notes
@example_user,potential-customers,"High-value prospect in tech industry",High,"tech,startup,b2b",email@example.com,2024-01-15,8.5,15000,Technology,"San Francisco, CA","AI, SaaS, Innovation","Tech tutorials, Industry insights",Daily,"9AM, 2PM, 7PM",None,Cold Lead,"Send connection request","Met at TechCrunch event"
@industry_leader,emulate,"Top thought leader to learn from",High,"influencer,industry,leader",N/A,2024-01-10,9.2,50000,Technology,"New York, NY","Leadership, Strategy, Growth","Leadership tips, Industry analysis",3x/week,"8AM, 1PM, 6PM",None,Following,"Engage with content","Excellent engagement rates"
@competitor_brand,competitors,"Main competitor - monitor closely",Critical,"competitor,brand,monitor",N/A,2024-01-12,7.8,25000,Technology,"Austin, TX","Innovation, Products, Growth","Product launches, Company updates",2x/week,"10AM, 4PM",None,Monitoring,"Track new launches","Strong product marketing"
@potential_partner,partners,"Possible collaboration opportunity",Medium,"partnership,collaboration",partnerships@company.com,2024-01-08,6.5,8000,Marketing,"Los Angeles, CA","Marketing, Partnerships, Growth","Partnership case studies, Marketing tips",Weekly,"11AM, 3PM",Previous discussion,Warm Lead,"Follow up on proposal","Interested in co-marketing"`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${platform}_advanced_accounts_template.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadTemplate = (type: 'csv' | 'txt') => {
    let content = '';
    let filename = '';
    
    if (type === 'csv') {
      content = `Username,Category,Notes
@example_user,potential-customers,High-value prospect
@industry_leader,emulate,Top thought leader to learn from
@competitor_brand,competitors,Main competitor to monitor`;
      filename = `${platform}_accounts_template.csv`;
    } else {
      content = `@example_user
@industry_leader  
@competitor_brand
@potential_partner`;
      filename = `${platform}_accounts_template.txt`;
    }
    
    const blob = new Blob([content], { type: type === 'csv' ? 'text/csv' : 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleConnect = () => {
    // Simulate connection process
    alert(`Connecting to ${platformData.name}...`);
  };

  const handleDisconnect = () => {
    // Simulate disconnection process
    alert(`Disconnecting from ${platformData.name}...`);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Connection Status */}
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${platformData.bgColor} rounded-xl flex items-center justify-center text-white text-xl font-bold`}>
                    {platformData.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{platformData.name}</h2>
                    <p className="text-gray-400">{platformData.accountType}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {platformData.isConnected ? (
                    <>
                      <span className="flex items-center text-green-400">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        Connected
                      </span>
                      <button
                        onClick={handlePause}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          isPaused 
                            ? 'bg-green-600 hover:bg-green-700 text-white' 
                            : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                        }`}
                      >
                        {isPaused ? 'Resume' : 'Pause'}
                      </button>
                      <button
                        onClick={handleDisconnect}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="flex items-center text-gray-400">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                        Not Connected
                      </span>
                      <button
                        onClick={handleConnect}
                        className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Connect Account
                      </button>
                    </>
                  )}
                </div>
              </div>

              {platformData.isBeta && (
                <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-3 mb-4">
                  <div className="flex items-center text-orange-400">
                    <span className="text-sm font-medium">⚠️ Beta Platform</span>
                  </div>
                  <p className="text-orange-300 text-sm mt-1">
                    This platform is in beta. Features may be limited and subject to change.
                  </p>
                </div>
              )}

              {/* Account Stats */}
              {platformData.stats && platformData.isConnected && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{platformData.stats.followers}</div>
                    <div className="text-gray-400 text-sm">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{platformData.stats.following}</div>
                    <div className="text-gray-400 text-sm">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{platformData.stats.posts}</div>
                    <div className="text-gray-400 text-sm">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{platformData.stats.engagement}</div>
                    <div className="text-gray-400 text-sm">Engagement</div>
                  </div>
                </div>
              )}

              {/* Capabilities */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-3">Capabilities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {platformData.capabilities.map((capability, index) => (
                    <div key={index} className="flex items-center text-green-400">
                      <span className="mr-2">✓</span>
                      <span className="text-sm">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Limitations */}
              {platformData.limitations && (
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                  <div className="flex items-center text-yellow-400 mb-1">
                    <span className="text-sm font-medium">⚠️ Limitations</span>
                  </div>
                  <p className="text-yellow-300 text-sm">{platformData.limitations}</p>
                </div>
              )}
            </div>

            {/* Automation Settings */}
            {platformData.isConnected && (
              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Automation Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-white font-medium">Enable Automation</label>
                      <p className="text-gray-400 text-sm">Allow AI to post and engage automatically</p>
                    </div>
                    <button
                      onClick={() => setIsAutomationEnabled(!isAutomationEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        isAutomationEnabled ? 'bg-violet-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isAutomationEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {isAutomationEnabled && (
                    <>
                      <div>
                        <label className="block text-white font-medium mb-2">Posting Schedule</label>
                        <select
                          value={postingSchedule}
                          onChange={(e) => setPostingSchedule(e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                        >
                          <option value="1x daily">1x Daily</option>
                          <option value="2x daily">2x Daily</option>
                          <option value="3x daily">3x Daily</option>
                          <option value="custom">Custom Schedule</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Content Suggestions</label>
                        <select
                          value={suggestionMethod}
                          onChange={(e) => setSuggestionMethod(e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                        >
                          <option value="email">Email Notifications</option>
                          <option value="dashboard">Dashboard Only</option>
                          <option value="slack">Slack Integration</option>
                          <option value="auto">Auto-Post (Review Required)</option>
                        </select>
                      </div>

                      {suggestionMethod !== 'dashboard' && (
                        <div>
                          <label className="block text-white font-medium mb-2">Contact Information</label>
                          <input
                            type="text"
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                            placeholder="email@example.com or #slack-channel"
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case "targets":
        return (
          <div className="space-y-6">
            {/* Import Methods */}
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Add Target Accounts</h3>
              
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setImportMethod("paste")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    importMethod === "paste" 
                      ? 'bg-violet-600 text-white' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Paste List
                </button>
                <button
                  onClick={() => setImportMethod("upload")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    importMethod === "upload" 
                      ? 'bg-violet-600 text-white' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Upload CSV
                </button>
                <button
                  onClick={() => setImportMethod("manual")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    importMethod === "manual" 
                      ? 'bg-violet-600 text-white' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Add Manually
                </button>
              </div>

              {/* Category Selection */}
              <div className="mb-4">
                <label className="block text-white font-medium mb-2">Default Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Select a category...</option>
                  {accountCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} - {category.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Import Method Content */}
              {importMethod === "paste" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Paste Usernames or URLs (one per line)
                    </label>
                    <textarea
                      value={pastedAccounts}
                      onChange={(e) => setPastedAccounts(e.target.value)}
                      placeholder="@username1&#10;@username2&#10;https://platform.com/username3"
                      className="w-full h-32 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 resize-none"
                    />
                  </div>
                  <button
                    onClick={handlePasteAccounts}
                    disabled={!pastedAccounts.trim() || !selectedCategory}
                    className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Add Accounts
                  </button>
                </div>
              )}

              {importMethod === "upload" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Upload CSV File</label>
                    <input
                      type="file"
                      accept=".csv,.txt"
                      onChange={handleFileUpload}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white file:mr-4 file:py-1 file:px-2 file:rounded file:bg-violet-600 file:text-white hover:file:bg-violet-700"
                    />
                    <p className="text-gray-400 text-sm mt-1">
                      CSV format: Username, Category, Notes (header row optional)
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => downloadTemplate('csv')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Download CSV Template
                    </button>
                    <button
                      onClick={() => downloadTemplate('txt')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Download TXT Template
                    </button>
                    <button
                      onClick={downloadAdvancedTemplate}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Advanced Template
                    </button>
                  </div>
                </div>
              )}

              {importMethod === "manual" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Username</label>
                    <input
                      type="text"
                      value={manualUsername}
                      onChange={(e) => setManualUsername(e.target.value)}
                      placeholder="@username or profile URL"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400"
                    />
                  </div>
                  <button
                    onClick={handleManualAdd}
                    disabled={!manualUsername.trim() || !selectedCategory}
                    className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Add Account
                  </button>
                </div>
              )}
            </div>

            {/* Target Accounts List */}
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Target Accounts ({targetAccounts.length})</h3>
                
                <div className="flex items-center space-x-3">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm"
                  >
                    <option value="all">All Categories</option>
                    {accountCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Competitors Highlight Section */}
              <div data-competitors-highlight className="mb-6">
                {filterCategory === 'competitors' || filterCategory === 'all' ? (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-4">
                    <div className="flex items-center text-red-400 mb-2">
                      <span className="text-sm font-medium">🎯 Competitor Analysis</span>
                    </div>
                    <p className="text-red-300 text-sm mb-3">
                      These accounts are being monitored for competitive intelligence. 
                      <Link href="/competitive-intelligence" className="text-red-200 hover:text-white underline ml-1">
                        View detailed analysis →
                      </Link>
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="space-y-3">
                {getFilteredAccounts().map(account => (
                  <div key={account.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {account.username.charAt(1).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-white font-medium">{account.username}</div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded text-xs text-white ${getCategoryColor(account.category)}`}>
                              {accountCategories.find(cat => cat.id === account.category)?.name || account.category}
                            </span>
                            <span className="text-gray-400 text-xs">Added {account.addedDate}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <select
                          value={account.category}
                          onChange={(e) => updateAccountCategory(account.id, e.target.value)}
                          className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs"
                        >
                          {accountCategories.map(category => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        
                        <button
                          onClick={() => removeAccount(account.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                          title="Remove account"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    
                    {account.notes && (
                      <div className="mt-2 text-gray-400 text-sm">
                        {account.notes}
                      </div>
                    )}
                  </div>
                ))}
                
                {getFilteredAccounts().length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <p>No target accounts found.</p>
                    <p className="text-sm mt-1">Add some accounts using the methods above.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Analytics Coming Soon</h3>
              <p className="text-gray-400">
                Detailed analytics and performance metrics for your {platformData.name} account will be available here.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <UnifiedNavigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/accounts" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Accounts
            </Link>
            <div className="w-px h-6 bg-gray-600"></div>
            <h1 className="text-3xl font-bold">{platformData.name} Account</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-white/5 backdrop-blur-xl rounded-xl p-1 border border-white/10">
          {[
            { id: "overview", name: "Overview", icon: "📊" },
            { id: "targets", name: "Target Accounts", icon: "🎯" },
            { id: "analytics", name: "Analytics", icon: "📈" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-violet-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
} 