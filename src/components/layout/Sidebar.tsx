import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMobile } from "@/hooks/useMobile";
import { useTheme } from "@/providers/ThemeProvider";
import { useAuth } from "@/context/auth";
import { getNavItems } from "./sidebar/navItems";
import MobileNav from "./sidebar/MobileNav";
import DesktopNav from "./sidebar/DesktopNav";

const Sidebar = () => {
  const location = useLocation();
  const isMobile = useMobile();
  const { sidebarCollapsed, setSidebarCollapsed } = useTheme();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Get user role from auth context
  const userRole = user?.user_metadata?.role || "worker";

  // The initial state is expanded on desktop, closed on mobile
  // Force it to be expanded for now to ensure sidebar visibility
  const [expanded, setExpanded] = useState(true);

  // Update expanded state when screen size changes, but keep it expanded by default
  useEffect(() => {
    if (!isMobile) {
      setExpanded(true);
      if (setSidebarCollapsed) {
        setSidebarCollapsed(false);
      }
    }
  }, [isMobile, setSidebarCollapsed]);

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
    if (setSidebarCollapsed) {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  // Close mobile sidebar when location changes
  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
  }, [location.pathname]);

  // Get navigation items
  const navItems = getNavItems();

  return (
    <>
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
          navItems={navItems}
          userRole={userRole}
          toggleExpanded={toggleExpanded}
        />
      )}
    </>
  );
};

export default Sidebar;
