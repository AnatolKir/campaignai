"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDropzone } from 'react-dropzone';
import { useTranslations, useLocale } from 'next-intl';
import { UnifiedNavigation } from '../../../components/UnifiedNavigation';

// Form validation schema
const createPostSchema = z.object({
  mainContent: z.string()
    .min(10, 'Content must be at least 10 characters')
    .max(10000, 'Content must be less than 10,000 characters'),
  hashtags: z.array(z.string()).optional(),
  mentions: z.array(z.any()).optional(),
  selectedPlatforms: z.array(z.string())
    .min(1, 'Please select at least one platform'),
  schedulingOption: z.enum(['immediate', 'scheduled']),
  scheduledDate: z.string().optional(),
  scheduledTime: z.string().optional(),
  timezone: z.string().optional(),
});

type FormData = z.infer<typeof createPostSchema>;

export default function CreatePostPage() {
  const t = useTranslations();
  const locale = useLocale();

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
  const [currentStep, setCurrentStep] = useState<'content' | 'platforms' | 'formatting' | 'scheduling'>('content');
  const [hashtagInput, setHashtagInput] = useState('');
  const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null);
  const [uploadedMedia, setUploadedMedia] = useState<File[]>([]);
  const [optimizedMedia, setOptimizedMedia] = useState<Record<string, File[]>>({});
  const [isProcessing, setIsProcessing] = useState<Record<string, boolean>>({});
  const [aiOptimizedContent, setAiOptimizedContent] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [selectedMediaForCrop, setSelectedMediaForCrop] = useState<{ file: File; platformId: string } | null>(null);
  const [showTextEditModal, setShowTextEditModal] = useState(false);
  const [selectedPlatformForEdit, setSelectedPlatformForEdit] = useState<string | null>(null);
  const [tempEditText, setTempEditText] = useState('');
  const [usedHashtags, setUsedHashtags] = useState<Set<string>>(new Set());

  // Watch form values
  const watchedValues = watch();
  const { mainContent, selectedPlatforms, schedulingOption } = watchedValues;

  // Helper function to create locale-aware URLs
  const createLocalizedUrl = (path: string) => {
    return `/${locale}${path}`;
  };

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

  // Text editor formatting functions
  const insertTextAtCursor = (beforeText: string, afterText: string = '') => {
    const textarea = document.querySelector('textarea[name="mainContent"]') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const newText = beforeText + selectedText + afterText;
    
    const newContent = 
      textarea.value.substring(0, start) + 
      newText + 
      textarea.value.substring(end);
    
    setValue('mainContent', newContent);
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + beforeText.length,
        start + beforeText.length + selectedText.length
      );
    }, 0);
  };

  const formatBold = () => insertTextAtCursor('**', '**');
  const formatItalic = () => insertTextAtCursor('*', '*');
  const formatUnderline = () => insertTextAtCursor('<u>', '</u>');
  const formatStrikethrough = () => insertTextAtCursor('~~', '~~');
  const formatH1 = () => insertTextAtCursor('# ');
  const formatH2 = () => insertTextAtCursor('## ');
  const formatH3 = () => insertTextAtCursor('### ');
  const formatBulletList = () => insertTextAtCursor('- ');
  const formatNumberedList = () => insertTextAtCursor('1. ');
  const formatLink = () => insertTextAtCursor('[', '](url)');

  // Media upload functionality (images and videos)
  const getFileSizeWarning = (file: File) => {
    const sizeInMB = file.size / (1024 * 1024);
    if (file.type.startsWith('video/')) {
      if (sizeInMB > 100) return { type: 'error', message: 'Video too large (>100MB)' };
      if (sizeInMB > 50) return { type: 'warning', message: 'Large video file (>50MB)' };
    } else if (file.type.startsWith('image/')) {
      if (sizeInMB > 10) return { type: 'warning', message: 'Large image file (>10MB)' };
    }
    return null;
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedMedia(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm']
    },
    multiple: true
  });

  const removeMedia = (index: number) => {
    setUploadedMedia(prev => prev.filter((_, i) => i !== index));
  };

  // Image resizing utility
  const resizeImage = (file: File, targetWidth: number, targetHeight: number, quality: number = 0.9): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        
        // Calculate scaling to maintain aspect ratio
        const scale = Math.min(targetWidth / img.width, targetHeight / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        
        // Center the image
        const x = (targetWidth - scaledWidth) / 2;
        const y = (targetHeight - scaledHeight) / 2;
        
        // Fill with white background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
        
        // Draw the resized image
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          }
        }, file.type, quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  // Platform-specific media optimization
  const optimizeMediaForPlatform = async (platformId: string) => {
    setIsProcessing(prev => ({ ...prev, [platformId]: true }));
    
    const platformSpecs: Record<string, { width: number; height: number; quality: number }> = {
      instagram: { width: 1080, height: 1080, quality: 0.85 },
      twitter: { width: 1200, height: 675, quality: 0.9 },
      linkedin: { width: 1200, height: 627, quality: 0.9 },
      tiktok: { width: 1080, height: 1920, quality: 0.8 },
      youtube: { width: 1920, height: 1080, quality: 0.95 },
      facebook: { width: 1200, height: 630, quality: 0.9 }
    };
    
    const spec = platformSpecs[platformId];
    if (!spec) {
      setIsProcessing(prev => ({ ...prev, [platformId]: false }));
      return;
    }
    
    try {
      const optimizedFiles: File[] = [];
      
      for (const file of uploadedMedia) {
        if (file.type.startsWith('image/')) {
          const resizedFile = await resizeImage(file, spec.width, spec.height, spec.quality);
          optimizedFiles.push(resizedFile);
        } else if (file.type.startsWith('video/')) {
          // For videos, we'll keep the original but add validation
          optimizedFiles.push(file);
        }
      }
      
      setOptimizedMedia(prev => ({ ...prev, [platformId]: optimizedFiles }));
    } catch (error) {
      console.error('Error optimizing media:', error);
    }
    
    setIsProcessing(prev => ({ ...prev, [platformId]: false }));
  };

  // AI Content Optimization
  const optimizeContentWithAI = async (platformId: string) => {
    if (!mainContent) return;
    
    setIsProcessing(prev => ({ ...prev, [`ai-${platformId}`]: true }));
    
    try {
      const response = await fetch('/api/optimize-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: mainContent,
          platform: platformId,
          hashtags: watchedValues.hashtags || []
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to optimize content');
      }

      const data = await response.json();
      
      setAiOptimizedContent(prev => ({
        ...prev,
        [platformId]: data.optimizedContent
      }));
    } catch (error) {
      console.error('AI optimization error:', error);
      // Fallback to original content if API fails
      setAiOptimizedContent(prev => ({
        ...prev,
        [platformId]: mainContent
      }));
    }
    
    setIsProcessing(prev => ({ ...prev, [`ai-${platformId}`]: false }));
  };

  // Revert functions
  const revertMediaOptimization = (platformId: string) => {
    setOptimizedMedia(prev => {
      const newState = { ...prev };
      delete newState[platformId];
      return newState;
    });
  };

  const revertAIOptimization = (platformId: string) => {
    setAiOptimizedContent(prev => {
      const newState = { ...prev };
      delete newState[platformId];
      return newState;
    });
  };

  const onSubmit = async (data: FormData) => {
    console.log('Creating post:', data);
    // Here you would typically send the data to your API
  };

  const nextStep = () => {
    const steps: Array<'content' | 'platforms' | 'formatting' | 'scheduling'> = ['content', 'platforms', 'formatting', 'scheduling'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps: Array<'content' | 'platforms' | 'formatting' | 'scheduling'> = ['content', 'platforms', 'formatting', 'scheduling'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const platforms = [
    { id: 'twitter', name: 'X (Twitter)', icon: '𝕏', color: 'bg-black' },
    { id: 'instagram', name: 'Instagram', icon: '📷', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'bg-blue-600' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'bg-black' },
    { id: 'youtube', name: 'YouTube', icon: '▶️', color: 'bg-red-600' },
    { id: 'facebook', name: 'Facebook', icon: '📘', color: 'bg-blue-700' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <UnifiedNavigation />
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Post</h1>
          <p className="text-gray-300">Create, schedule, and publish AI-powered posts optimized for every social media platform</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {/* Step 1: Content Input */}
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep === 'content' ? 'bg-purple-600' : 'bg-gray-600'
              }`}>
                <span className="text-sm font-medium">1</span>
              </div>
              <span className="ml-2 text-sm">Content Input</span>
            </div>
            
            <div className="w-16 h-0.5 bg-gray-600"></div>
            
            {/* Step 2: Platform Selection */}
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep === 'platforms' ? 'bg-purple-600' : 'bg-gray-600'
              }`}>
                <span className="text-sm font-medium">2</span>
              </div>
              <span className="ml-2 text-sm">Platform Selection</span>
            </div>
            
            <div className="w-16 h-0.5 bg-gray-600"></div>
            
            {/* Step 3: AI Formatting & Previews */}
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep === 'formatting' ? 'bg-purple-600' : 'bg-gray-600'
              }`}>
                <span className="text-sm font-medium">3</span>
              </div>
              <span className="ml-2 text-sm">AI Formatting & Previews</span>
            </div>
            
            <div className="w-16 h-0.5 bg-gray-600"></div>
            
            {/* Step 4: Scheduling Options */}
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep === 'scheduling' ? 'bg-purple-600' : 'bg-gray-600'
              }`}>
                <span className="text-sm font-medium">4</span>
              </div>
              <span className="ml-2 text-sm">Scheduling Options</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Content Input */}
          {currentStep === 'content' && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">Step 1: Content Input</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Main Post Content *
                </label>
                <Controller
                  name="mainContent"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <div className="bg-white/10 border border-white/20 rounded-lg p-4 min-h-[200px]">
                        {/* Rich Text Editor Toolbar */}
                        <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-white/10">
                          <button type="button" onClick={formatBold} className="p-2 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors" title="Bold">
                            <strong>B</strong>
                          </button>
                          <button type="button" onClick={formatItalic} className="p-2 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors" title="Italic">
                            <em>I</em>
                          </button>
                          <button type="button" onClick={formatUnderline} className="p-2 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors" title="Underline">
                            <u>U</u>
                          </button>
                          <button type="button" onClick={formatStrikethrough} className="p-2 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors" title="Strikethrough">
                            <s>S</s>
                          </button>
                          <div className="w-px h-6 bg-white/20"></div>
                          <button type="button" onClick={formatH1} className="p-2 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors" title="Heading 1">
                            H1
                          </button>
                          <button type="button" onClick={formatH2} className="p-2 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors" title="Heading 2">
                            H2
                          </button>
                          <button type="button" onClick={formatH3} className="p-2 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors" title="Heading 3">
                            H3
                          </button>
                          <div className="w-px h-6 bg-white/20"></div>
                          <button type="button" onClick={formatBulletList} className="p-2 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors" title="Bullet List">
                            •
                          </button>
                          <button type="button" onClick={formatNumberedList} className="p-2 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors" title="Numbered List">
                            1.
                          </button>
                          <div className="w-px h-6 bg-white/20"></div>
                          <button type="button" onClick={formatLink} className="p-2 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors" title="Link">
                            🔗
                          </button>

                          <div className="text-sm text-gray-400">
                            {field.value?.length || 0}/10000
                          </div>
                        </div>
                        
                        <textarea
                          {...field}
                          name="mainContent"
                          placeholder="Test: Type some text and try the B and I buttons!"
                          className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none min-h-[120px]"
                        />
                      </div>
                      {errors.mainContent && (
                        <p className="text-red-400 text-sm mt-2">{errors.mainContent.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* Auto-save indicator */}
              {lastAutoSave && (
                <div className="flex items-center text-sm text-green-400 mb-4">
                  <span className="mr-2">✓</span>
                  Last saved: {lastAutoSave.toLocaleTimeString()}
                </div>
              )}

              {/* Media Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Media (Images & Videos)</label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive 
                      ? 'border-purple-500 bg-purple-500/10' 
                      : 'border-white/20 bg-white/5 hover:border-white/40'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="text-gray-400">
                    <div className="text-4xl mb-2">📷🎥</div>
                    {isDragActive ? (
                      <p>Drop the media files here...</p>
                    ) : (
                      <div>
                        <p>Drag & drop images/videos here, or click to select</p>
                        <p className="text-sm mt-1">Images: JPEG, PNG, GIF, WebP</p>
                        <p className="text-sm">Videos: MP4, MOV, AVI, MKV, WebM</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Uploaded Media Preview */}
                {uploadedMedia.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {uploadedMedia.map((file, index) => {
                      const isVideo = file.type.startsWith('video/');
                      const sizeWarning = getFileSizeWarning(file);
                      
                      return (
                        <div key={index} className="relative">
                          {isVideo ? (
                            <video
                              src={URL.createObjectURL(file)}
                              className="w-full h-64 object-contain rounded-lg border border-white/20 bg-black/20"
                              controls={true}
                            />
                          ) : (
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-64 object-contain rounded-lg border border-white/20 bg-black/20"
                            />
                          )}
                          
                          {/* File type indicator */}
                          <div className="absolute top-1 left-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
                            {isVideo ? '🎥' : '📷'}
                          </div>
                          
                          {/* Size warning */}
                          {sizeWarning && (
                            <div className={`absolute top-1 right-8 px-2 py-1 rounded text-xs ${
                              sizeWarning.type === 'error' 
                                ? 'bg-red-600 text-white'
                                : 'bg-yellow-600 text-white'
                            }`}>
                              ⚠️
                            </div>
                          )}
                          
                          <button
                            type="button"
                            onClick={() => removeMedia(index)}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700 transition-colors"
                          >
                            ×
                          </button>
                          <div className="text-xs text-gray-400 mt-1 truncate">
                            {file.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {(file.size / (1024 * 1024)).toFixed(1)} MB
                          </div>
                          {sizeWarning && (
                            <div className={`text-xs mt-1 ${
                              sizeWarning.type === 'error' ? 'text-red-400' : 'text-yellow-400'
                            }`}>
                              {sizeWarning.message}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>





              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!mainContent || mainContent.length < 10}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Platform Selection
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Platform Selection */}
          {currentStep === 'platforms' && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">Step 2: Platform Selection</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {platforms.map((platform) => (
                  <div key={platform.id} className="relative">
                    <input
                      type="checkbox"
                      id={platform.id}
                      checked={selectedPlatforms.includes(platform.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setValue('selectedPlatforms', [...selectedPlatforms, platform.id]);
                        } else {
                          setValue('selectedPlatforms', selectedPlatforms.filter(p => p !== platform.id));
                        }
                      }}
                      className="sr-only"
                    />
                    <label
                      htmlFor={platform.id}
                      className={`block p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedPlatforms.includes(platform.id)
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-lg ${platform.color} flex items-center justify-center text-white text-xl`}>
                          {platform.icon}
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{platform.name}</h3>
                          <p className="text-gray-400 text-sm">Optimize for {platform.name}</p>
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>

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
                  Next: AI Formatting
                </button>
              </div>
            </div>
          )}

          {/* Step 3: AI Formatting & Previews */}
          {currentStep === 'formatting' && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">Step 3: AI Formatting & Previews</h2>
              
              {/* Media Processing Alert */}
              {uploadedMedia.length > 0 && (
                <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-400">ℹ️</span>
                      <h3 className="text-blue-400 font-semibold">Media Processing Required</h3>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => selectedPlatforms.forEach(platformId => optimizeMediaForPlatform(platformId))}
                        disabled={selectedPlatforms.some(platformId => isProcessing[platformId])}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        Optimize All Media
                      </button>
                      <button
                        type="button"
                        onClick={() => selectedPlatforms.forEach(platformId => optimizeContentWithAI(platformId))}
                        disabled={selectedPlatforms.some(platformId => isProcessing[`ai-${platformId}`]) || !mainContent}
                        className="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700 transition-colors disabled:opacity-50"
                      >
                        AI Optimize All
                      </button>
                    </div>
                  </div>
                  <p className="text-blue-300 text-sm mb-3">
                    Your media will be optimized for each platform. Review requirements below.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-blue-400">Image Requirements:</strong>
                      <ul className="text-blue-300 ml-4 mt-1">
                        <li>• Instagram: 1080x1080 (square) or 1080x1350 (portrait)</li>
                        <li>• Twitter: 1200x675 (landscape) or 1200x1200 (square)</li>
                        <li>• LinkedIn: 1200x627 (landscape)</li>
                        <li>• TikTok: 1080x1920 (vertical)</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-blue-400">Video Requirements:</strong>
                      <ul className="text-blue-300 ml-4 mt-1">
                        <li>• Instagram: Max 60s, 4GB</li>
                        <li>• Twitter: Max 2:20, 512MB</li>
                        <li>• LinkedIn: Max 10min, 5GB</li>
                        <li>• TikTok: Max 10min, vertical</li>
                        <li>• YouTube: Max 15min (or longer if verified)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {selectedPlatforms.map((platformId) => {
                  const platform = platforms.find(p => p.id === platformId);
                  if (!platform) return null;
                  
                  const getPlatformMediaRequirements = (platformId: string) => {
                    const requirements: Record<string, { images: string[], videos: string[], warnings: string[] }> = {
                      instagram: {
                        images: ['1080x1080 (feed)', '1080x1350 (portrait)', '1080x1920 (stories)'],
                        videos: ['Max 60s', '4GB limit', '1080x1920 (stories)', '1080x1080 (feed)'],
                        warnings: uploadedMedia.some(f => f.type.startsWith('image/') && f.size > 8 * 1024 * 1024) ? ['Large images detected'] : []
                      },
                      twitter: {
                        images: ['1200x675 (optimal)', '1200x1200 (square)', '5MB limit'],
                        videos: ['Max 2:20', '512MB limit', '1280x720 (optimal)'],
                        warnings: uploadedMedia.some(f => f.type.startsWith('video/') && f.size > 512 * 1024 * 1024) ? ['Video too large for Twitter'] : []
                      },
                      linkedin: {
                        images: ['1200x627 (recommended)', '1080x1080 (square)', '10MB limit'],
                        videos: ['Max 10min', '5GB limit', '1920x1080 (optimal)'],
                        warnings: []
                      },
                      tiktok: {
                        images: ['1080x1920 (vertical)', '1080x1080 (square)'],
                        videos: ['Max 10min', 'Vertical preferred', '1080x1920 (optimal)'],
                        warnings: uploadedMedia.some(f => f.type.startsWith('video/') && f.size > 287 * 1024 * 1024) ? ['Large video for TikTok'] : []
                      },
                      youtube: {
                        images: ['1280x720 (thumbnail)', '1920x1080 (optimal)'],
                        videos: ['Max 15min (standard)', '128GB limit', '1920x1080 or 4K'],
                        warnings: []
                      },
                      facebook: {
                        images: ['1200x630 (link)', '1080x1080 (post)', '5MB limit'],
                        videos: ['Max 240min', '10GB limit', '1280x720 (min)'],
                        warnings: []
                      }
                    };
                    return requirements[platformId] || { images: [], videos: [], warnings: [] };
                  };
                  
                  const mediaReqs = getPlatformMediaRequirements(platformId);
                  
                  return (
                    <div key={platformId} className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded ${platform.color} flex items-center justify-center text-white`}>
                            {platform.icon}
                          </div>
                          <h3 className="text-white font-medium">{platform.name}</h3>
                        </div>
                        
                        {/* Platform status indicators */}
                        <div className="flex space-x-2">
                          {uploadedMedia.length > 0 && (
                            <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs">
                              {uploadedMedia.length} media
                            </span>
                          )}
                          {mediaReqs.warnings.length > 0 && (
                            <span className="bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded text-xs">
                              ⚠️ Issues
                            </span>
                          )}
                        </div>
                      </div>
                      
                                                                   {/* Platform-Specific Mockup */}
                       <div className="mb-4">
                         {aiOptimizedContent[platformId] && (
                           <div className="flex items-center justify-between mb-2">
                             <span className="text-xs text-green-400 font-semibold">✨ AI Optimized</span>
                             <button
                               type="button"
                               onClick={() => setAiOptimizedContent(prev => ({ ...prev, [platformId]: '' }))}
                               className="text-xs text-gray-400 hover:text-white"
                             >
                               Use Original
                             </button>
                           </div>
                         )}
                         
                         {/* Platform-specific UI mockups */}
                         {platformId === 'twitter' && (
                           <div className="bg-black rounded-lg border border-gray-700 p-4">
                             <div className="flex space-x-3">
                               <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                 <span className="text-white font-semibold text-sm">AI</span>
                               </div>
                               <div className="flex-1">
                                 <div className="flex items-center space-x-2 mb-2">
                                   <span className="text-white font-bold">Campaign AI</span>
                                   <span className="text-blue-400">✓</span>
                                   <span className="text-gray-500">@campaign_ai • now</span>
                                 </div>
                                 <p className="text-white text-sm leading-relaxed whitespace-pre-line mb-3">
                                   {(aiOptimizedContent[platformId] || mainContent)
                                     ?.replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
                                     ?.replace(/\*(.*?)\*/g, '$1') // Remove italic markdown
                                     ?.replace(/<u>(.*?)<\/u>/g, '$1') // Remove underline tags
                                     ?.replace(/~~(.*?)~~/g, '$1') // Remove strikethrough
                                     ?.replace(/^#{1,3}\s+/gm, '') // Remove headers
                                     ?.replace(/^[-*]\s+/gm, '• ') // Convert bullet points
                                     ?.replace(/^\d+\.\s+/gm, '• ') // Convert numbered lists
                                     ?.replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove link markdown
                                   }
                                 </p>
                                 {(optimizedMedia[platformId] || uploadedMedia).length > 0 && (
                                   <div className="mt-3 rounded-2xl overflow-hidden border border-gray-700">
                                     {(optimizedMedia[platformId] || uploadedMedia).slice(0, 1).map((file, index) => (
                                       file.type.startsWith('video/') ? (
                                         <video
                                           key={index}
                                           src={URL.createObjectURL(file)}
                                           className="w-full max-h-80 object-cover"
                                           controls={false}
                                         />
                                       ) : (
                                         <img
                                           key={index}
                                           src={URL.createObjectURL(file)}
                                           alt="Post media"
                                           className="w-full max-h-80 object-cover"
                                         />
                                       )
                                     ))}
                                   </div>
                                 )}
                                 <div className="flex items-center justify-between mt-4 text-gray-500 text-sm">
                                   <div className="flex space-x-6">
                                     <span className="flex items-center space-x-1 hover:text-blue-400 cursor-pointer">
                                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                       </svg>
                                       <span>42</span>
                                     </span>
                                     <span className="flex items-center space-x-1 hover:text-green-400 cursor-pointer">
                                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                       </svg>
                                       <span>128</span>
                                     </span>
                                     <span className="flex items-center space-x-1 hover:text-red-400 cursor-pointer">
                                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                       </svg>
                                       <span>1.2K</span>
                                     </span>
                                     <span className="flex items-center space-x-1 hover:text-blue-400 cursor-pointer">
                                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                       </svg>
                                     </span>
                                   </div>
                                 </div>
                               </div>
                             </div>
                           </div>
                         )}
                         
                         {platformId === 'instagram' && (
                           <div className="bg-white rounded-lg overflow-hidden">
                             <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                               <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                 <span className="text-white font-semibold text-xs">AI</span>
                               </div>
                               <div className="flex-1">
                                 <div className="font-semibold text-sm text-black">campaign_ai</div>
                               </div>
                               <div className="text-black">⋯</div>
                             </div>
                             {(optimizedMedia[platformId] || uploadedMedia).length > 0 && (
                               <div className="aspect-square bg-gray-100">
                                 {(optimizedMedia[platformId] || uploadedMedia).slice(0, 1).map((file, index) => (
                                   file.type.startsWith('video/') ? (
                                     <video
                                       key={index}
                                       src={URL.createObjectURL(file)}
                                       className="w-full h-full object-cover"
                                       controls={false}
                                     />
                                   ) : (
                                     <img
                                       key={index}
                                       src={URL.createObjectURL(file)}
                                       alt="Post media"
                                       className="w-full h-full object-cover"
                                     />
                                   )
                                 ))}
                               </div>
                             )}
                             <div className="p-3">
                               <div className="flex space-x-4 mb-3">
                                 <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                 </svg>
                                 <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                 </svg>
                                 <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                 </svg>
                               </div>
                               <div className="text-sm text-black mb-1">
                                 <span className="font-semibold">campaign_ai</span>{' '}
                                 <span className="whitespace-pre-line">
                                   {(aiOptimizedContent[platformId] || mainContent)
                                     ?.replace(/\*\*(.*?)\*\*/g, '$1')
                                     ?.replace(/\*(.*?)\*/g, '$1')
                                     ?.replace(/<u>(.*?)<\/u>/g, '$1')
                                     ?.replace(/~~(.*?)~~/g, '$1')
                                     ?.replace(/^#{1,3}\s+/gm, '')
                                     ?.replace(/^[-*]\s+/gm, '• ')
                                     ?.replace(/^\d+\.\s+/gm, '• ')
                                     ?.replace(/\[(.*?)\]\(.*?\)/g, '$1')
                                   }
                                 </span>
                               </div>
                               <div className="text-gray-500 text-xs">2 hours ago</div>
                             </div>
                           </div>
                         )}
                         
                         {platformId === 'linkedin' && (
                           <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
                             <div className="p-4">
                               <div className="flex items-start space-x-3 mb-3">
                                 <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                   <span className="text-white font-semibold">AI</span>
                                 </div>
                                 <div className="flex-1">
                                   <div className="font-semibold text-black">Campaign AI</div>
                                   <div className="text-gray-600 text-sm">AI-powered social media automation</div>
                                   <div className="text-gray-500 text-xs">2h • 🌐</div>
                                 </div>
                               </div>
                               <p className="text-black text-sm leading-relaxed whitespace-pre-line mb-3">
                                 {(aiOptimizedContent[platformId] || mainContent)
                                   ?.replace(/\*\*(.*?)\*\*/g, '$1')
                                   ?.replace(/\*(.*?)\*/g, '$1')
                                   ?.replace(/<u>(.*?)<\/u>/g, '$1')
                                   ?.replace(/~~(.*?)~~/g, '$1')
                                   ?.replace(/^#{1,3}\s+/gm, '')
                                   ?.replace(/^[-*]\s+/gm, '• ')
                                   ?.replace(/^\d+\.\s+/gm, '• ')
                                   ?.replace(/\[(.*?)\]\(.*?\)/g, '$1')
                                 }
                               </p>
                               {(optimizedMedia[platformId] || uploadedMedia).length > 0 && (
                                 <div className="mb-3 rounded overflow-hidden">
                                   {(optimizedMedia[platformId] || uploadedMedia).slice(0, 1).map((file, index) => (
                                     file.type.startsWith('video/') ? (
                                       <video
                                         key={index}
                                         src={URL.createObjectURL(file)}
                                         className="w-full max-h-80 object-cover"
                                         controls={false}
                                       />
                                     ) : (
                                       <img
                                         key={index}
                                         src={URL.createObjectURL(file)}
                                         alt="Post media"
                                         className="w-full max-h-80 object-cover"
                                       />
                                     )
                                   ))}
                                 </div>
                               )}
                               <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                                 <div className="flex space-x-4 text-gray-600 text-sm">
                                   <span className="flex items-center space-x-1 hover:bg-gray-100 px-3 py-1 rounded cursor-pointer">
                                     <span>👍</span>
                                     <span>Like</span>
                                   </span>
                                   <span className="flex items-center space-x-1 hover:bg-gray-100 px-3 py-1 rounded cursor-pointer">
                                     <span>💬</span>
                                     <span>Comment</span>
                                   </span>
                                   <span className="flex items-center space-x-1 hover:bg-gray-100 px-3 py-1 rounded cursor-pointer">
                                     <span>🔄</span>
                                     <span>Repost</span>
                                   </span>
                                   <span className="flex items-center space-x-1 hover:bg-gray-100 px-3 py-1 rounded cursor-pointer">
                                     <span>📤</span>
                                     <span>Send</span>
                                   </span>
                                 </div>
                               </div>
                             </div>
                           </div>
                         )}
                         
                         {platformId === 'facebook' && (
                           <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
                             <div className="p-4">
                               <div className="flex items-start space-x-3 mb-3">
                                 <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                   <span className="text-white font-semibold text-sm">AI</span>
                                 </div>
                                 <div className="flex-1">
                                   <div className="font-semibold text-black">Campaign AI</div>
                                   <div className="text-gray-500 text-sm">2 hours ago • 🌐</div>
                                 </div>
                               </div>
                               <p className="text-black text-sm leading-relaxed whitespace-pre-line mb-3">
                                 {(aiOptimizedContent[platformId] || mainContent)
                                   ?.replace(/\*\*(.*?)\*\*/g, '$1')
                                   ?.replace(/\*(.*?)\*/g, '$1')
                                   ?.replace(/<u>(.*?)<\/u>/g, '$1')
                                   ?.replace(/~~(.*?)~~/g, '$1')
                                   ?.replace(/^#{1,3}\s+/gm, '')
                                   ?.replace(/^[-*]\s+/gm, '• ')
                                   ?.replace(/^\d+\.\s+/gm, '• ')
                                   ?.replace(/\[(.*?)\]\(.*?\)/g, '$1')
                                 }
                               </p>
                               {(optimizedMedia[platformId] || uploadedMedia).length > 0 && (
                                 <div className="mb-3 rounded overflow-hidden">
                                   {(optimizedMedia[platformId] || uploadedMedia).slice(0, 1).map((file, index) => (
                                     file.type.startsWith('video/') ? (
                                       <video
                                         key={index}
                                         src={URL.createObjectURL(file)}
                                         className="w-full max-h-80 object-cover"
                                         controls={false}
                                       />
                                     ) : (
                                       <img
                                         key={index}
                                         src={URL.createObjectURL(file)}
                                         alt="Post media"
                                         className="w-full max-h-80 object-cover"
                                       />
                                     )
                                   ))}
                                 </div>
                               )}
                               <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                 <div className="flex space-x-6 text-gray-600 text-sm">
                                   <span className="flex items-center space-x-1 hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">
                                     <span>👍</span>
                                     <span>Like</span>
                                   </span>
                                   <span className="flex items-center space-x-1 hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">
                                     <span>💬</span>
                                     <span>Comment</span>
                                   </span>
                                   <span className="flex items-center space-x-1 hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">
                                     <span>🔄</span>
                                     <span>Share</span>
                                   </span>
                                 </div>
                               </div>
                             </div>
                           </div>
                         )}
                         
                         {/* Fallback for other platforms */}
                         {!['twitter', 'instagram', 'linkedin', 'facebook'].includes(platformId) && (
                           <div className="bg-white/10 rounded-lg p-4">
                             <p className="text-white text-sm leading-relaxed whitespace-pre-line mb-3">
                               {(aiOptimizedContent[platformId] || mainContent)
                                 ?.replace(/\*\*(.*?)\*\*/g, '$1')
                                 ?.replace(/\*(.*?)\*/g, '$1')
                                 ?.replace(/<u>(.*?)<\/u>/g, '$1')
                                 ?.replace(/~~(.*?)~~/g, '$1')
                                 ?.replace(/^#{1,3}\s+/gm, '')
                                 ?.replace(/^[-*]\s+/gm, '• ')
                                 ?.replace(/^\d+\.\s+/gm, '• ')
                                 ?.replace(/\[(.*?)\]\(.*?\)/g, '$1')
                               }
                             </p>
                             {watchedValues.hashtags && watchedValues.hashtags.length > 0 && (
                               <div className="flex flex-wrap gap-1 mb-3">
                                 {watchedValues.hashtags.map((hashtag, index) => (
                                   <span key={index} className="text-blue-400 text-sm">
                                     {hashtag}
                                   </span>
                                 ))}
                               </div>
                             )}
                             {(optimizedMedia[platformId] || uploadedMedia).length > 0 && (
                               <div className="grid grid-cols-3 gap-2">
                                 {(optimizedMedia[platformId] || uploadedMedia).slice(0, 3).map((file, index) => (
                                   <div key={index} className="relative">
                                     {file.type.startsWith('video/') ? (
                                       <video
                                         src={URL.createObjectURL(file)}
                                         className="w-full h-16 object-cover rounded border border-white/20"
                                         controls={false}
                                       />
                                     ) : (
                                       <img
                                         src={URL.createObjectURL(file)}
                                         alt={`Media ${index + 1}`}
                                         className="w-full h-16 object-cover rounded border border-white/20"
                                       />
                                     )}
                                     <div className="absolute top-1 left-1 bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                                       {file.type.startsWith('video/') ? '🎥' : '📷'}
                                     </div>
                                   </div>
                                 ))}
                               </div>
                             )}
                           </div>
                         )}
                       </div>
                      
                      {/* Platform Requirements & Warnings */}
                      <div className="space-y-3">
                         <div className="text-xs text-gray-400">
                           {(() => {
                             const content = aiOptimizedContent[platformId] || mainContent || '';
                             const contentLength = content.length;
                             
                             // For Twitter/X, extract hashtags from the content and count them
                             if (platformId === 'twitter') {
                               const hashtagMatches = content.match(/#\w+/g) || [];
                               const totalLength = contentLength; // Hashtags are already included in content
                               return (
                                 <>
                                   Character count: {totalLength} / 280
                                   {totalLength > 280 && (
                                     <span className="text-red-400 ml-2">⚠️ Too long for X</span>
                                   )}
                                 </>
                               );
                             } else {
                               const maxLength = platformId === 'instagram' || platformId === 'tiktok' ? 2200 : 
                                               platformId === 'linkedin' ? 3000 : 
                                               platformId === 'facebook' ? 63206 : 
                                               platformId === 'youtube' ? 5000 : 2200;
                               return `Character count: ${contentLength} / ${maxLength}`;
                             }
                           })()}
                         </div>
                        
                        {uploadedMedia.length > 0 && (
                          <div className="text-xs">
                            <div className="text-gray-300 mb-1">Media Requirements:</div>
                            <div className="bg-white/5 rounded p-2 space-y-1">
                              {mediaReqs.images.length > 0 && (
                                <div>
                                  <span className="text-blue-400">Images:</span>
                                  <span className="text-gray-400 ml-1">{mediaReqs.images.join(', ')}</span>
                                </div>
                              )}
                              {mediaReqs.videos.length > 0 && (
                                <div>
                                  <span className="text-green-400">Videos:</span>
                                  <span className="text-gray-400 ml-1">{mediaReqs.videos.join(', ')}</span>
                                </div>
                              )}
                              {mediaReqs.warnings.length > 0 && (
                                <div className="mt-2 pt-2 border-t border-white/10">
                                  {mediaReqs.warnings.map((warning, idx) => (
                                    <div key={idx} className="text-yellow-400">⚠️ {warning}</div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                                                 {/* Platform-specific Actions */}
                         <div className="flex flex-wrap gap-2">
                           {uploadedMedia.length > 0 && (
                             <div className="flex space-x-1">
                               <button
                                 type="button"
                                 onClick={() => optimizeMediaForPlatform(platformId)}
                                 disabled={isProcessing[platformId]}
                                 className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded text-xs hover:bg-blue-600/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                               >
                                 {isProcessing[platformId] ? (
                                   <span className="flex items-center">
                                     <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                     </svg>
                                     Processing...
                                   </span>
                                 ) : optimizedMedia[platformId] ? (
                                   '✓ Optimized'
                                 ) : (
                                   'Auto-resize'
                                 )}
                               </button>
                               <button
                                 type="button"
                                 onClick={() => {
                                   setSelectedMediaForCrop({ file: uploadedMedia[0], platformId });
                                   setShowCropModal(true);
                                 }}
                                 className="bg-orange-600/20 text-orange-400 px-3 py-1 rounded text-xs hover:bg-orange-600/30 transition-colors"
                               >
                                 ✂️ Manual Crop
                               </button>
                               {optimizedMedia[platformId] && (
                                 <button
                                   type="button"
                                   onClick={() => revertMediaOptimization(platformId)}
                                   className="bg-red-600/30 text-red-300 px-2 py-1 rounded text-xs hover:bg-red-600/50 transition-colors border border-red-500/30"
                                   title="Revert to original"
                                 >
                                   ↶
                                 </button>
                               )}
                             </div>
                           )}
                           <div className="flex space-x-1">
                             <button
                               type="button"
                               onClick={() => optimizeContentWithAI(platformId)}
                               disabled={isProcessing[`ai-${platformId}`] || !mainContent}
                               className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded text-xs hover:bg-purple-600/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                             >
                               {isProcessing[`ai-${platformId}`] ? (
                                 <span className="flex items-center">
                                   <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                   </svg>
                                   AI Working...
                                 </span>
                               ) : aiOptimizedContent[platformId] ? (
                                 '✓ AI Optimized'
                               ) : (
                                 'AI Optimize'
                               )}
                             </button>
                             <button
                               type="button"
                               onClick={() => {
                                 setSelectedPlatformForEdit(platformId);
                                 setTempEditText(aiOptimizedContent[platformId] || mainContent || '');
                                 setShowTextEditModal(true);
                               }}
                               className="bg-green-600/20 text-green-400 px-3 py-1 rounded text-xs hover:bg-green-600/30 transition-colors"
                             >
                               ✏️ Edit Text
                             </button>
                             {aiOptimizedContent[platformId] && (
                               <button
                                 type="button"
                                 onClick={() => revertAIOptimization(platformId)}
                                 className="bg-red-600/30 text-red-300 px-2 py-1 rounded text-xs hover:bg-red-600/50 transition-colors border border-red-500/30"
                                 title="Revert to original"
                               >
                                 ↶
                               </button>
                             )}
                           </div>
                         </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between mt-6">
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
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  Next: Scheduling
                </button>
              </div>
            </div>
          )}

          {/* Preview Modal */}
          {showPreview && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Content Preview</h3>
                  <button 
                    onClick={() => setShowPreview(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="bg-white/5 rounded-lg p-6 mb-4">
                  <h4 className="text-white font-semibold mb-3">Your Post Content:</h4>
                  <p className="text-white leading-relaxed whitespace-pre-line mb-4">
                    {mainContent}
                  </p>
                  
                  {watchedValues.hashtags && watchedValues.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {watchedValues.hashtags.map((hashtag, index) => (
                        <span key={index} className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-sm">
                          {hashtag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {uploadedMedia.length > 0 && (
                    <div>
                      <h5 className="text-gray-300 text-sm mb-2">Media ({uploadedMedia.length} files):</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {uploadedMedia.slice(0, 4).map((file, index) => (
                          <div key={index} className="relative">
                            {file.type.startsWith('video/') ? (
                              <video
                                src={URL.createObjectURL(file)}
                                className="w-full h-24 object-cover rounded border border-white/20"
                                controls={false}
                              />
                            ) : (
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Media ${index + 1}`}
                                className="w-full h-24 object-cover rounded border border-white/20"
                              />
                            )}
                          </div>
                        ))}
                        {uploadedMedia.length > 4 && (
                          <div className="w-full h-24 bg-white/10 rounded border border-white/20 flex items-center justify-center text-sm text-gray-400">
                            +{uploadedMedia.length - 4} more
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-sm text-gray-400 mb-6">
                  Character count: {mainContent?.length || 0} • Media files: {uploadedMedia.length}
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowPreview(false)}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowPreview(false);
                      nextStep();
                    }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    Continue to Platforms
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Manual Crop Modal */}
          {showCropModal && selectedMediaForCrop && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Manual Crop & Resize</h3>
                  <button 
                    onClick={() => {
                      setShowCropModal(false);
                      setSelectedMediaForCrop(null);
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Image Preview & Crop Area */}
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Original Image</h4>
                    <div className="bg-white/5 rounded-lg p-4">
                      <img
                        src={URL.createObjectURL(selectedMediaForCrop.file)}
                        alt="Original"
                        className="w-full max-h-80 object-contain rounded"
                      />
                    </div>
                    <div className="text-sm text-gray-400">
                      Original size: {selectedMediaForCrop.file.name} ({(selectedMediaForCrop.file.size / 1024 / 1024).toFixed(2)} MB)
                    </div>
                  </div>
                  
                  {/* Platform Requirements & Controls */}
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">
                      Optimize for {selectedMediaForCrop.platformId.charAt(0).toUpperCase() + selectedMediaForCrop.platformId.slice(1)}
                    </h4>
                    
                    {/* Platform-specific dimension options */}
                    <div className="bg-white/5 rounded-lg p-4 space-y-3">
                      <h5 className="text-gray-300 font-medium">Recommended Dimensions:</h5>
                      {selectedMediaForCrop.platformId === 'instagram' && (
                        <div className="space-y-2">
                          <button 
                            onClick={() => {
                              // Apply 1:1 square crop
                              console.log('Applying 1:1 crop for Instagram');
                            }}
                            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-2 rounded hover:from-pink-600 hover:to-orange-600 transition-all text-sm"
                          >
                            1080×1080 (Square Feed Post)
                          </button>
                          <button 
                            onClick={() => {
                              // Apply 4:5 portrait crop
                              console.log('Applying 4:5 crop for Instagram');
                            }}
                            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-2 rounded hover:from-pink-600 hover:to-orange-600 transition-all text-sm"
                          >
                            1080×1350 (Portrait Feed)
                          </button>
                          <button 
                            onClick={() => {
                              // Apply 9:16 stories crop
                              console.log('Applying 9:16 crop for Instagram Stories');
                            }}
                            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-2 rounded hover:from-pink-600 hover:to-orange-600 transition-all text-sm"
                          >
                            1080×1920 (Stories/Reels)
                          </button>
                        </div>
                      )}
                      
                      {selectedMediaForCrop.platformId === 'twitter' && (
                        <div className="space-y-2">
                          <button 
                            onClick={() => {
                              console.log('Applying 16:9 crop for Twitter');
                            }}
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
                          >
                            1200×675 (Optimal Landscape)
                          </button>
                          <button 
                            onClick={() => {
                              console.log('Applying 1:1 crop for Twitter');
                            }}
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
                          >
                            1200×1200 (Square)
                          </button>
                        </div>
                      )}
                      
                      {selectedMediaForCrop.platformId === 'linkedin' && (
                        <div className="space-y-2">
                          <button 
                            onClick={() => {
                              console.log('Applying LinkedIn dimensions');
                            }}
                            className="w-full bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors text-sm"
                          >
                            1200×627 (Recommended)
                          </button>
                          <button 
                            onClick={() => {
                              console.log('Applying 1:1 crop for LinkedIn');
                            }}
                            className="w-full bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors text-sm"
                          >
                            1080×1080 (Square)
                          </button>
                        </div>
                      )}
                      
                      {selectedMediaForCrop.platformId === 'facebook' && (
                        <div className="space-y-2">
                          <button 
                            onClick={() => {
                              console.log('Applying Facebook dimensions');
                            }}
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                          >
                            1200×630 (Link Posts)
                          </button>
                          <button 
                            onClick={() => {
                              console.log('Applying 1:1 crop for Facebook');
                            }}
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                          >
                            1080×1080 (Regular Posts)
                          </button>
                        </div>
                      )}
                      
                      {selectedMediaForCrop.platformId === 'tiktok' && (
                        <div className="space-y-2">
                          <button 
                            onClick={() => {
                              console.log('Applying TikTok vertical dimensions');
                            }}
                            className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors text-sm"
                          >
                            1080×1920 (Vertical Video)
                          </button>
                          <button 
                            onClick={() => {
                              console.log('Applying TikTok square dimensions');
                            }}
                            className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors text-sm"
                          >
                            1080×1080 (Square)
                          </button>
                        </div>
                      )}
                      
                      {selectedMediaForCrop.platformId === 'youtube' && (
                        <div className="space-y-2">
                          {selectedMediaForCrop.file.type === 'video' ? (
                            <>
                              <div className="text-sm text-yellow-400 mb-2 p-2 bg-yellow-400/10 rounded">
                                ⚠️ Video optimization requires advanced processing. For now, we'll optimize thumbnails and channel art.
                              </div>
                              <button 
                                onClick={() => {
                                  console.log('Applying YouTube thumbnail dimensions');
                                }}
                                className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm"
                              >
                                1280×720 (Video Thumbnail)
                              </button>
                              <button 
                                onClick={() => {
                                  console.log('Applying YouTube banner dimensions');
                                }}
                                className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm"
                              >
                                2560×1440 (Channel Art)
                              </button>
                            </>
                          ) : (
                            <>
                              <button 
                                onClick={() => {
                                  console.log('Applying YouTube thumbnail dimensions');
                                }}
                                className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm"
                              >
                                1280×720 (Video Thumbnail)
                              </button>
                              <button 
                                onClick={() => {
                                  console.log('Applying YouTube banner dimensions');
                                }}
                                className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm"
                              >
                                2560×1440 (Channel Art)
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Quality Settings */}
                    <div className="bg-white/5 rounded-lg p-4">
                      <h5 className="text-gray-300 font-medium mb-3">Quality Settings:</h5>
                      <div className="space-y-2">
                        <label className="flex items-center justify-between text-sm">
                          <span className="text-gray-300">Compression Quality:</span>
                          <select className="bg-white/10 text-white rounded px-2 py-1 text-xs">
                            <option value="high">High (90%)</option>
                            <option value="medium" selected>Medium (70%)</option>
                            <option value="low">Low (50%)</option>
                          </select>
                        </label>
                        <label className="flex items-center justify-between text-sm">
                          <span className="text-gray-300">File Format:</span>
                          <select className="bg-white/10 text-white rounded px-2 py-1 text-xs">
                            <option value="jpeg" selected>JPEG</option>
                            <option value="png">PNG</option>
                            <option value="webp">WebP</option>
                          </select>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={() => {
                      setShowCropModal(false);
                      setSelectedMediaForCrop(null);
                    }}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      // Apply the crop/resize
                      if (selectedMediaForCrop) {
                        try {
                          // For now, just auto-optimize since we don't have a full crop implementation
                          await optimizeMediaForPlatform(selectedMediaForCrop.platformId);
                          setShowCropModal(false);
                          setSelectedMediaForCrop(null);
                        } catch (error) {
                          console.error('Crop error:', error);
                        }
                      }
                    }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    Apply Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Text Edit Modal */}
          {showTextEditModal && selectedPlatformForEdit && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    Edit Text for {selectedPlatformForEdit.charAt(0).toUpperCase() + selectedPlatformForEdit.slice(1)}
                  </h3>
                  <button 
                    onClick={() => {
                      setShowTextEditModal(false);
                      setSelectedPlatformForEdit(null);
                      setTempEditText('');
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Platform-Specific Content:
                    </label>
                    <textarea
                      value={tempEditText}
                      onChange={(e) => setTempEditText(e.target.value)}
                      className="w-full h-40 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      placeholder="Enter your custom text for this platform..."
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-400">
                      Character count: {tempEditText.length}
                      {selectedPlatformForEdit === 'twitter' && (
                        <span className={tempEditText.length > 280 ? 'text-red-400 ml-2' : 'text-gray-400 ml-2'}>
                          / 280 {tempEditText.length > 280 && '⚠️ Too long for X'}
                        </span>
                      )}
                      {selectedPlatformForEdit === 'instagram' && (
                        <span className={tempEditText.length > 2200 ? 'text-red-400 ml-2' : 'text-gray-400 ml-2'}>
                          / 2200 {tempEditText.length > 2200 && '⚠️ Too long'}
                        </span>
                      )}
                      {selectedPlatformForEdit === 'linkedin' && (
                        <span className={tempEditText.length > 3000 ? 'text-red-400 ml-2' : 'text-gray-400 ml-2'}>
                          / 3000 {tempEditText.length > 3000 && '⚠️ Too long'}
                        </span>
                      )}
                      {selectedPlatformForEdit === 'facebook' && (
                        <span className={tempEditText.length > 63206 ? 'text-red-400 ml-2' : 'text-gray-400 ml-2'}>
                          / 63,206 {tempEditText.length > 63206 && '⚠️ Too long'}
                        </span>
                      )}
                      {selectedPlatformForEdit === 'tiktok' && (
                        <span className={tempEditText.length > 2200 ? 'text-red-400 ml-2' : 'text-gray-400 ml-2'}>
                          / 2200 {tempEditText.length > 2200 && '⚠️ Too long'}
                        </span>
                      )}
                      {selectedPlatformForEdit === 'youtube' && (
                        <span className={tempEditText.length > 5000 ? 'text-red-400 ml-2' : 'text-gray-400 ml-2'}>
                          / 5000 {tempEditText.length > 5000 && '⚠️ Too long'}
                        </span>
                      )}
                    </div>
                    <div className="text-gray-400">
                      {selectedPlatformForEdit === 'twitter' && 'Keep it concise for X'}
                      {selectedPlatformForEdit === 'instagram' && 'Use emojis and hashtags'}
                      {selectedPlatformForEdit === 'linkedin' && 'Professional tone recommended'}
                      {selectedPlatformForEdit === 'facebook' && 'Engaging and conversational'}
                      {selectedPlatformForEdit === 'tiktok' && 'Trendy and engaging'}
                      {selectedPlatformForEdit === 'youtube' && 'Detailed descriptions work best'}
                    </div>
                  </div>
                  
                  {/* Quick formatting buttons */}
                  <div className="space-y-3 p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400 text-sm font-medium">Add Emojis:</span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setTempEditText(prev => prev + ' 💡')}
                        className="bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded text-xs hover:bg-yellow-600/30 transition-colors"
                      >
                        💡 Idea
                      </button>
                      <button
                        type="button"
                        onClick={() => setTempEditText(prev => prev + ' 🚀')}
                        className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs hover:bg-blue-600/30 transition-colors"
                      >
                        🚀 Launch
                      </button>
                      <button
                        type="button"
                        onClick={() => setTempEditText(prev => prev + ' 🎯')}
                        className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs hover:bg-red-600/30 transition-colors"
                      >
                        🎯 Target
                      </button>
                      <button
                        type="button"
                        onClick={() => setTempEditText(prev => prev + ' ✨')}
                        className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded text-xs hover:bg-purple-600/30 transition-colors"
                      >
                        ✨ Sparkle
                      </button>
                      <button
                        type="button"
                        onClick={() => setTempEditText(prev => prev + ' 🔥')}
                        className="bg-orange-600/20 text-orange-400 px-2 py-1 rounded text-xs hover:bg-orange-600/30 transition-colors"
                      >
                        🔥 Fire
                      </button>
                      <button
                        type="button"
                        onClick={() => setTempEditText(prev => prev + ' 💪')}
                        className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs hover:bg-green-600/30 transition-colors"
                      >
                        💪 Strong
                      </button>
                      <button
                        type="button"
                        onClick={() => setTempEditText(prev => prev + ' 🎉')}
                        className="bg-pink-600/20 text-pink-400 px-2 py-1 rounded text-xs hover:bg-pink-600/30 transition-colors"
                      >
                        🎉 Celebrate
                      </button>
                      <button
                        type="button"
                        onClick={() => setTempEditText(prev => prev + ' 👏')}
                        className="bg-indigo-600/20 text-indigo-400 px-2 py-1 rounded text-xs hover:bg-indigo-600/30 transition-colors"
                      >
                        👏 Applause
                      </button>
                    </div>
                    
                    <span className="text-gray-400 text-sm font-medium">Smart Hashtags:</span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={async () => {
                          // Generate contextual hashtags using AI
                          try {
                            const response = await fetch('/api/optimize-content', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                content: tempEditText || 'Generate relevant hashtags',
                                platform: selectedPlatformForEdit,
                                hashtags: []
                              }),
                            });
                            const data = await response.json();
                            const hashtagMatch = data.optimizedContent.match(/#\w+/g);
                            if (hashtagMatch) {
                              // Filter out already used hashtags
                              const newHashtags = hashtagMatch.filter((tag: string) => !usedHashtags.has(tag.toLowerCase()));
                              if (newHashtags.length > 0) {
                                const selectedHashtags = newHashtags.slice(0, 3);
                                setTempEditText(prev => prev + ' ' + selectedHashtags.join(' '));
                                // Track used hashtags
                                setUsedHashtags(prev => {
                                  const newSet = new Set(prev);
                                  selectedHashtags.forEach((tag: string) => newSet.add(tag.toLowerCase()));
                                  return newSet;
                                });
                              } else {
                                // Generate alternative hashtags if all are used
                                const fallbackSets = [
                                  ['#innovation', '#growth', '#success'],
                                  ['#creative', '#inspiration', '#motivation'],
                                  ['#business', '#entrepreneur', '#leadership'],
                                  ['#digital', '#technology', '#future'],
                                  ['#community', '#engagement', '#connection']
                                ];
                                const availableSet = fallbackSets.find(set => 
                                  set.some((tag: string) => !usedHashtags.has(tag.toLowerCase()))
                                );
                                if (availableSet) {
                                  const newTags = availableSet.filter((tag: string) => !usedHashtags.has(tag.toLowerCase())).slice(0, 3);
                                  setTempEditText(prev => prev + ' ' + newTags.join(' '));
                                  setUsedHashtags(prev => {
                                    const newSet = new Set(prev);
                                    newTags.forEach((tag: string) => newSet.add(tag.toLowerCase()));
                                    return newSet;
                                  });
                                }
                              }
                            }
                          } catch (error) {
                            // Fallback hashtags with uniqueness check
                            const fallbackTags = ['#trending', '#content', '#social'];
                            const newTags = fallbackTags.filter((tag: string) => !usedHashtags.has(tag.toLowerCase()));
                            if (newTags.length > 0) {
                              setTempEditText(prev => prev + ' ' + newTags.join(' '));
                              setUsedHashtags(prev => {
                                const newSet = new Set(prev);
                                newTags.forEach((tag: string) => newSet.add(tag.toLowerCase()));
                                return newSet;
                              });
                            }
                          }
                        }}
                        className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded text-xs hover:bg-purple-600/30 transition-colors"
                      >
                        + Smart Hashtags
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={() => {
                      setShowTextEditModal(false);
                      setSelectedPlatformForEdit(null);
                      setTempEditText('');
                      setUsedHashtags(new Set());
                    }}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (selectedPlatformForEdit) {
                        setAiOptimizedContent(prev => ({
                          ...prev,
                          [selectedPlatformForEdit]: tempEditText
                        }));
                        setShowTextEditModal(false);
                        setSelectedPlatformForEdit(null);
                        setTempEditText('');
                        setUsedHashtags(new Set());
                      }
                    }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Scheduling Options */}
          {currentStep === 'scheduling' && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">Step 4: Scheduling Options</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">When to publish?</label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <Controller
                        name="schedulingOption"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="radio"
                            value="immediate"
                            checked={field.value === 'immediate'}
                            onChange={() => field.onChange('immediate')}
                            className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 focus:ring-purple-500"
                          />
                        )}
                      />
                      <span className="ml-3 text-white">Publish immediately</span>
                    </label>
                    <label className="flex items-center">
                      <Controller
                        name="schedulingOption"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="radio"
                            value="scheduled"
                            checked={field.value === 'scheduled'}
                            onChange={() => field.onChange('scheduled')}
                            className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 focus:ring-purple-500"
                          />
                        )}
                      />
                      <span className="ml-3 text-white">Schedule for later</span>
                    </label>
                  </div>
                </div>

                {schedulingOption === 'scheduled' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                      <Controller
                        name="scheduledDate"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="date"
                            {...field}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        )}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                      <Controller
                        name="scheduledTime"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="time"
                            {...field}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all font-medium"
                >
                  Create Post
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 