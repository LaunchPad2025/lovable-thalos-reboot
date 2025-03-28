
import React from 'react';
import { Sidebar as SidebarUI } from '@/components/ui/sidebar';
import { NavSection } from './sidebar/types';
import Logo from './sidebar/Logo';
import DesktopNav from './sidebar/DesktopNav';
import MobileNav from './sidebar/MobileNav';
import { LayoutDashboard, BarChart2, Users, Folder } from 'lucide-react';

interface SidebarProps {
  children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
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
      ],
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 bg-gray-900 text-white">
        <div className="h-20 flex items-center px-4 border-b border-gray-800">
          <Logo />
        </div>
        <div className="p-4">
          <DesktopNav sections={demoNavItems} />
          <MobileNav sections={demoNavItems} />
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
