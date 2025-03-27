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
      documents: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          expiration_date: string | null
          id: string
          is_required: boolean | null
          name: string
          organization_id: string
          owner_id: string
          size: string
          storage_path: string
          tags: string[] | null
          type: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          expiration_date?: string | null
          id?: string
          is_required?: boolean | null
          name: string
          organization_id: string
          owner_id: string
          size: string
          storage_path: string
          tags?: string[] | null
          type: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          expiration_date?: string | null
          id?: string
          is_required?: boolean | null
          name?: string
          organization_id?: string
          owner_id?: string
          size?: string
          storage_path?: string
          tags?: string[] | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ml_models: {
        Row: {
          accuracy: number | null
          active: boolean | null
          created_at: string | null
          description: string | null
          id: string
          industry: string
          model_type: string
          name: string
          updated_at: string | null
          version: string
        }
        Insert: {
          accuracy?: number | null
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          industry: string
          model_type: string
          name: string
          updated_at?: string | null
          version: string
        }
        Update: {
          accuracy?: number | null
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          industry?: string
          model_type?: string
          name?: string
          updated_at?: string | null
          version?: string
        }
        Relationships: []
      }
      organization_members: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          industry: string | null
          name: string
          size: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          industry?: string | null
          name: string
          size?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          industry?: string | null
          name?: string
          size?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company: string | null
          created_at: string
          department: string | null
          email: string | null
          id: string
          industry: string | null
          name: string | null
          role: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          department?: string | null
          email?: string | null
          id: string
          industry?: string | null
          name?: string | null
          role?: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          department?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          name?: string | null
          role?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      regulation_amendments: {
        Row: {
          amendment_date: string
          amendment_description: string
          created_at: string | null
          id: string
          previous_version: string | null
          regulation_id: string
        }
        Insert: {
          amendment_date: string
          amendment_description: string
          created_at?: string | null
          id?: string
          previous_version?: string | null
          regulation_id: string
        }
        Update: {
          amendment_date?: string
          amendment_description?: string
          created_at?: string | null
          id?: string
          previous_version?: string | null
          regulation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "regulation_amendments_regulation_id_fkey"
            columns: ["regulation_id"]
            isOneToOne: false
            referencedRelation: "regulations"
            referencedColumns: ["id"]
          },
        ]
      }
      regulation_citations: {
        Row: {
          citation_context: string | null
          cited_regulation_id: string
          created_at: string | null
          id: string
          source_regulation_id: string
        }
        Insert: {
          citation_context?: string | null
          cited_regulation_id: string
          created_at?: string | null
          id?: string
          source_regulation_id: string
        }
        Update: {
          citation_context?: string | null
          cited_regulation_id?: string
          created_at?: string | null
          id?: string
          source_regulation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "regulation_citations_cited_regulation_id_fkey"
            columns: ["cited_regulation_id"]
            isOneToOne: false
            referencedRelation: "regulations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "regulation_citations_source_regulation_id_fkey"
            columns: ["source_regulation_id"]
            isOneToOne: false
            referencedRelation: "regulations"
            referencedColumns: ["id"]
          },
        ]
      }
      regulations: {
        Row: {
          applicable_to: string[] | null
          authority: string | null
          category: string | null
          created_at: string | null
          description: string | null
          document_type: string
          effective_date: string | null
          file_path: string | null
          file_size: number | null
          file_type: string | null
          id: string
          industry: string | null
          industry_group: string | null
          jurisdiction: string | null
          keywords: string[] | null
          last_reviewed_date: string | null
          search_text: unknown | null
          severity_level: string | null
          source_url: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          version: string | null
        }
        Insert: {
          applicable_to?: string[] | null
          authority?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          document_type: string
          effective_date?: string | null
          file_path?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          industry?: string | null
          industry_group?: string | null
          jurisdiction?: string | null
          keywords?: string[] | null
          last_reviewed_date?: string | null
          search_text?: unknown | null
          severity_level?: string | null
          source_url?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          applicable_to?: string[] | null
          authority?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          document_type?: string
          effective_date?: string | null
          file_path?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          industry?: string | null
          industry_group?: string | null
          jurisdiction?: string | null
          keywords?: string[] | null
          last_reviewed_date?: string | null
          search_text?: unknown | null
          severity_level?: string | null
          source_url?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          version?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          organization_id: string | null
          plan_id: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          organization_id?: string | null
          plan_id: string
          status: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          organization_id?: string | null
          plan_id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      task_relationships: {
        Row: {
          child_task_id: string
          created_at: string
          created_by: string | null
          id: string
          parent_task_id: string
          relationship_type: string
        }
        Insert: {
          child_task_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          parent_task_id: string
          relationship_type?: string
        }
        Update: {
          child_task_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          parent_task_id?: string
          relationship_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_relationships_child_task_id_fkey"
            columns: ["child_task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_relationships_parent_task_id_fkey"
            columns: ["parent_task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assignee_id: string | null
          created_at: string
          created_by: string
          description: string | null
          due_date: string | null
          id: string
          organization_id: string
          priority: string
          status: string
          title: string
          updated_at: string
          worksite_id: string | null
        }
        Insert: {
          assignee_id?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          due_date?: string | null
          id?: string
          organization_id: string
          priority?: string
          status?: string
          title: string
          updated_at?: string
          worksite_id?: string | null
        }
        Update: {
          assignee_id?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          due_date?: string | null
          id?: string
          organization_id?: string
          priority?: string
          status?: string
          title?: string
          updated_at?: string
          worksite_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_task_worksite"
            columns: ["worksite_id"]
            isOneToOne: false
            referencedRelation: "worksites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_invitations: {
        Row: {
          created_at: string
          department: string | null
          email: string
          expires_at: string
          id: string
          invited_by: string
          organization_id: string | null
          role: string
          status: string
          token: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          email: string
          expires_at?: string
          id?: string
          invited_by: string
          organization_id?: string | null
          role: string
          status?: string
          token?: string
        }
        Update: {
          created_at?: string
          department?: string | null
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string
          organization_id?: string | null
          role?: string
          status?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_invitations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      violation_regulations: {
        Row: {
          created_at: string | null
          id: string
          regulation_id: string
          relevance_score: number | null
          violation_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          regulation_id: string
          relevance_score?: number | null
          violation_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          regulation_id?: string
          relevance_score?: number | null
          violation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "violation_regulations_regulation_id_fkey"
            columns: ["regulation_id"]
            isOneToOne: false
            referencedRelation: "regulations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "violation_regulations_violation_id_fkey"
            columns: ["violation_id"]
            isOneToOne: false
            referencedRelation: "violations"
            referencedColumns: ["id"]
          },
        ]
      }
      violation_tasks: {
        Row: {
          created_at: string
          task_id: string
          violation_id: string
        }
        Insert: {
          created_at?: string
          task_id: string
          violation_id: string
        }
        Update: {
          created_at?: string
          task_id?: string
          violation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "violation_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "violation_tasks_violation_id_fkey"
            columns: ["violation_id"]
            isOneToOne: false
            referencedRelation: "violations"
            referencedColumns: ["id"]
          },
        ]
      }
      violations: {
        Row: {
          confidence: number | null
          created_at: string
          description: string | null
          detected_at: string
          id: string
          location: string | null
          organization_id: string
          regulation: string | null
          severity: string
          status: string | null
          violation: string
          worksite_id: string | null
        }
        Insert: {
          confidence?: number | null
          created_at?: string
          description?: string | null
          detected_at?: string
          id?: string
          location?: string | null
          organization_id: string
          regulation?: string | null
          severity: string
          status?: string | null
          violation: string
          worksite_id?: string | null
        }
        Update: {
          confidence?: number | null
          created_at?: string
          description?: string | null
          detected_at?: string
          id?: string
          location?: string | null
          organization_id?: string
          regulation?: string | null
          severity?: string
          status?: string | null
          violation?: string
          worksite_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "violations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "violations_worksite_id_fkey"
            columns: ["worksite_id"]
            isOneToOne: false
            referencedRelation: "worksites"
            referencedColumns: ["id"]
          },
        ]
      }
      worksites: {
        Row: {
          created_at: string
          id: string
          location: string | null
          name: string
          organization_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          location?: string | null
          name: string
          organization_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          location?: string | null
          name?: string
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "worksites_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: {
          org_id: string
        }
        Returns: string
      }
      is_organization_admin: {
        Args: {
          org_id: string
        }
        Returns: boolean
      }
      is_organization_member: {
        Args: {
          org_id: string
        }
        Returns: boolean
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
