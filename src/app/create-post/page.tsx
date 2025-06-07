"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDropzone } from 'react-dropzone';
import { UnifiedNavigation } from '../../components/UnifiedNavigation';
import { 
  Platform, 
  SUPPORTED_PLATFORMS,
  formatContentForAllPlatforms,
  getPlatformInfo,
  type PostContent,
  type FormattedPost 
} from '../../utils/ai_platform_formatter';
import {
  CreatePostFormData,
  CreatePostStep,
  CreatePostErrors,
  PlatformPreview,
  AIFormattingStatus,
  PostCreationStatus,
  MediaFile,
  PlatformSpecificMention
} from '../../types/create-post';
import { PlatformSpecificMentions } from '../../components/PlatformSpecificMentions';
import { TimezoneSelector } from '../../components/TimezoneSelector';

// Form validation schema
const createPostSchema = z.object({
  mainContent: z.string()
    .min(10, 'Content must be at least 10 characters')
    .max(10000, 'Content must be less than 10,000 characters'),
  hashtags: z.array(z.string()).optional(),
  mentions: z.array(z.any()).optional(), // Will contain PlatformSpecificMention objects
  selectedPlatforms: z.array(z.string())
    .min(1, 'Please select at least one platform'),
  schedulingOption: z.enum(['immediate', 'scheduled']),
  scheduledDate: z.string().optional(),
  scheduledTime: z.string().optional(),
  timezone: z.string().optional(),
});

type FormData = z.infer<typeof createPostSchema>;

