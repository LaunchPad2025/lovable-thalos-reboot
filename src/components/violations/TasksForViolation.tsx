
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import StatusBadge from '@/components/ui/StatusBadge';
import { useNavigate } from 'react-router-dom';
import { Task } from '@/types/models';

interface TasksForViolationProps {
  violationId: string;
  violationTasks: Task[] | undefined;
  isLoading: boolean;
}

const TasksForViolation = ({ violationId, violationTasks, isLoading }: TasksForViolationProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading related tasks...</div>;
  }

  return (
    <div className="mt-6 border border-gray-800 rounded-lg overflow-hidden">
      <div className="bg-[#1a1f29] p-4 border-b border-gray-800 flex justify-between items-center">
        <h3 className="text-md font-medium text-white">Related Tasks</h3>
        <Button 
          size="sm" 
          className="bg-thalos-blue hover:bg-blue-600 text-white"
          onClick={() => navigate(`/tasks?violation=${violationId}&newTask=true`)}
        >
          <PlusCircle size={16} className="mr-2" />
          Create Task
        </Button>
      </div>
      
      <div className="bg-[#0f1419] p-2">
        {violationTasks && violationTasks.length > 0 ? (
          <Table>
            <TableHeader className="bg-[#1a1f29]">
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="text-gray-400">Title</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Priority</TableHead>
                <TableHead className="text-gray-400">Due Date</TableHead>
                <TableHead className="text-gray-400">Assignee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {violationTasks.map((task) => (
                <TableRow 
                  key={task.id}
                  className="border-gray-800 hover:bg-[#1a1f29] cursor-pointer"
                  onClick={() => navigate(`/tasks/${task.id}`)}
                >
                  <TableCell className="text-gray-300 font-medium">
                    {task.title}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={task.status} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={task.priority} />
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {task.due_date ? new Date(task.due_date).toLocaleDateString() : '—'}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {task.assignee_id || '—'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6 text-gray-500">
            No tasks associated with this violation yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksForViolation;
