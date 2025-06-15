import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

// Rate limiting configuration
const RATE_LIMIT_DELAY = 2000; // 2 seconds between API calls
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds between retries

interface TranslationJob {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  totalFiles: number;
  completedFiles: number;
  totalKeys: number;
  processedKeys: number;
  currentLanguage?: string;
  currentFile?: string;
  currentKey?: string;
  startedAt: string;
  completedAt?: string;
  error?: string;
  errors?: string[];
  rateLimitHits?: number;
  apiCallsCount?: number;
}

// Enhanced context-aware prompts for different language types
function getTranslationPrompt(targetLanguage: string, isRTL: boolean, isCJK: boolean, isIndic: boolean): string {
  const baseContext = `You are translating content for a professional social media management SaaS platform called Campaign.ai. This platform helps businesses manage their social media presence, create content, analyze performance, and engage with audiences across multiple platforms.

Context about the platform:
- Professional business tool for social media management
- Users are marketers, social media managers, and business owners
- Features include content creation, scheduling, analytics, competitor analysis
- Interface elements should use terminology familiar to marketing professionals
- Maintain professional, clear, and actionable language

Translation Guidelines:`;

  let specificGuidelines = '';

  if (isRTL) {
    specificGuidelines += `
- This is a RIGHT-TO-LEFT language. Consider text flow and UI element positioning
- Use terminology that feels natural for RTL users in business contexts
- Maintain professional tone appropriate for business software
- Consider cultural context for business terminology`;
  } else if (isCJK) {
    specificGuidelines += `
- This is a CJK language. Use appropriate business terminology
- Prefer concise expressions common in professional software
- Use formal/polite language appropriate for business contexts
- Consider character spacing and readability for UI elements`;
  } else if (isIndic) {
    specificGuidelines += `
- Use formal business language appropriate for professional software
- Maintain clarity and precision in technical terms
- Consider script-specific readability requirements`;
  } else {
    specificGuidelines += `
- Use professional business language appropriate for the target market
- Maintain clarity and precision in technical terminology
- Consider local business culture and practices`;
  }

  return `${baseContext}
${specificGuidelines}
- Translate navigation elements, buttons, and labels to terms users expect in professional software
- Keep technical terms consistent (e.g., "dashboard," "analytics," "engagement")
- Maintain the exact JSON structure - only translate values, never keys
- Ensure translations are contextually appropriate for each UI element
- Use native speaker terminology for business and marketing concepts

Target Language: ${targetLanguage}

Translate the following JSON content:`;
}

// Language configuration for better translations
const LANGUAGE_CONFIGS = {
  ar: { name: 'Arabic', isRTL: true, isCJK: false, isIndic: false },
  ja: { name: 'Japanese', isRTL: false, isCJK: true, isIndic: false },
  ko: { name: 'Korean', isRTL: false, isCJK: true, isIndic: false },
  zh: { name: 'Chinese (Simplified)', isRTL: false, isCJK: true, isIndic: false },
  hi: { name: 'Hindi', isRTL: false, isCJK: false, isIndic: true },
  es: { name: 'Spanish', isRTL: false, isCJK: false, isIndic: false },
  fr: { name: 'French', isRTL: false, isCJK: false, isIndic: false },
  de: { name: 'German', isRTL: false, isCJK: false, isIndic: false },
  pt: { name: 'Portuguese', isRTL: false, isCJK: false, isIndic: false },
  br: { name: 'Portuguese (Brazil)', isRTL: false, isCJK: false, isIndic: false },
  it: { name: 'Italian', isRTL: false, isCJK: false, isIndic: false },
  ru: { name: 'Russian', isRTL: false, isCJK: false, isIndic: false }
};

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getActiveAPIKey(): Promise<string | null> {
  // Get OpenAI API key from environment variables (secure approach)
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('OPENAI_API_KEY not found in environment variables');
    return null;
  }
  
  return apiKey;
}

