
import {
  LayoutDashboard,
  AlertTriangle,
  ListTodo,
  FileText,
  MessageSquare,
  CreditCard,
  Settings,
  BrainCircuit,
  Users,
  Building,
  Gauge
} from "lucide-react";
import { NavItem } from "./types";

export const getNavItems = (): NavItem[] => {
  return [
    {
      title: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
      roles: ["admin", "safety_officer", "worker"],
    },
    {
      title: "Violations",
      path: "/violations",
      icon: AlertTriangle,
      roles: ["admin", "safety_officer", "worker"],
    },
    {
      title: "Tasks",
      path: "/tasks",
      icon: ListTodo,
      roles: ["admin", "safety_officer", "worker"],
    },
    {
      title: "Regulations",
      path: "/regulations",
      icon: FileText,
      roles: ["admin", "safety_officer", "worker"],
    },
    {
      title: "ML Models",
      path: "/models",
      icon: BrainCircuit,
      roles: ["admin", "safety_officer"],
    },
    {
      title: "AI Assistant",
      path: "/chatbot",
      icon: MessageSquare,
      roles: ["admin", "safety_officer", "worker"],
    },
    {
      title: "Team Members",
      path: "/team",
      icon: Users,
      roles: ["admin", "safety_officer"],
    },
    {
      title: "Organizations",
      path: "/organizations",
      icon: Building,
      roles: ["admin"],
    },
    {
      title: "Analytics",
      path: "/analytics",
      icon: Gauge,
      roles: ["admin", "safety_officer"],
    },
    {
      title: "Subscription",
      path: "/subscription",
      icon: CreditCard,
      roles: ["admin"],
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings,
      roles: ["admin", "safety_officer", "worker"],
    },
  ];
};
