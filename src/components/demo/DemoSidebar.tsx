
import React from 'react';
import { FileText, HelpCircle, LayoutDashboard, AlertTriangle, ListChecks, Search, FileBarChart, FileSpreadsheet, Settings, AlertCircle } from 'lucide-react';

interface DemoSidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const DemoSidebar = ({ activeSection, onNavigate }: DemoSidebarProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'violations', label: 'Violations', icon: AlertTriangle },
    { id: 'tasks', label: 'Tasks', icon: ListChecks },
    { id: 'risk-assessment', label: 'Risk Assessment', icon: Search },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: AlertCircle },
    { id: 'audits', label: 'Audits', icon: FileBarChart },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
    { id: 'admin', label: 'Admin', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0b0f14] border-r border-gray-800 z-30">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold text-white">Thalos<span className="text-blue-500">.</span></h1>
        </div>
        
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-md text-sm transition-colors ${
                    activeSection === item.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-md text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <HelpCircle size={18} />
            <span>Help & Tour</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DemoSidebar;