export default function CreatePostPage() {
  // Form state
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      mainContent: '',
      hashtags: [],
      mentions: [],
      selectedPlatforms: [],
      schedulingOption: 'immediate',
      timezone: 'America/New_York'
    }
  });

  // State management
  const [currentStep, setCurrentStep] = useState<CreatePostStep>('content');
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [platformPreviews, setPlatformPreviews] = useState<PlatformPreview[]>([]);
  const [aiFormattingStatus, setAIFormattingStatus] = useState<AIFormattingStatus>({
    status: 'idle',
    progress: 0
  });
  const [postCreationStatus, setPostCreationStatus] = useState<PostCreationStatus>({
    status: 'idle'
  });
  const [hashtagInput, setHashtagInput] = useState('');

  // Watch form values
  const watchedValues = watch();
  const { mainContent, selectedPlatforms, schedulingOption } = watchedValues;

  // File upload handler
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newMediaFiles: MediaFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      type: file.type.startsWith('image/') ? 'image' : 
            file.type.startsWith('video/') ? 'video' : 'document',
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      size: file.size,
      name: file.name
    }));

    setMediaFiles(prev => [...prev, ...newMediaFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi', '.wmv'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  // Handle adding hashtags
  const addHashtag = () => {
    if (hashtagInput.trim()) {
      const newHashtag = hashtagInput.startsWith('#') ? hashtagInput.trim() : `#${hashtagInput.trim()}`;
      const currentHashtags = watchedValues.hashtags || [];
      if (!currentHashtags.includes(newHashtag)) {
        setValue('hashtags', [...currentHashtags, newHashtag]);
      }
      setHashtagInput('');
    }
  };

  // Platform-specific mentions are handled by the PlatformSpecificMentions component

  // Generate AI previews for selected platforms
  const generatePreviews = async () => {
    if (!selectedPlatforms.length || !mainContent.trim()) return;

    setAIFormattingStatus({ status: 'processing', progress: 0 });
    setCurrentStep('previews');

    try {
      const content: PostContent = {
        mainContent,
        hashtags: watchedValues.hashtags || [],
        mentions: (watchedValues.mentions || []).map((mention: PlatformSpecificMention) => mention.displayName),
        mediaUrls: mediaFiles.map(file => file.preview || file.name),
        links: [] // TODO: Extract links from content
      };

      const platforms = selectedPlatforms as Platform[];
      let processedCount = 0;
      
      // Process platforms one by one to show progress
      const previews: PlatformPreview[] = [];
      
      for (const platform of platforms) {
        setAIFormattingStatus(prev => ({ 
          ...prev, 
          currentPlatform: platform,
          progress: (processedCount / platforms.length) * 100 
        }));

        const formattedPost = await formatContentForAllPlatforms(content, [platform]);
        const result = formattedPost[0];

        previews.push({
          platform,
          content: result.content,
          hashtags: result.hashtags,
          mentions: result.mentions,
          characterCount: result.characterCount,
          characterLimit: getCharacterLimit(platform),
          warnings: result.warnings,
          suggestions: result.suggestions,
          isEdited: false
        });

        processedCount++;
        setAIFormattingStatus(prev => ({ 
          ...prev, 
          progress: (processedCount / platforms.length) * 100 
        }));

        // Add small delay to show progress
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      setPlatformPreviews(previews);
      setAIFormattingStatus({ status: 'complete', progress: 100 });
    } catch (error) {
      console.error('Error generating previews:', error);
      setAIFormattingStatus({ 
        status: 'error', 
        progress: 0,
        error: 'Failed to generate platform previews' 
      });
    }
  };

  // Get character limit for platform
  const getCharacterLimit = (platform: Platform): number => {
    const limits: Record<Platform, number> = {
      instagram: 2200,
      twitter_x: 280,
      linkedin: 3000,
      tiktok: 2200,
      youtube: 5000,
      reddit: 40000,
      discord: 2000,
      telegram: 4096,
      whatsapp_business: 65536,
      threads: 500
    };
    return limits[platform] || 1000;
  };

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setPostCreationStatus({ status: 'creating' });

    try {
      // TODO: Implement actual post creation logic
      // This would typically involve:
      // 1. Uploading media files
      // 2. Creating post records in database
      // 3. Scheduling posts if needed
      // 4. Sending to social media APIs

      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

      setPostCreationStatus({ 
        status: 'success', 
        message: 'Post created successfully!',
        postId: Math.random().toString(36).substr(2, 9)
      });
    } catch (error) {
      setPostCreationStatus({ 
        status: 'error', 
        message: 'Failed to create post. Please try again.' 
      });
    }
  };

  // Step navigation
  const nextStep = () => {
    switch (currentStep) {
      case 'content':
        if (mainContent.trim()) setCurrentStep('platforms');
        break;
      case 'platforms':
        if (selectedPlatforms.length > 0) generatePreviews();
        break;
      case 'previews':
        setCurrentStep('schedule');
        break;
    }
  };

  const prevStep = () => {
    switch (currentStep) {
      case 'platforms':
        setCurrentStep('content');
        break;
      case 'previews':
        setCurrentStep('platforms');
        break;
      case 'schedule':
        setCurrentStep('previews');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <UnifiedNavigation />
      
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Post</h1>
          <p className="text-gray-300">
            Create, schedule, and publish AI-powered posts optimized for every social media platform
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              { key: 'content', label: 'Content Input', icon: '✍️' },
              { key: 'platforms', label: 'Platform Selection', icon: '🌐' },
              { key: 'previews', label: 'AI Formatting & Previews', icon: '🤖' },
              { key: 'schedule', label: 'Scheduling Options', icon: '📅' }
            ].map((step, index) => (
              <div key={step.key} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep === step.key 
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : steps.indexOf(currentStep) > index
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'bg-white/10 border-white/20 text-gray-400'
                }`}>
                  <span className="text-sm">{step.icon}</span>
                </div>
                <div className="ml-3 flex-1">
                  <p className={`text-sm font-medium ${
                    currentStep === step.key ? 'text-white' : 'text-gray-300'
                  }`}>
                    {step.label}
                  </p>
                </div>
                {index < 3 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    steps.indexOf(currentStep) > index ? 'bg-green-600' : 'bg-white/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Step 1: Content Input */}
          {currentStep === 'content' && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold mb-6">Step 1: Content Input</h2>
              
              {/* Main Content */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Main Post Content *
                </label>
                <Controller
                  name="mainContent"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      placeholder="Write your post content here..."
                      rows={8}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                  )}
                />
                {errors.mainContent && (
                  <p className="text-red-400 text-sm mt-1">{errors.mainContent.message}</p>
                )}
                <div className="text-right text-sm text-gray-400 mt-1">
                  {mainContent?.length || 0} / 10,000 characters
                </div>
              </div>

              {/* Hashtags */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Hashtags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={hashtagInput}
                    onChange={(e) => setHashtagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHashtag())}
                    placeholder="Enter hashtag..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    onClick={addHashtag}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(watchedValues.hashtags || []).map((hashtag, index) => (
                    <span
                      key={index}
                      className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30 flex items-center gap-2"
                    >
                      {hashtag}
                      <button
                        type="button"
                        onClick={() => {
                          const newHashtags = (watchedValues.hashtags || []).filter((_, i) => i !== index);
                          setValue('hashtags', newHashtags);
                        }}
                        className="text-purple-400 hover:text-purple-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Mentions */}
              <div className="mb-6">
                <PlatformSpecificMentions
                  mentions={watchedValues.mentions || []}
                  selectedPlatforms={watchedValues.selectedPlatforms as Platform[]}
                  onChange={(mentions) => setValue('mentions', mentions)}
                />
              </div>

              {/* Media Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Media Files
                </label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    isDragActive 
                      ? 'border-purple-400 bg-purple-500/10' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="text-4xl mb-2">📁</div>
                  <p className="text-gray-300 mb-1">
                    {isDragActive ? 'Drop files here...' : 'Drag & drop files here, or click to select'}
                  </p>
                  <p className="text-sm text-gray-400">
                    Support images, videos, and documents (max 100MB)
                  </p>
                </div>
                
                {/* Media Preview */}
                {mediaFiles.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {mediaFiles.map((file) => (
                      <div key={file.id} className="relative group">
                        <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                          {file.type === 'image' && file.preview ? (
                            <img
                              src={file.preview}
                              alt={file.name}
                              className="w-full h-20 object-cover rounded"
                            />
                          ) : (
                            <div className="w-full h-20 flex items-center justify-center">
                              <span className="text-2xl">
                                {file.type === 'video' ? '🎥' : '📄'}
                              </span>
                            </div>
                          )}
                          <p className="text-xs text-gray-300 mt-2 truncate">{file.name}</p>
                          <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setMediaFiles(prev => prev.filter(f => f.id !== file.id));
                            if (file.preview) {
                              URL.revokeObjectURL(file.preview);
                            }
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!mainContent.trim()}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Select Platforms
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Platform Selection */}
          {currentStep === 'platforms' && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold mb-6">Step 2: Platform Selection</h2>
              
              <Controller
                name="selectedPlatforms"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {SUPPORTED_PLATFORMS.map((platform) => {
                      const info = getPlatformInfo(platform);
                      const isSelected = field.value.includes(platform);
                      
                      return (
                        <div
                          key={platform}
                          onClick={() => {
                            const newSelected = isSelected
                              ? field.value.filter(p => p !== platform)
                              : [...field.value, platform];
                            field.onChange(newSelected);
                          }}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-purple-500 bg-purple-500/20'
                              : 'border-white/20 bg-white/5 hover:border-white/40'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{info.icon}</span>
                            <div className="flex-1">
                              <h3 className="font-medium text-white">{info.name}</h3>
                              <p className="text-sm text-gray-300">{info.description}</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 ${
                              isSelected ? 'bg-purple-500 border-purple-500' : 'border-white/40'
                            }`}>
                              {isSelected && (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="text-white text-xs">✓</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              />
              
              {errors.selectedPlatforms && (
                <p className="text-red-400 text-sm mb-4">{errors.selectedPlatforms.message}</p>
              )}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={selectedPlatforms.length === 0}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Generate Previews
                </button>
              </div>
            </div>
          )}

          {/* Step 3: AI Formatting & Previews */}
          {currentStep === 'previews' && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold mb-6">Step 3: AI Formatting & Previews</h2>
              
              {/* AI Processing Status */}
              {aiFormattingStatus.status === 'processing' && (
                <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
                    <span className="text-blue-300">
                      Generating AI-optimized content for {aiFormattingStatus.currentPlatform}...
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${aiFormattingStatus.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Error State */}
              {aiFormattingStatus.status === 'error' && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-300">{aiFormattingStatus.error}</p>
                  <button
                    type="button"
                    onClick={generatePreviews}
                    className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Platform Previews */}
              {platformPreviews.length > 0 && (
                <div className="space-y-6 mb-6">
                  {platformPreviews.map((preview) => {
                    const info = getPlatformInfo(preview.platform);
                    
                    return (
                      <div key={preview.platform} className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{info.icon}</span>
                            <h3 className="font-semibold text-white">{info.name}</h3>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm ${
                              preview.characterCount > preview.characterLimit 
                                ? 'text-red-400' 
                                : 'text-green-400'
                            }`}>
                              {preview.characterCount}/{preview.characterLimit}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                // TODO: Reset to AI suggested content
                                console.log('Reset to AI suggested for', preview.platform);
                              }}
                              className="text-xs bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors"
                            >
                              Reset to AI Suggested
                            </button>
                          </div>
                        </div>
                        
                        {/* Editable Content */}
                        <textarea
                          value={preview.content}
                          onChange={(e) => {
                            const updatedPreviews = platformPreviews.map(p =>
                              p.platform === preview.platform
                                ? { ...p, content: e.target.value, isEdited: true, characterCount: e.target.value.length }
                                : p
                            );
                            setPlatformPreviews(updatedPreviews);
                          }}
                          rows={6}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none mb-3"
                        />
                        
                        {/* Warnings and Suggestions */}
                        {preview.warnings.length > 0 && (
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-yellow-400 mb-1">⚠️ Warnings:</h4>
                            <ul className="text-sm text-yellow-300 space-y-1">
                              {preview.warnings.map((warning, index) => (
                                <li key={index}>• {warning}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {preview.suggestions.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-blue-400 mb-1">💡 Suggestions:</h4>
                            <ul className="text-sm text-blue-300 space-y-1">
                              {preview.suggestions.map((suggestion, index) => (
                                <li key={index}>• {suggestion}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={platformPreviews.length === 0}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Schedule Post
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Scheduling Options */}
          {currentStep === 'schedule' && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold mb-6">Step 4: Scheduling Options</h2>
              
              {/* Scheduling Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  When would you like to post?
                </label>
                <Controller
                  name="schedulingOption"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        onClick={() => field.onChange('immediate')}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          field.value === 'immediate'
                            ? 'border-green-500 bg-green-500/20'
                            : 'border-white/20 bg-white/5 hover:border-white/40'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">🚀</span>
                          <div>
                            <h3 className="font-medium text-white">Post Immediately</h3>
                            <p className="text-sm text-gray-300">Publish your post right away</p>
                          </div>
                        </div>
                      </div>
                      
                      <div
                        onClick={() => field.onChange('scheduled')}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          field.value === 'scheduled'
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-white/20 bg-white/5 hover:border-white/40'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">⏰</span>
                          <div>
                            <h3 className="font-medium text-white">Schedule Post</h3>
                            <p className="text-sm text-gray-300">Choose when to publish</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>

              {/* Scheduled DateTime */}
              {schedulingOption === 'scheduled' && (
                <div className="mb-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Date
                      </label>
                      <Controller
                        name="scheduledDate"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        )}
                      />
                      {errors.scheduledDate && (
                        <p className="text-red-400 text-sm mt-1">{errors.scheduledDate.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Time
                      </label>
                      <Controller
                        name="scheduledTime"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="time"
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        )}
                      />
                      {errors.scheduledTime && (
                        <p className="text-red-400 text-sm mt-1">{errors.scheduledTime.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Timezone
                    </label>
                    <Controller
                      name="timezone"
                      control={control}
                      render={({ field }) => (
                        <TimezoneSelector
                          value={field.value || 'America/New_York'}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
              )}

              {/* TODO Comments */}
              <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-2">🚧 Future Features</h3>
                <ul className="text-sm text-blue-200 space-y-1">
                  <li>• Integrate Calendar UI at /calendar</li>
                  <li>• Add "Suggested Post Templates" panel</li>
                  <li>• Add "A/B Testing Variants" feature</li>
                  <li>• Recurring post scheduling</li>
                  <li>• Best time recommendations based on audience data</li>
                </ul>
              </div>

              {/* Submit */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex space-x-3">
                  {schedulingOption === 'scheduled' && (
                    <button
                      type="button"
                      onClick={() => {
                        // TODO: Save as draft
                        console.log('Save as draft');
                      }}
                      className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      Save as Draft
                    </button>
                  )}
                  
                  <button
                    type="submit"
                    disabled={postCreationStatus.status === 'creating'}
                    className={`px-6 py-3 rounded-lg transition-all ${
                      schedulingOption === 'immediate'
                        ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                    } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {postCreationStatus.status === 'creating' ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Creating...</span>
                      </div>
                    ) : (
                      schedulingOption === 'immediate' ? 'Post Immediately' : 'Schedule Post'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Success/Error Messages */}
        {postCreationStatus.status === 'success' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full mx-4">
              <div className="text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-xl font-semibold text-white mb-2">Post Created Successfully!</h3>
                <p className="text-gray-300 mb-4">{postCreationStatus.message}</p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setPostCreationStatus({ status: 'idle' });
                      // Reset form or navigate
                    }}
                    className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Create Another
                  </button>
                  <button
                    onClick={() => {
                      // Navigate to posts page
                      window.location.href = '/posts';
                    }}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    View Posts
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {postCreationStatus.status === 'error' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full mx-4">
              <div className="text-center">
                <div className="text-4xl mb-4">❌</div>
                <h3 className="text-xl font-semibold text-white mb-2">Error Creating Post</h3>
                <p className="text-gray-300 mb-4">{postCreationStatus.message}</p>
                <button
                  onClick={() => setPostCreationStatus({ status: 'idle' })}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper array for step progression
const steps: CreatePostStep[] = ['content', 'platforms', 'previews', 'schedule']; 