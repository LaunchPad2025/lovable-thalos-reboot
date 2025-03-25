
import React from "react";
import { NavLink } from "react-router-dom";
import { NavItem } from "./types";

interface NavItemsProps {
  navItems: NavItem[];
  userRole: string;
}

export const NavItems: React.FC<NavItemsProps> = ({ navItems, userRole }) => {
  return (
    <ul className="space-y-1">
      {navItems.map((item) => {
        const isDisabled = item.roles && !item.roles.includes(userRole);
        const isComingSoon = item.comingSoon;

        return (
          <li key={item.href}>
            <NavLink
              to={isDisabled || isComingSoon ? "#" : item.href}
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
              <span>{item.label}</span>
              {isComingSoon && (
                <span className="ml-2 text-xs px-1.5 py-0.5 bg-purple-900/30 text-purple-300 border border-purple-800 rounded-md">
                  Soon
                </span>
              )}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
