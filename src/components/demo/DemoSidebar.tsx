
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckSquare, ClipboardList, FileText } from 'lucide-react';

interface DemoSidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const DemoSidebar = ({ activeSection, onNavigate }: DemoSidebarProps) => {
  return (
    <aside className="w-64 h-[calc(100vh-64px)] bg-[#131820] border-r border-gray-800 fixed left-0 top-16">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${activeSection === 'dashboard' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-white'}`}
              onClick={() => onNavigate('dashboard')}
            >
              <CheckSquare className="mr-2 h-5 w-5" />
              Dashboard
            </Button>
          </li>
          <li>
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${activeSection === 'violations' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-white'}`}
              onClick={() => onNavigate('violations')}
            >
              <AlertTriangle className="mr-2 h-5 w-5" />
              Violations
            </Button>
          </li>
          <li>
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${activeSection === 'tasks' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-white'}`}
              onClick={() => onNavigate('tasks')}
            >
              <CheckSquare className="mr-2 h-5 w-5" />
              Tasks
            </Button>
          </li>
          <li>
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${activeSection === 'documents' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-white'}`}
              onClick={() => onNavigate('documents')}
            >
              <FileText className="mr-2 h-5 w-5" />
              Documents
            </Button>
          </li>
          <li>
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${activeSection === 'audits' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-white'}`}
              onClick={() => onNavigate('audits')}
            >
              <ClipboardList className="mr-2 h-5 w-5" />
              Audits
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DemoSidebar;
