import { Platform } from '../utils/ai_platform_formatter';

/**
 * Form data structure for creating a post
 */
export interface CreatePostFormData {
  // Step 1: Content Input
  mainContent: string;
  hashtags: string[];
  mentions: PlatformSpecificMention[];
  mediaFiles: File[];
  links: string[];
  
  // Step 2: Platform Selection
  selectedPlatforms: Platform[];
  
  // Step 4: Scheduling Options
  schedulingOption: 'immediate' | 'scheduled';
  scheduledDate?: string;
  scheduledTime?: string;
  timezone?: string;
}

/**
 * Platform-specific mention with handles for different platforms
 */
export interface PlatformSpecificMention {
  id: string;
  displayName: string; // What shows in the UI (e.g., "Nike")
  handles: Partial<Record<Platform, string>>; // Platform-specific handles
  type: 'person' | 'company' | 'brand';
  verified?: boolean;
  notes?: string;
}

/**
 * Crop data for platform-specific image cropping
 */
export interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
  aspectRatio: number;
  platformId: string;
}

/**
 * Processed image data with different versions
 */
export interface ProcessedImage {
  original: string; // Original image URL
  preview: string; // Small preview for UI
  cropped: Record<string, string>; // Platform-specific cropped versions
  compressed: Record<string, string>; // Platform-specific compressed versions
}

/**
 * Media file information
 */
export interface MediaFile {
  id: string;
  file: File;
  type: 'image' | 'video' | 'document';
  preview?: string;
  size: number;
  name: string;
  // Image cropping data
  cropData?: Record<string, CropData>; // Platform-specific crop data
  processedImages?: ProcessedImage; // Processed image URLs
  isProcessing?: boolean; // Whether the image is being processed
}

/**
 * Scheduling options
 */
export interface SchedulingOptions {
  type: 'immediate' | 'scheduled';
  scheduledDateTime?: Date;
  timezone: string;
  recurringSchedule?: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: Date;
  };
}

/**
 * Platform preview data
 */
export interface PlatformPreview {
  platform: Platform;
  content: string;
  hashtags: string[];
  mentions: string[];
  characterCount: number;
  characterLimit: number;
  warnings: string[];
  suggestions: string[];
  isEdited: boolean;
  originalContent?: string;
}

/**
 * Create post wizard steps
 */
export type CreatePostStep = 'content' | 'platforms' | 'previews' | 'schedule';

/**
 * Form validation errors
 */
export interface CreatePostErrors {
  mainContent?: string;
  selectedPlatforms?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  media?: string;
  general?: string;
}

/**
 * Post creation status
 */
export interface PostCreationStatus {
  status: 'idle' | 'creating' | 'success' | 'error';
  message?: string;
  postId?: string;
}

/**
 * Rich text editor configuration
 */
export interface RichTextEditorConfig {
  placeholder: string;
  maxLength: number;
  toolbar: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strikethrough: boolean;
    link: boolean;
    list: boolean;
    heading: boolean;
  };
  autoSave: boolean;
  spellCheck: boolean;
}

/**
 * Auto-save status for drafts
 */
export interface AutoSaveStatus {
  lastSaved?: Date;
  status: 'idle' | 'saving' | 'saved' | 'error';
  message?: string;
}

/**
 * Platform selection with metadata
 */
export interface PlatformSelection {
  platform: Platform;
  isSelected: boolean;
  isConnected: boolean;
  lastUsed?: Date;
  postCount?: number;
}

/**
 * AI formatting status
 */
export interface AIFormattingStatus {
  status: 'idle' | 'processing' | 'complete' | 'error';
  progress: number;
  currentPlatform?: Platform;
  error?: string;
}

/**
 * Timezone option with comprehensive data
 */
export interface TimezoneOption {
  value: string;
  label: string;
  offset: string;
  region: string;
  city: string;
  country: string;
  isDST?: boolean;
}

/**
 * Timezone region for grouping
 */
export interface TimezoneRegion {
  name: string;
  timezones: TimezoneOption[];
}

/**
 * Mention suggestion for autocomplete
 */
export interface MentionSuggestion {
  id: string;
  displayName: string;
  handles: Partial<Record<Platform, string>>;
  type: 'person' | 'company' | 'brand';
  verified: boolean;
  followerCount?: number;
  profileImage?: string;
  description?: string;
}