#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';
import { validateTranslations } from './validate-translations';

interface TranslationObject {
  [key: string]: string | TranslationObject;
}

interface AITranslationConfig {
  apiKey: string;
  model: string;
  baseUrl?: string;
}

interface TranslationRequest {
  text: string;
  targetLanguage: string;
  context?: string;
}

class AITranslator {
  private config: AITranslationConfig;
  
  constructor(config: AITranslationConfig) {
    this.config = config;
  }
  
  async translateText(request: TranslationRequest): Promise<string> {
    const { text, targetLanguage, context } = request;
    
    const systemPrompt = `You are a professional translator specializing in web application interfaces. 
Translate the given text to ${targetLanguage} while maintaining:
- Technical accuracy for UI elements
- Appropriate tone for the application context
- Consistent terminology
- Natural flow in the target language

${context ? `Context: ${context}` : ''}

Return ONLY the translated text, no explanations or additional formatting.`;

    const userPrompt = `Translate this text to ${targetLanguage}: "${text}"`;
    
    try {
      const response = await fetch(`${this.config.baseUrl || 'https://api.openai.com'}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.3,
          max_tokens: 500,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.choices[0]?.message?.content?.trim() || text;
    } catch (error) {
      console.error(`Translation failed for "${text}":`, error);
      return text; // Return original text if translation fails
    }
  }
  
  async translateBatch(requests: TranslationRequest[]): Promise<string[]> {
    const results: string[] = [];
    
    // Process in batches to avoid rate limits
    const batchSize = 5;
    for (let i = 0; i < requests.length; i += batchSize) {
      const batch = requests.slice(i, i + batchSize);
      const batchPromises = batch.map(req => this.translateText(req));
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      // Add delay between batches
      if (i + batchSize < requests.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return results;
  }
}

function getLanguageNames(): Record<string, string> {
  return {
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'ja': 'Japanese',
    'zh': 'Chinese',
    'br': 'Portuguese (Brazil)',
  };
}

function loadTranslationFile(locale: string, namespace: string): TranslationObject {
  const filePath = path.join(process.cwd(), 'public', 'locales', locale, `${namespace}.json`);
  
  if (!fs.existsSync(filePath)) {
    return {};
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
    return {};
  }
}

function saveTranslationFile(locale: string, namespace: string, translations: TranslationObject): void {
  const filePath = path.join(process.cwd(), 'public', 'locales', locale, `${namespace}.json`);
  const dir = path.dirname(filePath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(filePath, JSON.stringify(translations, null, 2) + '\n');
}

function setNestedValue(obj: TranslationObject, keyPath: string, value: string): void {
  const keys = keyPath.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key] as TranslationObject;
  }
  
  current[keys[keys.length - 1]] = value;
}

function getNestedValue(obj: TranslationObject, keyPath: string): string | undefined {
  const keys = keyPath.split('.');
  let current: any = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  
  return typeof current === 'string' ? current : undefined;
}

async function autoTranslateMissingKeys(apiKey: string, model = 'gpt-3.5-turbo'): Promise<void> {
  console.log('🤖 Starting AI-powered translation...\n');
  
  const translator = new AITranslator({ apiKey, model });
  const languageNames = getLanguageNames();
  
  // Get validation results to find missing keys
  const validationResults = validateTranslations();
  
  if (validationResults.length === 0) {
    console.log('✅ No missing translations found!');
    return;
  }
  
  for (const result of validationResults) {
    if (result.missingKeys.length === 0) continue;
    
    const { locale, namespace, missingKeys } = result;
    const languageName = languageNames[locale];
    
    if (!languageName) {
      console.log(`⚠️  Unknown language code: ${locale}, skipping...`);
      continue;
    }
    
    console.log(`🌍 Translating ${missingKeys.length} keys for ${languageName} (${locale})...`);
    
    // Load English source and target locale files
    const enTranslations = loadTranslationFile('en', namespace);
    const targetTranslations = loadTranslationFile(locale, namespace);
    
    // Prepare translation requests
    const requests: TranslationRequest[] = missingKeys.map(key => {
      const sourceText = getNestedValue(enTranslations, key) || key;
      return {
        text: sourceText,
        targetLanguage: languageName,
        context: `UI element in a social media campaign management application`
      };
    });
    
    // Translate in batches
    console.log(`  📝 Translating ${requests.length} texts...`);
    const translations = await translator.translateBatch(requests);
    
    // Update target translations
    let updatedCount = 0;
    for (let i = 0; i < missingKeys.length; i++) {
      const key = missingKeys[i];
      const translation = translations[i];
      
      if (translation && translation !== requests[i].text) {
        setNestedValue(targetTranslations, key, translation);
        updatedCount++;
      }
    }
    
    // Save updated translations
    if (updatedCount > 0) {
      saveTranslationFile(locale, namespace, targetTranslations);
      console.log(`  ✅ Updated ${updatedCount} translations in ${locale}/${namespace}.json`);
    } else {
      console.log(`  ⚠️  No translations were updated for ${locale}/${namespace}.json`);
    }
  }
  
  console.log('\n🎉 AI translation completed!');
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
  
  if (!apiKey) {
    console.error('❌ OPENAI_API_KEY environment variable is required');
    console.log('Set it with: export OPENAI_API_KEY="your-api-key"');
    process.exit(1);
  }
  
  await autoTranslateMissingKeys(apiKey, model);
}

if (require.main === module) {
  main().catch(console.error);
}

export { AITranslator, autoTranslateMissingKeys }; 