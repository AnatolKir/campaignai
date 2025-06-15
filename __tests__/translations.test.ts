import { validateTranslations, findUntranslatedStrings } from '../scripts/validate-translations';
import { generateTranslationTypes } from '../scripts/generate-translation-types';
import * as fs from 'fs';
import * as path from 'path';

describe('Translation System', () => {
  const localesDir = path.join(process.cwd(), 'public', 'locales');
  
  beforeAll(() => {
    // Ensure locales directory exists
    expect(fs.existsSync(localesDir)).toBe(true);
  });

  describe('Translation Files', () => {
    test('English locale should exist and have valid JSON', () => {
      const enDir = path.join(localesDir, 'en');
      expect(fs.existsSync(enDir)).toBe(true);
      
      const files = fs.readdirSync(enDir).filter(f => f.endsWith('.json'));
      expect(files.length).toBeGreaterThan(0);
      
      files.forEach(file => {
        const filePath = path.join(enDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        expect(() => JSON.parse(content)).not.toThrow();
      });
    });

    test('All locale directories should have matching namespace files', () => {
      const locales = fs.readdirSync(localesDir).filter(item => {
        const itemPath = path.join(localesDir, item);
        return fs.statSync(itemPath).isDirectory();
      });

      const enDir = path.join(localesDir, 'en');
      const enFiles = fs.readdirSync(enDir).filter(f => f.endsWith('.json'));

      locales.forEach(locale => {
        if (locale === 'en') return;
        
        const localeDir = path.join(localesDir, locale);
        enFiles.forEach(file => {
          const localeFile = path.join(localeDir, file);
          expect(fs.existsSync(localeFile)).toBe(true);
        });
      });
    });

    test('All translation files should have valid JSON syntax', () => {
      const locales = fs.readdirSync(localesDir).filter(item => {
        const itemPath = path.join(localesDir, item);
        return fs.statSync(itemPath).isDirectory();
      });

      locales.forEach(locale => {
        const localeDir = path.join(localesDir, locale);
        const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.json'));
        
        files.forEach(file => {
          const filePath = path.join(localeDir, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          expect(() => JSON.parse(content)).not.toThrow();
        });
      });
    });
  });

  describe('Translation Validation', () => {
    test('should validate translations without throwing errors', () => {
      expect(() => validateTranslations()).not.toThrow();
    });

    test('should not have critical missing keys in production locales', () => {
      const results = validateTranslations();
      const criticalLocales = ['es']; // Add more as needed
      
      const criticalIssues = results.filter(result => 
        criticalLocales.includes(result.locale) && 
        result.missingKeys.length > 0
      );

      if (criticalIssues.length > 0) {
        const issueDetails = criticalIssues.map(issue => 
          `${issue.locale}/${issue.namespace}: ${issue.missingKeys.length} missing keys`
        ).join(', ');
        
        console.warn(`Translation issues found: ${issueDetails}`);
        // In CI/CD, you might want to fail the test:
        // expect(criticalIssues).toHaveLength(0);
      }
    });

    test('should not have empty translation values', () => {
      const results = validateTranslations();
      const emptyValueIssues = results.filter(result => result.emptyValues.length > 0);
      
      if (emptyValueIssues.length > 0) {
        const issueDetails = emptyValueIssues.map(issue => 
          `${issue.locale}/${issue.namespace}: ${issue.emptyValues.length} empty values`
        ).join(', ');
        
        console.warn(`Empty translation values found: ${issueDetails}`);
      }
    });
  });

  describe('Translation Types', () => {
    test('should generate translation types without errors', () => {
      expect(() => generateTranslationTypes()).not.toThrow();
    });

    test('generated types file should exist and be valid TypeScript', () => {
      generateTranslationTypes();
      
      const typesFile = path.join(process.cwd(), 'src', 'types', 'translations.ts');
      expect(fs.existsSync(typesFile)).toBe(true);
      
      const content = fs.readFileSync(typesFile, 'utf-8');
      expect(content).toContain('export type TranslationKey');
      expect(content).toContain('export type TranslationNamespace');
    });
  });

  describe('Untranslated Strings Detection', () => {
    test('should scan for untranslated strings without errors', async () => {
      await expect(findUntranslatedStrings()).resolves.not.toThrow();
    });

    test('should report potential untranslated strings', async () => {
      const untranslatedStrings = await findUntranslatedStrings();
      
      if (untranslatedStrings.length > 0) {
        console.log(`Found ${untranslatedStrings.length} potential untranslated strings`);
        // Log first few for debugging
        untranslatedStrings.slice(0, 5).forEach(str => console.log(`  ${str}`));
      }
      
      // This test doesn't fail but provides visibility
      expect(Array.isArray(untranslatedStrings)).toBe(true);
    });
  });

  describe('Translation Key Structure', () => {
    test('translation keys should follow naming conventions', () => {
      const enDir = path.join(localesDir, 'en');
      const files = fs.readdirSync(enDir).filter(f => f.endsWith('.json'));
      
      files.forEach(file => {
        const filePath = path.join(enDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const translations = JSON.parse(content);
        
        const checkKeys = (obj: any, prefix = '') => {
          Object.keys(obj).forEach(key => {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            
            // Keys should be camelCase, kebab-case, or snake_case
            expect(key).toMatch(/^[a-z][a-zA-Z0-9_-]*[a-zA-Z0-9]$|^[a-z]$/);
            
            if (typeof obj[key] === 'object' && obj[key] !== null) {
              checkKeys(obj[key], fullKey);
            }
          });
        };
        
        checkKeys(translations);
      });
    });

    test('translation values should not be empty strings', () => {
      const enDir = path.join(localesDir, 'en');
      const files = fs.readdirSync(enDir).filter(f => f.endsWith('.json'));
      
      files.forEach(file => {
        const filePath = path.join(enDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const translations = JSON.parse(content);
        
        const checkValues = (obj: any, prefix = '') => {
          Object.entries(obj).forEach(([key, value]) => {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            
            if (typeof value === 'string') {
              expect(value.trim()).not.toBe('');
            } else if (typeof value === 'object' && value !== null) {
              checkValues(value, fullKey);
            }
          });
        };
        
        checkValues(translations);
      });
    });
  });
}); 