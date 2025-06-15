'use client';

import React, { useState } from 'react';

interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
  aspectRatio: number;
  platformId: string;
}

interface ProcessedImage {
  original: string;
  preview: string;
  cropped: Record<string, string>;
  compressed: Record<string, string>;
}

interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  preview?: string;
  size: number;
  cropData?: Record<string, CropData>;
  processedImages?: ProcessedImage;
  isProcessing?: boolean;
}

interface PlatformPostPreviewProps {
  platform: string;
  content: string;
  mediaFiles?: MediaFile[];
  hashtags?: string[];
  mentions?: string[];
}

const PlatformPostPreview: React.FC<PlatformPostPreviewProps> = ({
  platform,
  content,
  mediaFiles = [],
  hashtags = [],
  mentions = []
}) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-200 px-1 rounded">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-500 hover:underline">$1</a>')
      .replace(/\n/g, '<br>');
  };

  const formatHashtags = (tags: string[]) => {
    return tags.map(tag => (
      <span key={tag} className="text-blue-500 hover:underline cursor-pointer">
        #{tag}
      </span>
    ));
  };

  // Get the best image source for the platform
  const getImageSource = (file: MediaFile, platform: string): string => {
    // First, try to get the platform-specific processed image
    if (file.processedImages?.compressed?.[platform]) {
      return file.processedImages.compressed[platform];
    }
    
    // Fallback to cropped image if available
    if (file.processedImages?.cropped?.[platform]) {
      return file.processedImages.cropped[platform];
    }
    
    // Fallback to preview image
    if (file.processedImages?.preview) {
      return file.processedImages.preview;
    }
    
    // Final fallback to original preview
    return file.preview || '';
  };

  // Media carousel component
  const MediaCarousel = ({ files, className }: { files: MediaFile[], className: string }) => {
    if (files.length === 0) return null;
    
    if (files.length === 1) {
      const file = files[0];
      return (
        <div className={className}>
          {file.type === 'image' && getImageSource(file, platform) ? (
            <img
              src={getImageSource(file, platform)}
              alt={file.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          ) : file.type === 'video' ? (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center relative">
              <div className="text-center">
                <span className="text-4xl block mb-2">🎥</span>
                <span className="text-gray-400 text-sm">{file.name}</span>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                Video
              </div>
            </div>
          ) : null}
          <div className="w-full h-full bg-gray-800 flex items-center justify-center" style={{ display: (file.type === 'image' && getImageSource(file, platform)) || file.type === 'video' ? 'none' : 'flex' }}>
            <div className="text-center">
              <span className="text-2xl sm:text-4xl block mb-2">
                {file.type === 'video' ? '🎥' : file.type === 'image' ? '🖼️' : '📄'}
              </span>
              <span className="text-gray-400 text-xs sm:text-sm">{file.name}</span>
            </div>
          </div>
        </div>
      );
    }

    // Multiple files - show carousel
    const currentFile = files[currentMediaIndex];
    return (
      <div className={`${className} relative`}>
        {/* Current media */}
        {currentFile.type === 'image' && getImageSource(currentFile, platform) ? (
          <img
            src={getImageSource(currentFile, platform)}
            alt={currentFile.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
        ) : currentFile.type === 'video' ? (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center relative">
            <div className="text-center">
              <span className="text-4xl block mb-2">🎥</span>
              <span className="text-gray-400 text-sm">{currentFile.name}</span>
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
              Video
            </div>
          </div>
        ) : null}
        
        {/* Navigation arrows */}
        {files.length > 1 && (
          <>
            <button
              onClick={() => setCurrentMediaIndex(prev => prev > 0 ? prev - 1 : files.length - 1)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-80 transition-all"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentMediaIndex(prev => prev < files.length - 1 ? prev + 1 : 0)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-80 transition-all"
            >
              →
            </button>
          </>
        )}
        
        {/* Media counter */}
        {files.length > 1 && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs">
            {currentMediaIndex + 1}/{files.length}
          </div>
        )}
      </div>
    );
  };

  switch (platform) {
    case 'twitter_x':
      return (
        <div className="bg-black text-white p-4 sm:p-6 md:p-8 rounded-lg w-full sm:max-w-md md:max-w-lg mx-auto border border-gray-800">
          {/* Header */}
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
              AI
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm sm:text-base">Campaign AI</span>
                <span className="text-blue-400">✓</span>
                <span className="text-gray-500 text-sm">@campaign_ai</span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-500 text-sm">now</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mb-3">
            <div 
              className="text-white leading-relaxed text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
            />
            {hashtags.length > 0 && (
              <div className="mt-2 space-x-1">
                {formatHashtags(hashtags)}
              </div>
            )}
          </div>

          {/* Media */}
          {mediaFiles.length > 0 && (
            <div className="mb-3 rounded-2xl overflow-hidden border border-gray-700">
              <MediaCarousel files={mediaFiles} className="w-full h-48 sm:h-64 md:h-80" />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-800">
            <div className="flex items-center space-x-4 sm:space-x-6 text-gray-500">
              <button className="flex items-center space-x-1 sm:space-x-2 hover:text-blue-400 transition-colors">
                <span className="text-sm sm:text-base">💬</span>
                <span className="text-xs sm:text-sm">42</span>
              </button>
              <button className="flex items-center space-x-1 sm:space-x-2 hover:text-green-400 transition-colors">
                <span className="text-sm sm:text-base">🔄</span>
                <span className="text-xs sm:text-sm">128</span>
              </button>
              <button className="flex items-center space-x-1 sm:space-x-2 hover:text-red-400 transition-colors">
                <span className="text-sm sm:text-base">❤️</span>
                <span className="text-xs sm:text-sm">1.2K</span>
              </button>
              <button className="hover:text-blue-400 transition-colors">
                <span className="text-sm sm:text-base">📤</span>
              </button>
            </div>
          </div>
        </div>
      );

    case 'instagram':
      return (
        <div className="bg-white text-black rounded-lg w-full sm:max-w-sm md:max-w-md mx-auto border border-gray-200">
          {/* Header */}
          <div className="flex items-center space-x-3 p-4 sm:p-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
              AI
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">campaign_ai</div>
            </div>
            <button className="text-gray-600">⋯</button>
          </div>

          {/* Media */}
          {mediaFiles.length > 0 && (
            <div className="relative">
              <MediaCarousel files={mediaFiles} className="w-full aspect-square object-cover" />
            </div>
          )}

          {/* Actions */}
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <button className="hover:opacity-60 transition-opacity text-lg sm:text-xl">❤️</button>
                <button className="hover:opacity-60 transition-opacity text-lg sm:text-xl">💬</button>
                <button className="hover:opacity-60 transition-opacity text-lg sm:text-xl">📤</button>
              </div>
              <button className="hover:opacity-60 transition-opacity text-lg sm:text-xl">🔖</button>
            </div>

            <div className="text-sm font-semibold mb-1">1,234 likes</div>

            {/* Caption */}
            <div className="text-sm">
              <span className="font-semibold">campaign_ai</span>{" "}
              <span 
                dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
              />
              {hashtags.length > 0 && (
                <div className="mt-1 space-x-1">
                  {formatHashtags(hashtags)}
                </div>
              )}
            </div>

            <div className="text-gray-500 text-xs mt-2">2 HOURS AGO</div>
          </div>
        </div>
      );

    case 'tiktok':
      return (
        <div className="bg-black text-white w-full max-w-[280px] mx-auto overflow-hidden" style={{ borderRadius: '12px' }}>
          {/* TikTok-style vertical video layout */}
          <div className="relative">
            {/* Video/Media Area */}
            <div className="bg-black aspect-[9/16] relative flex items-center justify-center">
              {mediaFiles.length > 0 ? (
                <MediaCarousel files={mediaFiles} className="w-full h-full rounded-xl" />
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-2xl">🎵</span>
                  </div>
                  <span className="text-gray-300 text-sm">TikTok Video</span>
                </div>
              )}
              
              {/* Top UI elements */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                <div className="text-white text-sm font-medium">Following</div>
                <div className="text-white text-sm font-medium">For You</div>
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🔍</span>
                </div>
              </div>
              
              {/* Right side actions (TikTok style) */}
              <div className="absolute right-3 bottom-24 flex flex-col items-center space-y-6">
                {/* Profile picture */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold border-2 border-white">
                    <span className="text-sm">AI</span>
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">+</span>
                  </div>
                </div>
                
                {/* Like button */}
                <button className="text-white text-center group">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <svg className="w-8 h-8 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                  <div className="text-xs font-semibold">12.3K</div>
                </button>
                
                {/* Comment button */}
                <button className="text-white text-center group">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <svg className="w-7 h-7 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                  </div>
                  <div className="text-xs font-semibold">1.2K</div>
                </button>
                
                {/* Share button */}
                <button className="text-white text-center group">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <svg className="w-7 h-7 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                    </svg>
                  </div>
                  <div className="text-xs font-semibold">Share</div>
                </button>
                
                {/* Music disc */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center animate-spin" style={{ animationDuration: '3s' }}>
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Bottom content overlay */}
              <div className="absolute bottom-0 left-0 right-16 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                {/* Username and follow button */}
                <div className="flex items-center space-x-3 mb-3">
                  <span className="font-bold text-white text-base">@campaign_ai</span>
                  <button className="border border-white text-white px-4 py-1 rounded text-sm font-semibold hover:bg-white hover:text-black transition-colors">
                    Follow
                  </button>
                </div>
                
                {/* Caption */}
                <div className="text-white text-sm leading-relaxed mb-2 max-w-[200px]">
                  <div dangerouslySetInnerHTML={{ __html: renderMarkdown(content.length > 100 ? content.substring(0, 100) + '...' : content) }} />
                </div>
                
                {/* Hashtags */}
                {hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {formatHashtags(hashtags.slice(0, 3))}
                  </div>
                )}
                
                {/* Music info */}
                <div className="flex items-center space-x-2 text-white text-xs">
                  <span className="text-sm">🎵</span>
                  <span className="truncate max-w-[150px]">Original sound - Campaign AI</span>
                </div>
              </div>
              
              {/* Bottom navigation bar */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      );

    case 'youtube':
      return (
        <div className="bg-white text-black rounded-lg w-full sm:max-w-lg md:max-w-xl mx-auto border border-gray-200 overflow-hidden">
          {/* YouTube-style video thumbnail */}
          <div className="relative">
            <div className="bg-black aspect-video relative flex items-center justify-center">
              {mediaFiles.length > 0 ? (
                <div className="w-full h-full relative">
                  <MediaCarousel files={mediaFiles} className="w-full h-full" />
                  {/* YouTube play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-8xl block mb-4 text-white">▶️</span>
                    <span className="text-gray-400">YouTube Video</span>
                  </div>
                  {/* YouTube play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Video duration badge */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-xs">
                5:42
              </div>
            </div>
          </div>
          
          {/* Video info section */}
          <div className="p-4">
            {/* Title */}
            <div className="font-semibold text-base mb-2 line-clamp-2">
              {content.split('\n')[0] || 'YouTube Video Title'}
            </div>
            
            {/* Channel info */}
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-sm">
                AI
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">Campaign AI</div>
                <div className="text-gray-600 text-xs">1.2M subscribers</div>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition-colors">
                Subscribe
              </button>
            </div>
            
            {/* Description */}
            <div className="text-sm text-gray-700 mb-3">
              <div 
                className="line-clamp-3"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
              />
              {hashtags.length > 0 && (
                <div className="mt-2 space-x-1">
                  {formatHashtags(hashtags)}
                </div>
              )}
            </div>
            
            {/* Stats */}
            <div className="flex items-center space-x-4 text-gray-600 text-sm">
              <span>125K views</span>
              <span>•</span>
              <span>2 hours ago</span>
            </div>
          </div>
        </div>
      );

    case 'linkedin':
      return (
        <div className="bg-white text-black rounded-lg w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto border border-gray-200 shadow-sm">
          {/* Header */}
          <div className="flex items-start space-x-3 p-4 sm:p-6 md:p-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold">
              AI
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm sm:text-base">Campaign AI</div>
              <div className="text-sm text-gray-600">AI-Powered Social Media Management</div>
              <div className="text-xs text-gray-500">2h • 🌐</div>
            </div>
            <button className="text-gray-600">⋯</button>
          </div>

          {/* Content */}
          <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8">
            <div 
              className="text-gray-900 leading-relaxed mb-3 text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
            />
            {hashtags.length > 0 && (
              <div className="mb-3 space-x-1">
                {formatHashtags(hashtags)}
              </div>
            )}

            {/* Media */}
            {mediaFiles.length > 0 && (
              <div className="rounded-lg overflow-hidden border border-gray-200 mb-3">
                <MediaCarousel files={mediaFiles} className="w-full h-48 sm:h-64 md:h-80" />
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-4 sm:space-x-6 text-gray-600">
                <button className="flex items-center space-x-1 sm:space-x-2 hover:text-blue-600 transition-colors">
                  <span className="text-sm sm:text-base">👍</span>
                  <span className="text-xs sm:text-sm">Like</span>
                </button>
                <button className="flex items-center space-x-1 sm:space-x-2 hover:text-blue-600 transition-colors">
                  <span className="text-sm sm:text-base">💬</span>
                  <span className="text-xs sm:text-sm">Comment</span>
                </button>
                <button className="flex items-center space-x-1 sm:space-x-2 hover:text-blue-600 transition-colors">
                  <span className="text-sm sm:text-base">🔄</span>
                  <span className="text-xs sm:text-sm">Repost</span>
                </button>
                <button className="flex items-center space-x-1 sm:space-x-2 hover:text-blue-600 transition-colors">
                  <span className="text-sm sm:text-base">📤</span>
                  <span className="text-xs sm:text-sm">Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="bg-white text-black p-4 sm:p-6 md:p-8 rounded-lg border border-gray-200 w-full sm:max-w-md md:max-w-lg mx-auto">
          <div className="font-semibold mb-2 capitalize text-sm sm:text-base">{platform} Post Preview</div>
          <div 
            className="mb-3 text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
          {hashtags.length > 0 && (
            <div className="mb-3 space-x-1">
              {formatHashtags(hashtags)}
            </div>
          )}
          {mediaFiles.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              <MediaCarousel files={mediaFiles} className="bg-gray-100 rounded p-2" />
            </div>
          )}
        </div>
      );
  }
};

export default PlatformPostPreview; 