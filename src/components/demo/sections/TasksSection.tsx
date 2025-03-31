
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import DemoCard from '../DemoCard';
import { mockTasks } from '@/hooks/tasks/mockTasks';

interface TasksSectionProps {
  onShowFeatureInfo: () => void;
  onItemSelect: (item: any) => void;
}

const TasksSection = ({ onShowFeatureInfo, onItemSelect }: TasksSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center" 
          onClick={onShowFeatureInfo}
        >
          <Info className="h-4 w-4 mr-2" />
          About This Feature
        </Button>
      </div>
      <Card className="bg-[#1a1f29] border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg">Assigned Tasks</CardTitle>
          <CardDescription className="text-gray-400">Your team's safety tasks</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-800">
            {Array.isArray(mockTasks) && mockTasks.slice(0, 5).map(task => (
              <div 
                key={task.id} 
                className="p-4 hover:bg-gray-800/30 transition-colors cursor-pointer"
                onClick={() => onItemSelect(task)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">Assigned to: {task.assignee_id || 'Unassigned'} • Due: {task.due_date?.slice(0, 10) || 'No date'}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                    task.status === 'in-progress' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-amber-500/10 text-amber-500'
                  }`}>
                    {task.status === 'in-progress' ? 'In Progress' : 
                     task.status === 'completed' ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <DemoCard message="This is simulated task data" />
    </div>
  );
};

export default TasksSection;
