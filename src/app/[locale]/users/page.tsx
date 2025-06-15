"use client";

import Link from "next/link";
import { useState } from "react";
import { UnifiedNavigation } from '../../../components/UnifiedNavigation';

export default function UsersPage() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Mock data
  const currentUser = {
    id: 1,
    role: "admin",
    email: "admin@example.com", 
    name: "John Doe"
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "admin@example.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15 14:30",
      createdAt: "2023-06-01",
      brands: ["@techstartup", "@innovateai"]
    },
    {
      id: 2,
      name: "Sarah Johnson", 
      email: "sarah@example.com",
      role: "regular",
      status: "active",
      lastLogin: "2024-01-14 09:15",
      createdAt: "2023-08-15",
      brands: ["@techstartup"]
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@example.com", 
      role: "regular",
      status: "inactive",
      lastLogin: "2023-12-20 16:45",
      createdAt: "2023-09-10",
      brands: ["@innovateai"]
    }
  ]);

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setShowEditUser(true);
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  if (currentUser.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-300 mb-6">You need admin permissions to manage users.</p>
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
      <UnifiedNavigation />

      {/* Header */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">User Management</h1>
                <p className="text-gray-300">Manage team members, roles, and permissions</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Total Users</div>
                <div className="text-3xl font-bold text-white">{users.length}</div>
                <div className="text-gray-300">{users.filter(u => u.status === 'active').length} active</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Actions Bar */}
      <section className="px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <div className="bg-white/5 backdrop-blur-lg rounded-lg p-1 border border-white/10">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm">
                  All Users
                </button>
                <button className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Active
                </button>
                <button className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Inactive
                </button>
              </div>
            </div>
            <button 
              onClick={() => setShowAddUser(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold"
            >
              + Add User
            </button>
          </div>
        </div>
      </section>

      {/* Users Table */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left text-gray-300 font-semibold py-4 px-6">User</th>
                    <th className="text-left text-gray-300 font-semibold py-4 px-6">Role</th>
                    <th className="text-left text-gray-300 font-semibold py-4 px-6">Status</th>
                    <th className="text-left text-gray-300 font-semibold py-4 px-6">Brands Access</th>
                    <th className="text-left text-gray-300 font-semibold py-4 px-6">Last Login</th>
                    <th className="text-left text-gray-300 font-semibold py-4 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="text-white font-semibold">{user.name}</div>
                            <div className="text-gray-400 text-sm">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.role === 'admin' 
                            ? 'bg-purple-500/20 text-purple-400' 
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {user.role === 'admin' ? 'Admin' : 'Regular'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.status === 'active'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1">
                          {user.brands.map((brand, idx) => (
                            <span key={idx} className="bg-white/10 text-gray-300 px-2 py-1 rounded text-xs">
                              {brand}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-300 text-sm">
                        {user.lastLogin}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEditUser(user)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                          >
                            Edit
                          </button>
                          {user.id !== currentUser.id && (
                            <button 
                              onClick={() => handleDeleteUser(user.id)}
                              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-6">Add New User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="regular">Regular User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Brand Access</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-300">@techstartup</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-300">@innovateai</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex space-x-4 mt-8">
              <button 
                onClick={() => setShowAddUser(false)}
                className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-all font-semibold"
              >
                Cancel
              </button>
              <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold">
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUser && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-6">Edit User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={selectedUser.name}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue={selectedUser.email}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <select 
                  defaultValue={selectedUser.role}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="regular">Regular User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select 
                  defaultValue={selectedUser.status}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Brand Access</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2" 
                      defaultChecked={selectedUser.brands.includes('@techstartup')}
                    />
                    <span className="text-gray-300">@techstartup</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2" 
                      defaultChecked={selectedUser.brands.includes('@innovateai')}
                    />
                    <span className="text-gray-300">@innovateai</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex space-x-4 mt-8">
              <button 
                onClick={() => setShowEditUser(false)}
                className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-all font-semibold"
              >
                Cancel
              </button>
              <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold">
                Save Changes
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