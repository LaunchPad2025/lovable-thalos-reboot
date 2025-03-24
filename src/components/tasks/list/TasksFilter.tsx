
import React from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TasksFilterProps {
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TasksFilter = ({ 
  searchTerm, 
  statusFilter, 
  onSearchChange, 
  onStatusFilterChange 
}: TasksFilterProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={onSearchChange}
          className="pl-10 pr-4 py-2 w-full"
        />
      </div>
      
      <div className="flex items-center space-x-1">
        <Filter size={16} className="text-gray-500" />
        <select
          value={statusFilter}
          onChange={onStatusFilterChange}
          className="border-none bg-transparent focus:ring-0 text-sm font-medium cursor-pointer pr-8"
        >
          <option value="all">All Statuses</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
        <ChevronDown size={14} className="text-gray-500" />
      </div>
    </div>
  );
};

export default TasksFilter;
