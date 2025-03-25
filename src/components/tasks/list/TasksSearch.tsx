
import React from 'react';
import { Input } from '@/components/ui/input';

interface TasksSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const TasksSearch: React.FC<TasksSearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="mb-6">
      <Input
        type="search"
        placeholder="Search tasks..."
        className="bg-[#1a1f29] border-gray-700 w-full"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default TasksSearch;
