
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar } from 'lucide-react';
import { upcomingTrainings } from './mockData';

const UpcomingTraining = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Upcoming Training</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {upcomingTrainings.map((training) => (
            <div key={training.id} className="border border-gray-800 rounded-md p-3 bg-gray-900/50">
              <div className="flex justify-between mb-2">
                <div className="flex gap-2">
                  <div className="bg-blue-900/40 text-blue-400 rounded-md w-8 h-8 flex items-center justify-center">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{training.title}</p>
                    <p className="text-xs text-gray-400">{training.duration} • Due in {training.daysLeft} days</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Start
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingTraining;
