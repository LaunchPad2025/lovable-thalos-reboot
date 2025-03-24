
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, Home, AlertTriangle, ClipboardList, MessageSquare, CreditCard, Settings, BarChart2, HelpCircle, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  adminOnly?: boolean;
};

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Violations', href: '/violations', icon: AlertTriangle },
  { name: 'Tasks', href: '/tasks', icon: ClipboardList },
  { name: 'Ask Paulie', href: '/chatbot', icon: MessageSquare },
  { name: 'Subscription', href: '/subscription', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings, adminOnly: true },
  { name: 'Analytics', href: '/coming-soon?feature=analytics', icon: BarChart2 },
  { name: 'Help', href: '/coming-soon?feature=help', icon: HelpCircle },
];

interface SidebarProps {
  userRole?: 'admin' | 'user';
}

const Sidebar = ({ userRole = 'admin' }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div 
      className={cn(
        "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out z-10",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-thalos-blue">Thalos</span>
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="ml-auto"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navItems
            .filter(item => !item.adminOnly || userRole === 'admin')
            .map((item) => {
              const isActive = location.pathname === item.href || 
                               (item.href !== '/' && location.pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-3 rounded-md transition-colors duration-200",
                    isActive 
                      ? "bg-thalos-blue text-white" 
                      : "text-gray-700 hover:bg-gray-100",
                    collapsed ? "justify-center" : "justify-start"
                  )}
                >
                  <item.icon size={20} className={cn("flex-shrink-0", collapsed ? "" : "mr-3")} />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "space-x-3"
        )}>
          <div className="w-8 h-8 rounded-full bg-thalos-blue text-white flex items-center justify-center font-semibold">
            J
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500">{userRole === 'admin' ? 'Administrator' : 'User'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
