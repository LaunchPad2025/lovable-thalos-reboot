
import { Home, FileText, Bell, Settings, CheckSquare, AlertTriangle, Layout } from "lucide-react";
import { NavItem } from "./types";

export const getNavItems = (): NavItem[] => [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: Home,
    roles: ["admin", "safety_officer", "worker"]
  },
  {
    title: "Regulations",
    path: "/regulations",
    icon: FileText,
    roles: ["admin", "safety_officer"]
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
    roles: ["admin", "safety_officer", "worker"]
  },
  {
    title: "Violations",
    path: "/violations",
    icon: AlertTriangle,
    roles: ["admin", "safety_officer"]
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: Bell,
    roles: ["admin", "safety_officer", "worker"],
    comingSoon: true
  },
  {
    title: "Sidebar Examples",
    path: "/sidebar-examples",
    icon: Layout,
    roles: ["admin", "safety_officer", "worker"]
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
    roles: ["admin", "safety_officer", "worker"]
  }
];
