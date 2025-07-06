'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          consented_to_marketing: true 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage(`Success! You're #${data.signupOrder} on the waitlist!`);
        setEmail('');
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Failed to connect. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <Image 
          src="/logo.png" 
          alt="Campaign AI" 
          width={200} 
          height={60}
          className="mx-auto mb-8"
        />
        
        {/* Hero Content */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Coming Soon
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          AI-powered social media management that works 24/7 to grow your brand
        </p>

        {/* Simple Signup Form */}
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </button>
            </div>
            
            <p className="text-sm text-gray-400 mt-4">
              Be among the first 1,000 users to get 3 months free!
            </p>
          </form>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-6">
              <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-400 text-lg font-semibold">{message}</p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setMessage('');
                }}
                className="mt-4 text-purple-400 hover:text-purple-300 underline"
              >
                Sign up another email
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {message && !isSuccess && (
          <p className="text-red-400 mt-4">{message}</p>
        )}

        {/* Footer */}
        <div className="mt-16 text-sm text-gray-500">
          <a href="/en/dashboard" className="hover:text-gray-400">
            Team Login →
          </a>
        </div>
      </div>
    </div>
  );
}