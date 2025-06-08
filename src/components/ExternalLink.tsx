"use client";

import React, { useState } from 'react';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  showIcon?: boolean;
  showWarning?: boolean;
  className?: string;
  target?: string;
  rel?: string;
  title?: string;
}

export function ExternalLink({ 
  href, 
  children, 
  showIcon = true, 
  showWarning = true,
  className = '',
  target = '_blank',
  rel = 'noopener noreferrer'
}: ExternalLinkProps) {
  const [showWarningModal, setShowWarningModal] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (showWarning && !href.includes(window.location.hostname)) {
      e.preventDefault();
      setShowWarningModal(true);
    }
  };

  const proceedToLink = () => {
    setShowWarningModal(false);
    window.open(href, target, rel);
  };

  return (
    <>
      <a
        href={href}
        target={target}
        rel={rel}
        className={`inline-flex items-center space-x-1 text-purple-400 hover:text-purple-300 transition-colors ${className}`}
        onClick={handleClick}
      >
        <span>{children}</span>
        {showIcon && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </a>

      {/* Warning Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-lg rounded-xl border border-white/10 max-w-md w-full p-6">
            <div className="flex items-start space-x-4">
              <div className="text-yellow-400 text-2xl flex-shrink-0">
                ⚠️
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Leaving Campaign.ai
                </h3>
                <p className="text-gray-300 mb-4">
                  You're about to visit an external website. Campaign.ai is not responsible for the content or privacy practices of external sites.
                </p>
                <div className="bg-white/5 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-400 break-all">
                    {href}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowWarningModal(false)}
                    className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={proceedToLink}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-lg transition-all"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface SocialShareProps {
  url: string;
  title?: string;
  description?: string;
  className?: string;
}

export function SocialShare({ url, title = '', description = '', className = '' }: SocialShareProps) {
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + url)}`
  };

  const platforms = [
    { name: 'Twitter', icon: '𝕏', url: shareLinks.twitter, color: 'hover:text-blue-400' },
    { name: 'LinkedIn', icon: 'in', url: shareLinks.linkedin, color: 'hover:text-blue-600' },
    { name: 'Facebook', icon: 'f', url: shareLinks.facebook, color: 'hover:text-blue-500' },
    { name: 'Reddit', icon: '📱', url: shareLinks.reddit, color: 'hover:text-orange-500' },
    { name: 'Email', icon: '✉️', url: shareLinks.email, color: 'hover:text-gray-400' }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You might want to show a toast here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <span className="text-gray-400 text-sm">Share:</span>
      
      {platforms.map((platform) => (
        <ExternalLink
          key={platform.name}
          href={platform.url}
          showIcon={false}
          showWarning={false}
          className={`text-gray-400 ${platform.color} transition-colors p-2 hover:bg-white/10 rounded`}
          title={`Share on ${platform.name}`}
        >
          {platform.icon}
        </ExternalLink>
      ))}
      
      <button
        onClick={copyToClipboard}
        className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded"
        title="Copy link"
      >
        📋
      </button>
    </div>
  );
} 