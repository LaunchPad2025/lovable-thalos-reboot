
import React, { useState } from 'react';
import { Search, Plus, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import StatusBadge from '../ui/StatusBadge';
import { cn } from '@/lib/utils';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'open' | 'in-progress' | 'completed' | 'overdue';
  assignee: string;
  priority: 'low' | 'medium' | 'high';
}

interface TasksListProps {
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
  
  return (
    <div className="h-full flex flex-col border border-gray-200 bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Tasks</h2>
          <Button 
            onClick={onAddNewTask}
            className="flex items-center text-sm bg-thalos-blue hover:bg-blue-600"
          >
            <Plus size={16} className="mr-1" />
            New Task
          </Button>
        </div>
        
        <div className="flex flex-col space-y-2">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
          
          <div className="flex items-center space-x-1">
            <Filter size={16} className="text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
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
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredTasks.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredTasks.map(task => (
              <div 
                key={task.id}
                onClick={() => onTaskSelect(task)}
                className={cn(
                  "p-4 hover:bg-gray-50 cursor-pointer transition-colors",
                  selectedTaskId === task.id && "bg-blue-50 hover:bg-blue-50 border-l-4 border-thalos-blue"
                )}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{task.description}</p>
                    <div className="mt-2 flex items-center">
                      <span className="text-xs text-gray-500 mr-2">Due: {task.dueDate}</span>
                      <span className="text-xs text-gray-500">Assignee: {task.assignee}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <StatusBadge status={task.status} />
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full
                        ${task.priority === 'low' ? 'bg-green-100 text-green-800' : 
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}
                    >
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            No tasks found
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksList;
