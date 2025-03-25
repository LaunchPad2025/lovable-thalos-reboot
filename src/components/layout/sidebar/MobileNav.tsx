
import React from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import NavItems from "./NavItems";
import { NavItem } from "./types";

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
    <div className="fixed top-4 left-4 z-50">
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleMobileSidebar}
            className="rounded-full shadow-md"
            aria-label="Open menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </SheetTrigger>
        <SheetContent
          className="w-[280px] p-0 bg-sidebar border-r border-border"
          side="left"
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
