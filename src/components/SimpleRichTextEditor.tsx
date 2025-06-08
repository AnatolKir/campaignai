'use client';

import React, { useState, useRef } from 'react';

interface SimpleRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SimpleRichTextEditor({
  value,
  onChange,
  placeholder = "Type something..."
}: SimpleRichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleBold = () => {
    console.log('Bold clicked!');
    const textarea = textareaRef.current;
    if (!textarea) {
      console.log('No textarea found');
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    console.log('Selection:', { start, end, selectedText });

    let newValue: string;
    if (selectedText) {
      // Wrap selected text
      newValue = value.substring(0, start) + '**' + selectedText + '**' + value.substring(end);
    } else {
      // Insert at cursor
      newValue = value.substring(0, start) + '****' + value.substring(end);
    }

    console.log('New value:', newValue);
    onChange(newValue);

    // Restore focus and position
    setTimeout(() => {
      textarea.focus();
      if (selectedText) {
        textarea.setSelectionRange(start + 2, start + 2 + selectedText.length);
      } else {
        textarea.setSelectionRange(start + 2, start + 2);
      }
    }, 10);
  };

  const handleItalic = () => {
    console.log('Italic clicked!');
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    let newValue: string;
    if (selectedText) {
      newValue = value.substring(0, start) + '*' + selectedText + '*' + value.substring(end);
    } else {
      newValue = value.substring(0, start) + '**' + value.substring(end);
    }

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      if (selectedText) {
        textarea.setSelectionRange(start + 1, start + 1 + selectedText.length);
      } else {
        textarea.setSelectionRange(start + 1, start + 1);
      }
    }, 10);
  };

  return (
    <div className="simple-rich-text-editor">
      {/* Simple Toolbar */}
      <div className="bg-gray-800 p-2 rounded-t-lg flex gap-2">
        <button
          type="button"
          onClick={handleBold}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={handleItalic}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 italic"
        >
          I
        </button>
      </div>

      {/* Simple Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={6}
        className="w-full p-3 bg-gray-900 text-white border-0 rounded-b-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
} 