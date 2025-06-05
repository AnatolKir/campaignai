"use client";

import Link from "next/link";
import { useState } from "react";

export default function UpgradePage() {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showPauseConfirm, setShowPauseConfirm] = useState(false);

  // Mock current user data
  const currentPlan = {
    name: "Free",
    price: "$0",
    period: "/month",
    billingDate: null,
    nextBilling: null,
    usage: {
      brands: { current: 1, limit: 1 },
      posts: { current: 12, limit: 50 },
      engagement: { current: 0, limit: 0 },
      dmManagement: false,
    }
  };

  // Mock current user role
  const currentUser = {
    role: "admin", // "admin" or "regular"
    email: "user@example.com",
    name: "John Doe"
  };

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for getting started",
      isCurrentPlan: true,
      features: [
        "1 Brand",
        "Basic account analysis", 
        "Limited scheduling tool",
        "Email customer support",
      ],
      limitations: [
        "50 posts per month",
        "No automation",
        "Basic analytics only",
      ],
      buttonText: "Current Plan",
      buttonStyle: "border-2 border-green-500 text-green-400 cursor-not-allowed",
      disabled: true,
    },
    {
      name: "Standard",
      price: "$99",
      period: "/month",
      description: "Great for small businesses",
      isCurrentPlan: false,
      features: [
        "3 Brands",
        "Ability to configure before deciding to pay",
        "Competitive analysis",
        "Email customer support",
        "Response management",
      ],
      limitations: [
        "No DM automation",
        "Limited engagement automation",
      ],
      buttonText: "Upgrade to Standard",
      buttonStyle: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-105",
      disabled: false,
    },
    {
      name: "Pro",
      price: "$399",
      period: "/month",
      extraUser: "+$20/per extra user",
      description: "Most popular choice for growing teams",
      isCurrentPlan: false,
      features: [
        "10 Brands",
        "Everything in Standard",
        "50 automatically engage accounts",
        "500 automatically engage accounts", 
        "Direct Message (DM) Management",
        "Advanced team features",
        "Scheduling tool",
        "Email/phone customer support",
      ],
      limitations: [],
      buttonText: "Upgrade to Pro",
      buttonStyle: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-105",
      popular: true,
      disabled: false,
    },
    {
      name: "Premium", 
      price: "$999",
      period: "/month",
      extraUser: "+$20/per extra user",
      description: "For established businesses",
      isCurrentPlan: false,
      features: [
        "25 Brands",
        "Everything in Pro",
        "5000 automatically engage accounts",
        "Advanced team features",
        "Scheduling tool", 
        "Email/phone customer support",
        "Human/auto response management",
        "API Access",
      ],
      limitations: [],
      buttonText: "Upgrade to Premium",
      buttonStyle: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-105",
      disabled: false,
    },
    {
      name: "Enterprise",
      price: "$1999",
      period: "/month", 
      extraUser: "+$20/per extra user",
      description: "For large teams and agencies",
      isCurrentPlan: false,
      features: [
        "Unlimited Brands",
        "Everything in Premium",
        "50000 automatically engage accounts",
        "10000 account analysis",
        "Advanced team features",
        "Scheduling tool",
        "Access to enterprise support team",
        "Human/auto response management", 
        "API Access",
        "Cohort analysis (10K+ followers)",
      ],
      limitations: [],
      buttonText: "Upgrade to Enterprise",
      buttonStyle: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-105",
      disabled: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-white font-bold text-xl">Campaign.ai</span>
            </Link>
            <div className="flex space-x-6">
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/upgrade" className="text-white font-semibold">
                Account & Billing
              </Link>
              <Link href="/dashboard" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Current Plan Status */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-3xl p-8 border border-white/10 mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Account & Billing</h1>
                <p className="text-gray-300">Manage your subscription and billing preferences</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Account Status</div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 font-semibold">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Plan Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">Current Plan</h2>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white">{currentPlan.name}</h3>
                    <p className="text-gray-300 mb-2">
                      <span className="text-2xl font-bold">{currentPlan.price}</span>
                      <span className="text-lg">{currentPlan.period}</span>
                    </p>
                    {currentPlan.nextBilling ? (
                      <p className="text-gray-400">Next billing: {currentPlan.nextBilling}</p>
                    ) : (
                      <p className="text-gray-400">No billing scheduled</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                      Current Plan
                    </span>
                  </div>
                </div>

                {/* Usage Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-3">Usage This Month</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Brands</span>
                          <span className="text-gray-300">{currentPlan.usage.brands.current}/{currentPlan.usage.brands.limit}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                            style={{width: `${(currentPlan.usage.brands.current / currentPlan.usage.brands.limit) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Posts</span>
                          <span className="text-gray-300">{currentPlan.usage.posts.current}/{currentPlan.usage.posts.limit}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" 
                            style={{width: `${(currentPlan.usage.posts.current / currentPlan.usage.posts.limit) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-3">Features</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-gray-300">Auto Engagement: Disabled</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-gray-300">DM Management: Disabled</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300">Basic Analytics: Enabled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold">
                    Upgrade Now
                  </button>
                  {currentUser.role === "admin" && (
                    <>
                      <Link href="/billing" className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold text-center">
                        Billing & Invoices
                      </Link>
                      <Link href="/users" className="block w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all font-semibold text-center">
                        Manage Users
                      </Link>
                    </>
                  )}
                  <button 
                    onClick={() => setShowPauseConfirm(true)}
                    className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-all font-semibold"
                    disabled={currentUser.role !== "admin"}
                  >
                    Pause Account {currentUser.role !== "admin" && "(Admin Only)"}
                  </button>
                  <button 
                    onClick={() => setShowCancelConfirm(true)}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all font-semibold"
                    disabled={currentUser.role !== "admin"}
                  >
                    Cancel Subscription {currentUser.role !== "admin" && "(Admin Only)"}
                  </button>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Need Help?</h3>
                <div className="space-y-3 text-sm">
                  <Link href="/support" className="block text-purple-400 hover:text-purple-300 transition-colors">
                    📧 Contact Support
                  </Link>
                  <Link href="/docs" className="block text-purple-400 hover:text-purple-300 transition-colors">
                    📚 Documentation
                  </Link>
                  <Link href="/faq" className="block text-purple-400 hover:text-purple-300 transition-colors">
                    ❓ FAQ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Plans */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-300">Upgrade to unlock more features and grow your social media presence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {pricingTiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`relative bg-white/5 backdrop-blur-lg rounded-3xl p-6 border transition-all duration-300 ${
                  tier.isCurrentPlan 
                    ? 'border-green-500/50 ring-2 ring-green-500/30' 
                    : tier.popular 
                    ? 'border-purple-500/50 ring-2 ring-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/30 hover:transform hover:scale-105 pt-12' 
                    : 'border-white/10 hover:border-white/20 hover:transform hover:scale-105'
                } ${tier.isCurrentPlan ? 'pt-12' : ''}`}
              >
                {tier.popular && !tier.isCurrentPlan && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                {tier.isCurrentPlan && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Current Plan
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{tier.description}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-gray-400">{tier.period}</span>
                  </div>
                  {tier.extraUser && (
                    <p className="text-sm text-purple-300">{tier.extraUser}</p>
                  )}
                </div>

                <div className="mb-8">
                  <div className="mb-4">
                    <h4 className="text-green-400 font-semibold mb-3 text-sm">✓ FEATURES</h4>
                    <ul className="space-y-2">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm text-gray-300">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {tier.limitations && tier.limitations.length > 0 && (
                    <div>
                      <h4 className="text-gray-500 font-semibold mb-3 text-sm">⚠️ LIMITATIONS</h4>
                      <ul className="space-y-2">
                        {tier.limitations.map((limitation, limitationIndex) => (
                          <li key={limitationIndex} className="flex items-start text-sm text-gray-500">
                            <div className="w-2 h-2 bg-gray-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button 
                  className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ${tier.buttonStyle}`}
                  disabled={tier.disabled}
                >
                  {tier.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-4">Cancel Subscription?</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to cancel your subscription? You'll lose access to all premium features immediately.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-all font-semibold"
              >
                Keep Subscription
              </button>
              <button className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all font-semibold">
                Cancel Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pause Confirmation Modal */}
      {showPauseConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-4">Pause Account?</h3>
            <p className="text-gray-300 mb-6">
              Pausing your account will stop all automation and billing. You can reactivate anytime to resume where you left off.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowPauseConfirm(false)}
                className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-all font-semibold"
              >
                Keep Active
              </button>
              <button className="flex-1 bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-all font-semibold">
                Pause Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-white font-bold text-xl">Campaign.ai</span>
            </Link>
            <div className="flex space-x-8 text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Campaign.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 