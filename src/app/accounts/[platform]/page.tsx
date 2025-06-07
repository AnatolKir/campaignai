"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";

interface PlatformData {
  name: string;
  icon: string;
  bgColor: string;
  isConnected: boolean;
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
  notes?: string;
  status: "active" | "paused" | "inactive";
  addedDate: string;
}

const platformsData: Record<string, PlatformData> = {
  twitter: {
    name: "Twitter/X",
    icon: "𝕏",
    bgColor: "bg-black",
    isConnected: true,
    stats: {
      followers: "12.3K",
      following: "847",
      posts: "1,249",
      engagement: "4.2%"
    }
  },
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
    }
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
    }
  },
  tiktok: {
    name: "TikTok",
    icon: "🎵",
    bgColor: "bg-black",
    isConnected: false
  },
  youtube: {
    name: "YouTube",
    icon: "▶",
    bgColor: "bg-red-600",
    isConnected: false
  },
  discord: {
    name: "Discord",
    icon: "💬",
    bgColor: "bg-indigo-600",
    isConnected: false
  },
  telegram: {
    name: "Telegram",
    icon: "✈",
    bgColor: "bg-blue-500",
    isConnected: false
  },
  reddit: {
    name: "Reddit",
    icon: "🤖",
    bgColor: "bg-orange-600",
    isConnected: false
  },
  threads: {
    name: "Threads",
    icon: "@",
    bgColor: "bg-black",
    isConnected: false
  }
};

