import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { content, platform, hashtags } = await request.json();

    // Check if Anthropic API key is available
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
    
    if (anthropicApiKey && anthropicApiKey !== 'your_anthropic_api_key_here') {
      // Use Anthropic Claude for real AI optimization
      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': anthropicApiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-sonnet-20240229',
            max_tokens: 500,
            messages: [{
              role: 'user',
              content: `You are a social media expert. Optimize the following content for ${platform}.

Platform-specific guidelines:
- Twitter: MUST be under 280 characters total (including hashtags), use relevant hashtags, be concise and engaging
- Instagram: Use emojis, focus on visual appeal, include engaging hashtags based on content, max 2200 characters
- LinkedIn: Professional tone, industry insights, encourage discussion, max 3000 characters
- Facebook: Community-focused, encourage engagement, conversational, max 63206 characters
- TikTok: Trendy language, viral hashtags related to content, youth-oriented, max 2200 characters
- YouTube: Detailed descriptions, clear CTAs, encourage subscriptions, max 5000 characters

Original content: ${content}
Existing hashtags: ${hashtags?.join(' ') || 'none'}

IMPORTANT: Generate hashtags that are RELEVANT to the actual content topic, not generic marketing hashtags. Analyze the content and create hashtags that match the subject matter.

Return only the optimized content, no explanations.`
            }]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const optimizedContent = data.content[0]?.text || content;
          
          return NextResponse.json({ 
            optimizedContent,
            success: true,
            source: 'anthropic'
          });
        }
      } catch (error) {
        console.error('Anthropic API error:', error);
        // Fall through to mock optimization
      }
    }

    // Enhanced fallback optimization that analyzes content
    const generateRelevantHashtags = (text: string, platform: string): string[] => {
      const words = text.toLowerCase().split(/\s+/);
      const contentHashtags: string[] = [];
      
      // Extract key topics from content
      const topicKeywords = [
        'shirt', 'tshirt', 'clothing', 'fashion', 'apparel', 'wear',
        'boat', 'sailing', 'ocean', 'sea', 'water', 'marine', 'nautical',
        'business', 'company', 'startup', 'launch', 'brand', 'product',
        'tech', 'technology', 'ai', 'artificial', 'intelligence',
        'design', 'art', 'creative', 'style', 'lifestyle'
      ];
      
      // Find relevant topics in the content
      const foundTopics = topicKeywords.filter(keyword => 
        words.some(word => word.includes(keyword) || keyword.includes(word))
      );
      
      // Generate hashtags based on found topics
      if (foundTopics.includes('shirt') || foundTopics.includes('tshirt') || foundTopics.includes('clothing')) {
        contentHashtags.push('#Fashion', '#Clothing', '#Style', '#Apparel');
      }
      if (foundTopics.includes('boat') || foundTopics.includes('sailing') || foundTopics.includes('ocean')) {
        contentHashtags.push('#Sailing', '#Ocean', '#Boating', '#Marine');
      }
      if (foundTopics.includes('business') || foundTopics.includes('company') || foundTopics.includes('startup')) {
        contentHashtags.push('#Business', '#Startup', '#Entrepreneur', '#Brand');
      }
      if (foundTopics.includes('tech') || foundTopics.includes('ai')) {
        contentHashtags.push('#Tech', '#Innovation', '#AI', '#Technology');
      }
      
      // Add platform-specific hashtags
      if (platform === 'instagram') {
        contentHashtags.push('#InstaGood', '#PhotoOfTheDay');
      } else if (platform === 'tiktok') {
        contentHashtags.push('#ForYou', '#Viral');
      } else if (platform === 'linkedin') {
        contentHashtags.push('#Professional', '#Industry');
      }
      
      // Fallback to generic hashtags if no specific topics found
      if (contentHashtags.length === 0) {
        contentHashtags.push('#Content', '#Social', '#Post');
      }
      
      return contentHashtags.slice(0, 5); // Limit to 5 hashtags
    };

    const platformOptimizations: Record<string, (content: string) => string> = {
      twitter: (text: string) => {
        const relevantHashtags = generateRelevantHashtags(text, 'twitter');
        const hashtagText = relevantHashtags.join(' ');
        const maxContentLength = 280 - hashtagText.length - 3; // 3 for spacing
        const shortened = text.length > maxContentLength ? text.substring(0, maxContentLength - 3) + '...' : text;
        const result = `${shortened}\n\n${hashtagText}`;
        return result.length > 280 ? text.substring(0, 277) + '...' : result;
      },
      instagram: (text: string) => {
        const relevantHashtags = generateRelevantHashtags(text, 'instagram');
        return `✨ ${text}\n\n📸 Share your thoughts below! 👇\n\n${relevantHashtags.join(' ')}`;
      },
      linkedin: (text: string) => {
        const relevantHashtags = generateRelevantHashtags(text, 'linkedin');
        return `${text}\n\nWhat are your thoughts on this? I'd love to hear your perspective in the comments.\n\n${relevantHashtags.join(' ')}`;
      },
      facebook: (text: string) => {
        const relevantHashtags = generateRelevantHashtags(text, 'facebook');
        return `${text}\n\nWhat do you think? Share your thoughts in the comments below! 👇\n\n${relevantHashtags.join(' ')}`;
      },
      tiktok: (text: string) => {
        const relevantHashtags = generateRelevantHashtags(text, 'tiktok');
        return `${text} 🔥\n\n${relevantHashtags.join(' ')}`;
      },
      youtube: (text: string) => {
        const relevantHashtags = generateRelevantHashtags(text, 'youtube');
        return `${text}\n\n👍 Like this video if you found it helpful!\n🔔 Subscribe for more content like this!\n💬 Let me know your thoughts in the comments!\n\n${relevantHashtags.join(' ')}`;
      }
    };

    const optimizedContent = platformOptimizations[platform]?.(content) || content;

    return NextResponse.json({ 
      optimizedContent,
      success: true,
      source: 'mock'
    });

  } catch (error) {
    console.error('Content optimization error:', error);
    return NextResponse.json(
      { error: 'Failed to optimize content' },
      { status: 500 }
    );
  }
}

/* 
To integrate with OpenAI, replace the mock optimization above with:

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Inside the POST function:
const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    {
      role: "system",
      content: `You are a social media expert. Optimize the given content for ${platform}. 
      
      Platform-specific guidelines:
      - Twitter: Keep under 280 characters, use relevant hashtags, be concise and engaging
      - Instagram: Use emojis, focus on visual appeal, include engaging hashtags
      - LinkedIn: Professional tone, industry insights, encourage discussion
      - Facebook: Community-focused, encourage engagement, conversational
      - TikTok: Trendy language, viral hashtags, youth-oriented
      - YouTube: Detailed descriptions, clear CTAs, encourage subscriptions
      
      Return only the optimized content, no explanations.`
    },
    {
      role: "user",
      content: `Original content: ${content}\nHashtags: ${hashtags?.join(' ') || 'none'}`
    }
  ],
  max_tokens: 500,
  temperature: 0.7,
});

const optimizedContent = completion.choices[0]?.message?.content || content;
*/ 