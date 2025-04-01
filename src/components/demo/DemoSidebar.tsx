
import React from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  BarChart2, 
  UploadCloud, 
  FileText, 
  Bell, 
  Settings, 
  HelpCircle,
  AlertTriangle,
  MessageSquare,
  Bot
} from 'lucide-react';

interface DemoSidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const DemoSidebar = ({ activeSection, onNavigate }: DemoSidebarProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'violations', label: 'Violations', icon: AlertTriangle },
    { id: 'tasks', label: 'Tasks', icon: ClipboardList },
    { id: 'reports', label: 'Reports', icon: BarChart2 },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'audits', label: 'Audits', icon: Bell },
  ];

  const secondaryNavItems = [
    { id: 'copilot', label: 'Copilot', icon: MessageSquare, badge: 'AI' },
    { id: 'media-analysis', label: 'Media Analysis', icon: UploadCloud },
    { id: 'subscription', label: 'Subscription', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Tour', icon: HelpCircle },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0b0f14] border-r border-gray-800 z-30">
      <div className="flex flex-col h-full">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-white font-semibold text-xl">Thalos</span>
            <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-sm">Pro</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
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
          
          <div className="mt-8">
            <h3 className="text-xs uppercase text-gray-500 font-medium px-3 mb-2">Account</h3>
            <ul className="space-y-1">
              {secondaryNavItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                      activeSection === item.id 
                        ? 'bg-[#1a1f29] text-white' 
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-800 flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white mr-2">
            HS
          </div>
          <div className="text-sm">
            <p className="text-white font-medium">Hal Spencer</p>
            <p className="text-gray-400 text-xs">Safety Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DemoSidebar;
