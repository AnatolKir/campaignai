import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { CropData } from '@/types/create-post';

// Platform-specific output dimensions
const PLATFORM_DIMENSIONS = {
  instagram: {
    '1': { width: 1080, height: 1080 }, // Square
    '0.8': { width: 1080, height: 1350 }, // 4:5 Portrait
  },
  instagram_story: {
    '0.5625': { width: 1080, height: 1920 }, // 9:16 Vertical
  },
  twitter_x: {
    '1.7778': { width: 1200, height: 675 }, // 16:9 Landscape
    '1': { width: 1200, height: 1200 }, // Square
  },
  linkedin: {
    '1.91': { width: 1200, height: 628 }, // 1.91:1 Landscape
    '1': { width: 1200, height: 1200 }, // Square
  },
  facebook: {
    '1.91': { width: 1200, height: 628 }, // 1.91:1 Landscape
    '0.8': { width: 1080, height: 1350 }, // 4:5 Portrait
  },
  tiktok: {
    '0.5625': { width: 1080, height: 1920 }, // 9:16 Vertical
  },
} as const;

// Quality settings for compression
const QUALITY_SETTINGS = {
  high: 90,
  medium: 75,
  low: 60,
} as const;

interface ProcessImageRequest {
  imageBase64: string;
  cropData: CropData;
  quality?: keyof typeof QUALITY_SETTINGS;
}

export async function POST(request: NextRequest) {
  try {
    const { imageBase64, cropData, quality = 'medium' }: ProcessImageRequest = await request.json();

    if (!imageBase64 || !cropData) {
      return NextResponse.json(
        { error: 'Missing required parameters: imageBase64 and cropData' },
        { status: 400 }
      );
    }

    // Remove base64 prefix if present
    const base64Data = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
    
    // Convert base64 to buffer
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Get image metadata
    const imageMetadata = await sharp(imageBuffer).metadata();
    
    if (!imageMetadata.width || !imageMetadata.height) {
      return NextResponse.json(
        { error: 'Unable to read image dimensions' },
        { status: 400 }
      );
    }

    // Apply crop
    const croppedBuffer = await sharp(imageBuffer)
      .extract({
        left: Math.round(cropData.x),
        top: Math.round(cropData.y),
        width: Math.round(cropData.width),
        height: Math.round(cropData.height),
      })
      .toBuffer();

    // Get platform dimensions
    const platformDimensions = PLATFORM_DIMENSIONS[cropData.platformId as keyof typeof PLATFORM_DIMENSIONS];
    
    if (!platformDimensions) {
      return NextResponse.json(
        { error: `Unsupported platform: ${cropData.platformId}` },
        { status: 400 }
      );
    }

    // Find the appropriate dimensions for the aspect ratio
    const aspectRatioKey = cropData.aspectRatio.toFixed(4);
    const dimensionsRecord = platformDimensions as Record<string, { width: number; height: number }>;
    let targetDimensions = dimensionsRecord[aspectRatioKey];
    
    // Fallback to closest aspect ratio if exact match not found
    if (!targetDimensions) {
      const availableRatios = Object.keys(dimensionsRecord);
      const closestRatio = availableRatios.reduce((prev, curr) => {
        return Math.abs(parseFloat(curr) - cropData.aspectRatio) < Math.abs(parseFloat(prev) - cropData.aspectRatio) ? curr : prev;
      });
      targetDimensions = dimensionsRecord[closestRatio];
    }

    if (!targetDimensions) {
      return NextResponse.json(
        { error: `No suitable dimensions found for platform ${cropData.platformId} with aspect ratio ${cropData.aspectRatio}` },
        { status: 400 }
      );
    }

    // Resize and compress the image
    const processedBuffer = await sharp(croppedBuffer)
      .resize(targetDimensions.width, targetDimensions.height, {
        fit: 'cover',
        position: 'center',
      })
      .jpeg({
        quality: QUALITY_SETTINGS[quality],
        progressive: true,
        mozjpeg: true,
      })
      .toBuffer();

    // Create preview (smaller version for UI)
    const previewBuffer = await sharp(croppedBuffer)
      .resize(400, Math.round(400 / cropData.aspectRatio), {
        fit: 'cover',
        position: 'center',
      })
      .jpeg({
        quality: 75,
        progressive: true,
      })
      .toBuffer();

    // Convert to base64 for response
    const processedBase64 = `data:image/jpeg;base64,${processedBuffer.toString('base64')}`;
    const previewBase64 = `data:image/jpeg;base64,${previewBuffer.toString('base64')}`;

    // In a real application, you would save these to a cloud storage service
    // and return URLs instead of base64 data. For this example, we'll return base64.

    return NextResponse.json({
      success: true,
      data: {
        processed: processedBase64,
        preview: previewBase64,
        dimensions: targetDimensions,
        fileSize: processedBuffer.length,
        previewSize: previewBuffer.length,
        platform: cropData.platformId,
        aspectRatio: cropData.aspectRatio,
      },
    });

  } catch (error) {
    console.error('Image processing error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process image',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Utility function to get file extension from base64
function getFileExtensionFromBase64(base64: string): string {
  const matches = base64.match(/^data:image\/([a-z]+);base64,/);
  return matches ? matches[1] : 'jpg';
}

// Utility function to calculate optimal dimensions maintaining aspect ratio
function calculateOptimalDimensions(
  originalWidth: number,
  originalHeight: number,
  targetWidth: number,
  targetHeight: number
): { width: number; height: number } {
  const originalAspectRatio = originalWidth / originalHeight;
  const targetAspectRatio = targetWidth / targetHeight;

  if (originalAspectRatio > targetAspectRatio) {
    // Original is wider, fit by height
    return {
      width: Math.round(targetHeight * originalAspectRatio),
      height: targetHeight,
    };
  } else {
    // Original is taller, fit by width
    return {
      width: targetWidth,
      height: Math.round(targetWidth / originalAspectRatio),
    };
  }
} 