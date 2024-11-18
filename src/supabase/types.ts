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
          project_description: string | null
          project_name: string | null
        }
        Insert: {
          category?: number | null
          id?: string
          img?: string | null
          name: string
          project_description?: string | null
          project_name?: string | null
        }
        Update: {
          category?: number | null
          id?: string
          img?: string | null
          name?: string
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
          id: number
          img: string | null
          name: string | null
          order: number | null
          slug: string
          tagline: string | null
        }
        Insert: {
          backsplash?: string
          description?: string | null
          id?: number
          img?: string | null
          name?: string | null
          order?: number | null
          slug: string
          tagline?: string | null
        }
        Update: {
          backsplash?: string
          description?: string | null
          id?: number
          img?: string | null
          name?: string | null
          order?: number | null
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
