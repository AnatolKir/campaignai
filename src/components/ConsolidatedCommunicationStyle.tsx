"use client";

import React from 'react';
import { ValidatedRadioGroup } from './ValidatedFormField';
import { SettingsConflict, SettingsWarning } from '../hooks/useSettingsValidation';

interface ConsolidatedCommunicationStyleProps {
  // Consolidated communication persona (replaces brandVoice + formalityLevel + communicationPreference)
  communicationPersona: string;
  
  // Consolidated response pattern (replaces responseLength + questionFrequency)
  responsePattern: string;
  
  // Simplified settings
  emojiUsage: string;
  humorLevel: string;
  
  // Change handler
  onChange: (field: string, value: string) => void;
  
  // Validation props
  conflicts: SettingsConflict[];
  warnings: SettingsWarning[];
  isFieldDisabled: (fieldName: string, value: any) => boolean;
  getConflictingFields: (fieldName: string, value: any) => string[];
}

export const ConsolidatedCommunicationStyle: React.FC<ConsolidatedCommunicationStyleProps> = ({
  communicationPersona,
  responsePattern,
  emojiUsage,
  humorLevel,
  onChange,
  conflicts,
  warnings,
  isFieldDisabled,
  getConflictingFields
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h3 className="text-2xl font-bold text-white mb-4">Communication Style</h3>
        <p className="text-gray-300 mb-6">Define how your AI agent communicates - this combines tone, formality, and interaction style into clear personas</p>
        
        <div className="space-y-8">
          {/* Communication Persona - Replaces brandVoice + formalityLevel + communicationPreference */}
          <ValidatedRadioGroup
            label="Communication Persona"
            fieldName="communicationPersona"
            description="Choose the overall communication style that best fits your brand. This combines tone, formality level, and interaction approach."
            value={communicationPersona}
            options={[
              { 
                value: "professional-expert", 
                label: "Professional Expert", 
                description: "Formal, authoritative, detailed responses. Perfect for B2B, consulting, or technical brands." 
              },
              { 
                value: "friendly-guide", 
                label: "Friendly Guide", 
                description: "Warm, helpful, conversational. Ideal for SaaS, education, or service-based businesses." 
              },
              { 
                value: "casual-friend", 
                label: "Casual Friend", 
                description: "Relaxed, informal, relatable. Great for lifestyle, consumer brands, or creative businesses." 
              },
              { 
                value: "witty-advisor", 
                label: "Witty Advisor", 
                description: "Clever, engaging, with light humor. Perfect for marketing, design, or entertainment brands." 
              }
            ]}
            onChange={(value) => onChange('communicationPersona', value)}
            conflicts={conflicts}
            warnings={warnings}
            isFieldDisabled={isFieldDisabled}
            getConflictingFields={getConflictingFields}
          />

          {/* Response Pattern - Replaces responseLength + questionFrequency */}
          <ValidatedRadioGroup
            label="Response Pattern"
            fieldName="responsePattern"
            description="How detailed should responses be and how often should your agent ask questions to engage the audience?"
            value={responsePattern}
            options={[
              { 
                value: "brief-direct", 
                label: "Brief & Direct", 
                description: "Short, concise responses (1-2 sentences) with minimal questions. Gets straight to the point." 
              },
              { 
                value: "balanced-interactive", 
                label: "Balanced & Interactive", 
                description: "Medium-length responses (3-5 sentences) with moderate questions. Good balance of information and engagement." 
              },
              { 
                value: "detailed-conversational", 
                label: "Detailed & Conversational", 
                description: "Comprehensive responses with frequent questions. Builds deep engagement through thorough explanations." 
              }
            ]}
            onChange={(value) => onChange('responsePattern', value)}
            conflicts={conflicts}
            warnings={warnings}
            isFieldDisabled={isFieldDisabled}
            getConflictingFields={getConflictingFields}
          />

          {/* Simplified Humor Level */}
          <ValidatedRadioGroup
            label="Humor Level"
            fieldName="humorLevel"
            description="How much humor should your agent use? Consider your audience and brand personality."
            value={humorLevel}
            options={[
              { 
                value: "none", 
                label: "Professional Only", 
                description: "No humor, strictly professional tone. Best for serious industries like finance, legal, or healthcare." 
              },
              { 
                value: "light", 
                label: "Light Touch", 
                description: "Occasional wit and clever remarks. Adds personality without being distracting." 
              },
              { 
                value: "frequent", 
                label: "Playful & Fun", 
                description: "Regular humor, puns, and playful tone. Great for creative or consumer-facing brands." 
              }
            ]}
            onChange={(value) => onChange('humorLevel', value)}
            conflicts={conflicts}
            warnings={warnings}
            isFieldDisabled={isFieldDisabled}
            getConflictingFields={getConflictingFields}
          />

          {/* Emoji Usage - Keep this separate as it's visual preference */}
          <ValidatedRadioGroup
            label="Emoji Usage"
            fieldName="emojiUsage"
            description="How many emojis should appear in posts and responses?"
            value={emojiUsage}
            options={[
              { value: "none", label: "None", description: "No emojis - purely text-based communication" },
              { value: "minimal", label: "Minimal (1-2)", description: "Occasional emojis for emphasis or emotion" },
              { value: "moderate", label: "Moderate (3-5)", description: "Regular emoji use to enhance engagement" },
              { value: "frequent", label: "Frequent (6+)", description: "Emoji-rich communication for high engagement" }
            ]}
            onChange={(value) => onChange('emojiUsage', value)}
            conflicts={conflicts}
            warnings={warnings}
            isFieldDisabled={isFieldDisabled}
            getConflictingFields={getConflictingFields}
          />
        </div>

        {/* Smart Suggestions Based on Combinations */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-500/30">
          <h4 className="text-white font-semibold mb-2">💡 Smart Combination Preview</h4>
          <p className="text-blue-200 text-sm">
            {getCombinationPreview(communicationPersona, responsePattern, humorLevel, emojiUsage)}
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper function to show what the combination means in practice
function getCombinationPreview(persona: string, pattern: string, humor: string, emoji: string): string {
  const personaMap: Record<string, string> = {
    'professional-expert': 'authoritative and formal',
    'friendly-guide': 'warm and helpful',
    'casual-friend': 'relaxed and relatable',
    'witty-advisor': 'clever and engaging'
  };

  const patternMap: Record<string, string> = {
    'brief-direct': 'with concise, focused responses',
    'balanced-interactive': 'with balanced detail and engagement',
    'detailed-conversational': 'with comprehensive explanations and active conversation'
  };

  const humorMap: Record<string, string> = {
    'none': 'maintaining professional seriousness',
    'light': 'adding occasional wit',
    'frequent': 'using playful humor'
  };

  const emojiMap: Record<string, string> = {
    'none': 'using no emojis',
    'minimal': 'with occasional emojis',
    'moderate': 'with regular emoji use',
    'frequent': 'with emoji-rich expression'
  };

  return `Your agent will sound ${personaMap[persona] || 'professional'}, ${patternMap[pattern] || 'balanced'}, ${humorMap[humor] || 'appropriate'}, ${emojiMap[emoji] || 'minimal emojis'}.`;
} 