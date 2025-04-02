
import React from 'react';
import { 
  BarChart4, 
  AlertCircle, 
  CheckSquare, 
  FileText, 
  Folder, 
  ClipboardCheck, 
  Bot, 
  Image,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMobile } from '@/hooks/useMobile';

interface DemoSidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  collapsed?: boolean;
  onClose?: () => void;
}

const DemoSidebar = ({ activeSection, onNavigate, collapsed = false, onClose }: DemoSidebarProps) => {
  const isMobile = useMobile();
  
  const navigationItems = [
    { id: 'dashboard', icon: <BarChart4 size={20} />, label: 'Dashboard' },
    { id: 'violations', icon: <AlertCircle size={20} />, label: 'Violations' },
    { id: 'tasks', icon: <CheckSquare size={20} />, label: 'Tasks' },
    { id: 'reports', icon: <FileText size={20} />, label: 'Reports' },
    { id: 'documents', icon: <Folder size={20} />, label: 'Documents' },
    { id: 'audits', icon: <ClipboardCheck size={20} />, label: 'Audits' },
    { id: 'copilot', icon: <Bot size={20} />, label: 'AI Copilot' },
    { id: 'media-analysis', icon: <Image size={20} />, label: 'Media Analysis' }
  ];

  // For mobile view with full screen sidebar
  if (isMobile && !collapsed) {
    return (
      <div className="fixed inset-0 bg-[#0b0f14] z-40 overflow-y-auto">
        <div className="h-16 border-b border-gray-800 flex items-center justify-between px-4">
          <div className="flex items-center">
            <div className="bg-blue-600 w-8 h-8 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className="ml-2 text-white font-semibold">Thalos Safety</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-gray-400"
          >
            <X size={20} />
          </Button>
        </div>
        
        <nav className="mt-4">
          <ul>
            {navigationItems.map((item) => (
              <li key={item.id} className="mb-1">
                <button
                  onClick={() => {
                    onNavigate(item.id);
                    if (isMobile && onClose) onClose();
                  }}
                  className={`flex items-center w-full px-4 py-3 hover:bg-blue-900/20 transition-colors ${
                    activeSection === item.id ? 'bg-blue-900/30 text-blue-400 border-l-2 border-blue-500' : 'text-gray-400'
                  }`}
                >
                  <span className={activeSection === item.id ? 'text-blue-400' : ''}>{item.icon}</span>
                  <span className="ml-3">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }

  // Standard desktop sidebar
  return (
    <div className={`fixed top-0 left-0 h-full bg-[#0b0f14] border-r border-gray-800 transition-all duration-300 ease-in-out z-30 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="h-16 border-b border-gray-800 flex items-center px-4">
        <div className={`flex items-center ${collapsed ? 'justify-center w-full' : ''}`}>
          <div className="bg-blue-600 w-8 h-8 rounded-md flex items-center justify-center">
            <span className="text-white font-bold">T</span>
          </div>
          {!collapsed && <span className="ml-2 text-white font-semibold">Thalos Safety</span>}
        </div>
      </div>
      
      <nav className="mt-4">
        <ul>
          {navigationItems.map((item) => (
            <li key={item.id} className="mb-1">
              <button
                onClick={() => onNavigate(item.id)}
                className={`flex items-center w-full px-4 py-3 hover:bg-blue-900/20 transition-colors ${
                  activeSection === item.id ? 'bg-blue-900/30 text-blue-400 border-l-2 border-blue-500' : 'text-gray-400'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <span className={activeSection === item.id ? 'text-blue-400' : ''}>{item.icon}</span>
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DemoSidebar;
