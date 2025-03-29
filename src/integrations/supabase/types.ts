export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analytics: {
        Row: {
          browser: string
          city: string | null
          country: string | null
          device_type: string
          id: string
          ip_address: string | null
          language: string | null
          operating_system: string
          path: string
          referrer: string | null
          screen_resolution: string | null
          session_id: string
          user_id: string | null
          visit_time: string
        }
        Insert: {
          browser: string
          city?: string | null
          country?: string | null
          device_type: string
          id?: string
          ip_address?: string | null
          language?: string | null
          operating_system: string
          path: string
          referrer?: string | null
          screen_resolution?: string | null
          session_id: string
          user_id?: string | null
          visit_time?: string
        }
        Update: {
          browser?: string
          city?: string | null
          country?: string | null
          device_type?: string
          id?: string
          ip_address?: string | null
          language?: string | null
          operating_system?: string
          path?: string
          referrer?: string | null
          screen_resolution?: string | null
          session_id?: string
          user_id?: string | null
          visit_time?: string
        }
        Relationships: []
      }
      engineer_profiles: {
        Row: {
          created_at: string
          current_salary: string | null
          expected_salary: string | null
          github_url: string | null
          home_location: string | null
          id: string
          is_verified: boolean | null
          job_nature_preference: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_salary?: string | null
          expected_salary?: string | null
          github_url?: string | null
          home_location?: string | null
          id: string
          is_verified?: boolean | null
          job_nature_preference?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_salary?: string | null
          expected_salary?: string | null
          github_url?: string | null
          home_location?: string | null
          id?: string
          is_verified?: boolean | null
          job_nature_preference?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          annual_salary: string | null
          applied_at: string
          commute_minutes: number | null
          company: string
          created_at: string
          description: string | null
          employees: string | null
          founded: number | null
          glassdoor_url: string | null
          id: string
          is_active: boolean | null
          location: string | null
          logo_url: string | null
          manually_added: boolean | null
          monthly_salary: string | null
          rating: number | null
          reviews: number | null
          role: string
          source_platform: string | null
          status: string | null
          transport_time_car: string | null
          transport_time_public: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          annual_salary?: string | null
          applied_at?: string
          commute_minutes?: number | null
          company: string
          created_at?: string
          description?: string | null
          employees?: string | null
          founded?: number | null
          glassdoor_url?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          logo_url?: string | null
          manually_added?: boolean | null
          monthly_salary?: string | null
          rating?: number | null
          reviews?: number | null
          role: string
          source_platform?: string | null
          status?: string | null
          transport_time_car?: string | null
          transport_time_public?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          annual_salary?: string | null
          applied_at?: string
          commute_minutes?: number | null
          company?: string
          created_at?: string
          description?: string | null
          employees?: string | null
          founded?: number | null
          glassdoor_url?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          logo_url?: string | null
          manually_added?: boolean | null
          monthly_salary?: string | null
          rating?: number | null
          reviews?: number | null
          role?: string
          source_platform?: string | null
          status?: string | null
          transport_time_car?: string | null
          transport_time_public?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      suggested_jobs: {
        Row: {
          annual_salary: string | null
          commute_minutes: number | null
          company: string
          created_at: string
          description: string | null
          employees: string | null
          founded: number | null
          glassdoor_url: string | null
          id: string
          location: string | null
          logo_url: string | null
          match_percentage: string | null
          monthly_salary: string | null
          rating: number | null
          reviews: number | null
          role: string
          transport_time_car: string | null
          transport_time_public: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          annual_salary?: string | null
          commute_minutes?: number | null
          company: string
          created_at?: string
          description?: string | null
          employees?: string | null
          founded?: number | null
          glassdoor_url?: string | null
          id?: string
          location?: string | null
          logo_url?: string | null
          match_percentage?: string | null
          monthly_salary?: string | null
          rating?: number | null
          reviews?: number | null
          role: string
          transport_time_car?: string | null
          transport_time_public?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          annual_salary?: string | null
          commute_minutes?: number | null
          company?: string
          created_at?: string
          description?: string | null
          employees?: string | null
          founded?: number | null
          glassdoor_url?: string | null
          id?: string
          location?: string | null
          logo_url?: string | null
          match_percentage?: string | null
          monthly_salary?: string | null
          rating?: number | null
          reviews?: number | null
          role?: string
          transport_time_car?: string | null
          transport_time_public?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      talent_acquisition_contacts: {
        Row: {
          created_at: string
          email: string | null
          id: string
          invited: boolean | null
          job_application_id: string
          name: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          invited?: boolean | null
          job_application_id: string
          name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          invited?: boolean | null
          job_application_id?: string
          name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "talent_acquisition_contacts_job_application_id_fkey"
            columns: ["job_application_id"]
            isOneToOne: false
            referencedRelation: "job_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      user_programming_languages: {
        Row: {
          color: string
          created_at: string
          icon: string
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          color: string
          created_at?: string
          icon: string
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string
          created_at?: string
          icon?: string
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          created_at: string
          email: string
          experience: string | null
          id: string
          name: string
          role: string | null
          user_type: string | null
        }
        Insert: {
          created_at?: string
          email: string
          experience?: string | null
          id?: string
          name: string
          role?: string | null
          user_type?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          experience?: string | null
          id?: string
          name?: string
          role?: string | null
          user_type?: string | null
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
