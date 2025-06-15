'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { getLanguageConfig, isRTL, isCJK, isIndic } from '@/lib/languages';

interface LanguageWrapperProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

export function LanguageWrapper({ 
  children, 
  className = '', 
  style = {}, 
  as: Component = 'div' 
}: LanguageWrapperProps) {
  const locale = useLocale();
  const languageConfig = getLanguageConfig(locale);
  const isRTLLang = isRTL(locale);
  const isCJKLang = isCJK(locale);
  const isIndicLang = isIndic(locale);

  // Build language-specific classes
  const getLanguageClasses = () => {
    const classes = [];
    
    // Base direction class
    classes.push(isRTLLang ? 'rtl' : 'ltr');
    
    // Language-specific font classes
    switch (locale) {
      case 'ar':
        classes.push('font-arabic', 'arabic-text');
        break;
      case 'ja':
        classes.push('font-japanese', 'cjk-text');
        break;
      case 'ko':
        classes.push('font-korean', 'cjk-text');
        break;
      case 'zh':
        classes.push('font-chinese', 'cjk-text');
        break;
      case 'hi':
        classes.push('font-devanagari', 'devanagari-text');
        break;
    }
    
    return classes.join(' ');
  };

  // Combine styles
  const combinedStyle = {
    direction: languageConfig.direction,
    textAlign: languageConfig.textAlign,
    fontFamily: languageConfig.fontFamily,
    lineHeight: languageConfig.lineHeight,
    letterSpacing: languageConfig.letterSpacing,
    wordSpacing: languageConfig.wordSpacing,
    ...style
  };

  const combinedClassName = `${getLanguageClasses()} ${className}`.trim();

  return React.createElement(
    Component,
    {
      className: combinedClassName,
      style: combinedStyle,
      dir: languageConfig.direction
    },
    children
  );
}

// Specialized wrappers for common use cases
export function RTLText({ children, className = '', ...props }: Omit<LanguageWrapperProps, 'as'>) {
  return (
    <LanguageWrapper as="span" className={`${className}`} {...props}>
      {children}
    </LanguageWrapper>
  );
}

export function LanguageHeading({ 
  children, 
  level = 1, 
  className = '', 
  ...props 
}: Omit<LanguageWrapperProps, 'as'> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }) {
  const headingTag = `h${level}` as React.ElementType;
  
  return (
    <LanguageWrapper as={headingTag} className={`${className}`} {...props}>
      {children}
    </LanguageWrapper>
  );
}

export function LanguageParagraph({ children, className = '', ...props }: Omit<LanguageWrapperProps, 'as'>) {
  return (
    <LanguageWrapper as="p" className={`${className}`} {...props}>
      {children}
    </LanguageWrapper>
  );
}
