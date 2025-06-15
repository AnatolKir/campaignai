"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../lib/supabase';
import type { Brand, BrandWithPermissions, User } from '../types/supabase';

interface BrandContextType {
  currentBrand: BrandWithPermissions | null;
  availableBrands: BrandWithPermissions[];
  user: User | null;
  isLoading: boolean;
  switchBrand: (brandId: string) => Promise<void>;
  createBrand: (brandData: Partial<Brand>) => Promise<Brand | null>;
  canCreateBrand: () => boolean;
  refreshBrands: () => Promise<void>;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function useBrand() {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
}

interface BrandProviderProps {
  children: React.ReactNode;
}

export function BrandProvider({ children }: BrandProviderProps) {
  const [currentBrand, setCurrentBrand] = useState<BrandWithPermissions | null>(null);
  const [availableBrands, setAvailableBrands] = useState<BrandWithPermissions[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  // Mock data for development (replace with real Supabase calls later)
  const mockUser: User = {
    id: '1',
    email: 'user@example.com',
    name: 'John Doe',
    avatar_url: null,
    role: 'admin',
    subscription_plan: 'pro', // Change to 'free' to test limitations
    subscription_status: 'active',
    current_brand_id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const mockBrands: BrandWithPermissions[] = [
    {
      id: '1',
      name: 'Tech Startup Co',
      handle: '@techstartup',
      description: 'Innovative technology solutions',
      logo_url: null,
      primary_color: '#8B5CF6',
      secondary_color: '#EC4899',
      website: 'https://techstartup.com',
      industry: 'Technology',
      owner_id: '1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_brands: {
        role: 'owner',
        permissions: {},
      },
    },
    {
      id: '2',
      name: 'InnovateAI',
      handle: '@innovateai',
      description: 'AI-powered business solutions',
      logo_url: null,
      primary_color: '#3B82F6',
      secondary_color: '#10B981',
      website: 'https://innovateai.com',
      industry: 'Artificial Intelligence',
      owner_id: '1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_brands: {
        role: 'owner',
        permissions: {},
      },
    },
    {
      id: '3',
      name: 'Digital Marketing Pro',
      handle: '@digitalmarketingpro',
      description: 'Expert digital marketing services',
      logo_url: null,
      primary_color: '#F59E0B',
      secondary_color: '#EF4444',
      website: 'https://digitalmarketingpro.com',
      industry: 'Marketing',
      owner_id: '1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_brands: {
        role: 'owner',
        permissions: {},
      },
    },
  ];

  const fetchUserAndBrands = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual Supabase queries
      // const { data: { user } } = await supabase.auth.getUser();
      // if (!user) return;

      // For now, use mock data
      setUser(mockUser);
      setAvailableBrands(mockBrands);
      
      // Set current brand based on user's current_brand_id
      const currentBrandId = mockUser.current_brand_id;
      if (currentBrandId) {
        const brand = mockBrands.find(b => b.id === currentBrandId);
        if (brand) {
          setCurrentBrand(brand);
        }
      } else if (mockBrands.length > 0) {
        // If no current brand set, default to first available brand
        setCurrentBrand(mockBrands[0]);
        // TODO: Update user's current_brand_id in database
      }
    } catch (error) {
      console.error('Error fetching user and brands:', error);
    } finally {
      setIsLoading(false);
    }
  }, [mockUser, mockBrands, supabase]);

  const switchBrand = async (brandId: string) => {
    const brand = availableBrands.find(b => b.id === brandId);
    if (!brand) return;

    setCurrentBrand(brand);
    
    // TODO: Update user's current_brand_id in database
    // await supabase
    //   .from('users')
    //   .update({ current_brand_id: brandId })
    //   .eq('id', user?.id);

    // Update local user state
    if (user) {
      setUser({ ...user, current_brand_id: brandId });
    }
  };

  const canCreateBrand = (): boolean => {
    if (!user) return false;
    
    const brandLimits = {
      free: 1,
      standard: 3,
      pro: 999, // Unlimited for pro
    };

    const currentLimit = brandLimits[user.subscription_plan];
    return availableBrands.length < currentLimit;
  };

  const createBrand = async (brandData: Partial<Brand>): Promise<Brand | null> => {
    if (!user) return null;
    
    if (!canCreateBrand()) {
      // Redirect to upgrade page
      router.push('/upgrade');
      return null;
    }

    try {
      // TODO: Replace with actual Supabase call
      // const { data, error } = await supabase
      //   .from('brands')
      //   .insert({
      //     ...brandData,
      //     owner_id: user.id,
      //   })
      //   .select()
      //   .single();

      // Mock creation for development
      const newBrand: Brand = {
        id: Date.now().toString(),
        name: brandData.name || 'New Brand',
        handle: brandData.handle || null,
        description: brandData.description || null,
        logo_url: brandData.logo_url || null,
        primary_color: brandData.primary_color || '#8B5CF6',
        secondary_color: brandData.secondary_color || '#EC4899',
        website: brandData.website || null,
        industry: brandData.industry || null,
        owner_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const newBrandWithPermissions: BrandWithPermissions = {
        ...newBrand,
        user_brands: {
          role: 'owner',
          permissions: {},
        },
      };

      setAvailableBrands(prev => [...prev, newBrandWithPermissions]);
      
      // Switch to the new brand immediately
      await switchBrand(newBrand.id);
      
      return newBrand;
    } catch (error) {
      console.error('Error creating brand:', error);
      return null;
    }
  };

  const refreshBrands = async () => {
    await fetchUserAndBrands();
  };

  useEffect(() => {
    fetchUserAndBrands();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const value = {
    currentBrand,
    availableBrands,
    user,
    isLoading,
    switchBrand,
    createBrand,
    canCreateBrand,
    refreshBrands,
  };

  return (
    <BrandContext.Provider value={value}>
      {children}
    </BrandContext.Provider>
  );
} 