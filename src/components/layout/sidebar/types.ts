
import { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  path: string;
  icon: LucideIcon;
  roles?: ("admin" | "safety_officer" | "worker")[];
  comingSoon?: boolean;
  badge?: string;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
  roles?: string[];
}
