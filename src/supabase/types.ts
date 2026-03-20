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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      check_ins: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      client_categories: {
        Row: {
          backsplash: string
          blurb: string | null
          capabilities: string | null
          id: number
          link_description: string | null
          link_text: string | null
          name: string | null
          order: number | null
          slug: string | null
          tagline: string | null
          work_category_id: number | null
        }
        Insert: {
          backsplash?: string
          blurb?: string | null
          capabilities?: string | null
          id?: number
          link_description?: string | null
          link_text?: string | null
          name?: string | null
          order?: number | null
          slug?: string | null
          tagline?: string | null
          work_category_id?: number | null
        }
        Update: {
          backsplash?: string
          blurb?: string | null
          capabilities?: string | null
          id?: number
          link_description?: string | null
          link_text?: string | null
          name?: string | null
          order?: number | null
          slug?: string | null
          tagline?: string | null
          work_category_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "client_categories_work_category_id_fkey"
            columns: ["work_category_id"]
            isOneToOne: false
            referencedRelation: "work_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          category: number | null
          id: string
          img: string | null
          name: string
          order: number | null
          project_description: string | null
          project_name: string | null
        }
        Insert: {
          category?: number | null
          id?: string
          img?: string | null
          name: string
          order?: number | null
          project_description?: string | null
          project_name?: string | null
        }
        Update: {
          category?: number | null
          id?: string
          img?: string | null
          name?: string
          order?: number | null
          project_description?: string | null
          project_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "client_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          bio: string | null
          id: number
          img: string | null
          linkedin: string | null
          name: string | null
          order: number | null
          title: string | null
        }
        Insert: {
          bio?: string | null
          id?: number
          img?: string | null
          linkedin?: string | null
          name?: string | null
          order?: number | null
          title?: string | null
        }
        Update: {
          bio?: string | null
          id?: number
          img?: string | null
          linkedin?: string | null
          name?: string | null
          order?: number | null
          title?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          boost: boolean
          category: string | null
          date: string | null
          description: string | null
          id: number
          location: string | null
          show: boolean
          title: string | null
          youtube_embed_link: string | null
          youtube_watch_link: string | null
        }
        Insert: {
          boost?: boolean
          category?: string | null
          date?: string | null
          description?: string | null
          id?: number
          location?: string | null
          show?: boolean
          title?: string | null
          youtube_embed_link?: string | null
          youtube_watch_link?: string | null
        }
        Update: {
          boost?: boolean
          category?: string | null
          date?: string | null
          description?: string | null
          id?: number
          location?: string | null
          show?: boolean
          title?: string | null
          youtube_embed_link?: string | null
          youtube_watch_link?: string | null
        }
        Relationships: []
      }
      external_links: {
        Row: {
          description: string
          name: string
          url: string
        }
        Insert: {
          description: string
          name: string
          url: string
        }
        Update: {
          description?: string
          name?: string
          url?: string
        }
        Relationships: []
      }
      featured_clients: {
        Row: {
          client_id: string
          description: string | null
          img: string | null
          order: number | null
        }
        Insert: {
          client_id: string
          description?: string | null
          img?: string | null
          order?: number | null
        }
        Update: {
          client_id?: string
          description?: string | null
          img?: string | null
          order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "featured_clients_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: true
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      inbox: {
        Row: {
          created_at: string
          email: string | null
          id: string
          message: string | null
          name: string | null
          purpose: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name?: string | null
          purpose?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name?: string | null
          purpose?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          application: string | null
          company: string | null
          company_link: string | null
          created_at: string
          deadline: string | null
          description: string | null
          description_short: string | null
          id: string
          is_telea: boolean | null
          location: string | null
          title: string | null
          type: string | null
        }
        Insert: {
          application?: string | null
          company?: string | null
          company_link?: string | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          description_short?: string | null
          id?: string
          is_telea?: boolean | null
          location?: string | null
          title?: string | null
          type?: string | null
        }
        Update: {
          application?: string | null
          company?: string | null
          company_link?: string | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          description_short?: string | null
          id?: string
          is_telea?: boolean | null
          location?: string | null
          title?: string | null
          type?: string | null
        }
        Relationships: []
      }
      special_images: {
        Row: {
          caption: string | null
          description: string | null
          display_location: string | null
          name: string
          url: string
        }
        Insert: {
          caption?: string | null
          description?: string | null
          display_location?: string | null
          name: string
          url: string
        }
        Update: {
          caption?: string | null
          description?: string | null
          display_location?: string | null
          name?: string
          url?: string
        }
        Relationships: []
      }
      work_categories: {
        Row: {
          backsplash: string
          description: string | null
          footer_body: string | null
          footer_title: string | null
          id: number
          img: string | null
          landing_page_description: string | null
          landing_page_link_text: string | null
          name: string | null
          order: number | null
          services_body: string | null
          services_title: string | null
          slug: string
          tagline: string | null
        }
        Insert: {
          backsplash?: string
          description?: string | null
          footer_body?: string | null
          footer_title?: string | null
          id?: number
          img?: string | null
          landing_page_description?: string | null
          landing_page_link_text?: string | null
          name?: string | null
          order?: number | null
          services_body?: string | null
          services_title?: string | null
          slug: string
          tagline?: string | null
        }
        Update: {
          backsplash?: string
          description?: string | null
          footer_body?: string | null
          footer_title?: string | null
          id?: number
          img?: string | null
          landing_page_description?: string | null
          landing_page_link_text?: string | null
          name?: string | null
          order?: number | null
          services_body?: string | null
          services_title?: string | null
          slug?: string
          tagline?: string | null
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
