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
  description?: string; 
  location?: string;
  detected_at: string;
  organization_id: string;
  status?: 'open' | 'in-progress' | 'resolved' | 'pending';
  severity: 'low' | 'medium' | 'high' | 'critical'; // Updated type
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
  dueDate?: string; // Added for formatted display
  status: 'open' | 'in-progress' | 'completed' | 'overdue' | 'pending';
  assignee_id?: string;
  assignee?: string; // Added for formatted display
  priority: 'low' | 'medium' | 'high';
  organization_id: string;
  created_by: string;
  worksite_id?: string;
  violation_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'canceled' | 'past_due';
  current_period_end: string;
  current_period_start?: string;
  cancel_at_period_end: boolean;
  created_at: string;
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
  updated_at?: string;
  organization_id?: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  stripe_price_id: {
    monthly: string;
    annual: string;
  };
  popular?: boolean;
}
