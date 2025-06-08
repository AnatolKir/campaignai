"use client";

import React, { useState, useRef, useEffect } from 'react';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'other';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
  reactions?: string[];
}

interface MessageBubbleProps {
  message: Message;
  showTimestamp?: boolean;
  onReact?: (messageId: string, reaction: string) => void;
}

export function MessageBubble({ message, showTimestamp = false, onReact }: MessageBubbleProps) {
  const [showReactions, setShowReactions] = useState(false);
  const isUser = message.sender === 'user';
  
  const reactions = ['👍', '❤️', '😂', '😮', '😢', '🚀'];

  const statusIcons = {
    sent: '✓',
    delivered: '✓✓',
    read: '✓✓'
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white ml-auto'
              : 'bg-white/10 text-gray-300 mr-auto'
          } relative group`}
          onMouseEnter={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          
          {/* Message Status */}
          {isUser && message.status && (
            <div className="flex justify-end mt-1">
              <span className={`text-xs ${
                message.status === 'read' ? 'text-blue-300' : 'text-gray-400'
              }`}>
                {statusIcons[message.status]}
              </span>
            </div>
          )}

          {/* Reactions */}
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex space-x-1 mt-2">
              {message.reactions.map((reaction, index) => (
                <span key={index} className="text-sm">
                  {reaction}
                </span>
              ))}
            </div>
          )}

          {/* Reaction Popover */}
          {showReactions && onReact && (
            <div className={`absolute ${isUser ? 'right-0' : 'left-0'} -top-12 bg-gray-800 rounded-lg px-2 py-1 flex space-x-1 z-10 shadow-lg`}>
              {reactions.map((reaction) => (
                <button
                  key={reaction}
                  onClick={() => onReact(message.id, reaction)}
                  className="hover:bg-gray-700 rounded p-1 transition-colors"
                >
                  {reaction}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Timestamp */}
        {showTimestamp && (
          <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>
    </div>
  );
}

interface MessageInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MessageInput({ onSend, placeholder = "Type a message...", disabled = false }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="flex items-end space-x-3 p-4 bg-white/5 backdrop-blur-lg border-t border-white/10">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none min-h-[44px] max-h-32"
        />
      </div>
      <button
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-all transform hover:scale-105 flex-shrink-0"
        aria-label="Send message"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </div>
  );
}

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onReact?: (messageId: string, reaction: string) => void;
  title?: string;
  isLoading?: boolean;
  className?: string;
}

export function ChatWindow({ 
  messages, 
  onSendMessage, 
  onReact, 
  title = "Chat",
  isLoading = false,
  className = ''
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 flex flex-col h-96 ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            showTimestamp
            onReact={onReact}
          />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 rounded-2xl px-4 py-3 max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <MessageInput onSend={onSendMessage} disabled={isLoading} />
    </div>
  );
} 