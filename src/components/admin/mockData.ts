
import { User, Role, Module } from "./types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    department: "Safety",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Manager",
    department: "Operations",
    status: "Active",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "User",
    department: "Construction",
    status: "Inactive",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "User",
    department: "Logistics",
    status: "Active",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Manager",
    department: "Maintenance",
    status: "Active",
  },
];

export const mockRoles: Role[] = [
  {
    name: "Admin",
    description: "Full system access with all permissions",
    users: 3,
  },
  {
    name: "Manager",
    description: "Department oversight with limited admin capabilities",
    users: 5,
  },
  {
    name: "User",
    description: "Basic access for regular system users",
    users: 12,
  },
];

export const mockModules: Module[] = [
  {
    name: "Dashboard",
    permissions: [
      { action: "View", admin: true, manager: true, user: true },
      { action: "Edit", admin: true, manager: false, user: false },
    ],
  },
  {
    name: "Users",
    permissions: [
      { action: "View", admin: true, manager: true, user: false },
      { action: "Create", admin: true, manager: false, user: false },
      { action: "Edit", admin: true, manager: false, user: false },
      { action: "Delete", admin: true, manager: false, user: false },
    ],
  },
  {
    name: "Violations",
    permissions: [
      { action: "View", admin: true, manager: true, user: true },
      { action: "Create", admin: true, manager: true, user: true },
      { action: "Edit", admin: true, manager: true, user: false },
      { action: "Delete", admin: true, manager: false, user: false },
      { action: "Approve", admin: true, manager: true, user: false },
    ],
  },
  {
    name: "Tasks",
    permissions: [
      { action: "View", admin: true, manager: true, user: true },
      { action: "Create", admin: true, manager: true, user: false },
      { action: "Edit", admin: true, manager: true, user: false },
      { action: "Delete", admin: true, manager: true, user: false },
      { action: "Assign", admin: true, manager: true, user: false },
    ],
  },
  {
    name: "Settings",
    permissions: [
      { action: "View", admin: true, manager: true, user: false },
      { action: "Edit", admin: true, manager: false, user: false },
    ],
  },
];
