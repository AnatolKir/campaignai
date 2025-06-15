export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  fontFamily?: string;
  fontSize?: string;
  lineHeight?: string;
  letterSpacing?: string;
  wordSpacing?: string;
  textAlign?: 'left' | 'right' | 'center';
  writingMode?: string;
  textOrientation?: string;
}

export const LANGUAGE_CONFIGS: Record<string, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    textAlign: 'left'
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    direction: 'ltr',
    textAlign: 'left'
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    direction: 'ltr',
    textAlign: 'left'
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    direction: 'ltr',
    textAlign: 'left'
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    direction: 'ltr',
    textAlign: 'left'
  },
  br: {
    code: 'br',
    name: 'Portuguese (Brazil)',
    nativeName: 'Português (Brasil)',
    direction: 'ltr',
    textAlign: 'left'
  },
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    direction: 'ltr',
    textAlign: 'left'
  },
  ru: {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    direction: 'ltr',
    textAlign: 'left',
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
  },
  // RTL Languages
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    textAlign: 'right',
    fontFamily: '"Noto Sans Arabic", "Arabic UI Text", "SF Arabic", "Segoe UI Arabic", Tahoma, sans-serif',
    lineHeight: '1.7',
    letterSpacing: '0.02em'
  },
  // CJK Languages with special considerations
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    direction: 'ltr',
    textAlign: 'left',
    fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
    lineHeight: '1.8',
    letterSpacing: '0.05em',
    wordSpacing: '0.1em'
  },
  ko: {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    direction: 'ltr',
    textAlign: 'left',
    fontFamily: '"Noto Sans KR", "Malgun Gothic", "Apple SD Gothic Neo", sans-serif',
    lineHeight: '1.7',
    letterSpacing: '0.03em'
  },
  zh: {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    direction: 'ltr',
    textAlign: 'left',
    fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
    lineHeight: '1.8',
    letterSpacing: '0.05em',
    wordSpacing: '0.1em'
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    direction: 'ltr',
    textAlign: 'left',
    fontFamily: '"Noto Sans Devanagari", "Devanagari Sangam MN", sans-serif',
    lineHeight: '1.8',
    letterSpacing: '0.02em'
  }
};

export const RTL_LANGUAGES = ['ar'];
export const CJK_LANGUAGES = ['ja', 'ko', 'zh'];
export const INDIC_LANGUAGES = ['hi'];

export function getLanguageConfig(locale: string): LanguageConfig {
  return LANGUAGE_CONFIGS[locale] || LANGUAGE_CONFIGS.en;
}

export function isRTL(locale: string): boolean {
  return RTL_LANGUAGES.includes(locale);
}

export function isCJK(locale: string): boolean {
  return CJK_LANGUAGES.includes(locale);
}

export function isIndic(locale: string): boolean {
  return INDIC_LANGUAGES.includes(locale);
}

export function getTextDirection(locale: string): 'ltr' | 'rtl' {
  return getLanguageConfig(locale).direction;
}

export function getLanguageStyles(locale: string): React.CSSProperties {
  const config = getLanguageConfig(locale);
  
  return {
    direction: config.direction,
    textAlign: config.textAlign,
    fontFamily: config.fontFamily,
    fontSize: config.fontSize,
    lineHeight: config.lineHeight,
    letterSpacing: config.letterSpacing,
    wordSpacing: config.wordSpacing,
    writingMode: config.writingMode,
    textOrientation: config.textOrientation
  };
} 