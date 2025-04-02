
import React, { useState, useMemo } from 'react';
import { mockTasks } from '@/hooks/tasks/mockTasks';

// Import refactored components
import TasksHeader from './tasks/TasksHeader';
import TasksFilters from './tasks/TasksFilters';
import TasksTabs from './tasks/TasksTabs';
import TasksList from './tasks/TasksList';

interface TasksSectionProps {
  onShowFeatureInfo: () => void;
  onItemSelect: (item: any) => void;
}

const TasksSection = ({ onShowFeatureInfo, onItemSelect }: TasksSectionProps) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tasks based on active tab and search query
  const filteredTasks = useMemo(() => {
    return mockTasks.filter(task => {
      // First filter by tab
      if (activeTab === 'my' && task.assignee_id !== 'Sarah Johnson') {
        return false;
      }
      if (activeTab === 'completed' && task.status !== 'completed') {
        return false;
      }

      // Then filter by search query if it exists
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query) ||
          (task.assignee_id && task.assignee_id.toLowerCase().includes(query)) ||
          (task.worksite_id && String(task.worksite_id).toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="h-full">
      <TasksHeader 
        onShowFeatureInfo={onShowFeatureInfo} 
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />
      <TasksFilters />
      <TasksTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <TasksList tasks={filteredTasks} onItemSelect={onItemSelect} />
    </div>
  );
};

export default TasksSection;
