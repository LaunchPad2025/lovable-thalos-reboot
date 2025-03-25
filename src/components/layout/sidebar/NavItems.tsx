
import React from "react";
import { NavLink } from "react-router-dom";
import { NavItem } from "./types";

interface NavItemsProps {
  navItems: NavItem[];
  userRole: string;
  expanded?: boolean;
}

export const NavItems: React.FC<NavItemsProps> = ({ navItems, userRole, expanded = true }) => {
  return (
    <ul className="space-y-1">
      {navItems.map((item) => {
        const isDisabled = item.roles && !item.roles.includes(userRole as "admin" | "safety_officer" | "worker");
        const isComingSoon = item.comingSoon || item.badge === "Soon";

        return (
          <li key={item.path}>
            <NavLink
              to={isDisabled || isComingSoon ? "#" : item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm transition-colors rounded-md ${
                  isActive ? "bg-sidebar-active" : ""
                } ${
                  isDisabled || isComingSoon
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-sidebar-hover"
                }`
              }
              onClick={(e) => {
                if (isDisabled || isComingSoon) {
                  e.preventDefault();
                }
              }}
            >
              {item.icon && (
                <item.icon className="w-5 h-5 mr-3 text-sidebar-icon" />
              )}
              {expanded && <span>{item.title}</span>}
              {isComingSoon && expanded && (
                <span className="ml-2 text-xs px-1.5 py-0.5 bg-purple-900/30 text-purple-300 border border-purple-800 rounded-md">
                  Soon
                </span>
              )}
              {item.badge && item.badge !== "Soon" && expanded && (
                <span className="ml-auto text-xs px-1.5 py-0.5 bg-blue-600 text-white rounded-md">
                  {item.badge}
                </span>
              )}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
