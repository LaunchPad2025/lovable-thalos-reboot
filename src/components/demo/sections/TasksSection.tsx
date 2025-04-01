
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon, Search, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { mockTasks } from '@/hooks/tasks/mockTasks';

interface TasksSectionProps {
  onShowFeatureInfo: () => void;
  onItemSelect: (item: any) => void;
}

const TasksSection = ({ onShowFeatureInfo, onItemSelect }: TasksSectionProps) => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="h-full">
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

      {/* Filters */}
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

      {/* Tabs */}
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

      {/* Table header */}
      <div className="grid grid-cols-12 gap-4 py-2 text-sm text-gray-400 border-b border-gray-800">
        <div className="col-span-4">Task</div>
        <div className="col-span-2">Worksite</div>
        <div className="col-span-2">Assignee</div>
        <div className="col-span-1">Due Date</div>
        <div className="col-span-1">Priority</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-1 text-right">Actions</div>
      </div>

      {/* Task rows */}
      <div className="divide-y divide-gray-800">
        {mockTasks.map((task) => (
          <div 
            key={task.id} 
            className="grid grid-cols-12 gap-4 py-4 hover:bg-[#1a1f29] cursor-pointer"
            onClick={() => onItemSelect(task)}
          >
            <div className="col-span-4 flex items-center">
              <div className="w-8 h-8 mr-2 flex-shrink-0 rounded bg-blue-900/30 flex items-center justify-center">
                <img 
                  src="public/lovable-uploads/0ddb45e2-4cee-47a1-aece-cb5ce365bf6f.png" 
                  alt="Task" 
                  className="w-5 h-5 opacity-70"
                />
              </div>
              <div className="truncate">
                <div className="font-medium text-white truncate">{task.title}</div>
              </div>
            </div>
            <div className="col-span-2 text-gray-300 flex items-center">{task.worksite_id || "Unknown"}</div>
            <div className="col-span-2 text-gray-300 flex items-center">{task.assignee_id || "Unassigned"}</div>
            <div className="col-span-1 flex items-center">
              <div className="text-red-400 text-sm">
                {new Date(task.due_date || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                <div className="text-xs">Overdue</div>
              </div>
            </div>
            <div className="col-span-1 flex items-center">
              <PriorityBadge priority={task.priority} />
            </div>
            <div className="col-span-1 flex items-center">
              <StatusBadge status={task.status} />
            </div>
            <div className="col-span-1 flex items-center justify-end">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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

interface PriorityBadgeProps {
  priority: string;
}

const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const getBadgeStyles = () => {
    switch (priority) {
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-blue-500 text-white';
      case 'low':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Badge className={`${getBadgeStyles()} capitalize`}>
      {priority}
    </Badge>
  );
};

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getBadgeStyles = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'in-progress':
        return 'bg-blue-500 text-white';
      case 'pending':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Badge className={`${getBadgeStyles()} capitalize`}>
      {status === 'in-progress' ? 'In Progress' : status}
    </Badge>
  );
};

export default TasksSection;
