#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';
import glob from 'glob';

interface TranslationObject {
  [key: string]: string | TranslationObject;
}

interface ValidationResult {
  locale: string;
  namespace: string;
  missingKeys: string[];
  extraKeys: string[];
  emptyValues: string[];
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

function validateTranslations(): ValidationResult[] {
  const localesDir = path.join(process.cwd(), 'public', 'locales');
  const results: ValidationResult[] = [];
  
  // Get all locales
  const locales = fs.readdirSync(localesDir).filter(item => {
    const itemPath = path.join(localesDir, item);
    return fs.statSync(itemPath).isDirectory();
  });
  
  // Get all namespaces from English (reference locale)
  const enDir = path.join(localesDir, 'en');
  if (!fs.existsSync(enDir)) {
    console.error('❌ English locale directory not found');
    return results;
  }
  
  const namespaces = fs.readdirSync(enDir)
    .filter(file => file.endsWith('.json'))
    .map(file => path.basename(file, '.json'));
  
  // Validate each locale against English
  for (const locale of locales) {
    if (locale === 'en') continue; // Skip reference locale
    
    for (const namespace of namespaces) {
      const enTranslations = loadTranslations('en', namespace);
      const localeTranslations = loadTranslations(locale, namespace);
      
      const enKeys = new Set(Object.keys(enTranslations));
      const localeKeys = new Set(Object.keys(localeTranslations));
      
      const missingKeys = Array.from(enKeys).filter(key => !localeKeys.has(key));
      const extraKeys = Array.from(localeKeys).filter(key => !enKeys.has(key));
      const emptyValues = Array.from(localeKeys).filter(key => 
        localeTranslations[key] === '' || localeTranslations[key] === null
      );
      
      if (missingKeys.length > 0 || extraKeys.length > 0 || emptyValues.length > 0) {
        results.push({
          locale,
          namespace,
          missingKeys,
          extraKeys,
          emptyValues
        });
      }
    }
  }
  
  return results;
}

function reportValidationResults(results: ValidationResult[]): boolean {
  if (results.length === 0) {
    console.log('✅ All translations are valid!');
    return true;
  }
  
  console.log('❌ Translation validation issues found:\n');
  
  let hasErrors = false;
  
  for (const result of results) {
    console.log(`📁 ${result.locale}/${result.namespace}.json:`);
    
    if (result.missingKeys.length > 0) {
      hasErrors = true;
      console.log(`  🔴 Missing keys (${result.missingKeys.length}):`);
      result.missingKeys.forEach(key => console.log(`    - ${key}`));
    }
    
    if (result.extraKeys.length > 0) {
      console.log(`  🟡 Extra keys (${result.extraKeys.length}):`);
      result.extraKeys.forEach(key => console.log(`    + ${key}`));
    }
    
    if (result.emptyValues.length > 0) {
      hasErrors = true;
      console.log(`  🔴 Empty values (${result.emptyValues.length}):`);
      result.emptyValues.forEach(key => console.log(`    ∅ ${key}`));
    }
    
    console.log('');
  }
  
  return !hasErrors;
}

async function findUntranslatedStrings(): Promise<string[]> {
  const sourceFiles = await new Promise<string[]>((resolve, reject) => {
    glob('src/**/*.{ts,tsx}', { 
      ignore: ['src/types/translations.ts', 'scripts/**/*'] 
    }, (err, matches) => {
      if (err) reject(err);
      else resolve(matches);
    });
  });
  
  const untranslatedStrings: string[] = [];
  
  for (const file of sourceFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    
    // Simple regex to find potential hardcoded strings in JSX
    // This is a basic implementation - could be enhanced
    const jsxStringRegex = />([^<>{}\n]+)</g;
    const matches = content.match(jsxStringRegex);
    
    if (matches) {
      for (const match of matches) {
        const text = match.slice(1, -1).trim();
        // Skip if it's likely not user-facing text
        if (text && 
            !text.match(/^[\s\d\W]*$/) && // Not just numbers/symbols
            !text.includes('t(') && // Not already using translation
            text.length > 2) {
          untranslatedStrings.push(`${file}: "${text}"`);
        }
      }
    }
  }
  
  return untranslatedStrings;
}

async function main() {
  console.log('🔍 Validating translations...\n');
  
  // Validate translation completeness
  const validationResults = validateTranslations();
  const isValid = reportValidationResults(validationResults);
  
  // Find potential untranslated strings
  console.log('🔍 Scanning for potential untranslated strings...\n');
  const untranslatedStrings = await findUntranslatedStrings();
  
  if (untranslatedStrings.length > 0) {
    console.log(`⚠️  Found ${untranslatedStrings.length} potential untranslated strings:`);
    untranslatedStrings.slice(0, 10).forEach(str => console.log(`  ${str}`));
    if (untranslatedStrings.length > 10) {
      console.log(`  ... and ${untranslatedStrings.length - 10} more`);
    }
    console.log('');
  }
  
  // Exit with error code if validation failed
  if (!isValid) {
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { validateTranslations, findUntranslatedStrings }; 