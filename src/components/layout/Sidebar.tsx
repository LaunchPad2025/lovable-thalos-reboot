
import React from 'react';
import { Sidebar as SidebarUI } from '@/components/ui/sidebar';
import { NavSection, NavItem } from './sidebar/types';
import NavItems from './sidebar/NavItems';
import Logo from './sidebar/Logo';
import DesktopNav from './sidebar/DesktopNav';
import MobileNav from './sidebar/MobileNav';

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
          icon: () => <span>📊</span>,
        },
        {
          title: 'Analytics',
          path: '/analytics',
          icon: () => <span>📈</span>,
        },
      ],
    },
    {
      title: 'Management',
      items: [
        {
          title: 'Users',
          path: '/users',
          icon: () => <span>👥</span>,
        },
        {
          title: 'Projects',
          path: '/projects',
          icon: () => <span>📁</span>,
        },
      ],
    },
  ];

  return (
    <SidebarUI.Root>
      <SidebarUI.Header>
        <Logo />
      </SidebarUI.Header>
      <SidebarUI.Nav>
        <DesktopNav sections={demoNavItems} />
        <MobileNav sections={demoNavItems} />
      </SidebarUI.Nav>
      <SidebarUI.Footer>
        {/* Add footer content here if needed */}
      </SidebarUI.Footer>
      <SidebarUI.Content>
        {children}
      </SidebarUI.Content>
    </SidebarUI.Root>
  );
};

export default Sidebar;
