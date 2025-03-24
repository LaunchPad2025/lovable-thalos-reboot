
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/useMobile";
import {
  LayoutDashboard,
  AlertTriangle,
  ListTodo,
  FileText,
  MessageSquare,
  CreditCard,
  Settings,
  BrainCircuit,
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
  const [mobileOpen, setMobileOpen] = useState(false);

  // The initial state is expanded on desktop, closed on mobile
  const [expanded, setExpanded] = useState(!isMobile);

  // Update expanded state when screen size changes
  useEffect(() => {
    setExpanded(!isMobile);
  }, [isMobile]);

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

  return (
    <>
      {isMobile ? (
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" onClick={toggleMobileSidebar}>
              Open Menu
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-full sm:w-64 bg-sidebar text-sidebar-foreground"
            side="left"
          >
            <div className="flex flex-col h-full">
              <div className="px-4 py-6">
                <h1 className="text-2xl font-bold">Thalos</h1>
                <p className="text-sm text-gray-400">
                  powered by Steel Toe
                </p>
              </div>
              <nav className="flex-1">
                <ul className="space-y-1 px-2">
                  {navItems.map(
                    (item) =>
                      item.roles.includes(userRole) && (
                        <li key={item.title}>
                          <Link
                            to={item.path}
                            className={cn(
                              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                              location.pathname === item.path
                                ? "bg-accent text-accent-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      )
                  )}
                </ul>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <aside
          className={cn(
            "bg-sidebar text-sidebar-foreground w-64 flex-shrink-0 transition-all duration-300 ease-in-out",
            expanded ? "block" : "hidden"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="px-4 py-6">
              <h1 className="text-2xl font-bold">Thalos</h1>
              <p className="text-sm text-gray-400">
                powered by Steel Toe
              </p>
            </div>
            <nav className="flex-1">
              <ul className="space-y-1 px-2">
                {navItems.map(
                  (item) =>
                    item.roles.includes(userRole) && (
                      <li key={item.title}>
                        <Link
                          to={item.path}
                          className={cn(
                            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                            location.pathname === item.path
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground"
                          )}
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    )
                )}
              </ul>
            </nav>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
