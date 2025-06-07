"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { TrainingPost, TrainingReply, PostFeedback, FeedbackCategory, TrainingFilters, DateRange } from "@/types/training";
import { UnifiedNavigation } from "../../components/UnifiedNavigation";

export default function TrainingCenter() {
  const [activeTab, setActiveTab] = useState<'posts' | 'replies' | 'insights'>('posts');
  const [selectedItem, setSelectedItem] = useState<TrainingPost | TrainingReply | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [currentRating, setCurrentRating] = useState<'like' | 'dislike'>('like');
  const [feedbackText, setFeedbackText] = useState('');
  const [betterVersion, setBetterVersion] = useState('');
  const [whatWorked, setWhatWorked] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<FeedbackCategory[]>([]);
  
  // Date range state - default to last 24 hours
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(Date.now() - 24 * 60 * 60 * 1000),
    end: new Date()
  });
  
  const [filters, setFilters] = useState<TrainingFilters>({
    dateRange,
    platforms: [],
    type: 'all',
    status: 'all',
    hasContent: 'all'
  });

  // Mock data - in real app this would come from API
  const mockPosts: TrainingPost[] = [
    {
      id: '1',
      content: 'Just discovered an amazing AI productivity tool that saves me 3 hours daily! The future of work is here 🚀 #AIProductivity #WorkSmart',
      platform: 'twitter',
      type: 'automated',
      status: 'posted',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      engagement: { likes: 45, shares: 12, comments: 8, views: 234 },
      aiConfidence: 87
    },
    {
      id: '2',
      content: 'Behind the scenes of today\'s brainstorming session. Sometimes the best innovations come from collaboration! 💡✨',
      platform: 'instagram',
      type: 'suggested',
      status: 'pending',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
      scheduledFor: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 min from now
      aiConfidence: 72
    },
    {
      id: '3',
      content: 'Sharing insights on how businesses can leverage AI for customer service excellence. Thread below 👇',
      platform: 'linkedin',
      type: 'automated',
      status: 'posted',
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      postedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      engagement: { likes: 128, shares: 34, comments: 22, views: 890 },
      aiConfidence: 94
    },
    {
      id: '4',
      content: 'Monday motivation: Remember that every expert was once a beginner! What new skill are you working on this week? Drop it in the comments! 💪 #MondayMotivation #GrowthMindset #LearningJourney',
      platform: 'twitter',
      type: 'automated',
      status: 'posted',
      createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
      postedAt: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(), // 15 hours ago
      engagement: { likes: 23, shares: 4, comments: 12, views: 156 },
      aiConfidence: 65
    },
    {
      id: '5',
      content: 'Check out this incredible sunset from our office rooftop! Nature never fails to inspire creativity 🌅 #OfficeLife #Inspiration #Sunset #TeamVibes',
      platform: 'instagram',
      type: 'suggested',
      status: 'pending',
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min ago
      scheduledFor: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour from now
      aiConfidence: 78
    },
    {
      id: '6',
      content: 'Excited to announce our partnership with @TechInnovators! Together, we\'re building the future of digital transformation. Big things coming soon! 🤝',
      platform: 'linkedin',
      type: 'automated',
      status: 'posted',
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
      postedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      engagement: { likes: 89, shares: 15, comments: 7, views: 445 },
      aiConfidence: 92
    },
    {
      id: '7',
      content: 'HOT TAKE: The metaverse is overhyped and 90% of companies jumping on the bandwagon will fail. CMV. 🔥 #UnpopularOpinion #Metaverse #TechTrends',
      platform: 'twitter',
      type: 'suggested',
      status: 'rejected',
      createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), // 10 hours ago
      aiConfidence: 45
    },
    {
      id: '8',
      content: 'Coffee ☕ + Code 💻 + Good Music 🎵 = Perfect Monday! What\'s your productivity formula? Share below! 👇',
      platform: 'twitter',
      type: 'automated',
      status: 'posted',
      createdAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(), // 16 hours ago
      postedAt: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(), // 15 hours ago
      engagement: { likes: 67, shares: 8, comments: 19, views: 289 },
      aiConfidence: 83
    },
    {
      id: '9',
      content: 'Thrilled to share that our Q4 results exceeded expectations by 150%! Couldn\'t have done it without our amazing team. Here\'s to an even better 2024! 📈 #Q4Results #TeamSuccess #Growth',
      platform: 'linkedin',
      type: 'suggested',
      status: 'approved',
      createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), // 9 hours ago
      scheduledFor: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      aiConfidence: 88
    },
    {
      id: '10',
      content: 'PSA: Stop using "ninja," "rockstar," and "guru" in job titles. It\'s 2024. We can do better. Sincerely, everyone in tech. 🙄 #JobTitles #TechIndustry #HR',
      platform: 'twitter',
      type: 'suggested',
      status: 'pending',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      scheduledFor: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(), // 1 hour from now
      aiConfidence: 58
    },
    {
      id: '11',
      content: 'Weekend project complete! Built a smart home automation system using Arduino and some creativity. The future is DIY! 🏠🤖 #SmartHome #Arduino #WeekendProject #DIY',
      platform: 'instagram',
      type: 'automated',
      status: 'posted',
      createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(), // 20 hours ago
      postedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
      engagement: { likes: 156, shares: 23, comments: 31, views: 678 },
      aiConfidence: 91
    },
    {
      id: '12',
      content: 'Reminder: Your mental health is just as important as your deadlines. Take that break. You deserve it. 🧠💚 #MentalHealthAwareness #WorkLifeBalance #SelfCare',
      platform: 'linkedin',
      type: 'automated',
      status: 'posted',
      createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(), // 14 hours ago
      postedAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(), // 11 hours ago
      engagement: { likes: 245, shares: 67, comments: 43, views: 1234 },
      aiConfidence: 96
    }
  ];

  const mockReplies: TrainingReply[] = [
    {
      id: 'r1',
      content: 'Great point! AI is definitely transforming how we approach customer interactions. Have you tried implementing chatbots yet?',
      platform: 'twitter',
      type: 'automated',
      status: 'sent',
      originalPost: {
        id: 'p1',
        content: 'Customer service AI is getting scary good',
        author: '@techinfluencer'
      },
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
      sentAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(), // 2.5 hours ago
      aiConfidence: 89
    },
    {
      id: 'r2',
      content: 'This resonates so much! The key is finding the right balance between automation and human touch.',
      platform: 'linkedin',
      type: 'suggested',
      status: 'pending',
      originalPost: {
        id: 'p2',
        content: 'The future workplace will be hybrid - humans + AI working together',
        author: 'Sarah Johnson'
      },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      aiConfidence: 76
    },
    {
      id: 'r3',
      content: 'Absolutely agree! We\'ve seen similar results in our projects. Would love to hear more about your approach 🚀',
      platform: 'twitter',
      type: 'automated',
      status: 'sent',
      originalPost: {
        id: 'p3',
        content: 'Just increased our team productivity by 40% using AI automation tools. Game changer!',
        author: '@productivityguru'
      },
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      sentAt: new Date(Date.now() - 5.5 * 60 * 60 * 1000).toISOString(), // 5.5 hours ago
      aiConfidence: 82
    },
    {
      id: 'r4',
      content: 'Amazing work! The attention to detail is incredible. What was your biggest challenge during development?',
      platform: 'instagram',
      type: 'suggested',
      status: 'pending',
      originalPost: {
        id: 'p4',
        content: 'Finally launched our new mobile app after 8 months of hard work! 📱✨',
        author: '@appdeveloper'
      },
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      aiConfidence: 74
    },
    {
      id: 'r5',
      content: 'Congratulations on this milestone! Your journey is truly inspiring. Looking forward to seeing what\'s next 👏',
      platform: 'linkedin',
      type: 'automated',
      status: 'sent',
      originalPost: {
        id: 'p5',
        content: 'Proud to announce I\'ve been promoted to Senior Engineering Manager after 3 years of growth!',
        author: 'Alex Rodriguez'
      },
      createdAt: new Date(Date.now() - 13 * 60 * 60 * 1000).toISOString(), // 13 hours ago
      sentAt: new Date(Date.now() - 12.5 * 60 * 60 * 1000).toISOString(), // 12.5 hours ago
      aiConfidence: 91
    },
    {
      id: 'r6',
      content: 'This is fire 🔥 What programming language did you use? Always learning from the community!',
      platform: 'twitter',
      type: 'suggested',
      status: 'rejected',
      originalPost: {
        id: 'p6',
        content: 'Built my first neural network that can recognize handwritten digits with 97% accuracy!',
        author: '@mlstudent'
      },
      createdAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(), // 11 hours ago
      aiConfidence: 43
    },
    {
      id: 'r7',
      content: 'Excellent insights! We\'ve implemented similar strategies and seen great results. The key is starting small and scaling up.',
      platform: 'linkedin',
      type: 'automated',
      status: 'sent',
      originalPost: {
        id: 'p7',
        content: 'Here\'s how we transformed our company culture to embrace remote work and boost employee satisfaction',
        author: 'Maria Chen'
      },
      createdAt: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(), // 15 hours ago
      sentAt: new Date(Date.now() - 14.5 * 60 * 60 * 1000).toISOString(), // 14.5 hours ago
      aiConfidence: 88
    },
    {
      id: 'r8',
      content: 'Love this perspective! Collaboration really is the secret sauce. What tools have worked best for your team?',
      platform: 'twitter',
      type: 'suggested',
      status: 'pending',
      originalPost: {
        id: 'p8',
        content: 'Hot take: The best code is written by teams, not individuals. Collaboration > competition always.',
        author: '@devthoughts'
      },
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
      aiConfidence: 67
    },
    {
      id: 'r9',
      content: 'Incredibly valuable resource! Thank you for sharing this. Bookmarking for future reference 🔖',
      platform: 'linkedin',
      type: 'automated',
      status: 'sent',
      originalPost: {
        id: 'p9',
        content: 'Sharing a comprehensive guide to API design best practices based on 10 years of experience',
        author: 'David Kim'
      },
      createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), // 7 hours ago
      sentAt: new Date(Date.now() - 6.5 * 60 * 60 * 1000).toISOString(), // 6.5 hours ago
      aiConfidence: 85
    },
    {
      id: 'r10',
      content: 'So relatable! Currently diving into machine learning myself. Any recommendations for beginner-friendly resources?',
      platform: 'twitter',
      type: 'suggested',
      status: 'approved',
      originalPost: {
        id: 'p10',
        content: 'Day 30 of learning Python: Finally understand why everyone says it\'s so addictive! 🐍💻',
        author: '@codingjourney'
      },
      createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
      aiConfidence: 79
    }
  ];

  const positiveFeedbackCategories: { value: FeedbackCategory; label: string }[] = [
    { value: 'tone', label: 'Perfect Tone & Voice' },
    { value: 'relevance', label: 'Highly Relevant' },
    { value: 'timing', label: 'Great Timing' },
    { value: 'hashtags', label: 'Effective Hashtags' },
    { value: 'engagement', label: 'High Engagement Potential' },
    { value: 'brand-voice', label: 'On-Brand Voice' },
    { value: 'grammar', label: 'Excellent Writing' },
    { value: 'length', label: 'Perfect Length' },
    { value: 'call-to-action', label: 'Strong Call to Action' },
    { value: 'other', label: 'Other Strengths' }
  ];

  const negativeFeedbackCategories: { value: FeedbackCategory; label: string }[] = [
    { value: 'tone', label: 'Tone & Voice Issues' },
    { value: 'relevance', label: 'Relevance Problems' },
    { value: 'timing', label: 'Poor Timing' },
    { value: 'hashtags', label: 'Hashtag Issues' },
    { value: 'engagement', label: 'Low Engagement Potential' },
    { value: 'brand-voice', label: 'Off-Brand Voice' },
    { value: 'grammar', label: 'Grammar & Style Issues' },
    { value: 'length', label: 'Length Problems' },
    { value: 'call-to-action', label: 'Weak Call to Action' },
    { value: 'other', label: 'Other Issues' }
  ];

  const platforms = [
            { value: 'twitter', label: 'X', icon: '𝕏' },
    { value: 'instagram', label: 'Instagram', icon: '📷' },
    { value: 'linkedin', label: 'LinkedIn', icon: 'in' },
    { value: 'tiktok', label: 'TikTok', icon: '🎵' },
    { value: 'youtube', label: 'YouTube', icon: '▶' }
  ];

  // Filter data based on current filters
  const filteredPosts = useMemo(() => {
    return mockPosts.filter(post => {
      const postDate = new Date(post.createdAt);
      const withinDateRange = postDate >= filters.dateRange.start && postDate <= filters.dateRange.end;
      const matchesPlatform = filters.platforms.length === 0 || filters.platforms.includes(post.platform);
      const matchesType = filters.type === 'all' || post.type === filters.type;
      const matchesStatus = filters.status === 'all' || post.status === filters.status;
      
      return withinDateRange && matchesPlatform && matchesType && matchesStatus;
    });
  }, [filters, mockPosts]);

  const filteredReplies = useMemo(() => {
    return mockReplies.filter(reply => {
      const replyDate = new Date(reply.createdAt);
      const withinDateRange = replyDate >= filters.dateRange.start && replyDate <= filters.dateRange.end;
      const matchesPlatform = filters.platforms.length === 0 || filters.platforms.includes(reply.platform);
      const matchesType = filters.type === 'all' || reply.type === filters.type;
      const matchesStatus = filters.status === 'all' || reply.status === filters.status;
      
      return withinDateRange && matchesPlatform && matchesType && matchesStatus;
    });
  }, [filters, mockReplies]);

  const handleFeedback = (item: TrainingPost | TrainingReply, rating: 'like' | 'dislike') => {
    setSelectedItem(item);
    setCurrentRating(rating);
    setShowFeedbackModal(true);
  };

  const submitFeedback = () => {
    if (!selectedItem) return;
    
    const feedback: PostFeedback = {
      id: `feedback_${selectedItem.id}_${Date.now()}`,
      postId: selectedItem.id,
      rating: currentRating,
      improvementSuggestion: currentRating === 'dislike' ? feedbackText : undefined,
      betterVersion: currentRating === 'dislike' ? betterVersion : undefined,
      whatWorked: currentRating === 'like' ? whatWorked : undefined,
      categories: selectedCategories,
      createdAt: new Date().toISOString()
    };
    
    console.log('Submitting feedback:', feedback);
    // In real app, send to API
    
    // Reset form
    setShowFeedbackModal(false);
    setFeedbackText('');
    setBetterVersion('');
    setWhatWorked('');
    setSelectedCategories([]);
    setSelectedItem(null);
  };

  const getPlatformIcon = (platform: string) => {
    const platformData = platforms.find(p => p.value === platform);
    return platformData?.icon || '📱';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <UnifiedNavigation />

      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">🎓</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Training Center</h1>
              <p className="text-gray-300">Review AI-generated content and provide feedback to improve performance</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date Range</label>
              <select 
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                onChange={(e) => {
                  const hours = parseInt(e.target.value);
                  const newRange = {
                    start: new Date(Date.now() - hours * 60 * 60 * 1000),
                    end: new Date()
                  };
                  setDateRange(newRange);
                  setFilters(prev => ({ ...prev, dateRange: newRange }));
                }}
              >
                <option value="24">Last 24 hours</option>
                <option value="72">Last 3 days</option>
                <option value="168">Last week</option>
                <option value="720">Last month</option>
              </select>
            </div>

            {/* Platform Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Platforms</label>
              <select 
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                onChange={(e) => {
                  const platform = e.target.value;
                  setFilters(prev => ({
                    ...prev,
                    platforms: platform === 'all' ? [] : [platform]
                  }));
                }}
              >
                <option value="all">All Platforms</option>
                {platforms.map(platform => (
                  <option key={platform.value} value={platform.value}>
                    {platform.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
              <select 
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as any }))}
              >
                <option value="all">All Types</option>
                <option value="automated">Automated</option>
                <option value="suggested">Suggested</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select 
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as any }))}
              >
                <option value="all">All Status</option>
                <option value="posted">Posted</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300 text-sm">Total Content</h3>
              <span className="text-blue-400">📝</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{filteredPosts.length + filteredReplies.length}</div>
            <div className="text-green-400 text-sm">Last 24 hours</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300 text-sm">Approval Rate</h3>
              <span className="text-green-400">✅</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">87%</div>
            <div className="text-green-400 text-sm">+5% vs last week</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300 text-sm">Avg Engagement</h3>
              <span className="text-purple-400">❤️</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">234</div>
            <div className="text-green-400 text-sm">+12% vs last week</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300 text-sm">AI Confidence</h3>
              <span className="text-yellow-400">🤖</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">82%</div>
            <div className="text-yellow-400 text-sm">Improving</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'posts'
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            Posts ({filteredPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('replies')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'replies'
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            Replies ({filteredReplies.length})
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'insights'
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            Insights
          </button>
        </div>

        {/* Content */}
        {activeTab === 'posts' && (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">{getPlatformIcon(post.platform)}</span>
                    </div>
                    <div>
                      <span className="text-white font-medium capitalize">{post.platform}</span>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span className={`px-2 py-1 rounded text-xs ${
                          post.type === 'automated' ? 'bg-blue-500/20 text-blue-300' : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {post.type}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          post.status === 'posted' ? 'bg-green-500/20 text-green-300' : 
                          post.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {post.status}
                        </span>
                        <span>AI Confidence: {post.aiConfidence}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleFeedback(post, 'like')}
                      className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                    >
                      👍
                    </button>
                    <button
                      onClick={() => handleFeedback(post, 'dislike')}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      👎
                    </button>
                  </div>
                </div>
                
                <p className="text-white mb-4">{post.content}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Created: {formatDate(post.createdAt)}</span>
                  {post.engagement && (
                    <div className="flex space-x-4">
                      <span>❤️ {post.engagement.likes}</span>
                      <span>🔄 {post.engagement.shares}</span>
                      <span>💬 {post.engagement.comments}</span>
                      <span>👁️ {post.engagement.views}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'replies' && (
          <div className="space-y-4">
            {filteredReplies.map((reply) => (
              <div key={reply.id} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">{getPlatformIcon(reply.platform)}</span>
                    </div>
                    <div>
                      <span className="text-white font-medium capitalize">{reply.platform}</span>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span className={`px-2 py-1 rounded text-xs ${
                          reply.type === 'automated' ? 'bg-blue-500/20 text-blue-300' : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {reply.type}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          reply.status === 'sent' ? 'bg-green-500/20 text-green-300' : 
                          reply.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {reply.status}
                        </span>
                        <span>AI Confidence: {reply.aiConfidence}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleFeedback(reply, 'like')}
                      className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                    >
                      👍
                    </button>
                    <button
                      onClick={() => handleFeedback(reply, 'dislike')}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      👎
                    </button>
                  </div>
                </div>
                
                {/* Original Post Context */}
                <div className="bg-white/5 rounded-lg p-3 mb-4">
                  <p className="text-gray-400 text-sm mb-1">Replying to: {reply.originalPost.author}</p>
                  <p className="text-gray-300 text-sm italic">"{reply.originalPost.content}"</p>
                </div>
                
                <p className="text-white mb-4">{reply.content}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Created: {formatDate(reply.createdAt)}</span>
                  {reply.sentAt && <span>Sent: {formatDate(reply.sentAt)}</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Overview */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Performance Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Average AI Confidence</span>
                  <span className="text-white font-bold">84%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Content Approval Rate</span>
                  <span className="text-white font-bold">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Average Engagement</span>
                  <span className="text-white font-bold">234 per post</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Most Active Platform</span>
                                      <span className="text-white font-bold">X</span>
                </div>
              </div>
            </div>

            {/* Improvement Areas */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Areas for Improvement</h3>
              <div className="space-y-3">
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-yellow-300 font-medium">Hashtag Usage</span>
                    <span className="text-yellow-300 text-sm">12 mentions</span>
                  </div>
                  <p className="text-gray-300 text-sm">Consider using more relevant hashtags to increase visibility</p>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-orange-300 font-medium">Engagement CTAs</span>
                    <span className="text-orange-300 text-sm">8 mentions</span>
                  </div>
                  <p className="text-gray-300 text-sm">Add more calls-to-action to encourage audience interaction</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-red-300 font-medium">Content Length</span>
                    <span className="text-red-300 text-sm">5 mentions</span>
                  </div>
                  <p className="text-gray-300 text-sm">Some posts may be too long for optimal engagement</p>
                </div>
              </div>
            </div>

            {/* Training Suggestions */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 lg:col-span-2">
              <h3 className="text-xl font-bold text-white mb-4">AI Training Suggestions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">📚 Content Library</h4>
                  <p className="text-gray-300 text-sm mb-3">Upload high-performing posts to train the AI on your best content</p>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                    Upload Content
                  </button>
                </div>
                <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">🎯 Brand Voice</h4>
                  <p className="text-gray-300 text-sm mb-3">Define your brand voice parameters more precisely</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                    Refine Voice
                  </button>
                </div>
                <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">📊 A/B Testing</h4>
                  <p className="text-gray-300 text-sm mb-3">Enable A/B testing for different content variations</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                    Enable Testing
                  </button>
                </div>
                <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">🔄 Feedback Loop</h4>
                  <p className="text-gray-300 text-sm mb-3">Set up automated performance feedback integration</p>
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700 transition-colors">
                    Configure Loop
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl p-6 border border-white/20 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">
                {currentRating === 'like' ? '👍 Great Content!' : '👎 Provide Feedback'}
              </h3>
              <button
                onClick={() => {
                  setShowFeedbackModal(false);
                  setFeedbackText('');
                  setBetterVersion('');
                  setWhatWorked('');
                  setSelectedCategories([]);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Original Content */}
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <h4 className="text-white font-semibold mb-2">Original Content:</h4>
              <p className="text-gray-300">{selectedItem.content}</p>
            </div>

            {/* Feedback Categories */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">
                {currentRating === 'like' ? 'What worked well?' : 'What needs improvement?'}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {(currentRating === 'like' ? positiveFeedbackCategories : negativeFeedbackCategories).map((category) => (
                  <button
                    key={category.value}
                    onClick={() => {
                      setSelectedCategories(prev => 
                        prev.includes(category.value)
                          ? prev.filter(c => c !== category.value)
                          : [...prev, category.value]
                      );
                    }}
                    className={`p-2 rounded-lg text-sm transition-colors ${
                      selectedCategories.includes(category.value)
                        ? (currentRating === 'like' ? 'bg-green-600 text-white' : 'bg-purple-600 text-white')
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Positive Feedback */}
            {currentRating === 'like' && (
              <div className="mb-6">
                <label className="block text-white font-semibold mb-2">
                  What specifically worked well? (Optional)
                </label>
                <textarea
                  value={whatWorked}
                  onChange={(e) => setWhatWorked(e.target.value)}
                  placeholder="Explain what made this content effective and engaging..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none h-24"
                />
              </div>
            )}

            {/* Negative Feedback */}
            {currentRating === 'dislike' && (
              <>
                <div className="mb-6">
                  <label className="block text-white font-semibold mb-2">
                    How would you improve this? (Optional)
                  </label>
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Explain what could be better about this content..."
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none h-24"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-white font-semibold mb-2">
                    Write a better version (Optional)
                  </label>
                  <textarea
                    value={betterVersion}
                    onChange={(e) => setBetterVersion(e.target.value)}
                    placeholder="Write how you would have created this content..."
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none h-32"
                  />
                </div>
              </>
            )}

            {/* Actions */}
            <div className="flex space-x-4">
              <button
                onClick={submitFeedback}
                className={`flex-1 text-white py-3 rounded-lg font-semibold transition-all ${
                  currentRating === 'like' 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                }`}
              >
                {currentRating === 'like' ? 'Submit Positive Feedback' : 'Submit Improvement Feedback'}
              </button>
              <button
                onClick={() => {
                  setShowFeedbackModal(false);
                  setFeedbackText('');
                  setBetterVersion('');
                  setWhatWorked('');
                  setSelectedCategories([]);
                }}
                className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 