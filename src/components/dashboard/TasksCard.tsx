
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ArrowUpRight } from 'lucide-react';

const TasksCard = () => {
  return (
    <Card className="bg-[#0d1117] border-gray-800 shadow-none text-white">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-yellow-500" />
          <span className="font-medium">Upcoming Tasks</span>
        </div>
        
        <div className="mt-4">
          <h3 className="text-3xl font-bold">3</h3>
          <p className="text-yellow-500 text-sm mt-1">2 due soon</p>
        </div>
        
        <div className="flex justify-start mt-10">
          <Button variant="link" className="text-blue-400 p-0 h-auto flex items-center">
            View all tasks
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksCard;
