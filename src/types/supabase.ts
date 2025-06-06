export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          avatar_url: string | null
          role: 'admin' | 'regular'
          subscription_plan: 'free' | 'standard' | 'pro'
          subscription_status: 'active' | 'inactive' | 'canceled' | 'past_due'
          current_brand_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          avatar_url?: string | null
          role?: 'admin' | 'regular'
          subscription_plan?: 'free' | 'standard' | 'pro'
          subscription_status?: 'active' | 'inactive' | 'canceled' | 'past_due'
          current_brand_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          avatar_url?: string | null
          role?: 'admin' | 'regular'
          subscription_plan?: 'free' | 'standard' | 'pro'
          subscription_status?: 'active' | 'inactive' | 'canceled' | 'past_due'
          current_brand_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      brands: {
        Row: {
          id: string
          name: string
          handle: string | null
          description: string | null
          logo_url: string | null
          primary_color: string
          secondary_color: string
          website: string | null
          industry: string | null
          owner_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          handle?: string | null
          description?: string | null
          logo_url?: string | null
          primary_color?: string
          secondary_color?: string
          website?: string | null
          industry?: string | null
          owner_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          handle?: string | null
          description?: string | null
          logo_url?: string | null
          primary_color?: string
          secondary_color?: string
          website?: string | null
          industry?: string | null
          owner_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_brands: {
        Row: {
          id: string
          user_id: string
          brand_id: string
          role: 'owner' | 'admin' | 'member'
          permissions: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          brand_id: string
          role?: 'owner' | 'admin' | 'member'
          permissions?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          brand_id?: string
          role?: 'owner' | 'admin' | 'member'
          permissions?: Json
          created_at?: string
          updated_at?: string
        }
      }
      brand_social_accounts: {
        Row: {
          id: string
          brand_id: string
          platform: string
          platform_user_id: string
          username: string
          display_name: string | null
          avatar_url: string | null
          access_token: string | null
          refresh_token: string | null
          is_connected: boolean
          last_sync: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          brand_id: string
          platform: string
          platform_user_id: string
          username: string
          display_name?: string | null
          avatar_url?: string | null
          access_token?: string | null
          refresh_token?: string | null
          is_connected?: boolean
          last_sync?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          brand_id?: string
          platform?: string
          platform_user_id?: string
          username?: string
          display_name?: string | null
          avatar_url?: string | null
          access_token?: string | null
          refresh_token?: string | null
          is_connected?: boolean
          last_sync?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type User = Database['public']['Tables']['users']['Row']
export type Brand = Database['public']['Tables']['brands']['Row']
export type UserBrand = Database['public']['Tables']['user_brands']['Row']
export type BrandSocialAccount = Database['public']['Tables']['brand_social_accounts']['Row']

export interface BrandWithPermissions extends Brand {
  user_brands: {
    role: 'owner' | 'admin' | 'member'
    permissions: Json
  }
}

export interface UserWithBrands extends User {
  brands: BrandWithPermissions[]
} 