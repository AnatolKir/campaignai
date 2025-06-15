"use client";

import { useState } from 'react';
// import { signIn, getProviders } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const t = useTranslations();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Temporarily disabled NextAuth
      // const result = await signIn('email', {
      //   email,
      //   redirect: false,
      //   callbackUrl: '/dashboard'
      // });

      // if (result?.error) {
      //   setMessage('Error sending sign-in email. Please try again.');
      // } else {
      //   setMessage('Check your email for a sign-in link!');
      // }
      
      setMessage('NextAuth temporarily disabled for testing');
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Sign In</h1>
          <p className="text-gray-300">Welcome to Campaign.ai</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? 'Sending...' : 'Send Sign-In Link'}
            </button>

            {message && (
              <div className={`text-center text-sm ${
                message.includes('Error') ? 'text-red-400' : 'text-green-400'
              }`}>
                {message}
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account? Sign up with your email above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 