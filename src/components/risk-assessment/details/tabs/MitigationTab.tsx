
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Task {
  id: string;
  title: string;
  priority: string;
  assignee: string;
  dueDate: string;
  status: string;
}

interface MitigationTabProps {
  tasks: Task[];
}

const MitigationTab: React.FC<MitigationTabProps> = ({ tasks }) => {
  return (
    <div className="bg-[#0f1419] p-6 rounded-md border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium">Mitigation Actions</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="simulation">Advanced Features Coming Soon</Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Simulation Only - Coming Soon</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <p className="text-gray-400">Actions to address identified risks and hazards.</p>
      
      {tasks.length > 0 ? (
        <div className="space-y-4 mt-6">
          {tasks.map((task) => (
            <div key={task.id} className="bg-[#1a1f29] p-4 rounded-md border border-gray-800">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-white font-medium">{task.title}</h4>
                  <div className="flex items-center text-sm mt-1">
                    <span className="text-gray-400 mr-1">Priority:</span>
                    <span className={`font-medium ${task.priority === 'High' ? 'text-red-400' : task.priority === 'Medium' ? 'text-yellow-400' : 'text-blue-400'}`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center text-sm mt-1">
                    <span className="text-gray-400 mr-1">Assigned to:</span>
                    <span className="text-white">{task.assignee}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-gray-400 text-sm mb-1">Due: {task.dueDate}</span>
                  <span className={`px-2 py-0.5 text-xs rounded ${task.status === 'Completed' ? 'bg-green-500' : task.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-500'} text-white`}>
                    {task.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-10 text-center text-gray-500">
          <p>No mitigation actions have been added yet.</p>
          <p className="mt-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="simulation" className="cursor-pointer">AI Recommendations Coming Soon</Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Our AI will soon recommend mitigation actions based on identified risks</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>
        </div>
      )}
    </div>
  );
};

export default MitigationTab;
