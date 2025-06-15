'use client';

import React, { useState } from 'react';
import RichTextEditor from '../../../components/RichTextEditor';
import Link from 'next/link';

export default function RichTextEditorDemo() {
  const [content, setContent] = useState(`# Welcome to the Rich Text Editor! 

This editor supports **bold text**, *italic text*, <u>underlined text</u>, and ~~strikethrough text~~.

## Features Include:

- **Bold, Italic, Underline, Strikethrough** formatting
- Headings (H1, H2) 
- Bullet lists and numbered lists
- Link insertion with [example links](https://example.com)
- Live preview mode
- Auto-save functionality 
- Keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+K)
- Character count and limits
- Platform-specific formatting options

### Try These Features:

1. Select text and use the toolbar buttons
2. Try keyboard shortcuts: Ctrl+B for bold, Ctrl+I for italic
3. Click the link button to insert links
4. Use the preview mode to see formatted output
5. Everything auto-saves as you type!

**Pro Tip:** You can toggle between edit and preview modes to see exactly how your content will look when published!

Start typing below to test the editor...`);

  const [autoSaveStatus, setAutoSaveStatus] = useState<string>('');

  const handleAutoSave = (content: string) => {
    setAutoSaveStatus('Draft saved automatically!');
    setTimeout(() => setAutoSaveStatus(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">📝 Rich Text Editor Demo</h1>
          <p className="text-gray-300">
            Experience the enhanced post creation with formatting options, auto-save, and live preview
          </p>
        </div>

        {/* Feature Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="text-2xl mb-3">✍️</div>
            <h3 className="font-semibold text-white mb-2">Rich Formatting</h3>
            <p className="text-sm text-gray-300">
              Bold, italic, underline, strikethrough, headings, lists, and links with intuitive toolbar
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="text-2xl mb-3">💾</div>
            <h3 className="font-semibold text-white mb-2">Auto-Save</h3>
            <p className="text-sm text-gray-300">
              Never lose your work! Content saves automatically every 2 seconds
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="text-2xl mb-3">👁️</div>
            <h3 className="font-semibold text-white mb-2">Live Preview</h3>
            <p className="text-sm text-gray-300">
              See exactly how your formatted content will appear when published
            </p>
          </div>
        </div>

        {/* Editor Demo */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Try the Editor</h2>
            {autoSaveStatus && (
              <div className="text-sm text-green-400 flex items-center gap-2">
                <span>✅</span>
                <span>{autoSaveStatus}</span>
              </div>
            )}
          </div>
          
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Start writing your content with rich formatting..."
            maxLength={5000}
            onAutoSave={handleAutoSave}
            config={{
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
            }}
          />
        </div>

        {/* Keyboard Shortcuts Guide */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">⌨️ Keyboard Shortcuts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-300 mb-3">Formatting</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Bold</span>
                  <kbd className="bg-white/10 px-2 py-1 rounded text-xs">Ctrl + B</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Italic</span>
                  <kbd className="bg-white/10 px-2 py-1 rounded text-xs">Ctrl + I</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Underline</span>
                  <kbd className="bg-white/10 px-2 py-1 rounded text-xs">Ctrl + U</kbd>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-300 mb-3">Actions</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Insert Link</span>
                  <kbd className="bg-white/10 px-2 py-1 rounded text-xs">Ctrl + K</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Save</span>
                  <kbd className="bg-white/10 px-2 py-1 rounded text-xs">Ctrl + S</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform-Specific Features */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">🌐 Platform-Specific Formatting</h2>
          <p className="text-gray-300 mb-4">
            The rich text editor adapts its features based on the target social media platform:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-blue-400 mb-3">Full Feature Platforms</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div>• <strong>LinkedIn:</strong> All formatting + headings</div>
                <div>• <strong>Reddit:</strong> All formatting + headings</div>
                <div>• <strong>Discord:</strong> Most formatting options</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-yellow-400 mb-3">Limited Feature Platforms</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div>• <strong>Twitter/X:</strong> Basic formatting, limited lists</div>
                <div>• <strong>Instagram:</strong> Basic text, links in bio only</div>
                <div>• <strong>TikTok:</strong> Plain text optimized</div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">💡 Usage Examples</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-green-400 mb-2">✅ Good Examples</h3>
              <div className="bg-white/5 p-4 rounded-lg text-sm font-mono">
                <div className="text-gray-300">
                  **Exciting News!** We're launching our new product line! 🚀<br/><br/>
                  
                  ## Key Features:<br/>
                  - Advanced AI integration<br/>
                  - 24/7 customer support<br/>
                  - Enterprise-grade security<br/><br/>
                  
                  Learn more at [our website](https://example.com)
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-red-400 mb-2">❌ Avoid These</h3>
              <div className="bg-white/5 p-4 rounded-lg text-sm text-gray-400">
                • Overusing formatting (too much **bold** and *italic*)<br/>
                • Very long links without descriptive text<br/>
                • Too many heading levels in short content<br/>
                • Platform-inappropriate formatting
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30">
          <h2 className="text-xl font-semibold text-white mb-4">🚀 Ready to Create?</h2>
          <p className="text-gray-300 mb-4">
            The rich text editor is fully integrated into the post creation workflow. Create professional, 
            formatted content that adapts to each social media platform automatically.
          </p>
          
          <div className="flex gap-4">
            <Link 
              href="/create-post"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium"
            >
              Create New Post
            </Link>
            <Link 
              href="/demo-handle-search"
              className="bg-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              Try Handle Search
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 