
import React from 'react';
import { Button } from '@/components/ui/button';

const TasksFilters = () => {
  return (
    <div className="mb-6">
      <h3 className="text-sm text-gray-400 mb-2">Filters</h3>
      <p className="text-xs text-gray-500 mb-3">Filter tasks by different criteria</p>
      
      <div className="grid grid-cols-4 gap-4 mb-2">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Worksite</label>
          <select className="w-full bg-[#161b22] border border-gray-800 rounded-md p-2 text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option>All Worksites</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs text-gray-400 mb-1">Assignee</label>
          <select className="w-full bg-[#161b22] border border-gray-800 rounded-md p-2 text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option>All Assignees</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs text-gray-400 mb-1">Status</label>
          <select className="w-full bg-[#161b22] border border-gray-800 rounded-md p-2 text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option>All Statuses</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs text-gray-400 mb-1">Priority</label>
          <select className="w-full bg-[#161b22] border border-gray-800 rounded-md p-2 text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option>All Priorities</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="link" 
          className="text-blue-500 text-sm hover:text-blue-400 p-0 h-auto"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default TasksFilters;
