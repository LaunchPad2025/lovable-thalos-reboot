
import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { NavItem } from "./types";
import { NavItems } from "./NavItems";

interface MobileNavProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  toggleMobileSidebar: () => void;
  navItems: NavItem[];
  userRole: string;
}

const MobileNav: React.FC<MobileNavProps> = ({
  mobileOpen,
  setMobileOpen,
  toggleMobileSidebar,
  navItems,
  userRole,
}) => {
  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileSidebar}
        >
          {mobileOpen ? <X /> : <Menu />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-sidebar border-r border-border">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="text-lg font-semibold">Navigation</h2>
        </div>
        <nav className="py-2">
          <NavItems navItems={navItems} userRole={userRole} expanded={true} />
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
