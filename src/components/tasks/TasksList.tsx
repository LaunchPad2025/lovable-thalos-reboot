
import React, { useState } from 'react';
import StatusBadge from '@/components/ui/StatusBadge';
import { Task } from '@/types/models';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import TasksEmptyState from './list/TasksEmptyState';

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
      {/* Tabs */}
      <div className="flex border-b border-gray-800 mb-4">
        <button 
          className={`px-4 py-2 text-sm ${activeTab === 'all' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('all')}
        >
          All Tasks
        </button>
        <button 
          className={`px-4 py-2 text-sm ${activeTab === 'my' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('my')}
        >
          My Tasks
        </button>
        <button 
          className={`px-4 py-2 text-sm ${activeTab === 'completed' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
      </div>
      
      {/* Tasks Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full table-auto">
          <thead className="text-xs text-gray-400 border-b border-gray-800">
            <tr>
              <th className="px-4 py-3 text-left w-6"></th>
              <th className="px-4 py-3 text-left">Task</th>
              <th className="px-4 py-3 text-left">Worksite</th>
              <th className="px-4 py-3 text-left">Assignee</th>
              <th className="px-4 py-3 text-left">Due Date</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {displayedTasks.map((task) => {
              const isOverdue = task.due_date && new Date(task.due_date) < new Date();
              const isExpanded = expandedTaskId === task.id;
              
              return (
                <React.Fragment key={task.id}>
                  <tr 
                    className={cn(
                      "cursor-pointer hover:bg-[#1a1f29]",
                      selectedTaskId === task.id && "bg-[#1a1f29]"
                    )}
                    onClick={() => onTaskSelect(task)}
                  >
                    <td className="px-4 py-4">
                      <button 
                        onClick={(e) => toggleTaskExpanded(task.id, e)} 
                        className="focus:outline-none"
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-white">{task.title}</div>
                    </td>
                    <td className="px-4 py-4 text-gray-300">
                      {task.worksite_id || "Unassigned"}
                    </td>
                    <td className="px-4 py-4 text-gray-300">
                      {task.assignee_id || "Unassigned"}
                    </td>
                    <td className="px-4 py-4">
                      <div className={isOverdue ? "text-red-500" : "text-gray-300"}>
                        {task.due_date ? new Date(task.due_date).toLocaleDateString() : "No due date"}
                        {isOverdue && <div className="text-xs text-red-500">Overdue</div>}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${task.priority === 'high' ? 'bg-orange-500 text-white' : 
                          task.priority === 'medium' ? 'bg-blue-500 text-white' :
                          'bg-gray-700 text-white'}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="px-4 py-4 text-gray-500">
                      ...
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="bg-[#131920] border-b border-gray-800">
                      <td colSpan={8} className="p-4">
                        <div className="text-sm text-gray-300">
                          <h4 className="font-medium text-white mb-2">Description</h4>
                          <p className="mb-4">{task.description || "No description provided"}</p>
                          
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                              <h5 className="font-medium text-white mb-1">Created</h5>
                              <p>{new Date(task.created_at).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <h5 className="font-medium text-white mb-1">Last Updated</h5>
                              <p>{new Date(task.updated_at).toLocaleDateString()}</p>
                            </div>
                            {task.violation_id && (
                              <div className="col-span-2">
                                <h5 className="font-medium text-white mb-1">Related Violation</h5>
                                <p>ID: {task.violation_id}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksList;
