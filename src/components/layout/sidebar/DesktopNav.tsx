
import React from "react";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { NavItems } from "./NavItems";
import { NavItem } from "./types";

interface DesktopNavProps {
  expanded: boolean;
  navItems: NavItem[];
  userRole: string;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ expanded, navItems, userRole }) => {
  return (
    <aside
      className={cn(
        "bg-sidebar border-r border-border text-sidebar-foreground flex-shrink-0 transition-all duration-300 ease-in-out overflow-y-auto",
        expanded ? "w-64" : "w-0"
      )}
    >
      <div className="flex flex-col h-full">
        <Logo />
        <nav className="flex-1">
          <NavItems navItems={navItems} userRole={userRole} />
        </nav>
        <div className="p-4 text-xs text-muted-foreground text-center border-t border-border">
          © 2025 Thalos - powered by Steel Toe
        </div>
      </div>
    </aside>
  );
};

export default DesktopNav;
