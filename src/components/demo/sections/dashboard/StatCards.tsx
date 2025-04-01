
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="bg-[#0d1117] border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <h3 className="font-medium text-gray-300">Compliance Score</h3>
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className="text-3xl font-bold mb-1">87%</div>
            <div className="text-green-500 text-sm">+5% from last month</div>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Your compliance score is good. Keep up the good work!
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-[#0d1117] border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-yellow-500 mr-2" />
              <h3 className="font-medium text-gray-300">Upcoming Tasks</h3>
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className="text-3xl font-bold mb-1">3</div>
            <div className="text-yellow-500 text-sm">2 due soon</div>
          </div>
          <div className="mt-4">
            <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal" size="sm">
              View all tasks
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#0d1117] border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <h3 className="font-medium text-gray-300">Recent Incidents</h3>
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className="text-3xl font-bold mb-1">2</div>
            <div className="text-red-500 text-sm">This month</div>
          </div>
          <div className="mt-4">
            <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal" size="sm">
              View incident reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
