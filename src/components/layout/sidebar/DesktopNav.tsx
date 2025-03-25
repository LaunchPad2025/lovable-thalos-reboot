
import React from "react";
import { NavItem } from "./types";
import { NavItems } from "./NavItems";
import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DesktopNavProps {
  expanded: boolean;
  toggleSidebar: () => void;
  navItems: NavItem[];
  userRole: string;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  expanded,
  toggleSidebar,
  navItems,
  userRole,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 z-10 h-screen border-r border-border bg-sidebar transition-all duration-200 ${
        expanded ? "w-64" : "w-20"
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        <span className={`text-xl font-bold ${!expanded && "sr-only"}`}>
          Thalos
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleSidebar} 
          className="h-8 w-8 p-0"
        >
          <PanelLeft className={cn("h-4 w-4", !expanded && "rotate-180")} />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      <nav className="h-[calc(100vh-4rem)] overflow-y-auto">
        <NavItems navItems={navItems} userRole={userRole} expanded={expanded} />
      </nav>
    </div>
  );
};

export default DesktopNav;
