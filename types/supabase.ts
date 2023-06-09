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
      todos: {
        Row: {
          active: boolean
          board: string | null
          created_at: string | null
          date: string | null
          id: number
          test: string[]
          time: number
          title: string
          user_id: string
        }
        Insert: {
          active?: boolean
          board?: string | null
          created_at?: string | null
          date?: string | null
          id?: number
          test?: string[]
          time?: number
          title: string
          user_id: string
        }
        Update: {
          active?: boolean
          board?: string | null
          created_at?: string | null
          date?: string | null
          id?: number
          test?: string[]
          time?: number
          title?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}