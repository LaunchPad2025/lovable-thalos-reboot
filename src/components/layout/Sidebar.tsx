
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Home, 
  AlertTriangle, 
  ClipboardList, 
  FileText,
  Bell,
  BarChart2,
  Settings,
  HelpCircle,
  Menu,
  Gauge,
  LogIn
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  adminOnly?: boolean;
  authRequired?: boolean;
};

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: Gauge, authRequired: true },
  { name: 'Violations', href: '/violations', icon: AlertTriangle, authRequired: true },
  { name: 'Tasks', href: '/tasks', icon: ClipboardList, authRequired: true },
  { name: 'Risk Assessment', href: '/coming-soon?feature=risk-assessment', icon: BarChart2, authRequired: true },
  { name: 'Documents', href: '/coming-soon?feature=documents', icon: FileText, authRequired: true },
  { name: 'Notifications', href: '/coming-soon?feature=notifications', icon: Bell, authRequired: true },
  { name: 'Audits', href: '/coming-soon?feature=audits', icon: BarChart2, authRequired: true },
  { name: 'Reports', href: '/coming-soon?feature=reports', icon: FileText, authRequired: true },
  { name: 'Training', href: '/coming-soon?feature=training', icon: HelpCircle, authRequired: true },
  { name: 'Admin', href: '/settings', icon: Settings, adminOnly: true, authRequired: true },
  { name: 'Sign In', href: '/auth', icon: LogIn, authRequired: false },
];

interface SidebarProps {
  userRole?: 'admin' | 'user';
}

const Sidebar = ({ userRole = 'admin' }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  // Filter items based on authentication status
  const filteredNavItems = navItems.filter(item => {
    // If item requires auth and user is not logged in, don't show
    if (item.authRequired && !user) return false;
    // If item is admin only and user is not admin, don't show
    if (item.adminOnly && userRole !== 'admin') return false;
    // If item is the login item and user is logged in, don't show
    if (item.name === 'Sign In' && user) return false;
    
    return true;
  });

  return (
    <div 
      className={cn(
        "h-screen bg-[#0b0f14] border-r border-gray-800 flex flex-col transition-all duration-300 ease-in-out z-10",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!collapsed && (
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-blue-500">Thalos</span>
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="ml-auto text-gray-400 hover:text-white hover:bg-gray-800"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.href || 
                             (item.href !== '/' && location.pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-3 rounded-md transition-colors duration-200",
                  isActive 
                    ? "bg-blue-600 text-white" 
                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
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
      
      {user && (
        <div className="p-4 border-t border-gray-800">
          <div className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "space-x-3"
          )}>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            {!collapsed && (
              <div className="text-white">
                <p className="text-sm font-medium">{user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}</p>
                <p className="text-xs text-gray-400">{userRole === 'admin' ? 'Administrator' : 'User'}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {user && (
        <div className="p-4 border-t border-gray-800">
          <div className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "justify-between"
          )}>
            {!collapsed ? (
              <>
                <span className="text-xs text-gray-400">Chatbot</span>
                <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">1</span>
              </>
            ) : (
              <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">1</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
