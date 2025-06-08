'use client';

import React from 'react';

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
              {mediaFiles.length === 1 ? (
                <div className="w-full">
                  {mediaFiles[0].type === 'image' && getImageSource(mediaFiles[0], platform) ? (
                    <img
                      src={getImageSource(mediaFiles[0], platform)}
                      alt={mediaFiles[0].name}
                      className="w-full h-48 sm:h-64 md:h-80 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="w-full h-48 sm:h-64 md:h-80 bg-gray-800 flex items-center justify-center" style={{ display: mediaFiles[0].type === 'image' && getImageSource(mediaFiles[0], platform) ? 'none' : 'flex' }}>
                    <div className="text-center">
                      <span className="text-2xl sm:text-4xl block mb-2">
                        {mediaFiles[0].type === 'video' ? '🎥' : mediaFiles[0].type === 'image' ? '🖼️' : '📄'}
                      </span>
                      <span className="text-gray-400 text-xs sm:text-sm">{mediaFiles[0].name}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-1">
                  {mediaFiles.slice(0, 4).map((file, index) => (
                    <div key={file.id} className="relative">
                      {file.type === 'image' && getImageSource(file, platform) ? (
                        <img
                          src={getImageSource(file, platform)}
                          alt={file.name}
                          className="w-full h-24 sm:h-32 md:h-40 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="w-full h-24 sm:h-32 md:h-40 bg-gray-800 flex items-center justify-center" style={{ display: file.type === 'image' && getImageSource(file, platform) ? 'none' : 'flex' }}>
                        <span className="text-lg sm:text-2xl">
                          {file.type === 'video' ? '🎥' : file.type === 'image' ? '🖼️' : '📄'}
                        </span>
                      </div>
                      {index === 3 && mediaFiles.length > 4 && (
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                          <span className="text-white font-bold text-sm sm:text-base">+{mediaFiles.length - 4}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
              {mediaFiles[0].type === 'image' && getImageSource(mediaFiles[0], platform) ? (
                <img
                  src={getImageSource(mediaFiles[0], platform)}
                  alt={mediaFiles[0].name}
                  className="w-full aspect-square object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="w-full aspect-square bg-gray-200 flex items-center justify-center" style={{ display: mediaFiles[0].type === 'image' && getImageSource(mediaFiles[0], platform) ? 'none' : 'flex' }}>
                <div className="text-center">
                  <span className="text-4xl sm:text-6xl block mb-2">
                    {mediaFiles[0].type === 'video' ? '🎥' : mediaFiles[0].type === 'image' ? '🖼️' : '📷'}
                  </span>
                  <span className="text-gray-600 text-xs sm:text-sm">{mediaFiles[0].name}</span>
                </div>
              </div>
              {mediaFiles.length > 1 && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs">
                  1/{mediaFiles.length}
                </div>
              )}
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
                {mediaFiles[0].type === 'image' && getImageSource(mediaFiles[0], platform) ? (
                  <img
                    src={getImageSource(mediaFiles[0], platform)}
                    alt={mediaFiles[0].name}
                    className="w-full h-48 sm:h-64 md:h-80 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="w-full h-48 sm:h-64 md:h-80 bg-gray-100 flex items-center justify-center" style={{ display: mediaFiles[0].type === 'image' && getImageSource(mediaFiles[0], platform) ? 'none' : 'flex' }}>
                  <div className="text-center">
                    <span className="text-2xl sm:text-4xl block mb-2">
                      {mediaFiles[0].type === 'video' ? '🎥' : mediaFiles[0].type === 'image' ? '🖼️' : '📄'}
                    </span>
                    <span className="text-gray-500 text-xs sm:text-sm">{mediaFiles[0].name}</span>
                  </div>
                </div>
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
              {mediaFiles.slice(0, 4).map((file) => (
                <div key={file.id} className="bg-gray-100 rounded p-2">
                  {file.type === 'image' && getImageSource(file, platform) ? (
                    <img
                      src={getImageSource(file, platform)}
                      alt={file.name}
                      className="w-full h-16 sm:h-20 md:h-24 object-cover rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="w-full h-16 sm:h-20 md:h-24 flex items-center justify-center" style={{ display: file.type === 'image' && getImageSource(file, platform) ? 'none' : 'flex' }}>
                    <div className="text-center">
                      <span className="text-lg sm:text-xl">{file.type === 'video' ? '🎥' : file.type === 'image' ? '🖼️' : '📄'}</span>
                      <div className="text-xs text-gray-600 mt-1 truncate">{file.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
  }
};

export default PlatformPostPreview; 