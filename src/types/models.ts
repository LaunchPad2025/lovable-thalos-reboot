
export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  role: string;
}

export interface Organization {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export interface Subscription {
  id: string;
  user_id: string;
  status: string;
  plan_id: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  stripe_subscription_id: string;
  created_at: string;
  analyses_remaining?: number;
  analyses_total?: number;
}

// Add Task interface to fix build errors
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
  assignee_id?: string;
  created_by: string;
  organization_id: string;
  worksite_id?: string;
}

// Add Violation interface to fix build errors
export interface Violation {
  id: string;
  violation: string;
  description?: string;
  severity: string;
  status: string;
  detected_at: string;
  created_at: string;
  location?: string;
  confidence?: number;
  regulation?: string;
  organization_id: string;
  worksite_id?: string;
}
