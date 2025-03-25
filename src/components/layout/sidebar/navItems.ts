
import { 
  Home, 
  FileText, 
  Bell, 
  Settings, 
  CheckSquare, 
  AlertTriangle, 
  Layout, 
  FileQuestion,
  ClipboardList,
  BookOpen,
  BarChart2,
  Headphones,
  Users,
  HelpCircle
} from "lucide-react";
import { NavItem } from "./types";

export const getNavItems = (): NavItem[] => [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: Home,
    roles: ["admin", "safety_officer", "worker"]
  },
  {
    title: "Violations",
    path: "/violations",
    icon: AlertTriangle,
    roles: ["admin", "safety_officer", "worker"]
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
    roles: ["admin", "safety_officer", "worker"]
  },
  {
    title: "Risk Assessment",
    path: "/risk-assessment",
    icon: FileQuestion,
    roles: ["admin", "safety_officer"],
    comingSoon: true
  },
  {
    title: "Documents",
    path: "/documents",
    icon: FileText,
    roles: ["admin", "safety_officer"],
    comingSoon: true
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: Bell,
    roles: ["admin", "safety_officer", "worker"],
    comingSoon: true
  },
  {
    title: "Audits",
    path: "/audits",
    icon: ClipboardList,
    roles: ["admin", "safety_officer"],
    comingSoon: true
  },
  {
    title: "Reports",
    path: "/reports",
    icon: BarChart2,
    roles: ["admin", "safety_officer"],
    comingSoon: true
  },
  {
    title: "Training",
    path: "/training",
    icon: BookOpen,
    roles: ["admin", "safety_officer", "worker"],
    comingSoon: true
  },
  {
    title: "Admin",
    path: "/admin",
    icon: Users,
    roles: ["admin"],
    comingSoon: true
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
    roles: ["admin", "safety_officer", "worker"]
  },
  {
    title: "Help & Tour",
    path: "/help",
    icon: HelpCircle,
    roles: ["admin", "safety_officer", "worker"],
    comingSoon: true
  },
  {
    title: "Sidebar Examples",
    path: "/sidebar-examples",
    icon: Layout,
    roles: ["admin", "safety_officer", "worker"]
  }
];
