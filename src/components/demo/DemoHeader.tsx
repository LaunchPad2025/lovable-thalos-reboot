
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface DemoHeaderProps {
  activeSection: string;
  onToggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
}

const DemoHeader = ({ activeSection, onToggleSidebar, sidebarCollapsed }: DemoHeaderProps) => {
  // Get the page title based on the active section
  const getPageTitle = () => {
    switch (activeSection) {
      case 'dashboard':
        return 'Dashboard';
      case 'violations':
        return 'Violations';
      case 'tasks':
        return 'Tasks';
      case 'reports':
        return 'Reports';
      case 'copilot':
        return 'Copilot';
      case 'media-analysis':
        return 'Media Analysis';
      case 'documents':
        return 'Documents';
      case 'audits':
        return 'Audits';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className={`fixed top-0 right-0 ${sidebarCollapsed ? 'left-16' : 'left-64'} h-16 bg-[#0b0f14] border-b border-gray-800 z-20 flex items-center px-4 md:px-6 transition-all duration-300`}>
      <div className="flex-1 flex items-center">
        {onToggleSidebar && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleSidebar}
            className="mr-2 text-gray-400 hover:text-white"
          >
            {sidebarCollapsed ? <Menu size={18} /> : <X size={18} />}
          </Button>
        )}
        <div className="flex items-center mr-4">
          <span className="ml-2 text-blue-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </span>
          <span className="ml-2 text-white">{getPageTitle()}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="bg-green-600 text-white text-xs px-2 md:px-3 py-1 md:py-1.5 rounded-md mr-2">
          Pro Plan - Active
        </div>
        
        <Button className="border border-gray-700 bg-transparent hover:bg-gray-800 text-white text-sm md:text-base">
          Sign Out
        </Button>
      </div>
    </header>
  );
};

export default DemoHeader;
