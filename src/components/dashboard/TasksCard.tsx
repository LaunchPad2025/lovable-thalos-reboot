
import React from 'react';
import { ArrowRight, CircleHelp, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useTasks } from '@/hooks/useTasks';

const TasksCard = () => {
  const { toast } = useToast();
  const { tasks, hasRealData } = useTasks();
  const navigate = useNavigate();
  
  // Count tasks by priority
  const highPriorityCount = tasks?.filter(task => task.priority === 'high').length || 0;
  const mediumPriorityCount = tasks?.filter(task => task.priority === 'medium').length || 0;
  const lowPriorityCount = tasks?.filter(task => task.priority === 'low').length || 0;
  
  // Count open tasks
  const openTasksCount = tasks?.filter(task => 
    task.status === 'open' || task.status === 'in-progress'
  ).length || 0;
  
  const startTasksTour = () => {
    toast({
      title: "Tasks Overview Tour",
      description: "This card shows your pending tasks breakdown. Tasks are categorized by priority (High, Medium, Low) and status (Open, In Progress, Completed).",
      duration: 5000,
    });
  };

  const handleCreateTask = () => {
    navigate('/tasks?newTask=true');
  };
  
  return (
    <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-white">Tasks</h3>
        <Button variant="ghost" size="icon" onClick={startTasksTour} className="h-8 w-8">
          <CircleHelp className="h-5 w-5 text-gray-400" />
        </Button>
      </div>
      
      <div className="mt-4">
        {tasks.length > 0 ? (
          <>
            <div className="flex items-end space-x-2">
              <span className="text-3xl font-semibold text-white">{openTasksCount}</span>
              <span className="text-sm text-gray-400">open tasks</span>
            </div>
            
            <div className="mt-3 flex space-x-3">
              <div className="flex-1 bg-[#161b22] rounded-md p-2 text-center">
                <p className="text-sm text-gray-400">High</p>
                <p className="text-lg font-medium text-red-400">{highPriorityCount}</p>
              </div>
              <div className="flex-1 bg-[#161b22] rounded-md p-2 text-center">
                <p className="text-sm text-gray-400">Medium</p>
                <p className="text-lg font-medium text-yellow-400">{mediumPriorityCount}</p>
              </div>
              <div className="flex-1 bg-[#161b22] rounded-md p-2 text-center">
                <p className="text-sm text-gray-400">Low</p>
                <p className="text-lg font-medium text-green-400">{lowPriorityCount}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-400 mb-3">
              {hasRealData 
                ? "You don't have any active tasks." 
                : "Start by creating your first task."}
            </p>
            <Button 
              onClick={handleCreateTask}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Task
            </Button>
          </div>
        )}
        
        <div className="mt-4">
          <Link to="/tasks">
            <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal" size="sm">
              View all tasks <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TasksCard;
