import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { UnifiedNavigation } from '@/components/UnifiedNavigation';

export default function Home() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation with landing variant */}
      <UnifiedNavigation variant="landing" />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              {t('welcome')} to Campaign.ai
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              AI-Powered Social Media Management Platform that automates content creation, engagement, and growth across all your social channels
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/en/dashboard"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-lg"
              >
                Start Free Trial
              </Link>
              <Link 
                href="#features"
                className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white px-8 py-4 rounded-lg font-semibold transition-all text-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Powerful AI Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to automate and scale your social media presence with intelligent AI agents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Content Creation</h3>
              <p className="text-gray-300">
                Generate engaging posts, captions, and content automatically with our advanced AI that understands your brand voice
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Analytics</h3>
              <p className="text-gray-300">
                Track performance, engagement, and growth with detailed insights and AI-powered recommendations
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-white mb-4">Auto Engagement</h3>
              <p className="text-gray-300">
                Automatically engage with your audience, respond to comments, and manage DMs with intelligent automation
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-white mb-4">Competitive Intelligence</h3>
              <p className="text-gray-300">
                Monitor competitors, track trends, and discover opportunities with AI-powered market analysis
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Scheduling</h3>
              <p className="text-gray-300">
                Schedule posts at optimal times across all platforms with AI-optimized timing for maximum reach
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-2xl font-bold text-white mb-4">Monetization Tools</h3>
              <p className="text-gray-300">
                Connect with brands, manage sponsorships, and track earnings with built-in monetization features
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots/Demo Section */}
      <section id="screenshots" className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              See Campaign.ai in Action
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the power of AI-driven social media management with our intuitive dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Intelligence Dashboard</h3>
              <p className="text-gray-300 mb-8 text-lg">
                Get real-time insights into your social media performance with AI-powered analytics, 
                competitor tracking, and growth recommendations all in one place.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Real-time performance metrics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">AI-powered growth insights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Multi-platform management</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="text-center">
                <div className="text-6xl mb-4">📱</div>
                <h4 className="text-xl font-bold text-white mb-2">Dashboard Preview</h4>
                <p className="text-gray-300 mb-4">Interactive demo coming soon</p>
                <Link 
                  href="/en/dashboard"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all inline-block"
                >
                  Try Live Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Start free and scale as you grow. No setup fees, cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                <div className="text-4xl font-bold text-white mb-2">$0</div>
                <p className="text-gray-400">Perfect for getting started</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">1 Brand</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Basic analytics</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">50 posts per month</span>
                </li>
              </ul>
              <Link 
                href="/en/dashboard"
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 rounded-lg font-semibold transition-all text-center block"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/50 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              </div>
              <div className="text-center mb-8 pt-4">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <div className="text-4xl font-bold text-white mb-2">$399</div>
                <p className="text-gray-400">For growing teams</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">10 Brands</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Auto engagement</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">DM management</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Advanced analytics</span>
                </li>
              </ul>
              <Link 
                href="/en/upgrade"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition-all text-center block"
              >
                Upgrade to Pro
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-white mb-2">$1999</div>
                <p className="text-gray-400">For large teams</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Unlimited brands</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">API access</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Priority support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Custom integrations</span>
                </li>
              </ul>
              <Link 
                href="/en/upgrade"
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 rounded-lg font-semibold transition-all text-center block"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Social Media?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of creators and brands using Campaign.ai to automate their social media growth
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/en/dashboard"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/en/monetize"
              className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white px-8 py-4 rounded-lg font-semibold transition-all text-lg"
            >
              Explore Monetization
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/logo-32.png" alt="Campaign.ai" className="w-8 h-8" />
                <span className="text-white font-bold text-xl">Campaign.ai</span>
              </div>
              <p className="text-gray-400">
                AI-powered social media management platform for creators and brands.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/en/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/en/analytics" className="text-gray-400 hover:text-white transition-colors">Analytics</Link></li>
                <li><Link href="/en/posts" className="text-gray-400 hover:text-white transition-colors">Posts</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Growth</h4>
              <ul className="space-y-2">
                <li><Link href="/en/monetize" className="text-gray-400 hover:text-white transition-colors">Monetize</Link></li>
                <li><Link href="/en/advertise" className="text-gray-400 hover:text-white transition-colors">Advertise</Link></li>
                <li><Link href="/en/competitive-intelligence" className="text-gray-400 hover:text-white transition-colors">Competitive Intel</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/en/training" className="text-gray-400 hover:text-white transition-colors">Training</Link></li>
                <li><Link href="/en/upgrade" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><a href="mailto:support@campaign.ai" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Campaign.ai. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}