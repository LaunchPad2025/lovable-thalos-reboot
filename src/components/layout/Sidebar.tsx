
import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavSection } from './sidebar/types';
import Logo from './sidebar/Logo';
import { LayoutDashboard, BarChart2, Users, Folder, ThumbsUp } from 'lucide-react';
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';

interface SidebarProps {
  children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const location = useLocation();
  
  // These items would typically come from your application state or context
  // They are hardcoded here for demonstration purposes
  const demoNavItems: NavSection[] = [
    {
      title: 'Dashboard',
      items: [
        {
          title: 'Overview',
          path: '/dashboard',
          icon: LayoutDashboard,
        },
        {
          title: 'Analytics',
          path: '/analytics',
          icon: BarChart2,
        },
      ],
    },
    {
      title: 'Management',
      items: [
        {
          title: 'Users',
          path: '/users',
          icon: Users,
        },
        {
          title: 'Projects',
          path: '/projects',
          icon: Folder,
        },
        {
          title: 'Feedback',
          path: '/feedback',
          icon: ThumbsUp,
        }
      ],
    },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen overflow-hidden w-full">
        <SidebarUI>
          <SidebarHeader className="border-b border-gray-800 py-4">
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            {demoNavItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="px-3 py-2">
                {section.title && (
                  <h3 className="mb-2 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {section.title}
                  </h3>
                )}
                <SidebarMenu>
                  {section.items.map((item, itemIndex) => {
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <SidebarMenuItem key={itemIndex}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={item.title}
                        >
                          <a href={item.path} className="w-full">
                            <item.icon />
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className="ml-auto inline-block py-0.5 px-2 text-xs font-medium rounded-full bg-gray-700 text-gray-300">
                                {item.badge}
                              </span>
                            )}
                          </a>
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
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Sidebar;
