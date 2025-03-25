
import React from 'react';

interface TaskListTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TaskListTabs: React.FC<TaskListTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b border-gray-800 mb-4">
      <button 
        className={`px-4 py-2 text-sm ${activeTab === 'all' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
        onClick={() => onTabChange('all')}
      >
        All Tasks
      </button>
      <button 
        className={`px-4 py-2 text-sm ${activeTab === 'my' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
        onClick={() => onTabChange('my')}
      >
        My Tasks
      </button>
      <button 
        className={`px-4 py-2 text-sm ${activeTab === 'completed' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
        onClick={() => onTabChange('completed')}
      >
        Completed
      </button>
    </div>
  );
};

export default TaskListTabs;
