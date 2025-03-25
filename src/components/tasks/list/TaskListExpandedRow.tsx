
import React from 'react';
import { Task } from '@/types/models';

interface TaskListExpandedRowProps {
  task: Task;
}

const TaskListExpandedRow: React.FC<TaskListExpandedRowProps> = ({ task }) => {
  return (
    <tr className="bg-[#131920] border-b border-gray-800">
      <td colSpan={8} className="p-4">
        <div className="text-sm text-gray-300">
          <h4 className="font-medium text-white mb-2">Description</h4>
          <p className="mb-4 whitespace-pre-line">{task.description || "No description provided"}</p>
          
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
  );
};

export default TaskListExpandedRow;
