
import {
  BarChart3,
  Bell,
  Clipboard,
  Cog,
  FileText,
  Home,
  Layout,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  SquareCode,
  Triangle,
  Users,
  Wand2,
  FileBarChart,
  ThumbsUp
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
  roles?: string[]; // Roles that can see this item
}

export interface NavSection {
  title?: string;
  items: NavItem[];
  roles?: string[]; // Roles that can see this section
}

export const navItems: NavSection[] = [
  {
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: Home,
      },
      {
        title: "Chatbot",
        href: "/chatbot",
        icon: MessageSquare,
        badge: "AI",
        badgeColor: "bg-purple-500/20 text-purple-500",
      },
    ],
  },
  {
    title: "Compliance",
    items: [
      {
        title: "Violations",
        href: "/violations",
        icon: Triangle,
      },
      {
        title: "Tasks",
        href: "/tasks",
        icon: Clipboard,
      },
      {
        title: "Regulations",
        href: "/regulations",
        icon: ShieldCheck,
      },
      {
        title: "Documents",
        href: "/docs",
        icon: FileText,
      },
      {
        title: "Audits",
        href: "/audits",
        icon: BarChart3,
      },
      {
        title: "Risk Assessment",
        href: "/risk-assessment",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Learning",
    items: [
      {
        title: "Training",
        href: "/training",
        icon: Wand2,
      },
    ],
  },
  {
    title: "AI Tools",
    items: [
      {
        title: "Models",
        href: "/models",
        icon: Sparkles,
      },
      {
        title: "Feedback",
        href: "/feedback",
        icon: ThumbsUp,
        roles: ["admin"],
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Notifications",
        href: "/notifications",
        icon: Bell,
        badge: "3",
        badgeColor: "bg-red-500/20 text-red-500",
      },
      {
        title: "Settings",
        href: "/settings",
        icon: Cog,
      },
      {
        title: "Subscription",
        href: "/subscription",
        icon: FileBarChart,
        roles: ["admin", "owner"],
      },
      {
        title: "Admin",
        href: "/admin",
        icon: Users,
        roles: ["admin", "owner"],
      },
    ],
  },
  {
    title: "Demo",
    items: [
      {
        title: "Demo Dashboard",
        href: "/demo",
        icon: Layout,
      },
      {
        title: "Sidebar Examples",
        href: "/sidebar-examples",
        icon: SquareCode,
      },
    ],
  },
];

export const getNavItems = () => {
  return navItems;
};
