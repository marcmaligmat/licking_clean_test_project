import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create supabase client
function createSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_project_url' || supabaseAnonKey === 'your_supabase_anon_key') {
    return null
  }
  
  try {
    return createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error('Error creating Supabase client:', error)
    return null
  }
}

export const supabase = createSupabaseClient()

// Database types
export interface Provider {
  id: number
  name: string
  bio: string
  rating: number
  created_at?: string
}

export interface Booking {
  id: number
  provider_id: number
  timestamp: string
  created_at?: string
}