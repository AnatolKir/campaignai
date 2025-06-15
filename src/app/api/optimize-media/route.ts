import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const platform = formData.get('platform') as string;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check if Cloudinary credentials are available
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    
    if (cloudName && apiKey && apiSecret && 
        cloudName !== 'your_cloudinary_cloud_name' && 
        apiKey !== 'your_cloudinary_api_key') {
      
      try {
        // Platform-specific transformations
        const transformations: Record<string, string> = {
          twitter: 'w_1200,h_675,c_fill,f_auto,q_auto',
          instagram: 'w_1080,h_1080,c_fill,f_auto,q_auto',
          linkedin: 'w_1200,h_627,c_fill,f_auto,q_auto',
          facebook: 'w_1200,h_630,c_fill,f_auto,q_auto',
          tiktok: 'w_1080,h_1920,c_fill,f_auto,q_auto',
          youtube: 'w_1920,h_1080,c_fill,f_auto,q_auto'
        };

        const transformation = transformations[platform] || 'f_auto,q_auto';
        
        // Convert file to base64 for Cloudinary upload
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString('base64');
        const dataURI = `data:${file.type};base64,${base64}`;

        // Upload to Cloudinary with transformations
        const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            file: dataURI,
            upload_preset: 'unsigned_preset', // You'll need to create this in Cloudinary
            transformation: transformation,
            api_key: apiKey,
            timestamp: Math.round(Date.now() / 1000),
          })
        });

        if (uploadResponse.ok) {
          const result = await uploadResponse.json();
          
          return NextResponse.json({
            success: true,
            optimizedUrl: result.secure_url,
            originalSize: file.size,
            optimizedSize: result.bytes,
            source: 'cloudinary'
          });
        }
      } catch (error) {
        console.error('Cloudinary error:', error);
        // Fall through to client-side optimization
      }
    }

    // Fallback: Return original file for client-side processing
    // The existing Canvas API optimization will handle this
    return NextResponse.json({
      success: true,
      message: 'Use client-side optimization',
      source: 'client-side'
    });

  } catch (error) {
    console.error('Media optimization error:', error);
    return NextResponse.json(
      { error: 'Failed to optimize media' },
      { status: 500 }
    );
  }
}

/*
CLOUDINARY SETUP INSTRUCTIONS:

1. Sign up at https://cloudinary.com/
2. Get your credentials from the Dashboard
3. Create an "unsigned upload preset":
   - Go to Settings > Upload
   - Add upload preset
   - Set to "Unsigned"
   - Name it "unsigned_preset"
   - Configure allowed formats: jpg, png, gif, mp4, mov, avi
   
4. Add to .env.local:
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key  
   CLOUDINARY_API_SECRET=your_api_secret

5. For video processing, Cloudinary automatically handles:
   - Format conversion (MP4, WebM)
   - Compression and quality optimization
   - Thumbnail generation
   - Adaptive bitrate streaming
*/ 