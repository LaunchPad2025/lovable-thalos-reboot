
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavItem } from "./types";
import { getNavItems } from "./navItems";

interface NavItemsProps {
  navItems: NavItem[];
  userRole: string;
}

export const NavItems: React.FC<NavItemsProps> = ({ navItems, userRole }) => {
  return (
    <ul className="space-y-2 px-3 py-2">
      {navItems
        .filter((item) => item.roles.includes(userRole as any))
        .map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </NavLink>
          </li>
        ))}
    </ul>
  );
};

// Export getNavItems function as well to maintain compatibility
export { getNavItems };
