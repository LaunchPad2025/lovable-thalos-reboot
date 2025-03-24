
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
      violations: {
        Row: {
          id: string
          title: string
          description: string
          location: string
          date: string
          reported_by: string
          status: 'open' | 'in-progress' | 'resolved' | 'pending'
          severity: 'low' | 'medium' | 'high' | 'critical'
          assignee: string
          notes: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          location: string
          date?: string
          reported_by: string
          status?: 'open' | 'in-progress' | 'resolved' | 'pending'
          severity: 'low' | 'medium' | 'high' | 'critical'
          assignee: string
          notes?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          location?: string
          date?: string
          reported_by?: string
          status?: 'open' | 'in-progress' | 'resolved' | 'pending'
          severity?: 'low' | 'medium' | 'high' | 'critical'
          assignee?: string
          notes?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string
          due_date: string
          status: 'open' | 'in-progress' | 'completed' | 'overdue'
          assignee: string
          priority: 'low' | 'medium' | 'high'
          violation_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          due_date: string
          status?: 'open' | 'in-progress' | 'completed' | 'overdue'
          assignee: string
          priority?: 'low' | 'medium' | 'high'
          violation_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          due_date?: string
          status?: 'open' | 'in-progress' | 'completed' | 'overdue'
          assignee?: string
          priority?: 'low' | 'medium' | 'high'
          violation_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
