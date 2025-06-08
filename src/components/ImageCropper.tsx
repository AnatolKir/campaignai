'use client';

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

// Type definitions for react-easy-crop
interface Point {
  x: number;
  y: number;
}

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Platform {
  id: string;
  name: string;
  aspectRatios: Array<{
    label: string;
    value: number;
    recommended?: boolean;
  }>;
}

const PLATFORM_ASPECT_RATIOS: Platform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    aspectRatios: [
      { label: 'Square (1:1)', value: 1, recommended: true },
      { label: 'Portrait (4:5)', value: 4/5 },
    ]
  },
  {
    id: 'instagram_story',
    name: 'Instagram Story/Reel',
    aspectRatios: [
      { label: 'Vertical (9:16)', value: 9/16, recommended: true },
    ]
  },
  {
    id: 'twitter_x',
    name: 'X (Twitter)',
    aspectRatios: [
      { label: 'Landscape (16:9)', value: 16/9, recommended: true },
      { label: 'Square (1:1)', value: 1 },
    ]
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    aspectRatios: [
      { label: 'Landscape (1.91:1)', value: 1.91, recommended: true },
      { label: 'Square (1:1)', value: 1 },
    ]
  },
  {
    id: 'facebook',
    name: 'Facebook',
    aspectRatios: [
      { label: 'Landscape (1.91:1)', value: 1.91, recommended: true },
      { label: 'Portrait (4:5)', value: 4/5 },
    ]
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    aspectRatios: [
      { label: 'Vertical (9:16)', value: 9/16, recommended: true },
    ]
  },
];

export interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
  aspectRatio: number;
  platformId: string;
}

interface ImageCropperProps {
  image: string;
  selectedPlatforms: string[];
  onCropComplete: (platformId: string, cropData: CropData) => void;
  onClose: () => void;
  isOpen: boolean;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  image,
  selectedPlatforms,
  onCropComplete,
  onClose,
  isOpen
}) => {
  const [currentPlatform, setCurrentPlatform] = useState<string>('');
  const [currentAspectRatio, setCurrentAspectRatio] = useState<number>(1);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // Filter platforms based on user selection
  const availablePlatforms = PLATFORM_ASPECT_RATIOS.filter(
    platform => selectedPlatforms.includes(platform.id)
  );

  // Set initial platform and aspect ratio
  React.useEffect(() => {
    if (availablePlatforms.length > 0 && !currentPlatform) {
      const firstPlatform = availablePlatforms[0];
      setCurrentPlatform(firstPlatform.id);
      const recommendedRatio = firstPlatform.aspectRatios.find(r => r.recommended) || firstPlatform.aspectRatios[0];
      setCurrentAspectRatio(recommendedRatio.value);
    }
  }, [availablePlatforms, currentPlatform]);

  const onCropCompleteCallback = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCrop = () => {
    if (croppedAreaPixels && currentPlatform) {
      const cropData: CropData = {
        x: croppedAreaPixels.x,
        y: croppedAreaPixels.y,
        width: croppedAreaPixels.width,
        height: croppedAreaPixels.height,
        aspectRatio: currentAspectRatio,
        platformId: currentPlatform,
      };
      onCropComplete(currentPlatform, cropData);
    }
  };

  const handlePlatformChange = (platformId: string) => {
    setCurrentPlatform(platformId);
    const platform = PLATFORM_ASPECT_RATIOS.find(p => p.id === platformId);
    if (platform) {
      const recommendedRatio = platform.aspectRatios.find(r => r.recommended) || platform.aspectRatios[0];
      setCurrentAspectRatio(recommendedRatio.value);
    }
    // Reset crop when changing platforms
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleAspectRatioChange = (aspectRatio: number) => {
    setCurrentAspectRatio(aspectRatio);
    // Reset crop when changing aspect ratio
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const currentPlatformData = PLATFORM_ASPECT_RATIOS.find(p => p.id === currentPlatform);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Crop Image for Social Media</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-[70vh]">
          {/* Crop Area */}
          <div className="flex-1 relative bg-black">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={currentAspectRatio}
              onCropChange={setCrop}
              onCropComplete={onCropCompleteCallback}
              onZoomChange={setZoom}
              showGrid={true}
              style={{
                containerStyle: {
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#000',
                },
              }}
            />
          </div>

          {/* Controls Panel */}
          <div className="w-full lg:w-80 p-4 bg-gray-50 border-l border-gray-200 overflow-y-auto">
            {/* Platform Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Platform
              </label>
              <select
                value={currentPlatform}
                onChange={(e) => handlePlatformChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {availablePlatforms.map((platform) => (
                  <option key={platform.id} value={platform.id}>
                    {platform.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Aspect Ratio Selection */}
            {currentPlatformData && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aspect Ratio
                </label>
                <div className="space-y-2">
                  {currentPlatformData.aspectRatios.map((ratio) => (
                    <label key={ratio.value} className="flex items-center">
                      <input
                        type="radio"
                        name="aspectRatio"
                        value={ratio.value}
                        checked={currentAspectRatio === ratio.value}
                        onChange={() => handleAspectRatioChange(ratio.value)}
                        className="mr-2 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">
                        {ratio.label}
                        {ratio.recommended && (
                          <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                            Recommended
                          </span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Zoom Control */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zoom: {Math.round(zoom * 100)}%
              </label>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Preview Info */}
            <div className="mb-6 p-3 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-1">Preview Info</h4>
              <p className="text-xs text-blue-700">
                Platform: <strong>{currentPlatformData?.name}</strong>
              </p>
              <p className="text-xs text-blue-700">
                Ratio: <strong>{currentAspectRatio.toFixed(2)}:1</strong>
              </p>
            </div>

            {/* Instructions */}
            <div className="mb-6 p-3 bg-gray-100 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-1">Instructions</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Drag to move the crop area</li>
                <li>• Use zoom slider to adjust size</li>
                <li>• Select different platforms to crop for each</li>
                <li>• Click Save to apply this crop</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveCrop}
            disabled={!croppedAreaPixels}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Save Crop for {currentPlatformData?.name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper; 