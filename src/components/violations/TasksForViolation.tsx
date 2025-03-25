
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import StatusBadge from '@/components/ui/StatusBadge';
import { useNavigate } from 'react-router-dom';
import { Task } from '@/types/models';
import { useToast } from '@/hooks/use-toast';

interface TasksForViolationProps {
  violationId: string;
  violationTasks: Task[] | undefined;
  isLoading: boolean;
}

const TasksForViolation = ({ violationId, violationTasks, isLoading }: TasksForViolationProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateTask = () => {
    toast({
      title: "Creating new task",
      description: "You will be redirected to the task creation form.",
    });
    navigate(`/tasks?violation=${violationId}&newTask=true`);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-6">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-thalos-blue"></div>
      <span className="ml-3 text-gray-400">Loading related tasks...</span>
    </div>;
  }

  return (
    <div className="mt-6 border border-gray-800 rounded-lg overflow-hidden">
      <div className="bg-[#1a1f29] p-4 border-b border-gray-800 flex justify-between items-center">
        <h3 className="text-md font-medium text-white">Related Tasks</h3>
        <Button 
          size="sm" 
          className="bg-thalos-blue hover:bg-blue-600 text-white"
          onClick={handleCreateTask}
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
                    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${task.priority === 'high' ? 'bg-orange-500 text-white' : 
                        task.priority === 'medium' ? 'bg-blue-500 text-white' :
                        'bg-gray-700 text-white'}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </div>
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
            <p className="mb-2">No tasks associated with this violation yet.</p>
            <p className="text-sm">Click "Create Task" to automatically generate a remediation task.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksForViolation;
