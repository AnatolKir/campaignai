"use client";

import { useState } from "react";
import Link from "next/link";
import { useSettingsValidation } from "../../hooks/useSettingsValidation";
import { SettingsValidationAlert } from "../../components/SettingsValidationAlert";
import { ValidatedRadioGroup, ValidatedCheckbox, ValidatedSelect } from "../../components/ValidatedFormField";
import { UnifiedNavigation } from "../../components/UnifiedNavigation";

export default function AgentSettings() {
  const [activeSection, setActiveSection] = useState("identity");
  const [agentData, setAgentData] = useState({
    // Brand Identity
    brandName: "Tech Startup Co",
    primaryColor: "#8B5CF6",
    secondaryColor: "#EC4899",
    logo: null,
    missionStatement: "",
    brandValues: ["Innovation", "Transparency", "Growth"],
    
    // Docs and Links
    resourceLinks: [
      { type: "FAQ", url: "https://example.com/faq", title: "Company FAQ", description: "Frequently asked questions about our products" }
    ],
    uploadedDocs: [],
    brandArticles: [],
    
    // Personality & Voice (combined)
    brandVoice: "professional",
    enthusiasmLevel: "moderate",
    humorUsage: "subtle",
    formalityLevel: "professional",
    proactiveness: "balanced",
    
    // Communication Style
    emojiUsage: "minimal",
    responseLength: "medium",
    questionFrequency: "moderate",
    
    // Content Strategy (combined)
    contentPillars: ["Technology Trends", "Industry Insights", "Company Updates"],
    prohibitedTopics: ["Politics", "Religion", "Controversial Issues"],
    creativityLevel: "high",
    originalityRatio: 70,
    visualContent: true,
    preferredHashtags: "#innovation #tech #startup",
    
    // Target Audience
    targetAudience: "tech-professionals",
    ageRange: "25-34",
    communicationPreference: "direct-concise",
    
    // Posting Behavior
    timingOptimization: "auto",
    frequencyPreference: "moderate",
    contentMix: {
      educational: 40,
      promotional: 20,
      personal: 25,
      curated: 15
    },
    
    // Engagement Strategy
    responseSpeed: "quick",
    conversationStarters: true,
    followUpBehavior: "engaged",
    dailyLimits: {
      comments: 50,
      likes: 200,
      follows: 25
    },
    
    // Learning & Adaptation
    adaptFromEngagement: true,
    learnFromFeedback: true,
    learningSpeed: "moderate",
    
    // Advanced Settings
    contextMemory: "medium",
    approvalRequired: false,
    riskTolerance: "moderate",
    
    // Compliance & Rules
    complianceRules: [
      "Never share personal information or confidential data",
      "Always respect intellectual property and copyright laws",
      "Avoid discriminatory language or content",
      "Do not engage in harassment or bullying behavior",
      "Respect privacy settings and data protection regulations",
      "Follow platform-specific community guidelines",
      "Maintain professional boundaries in all interactions",
      "Verify information before sharing as fact",
      "Avoid making claims about competitors that cannot be substantiated",
      "Do not impersonate other individuals or organizations"
    ]
  });

  // GitHub Repository form state
  const [githubForm, setGithubForm] = useState({
    url: '',
    title: '',
    description: '',
    branch: 'main'
  });

  // Initialize settings validation
  const validation = useSettingsValidation(agentData);

  const sections = [
    { id: "identity", label: "Brand Identity", icon: "🎨" },
    { id: "docs", label: "Docs and Links", icon: "📚" },
    { id: "personality", label: "Personality & Voice", icon: "🎭" },
    { id: "communication", label: "Communication Style", icon: "💬" },
    { id: "content", label: "Content Strategy", icon: "📝" },
    { id: "audience", label: "Target Audience", icon: "👥" },
    { id: "posting", label: "Posting Behavior", icon: "📅" },
    { id: "engagement", label: "Engagement Strategy", icon: "🤝" },
    { id: "learning", label: "Learning & Adaptation", icon: "🧠" },
    { id: "advanced", label: "Advanced Settings", icon: "⚙️" },
    { id: "compliance", label: "Compliance & Rules", icon: "📋" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Top Navigation */}
      <UnifiedNavigation />

      <div className="flex h-screen">
        {/* Left Sidebar - Section Navigation */}
        <div className="w-80 bg-black/20 backdrop-blur-lg border-r border-white/10 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Customize Agent for Brand</h2>
            <p className="text-gray-300 text-sm">Complete control over your AI agent's personality, behavior, and brand representation</p>
          </div>
          
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 p-4 rounded-lg transition-all text-left ${
                  activeSection === section.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="text-lg">{section.icon}</span>
                <span className="font-medium">{section.label}</span>
              </button>
            ))}
          </div>


        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Settings Validation Alert */}
          <SettingsValidationAlert 
            conflicts={validation.conflicts}
            warnings={validation.warnings}
            className="mb-6"
            onResolveConflict={(conflict) => {
              // Handle conflict resolution by suggesting changes
              console.log('Resolving conflict:', conflict);
            }}
          />
          {/* Brand Identity Section */}
          {activeSection === "identity" && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Brand Identity</h3>
                <p className="text-gray-300 mb-6">Define your brand's visual identity and core values</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Logo Upload */}
                  <div>
                    <label className="block text-white font-semibold mb-2">Brand Logo</label>
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/40 transition-colors cursor-pointer">
                      <div className="text-4xl mb-2">📷</div>
                      <p className="text-gray-300">Click to upload logo</p>
                      <p className="text-gray-400 text-sm mt-1">PNG, JPG up to 2MB</p>
                    </div>
                  </div>

                  {/* Brand Name */}
                  <div>
                    <label className="block text-white font-semibold mb-2">Brand Name</label>
                    <input
                      type="text"
                      value={agentData.brandName}
                      onChange={(e) => setAgentData({...agentData, brandName: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                      placeholder="Enter your brand name"
                    />
                  </div>
                </div>

                {/* Color Palette */}
                <div className="mt-6">
                  <label className="block text-white font-semibold mb-4">Brand Colors</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Primary Color</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={agentData.primaryColor}
                          onChange={(e) => setAgentData({...agentData, primaryColor: e.target.value})}
                          className="w-12 h-12 rounded-lg border border-white/20 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={agentData.primaryColor}
                          onChange={(e) => setAgentData({...agentData, primaryColor: e.target.value})}
                          className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Secondary Color</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={agentData.secondaryColor}
                          onChange={(e) => setAgentData({...agentData, secondaryColor: e.target.value})}
                          className="w-12 h-12 rounded-lg border border-white/20 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={agentData.secondaryColor}
                          onChange={(e) => setAgentData({...agentData, secondaryColor: e.target.value})}
                          className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mission Statement / Personal Bio */}
                <div className="mt-6">
                  <label className="block text-white font-semibold mb-2">Mission Statement / Personal Bio</label>
                  <p className="text-gray-300 text-sm mb-3">Describe your brand's mission, vision, or personal story that guides your content and interactions</p>
                  <textarea
                    value={agentData.missionStatement}
                    onChange={(e) => setAgentData({...agentData, missionStatement: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none h-32 resize-none"
                    placeholder="e.g., 'We're on a mission to democratize AI technology and make it accessible to everyone. Our goal is to empower small businesses with enterprise-level AI tools, breaking down barriers and creating opportunities for growth and innovation.'"
                  />
                </div>

                {/* Brand Values */}
                <div className="mt-6">
                  <label className="block text-white font-semibold mb-2">Brand Values</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {agentData.brandValues.map((value, index) => (
                      <span
                        key={index}
                        className="bg-purple-600/30 text-purple-200 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                      >
                        <span>{value}</span>
                        <button 
                          onClick={() => setAgentData({
                            ...agentData, 
                            brandValues: agentData.brandValues.filter((_, i) => i !== index)
                          })}
                          className="text-purple-300 hover:text-white"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                    placeholder="Add a brand value and press Enter"
                    onKeyPress={(e) => {
                      const target = e.target as HTMLInputElement;
                      if (e.key === 'Enter' && target.value.trim()) {
                        setAgentData({
                          ...agentData,
                          brandValues: [...agentData.brandValues, target.value.trim()]
                        });
                        target.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Docs and Links Section */}
          {activeSection === "docs" && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Docs and Links</h3>
                <p className="text-gray-300 mb-6">Upload documents, link to resources, and provide materials that help your AI agent understand your brand better</p>
                
                <div className="space-y-8">
                  {/* Quick Add Links */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h4 className="text-xl font-semibold text-white mb-4">Add Resource Link</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">Resource Type</label>
                                                 <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none">
                           <option value="" disabled>Choose one</option>
                           <option value="FAQ">FAQ</option>
                           <option value="Article">Article/Blog Post</option>
                           <option value="Press Release">Press Release</option>
                           <option value="Product Info">Product Information</option>
                           <option value="About Us">About Us Page</option>
                           <option value="Case Study">Case Study</option>
                           <option value="Documentation">Documentation</option>
                           <option value="GitHub Repository">GitHub Repository</option>
                           <option value="Other">Other</option>
                         </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">Title</label>
                        <input
                          type="text"
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                          placeholder="e.g., Company FAQ, Product Guide"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">URL</label>
                        <input
                          type="url"
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-300 text-sm mb-2">Description (Optional)</label>
                      <textarea
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none h-20 resize-none"
                        placeholder="Brief description of what this resource contains and how it helps..."
                      />
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                      Add Link
                    </button>
                  </div>

                  {/* GitHub Repository Section */}
                  <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl">🐙</span>
                      <h4 className="text-xl font-semibold text-white">Connect GitHub Repository</h4>
                    </div>
                    <p className="text-gray-300 text-sm mb-6">
                      Connect your GitHub repositories to help your AI agent understand your codebase, projects, and technical documentation.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 text-sm mb-2">Repository URL</label>
                          <input
                            type="url"
                            value={githubForm.url}
                            onChange={(e) => setGithubForm({...githubForm, url: e.target.value})}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                            placeholder="https://github.com/username/repository"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm mb-2">Repository Name</label>
                          <input
                            type="text"
                            value={githubForm.title}
                            onChange={(e) => setGithubForm({...githubForm, title: e.target.value})}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                            placeholder="e.g., My AI Project"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2">
                          <label className="block text-gray-300 text-sm mb-2">Description</label>
                          <textarea
                            value={githubForm.description}
                            onChange={(e) => setGithubForm({...githubForm, description: e.target.value})}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none h-20 resize-none"
                            placeholder="Brief description of the repository and how it relates to your brand..."
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm mb-2">Primary Branch</label>
                          <select
                            value={githubForm.branch}
                            onChange={(e) => setGithubForm({...githubForm, branch: e.target.value})}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                          >
                            <option value="main">main</option>
                            <option value="master">master</option>
                            <option value="develop">develop</option>
                            <option value="staging">staging</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4">
                        <div className="flex items-start space-x-2">
                          <div className="text-xs text-gray-400 leading-relaxed">
                            <div className="mb-1">💡 <strong>What the AI learns from GitHub:</strong></div>
                            <ul className="space-y-1">
                              <li>• README files and documentation</li>
                              <li>• Project structure and technologies used</li>
                              <li>• Code examples and implementation patterns</li>
                              <li>• Issue discussions and project updates</li>
                            </ul>
                          </div>
                        </div>
                        <button 
                          onClick={() => {
                            if (githubForm.url && githubForm.title) {
                              setAgentData({
                                ...agentData,
                                resourceLinks: [...agentData.resourceLinks, {
                                  url: githubForm.url,
                                  title: githubForm.title,
                                  description: githubForm.description + (githubForm.branch !== 'main' ? ` (Branch: ${githubForm.branch})` : ''),
                                  type: "GitHub Repository"
                                }]
                              });
                              setGithubForm({ url: '', title: '', description: '', branch: 'main' });
                            }
                          }}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!githubForm.url || !githubForm.title}
                        >
                          Add Repository
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* File Upload */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h4 className="text-xl font-semibold text-white mb-4">Upload Documents</h4>
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/40 transition-colors cursor-pointer">
                      <div className="text-4xl mb-4">📄</div>
                      <h5 className="text-white font-medium mb-2">Upload files or drag and drop</h5>
                      <p className="text-gray-300 text-sm mb-4">PDF, DOC, DOCX, TXT up to 10MB each</p>
                      <div className="flex flex-wrap gap-2 justify-center text-xs text-gray-400">
                        <span>White papers</span>
                        <span>•</span>
                        <span>Brand guidelines</span>
                        <span>•</span>
                        <span>Product specs</span>
                        <span>•</span>
                        <span>Training materials</span>
                      </div>
                    </div>
                  </div>

                  {/* Connected GitHub Repositories */}
                  {agentData.resourceLinks.filter(resource => resource.type === "GitHub Repository").length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                        <span>🐙</span>
                        <span>Connected GitHub Repositories</span>
                      </h4>
                      <div className="space-y-3">
                        {agentData.resourceLinks
                          .filter(resource => resource.type === "GitHub Repository")
                          .map((repo, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/30">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <span className="text-white text-lg">🐙</span>
                              </div>
                              <div>
                                <h5 className="text-white font-medium">{repo.title}</h5>
                                <p className="text-gray-400 text-sm">{repo.url.replace('https://github.com/', '')}</p>
                                {repo.description && (
                                  <p className="text-gray-300 text-xs mt-1">{repo.description}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => window.open(repo.url, '_blank')}
                                className="text-purple-400 hover:text-purple-300 text-sm"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </button>
                              <button 
                                onClick={() => setAgentData({
                                  ...agentData,
                                  resourceLinks: agentData.resourceLinks.filter(r => r !== repo)
                                })}
                                className="text-red-400 hover:text-red-300 text-sm"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Other Resources */}
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Other Resources</h4>
                    <div className="space-y-3">
                      {agentData.resourceLinks.filter(resource => resource.type !== "GitHub Repository").map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm font-bold">
                                {resource.type === "FAQ" ? "❓" : 
                                 resource.type === "Article" ? "📰" :
                                 resource.type === "Press Release" ? "📢" :
                                 resource.type === "Product Info" ? "📦" :
                                 resource.type === "About Us" ? "🏢" :
                                 resource.type === "Case Study" ? "📊" :
                                 resource.type === "Documentation" ? "📋" :
                                 resource.type === "GitHub Repository" ? "🐙" : "🔗"}
                              </span>
                            </div>
                            <div>
                              <h5 className="text-white font-medium">{resource.title}</h5>
                              <p className="text-gray-400 text-sm">{resource.type}</p>
                              {resource.description && (
                                <p className="text-gray-300 text-xs mt-1">{resource.description}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-400 hover:text-blue-300 text-sm">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </button>
                            <button className="text-gray-400 hover:text-white text-sm">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button 
                              onClick={() => setAgentData({
                                ...agentData,
                                resourceLinks: agentData.resourceLinks.filter((_, i) => i !== index)
                              })}
                              className="text-red-400 hover:text-red-300 text-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      {agentData.resourceLinks.filter(resource => resource.type !== "GitHub Repository").length === 0 && (
                        <div className="text-center py-8 text-gray-400">
                          <div className="text-4xl mb-2">📚</div>
                          <p>No other resources added yet</p>
                          <p className="text-sm">Add links or upload documents to help your AI agent learn about your brand</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Resource Categories */}
                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <h4 className="text-xl font-semibold text-white mb-4">💡 Suggested Resources</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h5 className="text-white font-medium">Essential Links</h5>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• FAQ page</li>
                          <li>• About us page</li>
                          <li>• Product/service descriptions</li>
                          <li>• Contact information</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h5 className="text-white font-medium">Technical & Content</h5>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• GitHub repositories</li>
                          <li>• Brand guidelines</li>
                          <li>• Case studies</li>
                          <li>• Press releases</li>
                          <li>• White papers</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Personality & Voice Section */}
          {activeSection === "personality" && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Personality & Voice</h3>
                <p className="text-gray-300 mb-6">Define how your AI agent's personality and brand voice come across</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Brand Voice */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Brand Voice</label>
                    <div className="space-y-2">
                      {[
                        { value: "professional", label: "Professional", desc: "Formal, expert, authoritative" },
                        { value: "friendly", label: "Friendly", desc: "Warm, approachable, conversational" },
                        { value: "casual", label: "Casual", desc: "Relaxed, informal, relatable" },
                        { value: "witty", label: "Witty", desc: "Clever, humorous, engaging" },
                        { value: "inspirational", label: "Inspirational", desc: "Motivating, uplifting, positive" }
                      ].map((voice) => (
                        <label key={voice.value} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="brandVoice"
                            value={voice.value}
                            checked={agentData.brandVoice === voice.value}
                            onChange={(e) => setAgentData({...agentData, brandVoice: e.target.value})}
                            className="text-purple-500"
                          />
                          <div>
                            <div className="text-white font-medium">{voice.label}</div>
                            <div className="text-gray-400 text-sm">{voice.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Enthusiasm Level */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Enthusiasm Level</label>
                    <div className="space-y-3">
                      {[
                        { value: "reserved", label: "Reserved", desc: "Calm, measured, professional tone" },
                        { value: "moderate", label: "Moderate", desc: "Balanced energy, appropriately engaged" },
                        { value: "high", label: "High Energy", desc: "Enthusiastic, excitable, passionate" }
                      ].map((level) => (
                        <label key={level.value} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="enthusiasm"
                            value={level.value}
                            checked={agentData.enthusiasmLevel === level.value}
                            onChange={(e) => setAgentData({
                              ...agentData,
                              enthusiasmLevel: e.target.value
                            })}
                            className="mt-1"
                          />
                          <div>
                            <div className="text-white font-medium">{level.label}</div>
                            <div className="text-gray-400 text-sm">{level.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Humor Usage */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Humor Usage</label>
                    <div className="space-y-3">
                      {[
                        { value: "none", label: "No Humor", desc: "Strictly professional, no jokes" },
                        { value: "subtle", label: "Subtle", desc: "Light wit, occasional clever remarks" },
                        { value: "frequent", label: "Frequent", desc: "Regular humor, puns, playful tone" }
                      ].map((level) => (
                        <label key={level.value} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="humor"
                            value={level.value}
                            checked={agentData.humorUsage === level.value}
                            onChange={(e) => setAgentData({
                              ...agentData,
                              humorUsage: e.target.value
                            })}
                            className="mt-1"
                          />
                          <div>
                            <div className="text-white font-medium">{level.label}</div>
                            <div className="text-gray-400 text-sm">{level.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Proactiveness */}
                  <ValidatedRadioGroup
                    label="Proactiveness"
                    fieldName="proactiveness"
                    value={agentData.proactiveness}
                    options={[
                      { value: "reactive", label: "Reactive", description: "Responds when engaged, rarely initiates" },
                      { value: "balanced", label: "Balanced", description: "Mix of responding and initiating" },
                      { value: "proactive", label: "Highly Proactive", description: "Actively starts conversations and engages" }
                    ]}
                    onChange={(value) => setAgentData({ ...agentData, proactiveness: value })}
                    conflicts={validation.conflicts}
                    warnings={validation.warnings}
                    isFieldDisabled={validation.isFieldDisabled}
                    getConflictingFields={validation.getConflictingFields}
                  />
                </div>

                {/* Tone Guidelines */}
                <div className="mt-8">
                  <label className="block text-white font-semibold mb-3">Tone Guidelines</label>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Always sound...</label>
                      <textarea
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none h-20 resize-none"
                        placeholder="e.g., knowledgeable, helpful, enthusiastic"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Never sound...</label>
                      <textarea
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none h-20 resize-none"
                        placeholder="e.g., pushy, arrogant, dismissive"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Communication Style Section */}
          {activeSection === "communication" && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Communication Style</h3>
                <p className="text-gray-300 mb-6">Fine-tune how your agent communicates and interacts</p>
                
                <div className="space-y-8">
                  {/* Emoji Usage */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Emoji Usage</label>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {[
                        { value: "none", label: "None", desc: "No emojis" },
                        { value: "minimal", label: "Minimal", desc: "1-2 per post" },
                        { value: "moderate", label: "Moderate", desc: "3-5 per post" },
                        { value: "frequent", label: "Frequent", desc: "6+ per post" }
                      ].map((level) => (
                        <label key={level.value} className="flex flex-col items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="emojiUsage"
                            value={level.value}
                            checked={agentData.emojiUsage === level.value}
                            onChange={(e) => setAgentData({
                              ...agentData,
                              emojiUsage: e.target.value
                            })}
                            className="mb-2"
                          />
                          <div className="text-white font-medium text-center">{level.label}</div>
                          <div className="text-gray-400 text-sm text-center">{level.desc}</div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Response Length */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Preferred Response Length</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { value: "short", label: "Short & Snappy", desc: "1-2 sentences, quick responses" },
                        { value: "medium", label: "Medium", desc: "3-5 sentences, balanced detail" },
                        { value: "long", label: "Detailed", desc: "Longer responses with full explanations" }
                      ].map((length) => (
                        <label key={length.value} className="flex flex-col p-4 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="responseLength"
                            value={length.value}
                            checked={agentData.responseLength === length.value}
                            onChange={(e) => setAgentData({
                              ...agentData,
                              responseLength: e.target.value
                            })}
                            className="mb-2"
                          />
                          <div className="text-white font-medium">{length.label}</div>
                          <div className="text-gray-400 text-sm">{length.desc}</div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Question Frequency */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Question Asking Frequency</label>
                    <p className="text-gray-300 text-sm mb-4">How often should your agent ask questions to engage the audience?</p>
                    <div className="bg-white/5 rounded-lg p-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={agentData.questionFrequency === "low" ? 25 : 
                               agentData.questionFrequency === "moderate" ? 50 : 75}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          const level = value < 33 ? "low" : value < 67 ? "moderate" : "high";
                          setAgentData({
                            ...agentData,
                            questionFrequency: level
                          });
                        }}
                        className="w-full mb-2"
                      />
                      <div className="flex justify-between text-sm text-gray-300">
                        <span>Rarely asks questions</span>
                        <span className="text-purple-300 font-medium capitalize">{agentData.questionFrequency}</span>
                        <span>Frequently asks questions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Strategy Section */}
          {activeSection === "content" && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Content Strategy</h3>
                <p className="text-gray-300 mb-6">Define content guidelines, creativity levels, and strategic approach</p>
                
                <div className="space-y-8">
                  {/* Content Pillars & Prohibited Topics */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-white font-semibold mb-3">Content Pillars</label>
                      <p className="text-gray-300 text-sm mb-4">Topics your brand should focus on</p>
                      <div className="space-y-2 mb-4">
                        {agentData.contentPillars.map((pillar, index) => (
                          <div key={index} className="flex items-center justify-between bg-green-600/20 border border-green-500/30 rounded-lg p-3">
                            <span className="text-green-200">{pillar}</span>
                            <button 
                              onClick={() => setAgentData({
                                ...agentData,
                                contentPillars: agentData.contentPillars.filter((_, i) => i !== index)
                              })}
                              className="text-green-300 hover:text-white"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <input
                        type="text"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                        placeholder="Add content pillar and press Enter"
                        onKeyPress={(e) => {
                          const target = e.target as HTMLInputElement;
                          if (e.key === 'Enter' && target.value.trim()) {
                            setAgentData({
                              ...agentData,
                              contentPillars: [...agentData.contentPillars, target.value.trim()]
                            });
                            target.value = '';
                          }
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-3">Prohibited Topics</label>
                      <p className="text-gray-300 text-sm mb-4">Topics your brand should avoid</p>
                      <div className="space-y-2 mb-4">
                        {agentData.prohibitedTopics.map((topic, index) => (
                          <div key={index} className="flex items-center justify-between bg-red-600/20 border border-red-500/30 rounded-lg p-3">
                            <span className="text-red-200">{topic}</span>
                            <button 
                              onClick={() => setAgentData({
                                ...agentData,
                                prohibitedTopics: agentData.prohibitedTopics.filter((_, i) => i !== index)
                              })}
                              className="text-red-300 hover:text-white"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <input
                        type="text"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
                        placeholder="Add prohibited topic and press Enter"
                        onKeyPress={(e) => {
                          const target = e.target as HTMLInputElement;
                          if (e.key === 'Enter' && target.value.trim()) {
                            setAgentData({
                              ...agentData,
                              prohibitedTopics: [...agentData.prohibitedTopics, target.value.trim()]
                            });
                            target.value = '';
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Creativity & Originality */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ValidatedRadioGroup
                      label="Creativity Level"
                      fieldName="creativityLevel"
                      value={agentData.creativityLevel}
                      options={[
                        { value: "conservative", label: "Conservative", description: "Safe, proven content approaches" },
                        { value: "moderate", label: "Moderate", description: "Balanced creativity with some experimentation" },
                        { value: "high", label: "Highly Creative", description: "Experimental, unique, trend-setting content" }
                      ]}
                      onChange={(value) => setAgentData({ ...agentData, creativityLevel: value })}
                      conflicts={validation.conflicts}
                      warnings={validation.warnings}
                      isFieldDisabled={validation.isFieldDisabled}
                      getConflictingFields={validation.getConflictingFields}
                    />

                    <div>
                      <label className="block text-white font-semibold mb-3">Original vs Curated Content</label>
                      <p className="text-gray-300 text-sm mb-4">Balance between creating original content vs sharing/commenting on others' content</p>
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-300">More Curation</span>
                          <span className="text-purple-300 font-medium">{agentData.originalityRatio}% Original</span>
                          <span className="text-sm text-gray-300">More Original</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={agentData.originalityRatio}
                          onChange={(e) => setAgentData({
                            ...agentData,
                            originalityRatio: parseInt(e.target.value)
                          })}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content Preferences */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Content Preferences</label>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">Preferred Hashtags</label>
                        <textarea
                          value={agentData.preferredHashtags}
                          onChange={(e) => setAgentData({...agentData, preferredHashtags: e.target.value})}
                          className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm h-20 resize-none"
                          placeholder="#innovation #tech #startup"
                        />
                      </div>
                      <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                        <input
                          type="checkbox"
                          checked={agentData.visualContent}
                          onChange={(e) => setAgentData({
                            ...agentData,
                            visualContent: e.target.checked
                          })}
                          className="mt-1"
                        />
                        <div>
                          <div className="text-white font-medium">Include Visual Content</div>
                          <div className="text-gray-400 text-sm">Agent will suggest images, videos, and graphics for posts</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Target Audience Section */}
          {activeSection === "audience" && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Target Audience</h3>
                <p className="text-gray-300 mb-6">Define your target audience for optimal content and engagement</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Demographics */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Demographics</label>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">Primary Audience</label>
                        <select 
                          value={agentData.targetAudience}
                          onChange={(e) => setAgentData({...agentData, targetAudience: e.target.value})}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                        >
                          <option value="tech-professionals">Tech Professionals</option>
                          <option value="entrepreneurs">Entrepreneurs</option>
                          <option value="marketers">Marketers</option>
                          <option value="students">Students</option>
                          <option value="general-public">General Public</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">Age Range</label>
                        <select 
                          value={agentData.ageRange}
                          onChange={(e) => setAgentData({...agentData, ageRange: e.target.value})}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                        >
                          <option value="18-24">18-24</option>
                          <option value="25-34">25-34</option>
                          <option value="35-44">35-44</option>
                          <option value="45-54">45-54</option>
                          <option value="55+">55+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">Communication Preference</label>
                        <select 
                          value={agentData.communicationPreference}
                          onChange={(e) => setAgentData({...agentData, communicationPreference: e.target.value})}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                        >
                          <option value="direct-concise">Direct and concise</option>
                          <option value="detailed-informative">Detailed and informative</option>
                          <option value="casual-conversational">Casual and conversational</option>
                          <option value="visual-engaging">Visual and engaging</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Interests & Preferences */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Audience Insights</label>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">Key Interests</label>
                        <textarea
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none h-20 resize-none"
                          placeholder="e.g., AI technology, productivity tools, career growth"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">Pain Points</label>
                        <textarea
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none h-20 resize-none"
                          placeholder="e.g., time management, staying updated with trends"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preferred Platforms */}
                <div className="mt-8">
                  <label className="block text-white font-semibold mb-3">Preferred Platforms</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["X", "LinkedIn", "Instagram", "TikTok", "YouTube", "Discord"].map((platform) => (
                      <label key={platform} className="flex items-center space-x-2 p-3 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                        <input type="checkbox" className="text-purple-500 rounded" />
                        <span className="text-white text-sm">{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Posting Behavior Section */}
          {activeSection === "posting" && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Posting Behavior</h3>
                <p className="text-gray-300 mb-6">Configure when and how your agent posts content</p>
                
                <div className="space-y-8">
                  {/* Timing & Frequency */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-white font-semibold mb-3">Timing Optimization</label>
                      <div className="space-y-3">
                        {[
                          { value: "auto", label: "Automatic", desc: "AI determines optimal posting times" },
                          { value: "scheduled", label: "Fixed Schedule", desc: "Post at predetermined times" },
                          { value: "manual", label: "Manual Approval", desc: "Suggest times but require approval" }
                        ].map((timing) => (
                          <label key={timing.value} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                            <input
                              type="radio"
                              name="timingOptimization"
                              value={timing.value}
                              checked={agentData.timingOptimization === timing.value}
                              onChange={(e) => setAgentData({
                                ...agentData,
                                timingOptimization: e.target.value
                              })}
                              className="mt-1"
                            />
                            <div>
                              <div className="text-white font-medium">{timing.label}</div>
                              <div className="text-gray-400 text-sm">{timing.desc}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-3">Posting Frequency</label>
                      <div className="space-y-3">
                        {[
                          { value: "conservative", label: "Conservative", desc: "1-2 posts per day" },
                          { value: "moderate", label: "Moderate", desc: "3-5 posts per day" },
                          { value: "aggressive", label: "Aggressive", desc: "6+ posts per day" }
                        ].map((freq) => (
                          <label key={freq.value} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                            <input
                              type="radio"
                              name="frequencyPreference"
                              value={freq.value}
                              checked={agentData.frequencyPreference === freq.value}
                              onChange={(e) => setAgentData({
                                ...agentData,
                                frequencyPreference: e.target.value
                              })}
                              className="mt-1"
                            />
                            <div>
                              <div className="text-white font-medium">{freq.label}</div>
                              <div className="text-gray-400 text-sm">{freq.desc}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content Distribution */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Content Distribution</label>
                    <p className="text-gray-300 text-sm mb-4">Balance different types of content</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-white font-medium mb-3">Educational Content</h4>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={agentData.contentMix.educational}
                          onChange={(e) => setAgentData({
                            ...agentData,
                            contentMix: { ...agentData.contentMix, educational: parseInt(e.target.value) }
                          })}
                          className="w-full" 
                        />
                        <div className="text-sm text-gray-300 mt-1">{agentData.contentMix.educational}%</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-white font-medium mb-3">Promotional Content</h4>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={agentData.contentMix.promotional}
                          onChange={(e) => setAgentData({
                            ...agentData,
                            contentMix: { ...agentData.contentMix, promotional: parseInt(e.target.value) }
                          })}
                          className="w-full" 
                        />
                        <div className="text-sm text-gray-300 mt-1">{agentData.contentMix.promotional}%</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-white font-medium mb-3">Personal/Behind-scenes</h4>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={agentData.contentMix.personal}
                          onChange={(e) => setAgentData({
                            ...agentData,
                            contentMix: { ...agentData.contentMix, personal: parseInt(e.target.value) }
                          })}
                          className="w-full" 
                        />
                        <div className="text-sm text-gray-300 mt-1">{agentData.contentMix.personal}%</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-white font-medium mb-3">Curated/Shared</h4>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={agentData.contentMix.curated}
                          onChange={(e) => setAgentData({
                            ...agentData,
                            contentMix: { ...agentData.contentMix, curated: parseInt(e.target.value) }
                          })}
                          className="w-full" 
                        />
                        <div className="text-sm text-gray-300 mt-1">{agentData.contentMix.curated}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Engagement Strategy Section */}
          {activeSection === "engagement" && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Engagement Strategy</h3>
                <p className="text-gray-300 mb-6">Configure how your agent engages with your community</p>
                
                <div className="space-y-8">
                  {/* Response Speed */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Response Speed</label>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {[
                        { value: "immediate", label: "Immediate", desc: "Within minutes" },
                        { value: "quick", label: "Quick", desc: "Within 1 hour" },
                        { value: "moderate", label: "Moderate", desc: "Within 4 hours" },
                        { value: "delayed", label: "Delayed", desc: "Within 24 hours" }
                      ].map((speed) => (
                        <label key={speed.value} className="flex flex-col p-4 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="responseSpeed"
                            value={speed.value}
                            checked={agentData.responseSpeed === speed.value}
                            onChange={(e) => setAgentData({
                              ...agentData,
                              responseSpeed: e.target.value
                            })}
                            className="mb-2"
                          />
                          <div className="text-white font-medium">{speed.label}</div>
                          <div className="text-gray-400 text-sm">{speed.desc}</div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Engagement Features */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Engagement Features</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ValidatedCheckbox
                        label="Use Conversation Starters"
                        fieldName="conversationStarters"
                        description="Agent will ask questions and create discussion prompts"
                        checked={agentData.conversationStarters}
                        onChange={(checked) => setAgentData({ ...agentData, conversationStarters: checked })}
                        conflicts={validation.conflicts}
                        warnings={validation.warnings}
                        isFieldDisabled={validation.isFieldDisabled}
                        getConflictingFields={validation.getConflictingFields}
                      />
                      <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                        <input
                          type="checkbox"
                          checked={agentData.followUpBehavior === "engaged"}
                          onChange={(e) => setAgentData({
                            ...agentData,
                            followUpBehavior: e.target.checked ? "engaged" : "minimal"
                          })}
                          className="mt-1"
                        />
                        <div>
                          <div className="text-white font-medium">Active Follow-up</div>
                          <div className="text-gray-400 text-sm">Agent continues conversations and follows up on responses</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Daily Limits */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Daily Engagement Limits</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white/5 rounded-lg p-4">
                        <label className="block text-gray-300 text-sm mb-2">Max Comments per Day</label>
                        <input
                          type="number"
                          value={agentData.dailyLimits.comments}
                          onChange={(e) => setAgentData({
                            ...agentData,
                            dailyLimits: { ...agentData.dailyLimits, comments: parseInt(e.target.value) }
                          })}
                          className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
                        />
                      </div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <label className="block text-gray-300 text-sm mb-2">Max Likes per Day</label>
                        <input
                          type="number"
                          value={agentData.dailyLimits.likes}
                          onChange={(e) => setAgentData({
                            ...agentData,
                            dailyLimits: { ...agentData.dailyLimits, likes: parseInt(e.target.value) }
                          })}
                          className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
                        />
                      </div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <label className="block text-gray-300 text-sm mb-2">Max Follows per Day</label>
                        <input
                          type="number"
                          value={agentData.dailyLimits.follows}
                          onChange={(e) => setAgentData({
                            ...agentData,
                            dailyLimits: { ...agentData.dailyLimits, follows: parseInt(e.target.value) }
                          })}
                          className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Learning & Adaptation Section */}
          {activeSection === "learning" && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Learning & Adaptation</h3>
                <p className="text-gray-300 mb-6">Configure how your agent learns and improves over time</p>
                
                <div className="space-y-8">
                  {/* Learning Features */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Learning Features</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                        <input
                          type="checkbox"
                          checked={agentData.adaptFromEngagement}
                          onChange={(e) => setAgentData({
                            ...agentData,
                            adaptFromEngagement: e.target.checked
                          })}
                          className="mt-1"
                        />
                        <div>
                          <div className="text-white font-medium">Learn from Engagement Patterns</div>
                          <div className="text-gray-400 text-sm">Agent analyzes which content gets better engagement and adapts</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                        <input
                          type="checkbox"
                          checked={agentData.learnFromFeedback}
                          onChange={(e) => setAgentData({
                            ...agentData,
                            learnFromFeedback: e.target.checked
                          })}
                          className="mt-1"
                        />
                        <div>
                          <div className="text-white font-medium">Incorporate User Feedback</div>
                          <div className="text-gray-400 text-sm">Agent learns from likes, comments, and direct feedback</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Learning Speed */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Learning Speed</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { value: "conservative", label: "Conservative", desc: "Slow, careful adaptation with lots of data" },
                        { value: "moderate", label: "Moderate", desc: "Balanced learning speed" },
                        { value: "aggressive", label: "Aggressive", desc: "Quick adaptation to new trends and patterns" }
                      ].map((speed) => (
                        <label key={speed.value} className="flex flex-col p-4 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="learningSpeed"
                            value={speed.value}
                            checked={agentData.learningSpeed === speed.value}
                            onChange={(e) => setAgentData({
                              ...agentData,
                              learningSpeed: e.target.value
                            })}
                            className="mb-2"
                          />
                          <div className="text-white font-medium">{speed.label}</div>
                          <div className="text-gray-400 text-sm">{speed.desc}</div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Advanced Settings Section */}
          {activeSection === "advanced" && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Advanced Settings</h3>
                <p className="text-gray-300 mb-6">Fine-tune advanced agent behaviors and risk management</p>
                
                <div className="space-y-8">
                  {/* Context Memory */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Conversation Memory</label>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {[
                        { value: "short", label: "Short", desc: "1-2 interactions" },
                        { value: "medium", label: "Medium", desc: "5-10 interactions" },
                        { value: "long", label: "Long", desc: "Full conversation history" },
                        { value: "permanent", label: "Permanent", desc: "Remembers all interactions" }
                      ].map((memory) => (
                        <label key={memory.value} className="flex flex-col p-4 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="contextMemory"
                            value={memory.value}
                            checked={agentData.contextMemory === memory.value}
                            onChange={(e) => setAgentData({
                              ...agentData,
                              contextMemory: e.target.value
                            })}
                            className="mb-2"
                          />
                          <div className="text-white font-medium">{memory.label}</div>
                          <div className="text-gray-400 text-sm">{memory.desc}</div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Approval Settings */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Content Approval</label>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                        <input 
                          type="checkbox" 
                          checked={agentData.approvalRequired}
                          onChange={(e) => setAgentData({
                            ...agentData,
                            approvalRequired: e.target.checked
                          })}
                          className="mt-1" 
                        />
                        <div>
                          <div className="text-white font-medium">Require approval for all posts</div>
                          <div className="text-gray-400 text-sm">Agent will request approval before publishing any content</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Risk Management */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Risk Management</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ValidatedSelect
                        label="Risk Tolerance"
                        fieldName="riskTolerance"
                        value={agentData.riskTolerance}
                        options={[
                          { value: "conservative", label: "Conservative - Avoid all risk" },
                          { value: "moderate", label: "Moderate - Some calculated risks" },
                          { value: "aggressive", label: "Aggressive - Open to bold takes" }
                        ]}
                        onChange={(value) => setAgentData({ ...agentData, riskTolerance: value })}
                        conflicts={validation.conflicts}
                        warnings={validation.warnings}
                        isFieldDisabled={validation.isFieldDisabled}
                        getConflictingFields={validation.getConflictingFields}
                      />
                      <div className="bg-white/5 rounded-lg p-4">
                        <label className="block text-white font-medium mb-2">Trend Participation</label>
                        <select className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white">
                          <option>Conservative - Established trends only</option>
                          <option>Moderate - Popular trends</option>
                          <option>Early Adopter - Jump on new trends</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Compliance & Rules Section */}
          {activeSection === "compliance" && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Compliance & Rules</h3>
                <p className="text-gray-300 mb-6">Establish ethical guidelines and compliance rules for your AI agent to follow</p>
                
                <div className="space-y-8">
                  {/* Current Rules */}
                  <div>
                    <label className="block text-white font-semibold mb-4">Current Rules</label>
                    <div className="space-y-3">
                      {agentData.complianceRules.map((rule, index) => (
                        <div key={index} className="flex items-start justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mt-0.5">
                              <span className="text-white text-xs font-bold">{index + 1}</span>
                            </div>
                            <div className="text-gray-300 leading-relaxed">{rule}</div>
                          </div>
                          <button 
                            onClick={() => setAgentData({
                              ...agentData,
                              complianceRules: agentData.complianceRules.filter((_, i) => i !== index)
                            })}
                            className="text-red-400 hover:text-red-300 ml-4 mt-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add New Rule */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h4 className="text-xl font-semibold text-white mb-4">Add New Rule</h4>
                    <div className="space-y-4">
                      <textarea
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none h-24 resize-none"
                        placeholder="Enter a new compliance rule (e.g., 'Always disclose when content is AI-generated')"
                        onKeyPress={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          if (e.key === 'Enter' && !e.shiftKey && target.value.trim()) {
                            e.preventDefault();
                            setAgentData({
                              ...agentData,
                              complianceRules: [...agentData.complianceRules, target.value.trim()]
                            });
                            target.value = '';
                          }
                        }}
                      />
                      <div className="flex items-center justify-between">
                        <p className="text-gray-400 text-sm">Press Enter to add rule, Shift+Enter for new line</p>
                        <button 
                          onClick={(e) => {
                            const textarea = e.currentTarget.parentElement?.previousElementSibling as HTMLTextAreaElement;
                            if (textarea && textarea.value.trim()) {
                              setAgentData({
                                ...agentData,
                                complianceRules: [...agentData.complianceRules, textarea.value.trim()]
                              });
                              textarea.value = '';
                            }
                          }}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                        >
                          Add Rule
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Rule Categories */}
                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <h4 className="text-xl font-semibold text-white mb-4">💡 Suggested Rule Categories</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h5 className="text-white font-medium">Privacy & Data Protection</h5>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Protect personal information</li>
                          <li>• Respect user privacy settings</li>
                          <li>• Follow GDPR/CCPA guidelines</li>
                          <li>• Secure data handling practices</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h5 className="text-white font-medium">Ethical Communication</h5>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Use inclusive language</li>
                          <li>• Avoid discriminatory content</li>
                          <li>• Respect cultural differences</li>
                          <li>• Maintain professional tone</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h5 className="text-white font-medium">Content Guidelines</h5>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Verify information accuracy</li>
                          <li>• Respect copyright laws</li>
                          <li>• Disclose AI-generated content</li>
                          <li>• Avoid misleading claims</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h5 className="text-white font-medium">Platform Compliance</h5>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Follow platform terms of service</li>
                          <li>• Respect community guidelines</li>
                          <li>• Adhere to advertising policies</li>
                          <li>• Report inappropriate content</li>
                        </ul>
                      </div>
                    </div>

                    {/* Quick Add Common Rules */}
                    <div className="mt-6">
                      <h5 className="text-white font-medium mb-3">Quick Add Common Rules</h5>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Always disclose when content is AI-generated",
                          "Never share confidential business information",
                          "Respect user opt-out requests immediately",
                          "Only use approved brand assets and logos",
                          "Avoid making medical or financial advice claims",
                          "Do not engage with spam or inappropriate content"
                        ].map((commonRule, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              if (!agentData.complianceRules.includes(commonRule)) {
                                setAgentData({
                                  ...agentData,
                                  complianceRules: [...agentData.complianceRules, commonRule]
                                });
                              }
                            }}
                            className="bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white px-3 py-1 rounded-full text-sm transition-all border border-white/20"
                            disabled={agentData.complianceRules.includes(commonRule)}
                          >
                            {agentData.complianceRules.includes(commonRule) ? "✓ Added" : `+ ${commonRule}`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rule Summary */}
                  <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <h4 className="text-xl font-semibold text-white mb-4">📊 Rules Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400">{agentData.complianceRules.length}</div>
                        <div className="text-gray-300 text-sm">Total Rules</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400">
                          {Math.round((agentData.complianceRules.length / 15) * 100)}%
                        </div>
                        <div className="text-gray-300 text-sm">Coverage Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400">
                          {agentData.complianceRules.length >= 10 ? "High" : agentData.complianceRules.length >= 5 ? "Medium" : "Low"}
                        </div>
                        <div className="text-gray-300 text-sm">Compliance Level</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 