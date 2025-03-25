
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface TasksFiltersProps {
  worksiteFilter: string;
  assigneeFilter: string;
  statusFilter: string;
  priorityFilter: string;
  onWorksiteFilterChange: (value: string) => void;
  onAssigneeFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onPriorityFilterChange: (value: string) => void;
  onResetFilters: () => void;
}

const TasksFilters: React.FC<TasksFiltersProps> = ({
  worksiteFilter,
  assigneeFilter,
  statusFilter,
  priorityFilter,
  onWorksiteFilterChange,
  onAssigneeFilterChange,
  onStatusFilterChange,
  onPriorityFilterChange,
  onResetFilters
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-medium text-gray-400">Filters</h2>
        <Button 
          variant="link" 
          className="text-blue-500 text-sm p-0 h-auto"
          onClick={onResetFilters}
        >
          Reset
        </Button>
      </div>
      <p className="text-xs text-gray-500 mb-3">Filter tasks by different criteria</p>
      
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Worksite</label>
          <div className="relative">
            <select
              className="w-full bg-[#1a1f29] border border-gray-700 rounded-md p-2 pr-8 text-white appearance-none"
              value={worksiteFilter}
              onChange={(e) => onWorksiteFilterChange(e.target.value)}
            >
              <option value="all">All Worksites</option>
              <option value="north">North Production Facility</option>
              <option value="south">South Warehouse</option>
              <option value="main">Main Office</option>
              <option value="west">West Distribution Center</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
          </div>
        </div>
        
        <div>
          <label className="block text-xs text-gray-400 mb-1">Assignee</label>
          <div className="relative">
            <select
              className="w-full bg-[#1a1f29] border border-gray-700 rounded-md p-2 pr-8 text-white appearance-none"
              value={assigneeFilter}
              onChange={(e) => onAssigneeFilterChange(e.target.value)}
            >
              <option value="all">All Assignees</option>
              <option value="john">John Smith</option>
              <option value="sarah">Sarah Johnson</option>
              <option value="michael">Michael Chen</option>
              <option value="lisa">Lisa Rodriguez</option>
              <option value="david">David Wilson</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
          </div>
        </div>
        
        <div>
          <label className="block text-xs text-gray-400 mb-1">Status</label>
          <div className="relative">
            <select
              className="w-full bg-[#1a1f29] border border-gray-700 rounded-md p-2 pr-8 text-white appearance-none"
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
          </div>
        </div>
        
        <div>
          <label className="block text-xs text-gray-400 mb-1">Priority</label>
          <div className="relative">
            <select
              className="w-full bg-[#1a1f29] border border-gray-700 rounded-md p-2 pr-8 text-white appearance-none"
              value={priorityFilter}
              onChange={(e) => onPriorityFilterChange(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksFilters;
