
import React from 'react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DetailCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PriorityTasks />
      <RecentDocuments />
    </div>
  );
};

const PriorityTasks = () => {
  const navigate = useNavigate();
  
  const tasks = [
    {
      id: 1,
      title: 'Update emergency evacuation plan',
      dueDate: '12/19/2023',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Complete monthly safety inspection',
      dueDate: '12/14/2023',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Address hazardous materials storage violation',
      dueDate: '12/17/2023',
      priority: 'critical'
    }
  ];
  
  return (
    <Card className="bg-[#0d1117] border-gray-800 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">Priority Tasks</h3>
        <span className="text-xs text-gray-400">Limited to 3 <span className="text-xs py-0.5 px-2 bg-blue-900/30 text-blue-400 rounded-full">Free</span></span>
      </div>
      
      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="flex justify-between items-start">
            <div>
              <p className="text-white font-medium">{task.title}</p>
              <p className="text-gray-400 text-sm">Due: {task.dueDate}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded ${
              task.priority === 'critical' ? 'bg-red-900/30 text-red-400' :
              task.priority === 'high' ? 'bg-orange-900/30 text-orange-400' :
              'bg-yellow-900/30 text-yellow-400'
            }`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

const RecentDocuments = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="bg-[#0d1117] border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">Recent Documents</h3>
        <span className="text-xs py-0.5 px-2 bg-blue-900/30 text-blue-400 rounded-full">Pro+</span>
      </div>
      
      <div className="flex flex-col items-center justify-center h-32">
        <FileText className="h-10 w-10 text-gray-600 mb-2" />
        <p className="text-center text-gray-400 text-sm mb-2">Document management is available on Professional and Enterprise plans</p>
        <Button 
          onClick={() => navigate('/subscription')}
          variant="outline" 
          size="sm"
          className="mt-2"
        >
          Upgrade to Pro
        </Button>
      </div>
    </Card>
  );
};

export default DetailCards;
