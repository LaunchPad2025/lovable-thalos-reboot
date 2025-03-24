
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: 'admin' | 'user';
  created_at: string;
}

export interface Violation {
  id: string;
  violation: string; // Changed from 'title' to match the database
  description?: string; // Not in the DB schema, but keeping for backward compatibility
  location?: string;
  detected_at: string; // Changed from 'date' to match the database
  organization_id: string; // Added to match the database
  status?: 'open' | 'in-progress' | 'resolved' | 'pending'; // Not in DB schema directly
  severity: string;
  regulation?: string;
  confidence?: number;
  worksite_id?: string;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  due_date?: string;
  status: 'open' | 'in-progress' | 'completed' | 'overdue' | 'pending';
  assignee_id?: string; // Changed from 'assignee' to match the database
  priority: 'low' | 'medium' | 'high';
  organization_id: string; // Added to match the database
  created_by: string; // Added to match the database
  worksite_id?: string; // Added to match the database
  violation_id?: string; // Added to keep compatibility with existing code
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'canceled' | 'past_due';
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  stripe_price_id: string;
}