async function translateTextSimple(text: string, targetLanguage: string, apiKey: string, retryCount = 0): Promise<string> {
  try {
    const openai = new OpenAI({ apiKey });
    
    const langConfig = LANGUAGE_CONFIGS[targetLanguage as keyof typeof LANGUAGE_CONFIGS];
    const prompt = getTranslationPrompt(
      langConfig?.name || targetLanguage,
      langConfig?.isRTL || false,
      langConfig?.isCJK || false,
      langConfig?.isIndic || false
    );

    const model = process.env.OPENAI_MODEL || 'gpt-4o'; // Default to gpt-4o if not specified
    
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'system',
          content: prompt
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.3,
      max_tokens: 4000
    });

    const translatedText = response.choices[0]?.message?.content?.trim();
    
    if (!translatedText) {
      throw new Error('Empty response from OpenAI');
    }

    // Add rate limiting delay
    await delay(RATE_LIMIT_DELAY);
    
    return translatedText;
  } catch (error: any) {
    console.error(`Translation error (attempt ${retryCount + 1}):`, error);
    
    // Handle rate limiting
    if (error.status === 429 && retryCount < MAX_RETRIES) {
      console.log(`Rate limited, retrying in ${RETRY_DELAY}ms...`);
      await delay(RETRY_DELAY);
      return translateTextSimple(text, targetLanguage, apiKey, retryCount + 1);
    }
    
    // Handle other errors with retry
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying translation in ${RETRY_DELAY}ms...`);
      await delay(RETRY_DELAY);
      return translateTextSimple(text, targetLanguage, apiKey, retryCount + 1);
    }
    
    throw error;
  }
}

function isEnglishText(text: string): boolean {
  // Simple heuristic to detect if text is likely English
  const englishWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  const words = text.toLowerCase().split(/\s+/);
  const englishWordCount = words.filter(word => englishWords.includes(word)).length;
  return englishWordCount > 0 || /^[a-zA-Z\s.,!?'"()-]+$/.test(text);
}

async function performTranslationSimple(
  sourceData: any,
  targetLanguage: string,
  apiKey: string,
  onProgress?: (processed: number, total: number, currentKey?: string) => void
): Promise<any> {
  const result: any = {};
  let processedCount = 0;
  let totalCount = 0;
  const errors: string[] = [];
  let apiCallsCount = 0;
  let rateLimitHits = 0;

  // Count total items first
  function countItems(obj: any): number {
    let count = 0;
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        count++;
      } else if (typeof value === 'object' && value !== null) {
        count += countItems(value);
      }
    }
    return count;
  }

  totalCount = countItems(sourceData);

  async function translateObject(obj: any, path: string = ''): Promise<any> {
    const translated: any = {};

    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (typeof value === 'string') {
        try {
          // Only translate if it's English text and not empty
          if (value.trim() && isEnglishText(value)) {
            onProgress?.(processedCount, totalCount, currentPath);
            
            const translatedValue = await translateTextSimple(value, targetLanguage, apiKey);
            translated[key] = translatedValue;
            apiCallsCount++;
          } else {
            // Keep non-English or empty values as-is
            translated[key] = value;
          }
        } catch (error: any) {
          console.error(`Error translating "${currentPath}":`, error);
          errors.push(`${currentPath}: ${error.message}`);
          
          if (error.status === 429) {
            rateLimitHits++;
          }
          
          // Keep original value on error
          translated[key] = value;
        }
        
        processedCount++;
      } else if (typeof value === 'object' && value !== null) {
        translated[key] = await translateObject(value, currentPath);
      } else {
        translated[key] = value;
      }
    }

    return translated;
  }

  const translatedData = await translateObject(sourceData);
  
  return {
    data: translatedData,
    stats: {
      processedCount,
      totalCount,
      apiCallsCount,
      rateLimitHits,
      errors
    }
  };
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = await getActiveAPIKey();
    if (!apiKey) {
      return NextResponse.json({ error: 'No active OpenAI API key found' }, { status: 400 });
    }

    // Create translation job
    const jobId = crypto.randomUUID();
    const job: TranslationJob = {
      id: jobId,
      status: 'running',
      progress: 0,
      totalFiles: 12,
      completedFiles: 0,
      totalKeys: 0,
      processedKeys: 0,
      startedAt: new Date().toISOString(),
      errors: [],
      rateLimitHits: 0,
      apiCallsCount: 0
    };

    // Save initial job state
    const jobsPath = path.join(process.cwd(), 'data', 'translation-jobs.json');
    const jobsDir = path.dirname(jobsPath);
    if (!fs.existsSync(jobsDir)) {
      fs.mkdirSync(jobsDir, { recursive: true });
    }

    let existingJobs: TranslationJob[] = [];
    if (fs.existsSync(jobsPath)) {
      try {
        existingJobs = JSON.parse(fs.readFileSync(jobsPath, 'utf8'));
      } catch (error) {
        console.error('Error reading existing jobs:', error);
      }
    }

    // Remove old jobs and add new one
    const updatedJobs = [job, ...existingJobs.slice(0, 4)];
    fs.writeFileSync(jobsPath, JSON.stringify(updatedJobs, null, 2));

    // Start translation process in background
    setImmediate(async () => {
      try {
        const sourceFile = path.join(process.cwd(), 'src', 'messages', 'en.json');
        const sourceData = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
        
        // Count total keys
        function countKeys(obj: any): number {
          let count = 0;
          for (const value of Object.values(obj)) {
            if (typeof value === 'string') {
              count++;
            } else if (typeof value === 'object' && value !== null) {
              count += countKeys(value);
            }
          }
          return count;
        }
        
        job.totalKeys = countKeys(sourceData);

        const targetLanguages = ['es', 'fr', 'de', 'pt', 'br', 'it', 'ja', 'ko', 'zh', 'ar', 'hi', 'ru'];
        
        for (let i = 0; i < targetLanguages.length; i++) {
          const targetLanguage = targetLanguages[i];
          const langConfig = LANGUAGE_CONFIGS[targetLanguage as keyof typeof LANGUAGE_CONFIGS];
          
          job.currentLanguage = langConfig?.name || targetLanguage;
          job.currentFile = `${targetLanguage}.json`;
          
          console.log(`Translating to ${job.currentLanguage}...`);

          const result = await performTranslationSimple(
            sourceData,
            targetLanguage,
            apiKey,
            (processed, total, currentKey) => {
              job.processedKeys = (i * job.totalKeys) + processed;
              job.progress = Math.round((job.processedKeys / (job.totalKeys * targetLanguages.length)) * 100);
              job.currentKey = currentKey;
              
              // Update job file
              const currentJobs = JSON.parse(fs.readFileSync(jobsPath, 'utf8'));
              const jobIndex = currentJobs.findIndex((j: TranslationJob) => j.id === jobId);
              if (jobIndex !== -1) {
                currentJobs[jobIndex] = { ...job };
                fs.writeFileSync(jobsPath, JSON.stringify(currentJobs, null, 2));
              }
            }
          );

          // Save translated file
          const targetFile = path.join(process.cwd(), 'src', 'messages', `${targetLanguage}.json`);
          fs.writeFileSync(targetFile, JSON.stringify(result.data, null, 2));

          job.completedFiles++;
          job.apiCallsCount = (job.apiCallsCount || 0) + result.stats.apiCallsCount;
          job.rateLimitHits = (job.rateLimitHits || 0) + result.stats.rateLimitHits;
          
          if (result.stats.errors.length > 0) {
            job.errors = [...(job.errors || []), ...result.stats.errors];
          }

          console.log(`✅ Completed ${job.currentLanguage} (${result.stats.apiCallsCount} API calls, ${result.stats.rateLimitHits} rate limits)`);
        }

        // Mark job as completed
        job.status = 'completed';
        job.progress = 100;
        job.completedAt = new Date().toISOString();
        job.currentLanguage = undefined;
        job.currentFile = undefined;
        job.currentKey = undefined;

        // Final job update
        const finalJobs = JSON.parse(fs.readFileSync(jobsPath, 'utf8'));
        const finalJobIndex = finalJobs.findIndex((j: TranslationJob) => j.id === jobId);
        if (finalJobIndex !== -1) {
          finalJobs[finalJobIndex] = job;
          fs.writeFileSync(jobsPath, JSON.stringify(finalJobs, null, 2));
        }

        console.log(`🎉 Translation job completed! Total API calls: ${job.apiCallsCount}, Rate limits: ${job.rateLimitHits}`);

      } catch (error: any) {
        console.error('Translation job failed:', error);
        
        job.status = 'failed';
        job.error = error.message;
        job.completedAt = new Date().toISOString();

        // Update job with error
        try {
          const errorJobs = JSON.parse(fs.readFileSync(jobsPath, 'utf8'));
          const errorJobIndex = errorJobs.findIndex((j: TranslationJob) => j.id === jobId);
          if (errorJobIndex !== -1) {
            errorJobs[errorJobIndex] = job;
            fs.writeFileSync(jobsPath, JSON.stringify(errorJobs, null, 2));
          }
        } catch (updateError) {
          console.error('Error updating job with failure:', updateError);
        }
      }
    });

    return NextResponse.json({ 
      message: 'Translation job started',
      jobId: jobId,
      status: 'running'
    });

  } catch (error: any) {
    console.error('Error starting translation job:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}