
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon, Search } from 'lucide-react';

interface TasksHeaderProps {
  onShowFeatureInfo: () => void;
}

const TasksHeader = ({ onShowFeatureInfo }: TasksHeaderProps) => {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold text-white">Tasks</h2>
          <p className="text-gray-400 text-sm">Manage and track your safety compliance tasks</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          onClick={onShowFeatureInfo}
        >
          <PlusIcon className="h-4 w-4" />
          Create Task
        </Button>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full bg-[#161b22] border border-gray-800 rounded-md py-2 pl-10 pr-4 text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </>
  );
};

export default TasksHeader;
