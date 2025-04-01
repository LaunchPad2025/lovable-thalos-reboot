
import React, { useState } from 'react';
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

  return (
    <div className="h-full">
      <TasksHeader onShowFeatureInfo={onShowFeatureInfo} />
      <TasksFilters />
      <TasksTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <TasksList tasks={mockTasks} onItemSelect={onItemSelect} />
    </div>
  );
};

export default TasksSection;
