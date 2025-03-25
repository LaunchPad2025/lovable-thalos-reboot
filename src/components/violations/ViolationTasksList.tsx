
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from 'lucide-react';
import { useViolationTasks } from '@/hooks/useViolationRegulations';

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  due_date?: string;
  assignee_id?: string;
}

interface ViolationTasksListProps {
  violationId: string;
  onCreateTask?: () => void;
}

const ViolationTasksList = ({ violationId, onCreateTask }: ViolationTasksListProps) => {
  const { data: tasks, isLoading, isError } = useViolationTasks(violationId);
  const navigate = useNavigate();

  const handleTaskClick = (taskId: string) => {
    navigate(`/tasks/${taskId}`);
  };

  const getPriorityBadgeStyle = (priority: string) => {
    switch(priority.toLowerCase()) {
      case 'high': return "bg-orange-500 text-white";
      case 'medium': return "bg-blue-500 text-white";
      case 'low': return "bg-gray-500 text-white";
      default: return "bg-gray-700 text-white";
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch(status.toLowerCase()) {
      case 'open': return "bg-red-800/40 text-red-300";
      case 'in-progress': return "bg-blue-800/40 text-blue-300";
      case 'resolved':
      case 'completed': return "bg-green-800/40 text-green-300";
      default: return "bg-gray-800/40 text-gray-300";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mr-2" />
        <span>Loading tasks...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-md p-4 text-red-200 text-center">
        Error loading tasks. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Associated Tasks</h3>
        <Button 
          size="sm" 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={onCreateTask}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Task
        </Button>
      </div>

      {tasks && tasks.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Assignee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task: Task) => (
              <TableRow
                key={task.id}
                className="cursor-pointer hover:bg-[#1a1f29]"
                onClick={() => handleTaskClick(task.id)}
              >
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeStyle(task.status)}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityBadgeStyle(task.priority)}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {task.due_date ? new Date(task.due_date).toLocaleDateString() : "—"}
                </TableCell>
                <TableCell>{task.assignee_id || "Unassigned"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-6 bg-[#0d1117] rounded-md border border-gray-800">
          <p className="text-gray-400 mb-2">No tasks associated with this violation.</p>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-gray-700 text-gray-300"
            onClick={onCreateTask}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Remediation Task
          </Button>
        </div>
      )}
    </div>
  );
};

export default ViolationTasksList;
