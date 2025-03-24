
import React, { useState } from 'react';
import TasksHeader from './list/TasksHeader';
import TasksFilter from './list/TasksFilter';
import TaskListItem from './list/TaskListItem';
import TasksEmptyState from './list/TasksEmptyState';
import { Task } from '@/types/models';

export interface TasksListProps {
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
  selectedTaskId?: string;
  onAddNewTask: () => void;
}

const TasksList = ({ tasks, onTaskSelect, selectedTaskId, onAddNewTask }: TasksListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };
  
  return (
    <div className="h-full flex flex-col border border-gray-200 bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <TasksHeader onAddNewTask={onAddNewTask} />
        <TasksFilter 
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          onSearchChange={handleSearchChange}
          onStatusFilterChange={handleStatusFilterChange}
        />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredTasks.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredTasks.map(task => (
              <TaskListItem 
                key={task.id}
                task={task}
                isSelected={selectedTaskId === task.id}
                onSelect={onTaskSelect}
              />
            ))}
          </div>
        ) : (
          <TasksEmptyState />
        )}
      </div>
    </div>
  );
};

export default TasksList;
