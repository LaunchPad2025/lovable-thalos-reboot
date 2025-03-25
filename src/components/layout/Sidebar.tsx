
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/useMobile";
import { useTheme } from "@/providers/ThemeProvider";
import {
  LayoutDashboard,
  AlertTriangle,
  ListTodo,
  FileText,
  MessageSquare,
  CreditCard,
  Settings,
  BrainCircuit,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavItem {
  title: string;
  path: string;
  icon: any;
  roles: ("admin" | "user")[];
}

const Sidebar = ({ userRole = "user" }: { userRole?: "admin" | "user" }) => {
  const location = useLocation();
  const isMobile = useMobile();
  const { sidebarCollapsed } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  // The initial state is expanded on desktop, closed on mobile
  const [expanded, setExpanded] = useState(!isMobile && !sidebarCollapsed);

  // Update expanded state when screen size or sidebarCollapsed changes
  useEffect(() => {
    setExpanded(!isMobile && !sidebarCollapsed);
  }, [isMobile, sidebarCollapsed]);

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  // Close mobile sidebar when location changes
  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
  }, [location.pathname]);

  // Items for the sidebar navigation
  const navItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
      roles: ["admin", "user"],
    },
    {
      title: "Violations",
      path: "/violations",
      icon: AlertTriangle,
      roles: ["admin", "user"],
    },
    {
      title: "Tasks",
      path: "/tasks",
      icon: ListTodo,
      roles: ["admin", "user"],
    },
    {
      title: "Regulations",
      path: "/regulations",
      icon: FileText,
      roles: ["admin", "user"],
    },
    {
      title: "ML Models",
      path: "/models",
      icon: BrainCircuit,
      roles: ["admin", "user"],
    },
    {
      title: "AI Assistant",
      path: "/chatbot",
      icon: MessageSquare,
      roles: ["admin", "user"],
    },
    {
      title: "Subscription",
      path: "/subscription",
      icon: CreditCard,
      roles: ["admin"],
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings,
      roles: ["admin", "user"],
    },
  ];

  // Logo component with consistent styling
  const Logo = () => (
    <div className="px-4 py-6 flex flex-col">
      <h1 className="text-2xl font-bold text-foreground">
        Thalos<span className="text-primary text-opacity-80">.</span>
      </h1>
      <p className="text-sm text-muted-foreground">
        powered by Steel Toe
      </p>
    </div>
  );

  // Navigation items component with consistent styling
  const NavItems = () => (
    <ul className="space-y-1 px-2">
      {navItems.map(
        (item) =>
          item.roles.includes(userRole) && (
            <li key={item.title}>
              <Link
                to={item.path}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  location.pathname === item.path
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
                aria-current={location.pathname === item.path ? "page" : undefined}
              >
                <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>{item.title}</span>
              </Link>
            </li>
          )
      )}
    </ul>
  );

  return (
    <>
      {isMobile ? (
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
                  <NavItems />
                </nav>
                <div className="p-4 text-xs text-muted-foreground text-center border-t border-border">
                  © 2025 Thalos
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <aside
          className={cn(
            "bg-sidebar border-r border-border text-sidebar-foreground flex-shrink-0 transition-all duration-300 ease-in-out overflow-y-auto",
            expanded ? "w-64" : "w-0"
          )}
        >
          <div className="flex flex-col h-full">
            <Logo />
            <nav className="flex-1">
              <NavItems />
            </nav>
            <div className="p-4 text-xs text-muted-foreground text-center border-t border-border">
              © 2025 Thalos
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
