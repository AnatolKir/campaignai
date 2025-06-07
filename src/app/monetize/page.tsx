"use client";

import { useState } from "react";
import Link from "next/link";
import { Offer, Earning } from "@/types/monetization";
import { UnifiedNavigation } from "../../components/UnifiedNavigation";

export default function MonetizePage() {
  const [activeSection, setActiveSection] = useState("offers");
  const [selectedDateRange, setSelectedDateRange] = useState("7days");

  // Mock data for offers
  const offers: Offer[] = [
    {
      id: "1",
      advertiser: {
        name: "TechCorp Solutions",
        logo: "🏢",
        verified: true
      },
      campaign: {
        title: "New Software Launch Campaign",
        description: "Promote our new project management software to your audience",
        requirements: ["Minimum 10K followers", "Tech/Business niche", "Active engagement"],
        content: "Check out this game-changing project management tool that's revolutionizing how teams collaborate! 🚀 #productivity #teamwork"
      },
      payment: {
        amount: 500,
        currency: "USD"
      },
      schedule: {
        postDate: "2024-12-28",
        postTime: "2:00 PM"
      },
      deadline: "2024-12-27",
      platforms: ["X", "LinkedIn"],
      category: "Technology"
    },
    {
      id: "2",
      advertiser: {
        name: "FitLife Supplements",
        logo: "💪",
        verified: true
      },
      campaign: {
        title: "New Year Fitness Challenge",
        description: "Promote our fitness supplement line for New Year's resolutions",
        requirements: ["Health/Fitness niche", "Minimum 5K followers", "High engagement rate"],
        content: "Starting 2025 strong with @FitLifeSupplements! Who's ready to crush their fitness goals? 💪 Use code NEWYEAR25 for 20% off! #fitness #newyear"
      },
      payment: {
        amount: 350,
        currency: "USD"
      },
      schedule: {
        postDate: "2025-01-01",
        postTime: "8:00 AM"
      },
      deadline: "2024-12-30",
      platforms: ["Instagram", "TikTok"],
      category: "Health & Fitness"
    },
    {
      id: "3",
      advertiser: {
        name: "EcoGreen Products",
        logo: "🌱",
        verified: false
      },
      campaign: {
        title: "Sustainable Living Campaign",
        description: "Share the importance of eco-friendly products in daily life",
        requirements: ["Lifestyle/Environmental niche", "Authentic engagement"],
        content: "Small changes, big impact! 🌍 Switching to sustainable products has never been easier. Here's what I'm loving from @EcoGreenProducts #sustainability #ecofriendly"
      },
      payment: {
        amount: 200,
        currency: "USD"
      },
      schedule: {
        postDate: "2024-12-29",
        postTime: "11:00 AM"
      },
      deadline: "2024-12-28",
              platforms: ["Instagram", "X"],
      category: "Lifestyle"
    }
  ];

  // Mock data for earnings
  const earnings: Earning[] = [
    {
      id: "1",
      date: "2024-12-20",
      advertiser: "TechStartup Inc",
      campaign: "App Launch",
      amount: 750,
      status: 'completed',
              platform: "X"
    },
    {
      id: "2",
      date: "2024-12-18",
      advertiser: "Fashion Brand",
      campaign: "Holiday Collection",
      amount: 420,
      status: 'completed',
      platform: "Instagram"
    },
    {
      id: "3",
      date: "2024-12-15",
      advertiser: "Coffee Co",
      campaign: "New Blend Promotion",
      amount: 180,
      status: 'pending',
      platform: "TikTok"
    },
    {
      id: "4",
      date: "2024-12-28",
      advertiser: "TechCorp Solutions",
      campaign: "Software Launch",
      amount: 500,
      status: 'scheduled',
      platform: "LinkedIn"
    }
  ];

  const totalEarnings = earnings.reduce((sum, earning) => sum + earning.amount, 0);
  const pendingEarnings = earnings.filter(e => e.status === 'pending').reduce((sum, earning) => sum + earning.amount, 0);
  const completedEarnings = earnings.filter(e => e.status === 'completed').reduce((sum, earning) => sum + earning.amount, 0);

  const acceptOffer = (offerId: string) => {
    // In a real app, this would make an API call
    console.log(`Accepting offer ${offerId}`);
    alert("Offer accepted! The post has been scheduled and will go live at the specified time.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Top Navigation */}
      <UnifiedNavigation />

      <div className="flex h-screen">
        {/* Left Sidebar - Monetization Menu */}
        <div className="w-64 bg-black/20 backdrop-blur-lg border-r border-white/10 p-6">
          <h3 className="text-white font-semibold mb-6">Monetization</h3>
          
          <div className="space-y-2">
            <button
              onClick={() => setActiveSection("offers")}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                activeSection === "offers"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">💼</span>
                <span>Offers</span>
              </div>
            </button>

            <button
              onClick={() => setActiveSection("earnings")}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                activeSection === "earnings"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">💰</span>
                <span>Earnings</span>
              </div>
            </button>

            <button
              onClick={() => setActiveSection("reports")}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                activeSection === "reports"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">📊</span>
                <span>Reports</span>
              </div>
            </button>

            <button
              onClick={() => setActiveSection("payout")}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                activeSection === "payout"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">🏦</span>
                <span>Payout Settings</span>
              </div>
            </button>

            <button
              onClick={() => setActiveSection("privacy")}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                activeSection === "privacy"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">🔒</span>
                <span>Privacy Settings</span>
              </div>
            </button>
          </div>

          {/* Account Balance */}
          <div className="mt-8 bg-gradient-to-br from-green-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
            <div className="text-center">
              <div className="text-sm text-gray-300 mb-1">Current Balance</div>
              <div className="text-2xl font-bold text-white">${totalEarnings.toLocaleString()}</div>
              <div className="text-xs text-green-400 mt-1">+${completedEarnings} this month</div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {activeSection === "offers" && "Available Offers"}
                {activeSection === "earnings" && "Earnings Overview"}
                {activeSection === "reports" && "Performance Reports"}
                {activeSection === "payout" && "Payout Settings"}
                {activeSection === "privacy" && "Privacy Settings"}
              </h1>
              <p className="text-gray-300">
                {activeSection === "offers" && "Review and accept sponsored content opportunities"}
                {activeSection === "earnings" && "Track your monetization performance"}
                {activeSection === "reports" && "Analyze your earnings by date range"}
                {activeSection === "payout" && "Manage your payment preferences"}
                {activeSection === "privacy" && "Control your visibility to advertisers and manage privacy preferences"}
              </p>
            </div>
          </div>

          {/* Offers Section */}
          {activeSection === "offers" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <h3 className="text-gray-300 text-sm mb-2">Available Offers</h3>
                  <div className="text-3xl font-bold text-white">{offers.length}</div>
                  <div className="text-blue-400 text-sm">New opportunities</div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <h3 className="text-gray-300 text-sm mb-2">Potential Earnings</h3>
                  <div className="text-3xl font-bold text-white">${offers.reduce((sum, offer) => sum + offer.payment.amount, 0)}</div>
                  <div className="text-green-400 text-sm">If all accepted</div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <h3 className="text-gray-300 text-sm mb-2">Avg. Rate</h3>
                  <div className="text-3xl font-bold text-white">${Math.round(offers.reduce((sum, offer) => sum + offer.payment.amount, 0) / offers.length)}</div>
                  <div className="text-purple-400 text-sm">Per campaign</div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <h3 className="text-gray-300 text-sm mb-2">Pending Approval</h3>
                  <div className="text-3xl font-bold text-white">2</div>
                  <div className="text-yellow-400 text-sm">Awaiting response</div>
                </div>
              </div>

              {/* Offers List */}
              <div className="space-y-6">
                {offers.map((offer) => (
                  <div key={offer.id} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl">
                          {offer.advertiser.logo}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-xl font-bold text-white">{offer.advertiser.name}</h3>
                            {offer.advertiser.verified && (
                              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">✓ Verified</span>
                            )}
                          </div>
                          <p className="text-gray-300">{offer.campaign.title}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">${offer.payment.amount}</div>
                        <div className="text-sm text-gray-300">Payment</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-white font-semibold mb-2">Campaign Details</h4>
                        <p className="text-gray-300 text-sm mb-3">{offer.campaign.description}</p>
                        
                        <h5 className="text-white font-medium mb-2">Requirements:</h5>
                        <ul className="space-y-1">
                          {offer.campaign.requirements.map((req, index) => (
                            <li key={index} className="text-gray-300 text-sm flex items-center">
                              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-white font-semibold mb-2">Proposed Content</h4>
                        <div className="bg-black/30 rounded-lg p-4 mb-4">
                          <p className="text-gray-200 text-sm italic">"{offer.campaign.content}"</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Platforms:</span>
                            <div className="text-white">{offer.platforms.join(", ")}</div>
                          </div>
                          <div>
                            <span className="text-gray-400">Category:</span>
                            <div className="text-white">{offer.category}</div>
                          </div>
                          <div>
                            <span className="text-gray-400">Post Date:</span>
                            <div className="text-white">{offer.schedule.postDate} at {offer.schedule.postTime}</div>
                          </div>
                          <div>
                            <span className="text-gray-400">Deadline:</span>
                            <div className="text-yellow-400">{offer.deadline}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        {offer.platforms.map((platform) => (
                          <span key={platform} className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs">
                            {platform}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-3">
                        <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                          Decline
                        </button>
                        <button 
                          onClick={() => acceptOffer(offer.id)}
                          className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105"
                        >
                          Accept & Schedule
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Earnings Section */}
          {activeSection === "earnings" && (
            <div className="space-y-6">
              {/* Earnings Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-900/30 to-green-700/30 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30">
                  <h3 className="text-green-300 text-sm mb-2">Total Earnings</h3>
                  <div className="text-3xl font-bold text-white">${totalEarnings.toLocaleString()}</div>
                  <div className="text-green-400 text-sm">All time</div>
                </div>
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-700/30 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
                  <h3 className="text-blue-300 text-sm mb-2">Completed</h3>
                  <div className="text-3xl font-bold text-white">${completedEarnings.toLocaleString()}</div>
                  <div className="text-blue-400 text-sm">Ready for payout</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-700/30 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/30">
                  <h3 className="text-yellow-300 text-sm mb-2">Pending</h3>
                  <div className="text-3xl font-bold text-white">${pendingEarnings.toLocaleString()}</div>
                  <div className="text-yellow-400 text-sm">Awaiting completion</div>
                </div>
                <div className="bg-gradient-to-br from-purple-900/30 to-purple-700/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
                  <h3 className="text-purple-300 text-sm mb-2">This Month</h3>
                  <div className="text-3xl font-bold text-white">${completedEarnings.toLocaleString()}</div>
                  <div className="text-purple-400 text-sm">December 2024</div>
                </div>
              </div>

              {/* Earnings Chart Placeholder */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Earnings Trend</h3>
                  <select 
                    value={selectedDateRange} 
                    onChange={(e) => setSelectedDateRange(e.target.value)}
                    className="bg-white/10 text-white rounded-lg px-3 py-1 text-sm border border-white/20"
                  >
                    <option value="7days">Last 7 days</option>
                    <option value="30days">Last 30 days</option>
                    <option value="90days">Last 90 days</option>
                    <option value="year">This year</option>
                  </select>
                </div>
                <div className="h-64 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg flex items-center justify-center border border-white/10">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📈</div>
                    <p className="text-gray-300">Interactive earnings chart would appear here</p>
                    <p className="text-sm text-gray-400">Showing trends for {selectedDateRange}</p>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
                <div className="space-y-4">
                  {earnings.map((earning) => (
                    <div key={earning.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          earning.status === 'completed' ? 'bg-green-400' :
                          earning.status === 'pending' ? 'bg-yellow-400' : 'bg-blue-400'
                        }`}></div>
                        <div>
                          <div className="text-white font-medium">{earning.advertiser}</div>
                          <div className="text-gray-300 text-sm">{earning.campaign} • {earning.platform}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">${earning.amount}</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          earning.status === 'completed' ? 'bg-green-400/20 text-green-300' :
                          earning.status === 'pending' ? 'bg-yellow-400/20 text-yellow-300' : 'bg-blue-400/20 text-blue-300'
                        }`}>
                          {earning.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reports Section */}
          {activeSection === "reports" && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Detailed Reports</h3>
                  <p className="text-gray-300 mb-6">Generate comprehensive reports on your monetization performance</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                      Earnings by Platform
                    </button>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                      Campaign Performance
                    </button>
                    <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all">
                      Monthly Summary
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payout Settings Section */}
          {activeSection === "payout" && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Payment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Payment Method</label>
                    <select className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 focus:border-purple-500 focus:outline-none">
                      <option>PayPal</option>
                      <option>Bank Transfer</option>
                      <option>Stripe</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Payment Frequency</label>
                    <select className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 focus:border-purple-500 focus:outline-none">
                      <option>Weekly</option>
                      <option>Bi-weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Minimum Payout</label>
                    <input 
                      type="number" 
                      placeholder="$100"
                      className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Tax Information</label>
                    <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
                      Update Tax Details
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Payout History</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-white">December 15, 2024</div>
                      <div className="text-gray-300 text-sm">PayPal Payment</div>
                    </div>
                    <div className="text-green-400 font-bold">$1,170.00</div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-white">December 1, 2024</div>
                      <div className="text-gray-300 text-sm">PayPal Payment</div>
                    </div>
                    <div className="text-green-400 font-bold">$850.00</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Settings Section */}
          {activeSection === "privacy" && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Advertiser Visibility</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1">Allow advertisers to find me</h4>
                      <p className="text-gray-300 text-sm">When enabled, your profile will be visible to advertisers looking for creators to collaborate with. You'll receive campaign offers based on your content and audience.</p>
                    </div>
                    <div className="ml-6">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1">Show engagement metrics</h4>
                      <p className="text-gray-300 text-sm">Allow advertisers to see your engagement rates, follower demographics, and performance metrics to better match you with relevant campaigns.</p>
                    </div>
                    <div className="ml-6">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1">Auto-accept pre-screened offers</h4>
                      <p className="text-gray-300 text-sm">Automatically accept offers from verified advertisers that match your minimum rate and content preferences. You can review before posting.</p>
                    </div>
                    <div className="ml-6">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Content Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Minimum Rate (USD)</label>
                    <input 
                      type="number" 
                      placeholder="500"
                      className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 focus:border-purple-500 focus:outline-none"
                    />
                    <p className="text-gray-400 text-xs mt-1">Only receive offers above this amount</p>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Response Time</label>
                    <select className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 focus:border-purple-500 focus:outline-none">
                      <option>Within 24 hours</option>
                      <option>Within 48 hours</option>
                      <option>Within 1 week</option>
                      <option>No commitment</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 text-sm font-medium mb-2">Preferred Categories</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Technology", "Fashion", "Beauty", "Fitness", "Food", "Travel", "Gaming", "Business", "Lifestyle"].map((category) => (
                        <label key={category} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded border-gray-600 text-purple-600 focus:ring-purple-500" />
                          <span className="text-gray-300 text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 text-sm font-medium mb-2">Content Types I Won't Create</label>
                    <textarea 
                      placeholder="e.g., Political content, adult products, controversial topics..."
                      className="w-full bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 focus:border-purple-500 focus:outline-none h-20"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Data & Analytics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-white font-medium">Share performance data with advertisers</div>
                      <div className="text-gray-300 text-sm">Allow advertisers to see post performance after campaign completion</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-white font-medium">Anonymous analytics</div>
                      <div className="text-gray-300 text-sm">Contribute to platform insights without revealing your identity</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                  Reset to Defaults
                </button>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 