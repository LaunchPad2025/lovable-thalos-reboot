
import React from "react";
import { NavItem } from "./types";
import { NavItems } from "./NavItems";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DesktopNavProps {
  expanded: boolean;
  navItems: NavItem[];
  userRole: string;
  toggleExpanded: () => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  expanded,
  navItems,
  userRole,
  toggleExpanded,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 z-40 h-screen border-r border-border bg-sidebar transition-all duration-200 ${
        expanded ? "w-64" : "w-20"
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        <span className={`text-xl font-bold ${!expanded && "sr-only"}`}>
          Thalos
        </span>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleExpanded}
          className="ml-auto"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Button>
      </div>
      <nav className="h-[calc(100vh-4rem)] overflow-y-auto">
        <NavItems navItems={navItems} userRole={userRole} expanded={expanded} />
      </nav>
    </div>
  );
};

export default DesktopNav;
