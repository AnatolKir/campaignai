import React from 'react';
import TargetAccounts from '../../components/TargetAccounts';
import Link from 'next/link';

export default function TargetAccountsPage() {
  // TODO: Get actual user ID from authentication context
  const userId = 'user_123'; // Placeholder

  const handleImportComplete = (result: any) => {
    console.log('Import completed:', result);
    // TODO: Show success notification or update UI
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                Campaign.ai
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/posts" className="text-gray-600 hover:text-gray-900">
                Posts
              </Link>
              <Link href="/create-post" className="text-gray-600 hover:text-gray-900">
                Create Post
              </Link>
              <Link href="/target-accounts" className="text-blue-600 font-medium">
                Target Accounts
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold leading-7 text-gray-900 sm:text-4xl sm:truncate">
                Target Accounts
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Build Campaign.ai's handle database by adding your target accounts. 
                This data helps improve our mention suggestions and competitor tracking features.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TargetAccounts 
          userId={userId} 
          onImportComplete={handleImportComplete}
        />

        {/* Benefits Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Better Mention Suggestions
            </h3>
            <p className="text-gray-600">
              Your submitted handles help improve our AI's ability to suggest relevant mentions when creating posts across platforms.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Competitor Tracking
            </h3>
            <p className="text-gray-600">
              Build a comprehensive database of competitor accounts and influencers in your industry for better market intelligence.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Cross-Platform Insights
            </h3>
            <p className="text-gray-600">
              Discover how brands maintain consistent messaging and handle formats across different social media platforms.
            </p>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-2">🔒 Privacy & Data Usage</h4>
          <div className="text-sm text-blue-800 space-y-2">
            <p>
              <strong>Internal Use Only:</strong> All submitted handles are used exclusively within Campaign.ai to improve your experience and our services.
            </p>
            <p>
              <strong>No Data Sharing:</strong> We do not share, sell, or expose your submitted handle data to other users or third parties.
            </p>
            <p>
              <strong>Verification Process:</strong> Popular handles may be marked as "verified" by our team to improve suggestion quality.
            </p>
            <p>
              <strong>Future Features:</strong> This data will power upcoming features like automated competitor analysis and industry trend detection.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <details className="bg-white p-6 rounded-lg shadow-sm border">
              <summary className="cursor-pointer font-semibold text-gray-900 hover:text-blue-600">
                What file formats are supported?
              </summary>
              <div className="mt-3 text-gray-600">
                <p>We support CSV files, TXT files, and direct paste input. CSV files should have columns for Name, Handle/URL. TXT files should have one handle per line. You can also paste a list directly into the text area.</p>
              </div>
            </details>

            <details className="bg-white p-6 rounded-lg shadow-sm border">
              <summary className="cursor-pointer font-semibold text-gray-900 hover:text-blue-600">
                Which platforms are supported?
              </summary>
              <div className="mt-3 text-gray-600">
                <p>We support 10 major platforms: Instagram, Twitter/X, LinkedIn, TikTok, YouTube, Reddit, Discord, Telegram, WhatsApp Business, and Threads. Our system automatically detects the platform from URLs and handle formats.</p>
              </div>
            </details>

            <details className="bg-white p-6 rounded-lg shadow-sm border">
              <summary className="cursor-pointer font-semibold text-gray-900 hover:text-blue-600">
                How is my data used?
              </summary>
              <div className="mt-3 text-gray-600">
                <p>Your submitted handles are used internally to improve mention suggestions, power competitor analysis features, and enhance our AI's understanding of cross-platform brand presence. We never share this data with other users or external parties.</p>
              </div>
            </details>

            <details className="bg-white p-6 rounded-lg shadow-sm border">
              <summary className="cursor-pointer font-semibold text-gray-900 hover:text-blue-600">
                What if I submit duplicate handles?
              </summary>
              <div className="mt-3 text-gray-600">
                <p>Our system automatically detects and handles duplicates. If a handle already exists in our database, we'll update the timestamp to show it's still active rather than creating a duplicate entry.</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
} 