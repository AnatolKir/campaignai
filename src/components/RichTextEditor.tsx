'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RichTextEditorConfig } from '../types/create-post';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
  config?: Partial<RichTextEditorConfig>;
  error?: string;
  onAutoSave?: (content: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content here...",
  maxLength = 10000,
  className = "",
  config = {},
  error,
  onAutoSave
}: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Default config
  const editorConfig: RichTextEditorConfig = {
    placeholder,
    maxLength,
    toolbar: {
      bold: true,
      italic: true,
      underline: true,
      strikethrough: true,
      link: true,
      list: true,
      heading: true,
    },
    autoSave: true,
    spellCheck: true,
    ...config,
  };

  // Auto-save functionality
  useEffect(() => {
    if (editorConfig.autoSave && onAutoSave) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      autoSaveTimeoutRef.current = setTimeout(() => {
        onAutoSave(value);
      }, 2000);

      return () => {
        if (autoSaveTimeoutRef.current) {
          clearTimeout(autoSaveTimeoutRef.current);
        }
      };
    }
  }, [value, editorConfig.autoSave, onAutoSave]);

  // Simple text wrapping function
  const wrapText = useCallback((prefix: string, suffix: string = prefix) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let newValue: string;
    if (selectedText) {
      newValue = value.substring(0, start) + prefix + selectedText + suffix + value.substring(end);
    } else {
      newValue = value.substring(0, start) + prefix + suffix + value.substring(end);
    }
    
    onChange(newValue);
    
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const newPos = selectedText ? start + prefix.length + selectedText.length : start + prefix.length;
        textareaRef.current.setSelectionRange(newPos, newPos);
      }
    }, 0);
  }, [value, onChange]);

  // Formatting functions
  const formatBold = () => wrapText('**');
  const formatItalic = () => wrapText('*');
  const formatUnderline = () => wrapText('<u>', '</u>');
  const formatStrikethrough = () => wrapText('~~');
  const formatCode = () => wrapText('`');

  // Insert text at cursor
  const insertText = useCallback((text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const newValue = value.substring(0, start) + text + value.substring(start);
    onChange(newValue);

    setTimeout(() => {
      const newPos = start + text.length;
      textarea.setSelectionRange(newPos, newPos);
      textarea.focus();
    }, 0);
  }, [value, onChange]);

  // Insert heading
  const insertHeading = (level: number = 2) => {
    const prefix = '#'.repeat(level) + ' ';
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const isAtLineStart = start === lineStart;
    
    if (isAtLineStart) {
      insertText(prefix);
    } else {
      insertText('\n' + prefix);
    }
  };

  // Insert list
  const insertList = (ordered: boolean = false) => {
    const marker = ordered ? '1. ' : '- ';
    insertText(marker);
  };

  // Handle link insertion
  const handleInsertLink = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    setLinkText(selectedText || '');
    setLinkUrl('');
    setShowLinkDialog(true);
  };

  const insertLink = () => {
    if (!linkUrl) return;
    
    const displayText = linkText || linkUrl;
    const linkMarkdown = `[${displayText}](${linkUrl})`;
    
    insertText(linkMarkdown);
    setShowLinkDialog(false);
    setLinkUrl('');
    setLinkText('');
  };

  // Simple markdown preview
  const renderPreview = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/<u>(.*?)<\/u>/g, '<u class="underline">$1</u>')
      .replace(/~~(.*?)~~/g, '<del class="line-through">$1</del>')
      .replace(/`([^`]+)`/g, '<code class="bg-black/30 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/^(#{1,6})\s+(.*)$/gm, (match, hashes, text) => {
        const level = hashes.length;
        const classes = {
          1: 'text-3xl font-bold mb-4',
          2: 'text-2xl font-bold mb-3', 
          3: 'text-xl font-bold mb-3',
          4: 'text-lg font-bold mb-2',
          5: 'text-base font-bold mb-2',
          6: 'text-sm font-bold mb-2'
        };
        return `<h${level} class="${classes[level as keyof typeof classes] || ''}">${text}</h${level}>`;
      })
      .replace(/^- (.*)$/gm, '<li class="ml-4 mb-1">• $1</li>')
      .replace(/^\d+\. (.*)$/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 underline" target="_blank">$1</a>')
      .replace(/\n/g, '<br>');
  };

  // Keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          formatBold();
          break;
        case 'i':
          e.preventDefault();
          formatItalic();
          break;
        case 'u':
          e.preventDefault();
          formatUnderline();
          break;
        case 'k':
          e.preventDefault();
          handleInsertLink();
          break;
      }
    }
  };

  return (
    <div className={`rich-text-editor ${className}`}>
      {/* Toolbar */}
      <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-t-2xl p-4 shadow-lg">
        <div className="flex flex-wrap items-center gap-2">
          {/* Basic Formatting */}
          <div className="flex gap-1">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={formatBold}
              className="px-3 py-2 text-sm bg-white/10 hover:bg-white/20 hover:scale-105 rounded-lg border border-white/20 text-white font-bold transition-all duration-200 shadow-sm"
              title="Bold (Ctrl+B)"
            >
              B
            </button>
            
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={formatItalic}
              className="px-3 py-2 text-sm bg-white/10 hover:bg-white/20 hover:scale-105 rounded-lg border border-white/20 text-white italic transition-all duration-200 shadow-sm"
              title="Italic (Ctrl+I)"
            >
              I
            </button>
            
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={formatUnderline}
              className="px-3 py-2 text-sm bg-white/10 hover:bg-white/20 hover:scale-105 rounded-lg border border-white/20 text-white underline transition-all duration-200 shadow-sm"
              title="Underline (Ctrl+U)"
            >
              U
            </button>
            
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={formatStrikethrough}
              className="px-3 py-2 text-sm bg-white/10 hover:bg-white/20 hover:scale-105 rounded-lg border border-white/20 text-white line-through transition-all duration-200 shadow-sm"
              title="Strikethrough"
            >
              S
            </button>

            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={formatCode}
              className="px-3 py-2 text-sm bg-white/10 hover:bg-white/20 hover:scale-105 rounded-lg border border-white/20 text-white font-mono transition-all duration-200 shadow-sm"
              title="Code"
            >
              &lt;/&gt;
            </button>
          </div>

          <div className="w-px h-8 bg-white/20" />

          {/* Headings */}
          <div className="flex gap-1">
            {[1, 2, 3].map(level => (
              <button
                key={level}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => insertHeading(level)}
                className="px-2 py-2 text-xs bg-white/10 hover:bg-white/20 hover:scale-105 rounded-lg border border-white/20 text-white font-bold transition-all duration-200 shadow-sm"
                title={`Heading ${level}`}
              >
                H{level}
              </button>
            ))}
          </div>

          <div className="w-px h-8 bg-white/20" />

          {/* Lists */}
          <div className="flex gap-1">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => insertList(false)}
              className="px-3 py-2 text-sm bg-white/10 hover:bg-white/20 hover:scale-105 rounded-lg border border-white/20 text-white transition-all duration-200 shadow-sm"
              title="Bullet List"
            >
              •
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => insertList(true)}
              className="px-3 py-2 text-sm bg-white/10 hover:bg-white/20 hover:scale-105 rounded-lg border border-white/20 text-white transition-all duration-200 shadow-sm"
              title="Numbered List"
            >
              1.
            </button>
          </div>

          <div className="w-px h-8 bg-white/20" />

          {/* Link */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleInsertLink}
            className="px-3 py-2 text-sm bg-white/10 hover:bg-white/20 hover:scale-105 rounded-lg border border-white/20 text-white transition-all duration-200 shadow-sm"
            title="Insert Link (Ctrl+K)"
          >
            🔗
          </button>

          <div className="w-px h-8 bg-white/20" />

          {/* Preview Toggle */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`px-4 py-2 text-sm rounded-lg border transition-all duration-200 shadow-sm ${
              isPreviewMode 
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 border-purple-500 text-white' 
                : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
            }`}
            title="Toggle Preview"
          >
            {isPreviewMode ? '✏️ Edit' : '👁️ Preview'}
          </button>

          {/* Character Count */}
          <div className="ml-auto flex items-center gap-2">
            <div className="text-sm">
              <span className={`${value.length > maxLength ? 'text-red-400' : 'text-gray-300'} font-mono`}>
                {value.length}
              </span>
              <span className="text-gray-500 font-mono">/{maxLength}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="relative">
        {!isPreviewMode ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            maxLength={maxLength}
            spellCheck={editorConfig.spellCheck}
            rows={12}
            className="w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-x border-b border-white/20 rounded-b-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 resize-none font-mono text-sm leading-relaxed shadow-lg transition-all duration-200"
          />
        ) : (
          <div className="w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-x border-b border-white/20 rounded-b-2xl px-6 py-4 text-white min-h-[300px] prose prose-invert max-w-none shadow-lg">
            <div dangerouslySetInnerHTML={{ __html: renderPreview(value) }} />
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-3 p-3 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-lg">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/30 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Insert Link</h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Link Text (optional)
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Link text"
                  className="w-full bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  URL *
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
                  autoFocus
                />
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={() => setShowLinkDialog(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white px-6 py-3 rounded-xl transition-all duration-200 border border-white/20"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={insertLink}
                disabled={!linkUrl}
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      <div className="mt-4">
        <details className="text-xs text-gray-400 bg-white/5 rounded-xl p-3 border border-white/10">
          <summary className="cursor-pointer hover:text-gray-300 font-medium">
            ⌨️ Keyboard Shortcuts
          </summary>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div><kbd className="bg-white/10 px-1 rounded">Ctrl+B</kbd> Bold</div>
            <div><kbd className="bg-white/10 px-1 rounded">Ctrl+I</kbd> Italic</div>
            <div><kbd className="bg-white/10 px-1 rounded">Ctrl+U</kbd> Underline</div>
            <div><kbd className="bg-white/10 px-1 rounded">Ctrl+K</kbd> Link</div>
          </div>
        </details>
      </div>
    </div>
  );
} 