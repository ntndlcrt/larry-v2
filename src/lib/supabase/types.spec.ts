export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      collections: {
        Row: {
          created_at: string | null
          icon: string | null
          id: number
          short_desc: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          icon?: string | null
          id?: number
          short_desc?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          icon?: string | null
          id?: number
          short_desc?: string | null
          title?: string | null
          user_id?: string | null
        }
      }
      pages: {
        Row: {
          created_at: string | null
          id: number
          short_desc: string | null
          title: string | null
          url: string
          user_id: string | null
          web_src: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          short_desc?: string | null
          title?: string | null
          url?: string
          user_id?: string | null
          web_src?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          short_desc?: string | null
          title?: string | null
          url?: string
          user_id?: string | null
          web_src?: string | null
        }
      }
      pages_collections: {
        Row: {
          collection_id: number
          page_id: number
        }
        Insert: {
          collection_id: number
          page_id: number
        }
        Update: {
          collection_id?: number
          page_id?: number
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          full_name: string | null
          has_onboarded: boolean
          id: string
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          has_onboarded?: boolean
          id: string
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          has_onboarded?: boolean
          id?: string
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
