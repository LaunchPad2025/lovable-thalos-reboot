
import React, { useState } from 'react';
import StatusBadge from '@/components/ui/StatusBadge';
import { Task } from '@/types/models';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TasksListProps {
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
  selectedTaskId?: string;
  onAddNewTask: () => void;
}

const TasksList = ({ tasks, onTaskSelect, selectedTaskId }: TasksListProps) => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter tasks based on the active tab
  const displayedTasks = tasks.filter(task => {
    if (activeTab === 'all') return true;
    if (activeTab === 'my') return task.assignee === 'John Smith'; // This would normally use the current user's name
    if (activeTab === 'completed') return task.status === 'completed';
    return true;
  });
  
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
      {displayedTasks.length > 0 ? (
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
                
                return (
                  <tr 
                    key={task.id} 
                    className={cn(
                      "cursor-pointer hover:bg-[#1a1f29]",
                      selectedTaskId === task.id && "bg-[#1a1f29]"
                    )}
                    onClick={() => onTaskSelect(task)}
                  >
                    <td className="px-4 py-4">
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-white">{task.title}</div>
                    </td>
                    <td className="px-4 py-4 text-gray-300">
                      {task.worksite_id || "Unassigned"}
                    </td>
                    <td className="px-4 py-4 text-gray-300">
                      {task.assignee}
                    </td>
                    <td className="px-4 py-4">
                      <div className={isOverdue ? "text-red-500" : "text-gray-300"}>
                        {task.dueDate}
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
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full py-20 text-gray-500">
          <p className="text-lg mb-2">
            {activeTab === 'all' ? "No tasks found" : 
              activeTab === 'my' ? "No tasks assigned to you" : 
              "No completed tasks"}
          </p>
          <p className="text-sm">
            {activeTab === 'all' ? "Try adjusting your filters or create a new task" : 
              activeTab === 'my' ? "Tasks assigned to you will appear here" : 
              "Completed tasks will appear here"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TasksList;
