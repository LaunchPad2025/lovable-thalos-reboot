
import { 
  Home, 
  FileText, 
  Bell, 
  Settings, 
  CheckSquare, 
  AlertTriangle, 
  FileQuestion,
  ClipboardList,
  BarChart2,
  BookOpen,
  Users,
  HelpCircle,
  MessageSquare,
  ShieldCheck
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
    roles: ["admin", "safety_officer", "worker"]
  },
  {
    title: "Documents",
    path: "/documents",
    icon: FileText,
    roles: ["admin", "safety_officer", "worker"]
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: Bell,
    roles: ["admin", "safety_officer", "worker"]
  },
  {
    title: "Audits",
    path: "/audits",
    icon: ClipboardList,
    roles: ["admin", "safety_officer", "worker"],
    badge: "Soon"
  },
  {
    title: "Reports",
    path: "/reports",
    icon: BarChart2,
    roles: ["admin", "safety_officer", "worker"],
    badge: "Soon"
  },
  {
    title: "Training",
    path: "/training",
    icon: BookOpen,
    roles: ["admin", "safety_officer", "worker"],
    badge: "Soon"
  },
  {
    title: "Admin",
    path: "/admin",
    icon: ShieldCheck,
    roles: ["admin"],
    badge: "Soon"
  },
  {
    title: "Copilot",
    path: "/chatbot",
    icon: MessageSquare,
    roles: ["admin", "safety_officer", "worker"],
    badge: "AI"
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
    badge: "Soon"
  }
];
