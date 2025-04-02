
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, MessageSquare, Info, HelpCircle, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMobile } from '@/hooks/useMobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const NavigationHeader = () => {
  const location = useLocation();
  const isMobile = useMobile();
  
  // Define navigation items for both desktop and mobile
  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={16} className="mr-2" /> },
    { path: '/documentation/features', label: 'Features', icon: <FileText size={16} className="mr-2" /> },
    { path: '/documentation/pricing', label: 'Pricing', icon: <DollarSign size={16} className="mr-2" /> },
    { path: '/documentation/contact', label: 'Contact', icon: <MessageSquare size={16} className="mr-2" /> },
    { path: '/documentation/about-us', label: 'About Us', icon: <Info size={16} className="mr-2" /> },
    { path: '/documentation/help-center', label: 'Help', icon: <HelpCircle size={16} className="mr-2" /> }
  ];
  
  // Check if the current path matches or starts with the nav item path
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-full border-b border-border bg-background py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center mr-6">
          <div className="bg-blue-600 w-8 h-8 rounded-md flex items-center justify-center">
            <span className="text-white font-bold">T</span>
          </div>
          <span className="ml-2 text-lg font-semibold">Thalos</span>
        </Link>
        
        {isMobile ? (
          /* Mobile Navigation - Dropdown Menu */
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.path} asChild>
                  <Link 
                    to={item.path}
                    className="flex items-center w-full"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          /* Desktop Navigation - Horizontal Links */
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
              >
                <Button 
                  variant={isActive(item.path) ? "secondary" : "ghost"} 
                  size="sm"
                  className={isActive(item.path) ? "bg-muted" : ""}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            
            <Link to="/demo">
              <Button 
                variant={location.pathname === "/demo" ? "secondary" : "default"} 
                size="sm" 
                className="ml-2"
              >
                Try Demo
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationHeader;
