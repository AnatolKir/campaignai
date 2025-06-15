# Translation System Documentation

## Overview

This project uses a comprehensive translation system with built-in safeguards to prevent translation issues as the application scales. The system includes automated validation, type safety, AI-powered translations, and testing.

## Architecture

### Core Components

1. **next-intl**: Primary internationalization framework
2. **ESLint Integration**: Catches hardcoded strings and translation issues
3. **TypeScript Types**: Auto-generated types for translation keys
4. **Validation Scripts**: Automated checking for missing/inconsistent translations
5. **AI Translator**: OpenAI-powered automatic translation of missing keys
6. **Automated Testing**: Jest tests for translation integrity

## Directory Structure

```
public/locales/
├── en/           # English (reference locale)
│   ├── common.json
│   └── ...
├── es/           # Spanish
├── fr/           # French
├── de/           # German
├── it/           # Italian
├── ja/           # Japanese
├── zh/           # Chinese
└── br/           # Portuguese (Brazil)

scripts/
├── generate-translation-types.ts
├── validate-translations.ts
└── ai-translator.ts

src/types/
└── translations.ts  # Auto-generated types
```

## Usage

### Adding New Translations

1. **Add to English first** (reference locale):
   ```json
   // public/locales/en/common.json
   {
     "buttons": {
       "save": "Save",
       "cancel": "Cancel"
     }
   }
   ```

2. **Use in components**:
   ```tsx
   import { useTranslations } from 'next-intl';
   
   function MyComponent() {
     const t = useTranslations('common');
     
     return (
       <button>{t('buttons.save')}</button>
     );
   }
   ```

3. **Run validation** to check for missing translations:
   ```bash
   npm run i18n:validate
   ```

4. **Auto-translate missing keys** (requires OpenAI API key):
   ```bash
   export OPENAI_API_KEY="your-api-key"
   npm run i18n:translate
   ```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run i18n:validate` | Check for missing/inconsistent translations |
| `npm run i18n:types` | Generate TypeScript types from translation keys |
| `npm run i18n:translate` | AI-powered translation of missing keys |
| `npm run i18n:check` | Run validation + type generation |

## Safeguards

### 1. ESLint Rules

Automatically catches:
- Hardcoded strings in JSX
- Invalid translation key formats
- Missing translation placeholders

```javascript
// ❌ Will trigger ESLint warning
<button>Save</button>

// ✅ Correct usage
<button>{t('buttons.save')}</button>
```

### 2. TypeScript Type Safety

Auto-generated types ensure translation keys exist:

```typescript
// ✅ Type-safe - key exists
t('buttons.save')

// ❌ TypeScript error - key doesn't exist
t('buttons.nonexistent')
```

### 3. Build-time Validation

The build process automatically:
- Validates all translation files
- Generates TypeScript types
- Fails if critical translations are missing

### 4. Automated Testing

Jest tests verify:
- All locale files have valid JSON
- Translation key consistency across locales
- No empty translation values
- Proper key naming conventions

### 5. AI-Powered Translation

Automatically translates missing keys using OpenAI:
- Context-aware translations
- Batch processing for efficiency
- Rate limiting to avoid API limits
- Fallback to original text if translation fails

## Configuration

### Environment Variables

```bash
# Required for AI translation
OPENAI_API_KEY="your-openai-api-key"

# Optional - defaults to gpt-3.5-turbo
OPENAI_MODEL="gpt-4"
```

### ESLint Configuration

The system includes custom ESLint rules in `eslint.config.mjs`:

```javascript
{
  plugins: ["formatjs", "react"],
  rules: {
    "formatjs/no-offset": "error",
    "formatjs/enforce-default-message": ["error", "literal"],
    "react/jsx-no-literals": ["warn", {
      "noStrings": true,
      "allowedStrings": ["", " ", "•", "→", "←", "↑", "↓", "+", "-", "*", "/", "=", "%", "$", "#", "@", "&"],
      "ignoreProps": true
    }]
  }
}
```

## Workflow

### Development Workflow

1. **Add new features** with English translations
2. **ESLint catches** any hardcoded strings
3. **Run validation** to check translation completeness
4. **Auto-translate** missing keys or translate manually
5. **Tests verify** translation integrity

### CI/CD Integration

The build process includes automatic checks:

```bash
# Runs before build
npm run prebuild  # Validates translations + generates types
npm run build     # Builds the application
npm run test      # Runs translation tests
```

### Adding New Locales

1. Create new locale directory:
   ```bash
   mkdir public/locales/pt
   ```

2. Copy English files as templates:
   ```bash
   cp public/locales/en/*.json public/locales/pt/
   ```

3. Update language mapping in `scripts/ai-translator.ts`:
   ```typescript
   function getLanguageNames(): Record<string, string> {
     return {
       // ... existing languages
       'pt': 'Portuguese',
     };
   }
   ```

4. Run AI translation:
   ```bash
   npm run i18n:translate
   ```

## Best Practices

### Translation Keys

- Use nested structure: `buttons.save`, `forms.validation.required`
- Use camelCase or kebab-case: `userName` or `user-name`
- Be descriptive: `dashboard.analytics.title` not `title`
- Group related keys: `errors.validation.*`

### Translation Values

- Keep values concise and clear
- Use placeholders for dynamic content: `"Welcome {name}"`
- Maintain consistent tone across languages
- Consider cultural context

### Code Organization

- Import translations at component level
- Use namespace-specific translations: `useTranslations('common')`
- Avoid deeply nested translation calls
- Extract reusable translation logic

## Troubleshooting

### Common Issues

1. **"Translation key not found"**
   - Run `npm run i18n:types` to regenerate types
   - Check if key exists in English locale

2. **"ESLint jsx-no-literals warning"**
   - Wrap hardcoded strings with `t()` function
   - Add to `allowedStrings` if it's a symbol/icon

3. **"Build fails with translation errors"**
   - Run `npm run i18n:validate` to see specific issues
   - Fix missing translations or run `npm run i18n:translate`

4. **"AI translation not working"**
   - Check `OPENAI_API_KEY` environment variable
   - Verify API key has sufficient credits
   - Check network connectivity

### Debug Commands

```bash
# Check translation status
npm run i18n:validate

# Generate fresh types
npm run i18n:types

# Run translation tests
npm test -- translations.test.ts

# Lint for hardcoded strings
npm run lint
```

## Performance Considerations

- Translation files are loaded on-demand by next-intl
- Type generation is build-time only (no runtime cost)
- AI translation is development-time only
- ESLint rules run during development/build

## Security

- OpenAI API key should be kept secure
- Translation files are public (no sensitive data)
- AI translations should be reviewed before production
- Rate limiting prevents API abuse

## Future Enhancements

- [ ] Integration with translation management platforms
- [ ] Automated translation quality scoring
- [ ] Context extraction for better AI translations
- [ ] Visual diff for translation changes
- [ ] Automated translation memory
- [ ] Support for pluralization rules
- [ ] RTL language support detection 