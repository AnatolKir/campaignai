"use client";

import React from 'react';
import { ValidatedRadioGroup, ValidatedCheckbox, ValidatedSelect } from './ValidatedFormField';
import { SettingsConflict, SettingsWarning } from '../hooks/useSettingsValidation';
import { useTranslations } from 'next-intl';

interface ConsolidatedEngagementBehaviorProps {
  // Consolidated engagement style (replaces proactiveness + conversationStarters + followUpBehavior)
  engagementStyle: string;
  
  // Consolidated response timing (replaces responseSpeed + timingOptimization + approvalRequired)
  responseTiming: string;
  
  // Daily limits (unchanged)
  dailyLimits: {
    comments: number;
    likes: number;
    follows: number;
  };
  
  // Change handlers
  onChange: (field: string, value: string) => void;
  onDailyLimitsChange: (limits: { comments: number; likes: number; follows: number }) => void;
  
  // Validation props
  conflicts: SettingsConflict[];
  warnings: SettingsWarning[];
  isFieldDisabled: (fieldName: string, value: any) => boolean;
  getConflictingFields: (fieldName: string, value: any) => string[];
}

export const ConsolidatedEngagementBehavior: React.FC<ConsolidatedEngagementBehaviorProps> = ({
  engagementStyle,
  responseTiming,
  dailyLimits,
  onChange,
  onDailyLimitsChange,
  conflicts,
  warnings,
  isFieldDisabled,
  getConflictingFields
}) => {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h3 className="text-2xl font-bold text-white mb-4">Engagement Behavior</h3>
        <p className="text-gray-300 mb-6">Define how actively your AI agent engages with your audience and responds to interactions</p>
        
        <div className="space-y-8">
          {/* Engagement Style - Replaces proactiveness + conversationStarters + followUpBehavior */}
          <ValidatedSelect
            label="Engagement Style"
            fieldName="engagementStyle"
            description="How proactively your AI agent engages with your audience and initiates conversations"
            value={engagementStyle}
            options={[
              { 
                value: "observer", 
                label: t('engagement_behavior.observer'), 
                description: t('engagement_behavior.observer_description')
              },
              { 
                value: "participant", 
                label: t('engagement_behavior.participant'), 
                description: t('engagement_behavior.participant_description')
              },
              { 
                value: "leader", 
                label: t('engagement_behavior.leader'), 
                description: t('engagement_behavior.leader_description')
              }
            ]}
            onChange={(value) => onChange('engagementStyle', value)}
            conflicts={conflicts}
            warnings={warnings}
            isFieldDisabled={isFieldDisabled}
            getConflictingFields={getConflictingFields}
          />

          {/* Response Timing - Replaces responseSpeed + timingOptimization + partial approvalRequired */}
          <ValidatedRadioGroup
            label="Response Timing"
            fieldName="responseTiming"
            description="How quickly should your agent respond and who controls the timing?"
            value={responseTiming}
            options={[
              { 
                value: "immediate-auto", 
                label: "⚡ Immediate & Automatic", 
                description: "AI responds within minutes automatically. Best for real-time engagement and customer service scenarios." 
              },
              { 
                value: "optimized-auto", 
                label: "🎯 Optimized & Automatic", 
                description: "AI responds at optimal times automatically (within 1-4 hours). Good balance of timeliness and strategic timing." 
              },
              { 
                value: "scheduled-auto", 
                label: "📅 Scheduled & Automatic", 
                description: "AI responds during specific business hours automatically. Maintains professional boundaries while staying responsive." 
              },
              { 
                value: "manual-review", 
                label: "👤 Manual Review", 
                description: "All responses require your approval before posting. Maximum control but requires active management." 
              }
            ]}
            onChange={(value) => onChange('responseTiming', value)}
            conflicts={conflicts}
            warnings={warnings}
            isFieldDisabled={isFieldDisabled}
            getConflictingFields={getConflictingFields}
          />

          {/* Daily Engagement Limits */}
          <div>
            <label className="block text-white font-semibold mb-3">Daily Engagement Limits</label>
            <p className="text-gray-300 text-sm mb-4">Set healthy boundaries to prevent spam-like behavior and maintain authentic engagement</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <label className="block text-gray-300 text-sm mb-2">Max Comments per Day</label>
                <input
                  type="number"
                  min="0"
                  max="500"
                  value={dailyLimits.comments}
                  onChange={(e) => onDailyLimitsChange({
                    ...dailyLimits,
                    comments: parseInt(e.target.value) || 0
                  })}
                  className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
                />
                <div className="text-xs text-gray-400 mt-1">Recommended: 20-100</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <label className="block text-gray-300 text-sm mb-2">Max Likes per Day</label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={dailyLimits.likes}
                  onChange={(e) => onDailyLimitsChange({
                    ...dailyLimits,
                    likes: parseInt(e.target.value) || 0
                  })}
                  className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
                />
                <div className="text-xs text-gray-400 mt-1">Recommended: 50-300</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <label className="block text-gray-300 text-sm mb-2">Max Follows per Day</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={dailyLimits.follows}
                  onChange={(e) => onDailyLimitsChange({
                    ...dailyLimits,
                    follows: parseInt(e.target.value) || 0
                  })}
                  className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
                />
                <div className="text-xs text-gray-400 mt-1">Recommended: 10-50</div>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Style Preview */}
        <div className="mt-8 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg border border-green-500/30">
          <h4 className="text-white font-semibold mb-2">🎯 Engagement Preview</h4>
          <p className="text-green-200 text-sm">
            {getEngagementPreview(engagementStyle, responseTiming, dailyLimits)}
          </p>
        </div>

        {/* Smart Warnings */}
        {(engagementStyle === 'leader' && responseTiming === 'manual-review') && (
          <div className="mt-4 p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
            <h4 className="text-yellow-200 font-semibold mb-1">⚠️ Configuration Notice</h4>
            <p className="text-yellow-200 text-sm">
              Community Leader engagement style with Manual Review may create delays that hurt engagement. Consider using Optimized & Automatic for better results.
            </p>
          </div>
        )}

        {(dailyLimits.comments > 200 || dailyLimits.likes > 500) && (
          <div className="mt-4 p-4 bg-orange-900/30 rounded-lg border border-orange-500/30">
            <h4 className="text-orange-200 font-semibold mb-1">🚨 High Volume Warning</h4>
            <p className="text-orange-200 text-sm">
              Your daily limits are quite high. This may appear spam-like to platforms and audiences. Consider reducing for more authentic engagement.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to show what the engagement combination means in practice
function getEngagementPreview(style: string, timing: string, limits: { comments: number; likes: number; follows: number }): string {
  const styleMap: Record<string, string> = {
    'observer': 'Your agent will primarily respond when engaged, maintaining a respectful presence',
    'participant': 'Your agent will actively participate in conversations with a good balance of responding and initiating',
    'leader': 'Your agent will proactively lead discussions and build community engagement'
  };

  const timingMap: Record<string, string> = {
    'immediate-auto': 'responding within minutes automatically',
    'optimized-auto': 'responding at optimal times throughout the day',
    'scheduled-auto': 'responding during your set business hours',
    'manual-review': 'with all responses requiring your approval first'
  };

  const volumeLevel = limits.comments + limits.likes + limits.follows;
  const volumeDesc = volumeLevel < 100 ? 'conservative volume' : 
                    volumeLevel < 300 ? 'moderate volume' : 'high volume';

  return `${styleMap[style] || 'Balanced engagement'}, ${timingMap[timing] || 'standard timing'}, with ${volumeDesc} daily limits.`;
} 