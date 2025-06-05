"use client";

import Link from "next/link";
import { useState } from "react";

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("invoices");
  const [showAddPayment, setShowAddPayment] = useState(false);

  // Mock data
  const currentUser = {
    role: "admin",
    email: "user@example.com",
    name: "John Doe"
  };

  const currentPlan = {
    name: "Free",
    price: "$0",
    period: "/month",
    nextBilling: null,
    status: "Active"
  };

  const invoices = [
    {
      id: "INV-2024-001",
      date: "2024-01-15",
      amount: "$399.00",
      status: "Paid",
      plan: "Pro Plan",
      period: "Jan 15 - Feb 15, 2024",
      downloadUrl: "#"
    },
    {
      id: "INV-2023-012",
      date: "2023-12-15", 
      amount: "$399.00",
      status: "Paid",
      plan: "Pro Plan",
      period: "Dec 15 - Jan 15, 2024",
      downloadUrl: "#"
    },
    {
      id: "INV-2023-011",
      date: "2023-11-15",
      amount: "$99.00", 
      status: "Paid",
      plan: "Standard Plan",
      period: "Nov 15 - Dec 15, 2023",
      downloadUrl: "#"
    }
  ];

  const paymentMethods = [
    {
      id: "pm_1",
      type: "card",
      brand: "visa",
      last4: "4242",
      expiry: "12/26",
      isDefault: true
    },
    {
      id: "pm_2", 
      type: "card",
      brand: "mastercard",
      last4: "8888",
      expiry: "06/25",
      isDefault: false
    }
  ];

  const billingHistory = [
    {
      date: "2024-01-15",
      description: "Pro Plan - Monthly subscription",
      amount: "$399.00",
      status: "Success"
    },
    {
      date: "2023-12-15",
      description: "Pro Plan - Monthly subscription", 
      amount: "$399.00",
      status: "Success"
    },
    {
      date: "2023-11-15",
      description: "Upgraded from Standard to Pro",
      amount: "$300.00",
      status: "Success"
    },
    {
      date: "2023-11-15",
      description: "Standard Plan - Monthly subscription",
      amount: "$99.00", 
      status: "Success"
    }
  ];

  if (currentUser.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-300 mb-6">You need admin permissions to access billing information.</p>
          <Link href="/dashboard" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

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
              <Link href="/upgrade" className="text-gray-300 hover:text-white transition-colors">
                Account & Billing
              </Link>
              <Link href="/billing" className="text-white font-semibold">
                Billing Management
              </Link>
              <Link href="/dashboard" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Billing Management</h1>
                <p className="text-gray-300">Manage your invoices, payment methods, and billing history</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Current Plan</div>
                <div className="text-2xl font-bold text-white">{currentPlan.name}</div>
                <div className="text-gray-300">{currentPlan.price}{currentPlan.period}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-1">
            {[
              { id: "invoices", label: "Invoices" },
              { id: "payment", label: "Payment Methods" },
              { id: "history", label: "Billing History" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Invoices Tab */}
          {activeTab === "invoices" && (
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Invoice History</h2>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                  Download All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-gray-300 font-semibold py-3">Invoice ID</th>
                      <th className="text-left text-gray-300 font-semibold py-3">Date</th>
                      <th className="text-left text-gray-300 font-semibold py-3">Plan</th>
                      <th className="text-left text-gray-300 font-semibold py-3">Period</th>
                      <th className="text-left text-gray-300 font-semibold py-3">Amount</th>
                      <th className="text-left text-gray-300 font-semibold py-3">Status</th>
                      <th className="text-left text-gray-300 font-semibold py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-white/5">
                        <td className="py-4 text-white font-mono">{invoice.id}</td>
                        <td className="py-4 text-gray-300">{invoice.date}</td>
                        <td className="py-4 text-gray-300">{invoice.plan}</td>
                        <td className="py-4 text-gray-300 text-sm">{invoice.period}</td>
                        <td className="py-4 text-white font-semibold">{invoice.amount}</td>
                        <td className="py-4">
                          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                            {invoice.status}
                          </span>
                        </td>
                        <td className="py-4">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm">
                            Download PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === "payment" && (
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Payment Methods</h2>
                <button 
                  onClick={() => setShowAddPayment(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  Add Payment Method
                </button>
              </div>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {method.brand.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-semibold">
                            **** **** **** {method.last4}
                          </div>
                          <div className="text-gray-400 text-sm">
                            Expires {method.expiry}
                          </div>
                        </div>
                        {method.isDefault && (
                          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        {!method.isDefault && (
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm">
                            Make Default
                          </button>
                        )}
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all text-sm">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Billing History Tab */}
          {activeTab === "history" && (
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Billing History</h2>

              <div className="space-y-4">
                {billingHistory.map((transaction, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-white font-semibold mb-1">{transaction.description}</div>
                        <div className="text-gray-400 text-sm">{transaction.date}</div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-white font-semibold">{transaction.amount}</div>
                          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Add Payment Method Modal */}
      {showAddPayment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-6">Add Payment Method</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-8">
              <button 
                onClick={() => setShowAddPayment(false)}
                className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-all font-semibold"
              >
                Cancel
              </button>
              <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold">
                Add Card
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