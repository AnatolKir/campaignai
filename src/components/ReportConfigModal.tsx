"use client";

import React, { useState } from 'react';
import { ReportConfigFormData, CompetitorWithCategory, CompetitorCategory } from '../types/competitive-intelligence';

interface ReportConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  competitors?: CompetitorWithCategory[];
  categories?: CompetitorCategory[];
  onSave?: (config: ReportConfigFormData) => void;
}

export function ReportConfigModal({ 
  isOpen, 
  onClose, 
  competitors = [], 
  categories = [],
  onSave 
}: ReportConfigModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ReportConfigFormData>({
    name: '',
    description: '',
    competitor_ids: [],
    category_ids: [],
    include_recent_posts: true,
    include_post_frequency: true,
    include_engagement_metrics: true,
    include_top_posts: true,
    include_follower_growth: false,
    include_posting_patterns: false,
    include_hashtag_analysis: false,
    include_keyword_mentions: false,
    include_sentiment_analysis: false,
    frequency: 'weekly',
    custom_schedule: '',
    delivery_methods: ['dashboard'],
    email_recipients: [],
    telegram_chat_id: '',
    whatsapp_number: '',
    slack_webhook: '',
    enable_instant_alerts: false,
    alert_on_new_post: false,
    alert_on_high_engagement: false,
    engagement_threshold: 10000,
  });
  
  const [newEmailRecipient, setNewEmailRecipient] = useState('');

  if (!isOpen) return null;

  const updateFormData = (field: keyof ReportConfigFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (array: string[], value: string) => {
    return array.includes(value) 
      ? array.filter(item => item !== value)
      : [...array, value];
  };

  const addEmailRecipient = () => {
    if (newEmailRecipient && !formData.email_recipients?.includes(newEmailRecipient)) {
      updateFormData('email_recipients', [...(formData.email_recipients || []), newEmailRecipient]);
      setNewEmailRecipient('');
    }
  };

  const removeEmailRecipient = (email: string) => {
    updateFormData('email_recipients', formData.email_recipients?.filter(e => e !== email) || []);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  const isFormValid = () => {
    return formData.name.trim() !== '' && 
           (formData.competitor_ids.length > 0 || formData.category_ids.length > 0) &&
           formData.delivery_methods.length > 0;
  };

  const getSelectedDataOptionsCount = () => {
    const dataOptions = [
      'include_recent_posts', 'include_post_frequency', 'include_engagement_metrics',
      'include_top_posts', 'include_follower_growth', 'include_posting_patterns',
      'include_hashtag_analysis', 'include_keyword_mentions', 'include_sentiment_analysis'
    ];
    return dataOptions.filter(option => formData[option as keyof ReportConfigFormData]).length;
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {[1, 2, 3, 4].map((stepNum) => (
        <div key={stepNum} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
            step >= stepNum ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'
          }`}>
            {stepNum}
          </div>
          {stepNum < 4 && (
            <div className={`w-12 h-0.5 mx-2 transition-colors ${
              step > stepNum ? 'bg-purple-600' : 'bg-white/10'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const Step1BasicInfo = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Basic Information</h3>
        <p className="text-gray-400 mb-6">Set up the basic details for your competitive intelligence report.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-white font-medium mb-2">Report Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            placeholder="e.g., Weekly Competitor Analysis"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            placeholder="Optional description of what this report covers..."
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Competitors to Monitor *</label>
          <p className="text-gray-400 text-sm mb-3">Select specific competitors or entire categories to include in this report.</p>
          
          {categories.length > 0 && (
            <div className="mb-4">
              <h4 className="text-white font-medium mb-2">By Category</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10">
                    <input
                      type="checkbox"
                      checked={formData.category_ids.includes(category.id)}
                      onChange={(e) => updateFormData('category_ids', 
                        e.target.checked 
                          ? [...formData.category_ids, category.id]
                          : formData.category_ids.filter(id => id !== category.id)
                      )}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                      <span className="text-white">{category.name}</span>
                      <span className="text-gray-400 text-sm">({category.competitor_count} competitors)</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {competitors.length > 0 && (
            <div>
              <h4 className="text-white font-medium mb-2">Individual Competitors</h4>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {competitors.map((competitor) => (
                  <label key={competitor.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10">
                    <input
                      type="checkbox"
                      checked={formData.competitor_ids.includes(competitor.id)}
                      onChange={(e) => updateFormData('competitor_ids',
                        e.target.checked
                          ? [...formData.competitor_ids, competitor.id]
                          : formData.competitor_ids.filter(id => id !== competitor.id)
                      )}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-medium text-sm">
                        {competitor.name.charAt(0)}
                      </div>
                      <div>
                        <span className="text-white font-medium">{competitor.name}</span>
                        <div className="text-gray-400 text-sm">{competitor.handle} • {competitor.platform}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {competitors.length === 0 && categories.length === 0 && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <span className="text-yellow-400 text-lg">⚠️</span>
                <div>
                  <h4 className="text-yellow-400 font-medium mb-1">No Competitors Added</h4>
                  <p className="text-gray-300 text-sm">
                    You need to add competitors first using the Target Accounts tool. Go to Competitors tab to add them.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const Step2DataOptions = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Data Options</h3>
        <p className="text-gray-400 mb-6">Choose what competitive intelligence data to include in your reports.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            key: 'include_recent_posts',
            title: 'Recent Posts',
            description: 'Latest posts with content, links, and performance metrics',
            icon: '📝',
            recommended: true
          },
          {
            key: 'include_post_frequency',
            title: 'Post Frequency Trends',
            description: 'How often competitors are posting over time',
            icon: '📊',
            recommended: true
          },
          {
            key: 'include_engagement_metrics',
            title: 'Engagement Metrics',
            description: 'Likes, comments, shares, and engagement rates',
            icon: '❤️',
            recommended: true
          },
          {
            key: 'include_top_posts',
            title: 'Top-Performing Posts',
            description: 'Best performing content by engagement',
            icon: '🏆',
            recommended: true
          },
          {
            key: 'include_follower_growth',
            title: 'Follower Growth Tracking',
            description: 'Monitor audience growth and decline patterns',
            icon: '📈'
          },
          {
            key: 'include_posting_patterns',
            title: 'Posting Time Patterns',
            description: 'Optimal posting times and frequency analysis',
            icon: '⏰'
          },
          {
            key: 'include_hashtag_analysis',
            title: 'Hashtag Usage Analysis',
            description: 'Trending hashtags and their performance impact',
            icon: '#️⃣'
          },
          {
            key: 'include_keyword_mentions',
            title: 'Keyword Mentions',
            description: 'Track specific keywords and brand mentions',
            icon: '🔍'
          },
          {
            key: 'include_sentiment_analysis',
            title: 'Sentiment Analysis',
            description: 'AI-powered sentiment analysis of posts and comments',
            icon: '😊'
          }
        ].map((option) => (
          <label key={option.key} className={`block p-4 border rounded-lg cursor-pointer transition-all hover:bg-white/5 ${
            formData[option.key as keyof ReportConfigFormData] 
              ? 'bg-purple-500/10 border-purple-500/30' 
              : 'bg-white/5 border-white/10'
          }`}>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData[option.key as keyof ReportConfigFormData] as boolean}
                onChange={(e) => updateFormData(option.key as keyof ReportConfigFormData, e.target.checked)}
                className="mt-1 w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">{option.icon}</span>
                  <span className="font-medium text-white">{option.title}</span>
                  {option.recommended && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">Recommended</span>
                  )}
                </div>
                <p className="text-gray-400 text-sm">{option.description}</p>
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-blue-400 text-lg">💡</span>
          <div>
            <h4 className="text-blue-400 font-medium mb-1">Smart Recommendations</h4>
            <p className="text-gray-300 text-sm">
              We recommend starting with the basic options (Recent Posts, Engagement Metrics, etc.) for your first report. 
              You can always add more data points later as you get familiar with the insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const Step3Schedule = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Schedule & Frequency</h3>
        <p className="text-gray-400 mb-6">Set how often you want to receive competitive intelligence reports.</p>
      </div>

      <div>
        <label className="block text-white font-medium mb-3">Report Frequency</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { value: 'realtime', label: 'Real-time', description: 'Instant updates as they happen', icon: '⚡' },
            { value: 'daily', label: 'Daily', description: 'Every day at 9:00 AM', icon: '📅' },
            { value: 'weekly', label: 'Weekly', description: 'Every Monday at 9:00 AM', icon: '📊' },
            { value: 'monthly', label: 'Monthly', description: 'First Monday of each month', icon: '📋' }
          ].map((freq) => (
            <label key={freq.value} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
              formData.frequency === freq.value
                ? 'bg-purple-500/10 border-purple-500/30'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}>
              <input
                type="radio"
                name="frequency"
                value={freq.value}
                checked={formData.frequency === freq.value}
                onChange={(e) => updateFormData('frequency', e.target.value)}
                className="w-4 h-4 text-purple-600 mr-3"
              />
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{freq.icon}</span>
                <div>
                  <div className="font-medium text-white">{freq.label}</div>
                  <div className="text-gray-400 text-sm">{freq.description}</div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <h4 className="text-white font-medium mb-3">Real-time Alerts</h4>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.enable_instant_alerts}
              onChange={(e) => updateFormData('enable_instant_alerts', e.target.checked)}
              className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
            />
            <span className="text-white">Enable instant alerts</span>
          </label>

          {formData.enable_instant_alerts && (
            <div className="ml-7 space-y-3 pt-3 border-t border-white/10">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.alert_on_new_post}
                  onChange={(e) => updateFormData('alert_on_new_post', e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-gray-300">Alert when competitors post new content</span>
              </label>

              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.alert_on_high_engagement}
                    onChange={(e) => updateFormData('alert_on_high_engagement', e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-300">Alert on high engagement posts</span>
                </label>
                {formData.alert_on_high_engagement && (
                  <div className="ml-7">
                    <label className="block text-gray-400 text-sm mb-1">Engagement threshold</label>
                    <input
                      type="number"
                      value={formData.engagement_threshold}
                      onChange={(e) => updateFormData('engagement_threshold', parseInt(e.target.value) || 0)}
                      placeholder="10000"
                      className="w-32 bg-white/5 border border-white/10 rounded px-3 py-1 text-white text-sm focus:outline-none focus:border-purple-500"
                    />
                    <span className="text-gray-400 text-sm ml-2">engagements</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const Step4Delivery = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Delivery Options</h3>
        <p className="text-gray-400 mb-6">Choose how and where you want to receive your competitive intelligence reports.</p>
      </div>

      <div>
        <label className="block text-white font-medium mb-3">Delivery Methods *</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { value: 'dashboard', label: 'In-app Dashboard', description: 'View reports directly in the platform', icon: '📊', always: true },
            { value: 'email', label: 'Email Reports', description: 'Receive formatted reports via email', icon: '📧' },
            { value: 'slack', label: 'Slack Integration', description: 'Post summaries to Slack channels', icon: '💬' },
            { value: 'telegram', label: 'Telegram Notifications', description: 'Get alerts on Telegram', icon: '✈️' },
            { value: 'whatsapp', label: 'WhatsApp Alerts', description: 'Receive updates on WhatsApp', icon: '📱' }
          ].map((method) => (
            <label key={method.value} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
              formData.delivery_methods.includes(method.value)
                ? 'bg-purple-500/10 border-purple-500/30'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            } ${method.always ? 'opacity-75' : ''}`}>
              <input
                type="checkbox"
                checked={formData.delivery_methods.includes(method.value)}
                onChange={(e) => {
                  if (!method.always) {
                    updateFormData('delivery_methods', 
                      e.target.checked
                        ? [...formData.delivery_methods, method.value]
                        : formData.delivery_methods.filter(m => m !== method.value)
                    );
                  }
                }}
                disabled={method.always}
                className="w-4 h-4 text-purple-600 mr-3"
              />
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{method.icon}</span>
                <div>
                  <div className="font-medium text-white">
                    {method.label}
                    {method.always && <span className="text-gray-400 text-sm ml-2">(Always included)</span>}
                  </div>
                  <div className="text-gray-400 text-sm">{method.description}</div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Email Recipients */}
      {formData.delivery_methods.includes('email') && (
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">Email Recipients</h4>
          <div className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="email"
                value={newEmailRecipient}
                onChange={(e) => setNewEmailRecipient(e.target.value)}
                placeholder="colleague@company.com"
                className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-purple-500"
                onKeyPress={(e) => e.key === 'Enter' && addEmailRecipient()}
              />
              <button
                onClick={addEmailRecipient}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition-colors"
              >
                Add
              </button>
            </div>
            {formData.email_recipients && formData.email_recipients.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.email_recipients.map((email) => (
                  <span key={email} className="flex items-center space-x-2 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                    <span>{email}</span>
                    <button
                      onClick={() => removeEmailRecipient(email)}
                      className="text-purple-400 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Slack Configuration */}
      {formData.delivery_methods.includes('slack') && (
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">Slack Configuration</h4>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Slack Webhook URL</label>
            <input
              type="url"
              value={formData.slack_webhook}
              onChange={(e) => updateFormData('slack_webhook', e.target.value)}
              placeholder="https://hooks.slack.com/services/..."
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
            <p className="text-gray-500 text-xs mt-1">
              <a href="https://api.slack.com/messaging/webhooks" target="_blank" className="text-blue-400 hover:text-blue-300">
                Learn how to create a Slack webhook →
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Telegram Configuration */}
      {formData.delivery_methods.includes('telegram') && (
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">Telegram Configuration</h4>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Chat ID</label>
            <input
              type="text"
              value={formData.telegram_chat_id}
              onChange={(e) => updateFormData('telegram_chat_id', e.target.value)}
              placeholder="@username or chat ID"
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      )}

      {/* WhatsApp Configuration */}
      {formData.delivery_methods.includes('whatsapp') && (
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">WhatsApp Configuration</h4>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Phone Number</label>
            <input
              type="tel"
              value={formData.whatsapp_number}
              onChange={(e) => updateFormData('whatsapp_number', e.target.value)}
              placeholder="+1234567890"
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      )}

      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-green-400 text-lg">🎯</span>
          <div>
            <h4 className="text-green-400 font-medium mb-1">Export Options Available</h4>
            <p className="text-gray-300 text-sm">
              All reports can be exported as PDF or CSV files directly from the dashboard. 
              This gives you flexibility to share insights with stakeholders or import data into other tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 1: return <Step1BasicInfo />;
      case 2: return <Step2DataOptions />;
      case 3: return <Step3Schedule />;
      case 4: return <Step4Delivery />;
      default: return <Step1BasicInfo />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000000] flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-lg rounded-3xl border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white">Create Report Configuration</h2>
            <p className="text-gray-400">Set up automated competitive intelligence reports</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <StepIndicator />
          
          <div className="overflow-y-auto max-h-96">
            {renderCurrentStep()}
          </div>
        </div>

        <div className="flex justify-between items-center p-6 border-t border-white/10">
          <div className="text-gray-400 text-sm">
            {step === 2 && `${getSelectedDataOptionsCount()} data options selected`}
            {step === 4 && `${formData.delivery_methods.length} delivery methods selected`}
          </div>
          
          <div className="flex space-x-4">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors"
              >
                Previous
              </button>
            )}
            
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && (!formData.name.trim() || (formData.competitor_ids.length === 0 && formData.category_ids.length === 0))}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={!isFormValid()}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Report
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 