
import React from 'react';

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

const TabButton = ({ isActive, onClick, label }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium transition-colors ${
      isActive 
        ? 'text-blue-500 border-b-2 border-blue-500' 
        : 'text-gray-400 hover:text-gray-300'
    }`}
  >
    {label}
  </button>
);

interface TasksTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TasksTabs = ({ activeTab, setActiveTab }: TasksTabsProps) => {
  return (
    <div className="flex mb-4 border-b border-gray-800">
      <TabButton 
        isActive={activeTab === 'all'} 
        onClick={() => setActiveTab('all')}
        label="All Tasks"
      />
      <TabButton 
        isActive={activeTab === 'my'} 
        onClick={() => setActiveTab('my')}
        label="My Tasks"
      />
      <TabButton 
        isActive={activeTab === 'completed'} 
        onClick={() => setActiveTab('completed')}
        label="Completed"
      />
    </div>
  );
};

export default TasksTabs;
