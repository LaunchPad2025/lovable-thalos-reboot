import {
  Home,
  LayoutDashboard,
  Users,
  ShieldAlert,
  MessageSquare,
  ListChecks,
  FileText,
  Calendar,
  Settings,
  Book,
  AlertTriangle,
  TrendingUp,
  Package,
  HelpCircle,
  BarChart2,
  PieChart,
  ShieldCheck,
  File,
  MessageSquarePlus
} from "lucide-react";

export const navItems = [
  {
    title: "Main",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        description: "Get an overview of your account",
      },
    ],
  },
  {
    title: "AI",
    items: [
      {
        title: "AI Assistant",
        href: "/chatbot",
        icon: MessageSquarePlus,
        description: "Interact with the AI assistant",
      },
    ],
  },
  {
    title: "Safety",
    items: [
      {
        title: "Violations",
        href: "/violations",
        icon: ShieldAlert,
        description: "Manage safety violations",
      },
      {
        title: "Tasks",
        href: "/tasks",
        icon: ListChecks,
        description: "Manage safety tasks",
      },
      {
        title: "Regulations",
        href: "/regulations",
        icon: Book,
        description: "View safety regulations",
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        title: "Documents",
        href: "/docs",
        icon: FileText,
        description: "Manage documents",
      },
      {
        title: "Audits",
        href: "/audits",
        icon: AlertTriangle,
        description: "Manage audits",
      },
      {
        title: "Training",
        href: "/training",
        icon: Calendar,
        description: "Manage training",
      },
    ],
  },
  {
    title: "Admin",
    items: [
      {
        title: "Users",
        href: "/admin",
        icon: Users,
        description: "Manage users",
      },
      {
        title: "Models",
        href: "/models",
        icon: Package,
        description: "Manage models",
      },
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
        description: "Manage settings",
      },
    ],
  },
  {
    title: "Reports",
    icon: "bar-chart-2",
    href: "",
    items: [
      {
        title: "Analytics",
        href: "/coming-soon?feature=Analytics",
        icon: "pie-chart"
      },
      {
        title: "Compliance",
        href: "/coming-soon?feature=Compliance+Reports",
        icon: "shield-check"
      },
      {
        title: "Export",
        href: "/coming-soon?feature=Report+Export",
        icon: "file-text"
      },
      {
        title: "Paulie Feedback",
        href: "/feedback",
        icon: "message-square"
      }
    ]
  },
  {
    title: "Subscription",
    items: [
      {
        title: "Subscription",
        href: "/subscription",
        icon: TrendingUp,
        description: "Manage subscription",
      },
    ],
  },
  {
    title: "Help",
    items: [
      {
        title: "Documentation",
        href: "/documentation",
        icon: HelpCircle,
        description: "View documentation",
      },
    ],
  },
];

export type NavItem = (typeof navItems)[0];
