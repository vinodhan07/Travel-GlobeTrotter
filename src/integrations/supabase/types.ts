export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          category: string
          city_id: string
          created_at: string
          description: string | null
          duration_hours: number | null
          estimated_cost: number | null
          id: string
          image_url: string | null
          name: string
        }
        Insert: {
          category: string
          city_id: string
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          estimated_cost?: number | null
          id?: string
          image_url?: string | null
          name: string
        }
        Update: {
          category?: string
          city_id?: string
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          estimated_cost?: number | null
          id?: string
          image_url?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      budgets: {
        Row: {
          accommodation_cost: number | null
          activities_cost: number | null
          created_at: string
          currency: string | null
          daily_limit: number | null
          food_cost: number | null
          id: string
          other_cost: number | null
          total_cost: number | null
          transport_cost: number | null
          trip_id: string
          updated_at: string
        }
        Insert: {
          accommodation_cost?: number | null
          activities_cost?: number | null
          created_at?: string
          currency?: string | null
          daily_limit?: number | null
          food_cost?: number | null
          id?: string
          other_cost?: number | null
          total_cost?: number | null
          transport_cost?: number | null
          trip_id: string
          updated_at?: string
        }
        Update: {
          accommodation_cost?: number | null
          activities_cost?: number | null
          created_at?: string
          currency?: string | null
          daily_limit?: number | null
          food_cost?: number | null
          id?: string
          other_cost?: number | null
          total_cost?: number | null
          transport_cost?: number | null
          trip_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "budgets_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: true
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      cities: {
        Row: {
          cost_index: number | null
          country: string
          created_at: string
          id: string
          image_url: string | null
          name: string
        }
        Insert: {
          cost_index?: number | null
          country: string
          created_at?: string
          id?: string
          image_url?: string | null
          name: string
        }
        Update: {
          cost_index?: number | null
          country?: string
          created_at?: string
          id?: string
          image_url?: string | null
          name?: string
        }
        Relationships: []
      }
      itinerary_items: {
        Row: {
          activity_id: string | null
          cost: number | null
          created_at: string
          custom_name: string | null
          date: string
          id: string
          is_completed: boolean | null
          notes: string | null
          order_index: number
          time_slot: string | null
          trip_stop_id: string
        }
        Insert: {
          activity_id?: string | null
          cost?: number | null
          created_at?: string
          custom_name?: string | null
          date: string
          id?: string
          is_completed?: boolean | null
          notes?: string | null
          order_index?: number
          time_slot?: string | null
          trip_stop_id: string
        }
        Update: {
          activity_id?: string | null
          cost?: number | null
          created_at?: string
          custom_name?: string | null
          date?: string
          id?: string
          is_completed?: boolean | null
          notes?: string | null
          order_index?: number
          time_slot?: string | null
          trip_stop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_items_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itinerary_items_trip_stop_id_fkey"
            columns: ["trip_stop_id"]
            isOneToOne: false
            referencedRelation: "trip_stops"
            referencedColumns: ["id"]
          },
        ]
      }
      packing_items: {
        Row: {
          category: string
          created_at: string
          id: string
          is_packed: boolean | null
          name: string
          packing_list_id: string
          quantity: number | null
        }
        Insert: {
          category?: string
          created_at?: string
          id?: string
          is_packed?: boolean | null
          name: string
          packing_list_id: string
          quantity?: number | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          is_packed?: boolean | null
          name?: string
          packing_list_id?: string
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "packing_items_packing_list_id_fkey"
            columns: ["packing_list_id"]
            isOneToOne: false
            referencedRelation: "packing_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      packing_lists: {
        Row: {
          created_at: string
          id: string
          trip_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          trip_id: string
        }
        Update: {
          created_at?: string
          id?: string
          trip_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "packing_lists_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id: string
          name: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      trip_stops: {
        Row: {
          city_id: string
          created_at: string
          end_date: string
          id: string
          notes: string | null
          order_index: number
          start_date: string
          trip_id: string
        }
        Insert: {
          city_id: string
          created_at?: string
          end_date: string
          id?: string
          notes?: string | null
          order_index?: number
          start_date: string
          trip_id: string
        }
        Update: {
          city_id?: string
          created_at?: string
          end_date?: string
          id?: string
          notes?: string | null
          order_index?: number
          start_date?: string
          trip_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_stops_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trip_stops_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          cover_image: string | null
          created_at: string
          description: string | null
          end_date: string
          id: string
          is_public: boolean | null
          share_code: string | null
          start_date: string
          name: string
          updated_at: string
          user_id: string
          budget_limit: number | null
        }
        Insert: {
          cover_image?: string | null
          created_at?: string
          description?: string | null
          end_date: string
          id?: string
          is_public?: boolean | null
          share_code?: string | null
          start_date: string
          name: string
          updated_at?: string
          user_id: string
          budget_limit?: number | null
        }
        Update: {
          cover_image?: string | null
          created_at?: string
          description?: string | null
          end_date?: string
          id?: string
          is_public?: boolean | null
          share_code?: string | null
          start_date?: string
          name?: string
          updated_at?: string
          user_id?: string
          budget_limit?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "trips_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
    DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
    DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | keyof DefaultSchema["Enums"]
  | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof DefaultSchema["CompositeTypes"]
  | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
