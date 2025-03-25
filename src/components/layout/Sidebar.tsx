
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMobile } from "@/hooks/useMobile";
import { useTheme } from "@/providers/ThemeProvider";
import { useAuth } from "@/context/AuthContext";
import { getNavItems } from "./sidebar/navItems";
import MobileNav from "./sidebar/MobileNav";
import DesktopNav from "./sidebar/DesktopNav";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { PanelLeft } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const isMobile = useMobile();
  const { sidebarCollapsed, setSidebarCollapsed } = useTheme();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Get user role from auth context
  const userRole = user?.user_metadata?.role || "worker";

  // The initial state is expanded on desktop, closed on mobile
  const [expanded, setExpanded] = useState(!isMobile && !sidebarCollapsed);

  // Update expanded state when screen size or sidebarCollapsed changes
  useEffect(() => {
    setExpanded(!isMobile && !sidebarCollapsed);
  }, [isMobile, sidebarCollapsed]);

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    setExpanded(!expanded);
  };

  // Close mobile sidebar when location changes
  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
  }, [location.pathname]);

  // Get navigation items
  const navItems = getNavItems();

  return (
    <SidebarProvider defaultOpen={!sidebarCollapsed}>
      {isMobile ? (
        <MobileNav
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          toggleMobileSidebar={toggleMobileSidebar}
          navItems={navItems}
          userRole={userRole}
        />
      ) : (
        <DesktopNav
          expanded={expanded}
          toggleSidebar={toggleSidebar}
          navItems={navItems}
          userRole={userRole}
        />
      )}
    </SidebarProvider>
  );
};

export default Sidebar;
