
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardList, ChevronRight, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import EmptyStateMessage from '@/components/EmptyStateMessage';
import { useTasks } from '@/hooks/useTasks';
import StatusBadge from '@/components/ui/StatusBadge';

const PriorityTasks = () => {
  const { isAuthenticated } = useAuthStatus();
  const { tasks, isLoading } = useTasks();
  const navigate = useNavigate();

  const handleCreateTask = () => {
    navigate('/tasks');
  };

  // Get high priority tasks and sort by due date
  const priorityTasks = tasks
    ?.filter(task => task.priority === 'high')
    .sort((a, b) => {
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    })
    .slice(0, 3);

  return (
    <Card className="bg-[#0d1117] border-gray-800 shadow-none text-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <ClipboardList className="h-5 w-5 text-gray-400" />
            <h3 className="font-medium">Priority Tasks</h3>
          </div>
          <Link to="/tasks" className="text-xs text-blue-500 hover:text-blue-400 flex items-center">
            View all <ChevronRight className="h-3 w-3 ml-1" />
          </Link>
        </div>

        {isLoading ? (
          <div className="py-6 text-center">
            <p className="text-gray-400 text-sm">Loading tasks...</p>
          </div>
        ) : priorityTasks && priorityTasks.length > 0 ? (
          <div className="space-y-3">
            {priorityTasks.map(task => (
              <Link 
                key={task.id} 
                to={`/tasks/${task.id}`}
                className="flex items-center justify-between rounded-md bg-[#1a1f29] p-3 hover:bg-[#232a38] transition-colors"
              >
                <div>
                  <p className="font-medium text-white">{task.title}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : "No due date"}
                  </p>
                </div>
                <StatusBadge status={task.status} />
              </Link>
            ))}
            <div className="pt-2 flex justify-center">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 w-full"
                onClick={handleCreateTask}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Task
              </Button>
            </div>
          </div>
        ) : (
          <EmptyStateMessage
            title="No priority tasks"
            description="Create your first task to keep track of important safety work."
            icon={<ClipboardList className="h-8 w-8 text-gray-400" />}
            actionLabel="Create Task"
            onAction={handleCreateTask}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PriorityTasks;
