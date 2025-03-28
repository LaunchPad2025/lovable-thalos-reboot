
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { NavItem, NavSection, navItems } from './sidebar/navItems';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import Logo from './sidebar/Logo';
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from '@/components/ui/sidebar';

interface SidebarProps {
  children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const location = useLocation();
  const { userRole } = useAuthStatus?.() || { userRole: 'user' };
  
  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(section => {
    // If the section has roles specified, check if the user's role is included
    if (section.roles && !section.roles.includes(userRole)) {
      return false;
    }
    
    // Filter items within each section
    section.items = section.items.filter(item => {
      if (item.roles && !item.roles.includes(userRole)) {
        return false;
      }
      return true;
    });
    
    return section.items.length > 0; // Only include sections with at least one visible item
  });

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen overflow-hidden w-full">
        <SidebarUI>
          <SidebarHeader className="border-b border-gray-800 py-4">
            <div className="px-4">
              <Logo />
            </div>
          </SidebarHeader>
          <SidebarContent>
            {filteredNavItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="px-3 py-2">
                {section.title && (
                  <h3 className="mb-2 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {section.title}
                  </h3>
                )}
                <SidebarMenu>
                  {section.items.map((item, itemIndex) => {
                    const isActive = location.pathname === item.href;
                    
                    return (
                      <SidebarMenuItem key={itemIndex}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={item.title}
                        >
                          <Link to={item.href} className="w-full">
                            <item.icon />
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className={`ml-auto inline-block py-0.5 px-2 text-xs font-medium rounded-full ${item.badgeColor || 'bg-gray-700 text-gray-300'}`}>
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </div>
            ))}
          </SidebarContent>
          <SidebarFooter className="border-t border-gray-800 p-4">
            <div className="text-xs text-gray-400">
              Thalos Dashboard v1.0
            </div>
          </SidebarFooter>
        </SidebarUI>
        <main className="flex-1 overflow-auto">
          <div className="h-12 border-b border-gray-800 flex items-center px-4">
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Sidebar;