export default function PlatformPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const platform = params.platform as string;
  const platformData = platformsData[platform];

  const [activeTab, setActiveTab] = useState("overview");
  const [isAutomationEnabled, setIsAutomationEnabled] = useState(false);
  const [postingSchedule, setPostingSchedule] = useState("3x daily");
  const [suggestionMethod, setSuggestionMethod] = useState("telegram");
  const [contactInfo, setContactInfo] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  
  // Target Accounts Management
  const [importMethod, setImportMethod] = useState("paste");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pastedAccounts, setPastedAccounts] = useState("");
  const [targetAccounts, setTargetAccounts] = useState([
    { id: 1, username: "@TechGuru", category: "emulate", status: "active", addedDate: "2024-01-15" },
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
    { id: "competitors", label: "Competitors", color: "red", description: "Accounts to monitor and analyze" },
    { id: "emulate", label: "Accounts to Emulate", color: "purple", description: "Role models and inspiration sources" },
    { id: "engagement-targets", label: "Engagement Targets", color: "blue", description: "Accounts you want engagement from" },
    { id: "potential-customers", label: "Potential Customers", color: "green", description: "Leads and prospects" },
    { id: "industry-leaders", label: "Industry Leaders", color: "orange", description: "Thought leaders and experts" },
    { id: "influencers", label: "Influencers", color: "cyan", description: "Content creators and influencers" },
    { id: "partners", label: "Partners/Collaborators", color: "indigo", description: "Business partners and collaborators" },
    { id: "media", label: "Media Contacts", color: "emerald", description: "Journalists and media contacts" },
  ];

  // Helper functions
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvText = e.target?.result as string;
        processCSVData(csvText);
      };
      reader.readAsText(file);
    }
  };

  const processCSVData = (csvText: string) => {
    try {
      // Filter out comment lines (starting with #) and empty lines
      const allLines = csvText.trim().split('\n');
      const lines = allLines.filter(line => {
        const trimmed = line.trim();
        return trimmed && !trimmed.startsWith('#');
      });

      if (lines.length < 2) {
        alert('CSV file must contain at least a header row and one data row');
        return;
      }

      const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
      
      // Validate required columns
      if (!headers.includes('username') || !headers.includes('category')) {
        alert('CSV must contain "username" and "category" columns');
        return;
      }

      const usernameIndex = headers.indexOf('username');
      const categoryIndex = headers.indexOf('category');
      const notesIndex = headers.indexOf('notes');

      const validCategories = accountCategories.map(cat => cat.id);
      const newAccounts: TargetAccount[] = [];
      const errors: string[] = [];
      let processedRows = 0;

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue; // Skip empty lines
        
        // Handle CSV parsing with proper quote handling
        const values = line.split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
        
        if (values.length < 2) {
          errors.push(`Row ${i + 1}: Invalid format - needs at least username and category`);
          continue;
        }

        processedRows++;
        const rawUsername = values[usernameIndex]?.trim();
        if (!rawUsername) {
          errors.push(`Row ${i + 1}: Username is required`);
          continue;
        }

        const username = rawUsername.startsWith('@') 
          ? rawUsername 
          : `@${rawUsername}`;
        const category = values[categoryIndex]?.toLowerCase().trim();
        const notes = notesIndex >= 0 && values[notesIndex] ? values[notesIndex].trim() : '';

        // Validate category
        if (!validCategories.includes(category)) {
          errors.push(`Row ${i + 1}: Invalid category "${values[categoryIndex]}". Must be one of: ${validCategories.join(', ')}`);
          continue;
        }

        // Check for duplicates in existing accounts
        if (targetAccounts.some(acc => acc.username.toLowerCase() === username.toLowerCase())) {
          errors.push(`Row ${i + 1}: Account "${username}" already exists in your target list`);
          continue;
        }

        // Check for duplicates within the CSV being processed
        if (newAccounts.some(acc => acc.username.toLowerCase() === username.toLowerCase())) {
          errors.push(`Row ${i + 1}: Duplicate account "${username}" found in CSV`);
          continue;
        }

        newAccounts.push({
          id: Date.now() + i + Math.random(), // Ensure unique IDs
          username,
          category,
          notes,
          status: "active" as const,
          addedDate: new Date().toISOString().split('T')[0]
        });
      }

      // Show detailed results
      let message = `CSV Processing Results:\n`;
      message += `• Total rows processed: ${processedRows}\n`;
      message += `• Successfully imported: ${newAccounts.length}\n`;
      message += `• Errors/Skipped: ${errors.length}\n`;

      if (errors.length > 0) {
        message += `\nErrors:\n${errors.slice(0, 10).join('\n')}`;
        if (errors.length > 10) {
          message += `\n... and ${errors.length - 10} more errors`;
        }
      }

      if (newAccounts.length > 0) {
        setTargetAccounts([...targetAccounts, ...newAccounts]);
        message += `\n✅ ${newAccounts.length} accounts successfully added!`;
      }

      alert(message);
    } catch (error) {
      console.error('CSV processing error:', error);
      alert('Error processing CSV file. Please check the format and try again.\n\nMake sure your CSV has the columns: username, category, notes');
    }
  };

  const handlePasteAccounts = () => {
    if (!pastedAccounts.trim()) return;
    if (!selectedCategory) {
      alert('Please select a category first');
      return;
    }
    
    const usernames = pastedAccounts
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => line.startsWith('@') ? line : `@${line}`);
    
    const newAccounts = usernames.map((username, index) => ({
      id: Date.now() + index,
      username,
      category: selectedCategory,
      status: "active" as const,
      addedDate: new Date().toISOString().split('T')[0]
    }));
    
    setTargetAccounts([...targetAccounts, ...newAccounts]);
    setPastedAccounts("");
    alert(`Added ${newAccounts.length} accounts to ${accountCategories.find(c => c.id === selectedCategory)?.label}`);
  };

  const handleManualAdd = () => {
    if (!manualUsername.trim()) return;
    if (!selectedCategory) {
      alert('Please select a category first');
      return;
    }
    
    const username = manualUsername.startsWith('@') ? manualUsername : `@${manualUsername}`;
    
    // Check if account already exists
    if (targetAccounts.some(acc => acc.username.toLowerCase() === username.toLowerCase())) {
      alert('This account is already in your target list');
      return;
    }
    
    const newAccount = {
      id: Date.now(),
      username,
      category: selectedCategory,
      status: "active" as const,
      addedDate: new Date().toISOString().split('T')[0]
    };
    
    setTargetAccounts([...targetAccounts, newAccount]);
    setManualUsername("");
    alert(`Added ${username} to ${accountCategories.find(c => c.id === selectedCategory)?.label}`);
  };

  const updateAccountCategory = (accountId: number, newCategory: string) => {
    setTargetAccounts(targetAccounts.map(account => 
      account.id === accountId ? { ...account, category: newCategory } : account
    ));
  };

  const removeAccount = (accountId: number) => {
    setTargetAccounts(targetAccounts.filter(account => account.id !== accountId));
  };

  const getFilteredAccounts = () => {
    if (filterCategory === "all") return targetAccounts;
    return targetAccounts.filter(account => account.category === filterCategory);
  };

  const getCategoryColor = (categoryId: string) => {
    const category = accountCategories.find(c => c.id === categoryId);
    return category?.color || "gray";
  };

  const downloadAdvancedTemplate = () => {
    // Create Excel-like content with multiple "sheets" as separate CSV files in a zip-like structure
    // For now, we'll create a comprehensive CSV with detailed instructions as comments
    
    const instructionsContent = `# CAMPAIGN.AI TARGET ACCOUNTS TEMPLATE - INSTRUCTIONS
# 
# This file contains instructions for importing target accounts.
# Delete these instruction lines before uploading your data.
#
# REQUIRED COLUMNS:
# - username: The social media handle (@ symbol optional)
# - category: Must match one of the valid categories exactly
# - notes: Optional description or notes about the account
#
# VALID CATEGORIES (case-sensitive):
# - competitors: Accounts to monitor and analyze
# - industry-leaders: Thought leaders and experts  
# - emulate: Role models and inspiration sources
# - engagement-targets: Accounts you want engagement from
# - potential-customers: Leads and prospects
# - influencers: Content creators and influencers
# - partners: Business partners and collaborators
# - media: Journalists and media contacts
#
# IMPORTANT NOTES:
# 1. Categories must match exactly (lowercase, with hyphens)
# 2. Username can include @ symbol or not - we'll add it automatically
# 3. Notes column is optional but recommended for organization
# 4. Delete all lines starting with # before uploading
# 5. Keep the header row (username,category,notes)
#
# EXAMPLE DATA (remove these examples and add your own):

username,category,notes
@techinfluencer,competitors,Main competitor in our space - posts 3x daily
@industryleader,industry-leaders,Thought leader with 50K followers
@startupfounder,emulate,Excellent engagement rate and content style
@targetaudience1,engagement-targets,Active in our community discussions
@prospectceo,potential-customers,CEO of enterprise client prospect
@contentcreator,influencers,Tech influencer with 100K followers
@businesspartner,partners,Potential strategic partnership
@journalist1,media,TechCrunch writer covering our industry
competitor2,competitors,Secondary competitor - different strategy
thoughtleader2,industry-leaders,Expert in AI/ML with valuable insights
inspirationacct,emulate,Great visual content and storytelling
@engagementtarget2,engagement-targets,High-engagement community member
leadprospect,potential-customers,Qualified lead from recent conference
@topinfluencer,influencers,Major tech influencer for collaboration
partnercompany,partners,SaaS company for integration partnership
@technews,media,Tech news outlet for press coverage`;

    const dataOnlyTemplate = `username,category,notes
@techinfluencer,competitors,Main competitor in our space
@industryleader,industry-leaders,Thought leader with great insights
@startupfounder,emulate,Great content style to learn from
@targetaudience1,engagement-targets,High-value account for engagement
@prospectceo,potential-customers,CEO of target company
@contentcreator,influencers,Popular content creator in our niche
@businesspartner,partners,Potential collaboration partner
@journalist1,media,Tech journalist for outreach
competitor2,competitors,Secondary competitor to watch
thoughtleader2,industry-leaders,Expert in our field
inspirationacct,emulate,Account with excellent engagement
@engagementtarget2,engagement-targets,Active community member
leadprospect,potential-customers,Qualified lead from conference
@topinfluencer,influencers,Major influencer in tech space
partnercompany,partners,Strategic partnership opportunity
@technews,media,Tech news outlet contact`;

    // Create the comprehensive template with instructions
    const blob = new Blob([instructionsContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${platformData.name.toLowerCase()}-accounts-template-with-instructions.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    // Also create a clean data-only version
    setTimeout(() => {
      const dataBlob = new Blob([dataOnlyTemplate], { type: 'text/csv' });
      const dataUrl = window.URL.createObjectURL(dataBlob);
      const dataLink = document.createElement('a');
      dataLink.href = dataUrl;
      dataLink.download = `${platformData.name.toLowerCase()}-accounts-template-clean.csv`;
      dataLink.click();
      window.URL.revokeObjectURL(dataUrl);
    }, 500);

    alert('Downloaded 2 files:\n1. Template with instructions (recommended for first-time users)\n2. Clean template (for experienced users)');
  };

  const downloadTemplate = (type: 'csv' | 'txt') => {
    if (type === 'csv') {
      downloadAdvancedTemplate();
    } else {
      const txtContent = `@techguru
@startupfound
@innovationhub
@competitor1`;
      
      const blob = new Blob([txtContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${platformData.name.toLowerCase()}-target-accounts-template.txt`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  if (!platformData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Platform Not Found</h1>
          <Link href="/accounts" className="text-purple-400 hover:text-purple-300">
            ← Back to Accounts
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "automation", label: "AI Automation" },
    { id: "targets", label: "Target Accounts" },
    { id: "analytics", label: "Analytics" },
    { id: "settings", label: "Settings" }
  ];

  const handleConnect = () => {
    alert(`Connecting to ${platformData.name}... This would initiate OAuth flow in a real app.`);
  };

  const handleDisconnect = () => {
    if (confirm(`Are you sure you want to disconnect from ${platformData.name}?`)) {
      alert(`Disconnected from ${platformData.name}`);
    }
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    alert(`AI automation ${!isPaused ? 'paused' : 'reactivated'} for ${platformData.name}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Account Stats */}
            {platformData.isConnected && platformData.stats && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <h3 className="text-gray-300 text-sm mb-2">Followers</h3>
                  <div className="text-3xl font-bold text-white">{platformData.stats.followers}</div>
                  <div className="text-green-400 text-sm">+12% this month</div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <h3 className="text-gray-300 text-sm mb-2">Following</h3>
                  <div className="text-3xl font-bold text-white">{platformData.stats.following}</div>
                  <div className="text-blue-400 text-sm">Active engagement</div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <h3 className="text-gray-300 text-sm mb-2">Posts</h3>
                  <div className="text-3xl font-bold text-white">{platformData.stats.posts}</div>
                  <div className="text-purple-400 text-sm">AI generated: 68%</div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <h3 className="text-gray-300 text-sm mb-2">Engagement</h3>
                  <div className="text-3xl font-bold text-white">{platformData.stats.engagement}</div>
                  <div className="text-green-400 text-sm">Above average</div>
                </div>
              </div>
            )}

            {/* Recent Activity */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
              {platformData.isConnected ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-green-400">✓</span>
                      <span className="text-white">AI posted: &quot;Exciting developments in tech...&quot;</span>
                    </div>
                    <span className="text-gray-400 text-sm">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-blue-400">↗</span>
                      <span className="text-white">Engaged with @TechInfluencer's post</span>
                    </div>
                    <span className="text-gray-400 text-sm">4 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-purple-400">💬</span>
                      <span className="text-white">AI responded to 3 DMs</span>
                    </div>
                    <span className="text-gray-400 text-sm">6 hours ago</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">Connect your account to see activity</p>
                  <button 
                    onClick={handleConnect}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-lg text-white hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    Connect {platformData.name}
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case "automation":
        return (
          <div className="space-y-6">
            {/* Paused Notice */}
            {isPaused && (
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-yellow-400 text-xl">⏸️</span>
                  <div>
                    <h4 className="text-yellow-400 font-semibold text-sm">AI Automation Paused</h4>
                    <p className="text-yellow-300 text-sm mt-1">
                      All AI activities are temporarily disabled. Reactivate automation to make changes to these settings.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Automation Toggle */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">AI Automation</h3>
                  <p className="text-gray-400">
                    {isPaused 
                      ? 'AI automation is currently paused' 
                      : isAutomationEnabled 
                      ? 'AI will post automatically on your behalf' 
                      : 'AI will send you suggestions for approval'
                    }
                  </p>
                </div>
                <button 
                  onClick={() => setIsAutomationEnabled(!isAutomationEnabled)}
                  disabled={isPaused}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isPaused 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : isAutomationEnabled 
                      ? 'bg-purple-600' 
                      : 'bg-gray-600'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAutomationEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {/* Mode-specific content */}
              {isAutomationEnabled ? (
                /* Full Automation Mode */
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-red-400 text-xl">⚠️</span>
                    <div>
                      <h4 className="text-red-400 font-semibold text-sm">Full Automation Enabled</h4>
                      <p className="text-red-300 text-sm mt-1">
                        AI will automatically post content on your behalf without approval. 
                        <strong> AIs can and do make mistakes.</strong> Please review your content preferences carefully.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Suggestion Mode */
                <div className="space-y-4">
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-blue-400 text-xl">💡</span>
                      <div>
                        <h4 className="text-blue-400 font-semibold text-sm">SUGGESTION MODE</h4>
                        <p className="text-blue-300 text-sm mt-1">
                          Campaign.ai will send you suggestions that you can approve, deny, or ask for changes.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Method Selection */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="text-white font-semibold mb-3">How would you like to receive suggestions?</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button
                          onClick={() => setSuggestionMethod("telegram")}
                          className={`p-3 rounded-lg border transition-all flex items-center space-x-3 ${
                            suggestionMethod === "telegram"
                              ? 'border-blue-500 bg-blue-500/20 text-white'
                              : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/30'
                          }`}
                        >
                          <span className="text-lg">✈️</span>
                          <span className="font-medium">Telegram</span>
                        </button>
                        <button
                          onClick={() => setSuggestionMethod("whatsapp")}
                          className={`p-3 rounded-lg border transition-all flex items-center space-x-3 ${
                            suggestionMethod === "whatsapp"
                              ? 'border-green-500 bg-green-500/20 text-white'
                              : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/30'
                          }`}
                        >
                          <span className="text-lg">📱</span>
                          <span className="font-medium">WhatsApp</span>
                        </button>
                        <button
                          onClick={() => setSuggestionMethod("discord")}
                          className={`p-3 rounded-lg border transition-all flex items-center space-x-3 ${
                            suggestionMethod === "discord"
                              ? 'border-indigo-500 bg-indigo-500/20 text-white'
                              : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/30'
                          }`}
                        >
                          <span className="text-lg">💬</span>
                          <span className="font-medium">Discord</span>
                        </button>
                      </div>
                      
                      {/* Contact Input */}
                      <div className="mt-4">
                        <label className="block text-white text-sm font-medium mb-2">
                          {suggestionMethod === "telegram" && "Telegram Username or Phone"}
                          {suggestionMethod === "whatsapp" && "WhatsApp Phone Number"}
                          {suggestionMethod === "discord" && "Discord Username"}
                        </label>
                        <input
                          type="text"
                          value={contactInfo}
                          onChange={(e) => setContactInfo(e.target.value)}
                          placeholder={
                            suggestionMethod === "telegram" ? "@username or +1234567890" :
                            suggestionMethod === "whatsapp" ? "+1234567890" :
                            "username#1234"
                          }
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Posting Schedule - Only show in automation mode */}
            {isAutomationEnabled && (
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Posting Schedule</h3>
                <p className="text-gray-400 text-sm mb-4">How often should AI post on your behalf?</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["1x daily", "3x daily", "5x daily"].map((schedule) => (
                    <button
                      key={schedule}
                      onClick={() => setPostingSchedule(schedule)}
                      className={`p-4 rounded-lg border transition-all ${
                        postingSchedule === schedule
                          ? 'border-purple-500 bg-purple-500/20 text-white'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                      }`}
                    >
                      {schedule}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Content Preferences */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Content Preferences</h3>
              <p className="text-gray-400 text-sm mb-4">
                {isAutomationEnabled 
                  ? "What types of content should AI automatically post?"
                  : "What types of content suggestions would you like to receive?"
                }
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white">Industry insights</span>
                  <input type="checkbox" defaultChecked className="rounded text-purple-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Company updates</span>
                  <input type="checkbox" defaultChecked className="rounded text-purple-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Engagement posts</span>
                  <input type="checkbox" defaultChecked className="rounded text-purple-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Trending topics</span>
                  <input type="checkbox" className="rounded text-purple-600" />
                </div>
              </div>
            </div>

            {/* Suggestion Mode Instructions */}
            {!isAutomationEnabled && (
              <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">How Suggestions Work</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-400 mt-1">1.</span>
                    <p className="text-gray-300">AI generates content suggestions based on your preferences</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-400 mt-1">2.</span>
                    <p className="text-gray-300">You receive suggestions via your chosen communication method</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-400 mt-1">3.</span>
                    <p className="text-gray-300">Respond with "Approve", "Deny", or request changes</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-400 mt-1">4.</span>
                    <p className="text-gray-300">Only approved content gets posted to your account</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "targets":
        return (
          <div className="space-y-6">
            {/* Competitor Management Notice */}
            <div className={`bg-red-500/10 border border-red-500/30 rounded-xl p-6 ${
              searchParams.get('focus') === 'true' && searchParams.get('category') === 'competitors' 
                ? 'animate-pulse ring-4 ring-red-400/50' 
                : ''
            }`} data-competitors-highlight>
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🎯</div>
                <div className="flex-1">
                  <h3 className="text-red-400 font-bold text-lg mb-2">
                    🔥 COMPETITOR MANAGEMENT IS HERE!
                  </h3>
                  <p className="text-gray-300 mb-3">
                    <strong>Add competitors in 3 simple steps:</strong>
                  </p>
                  <ol className="text-gray-300 space-y-1 mb-4">
                    <li>1. Choose any import method below (Paste, CSV, TXT, or Manual)</li>
                    <li>2. Select <strong className="text-red-400">"Competitors"</strong> from the category dropdown</li>
                    <li>3. Add your competitor handles and you're done!</li>
                  </ol>
                  <div className="bg-red-500/20 rounded-lg p-3">
                    <p className="text-red-300 text-sm mb-2">
                      💡 <strong>Pro tip:</strong> Once added here, you can:
                    </p>
                    <ol className="text-red-300 text-sm space-y-1 ml-4">
                      <li>1. Further categorize them as "Direct Competitors," "Market Leaders," etc.</li>
                      <li>2. View detailed competitive analysis and insights</li>
                    </ol>
                    <p className="text-red-300 text-sm mt-2">
                      Visit <Link href="/competitive-intelligence" className="text-red-300 hover:text-red-200 underline font-bold">
                        Competitive Intelligence
                      </Link> to organize and analyze your competitors.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Import Methods */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Add Target Accounts</h3>
              
              {/* Import Method Selection */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
                {["paste", "upload-csv", "upload-txt", "manual"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setImportMethod(method)}
                    className={`p-3 rounded-lg border transition-all ${
                      importMethod === method
                        ? 'border-purple-500 bg-purple-500/20 text-white'
                        : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/30'
                    }`}
                  >
                    {method === "paste" && "📋 Paste List"}
                    {method === "upload-csv" && "📊 Upload CSV"}
                    {method === "upload-txt" && "📄 Upload TXT"}
                    {method === "manual" && "✋ Add Manually"}
                  </button>
                ))}
              </div>

              {/* Category Selection - Only show for non-CSV methods */}
              {importMethod !== "upload-csv" && (
                <div className="mb-6">
                  <label className="block text-white text-sm font-medium mb-3">
                    Account Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`w-full bg-white/5 border rounded-lg px-4 py-2 text-white focus:outline-none ${
                      selectedCategory 
                        ? 'border-white/10 focus:border-purple-500' 
                        : 'border-red-500/50 focus:border-red-500'
                    }`}
                    required
                  >
                    <option value="" className="bg-gray-800 text-gray-400">
                      Choose one...
                    </option>
                    <option value="competitors" className="bg-red-600 text-white font-bold">
                      🔥 COMPETITORS - Accounts to monitor and analyze (RECOMMENDED FOR COMPETITIVE INTEL)
                    </option>
                    {accountCategories.filter(cat => cat.id !== 'competitors').map((category) => (
                      <option key={category.id} value={category.id} className="bg-gray-800">
                        {category.label} - {category.description}
                      </option>
                    ))}
                  </select>
                  {!selectedCategory && (
                    <p className="text-red-400 text-sm mt-1">Please select a category for your accounts</p>
                  )}
                  {selectedCategory === 'competitors' && (
                    <div className="mt-2 p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                      <p className="text-red-300 text-sm">
                        ✅ <strong>Perfect choice!</strong> Competitors added here will automatically appear in your Competitive Intelligence dashboard.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Import Method Content */}
              {importMethod === "paste" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Paste Account Handles (one per line)
                    </label>
                    <textarea
                      value={pastedAccounts}
                      onChange={(e) => setPastedAccounts(e.target.value)}
                      placeholder={selectedCategory ? "@username1&#10;@username2&#10;username3&#10;@username4" : "Please select a category first"}
                      rows={6}
                      disabled={!selectedCategory}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <button 
                    onClick={handlePasteAccounts}
                    disabled={!pastedAccounts.trim() || !selectedCategory}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-lg text-white hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Accounts
                  </button>
                </div>
              )}

              {importMethod === "upload-csv" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Upload CSV File</label>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                    />
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-blue-400 font-semibold text-sm">CSV Format & Categories</h4>
                      <button 
                        onClick={() => downloadTemplate('csv')}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs transition-colors"
                      >
                        📥 Download Template
                      </button>
                    </div>
                    <p className="text-blue-300 text-sm mb-3">Required columns: <strong>username, category, notes</strong></p>
                    <div className="bg-blue-900/30 p-3 rounded mb-3">
                      <p className="text-blue-200 text-xs mb-2">Valid categories (must match exactly):</p>
                      <div className="grid grid-cols-2 gap-1 text-blue-200 text-xs">
                        {accountCategories.map((cat) => (
                          <div key={cat.id} className="flex items-center space-x-2">
                            <span className="text-blue-400">•</span>
                            <span className="font-mono">{cat.id}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <code className="text-blue-200 text-xs bg-blue-900/30 p-2 rounded block">
                      username,category,notes<br/>
                      @techguru,industry-leaders,Great content creator<br/>
                      @competitor1,competitors,Main competitor<br/>
                      @prospect,potential-customers,High-value lead
                    </code>
                    <p className="text-blue-300 text-xs mt-2">
                      💡 Categories in your CSV will automatically assign accounts to the correct groups - no need to select categories manually!
                    </p>
                  </div>
                </div>
              )}

              {importMethod === "upload-txt" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Upload Text File</label>
                    <input
                      type="file"
                      accept=".txt"
                      onChange={handleFileUpload}
                      disabled={!selectedCategory}
                      className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-green-400 font-semibold text-sm">Text File Format</h4>
                      <button 
                        onClick={() => downloadTemplate('txt')}
                        className="text-green-300 hover:text-green-200 text-xs underline"
                      >
                        Download Template
                      </button>
                    </div>
                    <p className="text-green-300 text-sm mb-2">One username per line (@ symbol optional):</p>
                    <code className="text-green-200 text-xs bg-green-900/30 p-2 rounded block">
                      @techguru<br/>
                      startupfounder<br/>
                      @innovationhub<br/>
                      digitalmarketer
                    </code>
                  </div>
                </div>
              )}

              {importMethod === "manual" && (
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={manualUsername}
                    onChange={(e) => setManualUsername(e.target.value)}
                    placeholder="Enter username or handle"
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleManualAdd()}
                  />
                  <button 
                    onClick={handleManualAdd}
                    disabled={!manualUsername.trim() || !selectedCategory}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-lg text-white hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Account
                  </button>
                </div>
              )}
            </div>

            {/* Filter and Stats */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white mb-4 md:mb-0">
                  Target Accounts ({getFilteredAccounts().length})
                </h3>
                <div className="flex space-x-4">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
                  >
                    <option value="all" className="bg-gray-800">All Categories ({targetAccounts.length})</option>
                    {accountCategories.map((category) => {
                      const count = targetAccounts.filter(acc => acc.category === category.id).length;
                      return (
                        <option key={category.id} value={category.id} className="bg-gray-800">
                          {category.label} ({count})
                        </option>
                      );
                    })}
                  </select>
                  <button className="bg-blue-600 px-4 py-2 rounded-lg text-white text-sm hover:bg-blue-700 transition-colors">
                    Export List
                  </button>
                </div>
              </div>
              
              {/* Category Legend */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                {/* Competitors category - highlighted */}
                {(() => {
                  const competitorsCategory = accountCategories.find(cat => cat.id === 'competitors');
                  const competitorsCount = targetAccounts.filter(acc => acc.category === 'competitors').length;
                  if (competitorsCategory) {
                    return (
                      <div className="flex items-center space-x-2 p-2 bg-red-500/20 rounded-lg border border-red-500/30">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-red-300 text-xs font-bold">
                          {competitorsCategory.label} ({competitorsCount}) 🔥
                        </span>
                      </div>
                    );
                  }
                  return null;
                })()}
                
                {/* Other categories */}
                {accountCategories.filter(cat => cat.id !== 'competitors').map((category) => {
                  const count = targetAccounts.filter(acc => acc.category === category.id).length;
                  return (
                    <div key={category.id} className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full bg-${category.color}-500`}></div>
                      <span className="text-gray-300 text-xs">{category.label} ({count})</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Accounts List */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="space-y-3">
                {getFilteredAccounts().length > 0 ? (
                  getFilteredAccounts().map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 bg-${getCategoryColor(account.category)}-500 rounded-full flex items-center justify-center`}>
                          <span className="text-white text-sm font-semibold">
                            {account.username.slice(1, 3).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h5 className="text-white font-semibold">{account.username}</h5>
                          <p className="text-gray-400 text-sm">
                            {accountCategories.find(c => c.id === account.category)?.label} • Added {account.addedDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <select
                          value={account.category}
                          onChange={(e) => updateAccountCategory(account.id, e.target.value)}
                          className="bg-white/5 border border-white/10 rounded px-3 py-1 text-white text-sm focus:border-purple-500 focus:outline-none"
                        >
                          {accountCategories.map((category) => (
                            <option key={category.id} value={category.id} className="bg-gray-800">
                              {category.label}
                            </option>
                          ))}
                        </select>
                        <span className={`text-xs px-2 py-1 rounded ${
                          account.status === 'active' 
                            ? 'text-green-400 bg-green-400/20' 
                            : 'text-yellow-400 bg-yellow-400/20'
                        }`}>
                          {account.status}
                        </span>
                        <button 
                          onClick={() => removeAccount(account.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">
                      {filterCategory === "all" ? "No target accounts added yet" : `No accounts in ${accountCategories.find(c => c.id === filterCategory)?.label} category`}
                    </p>
                    <button 
                      onClick={() => setImportMethod("paste")}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-lg text-white hover:from-purple-700 hover:to-pink-700 transition-all"
                    >
                      Add Your First Accounts
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Bulk Actions */}
            {getFilteredAccounts().length > 0 && (
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Bulk Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-colors">
                    Follow All Visible
                  </button>
                  <button className="bg-yellow-600 px-4 py-2 rounded-lg text-white hover:bg-yellow-700 transition-colors">
                    Pause All Visible
                  </button>
                  <button className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700 transition-colors">
                    Remove All Visible
                  </button>
                </div>
              </div>
            )}
          </div>
        );



      case "analytics":
        return (
          <div className="space-y-6">
            {/* Growth Metrics */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6">Growth Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-2">Follower Growth</h4>
                  <div className="h-32 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                    <span className="text-gray-400">📈 Growth chart visualization</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Engagement Rate</h4>
                  <div className="h-32 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                    <span className="text-gray-400">📊 Engagement chart visualization</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Posts */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Top Performing Posts</h3>
              <div className="space-y-3">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-white mb-2">"AI is revolutionizing how we work and interact with technology..."</p>
                  <div className="flex space-x-4 text-sm text-gray-400">
                    <span className="flex items-center space-x-1">
                      <span>❤️</span>
                      <span>234</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>🔄</span>
                      <span>89</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>💬</span>
                      <span>45</span>
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-white mb-2">"Behind the scenes of our latest product development..."</p>
                  <div className="flex space-x-4 text-sm text-gray-400">
                    <span className="flex items-center space-x-1">
                      <span>❤️</span>
                      <span>189</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>🔄</span>
                      <span>67</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>💬</span>
                      <span>32</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            {/* Account Connection */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Account Connection</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">
                    Status: {!platformData.isConnected ? 'Disconnected' : isPaused ? 'Connected (Paused)' : 'Connected'}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {!platformData.isConnected 
                      ? 'Connect your account to enable AI automation'
                      : isPaused 
                      ? 'Account is connected but AI automation is paused'
                      : 'Account is connected and active'
                    }
                  </p>
                </div>
                {platformData.isConnected ? (
                  <div className="flex space-x-3">
                    <button 
                      onClick={handlePause}
                      className={`px-6 py-2 rounded-lg text-white transition-colors ${
                        isPaused 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-yellow-600 hover:bg-yellow-700'
                      }`}
                    >
                      {isPaused ? 'Reactivate' : 'Pause'}
                    </button>
                    <button 
                      onClick={handleDisconnect}
                      className="bg-red-600 px-6 py-2 rounded-lg text-white hover:bg-red-700 transition-colors"
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handleConnect}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-lg text-white hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    Connect Account
                  </button>
                )}
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Privacy & Permissions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white">Read posts and engagement</span>
                  <input type="checkbox" defaultChecked className="rounded text-purple-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Create and publish posts</span>
                  <input type="checkbox" defaultChecked className="rounded text-purple-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Follow/unfollow accounts</span>
                  <input type="checkbox" defaultChecked className="rounded text-purple-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Access direct messages</span>
                  <input type="checkbox" className="rounded text-purple-600" />
                </div>
              </div>
            </div>

            {/* Account Controls */}
            <div className="bg-yellow-900/20 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/20">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">Account Controls</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold">
                      {isPaused ? 'Reactivate AI Automation' : 'Pause AI Automation'}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {isPaused 
                        ? 'Reactivate all automated activities and suggestions' 
                        : 'Temporarily stop all automated activities without losing your settings'
                      }
                    </p>
                  </div>
                  <button 
                    onClick={handlePause}
                    className={`px-4 py-2 rounded-lg text-white transition-colors ${
                      isPaused 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-yellow-600 hover:bg-yellow-700'
                    }`}
                  >
                    {isPaused ? 'Reactivate' : 'Pause'}
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-900/20 backdrop-blur-lg rounded-2xl p-6 border border-red-500/20">
              <h3 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold">Disconnect Account</h4>
                    <p className="text-gray-400 text-sm">Remove account connection and lose all settings</p>
                  </div>
                  <button 
                    onClick={handleDisconnect}
                    className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700 transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold">Delete All Data</h4>
                    <p className="text-gray-400 text-sm">Permanently remove all account data and settings</p>
                  </div>
                  <button className="bg-red-700 px-4 py-2 rounded-lg text-white hover:bg-red-800 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Top Navigation */}
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center">
                              <img src="/logo-32.png" alt="Campaign.ai" className="w-8 h-8" />
            </div>
            <span className="text-white font-bold text-xl">Campaign.ai</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/accounts" className="text-white hover:text-purple-300 transition-colors">
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

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link href="/accounts" className="text-gray-400 hover:text-white transition-colors">
                    Accounts
                  </Link>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <span className="text-white">{platformData.name}</span>
                </li>
              </ol>
            </nav>
          </div>

          {/* Platform Header */}
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-3xl p-8 border border-white/10 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className={`w-16 h-16 ${platformData.bgColor} rounded-xl flex items-center justify-center`}>
                  <span className="text-white font-bold text-2xl">{platformData.icon}</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{platformData.name}</h1>
                  <p className="text-gray-300">
                    {platformData.isConnected ? 
                      (isPaused ? 'Connected but paused - AI automation is temporarily disabled' : 'Connected and actively managed by AI') 
                      : 'Click connect to enable AI automation'
                    }
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      !platformData.isConnected
                        ? 'text-red-400 bg-red-400/20'
                        : isPaused 
                        ? 'text-yellow-400 bg-yellow-400/20' 
                        : 'text-green-400 bg-green-400/20'
                    }`}>
                      {!platformData.isConnected ? 'Disconnected' : isPaused ? 'Paused' : 'Active'}
                    </span>
                    {platformData.isConnected && !isPaused && (
                      <span className="text-gray-300 text-sm">Last activity: 2 hours ago</span>
                    )}
                    {platformData.isConnected && isPaused && (
                      <span className="text-gray-300 text-sm">Automation paused</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                {!platformData.isConnected ? (
                  <button 
                    onClick={handleConnect}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-lg text-white hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    Connect Account
                  </button>
                ) : (
                  <>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-lg text-white hover:from-blue-700 hover:to-purple-700 transition-all">
                      View Live Account
                    </button>
                    <button 
                      onClick={handlePause}
                      className={`px-6 py-3 rounded-lg text-white transition-colors ${
                        isPaused 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-yellow-600 hover:bg-yellow-700'
                      }`}
                    >
                      {isPaused ? 'Reactivate' : 'Pause'}
                    </button>
                    <button 
                      onClick={handleDisconnect}
                      className="bg-red-600 px-6 py-3 rounded-lg text-white hover:bg-red-700 transition-colors"
                    >
                      Disconnect
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
} 