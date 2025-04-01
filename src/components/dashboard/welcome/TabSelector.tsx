
import React from 'react';
import { Button } from '@/components/ui/button';

interface TabSelectorProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabSelector = ({ activeTab, onTabChange }: TabSelectorProps) => {
  return (
    <div className="flex space-x-2 bg-gray-800 p-1 rounded-md">
      <Button
        onClick={() => onTabChange('personal')}
        variant="ghost"
        className={`text-sm px-3 py-1 rounded-md ${
          activeTab === 'personal' 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-400 hover:text-white hover:bg-gray-700'
        }`}
      >
        Personal
      </Button>
      <Button
        onClick={() => onTabChange('organization')}
        variant="ghost"
        className={`text-sm px-3 py-1 rounded-md ${
          activeTab === 'organization' 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-400 hover:text-white hover:bg-gray-700'
        }`}
      >
        Organization
      </Button>
    </div>
  );
};

export default TabSelector;
