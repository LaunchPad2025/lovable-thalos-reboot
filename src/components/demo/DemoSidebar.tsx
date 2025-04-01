
import React from 'react';
import { LayoutDashboard, ClipboardList, BarChart } from 'lucide-react';

interface DemoSidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const DemoSidebar = ({ activeSection, onNavigate }: DemoSidebarProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: ClipboardList },
    { id: 'reports', label: 'Reports', icon: BarChart },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0b0f14] border-r border-gray-800 z-30">
      <div className="flex flex-col h-full p-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 my-1 rounded-md text-sm transition-colors ${
              activeSection === item.id 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default DemoSidebar;
