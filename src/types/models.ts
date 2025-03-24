
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
  title: string;
  description: string;
  location: string;
  date: string;
  reported_by: string;
  status: 'open' | 'in-progress' | 'resolved' | 'pending';
  severity: 'low' | 'medium' | 'high' | 'critical';
  assignee: string;
  notes?: string[];
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  status: 'open' | 'in-progress' | 'completed' | 'overdue';
  assignee: string;
  priority: 'low' | 'medium' | 'high';
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
