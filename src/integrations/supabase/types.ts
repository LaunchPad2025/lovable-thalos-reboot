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
      analyses: {
        Row: {
          analysis_data: Json
          created_at: string | null
          file_name: string | null
          file_size: number | null
          file_type: string | null
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          analysis_data: Json
          created_at?: string | null
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          analysis_data?: Json
          created_at?: string | null
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
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
      media_violation_training: {
        Row: {
          category: string
          copilot_response_sample: string | null
          copilot_task_sample: string | null
          created_at: string
          id: string
          industry: string
          labels: string[]
          media_type: string
          regulation_citation: string | null
          regulation_summary: string | null
          remediation_steps: string[]
          risk_level: string
          sample_caption: string
          status: string | null
          tags: string[]
          violation_id: string
          violation_type: string
        }
        Insert: {
          category: string
          copilot_response_sample?: string | null
          copilot_task_sample?: string | null
          created_at?: string
          id?: string
          industry: string
          labels: string[]
          media_type: string
          regulation_citation?: string | null
          regulation_summary?: string | null
          remediation_steps: string[]
          risk_level: string
          sample_caption: string
          status?: string | null
          tags: string[]
          violation_id: string
          violation_type: string
        }
        Update: {
          category?: string
          copilot_response_sample?: string | null
          copilot_task_sample?: string | null
          created_at?: string
          id?: string
          industry?: string
          labels?: string[]
          media_type?: string
          regulation_citation?: string | null
          regulation_summary?: string | null
          remediation_steps?: string[]
          risk_level?: string
          sample_caption?: string
          status?: string | null
          tags?: string[]
          violation_id?: string
          violation_type?: string
        }
        Relationships: []
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
          domain: string | null
          id: string
          industry: string | null
          name: string
          size: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          domain?: string | null
          id?: string
          industry?: string | null
          name: string
          size?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          domain?: string | null
          id?: string
          industry?: string | null
          name?: string
          size?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      paulie_queries: {
        Row: {
          created_at: string | null
          helpful: boolean | null
          id: string
          matched_category: string | null
          matched_keywords: string[] | null
          matched_regulation_id: string | null
          message_id: string | null
          notes: string | null
          question: string
          response: string | null
          review_label: string | null
          review_status: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          helpful?: boolean | null
          id?: string
          matched_category?: string | null
          matched_keywords?: string[] | null
          matched_regulation_id?: string | null
          message_id?: string | null
          notes?: string | null
          question: string
          response?: string | null
          review_label?: string | null
          review_status?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          helpful?: boolean | null
          id?: string
          matched_category?: string | null
          matched_keywords?: string[] | null
          matched_regulation_id?: string | null
          message_id?: string | null
          notes?: string | null
          question?: string
          response?: string | null
          review_label?: string | null
          review_status?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "paulie_queries_matched_regulation_id_fkey"
            columns: ["matched_regulation_id"]
            isOneToOne: false
            referencedRelation: "regulations"
            referencedColumns: ["id"]
          },
        ]
      }
      plan_limits: {
        Row: {
          ai_checks_remaining: number
          ai_checks_total: number
          created_at: string
          id: string
          paulie_messages_remaining: number
          paulie_messages_total: number
          plan_name: string
          reset_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_checks_remaining?: number
          ai_checks_total?: number
          created_at?: string
          id?: string
          paulie_messages_remaining?: number
          paulie_messages_total?: number
          plan_name?: string
          reset_date?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_checks_remaining?: number
          ai_checks_total?: number
          created_at?: string
          id?: string
          paulie_messages_remaining?: number
          paulie_messages_total?: number
          plan_name?: string
          reset_date?: string
          updated_at?: string
          user_id?: string
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
          remaining_questions: number | null
          remaining_uploads: number | null
          role: string
          subscription_tier: string | null
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
          remaining_questions?: number | null
          remaining_uploads?: number | null
          role?: string
          subscription_tier?: string | null
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
          remaining_questions?: number | null
          remaining_uploads?: number | null
          role?: string
          subscription_tier?: string | null
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
      regulation_match_failures: {
        Row: {
          feedback_given: boolean | null
          id: string
          matched_keywords: string[] | null
          notes: string | null
          question: string
          reviewed: boolean | null
          suggested_category: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          feedback_given?: boolean | null
          id?: string
          matched_keywords?: string[] | null
          notes?: string | null
          question: string
          reviewed?: boolean | null
          suggested_category?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          feedback_given?: boolean | null
          id?: string
          matched_keywords?: string[] | null
          notes?: string | null
          question?: string
          reviewed?: boolean | null
          suggested_category?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      regulations: {
        Row: {
          alt_phrases: string[] | null
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
          alt_phrases?: string[] | null
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
          alt_phrases?: string[] | null
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
      usage_events: {
        Row: {
          id: string
          metadata: Json | null
          status: string
          timestamp: string
          type: string
          user_id: string
        }
        Insert: {
          id?: string
          metadata?: Json | null
          status: string
          timestamp?: string
          type: string
          user_id: string
        }
        Update: {
          id?: string
          metadata?: Json | null
          status?: string
          timestamp?: string
          type?: string
          user_id?: string
        }
        Relationships: []
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
      user_usage: {
        Row: {
          id: string
          last_updated: string
          questions_limit: number
          questions_used: number
          reset_date: string
          uploads_limit: number
          uploads_used: number
          user_id: string
        }
        Insert: {
          id?: string
          last_updated?: string
          questions_limit?: number
          questions_used?: number
          reset_date?: string
          uploads_limit?: number
          uploads_used?: number
          user_id: string
        }
        Update: {
          id?: string
          last_updated?: string
          questions_limit?: number
          questions_used?: number
          reset_date?: string
          uploads_limit?: number
          uploads_used?: number
          user_id?: string
        }
        Relationships: []
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
      check_remaining_usage: {
        Args: { p_user_id: string }
        Returns: Json
      }
      deduct_usage: {
        Args: { p_user_id: string; p_usage_type: string }
        Returns: boolean
      }
      get_org_user_role_safe: {
        Args: { org_id: string }
        Returns: string
      }
      get_user_role: {
        Args: { org_id: string }
        Returns: string
      }
      get_user_role_safe: {
        Args: { org_id: string }
        Returns: string
      }
      is_admin_of_org: {
        Args: { org_id: string }
        Returns: boolean
      }
      is_admin_of_org_safe: {
        Args: { org_id: string }
        Returns: boolean
      }
      is_member_of_org: {
        Args: { org_id: string }
        Returns: boolean
      }
      is_member_of_org_safe: {
        Args: { org_id: string }
        Returns: boolean
      }
      is_member_of_organization: {
        Args: { org_id: string }
        Returns: boolean
      }
      is_org_admin_safe: {
        Args: { org_id: string }
        Returns: boolean
      }
      is_org_member_safe: {
        Args: { org_id: string }
        Returns: boolean
      }
      is_organization_admin: {
        Args: { org_id: string }
        Returns: boolean
      }
      is_organization_member: {
        Args: { org_id: string }
        Returns: boolean
      }
      reset_monthly_usage: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_plan_limits_by_tier: {
        Args: { p_user_id: string; p_plan_name: string }
        Returns: boolean
      }
      update_usage_limits: {
        Args: { p_user_id: string; p_subscription_tier: string }
        Returns: boolean
      }
      update_user_usage: {
        Args: {
          p_user_id: string
          p_uploads_used?: number
          p_questions_used?: number
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
