
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'User';
  department: string;
  status: 'Active' | 'Inactive';
}

export interface Role {
  name: string;
  description: string;
  users: number;
}

export interface Permission {
  action: string;
  admin: boolean;
  manager: boolean;
  user: boolean;
}

export interface Module {
  name: string;
  permissions: Permission[];
}
