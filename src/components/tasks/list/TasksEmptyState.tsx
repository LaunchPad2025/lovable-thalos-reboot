
import React from 'react';
import { ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStatus } from '@/hooks/useAuthStatus';

interface TasksEmptyStateProps {
  onAddNewTask: () => void;
  type?: 'all' | 'my' | 'completed';
}

const TasksEmptyState = ({ onAddNewTask, type = 'all' }: TasksEmptyStateProps) => {
  const { isAuthenticated } = useAuthStatus();
  
  return (
    <div className="flex flex-col items-center justify-center h-full py-16 text-center">
      <div className="bg-[#1a1f29] p-4 rounded-full mb-4">
        <ClipboardList className="h-10 w-10 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-medium text-white mb-2">
        {type === 'all' ? "No tasks found" : 
         type === 'my' ? "No tasks assigned to you" : 
         "No completed tasks"}
      </h3>
      
      <p className="text-gray-400 max-w-md mb-6">
        {isAuthenticated ? (
          type === 'all' ? 
            "You haven't created any tasks yet. Create your first task to track safety work." : 
          type === 'my' ? 
            "You don't have any tasks assigned to you yet. As tasks are assigned to you, they will appear here." : 
            "Once tasks are marked as completed, they will appear here for your reference."
        ) : (
          type === 'all' ? 
            "There are no tasks matching your current filters. Try adjusting your filters or create a new task." : 
          type === 'my' ? 
            "You don't have any tasks assigned to you yet. As tasks are assigned to you, they will appear here." : 
            "Once tasks are marked as completed, they will appear here for your reference."
        )}
      </p>
      
      {type !== 'completed' && (
        <Button 
          onClick={onAddNewTask}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Create New Task
        </Button>
      )}
    </div>
  );
};

export default TasksEmptyState;
