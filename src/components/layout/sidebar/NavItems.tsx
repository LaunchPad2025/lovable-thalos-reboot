
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavItem } from "./types";

interface NavItemsProps {
  navItems: NavItem[];
  userRole: string;
}

const NavItems: React.FC<NavItemsProps> = ({ navItems, userRole }) => {
  const location = useLocation();

  return (
    <ul className="space-y-1 px-2">
      {navItems.map(
        (item) =>
          item.roles.includes(userRole as any) && (
            <li key={item.title}>
              <Link
                to={item.path}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  location.pathname === item.path
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
                aria-current={location.pathname === item.path ? "page" : undefined}
              >
                <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>{item.title}</span>
              </Link>
            </li>
          )
      )}
    </ul>
  );
};

export default NavItems;
