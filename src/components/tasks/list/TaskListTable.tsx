
import React from 'react';
import { Task } from '@/types/models';
import TaskListRow from './TaskListRow';
import TaskListExpandedRow from './TaskListExpandedRow';

interface TaskListTableProps {
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
  selectedTaskId?: string;
  expandedTaskId: string | null;
  toggleTaskExpanded: (taskId: string, e: React.MouseEvent) => void;
}

const TaskListTable: React.FC<TaskListTableProps> = ({ 
  tasks, 
  onTaskSelect, 
  selectedTaskId,
  expandedTaskId,
  toggleTaskExpanded
}) => {
  return (
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
          {tasks.map((task) => (
            <React.Fragment key={task.id}>
              <TaskListRow 
                task={task}
                isSelected={selectedTaskId === task.id}
                isExpanded={expandedTaskId === task.id}
                onSelect={onTaskSelect}
                onToggleExpand={toggleTaskExpanded}
              />
              {expandedTaskId === task.id && (
                <TaskListExpandedRow task={task} />
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListTable;
