
import React, { useState } from 'react';
import { Task } from '@/types/models';
import TasksEmptyState from './list/TasksEmptyState';
import TaskListTabs from './list/TaskListTabs';
import TaskListTable from './list/TaskListTable';

export interface TasksListProps {
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
  selectedTaskId?: string;
  onAddNewTask: () => void;
}

const TasksList = ({ tasks, onTaskSelect, selectedTaskId, onAddNewTask }: TasksListProps) => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  
  // Filter tasks based on the active tab
  const displayedTasks = tasks.filter(task => {
    if (activeTab === 'all') return true;
    if (activeTab === 'my') return task.assignee_id === 'user-1'; // This would normally use the current user's ID
    if (activeTab === 'completed') return task.status === 'completed';
    return true;
  });

  const toggleTaskExpanded = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click from firing
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };
  
  // If there are no tasks to display, show the empty state
  if (displayedTasks.length === 0) {
    return <TasksEmptyState onAddNewTask={onAddNewTask} type={activeTab as 'all' | 'my' | 'completed'} />;
  }
  
  return (
    <div className="flex flex-col h-full">
      <TaskListTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      <TaskListTable 
        tasks={displayedTasks}
        onTaskSelect={onTaskSelect}
        selectedTaskId={selectedTaskId}
        expandedTaskId={expandedTaskId}
        toggleTaskExpanded={toggleTaskExpanded}
      />
    </div>
  );
};

export default TasksList;
