"use client";

import React, { useState } from 'react';
import { useBrand } from '../contexts/BrandContext';

interface CreateBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateBrandModal({ isOpen, onClose }: CreateBrandModalProps) {
  const { createBrand } = useBrand();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    description: '',
    website: '',
    industry: '',
    primary_color: '#8B5CF6',
    secondary_color: '#EC4899',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const brand = await createBrand({
        name: formData.name,
        handle: formData.handle || null,
        description: formData.description || null,
        website: formData.website || null,
        industry: formData.industry || null,
        primary_color: formData.primary_color,
        secondary_color: formData.secondary_color,
      });

      if (brand) {
        onClose();
        setFormData({
          name: '',
          handle: '',
          description: '',
          website: '',
          industry: '',
          primary_color: '#8B5CF6',
          secondary_color: '#EC4899',
        });
      }
    } catch (error) {
      console.error('Error creating brand:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-lg rounded-3xl p-8 border border-white/10 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Create New Brand</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Brand Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Brand Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Tech Startup Co"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Handle */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Handle (Optional)
            </label>
            <input
              type="text"
              name="handle"
              value={formData.handle}
              onChange={handleChange}
              placeholder="@techstartup"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of your brand..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Website (Optional)
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://techstartup.com"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Industry (Optional)
            </label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select an industry</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Media & Entertainment">Media & Entertainment</option>
              <option value="Travel & Hospitality">Travel & Hospitality</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Fashion & Beauty">Fashion & Beauty</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Automotive">Automotive</option>
              <option value="Sports & Fitness">Sports & Fitness</option>
              <option value="Non-profit">Non-profit</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Brand Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Primary Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  name="primary_color"
                  value={formData.primary_color}
                  onChange={handleChange}
                  className="w-12 h-12 rounded-lg border border-white/20 cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.primary_color}
                  onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                  className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Secondary Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  name="secondary_color"
                  value={formData.secondary_color}
                  onChange={handleChange}
                  className="w-12 h-12 rounded-lg border border-white/20 cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.secondary_color}
                  onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                  className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-sm text-gray-300 mb-2">Preview</div>
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: formData.primary_color }}
              >
                {formData.name.charAt(0).toUpperCase() || 'B'}
              </div>
              <div>
                <div className="text-white font-medium">
                  {formData.name || 'Brand Name'}
                </div>
                {formData.handle && (
                  <div className="text-gray-400 text-sm">{formData.handle}</div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-all font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.name.trim() || isCreating}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? 'Creating...' : 'Create Brand'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 