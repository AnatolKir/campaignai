#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

interface TranslationObject {
  [key: string]: string | TranslationObject;
}

function flattenKeys(obj: TranslationObject, prefix = ''): Record<string, string> {
  const flattened: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'string') {
      flattened[fullKey] = value;
    } else if (typeof value === 'object' && value !== null) {
      Object.assign(flattened, flattenKeys(value, fullKey));
    }
  }
  
  return flattened;
}

function loadTranslations(locale: string, namespace: string): Record<string, string> {
  const filePath = path.join(process.cwd(), 'public', 'locales', locale, `${namespace}.json`);
  
  if (!fs.existsSync(filePath)) {
    return {};
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const translations: TranslationObject = JSON.parse(content);
    return flattenKeys(translations);
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
    return {};
  }
}

function validateTranslations(): boolean {
  const localesDir = path.join(process.cwd(), 'public', 'locales');
  
  // Check if locales directory exists
  if (!fs.existsSync(localesDir)) {
    console.error('❌ Locales directory not found');
    return false;
  }
  
  // Get all locales
  const locales = fs.readdirSync(localesDir).filter(item => {
    const itemPath = path.join(localesDir, item);
    return fs.statSync(itemPath).isDirectory();
  });
  
  // Check if English locale exists
  const enDir = path.join(localesDir, 'en');
  if (!fs.existsSync(enDir)) {
    console.error('❌ English locale directory not found');
    return false;
  }
  
  // Get all namespaces from English (reference locale)
  const namespaces = fs.readdirSync(enDir)
    .filter(file => file.endsWith('.json'))
    .map(file => path.basename(file, '.json'));
  
  console.log(`✅ Found ${locales.length} locales: ${locales.join(', ')}`);
  console.log(`✅ Found ${namespaces.length} namespaces: ${namespaces.join(', ')}`);
  
  // Basic validation - just check if files exist for each locale
  let hasErrors = false;
  
  for (const locale of locales) {
    if (locale === 'en') continue; // Skip reference locale
    
    for (const namespace of namespaces) {
      const filePath = path.join(localesDir, locale, `${namespace}.json`);
      if (!fs.existsSync(filePath)) {
        console.error(`❌ Missing translation file: ${locale}/${namespace}.json`);
        hasErrors = true;
      } else {
        // Quick validation - just check if it's valid JSON
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          JSON.parse(content);
        } catch (error) {
          console.error(`❌ Invalid JSON in ${locale}/${namespace}.json:`, error);
          hasErrors = true;
        }
      }
    }
  }
  
  if (!hasErrors) {
    console.log('✅ All translation files are present and valid JSON!');
  }
  
  return !hasErrors;
}

async function main() {
  console.log('🔍 Validating translations...\n');
  
  // Simple validation - just check file existence and JSON validity
  const isValid = validateTranslations();
  
  console.log('\n🔍 Translation validation complete!');
  
  // Exit with error code if validation failed
  if (!isValid) {
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { validateTranslations }; 