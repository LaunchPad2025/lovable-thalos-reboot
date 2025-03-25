
import React from "react";
import { NavItem } from "./types";
import { NavItems } from "./NavItems";

interface DesktopNavProps {
  expanded: boolean;
  navItems: NavItem[];
  userRole: string;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  expanded,
  navItems,
  userRole,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 z-10 h-screen border-r border-border bg-sidebar transition-all duration-200 ${
        expanded ? "w-64" : "w-20"
      }`}
    >
      <div className="flex h-16 items-center justify-center border-b border-border px-4">
        <span className={`text-xl font-bold ${!expanded && "sr-only"}`}>
          Thalos
        </span>
      </div>
      <nav className="h-[calc(100vh-4rem)] overflow-y-auto">
        <NavItems navItems={navItems} userRole={userRole} expanded={expanded} />
      </nav>
    </div>
  );
};

export default DesktopNav;
