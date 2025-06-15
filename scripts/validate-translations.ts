#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const LOCALES = ['en', 'es', 'de', 'fr', 'pt', 'br', 'it', 'ja', 'ko', 'zh', 'ar', 'hi', 'ru'];
const NAMESPACES = ['common'];

console.log('🔍 Validating translations...');

let hasErrors = false;

for (const locale of LOCALES) {
  for (const namespace of NAMESPACES) {
    const filePath = path.join(process.cwd(), 'public', 'locales', locale, `${namespace}.json`);
    
    try {
      if (!fs.existsSync(filePath)) {
        console.error(`❌ Missing file: ${filePath}`);
        hasErrors = true;
        continue;
      }
      
      const content = fs.readFileSync(filePath, 'utf8');
      JSON.parse(content); // Validate JSON syntax
      console.log(`✅ ${locale}/${namespace}.json`);
    } catch (error) {
      console.error(`❌ Invalid JSON in ${filePath}:`, error);
      hasErrors = true;
    }
  }
}

if (hasErrors) {
  console.error('❌ Translation validation failed');
  process.exit(1);
} else {
  console.log('✅ All translations validated successfully');
  process.exit(0);
} 